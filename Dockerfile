# Use the official Node.js 20 image
FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Copy the credentials.json file
COPY config/service.json /app/config/service.json

# Expose the ports the app runs on
EXPOSE 3000
# EXPOSE 8080

# Set environment variables for Google Cloud credentials
ENV GOOGLE_APPLICATION_CREDENTIALS="/app/config/service.json"

ENV APP_ENV = "local"

# Start the application
CMD ["node", "src/server/server.js"]

