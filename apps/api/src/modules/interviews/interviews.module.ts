import { Module } from '@nestjs/common';
import { InterviewsController } from './interviews.controller';
import { InterviewsService } from './interviews.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { OpenAIModule } from '../../services/openai/openai.module';
import { QueueModule } from '../../services/queue/queue.module';

@Module({
  imports: [PrismaModule, OpenAIModule, QueueModule],
  controllers: [InterviewsController],
  providers: [InterviewsService],
  exports: [InterviewsService],
})
export class InterviewsModule {}
