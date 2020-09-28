FROM node:12.2.0-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

RUN npm i nodemon -g

COPY ./ /app

CMD ["npm","run","start-dev"] 

EXPOSE 3000