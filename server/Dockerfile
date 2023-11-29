# syntax=docker/dockerfile:1
FROM node:18-alpine
WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
RUN npm i
COPY . ./
EXPOSE 3000
CMD ["node" , "index.js"]