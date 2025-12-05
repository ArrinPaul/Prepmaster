# Changelog

All notable changes to PrepPath will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added - Phase 2: Voice AI Interview System (December 5, 2025)

#### Database
- **8 New Models**:
  - `Interview` - Interview session management with status tracking
  - `InterviewQuestion` - AI-generated questions with evaluation criteria (correctness, completeness, clarity)
  - `InterviewFeedback` - Comprehensive interview feedback with scores and recommendations
  - `InterviewRecording` - Audio recording metadata and transcripts
  - `Activity` - User activity event tracking
  - `DailyActivity` - Daily aggregated activity metrics
  - `Achievement` - Achievement definitions with requirements
  - `UserAchievement` - User achievement progress and unlocks
- **4 New Enums**: `InterviewType`, `InterviewStatus`, `QuestionDifficulty`, `ActivityType`
- Database schema properly indexed for performance

#### API Endpoints (17 New)

**Interviews Module** (`/api/v1/interviews`)
- `POST /` - Create interview with AI-generated questions (GPT-4)
- `GET /` - List user's interviews with pagination and filters
- `GET /:id` - Get interview details with questions and progress
- `POST /:id/start` - Start interview session
- `POST /:id/questions/:questionId/answer` - Submit answer with evaluation
- `GET /:id/report` - Get comprehensive interview report
- `DELETE /:id` - Delete interview

**Audio Module** (`/api/v1/audio`)
- `POST /upload/:interviewId` - Upload audio recording (WebM, MP3, WAV, M4A)
- `POST /transcribe/:recordingId` - Trigger Whisper transcription
- `POST /tts` - Generate text-to-speech audio

**Activity Module** (`/api/v1/activity`)
- `GET /heatmap` - Get 365-day contribution calendar (GitHub-style)
- `GET /stats` - Get user activity statistics
- `GET /streak` - Get current and longest streak
- `POST /track` - Track activity event

**Achievements Module** (`/api/v1/achievements`)
- `GET /` - List all achievements
- `GET /user` - Get user's achievements with progress
- `GET /:id` - Get achievement details

#### Services

**OpenAI Service**
- Question generation using GPT-4-1106-preview
- Audio transcription using Whisper-1
- Text-to-speech using TTS-1-HD (6 voice options)
- Answer evaluation with detailed feedback
- Interview feedback generation with recommendations

**Storage Service**
- S3/MinIO integration for audio file storage
- File upload with validation (25MB limit)
- Signed URL generation (7-day expiry)
- Automatic cleanup on delete

**Queue Service**
- BullMQ integration with Redis
- 3 job queues: transcription, TTS, evaluation
- Rate limiting to prevent API overages
- Retry logic with exponential backoff

#### Background Workers (`apps/workers`)
- **Transcription Worker**: Processes audio → text with Whisper (2 concurrent, 5 req/min)
- **TTS Worker**: Generates speech audio for questions (3 concurrent, 10 req/min)
- **Evaluation Worker**: Evaluates answers with GPT-4 (5 concurrent, 20 req/min)
- Structured logging with Winston
- Graceful shutdown handling
- Job status tracking

#### Gamification System

**Activity Tracking**
- Daily activity aggregation
- 365-day contribution heatmap
- Intensity levels (0-4)
- Recent activity feed

**Streak System**
- Current and longest streak tracking
- Automatic daily calculation
- Streak milestone notifications (every 7 days)
- Streak reset on missed days

**Achievements** (26 Total)
- **Interviews** (6): First Steps → Interview Legend
- **Streaks** (6): 3 days → 100 days
- **Points** (4): 100 → 5000 total points
- **Performance** (3): Perfect scores and high averages
- **Special/Hidden** (7): Night Owl, Early Bird, Speed Runner, etc.
- Automatic requirement checking and unlocking
- Points system integration

#### Security & Performance
- Rate limiting on expensive endpoints:
  - Create Interview: 5/minute
  - Submit Answer: 20/minute
  - Transcription: 10/minute
  - TTS: 10/minute
- JWT authentication on all endpoints
- File validation (size, mimetype)
- User ownership verification
- Comprehensive error handling

#### Documentation
- Complete Swagger/OpenAPI documentation
- Workers README with setup and troubleshooting
- Phase 2 completion guide
- Quick start guide
- Environment variable documentation

#### Configuration
- OpenAI API integration (GPT-4, Whisper, TTS)
- S3/MinIO storage configuration
- Redis/BullMQ queue configuration
- File upload limits and formats
- Modern Docker Compose syntax

### Changed
- Updated `app.module.ts` to include Phase 2 modules
- Updated `.env.example` with Phase 2 environment variables
- Updated package scripts to use Docker Compose V2 syntax
- Regenerated Prisma Client with new models

---

## [1.0.0] - November 23, 2025

### Added
- Dynamic icon generation using Next.js ImageResponse API
- Favicon with gradient background (black to gray)
- Bold "P" letter mark for PrepPath branding
- Edge runtime configuration for optimal performance

### Removed
- Static `favicon.ico` file replaced with dynamic generation

### Changed
- Icon size: 32x32 pixels
- Content type: PNG format
- Design: Gradient background with centered "P" lettermark

**Commit**: `e2717f0fc7be5fe84415cc407091ff54261ab14b`

---

## [Phase 1 Complete] - Previous Releases

### Added - Backend Foundation
- NestJS API server with TypeScript
- PostgreSQL database with Prisma ORM
- JWT authentication system
- OAuth integration (Google, GitHub, LinkedIn)
- User management with roles (USER, ADMIN)
- Subscription plans (FREE, PRO, ENTERPRISE)
- Email verification system
- Two-factor authentication
- Password reset functionality
- Refresh token rotation
- Rate limiting (100 req/min global)
- Health check endpoints
- Swagger API documentation
- Docker Compose setup (PostgreSQL, Redis, MinIO)
- Database seeding with test users
- System configuration management
- User preferences system
- Monorepo structure with Turborepo
- Comprehensive error handling
- Winston logging
- Security best practices

### Database Models (Phase 1)
- User
- UserPreference
- RefreshToken
- SystemConfig

### API Endpoints (Phase 1)
- Authentication: Login, Register, Logout, Refresh, Verify Email, Reset Password
- OAuth: Google, GitHub, LinkedIn callbacks
- Users: Profile, Update, Stats
- Health: Server status checks

---

## Future Roadmap

### Phase 3 (Planned)
- Real-time interview sessions with WebRTC
- Live coding environment integration
- Video recording and playback
- Interviewer matching system
- Mock interview scheduling
- Interview analytics dashboard
- Resume parsing and analysis
- Job board integration
- Company interview guides

### Phase 4 (Planned)
- Mobile applications (iOS/Android)
- Collaborative interview preparation
- Interview question database
- Community features (discussions, forums)
- Premium content and courses
- Certification system
- API for third-party integrations

---

## Types of Changes
- **Added**: New features
- **Changed**: Changes in existing functionality
- **Deprecated**: Soon-to-be removed features
- **Removed**: Removed features
- **Fixed**: Bug fixes
- **Security**: Security vulnerability fixes

---

**Note**: This changelog started on December 5, 2025, after Phase 2 completion. Historical changes have been summarized from git history.
