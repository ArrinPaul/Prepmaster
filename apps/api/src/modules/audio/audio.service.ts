import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { StorageService } from '../../services/storage/storage.service';
import { OpenAIService } from '../../services/openai/openai.service';
import { QueueService } from '../../services/queue/queue.service';
import { GenerateTTSDto } from './dto/audio.dto';

@Injectable()
export class AudioService {
  private readonly logger = new Logger(AudioService.name);

  constructor(
    private prisma: PrismaService,
    private storageService: StorageService,
    private openaiService: OpenAIService,
    private queueService: QueueService,
  ) {}

  async uploadAudio(userId: string, interviewId: string, file: Express.Multer.File) {
    this.logger.log(`Uploading audio for interview: ${interviewId}`);

    // Validate file
    const maxSize = 25 * 1024 * 1024; // 25MB
    if (file.size > maxSize) {
      throw new BadRequestException('File size exceeds 25MB limit');
    }

    const allowedTypes = ['audio/mpeg', 'audio/wav', 'audio/webm', 'audio/mp4', 'audio/x-m4a'];
    if (!allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException('Invalid audio format');
    }

    // Upload to S3
    const uploadResult = await this.storageService.uploadFile(file, 'interviews');

    // Save recording metadata
    const recording = await this.prisma.interviewRecording.create({
      data: {
        interviewId,
        userId,
        filename: uploadResult.key,
        originalName: file.originalname,
        fileUrl: uploadResult.url,
        fileSize: file.size,
        mimeType: file.mimetype,
      },
    });

    this.logger.log(`Audio uploaded successfully: ${recording.id}`);
    return recording;
  }

  async transcribeAudio(recordingId: string, userId: string) {
    const recording = await this.prisma.interviewRecording.findFirst({
      where: {
        id: recordingId,
        userId,
      },
    });

    if (!recording) {
      throw new BadRequestException('Recording not found');
    }

    if (recording.transcribed) {
      return { message: 'Already transcribed', transcription: recording.transcription };
    }

    // Queue transcription job
    await this.queueService.addTranscriptionJob({
      recordingId,
      filePath: recording.fileUrl,
    });

    return { message: 'Transcription queued', jobId: recordingId };
  }

  async generateTTS(dto: GenerateTTSDto) {
    this.logger.log(`Generating TTS for text: ${dto.text.substring(0, 50)}...`);

    const audioBuffer = await this.openaiService.generateSpeech(dto.text, dto.voice);

    const uploadResult = await this.storageService.uploadBuffer(
      audioBuffer,
      'tts-output.mp3',
      'audio/mpeg',
      'tts',
    );

    return {
      audioUrl: uploadResult.url,
      size: uploadResult.size,
    };
  }
}
