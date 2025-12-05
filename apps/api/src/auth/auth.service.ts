import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { SignupDto, LoginDto } from './dto/auth.dto';
import type { User } from '.prisma/client';
import { Role, Plan } from '.prisma/client';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signup(signupDto: SignupDto) {
    const { email, password, name, username } = signupDto;

    // Check if user exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    // Check username uniqueness
    if (username) {
      const existingUsername = await this.prisma.user.findUnique({
        where: { username },
      });

      if (existingUsername) {
        throw new ConflictException('Username already taken');
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        username,
        role: Role.USER,
        plan: Plan.FREE,
        credits: 10,
        userPreferences: {
          create: {
            theme: 'dark',
            language: 'en',
            timezone: 'UTC',
          },
        },
      },
      select: {
        id: true,
        email: true,
        name: true,
        username: true,
        role: true,
        plan: true,
        credits: true,
        createdAt: true,
      },
    });

    this.logger.log(`New user registered: ${user.email}`);

    // Generate tokens
    const tokens = await this.generateTokens(user.id, user.email, user.role);

    return {
      user,
      ...tokens,
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Find user
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check if user is blocked
    if (user.isBlocked) {
      throw new UnauthorizedException(`Account blocked: ${user.blockedReason || 'Contact support'}`);
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Update last login
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        lastLoginAt: new Date(),
        lastActivityAt: new Date(),
      },
    });

    this.logger.log(`User logged in: ${user.email}`);

    // Generate tokens
    const tokens = await this.generateTokens(user.id, user.email, user.role);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        username: user.username,
        avatar: user.avatar,
        role: user.role,
        plan: user.plan,
        credits: user.credits,
      },
      ...tokens,
    };
  }

  async refreshTokens(refreshToken: string) {
    try {
      // Verify refresh token
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get('JWT_REFRESH_SECRET', 'your-refresh-secret-change-in-production'),
      });

      // Check if token exists in database
      const tokenRecord = await this.prisma.refreshToken.findUnique({
        where: { token: refreshToken },
        include: { user: true },
      });

      if (!tokenRecord || tokenRecord.revokedAt) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      if (new Date() > tokenRecord.expiresAt) {
        throw new UnauthorizedException('Refresh token expired');
      }

      // Generate new tokens
      const tokens = await this.generateTokens(
        tokenRecord.user.id,
        tokenRecord.user.email,
        tokenRecord.user.role,
      );

      // Revoke old refresh token
      await this.prisma.refreshToken.update({
        where: { id: tokenRecord.id },
        data: { revokedAt: new Date() },
      });

      return tokens;
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(userId: string, refreshToken?: string) {
    if (refreshToken) {
      await this.prisma.refreshToken.updateMany({
        where: {
          userId,
          token: refreshToken,
        },
        data: {
          revokedAt: new Date(),
        },
      });
    }

    this.logger.log(`User logged out: ${userId}`);

    return { message: 'Logged out successfully' };
  }

  async handleOAuthLogin(oauthUser: any) {
    const { provider, providerId, email, name, avatar, username } = oauthUser;

    // Check if account exists
    let account = await this.prisma.account.findUnique({
      where: {
        provider_providerAccountId: {
          provider,
          providerAccountId: providerId,
        },
      },
      include: { user: true },
    });

    let user: User;

    if (account) {
      // Update existing user
      user = account.user;
      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          lastLoginAt: new Date(),
          lastActivityAt: new Date(),
        },
      });
    } else {
      // Check if user with email exists
      const existingUser = await this.prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        // Link OAuth account to existing user
        await this.prisma.account.create({
          data: {
            userId: existingUser.id,
            type: 'oauth',
            provider,
            providerAccountId: providerId,
          },
        });
        user = existingUser;
      } else {
        // Create new user with OAuth account
        user = await this.prisma.user.create({
          data: {
            email,
            name,
            username: username || email.split('@')[0],
            avatar,
            emailVerified: new Date(),
            role: Role.USER,
            plan: Plan.FREE,
            credits: 10,
            accounts: {
              create: {
                type: 'oauth',
                provider,
                providerAccountId: providerId,
              },
            },
            userPreferences: {
              create: {
                theme: 'dark',
                language: 'en',
                timezone: 'UTC',
              },
            },
          },
        });
      }
    }

    this.logger.log(`OAuth login: ${user.email} via ${provider}`);

    // Generate tokens
    const tokens = await this.generateTokens(user.id, user.email, user.role);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        username: user.username,
        avatar: user.avatar,
        role: user.role,
        plan: user.plan,
        credits: user.credits,
      },
      ...tokens,
    };
  }

  async getAuthenticatedUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        emailVerified: true,
        name: true,
        username: true,
        avatar: true,
        bio: true,
        location: true,
        website: true,
        githubUrl: true,
        linkedinUrl: true,
        twitterUrl: true,
        role: true,
        plan: true,
        credits: true,
        currentStreak: true,
        longestStreak: true,
        totalPoints: true,
        interviewsCompleted: true,
        problemsSolved: true,
        twoFactorEnabled: true,
        lastLoginAt: true,
        createdAt: true,
        userPreferences: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }

  private async generateTokens(userId: string, email: string, role: string) {
    const accessToken = this.jwtService.sign(
      { sub: userId, email, role },
      {
        secret: this.configService.get('JWT_SECRET', 'your-secret-key-change-in-production'),
        expiresIn: this.configService.get('JWT_EXPIRES_IN', '15m'),
      },
    );

    const refreshToken = this.jwtService.sign(
      { sub: userId, email, role },
      {
        secret: this.configService.get('JWT_REFRESH_SECRET', 'your-refresh-secret-change-in-production'),
        expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN', '7d'),
      },
    );

    // Store refresh token in database
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

    await this.prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId,
        expiresAt,
      },
    });

    return {
      accessToken,
      refreshToken,
      expiresIn: this.configService.get('JWT_EXPIRES_IN', '15m'),
    };
  }
}
