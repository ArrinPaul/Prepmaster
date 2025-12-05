import { Injectable, NotFoundException, ConflictException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileDto, UpdatePreferencesDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private prisma: PrismaService) {}

  async getUserProfile(userId: string) {
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
        lastLoginAt: true,
        createdAt: true,
        userPreferences: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async getUserByUsername(username: string) {
    const user = await this.prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        name: true,
        username: true,
        avatar: true,
        bio: true,
        location: true,
        website: true,
        githubUrl: true,
        linkedinUrl: true,
        twitterUrl: true,
        plan: true,
        currentStreak: true,
        longestStreak: true,
        totalPoints: true,
        interviewsCompleted: true,
        problemsSolved: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateProfile(userId: string, updateProfileDto: UpdateProfileDto) {
    // Check username uniqueness if provided
    if (updateProfileDto.username) {
      const existingUser = await this.prisma.user.findUnique({
        where: { username: updateProfileDto.username },
      });

      if (existingUser && existingUser.id !== userId) {
        throw new ConflictException('Username already taken');
      }
    }

    const user = await this.prisma.user.update({
      where: { id: userId },
      data: {
        ...updateProfileDto,
        updatedAt: new Date(),
      },
      select: {
        id: true,
        email: true,
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
        updatedAt: true,
      },
    });

    this.logger.log(`Profile updated for user: ${userId}`);

    return user;
  }

  async updatePreferences(userId: string, updatePreferencesDto: UpdatePreferencesDto) {
    const preferences = await this.prisma.userPreference.upsert({
      where: { userId },
      update: {
        ...updatePreferencesDto,
        updatedAt: new Date(),
      },
      create: {
        userId,
        ...updatePreferencesDto,
      },
    });

    this.logger.log(`Preferences updated for user: ${userId}`);

    return preferences;
  }

  async getUserStats(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        credits: true,
        currentStreak: true,
        longestStreak: true,
        totalPoints: true,
        interviewsCompleted: true,
        problemsSolved: true,
        plan: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      ...user,
      memberSince: user.createdAt,
    };
  }

  async deleteAccount(userId: string) {
    // Soft delete by setting deletedAt
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        deletedAt: new Date(),
        isActive: false,
      },
    });

    this.logger.log(`Account deleted for user: ${userId}`);

    return { message: 'Account deleted successfully' };
  }

  async getLeaderboard(limit: number = 10) {
    const users = await this.prisma.user.findMany({
      where: {
        isActive: true,
        isBlocked: false,
        deletedAt: null,
      },
      orderBy: {
        totalPoints: 'desc',
      },
      take: limit,
      select: {
        id: true,
        name: true,
        username: true,
        avatar: true,
        totalPoints: true,
        interviewsCompleted: true,
        problemsSolved: true,
        currentStreak: true,
      },
    });

    return users;
  }
}
