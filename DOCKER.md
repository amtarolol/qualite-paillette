# 🐳 Guide Docker - Client Management System

Ce guide explique comment utiliser Docker pour développer et déployer l'application.

## 🚀 Démarrage rapide

### Production
\`\`\`bash
# Construire et démarrer
make build
make up

# Ou avec docker-compose directement
docker-compose up -d
\`\`\`

### Développement
\`\`\`bash
# Démarrer en mode développement
make dev-up

# Ou avec docker-compose directement
docker-compose -f docker-compose.dev.yml up -d
\`\`\`

## 📋 Prérequis

- Docker 20.10+
- Docker Compose 2.0+
- Make (optionnel, pour les raccourcis)

## 🏗️ Architecture Docker

### Services

1. **app** : Application Next.js
   - Port : 3000 (production) / 3001 (développement)
   - Base : Node.js 18 Alpine

2. **db** : Base de données PostgreSQL
   - Port : 5432 (production) / 5433 (développement)
   - Version : PostgreSQL 15 Alpine

3. **adminer** : Interface d'administration DB
   - Port : 8080
   - Accès : http://localhost:8080

### Volumes

- \`postgres_data\` : Données PostgreSQL persistantes
- \`./uploads\` : Fichiers uploadés (si applicable)

## 🔧 Commandes utiles

### Avec Make
\`\`\`bash
make help           # Afficher l'aide
make build          # Construire les images
make up             # Démarrer en production
make dev-up         # Démarrer en développement
make down           # Arrêter les services
make logs           # Afficher les logs
make clean          # Nettoyer tout
make db-shell       # Accéder à PostgreSQL
make app-shell      # Accéder au conteneur app
make backup         # Sauvegarder la DB
make rebuild        # Reconstruire complètement
\`\`\`

### Avec Docker Compose
\`\`\`bash
# Production
docker-compose up -d
docker-compose down
docker-compose logs -f

# Développement
docker-compose -f docker-compose.dev.yml up -d
docker-compose -f docker-compose.dev.yml down
docker-compose -f docker-compose.dev.yml logs -f
\`\`\`

## 🔍 Monitoring et Debug

### Logs
\`\`\`bash
# Tous les services
docker-compose logs -f

# Service spécifique
docker-compose logs -f app
docker-compose logs -f db
\`\`\`

### Accès aux conteneurs
\`\`\`bash
# Application
docker exec -it client-management-app sh

# Base de données
docker exec -it client-management-db psql -U postgres -d client_management
\`\`\`

### Vérification de l'état
\`\`\`bash
docker-compose ps
docker-compose top
\`\`\`

## 🗄️ Gestion de la base de données

### Prisma dans Docker
\`\`\`bash
# Générer le client
docker exec client-management-app npx prisma generate

# Appliquer les migrations
docker exec client-management-app npx prisma migrate deploy

# Ouvrir Prisma Studio
docker exec -p 5555:5555 client-management-app npx prisma studio
\`\`\`

### Sauvegarde et restauration
\`\`\`bash
# Sauvegarde
docker exec client-management-db pg_dump -U postgres client_management > backup.sql

# Restauration
docker exec -i client-management-db psql -U postgres client_management < backup.sql
\`\`\`

## 🌍 Variables d'environnement

### Production
\`\`\`env
NODE_ENV=production
DATABASE_URL=postgresql://postgres:postgres@db:5432/client_management?schema=public
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key
\`\`\`

### Développement
\`\`\`env
NODE_ENV=development
DATABASE_URL=postgresql://postgres:postgres@db:5432/client_management_dev?schema=public
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=dev-secret-key
\`\`\`

## 🚀 Déploiement

### Build optimisé
\`\`\`bash
# Build multi-stage optimisé
docker build -t client-management:latest .

# Ou avec docker-compose
docker-compose build --no-cache
\`\`\`

### Production avec volumes externes
\`\`\`bash
# Créer les volumes
docker volume create client_management_data

# Démarrer avec volume externe
docker-compose -f docker-compose.prod.yml up -d
\`\`\`

## 🔧 Personnalisation

### Modifier les ports
Éditez \`docker-compose.yml\` :
\`\`\`yaml
services:
  app:
    ports:
      - "8000:3000"  # Port externe:interne
\`\`\`

### Ajouter des services
Exemple Redis :
\`\`\`yaml
services:
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
\`\`\`

## 🐛 Dépannage

### Problèmes courants

1. **Port déjà utilisé**
   \`\`\`bash
   # Vérifier les ports
   netstat -tulpn | grep :3000
   
   # Changer le port dans docker-compose.yml
   \`\`\`

2. **Base de données non accessible**
   \`\`\`bash
   # Vérifier l'état
   docker-compose ps
   
   # Redémarrer la DB
   docker-compose restart db
   \`\`\`

3. **Problèmes de permissions**
   \`\`\`bash
   # Reconstruire sans cache
   docker-compose build --no-cache
   \`\`\`

4. **Migrations Prisma**
   \`\`\`bash
   # Réinitialiser la DB
   docker-compose down -v
   docker-compose up -d
   \`\`\`

### Nettoyage complet
\`\`\`bash
# Arrêter et supprimer tout
docker-compose down -v
docker system prune -a
docker volume prune
\`\`\`

## 📊 Performance

### Optimisations
- Images Alpine pour réduire la taille
- Build multi-stage pour optimiser
- Volumes pour la persistance
- Health checks pour la fiabilité

### Monitoring
\`\`\`bash
# Utilisation des ressources
docker stats

# Espace disque
docker system df
\`\`\`
