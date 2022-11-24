FROM node:16.15.0-alpine

WORKDIR /app

COPY prisma ./prisma
COPY package*.json ./

RUN npm install

COPY . ./

RUN npx prisma generate 

CMD [ "npm", "run", "dev" ]