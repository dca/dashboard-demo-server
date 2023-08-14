# 
#   Base layer
# 
FROM node:20.5.0 as base
RUN npm install -g pnpm

# 
#   Dependencies layer
# 
# FROM base as dependencies
FROM base as dependencies
# RUN apk add make g++ python3 git

RUN npm install -g pnpm node-gyp
WORKDIR /app

COPY tsconfig*.json ./
COPY package*.json pnpm-lock.yaml ./

# Install dependencies from pnpm-lock.yaml, see https://docs.npmjs.com/cli/v7/commands/npm-ci
RUN --mount=type=cache,target=/app/node_modules pnpm install --frozen-lockfile

# 
#   Building layer
# 
FROM base as build

WORKDIR /app
COPY . .
RUN --mount=type=cache,target=/app/node_modules pnpm install --frozen-lockfile

# Build application (produces dist/ folder)
RUN --mount=type=cache,target=/app/node_modules pnpm dlx prisma generate
RUN --mount=type=cache,target=/app/node_modules pnpm build
RUN pnpm prune --prod

#
#   Runtime layer
# 
FROM base as production

WORKDIR /app

COPY package*.json pnpm-lock.yaml ./

COPY --from=build /app/node_modules/ ./node_modules/
COPY --from=build /app/dist/ ./dist/

COPY .env ./

# Expose application port
EXPOSE 3000

# Start application
CMD [ "node", "dist/main.js" ]