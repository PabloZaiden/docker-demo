FROM node:5-slim

WORKDIR /app
COPY ./package.json /app/package.json

RUN npm install
COPY . /app

EXPOSE 3000/tcp
ENTRYPOINT npm start