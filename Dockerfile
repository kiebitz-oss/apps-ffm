# This dockerfile builds three distinct sveltekit-apps as static html into one combined nginx-image

## builder
FROM node:16-alpine AS builder

WORKDIR /build

ENV CI=true

# Install pnpm
ARG PNPM_VERSION=6.29.1
RUN npm --global install pnpm@${PNPM_VERSION}

# Add app source and install Node deps offline.
COPY .npmrc package.json pnpm-lock.yaml ./
RUN pnpm fetch

ADD . .
RUN pnpm install --prefer-offline --frozen-lockfile --recursive --ignore-scripts --no-optional 

# Setup env-vars
ARG VITE_IMPFEN_APPOINTMENTS_ENDPOINT
ENV VITE_IMPFEN_APPOINTMENTS_ENDPOINT $VITE_IMPFEN_APPOINTMENTS_ENDPOINT

ARG VITE_IMPFEN_STORAGE_ENDPOINT
ENV VITE_IMPFEN_STORAGE_ENDPOINT $VITE_IMPFEN_STORAGE_ENDPOINT

ARG VITE_IMPFEN_BEACON_ENDPOINT
ENV VITE_IMPFEN_BEACON_ENDPOINT $VITE_IMPFEN_BEACON_ENDPOINT

# Build application for production.
RUN pnpm build

## origin
FROM nginxinc/nginx-unprivileged:stable-alpine AS origin

WORKDIR /app

# copy our statically built files over
COPY --from=builder build/apps/user/dist .
COPY --from=builder build/apps/provider/dist provider
COPY --from=builder build/apps/mediator/dist mediator
COPY --from=builder build/.docker/nginx.conf /etc/nginx/conf.d/default.conf

# check nginx config
RUN nginx -t

USER nginx

# harden nginx
ADD  https://raw.githubusercontent.com/thomasfricke/container-hardening/main/harden /harden

WORKDIR /

# we need root!
USER 0

RUN chmod +x /harden
RUN mkdir /tmp/harden

RUN /harden  -d /usr/sbin/nginx \
  -f /etc/nginx  /var/log/nginx/ /var/run/nginx.pid /var/cache/nginx  /etc/passwd /etc/group \
  /usr/share/nginx /usr/share/licenses/ /var/run /app /tmp \
  -c /var/log/nginx/ /var/cache/nginx /var/run

## bring everything together for release
FROM scratch

WORKDIR /
USER 101

COPY --from=origin /tmp/harden/ .


EXPOSE 3000

ENTRYPOINT ["/usr/sbin/nginx","-g","daemon off;"]
