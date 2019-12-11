# NOTE: yarn cli is already available in the node:lts-slim image

# This stage responsible for installing core and server packages
# Only PROUDUCTION package will be installed
# As it will be used as a base image to run our production app
FROM node:lts-slim AS core-env

LABEL maintainer="vkasraj"
LABEL twitter="@numToStr"

RUN mkdir -p /usr/src/app && chown -R node:node /usr/src/app
WORKDIR /usr/src/app

USER node

COPY --chown=node:node package.json .
COPY --chown=node:node packages/core/package.json packages/core/
COPY --chown=node:node packages/server/package.json packages/server/

RUN yarn install --production --no-lockfile

# ---------------------------------------------
# This stage is responsible for building our core, client, server
# Client dependencies will be installed in this stage as it does not require in core-env 
FROM core-env AS builder-env

RUN yarn install --no-lockfile

COPY --chown=node:node packages/core packages/core
COPY --chown=node:node packages/server packages/server

ENV NODE_ENV=production

# Can get an error when installing packages in workspaces other than core
# Other workspace need to know about @listrrr/core package which will not be available
# If we install packages in parallel in different workspaces
# Have to make sure that, @listrrr/core should be built first

RUN yarn build:core && yarn build:server

# ---------------------------------------------
# This stage is the final app which will be run on our server
FROM core-env AS final-env

ENV NODE_ENV=production
ENV NODE_DEBUG=www

RUN rm -rf packages/

COPY --chown=node:node --from=builder-env /usr/src/app/packages/core/ packages/core/
COPY --chown=node:node --from=builder-env /usr/src/app/packages/server/build/ packages/server/

EXPOSE 5000

CMD [ "yarn", "start" ]