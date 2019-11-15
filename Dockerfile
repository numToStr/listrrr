# NOTE: yarn cli is already available in the node:lts-slim image
FROM node:lts-slim as production-env

LABEL maintainer="vkasraj"
LABEL twitter="@numToStr"

ENV NODE_ENV=production

RUN mkdir -p /usr/src/app && chown -R node:node /usr/src/app
WORKDIR /usr/src/app

USER node

# Can get an error when installing packages in workspaces other than core
# Other workspace need to know about @listrrr/core package which will not be available
# If we install packages in parallel in different workspaces
# Have to make sure that, @listrrr/core should be built first [To be fixed/changed]

COPY --chown=node:node ./package.json .
COPY --chown=node:node ./yarn.lock .
COPY --chown=node:node ./packages/core/package.json ./packages/core/
COPY --chown=node:node ./packages/client/package.json ./packages/client/
COPY --chown=node:node ./packages/server/package.json ./packages/server/

RUN yarn install --prod

# ---------------------------------------------

FROM production-env AS builder-env

ENV NODE_ENV=development

RUN yarn

COPY --chown=node:node ./packages/core ./packages/core
COPY --chown=node:node ./packages/client ./packages/client
COPY --chown=node:node ./packages/server ./packages/server

ENV NODE_ENV=production
ENV GENERATE_SOURCEMAP=false

RUN yarn build:core && yarn build:client && yarn build:server

# ---------------------------------------------

FROM production-env AS final

ENV NODE_ENV=production

RUN rm -rf ./packages/

COPY --chown=node:node --from=builder-env /usr/src/app/packages/core/build/ ./packages/core/
COPY --chown=node:node --from=builder-env /usr/src/app/packages/server/build/ ./packages/server/
COPY --chown=node:node --from=builder-env /usr/src/app/packages/client/build/ ./packages/server/static

