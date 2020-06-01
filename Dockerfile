FROM node:10-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

USER node

RUN yarn install --network-timeout 100000

COPY --chown=node:node . .

EXPOSE 8080

CMD [ "node", "server.js" ]
