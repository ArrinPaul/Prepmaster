# 🚀 PrepPath Phase 1 - Setup Verification Checklist

Use this checklist to verify your setup is working correctly.

## ☑️ Pre-Setup Verification

- [ ] Node.js >= 20.0.0 installed (`node --version`)
- [ ] PNPM >= 8.0.0 installed (`pnpm --version`)
- [ ] Docker Desktop is running (`docker ps`)
- [ ] Git repository cloned

## ☑️ Step 1: Install Dependencies

```bash
pnpm install
```

**Expected Output:**
- ✅ All workspaces install successfully
- ✅ No peer dependency warnings
- ✅ node_modules/ created in root, apps/web, apps/api, packages/database

**Verification:**
- [ ] `pnpm list` shows all packages
- [ ] No error messages in console

## ☑️ Step 2: Start Docker Services

```bash
pnpm docker:up
```

**Expected Output:**
- ✅ 3 containers created: preppath_postgres, preppath_redis, preppath_minio
- ✅ All containers show "healthy" status after ~10 seconds

**Verification:**
- [ ] `docker ps` shows 3 running containers
- [ ] All containers have "healthy" status
- [ ] PostgreSQL accessible on port 5432
- [ ] Redis accessible on port 6379
- [ ] MinIO accessible on ports 9000-9001

**Test Connection:**
```bash
# PostgreSQL
docker exec -it preppath_postgres psql -U postgres -d preppath -c "SELECT 1"

# Redis
docker exec -it preppath_redis redis-cli ping
```

## ☑️ Step 3: Generate Prisma Client

```bash
pnpm db:generate
```

**Expected Output:**
- ✅ "Generated Prisma Client" message
- ✅ .prisma/client/ created in node_modules

**Verification:**
- [ ] No TypeScript errors in VSCode
- [ ] `node_modules/.prisma/client/` directory exists

## ☑️ Step 4: Run Database Migrations

```bash
pnpm db:migrate
```

**Expected Output:**
- ✅ "Your database is now in sync with your schema"
- ✅ Migration files created in packages/database/prisma/migrations/

**Verification:**
- [ ] Migration completed without errors
- [ ] New migration folder created
- [ ] Database tables created (check Prisma Studio)

## ☑️ Step 5: Seed the Database

```bash
pnpm db:seed
```

**Expected Output:**
```
🌱 Starting database seed...
Creating admin user...
✅ Admin created: admin@preppath.com
Creating demo user (ArrinPaul)...
✅ Demo user created: demo@preppath.com
Creating test users...
✅ Test user created: sarah.chen@example.com
...
✨ Database seeded successfully!
```

**Verification:**
- [ ] Admin user created
- [ ] Demo user (ArrinPaul) created
- [ ] 5 test users created
- [ ] System configuration records created
- [ ] See login credentials in output

**Test with Prisma Studio:**
```bash
pnpm db:studio
```
- [ ] Open http://localhost:5555
- [ ] See users table with 7 users
- [ ] See user_preferences table with records
- [ ] See system_config table with 8 records

## ☑️ Step 6: Start the API Server

```bash
pnpm --filter @preppath/api dev
```

**Expected Output:**
```
[Nest] LOG [Bootstrap] ═══════════════════════════════════════════════════════
[Nest] LOG [Bootstrap] 🚀 PrepPath API is running!
[Nest] LOG [Bootstrap] 📍 Environment: development
[Nest] LOG [Bootstrap] 🌐 API: http://localhost:4000/api/v1
[Nest] LOG [Bootstrap] 📚 Docs: http://localhost:4000/api/docs
[Nest] LOG [Bootstrap] 🏥 Health: http://localhost:4000/api/v1/health
[Nest] LOG [Bootstrap] ═══════════════════════════════════════════════════════
[Nest] LOG [PrismaService] ✅ Database connected successfully
```

**Verification:**
- [ ] Server starts without errors
- [ ] "Database connected successfully" message appears
- [ ] Server listening on port 4000
- [ ] No compilation errors

## ☑️ Step 7: Test API Health Check

```bash
curl http://localhost:4000/api/v1/health
```

**Expected Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-12-03T...",
  "uptime": 12.345,
  "version": "1.0.0",
  "environment": "development",
  "services": {
    "database": {
      "status": "healthy",
      "message": "Database connection is healthy"
    },
    "api": {
      "status": "healthy",
      "message": "API is running",
      "memory": {
        "used": 50,
        "total": 100,
        "unit": "MB"
      }
    }
  },
  "responseTime": 5
}
```

**Verification:**
- [ ] Returns status 200
- [ ] status: "healthy"
- [ ] All services show "healthy"
- [ ] Response time < 100ms

## ☑️ Step 8: Open Swagger Documentation

Open in browser: http://localhost:4000/api/docs

**Verification:**
- [ ] Swagger UI loads successfully
- [ ] See "PrepPath API" title
- [ ] See 3 tags: auth, users, health
- [ ] See 20+ endpoints listed
- [ ] "Authorize" button visible at top

## ☑️ Step 9: Test User Registration

**In Swagger UI:**
1. Expand `POST /api/v1/auth/signup`
2. Click "Try it out"
3. Enter:
```json
{
  "email": "testuser@example.com",
  "password": "Test123!@#",
  "name": "Test User",
  "username": "testuser"
}
```
4. Click "Execute"

**Expected Response:**
- [ ] Status 201 Created
- [ ] Returns user object
- [ ] Returns accessToken
- [ ] Returns refreshToken

## ☑️ Step 10: Test User Login

**In Swagger UI:**
1. Expand `POST /api/v1/auth/login`
2. Click "Try it out"
3. Enter:
```json
{
  "email": "demo@preppath.com",
  "password": "Demo123!@#"
}
```
4. Click "Execute"

**Expected Response:**
- [ ] Status 200 OK
- [ ] Returns user object with:
  - id, email, name, username
  - role: "USER"
  - plan: "PRO"
  - credits: 100
- [ ] Returns accessToken
- [ ] Returns refreshToken

**Copy the accessToken for next step!**

## ☑️ Step 11: Test Protected Endpoint

**In Swagger UI:**
1. Click "Authorize" button (top right)
2. Enter: `Bearer YOUR_ACCESS_TOKEN`
3. Click "Authorize", then "Close"
4. Expand `GET /api/v1/auth/me`
5. Click "Try it out"
6. Click "Execute"

**Expected Response:**
- [ ] Status 200 OK
- [ ] Returns full user profile
- [ ] Includes preferences object
- [ ] All user fields populated

## ☑️ Step 12: Test Update Profile

**In Swagger UI:**
1. Expand `PUT /api/v1/users/profile`
2. Click "Try it out"
3. Enter:
```json
{
  "bio": "Testing PrepPath API",
  "location": "Test City"
}
```
4. Click "Execute"

**Expected Response:**
- [ ] Status 200 OK
- [ ] bio updated to "Testing PrepPath API"
- [ ] location updated to "Test City"

## ☑️ Step 13: Test Leaderboard

```bash
curl http://localhost:4000/api/v1/users/leaderboard?limit=5
```

**Expected Response:**
- [ ] Status 200 OK
- [ ] Returns array of users
- [ ] Sorted by totalPoints descending
- [ ] Admin user at top (100,000 points)

## ☑️ Step 14: Test OAuth Redirect (Optional)

Visit: http://localhost:4000/api/v1/auth/google

**Expected Behavior:**
- [ ] Redirects to Google login
- [ ] (Or shows error if Google OAuth not configured)

## ☑️ Step 15: Test Validation

**In Swagger UI:**
1. Try signup with invalid email:
```json
{
  "email": "invalid-email",
  "password": "Test123!@#",
  "name": "Test"
}
```

**Expected Response:**
- [ ] Status 422 Unprocessable Entity
- [ ] Validation error message
- [ ] "Please provide a valid email address"

## ☑️ Step 16: Test Rate Limiting

Run this command 101 times rapidly:
```bash
for i in {1..101}; do curl http://localhost:4000/api/v1/health; done
```

**Expected Behavior:**
- [ ] First 100 requests succeed
- [ ] 101st request gets rate limited (429 status)

## ☑️ Step 17: Verify Docker Logs

```bash
pnpm docker:logs
```

**Verification:**
- [ ] PostgreSQL logs show successful connections
- [ ] Redis logs show no errors
- [ ] MinIO logs show initialization

## ☑️ Step 18: Run Tests

```bash
pnpm --filter @preppath/api test
```

**Expected Output:**
- [ ] Tests run successfully
- [ ] Sample auth.service.spec.ts passes
- [ ] No test failures

## ☑️ Step 19: Start Frontend (Optional)

```bash
pnpm --filter @preppath/web dev
```

**Verification:**
- [ ] Next.js dev server starts
- [ ] Accessible at http://localhost:3000
- [ ] No compilation errors

## ☑️ Step 20: Final Verification

- [ ] API running on http://localhost:4000
- [ ] Swagger docs at http://localhost:4000/api/docs
- [ ] Health check returns "healthy"
- [ ] Can register new users
- [ ] Can login with demo credentials
- [ ] Can access protected endpoints with JWT
- [ ] Can update user profile
- [ ] Database has seeded data
- [ ] All Docker containers healthy
- [ ] No errors in console

## 🎉 Success!

If all checkboxes are ✅, your Phase 1 setup is **complete and working**!

## 🚨 Troubleshooting

### Docker containers not healthy?
```bash
docker-compose -f docker/docker-compose.yml down -v
docker-compose -f docker/docker-compose.yml up -d
```

### Prisma errors?
```bash
pnpm db:generate
pnpm db:reset
```

### Port conflicts?
- Change ports in docker-compose.yml
- Update .env.local DATABASE_URL
- Update PORT in .env.local

### TypeScript errors?
```bash
pnpm clean
pnpm install
pnpm db:generate
```

## 📊 Expected Project State

```
✅ 50+ files created
✅ 3 Docker containers running
✅ 7 database tables created
✅ 7 users seeded
✅ 20+ API endpoints working
✅ JWT authentication functional
✅ OAuth infrastructure ready
✅ Swagger docs accessible
✅ Tests passing
✅ No compilation errors
```

---

**All green? You're ready for Phase 2! 🚀**
