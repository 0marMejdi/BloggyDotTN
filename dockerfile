# Step 1: Build Angular app
FROM node:18 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --configuration=production

# Step 2: Serve with Nginx
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*

# 👇 Use build arg here
ARG PROJECT_NAME
COPY --from=builder /app/dist/${PROJECT_NAME} /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
