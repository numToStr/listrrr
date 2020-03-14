# NOTE: yarn cli is already available in the node:lts-slim image

# This stage responsible for installing core and server packages
# Only PROUDUCTION package will be installed
# As it will be used as a base image to run our production app
FROM node:lts-slim AS production-env

LABEL maintainer="vkasraj"
LABEL twitter="@numToStr"

RUN mkdir -p /usr/src/app && chown -R node:node /usr/src/app
WORKDIR /usr/src/app

USER node

COPY --chown=node:node package.json .
COPY --chown=node:node yarn.lock .
COPY --chown=node:node tsconfig.json .
COPY --chown=node:node packages/core/package.json packages/core/
COPY --chown=node:node packages/server/package.json packages/server/

RUN yarn install --production

# ---------------------------------------------
# This stage is responsible for install development deps on top of production deps 
FROM production-env AS development-env

RUN yarn install

# Can get an error when installing packages in workspaces other than core
# Other workspace need to know about @listrrr/core package which will not be available
# If we install packages in parallel in different workspaces
# Have to make sure that, @listrrr/core should be built first

# ---------------------------------------------
# This stage is responsible for building our core, server
FROM development-env AS build-env

ENV NODE_ENV=production

COPY --chown=node:node packages/core packages/core
COPY --chown=node:node packages/server packages/server

# This will build server and core, as server and core are referenced project
RUN yarn build

# ---------------------------------------------
# This stage is the final app which will be run on our server
FROM production-env AS final-env

ENV NODE_ENV=production
ENV NODE_DEBUG=www

RUN rm -rf packages/

COPY --chown=node:node --from=build-env /usr/src/app/build/packages/ packages/

EXPOSE 5000

CMD [ "yarn", "server:prod" ]