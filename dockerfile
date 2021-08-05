FROM node:alpine

WORKDIR /usr/src/ltc

COPY package.json yarn.lock ./
RUN yarn

COPY . .

RUN yarn build
CMD ["yarn", "start"]