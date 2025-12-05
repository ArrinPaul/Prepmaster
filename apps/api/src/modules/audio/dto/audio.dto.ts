import { IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TranscribeAudioDto {
  @ApiProperty()
  @IsString()
  recordingId: string;

  @ApiProperty()
  @IsString()
  filePath: string;
}

export class GenerateTTSDto {
  @ApiProperty()
  @IsString()
  text: string;

  @ApiPropertyOptional({ default: 'alloy' })
  @IsOptional()
  @IsString()
  voice?: string;
}
