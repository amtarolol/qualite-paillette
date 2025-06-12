# Use official Node.js LTS slim image
FROM node:18-slim

WORKDIR /app

# Installer les dépendances système
RUN apt-get update \
  && apt-get install -y openssl libssl-dev netcat-openbsd \
  && rm -rf /var/lib/apt/lists/*

# Copier uniquement les fichiers nécessaires pour npm
COPY package.json package-lock.json ./

# Installer les dépendances avec legacy-peer-deps
RUN npm install --legacy-peer-deps

# Installer des outils utilitaires globalement
RUN npm install -g wait-on pnpm

# Copier le reste du code
COPY . .

# Générer le client Prisma
RUN npx prisma generate

EXPOSE 3000

# Préparer le script d'entrée
COPY docker-entrypoint.sh ./
RUN chmod +x docker-entrypoint.sh

ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["npm", "run", "dev"]
