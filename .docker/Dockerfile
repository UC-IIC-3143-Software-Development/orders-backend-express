FROM node:16.15.0-alpine

WORKDIR /home/app/api

COPY prisma ./prisma/
COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]