# Use an official Node runtime as a parent image
FROM node:21-alpine AS base

# Set the working directory in the container
WORKDIR /src/main.ts

# Copy package.json and npm-lock.yaml
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy local code to the container image
COPY . .

# Build the application
RUN npm run build

EXPOSE 8000

# Run the web service on container startup
CMD ["npm", "run", "start"]