FROM node:24.14.0
WORKDIR /backend
COPY package*.json ./
RUN npm ci --only=production
COPY backend/ .
COPY uploads/ ./uploads/
RUN npm install
EXPOSE 3000
CMD ["node", "index.js"]