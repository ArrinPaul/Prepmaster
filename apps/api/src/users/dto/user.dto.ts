import { IsString, IsOptional, IsUrl, MaxLength, MinLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  @Matches(/^[a-zA-Z0-9_-]+$/, { message: 'Username can only contain letters, numbers, underscores, and hyphens' })
  username?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  bio?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  location?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUrl()
  website?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUrl()
  githubUrl?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUrl()
  linkedinUrl?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUrl()
  twitterUrl?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUrl()
  avatar?: string;
}

export class UpdatePreferencesDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  theme?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  language?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  timezone?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  emailNotifications?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  pushNotifications?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  interviewReminders?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  streakReminders?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  newFeatureEmails?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  marketingEmails?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  weeklyDigest?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  activityPrivacy?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  profileVisibility?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  allowMessages?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  showStats?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  showLeaderboard?: boolean;
}
