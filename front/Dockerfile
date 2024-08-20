# Use an official Node runtime as a parent image
FROM node:21-alpine AS base

# Set the working directory in the container
WORKDIR /app

# Copy package.json and npm-lock.yaml
COPY package*.json ./

# Install dependencies
RUN yarn

# Copy local code to the container image
COPY . .

# Build the application
RUN yarn build

EXPOSE 3000

# Run the web service on container startup
CMD ["yarn", "start"]