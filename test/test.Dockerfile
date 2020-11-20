FROM node:12.2.0-alpine

RUN apk update && apk add bash

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY ./ /app

COPY wait-for-it.sh wait-for-it.sh

RUN chmod +x wait-for-it.sh

LABEL test=true 

ENTRYPOINT ["./wait-for-it.sh", "db:5432", "--", "npm","run","test"]

