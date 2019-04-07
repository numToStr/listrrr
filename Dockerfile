FROM node:lts-alpine

RUN mkdir -p /usr/src/app/static

WORKDIR /usr/src/app

ENV NODE_ENV=production

EXPOSE 5000

COPY ./client/build ./static

COPY ./server/package*.json ./

RUN npm i --production

COPY ./server ./

CMD [ "npm", "start" ]