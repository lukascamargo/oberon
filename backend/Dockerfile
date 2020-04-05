FROM node:alpine
LABEL description='Ready-To-Go NodeJS Backend'

ENV NODE_ENV=PROD

COPY ./package.json /var/www/
COPY ./swagger/ /var/www/swagger/
COPY ./.env.dev /var/www/
COPY ./.env.qa /var/www/
COPY ./node_modules /var/www/node_modules

RUN date

WORKDIR /var/www/

ENTRYPOINT npm run prod
EXPOSE 3004
