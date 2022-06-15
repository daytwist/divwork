FROM node:16.15-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY . .

RUN yarn install
RUN yarn build
