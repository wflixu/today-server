# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Today-server is a Node.js backend service built with Midway.js 3.x and TypeScript. It provides a multi-purpose API server with user authentication, file management, wallpaper services, and various utility features. The application uses PostgreSQL with TypeORM and follows Midway.js's dependency injection patterns.

**Node.js Version**: Requires Node.js 18+ (tested on Node.js 24 LTS)

## Development Commands

```bash
# Install dependencies
pnpm install            # Install all dependencies

# Development
pnpm run dev            # Start development server on port 8443
pnpm run build          # Build for production (compiles to dist/)
pnpm start              # Start production server

# Testing
pnpm test               # Run all tests with Node.js built-in test runner
pnpm run test:watch     # Run tests in watch mode
pnpm run test:coverage  # Run tests with coverage report (c8)

# Code Quality
pnpm run lint           # Check code style with mwts
pnpm run lint:fix       # Fix code style issues automatically

# Update dependencies
pnpm update             # Update all dependencies respecting version ranges
pnpm update --latest    # Update all dependencies to latest versions

# Deployment with PM2
pm2 start bootstrap.js --name today_server
pm2 list                # List all services
pm2 stop/restart/delete # Manage services
pm2 logs                # View service logs
```

## Architecture

### Framework Structure
The project follows Midway.js conventions with these key concepts:

- **Configuration**: Application setup in [src/configuration.ts](src/configuration.ts) with middleware, filters, and module imports
- **Controllers**: HTTP request handlers in [src/controller/](src/controller/) using `@Controller()` and `@Inject()` decorators
- **Services**: Business logic in [src/service/](src/service/) using `@Provide()` and `@Inject()` decorators
- **Entities**: TypeORM database models in [src/entity/](src/entity/)
- **Middleware**: Request processing pipeline in [src/middleware/](src/middleware/)
- **Filters**: Error handling in [src/filter/](src/filter/)

### Key Middleware Pipeline
Request processing follows this order (defined in [configuration.ts](src/configuration.ts:45-59)):
1. **FormatMiddleware** - Standardizes request/response format
2. **JwtPassportMiddleware** - JWT authentication (can be ignored per [config](src/config/config.default.ts:26-38))
3. **ReportMiddleware** - Request logging and rate limiting

### Authentication Pattern
- JWT-based authentication using Passport.js
- Routes can be excluded from auth by adding paths to `jwtPassport.ignore` in [config.default.ts](src/config/config.default.ts:26-38)
- User state attached to `ctx.user` after authentication
- Token expiration: 2 days

### Database Access
- TypeORM with PostgreSQL on port 5436
- Entities defined in [src/entity/](src/entity/)
- Repository pattern used in services: `@InjectEntityModel(EntityName)` decorator
- Key entities:
  - **User** - User accounts with roles
  - **UserRole, Role, Permission** - RBAC implementation
  - **Chunk** - File chunks with metadata
  - **URLChunk** - Cached URL responses
  - **ApiLog** - Request logging

### Configuration
- Environment configs: [config.default.ts](src/config/config.default.ts) (base), [config.prod.ts](src/config/config.prod.ts) (production), [config.unittest.ts](src/config/config.unittest.ts) (testing)
- `.env` file for sensitive data (loaded via dotenv)
- Port: 8443 (dev), configurable via `koa.port` config

### File Upload System
- Upload endpoint: `POST /chunk/upload` (configured to match this path in [config](src/config/config.default.ts:79))
- Temporary storage: `os.tmpdir()/midway-upload-files`
- Auto-cleanup: 5 hours after upload
- Whitelist: configurable file extensions (`.json` added to defaults)

### Error Handling
Global filters defined in [configuration.ts](src/configuration.ts:55-59):
- **NotFoundFilter** - 404 errors
- **UnauthorizedErrorFilter** - 401 authentication errors
- **DefaultErrorFilter** - All other errors

Response format controlled by `resultFormat.ignore` config - routes in this list return raw responses (e.g., `/chunk/show`, `/wallpaper`)

## Adding New Features

### New API Endpoint
1. Create entity in [src/entity/](src/entity/) if database access needed
2. Create service in [src/service/](src/service/) with `@Provide()` decorator
3. Create controller in [src/controller/](src/controller/) with `@Controller()` and `@Inject()` the service
4. Add route to `jwtPassport.ignore` in [config.default.ts](src/config/config.default.ts:26-38) if public access needed
5. Write test in [test/](test/) directory

### Database Migration
Set `synchronize: true` in [config.default.ts](src/config/config.default.ts:57) ONLY for initial setup (will drop data). For production, use proper migrations.

### Adding Third-Party Services
Midway.js has a plugin ecosystem. Install the package and add to `imports` in [configuration.ts](src/configuration.ts:25-38). Example: Tencent Cloud SMS integration already configured.

## Code Style
- Uses **mwts** (Midway TypeScript Style) for linting
- Prettier for formatting
- TypeScript strict mode enabled
- Decorator-based dependency injection (Midway.js IoC container)

## Environment Variables
Required in `.env`:
- `secretId` - Tencent Cloud SMS
- `secretKey` - Tencent Cloud SMS
- Database credentials in [config.default.ts](src/config/config.default.ts:52-56) (hardcoded, consider moving to env)

## Testing
- **Node.js built-in test runner** (available since Node.js 18+)
- Test files located in [test/](test/) directory matching `**/*.test.ts` pattern
- Uses `tsx` for TypeScript execution
- Uses `node:test` for test framework and `node:assert` for assertions
- Use Midway.js mock utilities from `@midwayjs/mock`
- Coverage reports generated with **c8**
- Run single test: `pnpm test test/controller/home.test.ts`
- Watch mode for development: `pnpm run test:watch`
