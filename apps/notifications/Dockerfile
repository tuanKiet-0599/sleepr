FROM node:alpine As development
 
WORKDIR /usr/src/app
 
COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

RUN  yarn install

COPY apps/notifications apps/notifications
COPY libs libs
 
RUN  yarn build notifications
 
CMD ["node", "dist/apps/notifications/main"]