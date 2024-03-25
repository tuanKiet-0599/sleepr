FROM node:alpine As development
 
WORKDIR /usr/src/app
 
COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

# RUN  npm install -g yarn

RUN yarn install
COPY apps/auth apps/auth
COPY libs libs


RUN yarn build auth
 
CMD ["node", "dist/apps/auth/main"]