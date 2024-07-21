# Build the Angular app
FROM node:latest as build

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Serve the Angular app with nginx
FROM nginx:1.23-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*

# Copy the built Angular app from the build stage
COPY --from=build /app/dist/recyclotron/* .

EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
