# Stage 1: Build React App
FROM node:22-alpine AS build
WORKDIR /app

# Install dependencies first (leveraging Docker cache)
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Copy the full source code
COPY . .

# Set environment variables
ENV VITE_USE_LOCAL_DATA="true"

# Build the React app
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:stable-alpine AS production

# Copy built React files from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy ngnix configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose the default HTTP port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]