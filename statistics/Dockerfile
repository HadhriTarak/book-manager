FROM node:19-buster As development

WORKDIR /usr/src/app

COPY ./package.json .
COPY ./.npmrc .

RUN npm i -g npm@latest; \
 # Install pnpm
 npm install -g pnpm; \
 pnpm --version; \
 pnpm setup; \
 mkdir -p /usr/local/share/pnpm &&\
 export PNPM_HOME="/usr/local/share/pnpm" &&\
 export PATH="$PNPM_HOME:$PATH"; \
 pnpm bin -g &&\
 # Install dependencies
 pnpm add -g @nestjs/cli &&\
 pnpm install

COPY . .

# Build
RUN exec sh && pnpm run build