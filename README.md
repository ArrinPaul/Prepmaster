# 🚀 PrepPath - Complete Interview Preparation Platform

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen.svg)](https://nodejs.org)
[![PNPM](https://img.shields.io/badge/pnpm-%3E%3D8.0.0-orange.svg)](https://pnpm.io)

A production-ready full-stack interview preparation platform built with **Next.js**, **NestJS**, **Prisma**, and **PostgreSQL**.

## ✨ Features (Phase 1 Complete)

- ✅ **Monorepo Architecture** - Turborepo workspace with apps and packages
- ✅ **Complete Authentication System**
  - Email/Password registration and login
  - JWT access and refresh tokens
  - OAuth integration (Google, GitHub, LinkedIn)
  - 2FA ready infrastructure
- ✅ **User Management**
  - Comprehensive user profiles
  - Preferences and settings
  - Gamification (streaks, points, credits)
  - User statistics and leaderboard
- ✅ **Production Infrastructure**
  - Docker development environment
  - PostgreSQL with Prisma ORM
  - Redis caching layer
  - MinIO object storage
  - Health checks and monitoring
  - API documentation with Swagger
  - Security best practices

## 🚀 Quick Start

```bash
# 1. Install dependencies
pnpm install

# 2. Start Docker services (PostgreSQL, Redis, MinIO)
pnpm docker:up

# Wait ~10 seconds for services to be healthy

# 3. Generate Prisma client
pnpm db:generate

# 4. Run database migrations
pnpm db:migrate

# 5. Seed the database with test data
pnpm db:seed

# 6. Start the API server
pnpm --filter @preppath/api dev

# 7. Test it (in a new terminal)
curl http://localhost:4000/api/v1/health

# 8. Open Swagger docs
# Visit: http://localhost:4000/api/docs
```

## 🌐 Development URLs

- **Backend API**: http://localhost:4000/api/v1
- **API Docs (Swagger)**: http://localhost:4000/api/docs
- **Frontend** (Next.js): http://localhost:3000
- **Prisma Studio**: http://localhost:5555 (run `pnpm db:studio`)
- **MinIO Console**: http://localhost:9001

## 🔐 Test Credentials (After Seeding)

```
Admin Account:
  Email: admin@preppath.com
  Password: Admin123!@#

Demo User (ArrinPaul):
  Email: demo@preppath.com
  Password: Demo123!@#

Test User:
  Email: sarah.chen@example.com
  Password: Test123!@#
```

## 📁 Project Structure

```
preppath/
├── apps/
│   ├── web/              # Next.js frontend application
│   └── api/              # NestJS backend API
│       ├── src/
│       │   ├── auth/     # Authentication module (JWT + OAuth)
│       │   ├── users/    # User management module
│       │   ├── health/   # Health checks module
│       │   ├── prisma/   # Prisma service
│       │   ├── app.module.ts
│       │   └── main.ts
│       └── package.json
├── packages/
│   └── database/         # Shared Prisma schema and migrations
│       ├── prisma/
│       │   ├── schema.prisma
│       │   └── seed.ts
│       └── package.json
├── docker/
│   └── docker-compose.yml  # PostgreSQL, Redis, MinIO
├── .env.example
├── package.json          # Root workspace configuration
├── pnpm-workspace.yaml
├── turbo.json
└── README.md
```

## 📚 API Endpoints

### Authentication (`/api/v1/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/signup` | Register new user | No |
| POST | `/auth/login` | Login with credentials | No |
| POST | `/auth/refresh` | Refresh access token | No |
| POST | `/auth/logout` | Logout user | Yes |
| GET | `/auth/me` | Get current user | Yes |
| GET | `/auth/google` | Google OAuth login | No |
| GET | `/auth/github` | GitHub OAuth login | No |
| GET | `/auth/linkedin` | LinkedIn OAuth login | No |

### Users (`/api/v1/users`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/users/profile` | Get user profile | Yes |
| PUT | `/users/profile` | Update profile | Yes |
| GET | `/users/preferences` | Get preferences | Yes |
| PUT | `/users/preferences` | Update preferences | Yes |
| GET | `/users/stats` | Get user statistics | Yes |
| GET | `/users/leaderboard` | Get leaderboard | No |
| GET | `/users/:username` | Get public profile | No |
| DELETE | `/users/account` | Delete account | Yes |

### Health (`/api/v1/health`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Full health check |
| GET | `/health/ready` | Readiness probe |
| GET | `/health/live` | Liveness probe |

## 🛠 Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first styling
- **Radix UI** - Accessible components
- **Framer Motion** - Animations

### Backend
- **NestJS** - Progressive Node.js framework
- **Prisma** - Next-generation ORM
- **PostgreSQL** - Production database
- **JWT** - Authentication tokens
- **Passport** - OAuth strategies
- **Swagger** - API documentation

### Infrastructure
- **Turborepo** - Monorepo build system
- **Docker** - Containerization
- **Redis** - Caching and sessions
- **MinIO** - Object storage

## 💻 Development Commands

### Workspace Commands
```bash
pnpm dev                    # Start all services
pnpm build                  # Build all apps
pnpm test                   # Run all tests
pnpm lint                   # Lint all packages
pnpm clean                  # Remove all build artifacts
```

### Docker Commands
```bash
pnpm docker:up              # Start Docker services
pnpm docker:down            # Stop and remove services
pnpm docker:logs            # View Docker logs
```

### Database Commands
```bash
pnpm db:generate            # Generate Prisma client
pnpm db:migrate             # Run migrations
pnpm db:seed                # Seed database
pnpm db:studio              # Open Prisma Studio
pnpm db:reset               # Reset database (⚠️ deletes all data)
```

### Individual App Commands
```bash
# Backend only
pnpm --filter @preppath/api dev
pnpm --filter @preppath/api build
pnpm --filter @preppath/api test

# Frontend only
pnpm --filter @preppath/web dev
pnpm --filter @preppath/web build
```

## 🗄 Database Schema

### Main Tables

- **users** - User accounts with authentication and gamification
- **accounts** - OAuth provider accounts
- **sessions** - Active user sessions
- **refresh_tokens** - JWT refresh tokens
- **user_preferences** - User settings and preferences
- **system_config** - Application configuration
- **audit_logs** - Audit trail

### User Roles
- `USER` - Standard user
- `ADMIN` - Administrator
- `MODERATOR` - Content moderator
- `INSTRUCTOR` - Course instructor

### Subscription Plans
- `FREE` - 10 credits/month
- `PRO` - 100 credits/month
- `ENTERPRISE` - Unlimited

## 🔒 Security Features

- **Helmet** - Security headers
- **Rate Limiting** - 100 requests/minute
- **Password Hashing** - bcrypt with 12 rounds
- **JWT Tokens** - Short-lived access tokens (15m) + refresh tokens (7d)
- **Input Validation** - class-validator with strict rules
- **CORS** - Configured for production domains
- **SQL Injection Protection** - Prisma parameterized queries

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run API tests with coverage
pnpm --filter @preppath/api test:cov

# Run tests in watch mode
pnpm --filter @preppath/api test:watch
```

## 🚀 Deployment

### Environment Variables

Copy `.env.example` to `.env.local` and configure:

```bash
NODE_ENV=production
DATABASE_URL=postgresql://...
JWT_SECRET=<strong-secret-min-32-chars>
JWT_REFRESH_SECRET=<different-strong-secret>
FRONTEND_URL=https://preppath.com

# OAuth (optional)
GOOGLE_CLIENT_ID=...
GITHUB_CLIENT_ID=...
LINKEDIN_CLIENT_ID=...
```

### Production Build

```bash
# Build all apps
pnpm build

# Start production server
pnpm --filter @preppath/api start:prod
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

Built with ❤️ by [Arrin Paul](https://github.com/ArrinPaulsee)

## 📞 Support

- **GitHub Issues**: [Report a bug](https://github.com/ArrinPaulsee/Prepmaster/issues)
- **Email**: support@preppath.com

---

**Happy Coding! 🚀**
