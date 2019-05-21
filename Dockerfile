# Node Base Image
FROM node:lts-alpine

LABEL maintainer="vkasraj"
LABEL email="vikasraj1911@gmail.com"

# Making necessary folder for storing server and static frontend files
RUN mkdir -p /usr/src/app/static

# Defining working directory
WORKDIR /usr/src/app

# Production Environment
ENV NODE_ENV=production

# Exposing 5000 port of server for networking
EXPOSE 5000

# Copying server packages
COPY ./server/package*.json ./

# Installing server dependencies
RUN npm i --production

# Copying server files
COPY ./server ./

# Copying frontend files
COPY ./client/build ./static

# Container default command
CMD [ "npm", "start" ]