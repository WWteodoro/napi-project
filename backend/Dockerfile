
# PRODUCTION DOCKERFILE
# ---------------------
# This Dockerfile allows to build a Docker image of the NestJS application
# and based on a NodeJS 14 image. The multi-stage mechanism allows to build
# the application in a "builder" stage and then create a lightweight production
# image containing the required dependencies and the JS build files.
#
# Dockerfile best practices
# https://docs.docker.com/develop/develop-images/dockerfile_best-practices/
# Dockerized NodeJS best practices
# https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md
# https://www.bretfisher.com/node-docker-good-defaults/
# http://goldbergyoni.com/checklist-best-practice-of-node-js-in-production/

FROM node:16 as builder

ENV NODE_ENV build

WORKDIR /app

COPY . /app


RUN apt-get update && apt-get -y install cmake
RUN yarn install --frozen-lockfile --network-timeout 1000000


RUN yarn build

# ---

FROM node:16

ENV NODE_ENV production

USER node
WORKDIR /home/node

COPY --from=builder /app/package.json /home/node/
COPY --from=builder /app/yarn.lock /home/node/
COPY --from=builder /app/node_modules/ /home/node/node_modules/
COPY --from=builder /app/dist/ /home/node/dist/

EXPOSE 3000

CMD ["node", "dist/src/main.js"]
