FROM node:18-alpine

WORKDIR /usr/src/app

# Copy package files (sin el prefijo frontend/ porque ya estamos en esa carpeta)
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci || npm install

# Copy source code (sin el prefijo frontend/)
COPY . .

# Expose port
EXPOSE 5173

# Start the development server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]