FROM node:14-alpine as web-builder

WORKDIR /app
COPY web/package.json web/yarn.lock ./
RUN yarn
COPY web ./
RUN yarn build


FROM node:14-alpine

WORKDIR /app

COPY certificateServer/package.json certificateServer/yarn.lock certificateServer/
COPY checkingServer/package.json checkingServer/yarn.lock checkingServer/
COPY mailServer/package.json mailServer/yarn.lock mailServer/
COPY subscriptionServer/package.json subscriptionServer/yarn.lock subscriptionServer/
COPY userServer/package.json userServer/yarn.lock userServer/

RUN yarn --cwd certificateServer --production \
  && yarn --cwd checkingServer --production \
  && yarn --cwd mailServer --production \
  && yarn --cwd subscriptionServer --production \
  && yarn --cwd userServer --production \
  && yarn global add http-server-spa

COPY certificateServer/src certificateServer/src
COPY checkingServer/src checkingServer/src
COPY mailServer/src mailServer/src
COPY subscriptionServer/src subscriptionServer/src
COPY userServer/src userServer/src
COPY --from=web-builder /app/build web

EXPOSE 3333
CMD ["ash"]
