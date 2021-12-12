FROM node:13.13.0-alpine
WORKDIR /app/frontend

COPY package.json package-lock.json ./
RUN npm install
RUN npm install react-scripts@latest -g
COPY . ./
EXPOSE 3000
