import { Worker, Job } from 'bullmq';
import { PrismaClient } from '@preppath/database';
import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import OpenAI from 'openai';
import { createReadStream, createWriteStream } from 'fs';
import { unlink, mkdir } from 'fs/promises';
import { tmpdir } from 'os';
import { join } from 'path';
import { pipeline } from 'stream/promises';
import { CONFIG } from '../config';
import { logger } from '../logger';

const prisma = new PrismaClient();

const s3Client = new S3Client({
  endpoint: CONFIG.s3.endpoint,
  region: CONFIG.s3.region,
  credentials: {
    accessKeyId: CONFIG.s3.accessKeyId,
    secretAccessKey: CONFIG.s3.secretAccessKey,
  },
  forcePathStyle: CONFIG.s3.forcePathStyle,
});

const openai = new OpenAI({
  apiKey: CONFIG.openai.apiKey,
  organization: CONFIG.openai.organization,
});

interface TranscriptionJobData {
  recordingId: string;
  userId: string;
}

interface TTSJobData {
  questionId: string;
  text: string;
}

interface EvaluationJobData {
  questionId: string;
  interviewId: string;
  answer: string;
  userId: string;
}

/**
 * Transcription Worker
 * Processes audio recordings using OpenAI Whisper
 */
export const transcriptionWorker = new Worker<TranscriptionJobData>(
  'transcription',
  async (job: Job<TranscriptionJobData>) => {
    const { recordingId, userId } = job.data;
    logger.info('Processing transcription job', { recordingId, userId });

    try {
      // Get recording from database
      const recording = await prisma.interviewRecording.findUnique({
        where: { id: recordingId },
      });

      if (!recording) {
        throw new Error(`Recording ${recordingId} not found`);
      }

      // Download audio file from S3
      const tempDir = join(tmpdir(), 'preppath-audio');
      await mkdir(tempDir, { recursive: true });
      const tempFilePath = join(tempDir, `${recordingId}.webm`);

      const getCommand = new GetObjectCommand({
        Bucket: CONFIG.s3.bucket,
        Key: recording.s3Key,
      });

      const response = await s3Client.send(getCommand);
      if (!response.Body) {
        throw new Error('Failed to download audio file');
      }

      // Save to temp file
      const writeStream = createWriteStream(tempFilePath);
      await pipeline(response.Body as NodeJS.ReadableStream, writeStream);

      // Transcribe with OpenAI Whisper
      logger.info('Starting Whisper transcription', { recordingId });
      const transcription = await openai.audio.transcriptions.create({
        file: createReadStream(tempFilePath),
        model: CONFIG.openai.whisperModel,
        response_format: 'verbose_json',
      });

      // Update recording with transcription
      await prisma.interviewRecording.update({
        where: { id: recordingId },
        data: {
          transcript: transcription.text,
          transcriptionDuration: transcription.duration || 0,
        },
      });

      // Cleanup temp file
      await unlink(tempFilePath);

      logger.info('Transcription completed', { recordingId, text: transcription.text });
      return { transcript: transcription.text, duration: transcription.duration };
    } catch (error) {
      logger.error('Transcription failed', { recordingId, error });
      throw error;
    }
  },
  {
    connection: CONFIG.redis,
    concurrency: 2,
    limiter: {
      max: 5,
      duration: 60000, // 5 requests per minute (OpenAI Whisper rate limit)
    },
  },
);

/**
 * TTS Worker
 * Generates speech audio for interview questions using OpenAI TTS
 */
export const ttsWorker = new Worker<TTSJobData>(
  'tts',
  async (job: Job<TTSJobData>) => {
    const { questionId, text } = job.data;
    logger.info('Processing TTS job', { questionId });

    try {
      // Generate speech with OpenAI TTS
      logger.info('Starting TTS generation', { questionId });
      const mp3Response = await openai.audio.speech.create({
        model: CONFIG.openai.ttsModel,
        voice: CONFIG.openai.ttsVoice as any,
        input: text,
      });

      // Convert response to buffer
      const buffer = Buffer.from(await mp3Response.arrayBuffer());

      // Upload to S3
      const s3Key = `tts/${questionId}.mp3`;
      const putCommand = new PutObjectCommand({
        Bucket: CONFIG.s3.bucket,
        Key: s3Key,
        Body: buffer,
        ContentType: 'audio/mpeg',
      });

      await s3Client.send(putCommand);

      // Generate signed URL (valid for 7 days)
      const getCommand = new GetObjectCommand({
        Bucket: CONFIG.s3.bucket,
        Key: s3Key,
      });
      const audioUrl = await getSignedUrl(s3Client, getCommand, { expiresIn: 604800 });

      // Update question with audio URL
      await prisma.interviewQuestion.update({
        where: { id: questionId },
        data: { audioUrl },
      });

      logger.info('TTS generation completed', { questionId, audioUrl });
      return { audioUrl, s3Key };
    } catch (error) {
      logger.error('TTS generation failed', { questionId, error });
      throw error;
    }
  },
  {
    connection: CONFIG.redis,
    concurrency: 3,
    limiter: {
      max: 10,
      duration: 60000, // 10 requests per minute
    },
  },
);

/**
 * Evaluation Worker
 * Evaluates interview answers using OpenAI GPT-4
 */
export const evaluationWorker = new Worker<EvaluationJobData>(
  'evaluation',
  async (job: Job<EvaluationJobData>) => {
    const { questionId, interviewId, answer, userId } = job.data;
    logger.info('Processing evaluation job', { questionId, interviewId });

    try {
      // Get question details
      const question = await prisma.interviewQuestion.findUnique({
        where: { id: questionId },
      });

      if (!question) {
        throw new Error(`Question ${questionId} not found`);
      }

      // Evaluate answer with OpenAI
      logger.info('Starting answer evaluation', { questionId });
      const completion = await openai.chat.completions.create({
        model: CONFIG.openai.model,
        messages: [
          {
            role: 'system',
            content: `You are an expert technical interviewer. Evaluate the candidate's answer and provide detailed feedback.`,
          },
          {
            role: 'user',
            content: `Question: ${question.question}

Expected Answer: ${question.expectedAnswer}

Candidate's Answer: ${answer}

Evaluation Criteria:
- Correctness: ${question.correctnessWeight}%
- Completeness: ${question.completenessWeight}%
- Clarity: ${question.clarityWeight}%

Provide a JSON response with:
1. correctnessScore (0-10)
2. completenessScore (0-10)
3. clarityScore (0-10)
4. feedback (detailed explanation)
5. strengths (array of strengths)
6. improvements (array of improvement suggestions)`,
          },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.3,
      });

      const result = JSON.parse(completion.choices[0].message.content || '{}');

      // Calculate weighted score
      const totalScore =
        (result.correctnessScore * question.correctnessWeight +
          result.completenessScore * question.completenessWeight +
          result.clarityScore * question.clarityWeight) /
        100;

      // Create feedback record
      await prisma.interviewFeedback.create({
        data: {
          questionId,
          interviewId,
          userId,
          correctnessScore: result.correctnessScore,
          completenessScore: result.completenessScore,
          clarityScore: result.clarityScore,
          totalScore,
          feedback: result.feedback,
          strengths: result.strengths || [],
          improvements: result.improvements || [],
        },
      });

      // Update question with answer
      await prisma.interviewQuestion.update({
        where: { id: questionId },
        data: {
          answer,
          answeredAt: new Date(),
        },
      });

      logger.info('Evaluation completed', { questionId, totalScore });
      return { totalScore, feedback: result };
    } catch (error) {
      logger.error('Evaluation failed', { questionId, error });
      throw error;
    }
  },
  {
    connection: CONFIG.redis,
    concurrency: 5,
    limiter: {
      max: 20,
      duration: 60000, // 20 requests per minute
    },
  },
);

// Error handlers
transcriptionWorker.on('failed', (job, err) => {
  logger.error('Transcription job failed', { jobId: job?.id, error: err.message });
});

ttsWorker.on('failed', (job, err) => {
  logger.error('TTS job failed', { jobId: job?.id, error: err.message });
});

evaluationWorker.on('failed', (job, err) => {
  logger.error('Evaluation job failed', { jobId: job?.id, error: err.message });
});

// Success handlers
transcriptionWorker.on('completed', (job) => {
  logger.info('Transcription job completed', { jobId: job.id });
});

ttsWorker.on('completed', (job) => {
  logger.info('TTS job completed', { jobId: job.id });
});

evaluationWorker.on('completed', (job) => {
  logger.info('Evaluation job completed', { jobId: job.id });
});
