# ====================
# --- Build Assets ---
# ====================
FROM node:24-alpine AS assets

RUN apk add yarn g++ make cmake python3 --no-cache

WORKDIR /wiki

COPY ./package.json ./patches/ ./

RUN yarn --frozen-lockfile --non-interactive

COPY ./.babelrc ./.eslintignore ./.eslintrc.yml ./
COPY ./dev ./dev
COPY ./client ./client

RUN yarn build

# ====================
# --- Prepare Env ---
# ====================
FROM node:24-alpine AS env

RUN apk add yarn g++ make cmake python3 --no-cache

WORKDIR /wiki

COPY ./package.json ./patches/ ./

RUN yarn --production --frozen-lockfile --non-interactive
RUN yarn patch-package

# ===============
# --- Release ---
# ===============
FROM node:24-alpine
LABEL maintainer="requarks.io"

RUN apk add bash curl git openssh gnupg sqlite --no-cache && \
    mkdir -p /wiki /logs /wiki/data/content && \
    chown -R node:node /wiki /logs

WORKDIR /wiki

COPY --chown=node:node --from=assets /wiki/assets ./assets
COPY --chown=node:node --from=env /wiki/node_modules ./node_modules
COPY --chown=node:node ./server ./server
COPY --chown=node:node --from=assets /wiki/server/views ./server/views
COPY --chown=node:node ./dev/build/config.yml ./config.yml
COPY --chown=node:node ./package.json ./package.json
COPY --chown=node:node ./LICENSE ./LICENSE

USER node

VOLUME ["/wiki/data/content"]
EXPOSE 3000 3443

CMD ["node", "--no-deprecation", "server"]
