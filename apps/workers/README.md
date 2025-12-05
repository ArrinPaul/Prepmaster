# PrepPath Workers

Background job processing system for PrepPath using BullMQ and Redis.

## Overview

The workers package handles asynchronous processing of resource-intensive tasks:

- **Transcription Worker**: Converts interview audio to text using OpenAI Whisper
- **TTS Worker**: Generates speech audio for interview questions using OpenAI TTS
- **Evaluation Worker**: Evaluates interview answers using GPT-4

## Prerequisites

- Node.js 20+
- Redis server running (required for BullMQ)
- OpenAI API key with access to GPT-4, Whisper, and TTS
- S3-compatible storage (MinIO or AWS S3)

## Installation

```bash
# From workspace root
pnpm install

# Install dependencies for workers only
pnpm --filter @preppath/workers install
```

## Configuration

Workers read configuration from environment variables. Ensure `.env` file exists in workspace root:

```env
# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_URL=redis://localhost:6379

# OpenAI Configuration
OPENAI_API_KEY=sk-your-openai-api-key
OPENAI_ORG_ID=org-your-org-id
OPENAI_MODEL=gpt-4-1106-preview
OPENAI_WHISPER_MODEL=whisper-1
OPENAI_TTS_MODEL=tts-1-hd
OPENAI_TTS_VOICE=alloy

# S3/MinIO Configuration
S3_ENDPOINT=http://localhost:9000
S3_REGION=us-east-1
S3_ACCESS_KEY_ID=minioadmin
S3_SECRET_ACCESS_KEY=minioadmin123456
S3_BUCKET=preppath-audio

# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/preppath
```

## Running Workers

### Development Mode

```bash
# From workspace root
pnpm --filter @preppath/workers dev

# Or directly in workers directory
cd apps/workers
pnpm dev
```

### Production Mode

```bash
# Build first
pnpm --filter @preppath/workers build

# Then start
pnpm --filter @preppath/workers start
```

## Workers Architecture

### Transcription Worker

- **Queue**: `transcription`
- **Concurrency**: 2 jobs simultaneously
- **Rate Limit**: 5 requests per minute (OpenAI limit)
- **Retry**: 3 attempts with exponential backoff

**Job Data:**
```typescript
{
  recordingId: string;  // Interview recording ID
  userId: string;       // User who created the recording
}
```

**Process:**
1. Fetch recording metadata from database
2. Download audio file from S3
3. Transcribe using OpenAI Whisper
4. Update database with transcript
5. Delete temporary files

### TTS Worker

- **Queue**: `tts`
- **Concurrency**: 3 jobs simultaneously
- **Rate Limit**: 10 requests per minute
- **Retry**: 3 attempts with exponential backoff

**Job Data:**
```typescript
{
  questionId: string;  // Interview question ID
  text: string;        // Question text to convert to speech
}
```

**Process:**
1. Generate speech using OpenAI TTS
2. Upload MP3 to S3
3. Generate signed URL (7-day expiry)
4. Update question with audio URL

### Evaluation Worker

- **Queue**: `evaluation`
- **Concurrency**: 5 jobs simultaneously
- **Rate Limit**: 20 requests per minute
- **Retry**: 2 attempts with exponential backoff

**Job Data:**
```typescript
{
  questionId: string;   // Question being answered
  interviewId: string;  // Parent interview
  answer: string;       // User's answer text
  userId: string;       // User ID
}
```

**Process:**
1. Fetch question details and evaluation criteria
2. Evaluate answer using GPT-4
3. Calculate weighted scores (correctness, completeness, clarity)
4. Create feedback record in database
5. Update question with answer and timestamp

## Monitoring

### Logs

Workers use Winston for structured logging:

```bash
# View logs in real-time
pnpm --filter @preppath/workers dev

# Logs include:
# - Job started/completed events
# - Error details with stack traces
# - Performance metrics
# - API rate limit information
```

### Job Status

Check job status through the API:

```bash
# Get transcription job status
GET /api/v1/audio/transcription-status/:jobId

# Response includes:
# - Job state (waiting, active, completed, failed)
# - Progress percentage
# - Error details if failed
# - Result data if completed
```

## Error Handling

### Automatic Retry

Jobs automatically retry on failure with exponential backoff:

- **Transcription**: 3 attempts (1s, 2s, 4s delays)
- **TTS**: 3 attempts (1s, 2s, 4s delays)
- **Evaluation**: 2 attempts (1s, 2s delays)

### Failure Scenarios

1. **Network Errors**: Retried automatically
2. **OpenAI Rate Limits**: Jobs queued with rate limiter
3. **Invalid Data**: Logged and marked as failed (no retry)
4. **S3 Upload Failures**: Retried with fresh credentials

### Dead Letter Queue

Failed jobs after all retries are logged but not re-queued. Check logs for details:

```typescript
logger.error('Job failed permanently', {
  jobId: job.id,
  attempts: job.attemptsMade,
  error: error.message,
  data: job.data
});
```

## Performance Tuning

### Concurrency

Adjust worker concurrency based on available resources:

```typescript
// In src/workers/audio.processor.ts
export const transcriptionWorker = new Worker(
  'transcription',
  async (job) => { /* ... */ },
  {
    connection: CONFIG.redis,
    concurrency: 5,  // Increase from 2 to 5
  }
);
```

### Rate Limiting

Adjust rate limits to match your OpenAI tier:

```typescript
limiter: {
  max: 10,          // Max jobs per duration
  duration: 60000,  // Duration in milliseconds
}
```

### Memory Management

Workers process large audio files. Monitor memory usage:

```bash
# Check memory usage
docker stats preppath-workers

# Or use PM2 for process management
pm2 start dist/index.js --name workers --max-memory-restart 500M
```

## Scaling

### Horizontal Scaling

Run multiple worker instances for better throughput:

```bash
# Terminal 1
pnpm --filter @preppath/workers dev

# Terminal 2
pnpm --filter @preppath/workers dev

# Terminal 3
pnpm --filter @preppath/workers dev
```

BullMQ automatically distributes jobs across instances.

### Queue Priority

Add priority to critical jobs:

```typescript
// In API service
await queueService.addTranscriptionJob(data, {
  priority: 1  // Higher priority (1-100, lower = higher priority)
});
```

## Troubleshooting

### Workers Not Processing Jobs

1. **Check Redis connection**:
   ```bash
   redis-cli ping
   # Should respond: PONG
   ```

2. **Verify environment variables**:
   ```bash
   cd apps/workers
   cat .env | grep REDIS
   ```

3. **Check queue status**:
   ```typescript
   // In API
   const status = await queueService.getTranscriptionJobStatus(jobId);
   console.log(status);
   ```

### OpenAI API Errors

1. **Rate Limit Exceeded**:
   - Reduce concurrency in worker config
   - Increase rate limiter duration

2. **Invalid API Key**:
   - Verify `OPENAI_API_KEY` in `.env`
   - Check key has access to required models

3. **Model Not Available**:
   - Verify your OpenAI account has access to GPT-4, Whisper, TTS
   - Check model names match OpenAI's current offerings

### S3 Connection Issues

1. **Connection Refused**:
   ```bash
   # Check MinIO is running
   docker ps | grep minio
   
   # Test connection
   curl http://localhost:9000/minio/health/live
   ```

2. **Access Denied**:
   - Verify S3 credentials in `.env`
   - Check bucket exists and permissions are correct

### Database Connection Issues

1. **Can't reach database**:
   ```bash
   # Check PostgreSQL is running
   docker ps | grep postgres
   
   # Test connection
   psql $DATABASE_URL -c "SELECT 1;"
   ```

## Development

### Adding New Workers

1. Create worker in `src/workers/`:

```typescript
import { Worker } from 'bullmq';
import { CONFIG } from '../config';

export const myWorker = new Worker(
  'my-queue',
  async (job) => {
    // Process job
    const { data } = job;
    // ... processing logic
    return { success: true };
  },
  {
    connection: CONFIG.redis,
    concurrency: 3,
  }
);

// Add event handlers
myWorker.on('completed', (job) => {
  logger.info('Job completed', { jobId: job.id });
});

myWorker.on('failed', (job, err) => {
  logger.error('Job failed', { jobId: job?.id, error: err.message });
});
```

2. Register in `src/index.ts`:

```typescript
import { myWorker } from './workers/my-worker';

// In shutdown function
await myWorker.close();
```

### Testing Workers

```bash
# Run tests (when implemented)
pnpm --filter @preppath/workers test

# Manual testing via API
curl -X POST http://localhost:4000/api/v1/interviews \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"type":"TECHNICAL","role":"Engineer","questionsCount":1}'
```

## Production Deployment

### Using PM2

```bash
# Install PM2
npm install -g pm2

# Start workers
pm2 start dist/index.js --name preppath-workers

# Monitor
pm2 monit

# Auto-restart on file changes
pm2 restart preppath-workers --watch
```

### Using Docker

```dockerfile
# Dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY dist ./dist
CMD ["node", "dist/index.js"]
```

```bash
# Build and run
docker build -t preppath-workers .
docker run -d --name workers --env-file .env preppath-workers
```

### Health Checks

Workers expose health status through logs. Monitor for:

- Continuous job processing
- No repeated errors
- Memory usage within limits
- Redis connection stable

## Support

For issues or questions:
- Check logs first: `pnpm --filter @preppath/workers dev`
- Review this README
- Check API documentation at `http://localhost:4000/api`
- Open an issue on GitHub
