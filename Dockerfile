FROM node:16

RUN mkdir -p /usr/src/new_start_vue

WORKDIR /usr/src/new_start_vue

COPY . .

# RUN yarn && yarn build-only
RUN yarn

EXPOSE 6688

CMD yarn dev