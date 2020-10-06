# Dockerfile
FROM buildkite/puppeteer:latest
RUN mkdir /app
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn && yarn cache clean
COPY . .