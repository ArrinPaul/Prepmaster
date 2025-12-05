# Quick Start Guide - Phase 2

## Prerequisites Setup

### 1. Install Docker Desktop
Download and install from: https://www.docker.com/products/docker-desktop/

### 2. Get OpenAI API Key
1. Visit https://platform.openai.com/
2. Create an account or sign in
3. Generate API key with access to:
   - GPT-4 (for questions and evaluation)
   - Whisper (for transcription)
   - TTS (for text-to-speech)

### 3. Configure Environment
Update `.env` file with your OpenAI key:
```env
OPENAI_API_KEY=sk-your-actual-key-here
```

## Start Services (One-Time Setup)

### Step 1: Start Docker Services
```bash
cd "d:\New folder\Prepmaster"
pnpm docker:up
```

Wait ~30 seconds for services to initialize.

### Step 2: Run Database Migration
```bash
pnpm db:migrate
```

Enter migration name: `add_phase2_voice_ai_interview_system`

### Step 3: Seed Database
```bash
pnpm db:seed
```

This creates:
- Test users (admin, demo, test users)
- 26 achievements
- System configuration

## Run Application

Open 3 terminals:

### Terminal 1: API Server
```bash
cd "d:\New folder\Prepmaster"
pnpm --filter @preppath/api dev
```

API will be available at: http://localhost:4000

### Terminal 2: Background Workers
```bash
cd "d:\New folder\Prepmaster"
pnpm --filter @preppath/workers dev
```

Workers process audio transcription, TTS, and evaluation jobs.

### Terminal 3: Frontend (Optional)
```bash
cd "d:\New folder\Prepmaster"
pnpm --filter @preppath/web dev
```

Frontend will be available at: http://localhost:3000

## Test the System

### 1. Get JWT Token

Login via API or use seed credentials:
```
Email: demo@preppath.com
Password: Demo123!@#
```

### 2. View API Documentation

Open: http://localhost:4000/api

Explore all 17 Phase 2 endpoints with interactive Swagger UI.

### 3. Create Your First Interview

Use Swagger UI or:
```bash
curl -X POST http://localhost:4000/api/v1/interviews \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "TECHNICAL",
    "role": "Full Stack Developer",
    "experienceLevel": "MID",
    "techStack": ["JavaScript", "React", "Node.js"],
    "questionsCount": 5
  }'
```

AI will generate 5 realistic interview questions instantly!

### 4. Check Background Jobs

Watch Terminal 2 (workers) for real-time job processing:
- TTS generation for questions
- Transcription processing
- Answer evaluation

### 5. View Your Activity

```bash
curl -X GET http://localhost:4000/api/v1/activity/heatmap \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

See your 365-day contribution calendar!

### 6. Unlock Achievements

Complete interviews to unlock achievements:
- First Steps (1 interview)
- Week Warrior (7-day streak)
- Perfect Score (10/10 on any question)

## Common Issues

### Docker Services Not Starting
```bash
# Check if Docker Desktop is running
docker ps

# Restart services
pnpm docker:down
pnpm docker:up
```

### Workers Not Processing Jobs
```bash
# Check Redis is running
docker ps | grep redis

# Verify environment variables
cat .env | grep REDIS
```

### OpenAI API Errors
- Verify API key is correct
- Check you have credits available
- Ensure models are accessible (GPT-4, Whisper, TTS)

## Stop Services

```bash
# Stop API and workers: Ctrl+C in terminals

# Stop Docker services
pnpm docker:down
```

## Useful Commands

```bash
# View all interviews
curl http://localhost:4000/api/v1/interviews \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Get user stats
curl http://localhost:4000/api/v1/activity/stats \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# View achievements
curl http://localhost:4000/api/v1/achievements \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Check Docker logs
pnpm docker:logs

# Reset database (WARNING: Deletes all data)
pnpm db:reset
```

## What's Next?

1. ✅ Test all 17 Phase 2 endpoints
2. ✅ Upload audio recordings and test transcription
3. ✅ Complete interviews and check evaluation scores
4. ✅ Track your activity and unlock achievements
5. ✅ Build the frontend to use the API

## Need Help?

- API Documentation: http://localhost:4000/api
- Workers README: `apps/workers/README.md`
- Phase 2 Details: `PHASE_2_COMPLETE.md`
- Full Project: `PROJECT_STRUCTURE.md`

🎉 **Congratulations! Phase 2 is complete and ready to use!**
