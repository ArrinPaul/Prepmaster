import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Queue } from 'bullmq';

@Injectable()
export class QueueService {
  private readonly logger = new Logger(QueueService.name);
  private readonly transcriptionQueue: Queue;
  private readonly ttsQueue: Queue;
  private readonly evaluationQueue: Queue;

  constructor(private config: ConfigService) {
    const redisConnection = {
      host: config.get('REDIS_HOST', 'localhost'),
      port: config.get('REDIS_PORT', 6379),
    };

    this.transcriptionQueue = new Queue('audio-transcription', { connection: redisConnection });
    this.ttsQueue = new Queue('tts-generation', { connection: redisConnection });
    this.evaluationQueue = new Queue('answer-evaluation', { connection: redisConnection });
  }

  async addTranscriptionJob(data: { recordingId: string; filePath: string }) {
    this.logger.log(`Adding transcription job for recording: ${data.recordingId}`);
    return await this.transcriptionQueue.add('transcribe', data, {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 5000,
      },
    });
  }

  async addTTSJob(data: { questionId: string; text: string; voice: string }) {
    this.logger.log(`Adding TTS job for question: ${data.questionId}`);
    return await this.ttsQueue.add('generate-speech', data, {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 3000,
      },
    });
  }

  async addEvaluationJob(data: { questionId: string }) {
    this.logger.log(`Adding evaluation job for question: ${data.questionId}`);
    return await this.evaluationQueue.add('evaluate', data, {
      attempts: 2,
      backoff: {
        type: 'exponential',
        delay: 10000,
      },
    });
  }

  async getTranscriptionJobStatus(jobId: string) {
    const job = await this.transcriptionQueue.getJob(jobId);
    if (!job) return null;

    const state = await job.getState();
    return {
      id: job.id,
      state,
      progress: job.progress,
      returnvalue: job.returnvalue,
    };
  }
}
