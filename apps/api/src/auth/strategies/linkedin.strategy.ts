import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-linkedin-oauth2';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LinkedInStrategy extends PassportStrategy(Strategy, 'linkedin') {
  constructor(private configService: ConfigService) {
    super({
      clientID: configService.get('LINKEDIN_CLIENT_ID'),
      clientSecret: configService.get('LINKEDIN_CLIENT_SECRET'),
      callbackURL: configService.get('LINKEDIN_CALLBACK_URL', 'http://localhost:4000/api/v1/auth/linkedin/callback'),
      scope: ['r_emailaddress', 'r_liteprofile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: Function): Promise<any> {
    const { id, displayName, emails, photos } = profile;
    
    const user = {
      provider: 'linkedin',
      providerId: id,
      email: emails[0]?.value,
      name: displayName,
      avatar: photos[0]?.value,
      accessToken,
      refreshToken,
    };
    
    done(null, user);
  }
}
