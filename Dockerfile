FROM node:0.10

WORKDIR /app

COPY ./ /app

RUN npm install --unsafe-perm .

CMD ["npm", "start"]

EXPOSE 4444