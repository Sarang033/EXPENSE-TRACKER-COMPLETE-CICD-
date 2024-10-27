# Use Node.js to build the frontend assets
FROM node:20 as build

# Set working directory and copy files
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Build the React application
RUN npm run build

# Use Nginx to serve the build files
FROM nginx:alpine

# Copy the build files to Nginx's default public directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 3000
EXPOSE 3000
