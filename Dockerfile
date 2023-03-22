FROM node:16

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --production

COPY . .

EXPOSE 3002

CMD ["npm", "start"]