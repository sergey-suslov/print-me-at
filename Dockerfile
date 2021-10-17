FROM node:14-alpine as builder

WORKDIR /usr/src/app

COPY . .

RUN npm ci && npm run prebuild && npm run build && npm prune --production

FROM node:14-alpine

WORKDIR /usr/src/app
COPY --from=builder /usr/src/app .

CMD [ "npm", "run", "start:prod" ]

