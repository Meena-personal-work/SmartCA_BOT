FROM node:20-alpine

# Set the working directory
ENV NODE_ENV=${NODE_ENV:-DEV}
ENV REACT_APP_SERVER_PREFIX=${REACT_APP_SERVER_PREFIX:-https://smartca-bot-mguqu.ondigitalocean.app} 
WORKDIR /app

RUN mkdir -p -m 0600 /app/client && \
    mkdir -p -m 0755 /app/server

# Add files
COPY ./server /app/server
COPY ./client /app/client

RUN npm config set strict-ssl false

RUN cd /app/client && npm ci --without-ssl --insecure --force
RUN cd /app/server && npm ci --without-ssl --insecure --force
RUN cd /app/client && npm rebuild node-sass && npm run build


EXPOSE 3001

CMD sh -c 'cd $WORKDIR/app/server && node ./index.js'

