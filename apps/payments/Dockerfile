FROM node:alpine As development
 
WORKDIR /usr/src/app
 
COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

# RUN  npm install -g yarn
RUN  yarn install

COPY apps/payments apps/payments
COPY libs libs
 
# RUN cd apps/payments &&  yarn install
RUN  yarn build payments
 
CMD ["node", "dist/apps/payments/main"]