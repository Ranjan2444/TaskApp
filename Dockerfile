# Use official Node.js image as base
FROM node:22-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if present)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files into the container
COPY . .

# Build the Vite app for production
RUN npm run build

# Expose port 4173
EXPOSE 4173

CMD ["npm","run","preview","--","--host"]
