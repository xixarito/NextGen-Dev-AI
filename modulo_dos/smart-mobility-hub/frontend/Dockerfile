FROM node:20-alpine as build

WORKDIR /usr/src/app

# Copy package files (sin el prefijo frontend/ porque ya estamos en esa carpeta)
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci || npm install

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]