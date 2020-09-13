FROM node:12.2.0-alpine

WORKDIR /app

COPY ./ ./

RUN npm install

RUN npm i nodemon -g

COPY ./ /app

CMD ["npm","run","start-dev"] 

EXPOSE 3000