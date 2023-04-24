FROM node:16-alpine

WORKDIR /front-end

COPY /front-end /front-end

RUN yarn install && \
    yarn build

EXPOSE 80

CMD ["yarn", "start"]

