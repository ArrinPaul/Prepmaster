# 🚀 PrepPath Quick Reference Guide

## 🔑 Essential Commands

### Development
```bash
# Start everything
pnpm dev

# Start API only
pnpm --filter @preppath/api dev

# Start frontend only
pnpm --filter @preppath/web dev

# Build everything
pnpm build

# Run tests
pnpm test

# Lint code
pnpm lint

# Format code
pnpm format
```

### Docker
```bash
# Start services
pnpm docker:up

# Stop services
pnpm docker:down

# View logs
pnpm docker:logs

# Restart services
pnpm docker:down && pnpm docker:up
```

### Database
```bash
# Generate Prisma client
pnpm db:generate

# Create migration
pnpm db:migrate

# Seed database
pnpm db:seed

# Open Prisma Studio
pnpm db:studio

# Reset database (⚠️ deletes all data)
pnpm db:reset
```

## 🔐 Test Credentials

```
Admin:
  Email: admin@preppath.com
  Password: Admin123!@#

Demo (ArrinPaul):
  Email: demo@preppath.com
  Password: Demo123!@#

Test User:
  Email: sarah.chen@example.com
  Password: Test123!@#
```

## 🌐 Development URLs

| Service | URL |
|---------|-----|
| API | http://localhost:4000/api/v1 |
| Swagger Docs | http://localhost:4000/api/docs |
| Frontend | http://localhost:3000 |
| Prisma Studio | http://localhost:5555 |
| MinIO Console | http://localhost:9001 |
| PostgreSQL | localhost:5432 |
| Redis | localhost:6379 |

## 📡 API Endpoints Cheat Sheet

### Authentication
```bash
# Register
POST /api/v1/auth/signup
Body: { email, password, name, username? }

# Login
POST /api/v1/auth/login
Body: { email, password }

# Refresh
POST /api/v1/auth/refresh
Body: { refreshToken }

# Get current user
GET /api/v1/auth/me
Header: Authorization: Bearer <token>

# Logout
POST /api/v1/auth/logout
Header: Authorization: Bearer <token>

# OAuth
GET /api/v1/auth/google
GET /api/v1/auth/github
GET /api/v1/auth/linkedin
```

### Users
```bash
# Get profile
GET /api/v1/users/profile
Header: Authorization: Bearer <token>

# Update profile
PUT /api/v1/users/profile
Header: Authorization: Bearer <token>
Body: { name?, bio?, location?, website?, ... }

# Get stats
GET /api/v1/users/stats
Header: Authorization: Bearer <token>

# Leaderboard
GET /api/v1/users/leaderboard?limit=10

# Public profile
GET /api/v1/users/:username
```

### Health
```bash
# Health check
GET /api/v1/health

# Ready check
GET /api/v1/health/ready

# Live check
GET /api/v1/health/live
```

## 📝 cURL Examples

### Register User
```bash
curl -X POST http://localhost:4000/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "password": "Secure123!@#",
    "name": "New User",
    "username": "newuser"
  }'
```

### Login
```bash
curl -X POST http://localhost:4000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "demo@preppath.com",
    "password": "Demo123!@#"
  }'
```

### Get Current User
```bash
curl -X GET http://localhost:4000/api/v1/auth/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Update Profile
```bash
curl -X PUT http://localhost:4000/api/v1/users/profile \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "bio": "Full-stack developer",
    "location": "New York, NY"
  }'
```

## 🐳 Docker Commands

### Container Management
```bash
# List containers
docker ps

# View logs
docker logs preppath_postgres
docker logs preppath_redis
docker logs preppath_minio

# Execute commands in container
docker exec -it preppath_postgres psql -U postgres -d preppath
docker exec -it preppath_redis redis-cli

# Stop container
docker stop preppath_postgres

# Remove container
docker rm preppath_postgres

# Remove all volumes (⚠️ deletes data)
docker volume prune
```

### Database Access
```bash
# Connect to PostgreSQL
docker exec -it preppath_postgres psql -U postgres -d preppath

# Inside PostgreSQL:
\dt          # List tables
\d users     # Describe users table
SELECT * FROM users LIMIT 5;

# Redis
docker exec -it preppath_redis redis-cli
PING         # Test connection
KEYS *       # List all keys
```

## 🔧 Troubleshooting Commands

### Fix Docker Issues
```bash
# Restart all services
pnpm docker:down
pnpm docker:up

# Check service health
docker ps

# View service logs
pnpm docker:logs
```

### Fix Database Issues
```bash
# Regenerate Prisma client
pnpm db:generate

# Reset and reseed
pnpm db:reset

# Check connection
docker exec -it preppath_postgres psql -U postgres -d preppath -c "SELECT 1"
```

### Fix Node Modules Issues
```bash
# Clean install
pnpm clean
pnpm install

# Clear cache
pnpm store prune
```

## 📊 Database Schema Quick Reference

### User Model
```typescript
{
  id: string (cuid)
  email: string (unique)
  password: string (hashed)
  name: string
  username: string (unique)
  role: USER | ADMIN | MODERATOR | INSTRUCTOR
  plan: FREE | PRO | ENTERPRISE
  credits: number
  currentStreak: number
  totalPoints: number
  // ... more fields
}
```

### UserPreference Model
```typescript
{
  id: string
  userId: string
  theme: string
  language: string
  timezone: string
  emailNotifications: boolean
  // ... more preferences
}
```

## 🎯 Validation Rules

### Password Requirements
- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 lowercase letter
- At least 1 number OR special character

### Username Requirements
- Minimum 3 characters
- Maximum 100 characters
- Only alphanumeric, underscore, hyphen

### Email Requirements
- Valid email format
- Unique in database

## 🔐 JWT Token Info

### Access Token
- Expires: 15 minutes
- Used for: API authentication
- Header: `Authorization: Bearer <token>`

### Refresh Token
- Expires: 7 days
- Used for: Getting new access token
- Stored in: Database (can be revoked)

## 📦 Package Manager Commands

```bash
# Add dependency to root
pnpm add <package>

# Add to specific workspace
pnpm --filter @preppath/api add <package>
pnpm --filter @preppath/web add <package>

# Remove dependency
pnpm remove <package>

# Update all dependencies
pnpm update

# Check outdated
pnpm outdated
```

## 🧪 Testing Commands

```bash
# Run all tests
pnpm test

# Run tests with coverage
pnpm --filter @preppath/api test:cov

# Run specific test file
pnpm --filter @preppath/api test auth.service.spec.ts

# Watch mode
pnpm --filter @preppath/api test:watch
```

## 🚀 Production Commands

```bash
# Build for production
pnpm build

# Run production build
pnpm --filter @preppath/api start:prod

# Check build output
ls -la apps/api/dist
ls -la apps/web/.next
```

## 📝 Environment Variables

### Required
```env
DATABASE_URL=postgresql://...
JWT_SECRET=<strong-secret>
JWT_REFRESH_SECRET=<different-secret>
```

### Optional
```env
PORT=4000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# OAuth (if using)
GOOGLE_CLIENT_ID=...
GITHUB_CLIENT_ID=...
LINKEDIN_CLIENT_ID=...
```

## 🎨 Code Style Commands

```bash
# Format code
pnpm format

# Lint code
pnpm lint

# Fix lint issues
pnpm --filter @preppath/api lint -- --fix
```

## 📚 Useful Links

- **Swagger UI**: http://localhost:4000/api/docs
- **Prisma Studio**: http://localhost:5555 (run `pnpm db:studio`)
- **MinIO Console**: http://localhost:9001 (admin/admin123456)
- **NestJS Docs**: https://docs.nestjs.com
- **Prisma Docs**: https://www.prisma.io/docs
- **Next.js Docs**: https://nextjs.org/docs

## 💡 Pro Tips

1. **Use Swagger UI** for interactive API testing
2. **Use Prisma Studio** to inspect database visually
3. **Check logs** with `pnpm docker:logs` when debugging
4. **Use .env.local** for local overrides (not committed)
5. **Run tests** before committing changes
6. **Format code** before pushing (`pnpm format`)

## 🆘 Quick Fixes

### Port already in use?
```bash
# Windows
netstat -ano | findstr :4000
taskkill /PID <PID> /F

# Change port in .env.local
PORT=4001
```

### Can't connect to database?
```bash
# Check if PostgreSQL is running
docker ps | grep postgres

# Verify connection string
echo $DATABASE_URL
```

### Prisma errors?
```bash
pnpm db:generate
pnpm db:reset
```

### JWT not working?
- Check token hasn't expired (15m for access tokens)
- Verify Bearer token format: `Bearer <token>`
- Check JWT_SECRET in .env.local

---

**Keep this guide handy while developing! 🚀**
