#!/bin/sh

# Script d'entrée pour Docker
set -e

echo "🚀 Démarrage de l'application Client Management System..."

# Attendre que la base de données soit prête
echo "⏳ Attente de la base de données..."
npx wait-on tcp:db:5432 -t 30000

# Appliquer les migrations Prisma
echo "📊 Application des migrations Prisma..."
npx prisma migrate deploy

# Vérifier si la base de données contient des données
echo "🔍 Vérification des données existantes..."
CLIENT_COUNT=$(npx prisma db execute --stdin <<< "SELECT COUNT(*) FROM clients;" | tail -n 1 | tr -d ' ')

if [ "$CLIENT_COUNT" = "0" ]; then
    echo "🌱 Initialisation des données de test..."
    npx tsx scripts/seed.ts
else
    echo "✅ Base de données déjà initialisée ($CLIENT_COUNT clients trouvés)"
fi

echo "🎉 Application prête à démarrer!"

# Exécuter la commande passée en argument
exec "$@"
