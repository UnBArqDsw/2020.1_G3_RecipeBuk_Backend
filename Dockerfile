FROM node:12.2.0-alpine
RUN apk update && apk add bash

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

RUN npm i nodemon -g

COPY ./ /app

ENTRYPOINT ["./wait-for-it.sh", "db:5432", "--", "npm","run","start-dev"]

EXPOSE 3000