# ---- Stage 1: build ----
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build -- --configuration production

# ---- Stage 2: serve ----
FROM nginx:alpine

# Remove default site config and add ours
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Angular 17+ outputs to dist/<project-name>/browser
# (Angular 16 and older: dist/<project-name>)
COPY --from=build /app/dist/YOUR_PROJECT_NAME/browser /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]