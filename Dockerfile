FROM node:alpine

COPY . .

RUN npm install -g grunt-cli
RUN npm install
RUN grunt build

CMD ["npm", "start"]