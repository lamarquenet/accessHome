FROM node:23-alpine
# Set working directory
WORKDIR /app

# Copy files and install deps
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Build the Next.js app
RUN npm run build

# --- Production stage ---
FROM node:23-alpine AS runner

WORKDIR /app

# Only copy necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3001

CMD ["npm", "start"]