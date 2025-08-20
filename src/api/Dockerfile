ARG NODE_VERSION=22.14.0
FROM node:${NODE_VERSION}-slim AS base

WORKDIR /api

FROM base AS build

RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

RUN npm install json-server@^1.0.0-beta.3 -g

COPY . .

EXPOSE 80
CMD ["json-server", "/api/data.json", "--port", "80"]
