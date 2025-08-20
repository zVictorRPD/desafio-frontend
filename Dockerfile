ARG NODE_VERSION=22.14.0
FROM node:${NODE_VERSION}-slim AS base

LABEL fly_launch_runtime="Vite"

WORKDIR /app

ENV NODE_ENV="production"

FROM base AS build

RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

COPY package-lock.json package.json ./
RUN npm ci --include=dev

COPY . .

RUN npm run build

RUN npm prune --omit=dev

FROM nginx

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD [ "/usr/sbin/nginx", "-g", "daemon off;" ]
