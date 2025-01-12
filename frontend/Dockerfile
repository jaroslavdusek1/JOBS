# Node.js 18 image
FROM node:18

# Workdir
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install deps
RUN npm install

# Copy source code
COPY . .

# Used port
EXPOSE 3000

# Default cmd
CMD ["npm", "run", "dev"]
