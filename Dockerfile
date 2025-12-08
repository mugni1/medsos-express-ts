# Gunakan image Bun resmi
FROM oven/bun:canary-debian AS base

# Set working directory
WORKDIR /app

# Copy package.json dan lock file
COPY package.json bun.lock* ./

# Install dependencies
RUN bun install

# Copy source code
COPY . .

# Build jika menggunakan TypeScript
# RUN bun run build

# Expose port (sesuaikan dengan port aplikasi kamu)
EXPOSE 5050

# Command untuk menjalankan aplikasi
CMD ["bun", "run", "dev"]