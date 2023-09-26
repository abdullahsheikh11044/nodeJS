# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose a port (if your Node.js app listens on a specific port)
EXPOSE 5000

# Define the command to run your Node.js application
CMD ["node", "server.js"]
