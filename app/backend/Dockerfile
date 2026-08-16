# 1. Base image
FROM node:20-alpine

# 2. Alpine මත Prisma run වීමට අවශ්‍ය OpenSSL & Libc dependencies install කිරීම
RUN apk add --no-cache openssl libc6-compat

# 3. Container working directory
WORKDIR /app

# 4. Dependency files copy කිරීම
COPY package*.json ./

# 5. Clean install dependencies
RUN npm ci

# 6. Prisma schema copy කර Client එක generate කිරීම
COPY prisma ./prisma/
RUN npx prisma generate

# 7. Source code copy කිරීම
COPY . .

# 8. Expose port
EXPOSE 5000

# 9. Server start command
CMD ["npm", "start"]