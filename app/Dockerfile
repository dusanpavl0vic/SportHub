# Stage 1: Install dependencies and build
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and pnpm lock file first (to leverage Docker cache)
COPY package.json pnpm-lock.yaml ./

# Install PNPM globally
RUN corepack enable && pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build the NestJS app
RUN pnpm run build

# Stage 2: Run the application
FROM node:18-alpine AS runner

WORKDIR /app

# Copy built files and dependencies from builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Expose application port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production

# Run the application
CMD ["node", "dist/main"]
