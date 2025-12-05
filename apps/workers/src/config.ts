import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables
config({ path: resolve(__dirname, '../../.env') });

export const CONFIG = {
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    password: process.env.REDIS_PASSWORD,
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY || '',
    organization: process.env.OPENAI_ORG_ID,
    model: process.env.OPENAI_MODEL || 'gpt-4-1106-preview',
    whisperModel: process.env.OPENAI_WHISPER_MODEL || 'whisper-1',
    ttsModel: process.env.OPENAI_TTS_MODEL || 'tts-1-hd',
    ttsVoice: process.env.OPENAI_TTS_VOICE || 'alloy',
  },
  s3: {
    endpoint: process.env.S3_ENDPOINT || 'http://localhost:9000',
    region: process.env.S3_REGION || 'us-east-1',
    accessKeyId: process.env.S3_ACCESS_KEY_ID || 'minioadmin',
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || 'minioadmin123456',
    bucket: process.env.S3_BUCKET || 'preppath-audio',
    forcePathStyle: true,
  },
};
