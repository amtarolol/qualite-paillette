# Use official Node.js LTS slim image
FROM node:18-slim

# Set working directory inside container
WORKDIR /app

# Install system dependencies for openssl, netcat (optional), etc.
RUN apt-get update && apt-get install -y openssl libssl-dev netcat-openbsd && rm -rf /var/lib/apt/lists/*

# Copy package files and install dependencies
COPY package.json package-lock.json* ./
RUN npm ci --legacy-peer-deps

# Install wait-on globally (optional, useful for wait scripts)
RUN npm install -g wait-on pnpm

# Copy all source files
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Expose Next.js default port
EXPOSE 3000

# Copy entrypoint script and make executable
COPY docker-entrypoint.sh ./
RUN chmod +x docker-entrypoint.sh

# Entrypoint to run migrations before starting the app
ENTRYPOINT ["./docker-entrypoint.sh"]

# Default command to start Next.js in dev or production mode
CMD ["npm", "run", "dev"]
