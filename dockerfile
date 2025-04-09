# --- First stage: Builder ---
FROM node:23-alpine AS builder
# Set working directory
WORKDIR /app

# Copy files and install deps
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

RUN npm run build

# --- Production stage ---
FROM node:23-alpine AS runner

WORKDIR /app

# Copiamos solo lo necesario para ejecutar standalone
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

ENV PORT=3001
ENV HOST=0.0.0.0

EXPOSE 3001

CMD ["npm", "run", "start"]
