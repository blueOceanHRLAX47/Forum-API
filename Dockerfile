FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "node", "server/index.js" ]

# create the docker image by running the command below in terminal. Make sure to have .dockerignore w/ node_modules and npm-debug.log
# docker build . -t brettroberts/blue_ocean_forum_api

