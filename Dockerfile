# 
#   Base layer
# 
FROM node:20.5.0-alpine as base
RUN npm i -g pnpm

# 
#   Dependencies layer
# 
FROM base as dependencies
WORKDIR /app
COPY tsconfig*.json ./
COPY package*.json pnpm-lock.yaml ./

# Install dependencies from pnpm-lock.yaml, see https://docs.npmjs.com/cli/v7/commands/npm-ci
RUN pnpm install --frozen-lockfile

# 
#   Building layer
# 
FROM base as build

WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules/ ./node_modules/

# Build application (produces dist/ folder)
RUN pnpm build
RUN pnpm prune --prod

#
#   Runtime layer
# 
FROM base as production

WORKDIR /app

COPY package*.json pnpm-lock.yaml ./

COPY --from=build /app/node_modules/ ./node_modules/
COPY --from=build /app/dist/ ./dist/

# Expose application port
EXPOSE 3000

# Start application
CMD [ "node", "dist/main.js" ]