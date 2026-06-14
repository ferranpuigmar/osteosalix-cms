FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache python3 make g++

COPY package.json package-lock.json ./

RUN npm ci

COPY . ./

ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN npm run build

EXPOSE 1337

CMD ["npm", "run", "start"]
