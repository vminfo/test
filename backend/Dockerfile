FROM node:17-alpine3.14

WORKDIR /app/backend

COPY package*.json ./

RUN npm install

RUN apk add --update bash

COPY . .
RUN chmod +x /app/backend/backend.sh
ENTRYPOINT ["/app/backend/backend.sh"]


