FROM node:14.18.1
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --force
COPY . .
RUN npm run build
EXPOSE 4200
CMD ["npm", "start"]