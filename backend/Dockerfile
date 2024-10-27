# Stage 1: Build the app (if required)
FROM node:14

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Copy the .env file
COPY .env .env

CMD ["node", "server.js"]
