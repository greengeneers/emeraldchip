# Stage 1: Build frontend
FROM node:22 AS frontend

WORKDIR /frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# Stage 2: Backend with static frontend
FROM node:22

WORKDIR /server
COPY server/package*.json ./
RUN npm install
COPY server/ .

# Copy built frontend into backend's public directory
COPY --from=frontend /frontend/dist ./public

# Set environment and expose port for our computer to assess
ENV PORT=3000
EXPOSE 3000

CMD ["npm", "start"]
