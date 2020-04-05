FROM node:alpine
LABEL description='Ready-To-Go NodeJS Backend'

ENV NODE_ENV=PROD

COPY ./package.json /var/www/
COPY ./swagger/ /var/www/swagger/
COPY ./.env.prod /var/www/

WORKDIR /var/www/
RUN npm install
RUN tsc

ENTRYPOINT npm run prod
EXPOSE 80
