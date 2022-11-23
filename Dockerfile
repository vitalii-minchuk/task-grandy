FROM node:16.15.0-alpine

WORKDIR /home/app/api

COPY prisma ./prisma
COPY package*.json ./

RUN npm install

COPY . ./

RUN npm run prisma:generate

RUN npx prisma migrate reset  

CMD [ "npm", "run", "dev" ]