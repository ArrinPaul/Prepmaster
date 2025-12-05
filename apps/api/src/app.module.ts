import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { HealthModule } from './health/health.module';
import { OpenAIModule } from './services/openai/openai.module';
import { StorageModule } from './services/storage/storage.module';
import { QueueModule } from './services/queue/queue.module';
import { InterviewsModule } from './modules/interviews/interviews.module';
import { AudioModule } from './modules/audio/audio.module';
import { ActivityModule } from './modules/activity/activity.module';
import { AchievementsModule } from './modules/achievements/achievements.module';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),

    // Rate limiting
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 1 minute
        limit: 100, // 100 requests per minute
      },
    ]),

    // Core modules
    PrismaModule,
    AuthModule,
    UsersModule,
    HealthModule,

    // Phase 2: Services
    OpenAIModule,
    StorageModule,
    QueueModule,

    // Phase 2: Feature modules
    InterviewsModule,
    AudioModule,
    ActivityModule,
    AchievementsModule,
  ],
})
export class AppModule {}
