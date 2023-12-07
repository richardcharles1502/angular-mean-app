# Use a specific version of Node as the base image
FROM node:18

# Set the working directory within the container
WORKDIR /app

# Copy only the package files to leverage Docker layer caching
COPY package.json package-lock.json* /app/

# Install app dependencies using npm ci
RUN npm ci --silent

# Install Angular CLI globally (if needed)
RUN npm install -g @angular/cli@latest --silent

# Copy the entire project to the container
COPY . /app

# Start the app
CMD ["ng", "serve", "--host", "0.0.0.0"]
