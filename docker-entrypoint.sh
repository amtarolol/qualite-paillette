#!/bin/sh

set -e

echo "🕒 Attente de la base de données PostgreSQL..."
npx wait-on tcp:db:5432 || echo "Skip wait if using Neon"

echo "✅ Base de données disponible"

# Génération du client Prisma
echo "⚙️ Génération du client Prisma..."
npx prisma generate

# Déploiement des migrations (utile si tu veux garder ta base à jour automatiquement)
echo "🧩 Application des migrations..."
npx prisma migrate deploy

# Exécution du seed
echo "🌱 Insertion des données de seed..."
npx prisma db seed

# Lancement de l'application
echo "🚀 Lancement de l'application..."
exec "$@"