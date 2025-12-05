import {
  Controller,
  Post,
  Body,
  Param,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { AudioService } from './audio.service';
import { GenerateTTSDto } from './dto/audio.dto';
import { JwtAuthGuard } from '../../auth/guards/auth.guard';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';

@ApiTags('audio')
@Controller('audio')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AudioController {
  constructor(private readonly audioService: AudioService) {}

  @Post('upload/:interviewId')
  @ApiOperation({ summary: 'Upload audio file for interview' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 201, description: 'Audio uploaded successfully' })
  @UseInterceptors(FileInterceptor('file'))
  async uploadAudio(
    @CurrentUser() user: any,
    @Param('interviewId') interviewId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    return await this.audioService.uploadAudio(user.id, interviewId, file);
  }

  @Post('transcribe/:recordingId')
  @Throttle({ default: { limit: 10, ttl: 60000 } }) // 10 transcriptions per minute
  @ApiOperation({ summary: 'Trigger audio transcription' })
  @ApiResponse({ status: 200, description: 'Transcription queued' })
  async transcribeAudio(@CurrentUser() user: any, @Param('recordingId') recordingId: string) {
    return await this.audioService.transcribeAudio(recordingId, user.id);
  }

  @Post('tts')
  @Throttle({ default: { limit: 10, ttl: 60000 } }) // 10 TTS generations per minute
  @ApiOperation({ summary: 'Generate text-to-speech audio' })
  @ApiResponse({ status: 200, description: 'TTS audio generated' })
  async generateTTS(@Body() dto: GenerateTTSDto) {
    return await this.audioService.generateTTS(dto);
  }
}
