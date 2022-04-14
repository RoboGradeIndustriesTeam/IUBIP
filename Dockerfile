FROM node:16-bullseye

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install dependencies
COPY package.json .
RUN yarn

# Bundle app source
COPY . .

# Exports
CMD [ "yarn", "dev.docker" ]