# This dockerfile builds three distinct nextjs-apps as static html into one combined nginx-image

## builder
FROM node:16-alpine AS builder

WORKDIR /build

COPY . .

ENV NEXT_TELEMETRY_DISABLED 1
ENV NEXT_PROVIDER_BASEPATH "/provider"
ENV NEXT_MEDIATOR_BASEPATH "/mediator"

ARG KIEBITZ_APPOINTMENTS_ENDPOINT
ENV KIEBITZ_APPOINTMENTS_ENDPOINT $KIEBITZ_APPOINTMENTS_ENDPOINT

ARG KIEBITZ_STORAGE_ENDPOINT
ENV KIEBITZ_STORAGE_ENDPOINT $KIEBITZ_STORAGE_ENDPOINT

# if those vars are set while doing the build, the apps will use those api-urls.
# if not, the url of the app will be used: $(origin)/api/v1/[appointments|storage]
# ENV KIEBITZ_APPOINTMENTS_ENDPOINT "http://localhost:22222/jsonrpc"
# ENV KIEBITZ_STORAGE_ENDPOINT "http://localhost:11111/jsonrpc"

ENV NODE_ENV "production"

RUN npm i --global pnpm
RUN pnpm install --ignore-scripts --prod
RUN pnpm build:i18n
RUN pnpm build

## origin
FROM nginxinc/nginx-unprivileged:stable-alpine AS origin

WORKDIR /app

COPY --from=builder build/apps/user/dist .
COPY --from=builder build/apps/provider/dist provider
COPY --from=builder build/apps/mediator/dist mediator
COPY --from=builder build/.docker/nginx.conf /etc/nginx/conf.d/default.conf

RUN nginx -t

USER nginx
EXPOSE 3000

ADD  https://raw.githubusercontent.com/thomasfricke/container-hardening/main/harden /harden

WORKDIR /
USER 0

RUN chmod +x /harden
RUN mkdir /tmp/harden

RUN /harden  -d /usr/sbin/nginx \
             -f /etc/nginx  /var/log/nginx/ /var/run/nginx.pid /var/cache/nginx  /etc/passwd /etc/group \
                /usr/share/nginx /usr/share/licenses/ /var/run /app /tmp \
             -c /var/log/nginx/ /var/cache/nginx /var/run


## harden
FROM scratch

COPY --from=origin /tmp/harden/ /

USER 101

WORKDIR /app

EXPOSE 3000

ENTRYPOINT ["/usr/sbin/nginx","-g","daemon off;"]