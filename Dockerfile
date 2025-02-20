FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV VITE_USE_LOCAL_DATA="true"

EXPOSE 8080

CMD ["npm", "run", "dev"]