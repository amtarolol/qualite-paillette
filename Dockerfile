FROM node:18-slim

WORKDIR /app

# Installer les dépendances système nécessaires (openssl, netcat, etc.)
RUN apt-get update && apt-get install -y openssl libssl-dev netcat-openbsd


# Copier et configurer le script d'entrée en premier
COPY docker-entrypoint.sh ./
RUN chmod +x ./docker-entrypoint.sh

# Copier les fichiers de dépendances
COPY package.json package-lock.json* ./

# Installer toutes les dépendances (dev + prod)
RUN npm ci --legacy-peer-deps

# Installer wait-on globalement (nécessaire pour le script)
RUN npm install -g wait-on pnpm

# Copier le code source
COPY . .

# Générer le client Prisma
RUN npx prisma generate

# Exposer le port
EXPOSE 3000

# Script d'entrée pour le développement
ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["npm", "run", "dev"]
