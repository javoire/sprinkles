FROM node:0.10

WORKDIR /app

COPY ./ /app

RUN npm install --unsafe-perm .
RUN ./node_modules/bower/bin/bower install --allow-root --config.interactive=false
RUN ./node_modules/gulp/bin/gulp.js build

ENV PORT=80

CMD ["npm", "start"]

EXPOSE 80
