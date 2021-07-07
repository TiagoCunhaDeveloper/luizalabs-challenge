FROM node:14
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm run migrate:delete
RUN npm run migrate:load

ARG PORT=8080
EXPOSE ${PORT}
CMD ["npm", "run", "start:prod"]