FROM node:16-alpine
WORKDIR /membership-management/client
ENV PATH /membership-management/client/node_modules/.bin:$PATH
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]