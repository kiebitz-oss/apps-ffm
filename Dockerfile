## builder
# Rebuild the source code only when needed
FROM node:16-alpine AS builder

WORKDIR /build

COPY . .

RUN apk add --no-cache git
RUN yarn install
RUN yarn build:apps:user
RUN yarn build:apps:provider
RUN yarn build:apps:mediator

## prod
FROM nginx:alpine

WORKDIR /app

COPY --from=builder build/apps/user/dist user
COPY --from=builder build/apps/provider/dist provider
COPY --from=builder build/apps/mediator/dist mediator
COPY --from=builder build/.docker/nginx.conf /etc/nginx/conf.d/default.conf

RUN nginx -t

EXPOSE 3000

ENV PORT 3000
ENV NEXT_TELEMETRY_DISABLED 1

CMD ["nginx", "-g", "daemon off;"]
