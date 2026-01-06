FROM node:20-alpine AS builder
WORKDIR /app

COPY tsconfig.json .
COPY src ./src
COPY assets ./assets
COPY index.html .

RUN npm install -g typescript
RUN tsc

FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist /usr/share/nginx/html/dist/
COPY --from=builder /app/assets /usr/share/nginx/html/assets/
COPY --from=builder /app/index.html /usr/share/nginx/html/index.html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
