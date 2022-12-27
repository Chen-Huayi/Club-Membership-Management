FROM node:16-alpine
WORKDIR /membership-management/server
ENV PATH /membership-management/server/node_modules/.bin:$PATH
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 12138
CMD ["npm", "start"]