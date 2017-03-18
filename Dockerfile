# Gets latest base image from https://registry.hub.docker.com/u/resin/edison-node/
FROM resin/edison-node:latest

# Enable systemd
ENV INITSYSTEM on

# Copy package.json to root of container
# This is copied independently for better caching.
COPY package.json /usr/src/app/package.json

WORKDIR /usr/src/app
# install all npm (node.js) dependencies
RUN npm install
RUN npm install mqtt



# Copy our node.js source code into /usr/src/app
COPY app/ /usr/src/app

# Run the main.js script when the container starts on the device.
CMD ["node", "/usr/src/app/main.js"]