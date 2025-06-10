#!/bin/sh

set -e

echo "🚀 Démarrage en mode développement..."

# Attendre que la base de données soit prête
echo "⏳ Attente de la base de données..."
npx wait-on tcp:db:5432 -t 30000

# Appliquer les migrations Prisma
echo "📊 Application des migrations Prisma..."
npx prisma migrate dev --name init

echo "🎉 Environnement de développement prêt!"

# Exécuter la commande passée en argument
exec "$@"