import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private configService: ConfigService) {
    super({
      clientID: configService.get('GITHUB_CLIENT_ID'),
      clientSecret: configService.get('GITHUB_CLIENT_SECRET'),
      callbackURL: configService.get('GITHUB_CALLBACK_URL', 'http://localhost:4000/api/v1/auth/github/callback'),
      scope: ['user:email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: Function): Promise<any> {
    const { id, username, displayName, emails, photos } = profile;
    
    const user = {
      provider: 'github',
      providerId: id,
      email: emails[0]?.value,
      name: displayName || username,
      username: username,
      avatar: photos[0]?.value,
      accessToken,
      refreshToken,
    };
    
    done(null, user);
  }
}
