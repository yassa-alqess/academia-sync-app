# Use the official Node.js 18 image as base
FROM node:18.17.0 AS dev

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to container
COPY package*.json ./

# Install NestJS dependencies
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --include=dev

# Copy the entire project to the container
COPY . .

# Expose port 8085
EXPOSE 8085

# Command to run your NestJS application
CMD ["npm", "start"]
