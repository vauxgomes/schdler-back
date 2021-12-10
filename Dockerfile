# Image
FROM node:16

# App directory
WORKDIR /usr/src/schdler-back

# Install app dependencies
COPY package*.json ./

# Development build
RUN npm install

# Production build
# RUN npm ci --only=production

# Bunddle app source
COPY . .

EXPOSE 3333
CMD ["node", "src/index.js"]