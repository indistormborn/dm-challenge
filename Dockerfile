FROM node:12-slim

COPY ./index.js /opt/challenge/index.js
COPY ./src /opt/challenge/src
COPY ./package.json /opt/challenge/package.json
COPY ./init.sh /opt/challenge/init.sh
COPY ./.env /opt/challenge/.env

WORKDIR /opt/challenge

RUN npm install --production && chmod +x ./init.sh

CMD ["./init.sh"]
