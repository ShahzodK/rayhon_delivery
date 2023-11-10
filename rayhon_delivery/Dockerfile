# build angular app for production

FROM node:17-alpine3.12 as build

WORKDIR /app


COPY package.json package-lock.json ./

RUN npm install
RUN npm install -g http-server

COPY . .

RUN npm run build --prod

# Stage 2
EXPOSE 8080
CMD ["http-server", "dist/rayhon-delivery"]
