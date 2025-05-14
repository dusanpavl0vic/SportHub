# Development build
FROM node:18-alpine AS development

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

# Production build
FROM nginx:alpine AS production

COPY --from=development /usr/src/app/dist/frontend /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80