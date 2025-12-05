import { Module } from '@nestjs/common';
import { AudioController } from './audio.controller';
import { AudioService } from './audio.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { StorageModule } from '../../services/storage/storage.module';
import { OpenAIModule } from '../../services/openai/openai.module';
import { QueueModule } from '../../services/queue/queue.module';

@Module({
  imports: [PrismaModule, StorageModule, OpenAIModule, QueueModule],
  controllers: [AudioController],
  providers: [AudioService],
  exports: [AudioService],
})
export class AudioModule {}
