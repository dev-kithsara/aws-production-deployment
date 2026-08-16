FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 5173

# Host 0.0.0.0 මඟින් container එකෙන් පිටතට (Host machine එකට) traffic accept කරයි
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]