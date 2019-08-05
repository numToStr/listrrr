# Node Base Image
FROM node:lts-alpine

# Production Environment
# Exposing 5000 port of server for networking
ENV NODE_ENV=production
EXPOSE 5000

# Author Info
LABEL maintainer="vkasraj"
LABEL email="vikasraj1911@gmail.com"

# Making necessary folder 
# Server will be stored at /usr/src/app
# Static/React frontend will stored at /usr/src/app/static
RUN mkdir -p /usr/src/app/static && chown -R node:node /usr/src/app

# Defining working directory
WORKDIR /usr/src/app

# Defining the current user
USER node

# Copying server packages
COPY --chown=node:node ./server/package*.json ./

# Installing server dependencies
RUN npm ci && npm cache clean --force

# Copying server files
COPY --chown=node:node ./server ./

# Copying frontend files
COPY --chown=node:node ./client/build ./static

# Container default command
CMD [ "node", "bin/www.js" ]