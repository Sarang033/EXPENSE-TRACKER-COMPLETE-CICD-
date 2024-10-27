# Use the official Node.js image as the base
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the backend source code
COPY . .

# Expose port 5001
EXPOSE 5001

# Start the server
CMD ["npm", "start"]
