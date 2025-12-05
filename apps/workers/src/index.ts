import { transcriptionWorker, ttsWorker, evaluationWorker } from './workers/audio.processor';
import { logger } from './logger';

async function main() {
  logger.info('Starting PrepPath background workers...');

  logger.info('Transcription worker started');
  logger.info('TTS worker started');
  logger.info('Evaluation worker started');

  // Graceful shutdown
  const shutdown = async () => {
    logger.info('Shutting down workers...');
    await Promise.all([
      transcriptionWorker.close(),
      ttsWorker.close(),
      evaluationWorker.close(),
    ]);
    logger.info('All workers shut down successfully');
    process.exit(0);
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}

main().catch((error) => {
  logger.error('Failed to start workers', { error });
  process.exit(1);
});
