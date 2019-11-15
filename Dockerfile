# NOTE: yarn cli is already available in the node:lts-slim image
FROM node:lts-slim as production-env

LABEL maintainer="vkasraj"
LABEL twitter="@numToStr"

ENV NODE_ENV=production

USER node

RUN mkdir -p /usr/src/app && chown -R node:node /usr/src/app
WORKDIR /usr/src/app

COPY --chown=node:node ./package.json .
COPY --chown=node:node ./yarn.lock .
COPY --chown=node:node ./packages/client/package.json ./packages/client/
COPY --chown=node:node ./packages/server/package.json ./packages/server/

RUN yarn install --prod

# ---------------------------------------------

FROM production-env AS builder-env

RUN yarn

COPY --chown=node:node ./packages/client ./packages/client
COPY --chown=node:node ./packages/server ./packages/server

ENV NODE_ENV=development
ENV GENERATE_SOURCEMAP=false

RUN yarn build:client && yarn build:server

# ---------------------------------------------

FROM production-env AS final

ENV NODE_ENV=production

RUN rm -rf ./packages/

COPY --chown=node:node --from=builder-env /usr/src/app/packages/server/build/ ./packages/server/
COPY --chown=node:node --from=builder-env /usr/src/app/packages/client/build/ ./packages/server/static

