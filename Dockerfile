FROM node:18-alpine AS base

# Install dependencies needed for node-gyp and Prisma
RUN apk add --no-cache libc6-compat python3 make g++

WORKDIR /app

# Copy application files
COPY package.json package-lock.json* ./
COPY prisma ./prisma
COPY . .

# Install dependencies
RUN npm ci

# Generate Prisma Client
RUN npx prisma generate

# Build the Next.js application
RUN npm run vercel-build

# Set production environment
ENV NODE_ENV production
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Set user for security
USER node

EXPOSE 3000

CMD ["npm", "start"]