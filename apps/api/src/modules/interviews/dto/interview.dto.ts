import { IsString, IsEnum, IsOptional, IsArray, IsInt, IsBoolean, Min, Max, ArrayMinSize } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum InterviewType {
  TECHNICAL = 'TECHNICAL',
  BEHAVIORAL = 'BEHAVIORAL',
  SYSTEM_DESIGN = 'SYSTEM_DESIGN',
  MOCK_FULL = 'MOCK_FULL',
  CUSTOM = 'CUSTOM',
}

export enum InterviewStatus {
  DRAFT = 'DRAFT',
  SCHEDULED = 'SCHEDULED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export class CreateInterviewDto {
  @ApiProperty({ enum: InterviewType })
  @IsEnum(InterviewType)
  type: InterviewType;

  @ApiProperty()
  @IsString()
  role: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  company?: string;

  @ApiProperty({ default: 'MID' })
  @IsString()
  experienceLevel: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  techStack: string[];

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  focusAreas?: string[];

  @ApiProperty({ default: 30 })
  @IsInt()
  @Min(10)
  @Max(180)
  duration: number;

  @ApiProperty({ default: 5 })
  @IsInt()
  @Min(1)
  @Max(20)
  questionsCount: number;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  useAiGeneration?: boolean;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  voiceEnabled?: boolean;

  @ApiPropertyOptional({ default: 'alloy' })
  @IsOptional()
  @IsString()
  ttsVoice?: string;
}

export class SubmitAnswerDto {
  @ApiProperty()
  @IsString()
  userAnswer: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  audioUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  transcription?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  timeSpent?: number;
}

export class InterviewQueryDto {
  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ default: 10 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(50)
  limit?: number = 10;

  @ApiPropertyOptional({ enum: InterviewStatus })
  @IsOptional()
  @IsEnum(InterviewStatus)
  status?: InterviewStatus;

  @ApiPropertyOptional({ enum: InterviewType })
  @IsOptional()
  @IsEnum(InterviewType)
  type?: InterviewType;
}
