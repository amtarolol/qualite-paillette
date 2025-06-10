# Client Management System

Un système de gestion des fiches clients moderne développé avec Next.js, TypeScript et PostgreSQL, avec support SonarQube pour l'amélioration continue.

## 🚀 Fonctionnalités

- **CRUD complet** : Création, lecture, modification et suppression des fiches clients
- **Recherche avancée** : Recherche par nom et prénom en temps réel
- **Interface moderne** : UI responsive avec shadcn/ui et Tailwind CSS
- **Validation robuste** : Validation côté client et serveur avec Zod
- **Base de données** : PostgreSQL avec Neon
- **Qualité de code** : Support SonarQube, ESLint, TypeScript strict
- **Tests** : Configuration Jest pour les tests unitaires

## 📋 Prérequis

- Node.js 18+ 
- Base de données PostgreSQL (Neon recommandé)
- SonarQube (optionnel, pour l'analyse de qualité)

## 🛠️ Installation

1. **Cloner le projet**
\`\`\`bash
git clone <repository-url>
cd client-management-system
\`\`\`

2. **Installer les dépendances**
\`\`\`bash
npm install
\`\`\`

3. **Configuration de l'environnement**
\`\`\`bash
# Créer un fichier .env.local
DATABASE_URL=postgresql://username:password@host:port/database
\`\`\`

4. **Initialiser la base de données**
- Exécuter les scripts SQL dans l'ordre :
  - `scripts/01-create-tables.sql`
  - `scripts/02-seed-data.sql`

5. **Lancer le serveur de développement**
\`\`\`bash
npm run dev
\`\`\`

## 🏗️ Structure du projet

\`\`\`
├── app/                    # Pages et API routes (App Router)
│   ├── api/clients/       # API REST pour les clients
│   ├── page.tsx           # Page principale
│   └── layout.tsx         # Layout global
├── components/            # Composants React réutilisables
│   ├── ui/               # Composants shadcn/ui
│   ├── client-form.tsx   # Formulaire client
│   └── delete-client-dialog.tsx
├── lib/                  # Utilitaires et configuration
│   └── database.ts       # Configuration base de données
├── types/                # Types TypeScript
│   └── client.ts         # Types et schémas client
├── scripts/              # Scripts SQL
│   ├── 01-create-tables.sql
│   └── 02-seed-data.sql
└── __tests__/            # Tests unitaires
\`\`\`

## 🧪 Tests et Qualité

\`\`\`bash
# Lancer les tests
npm run test

# Tests avec couverture
npm run test:coverage

# Vérification TypeScript
npm run type-check

# Linting
npm run lint

# Vérification complète de qualité
npm run quality:check

# Analyse SonarQube
npm run sonar
\`\`\`

## 📊 SonarQube

Le projet est configuré pour SonarQube avec :
- Seuils de couverture de code (70%)
- Règles de qualité strictes
- Exclusions appropriées
- Métriques de maintenabilité

Configuration dans `sonar-project.properties`.

## 🔧 API Endpoints

- `GET /api/clients` - Liste tous les clients
- `GET /api/clients?search=term` - Recherche clients
- `POST /api/clients` - Créer un client
- `GET /api/clients/[id]` - Récupérer un client
- `PUT /api/clients/[id]` - Modifier un client  
- `DELETE /api/clients/[id]` - Supprimer un client

## 📝 Modèle de données

\`\`\`typescript
interface Client {
  id: number
  nom: string
  prenom: string
  dateNaissance: string
  adresse: string
  codePostal: string
  ville: string
  createdAt: string
  updatedAt: string
}
\`\`\`

## 🚀 Déploiement

1. **Build de production**
\`\`\`bash
npm run build
\`\`\`

2. **Variables d'environnement**
- Configurer `DATABASE_URL` en production

3. **Déploiement Vercel**
- Connecter le repository GitHub
- Configurer les variables d'environnement
- Déployer automatiquement

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🆘 Support

Pour toute question ou problème :
- Ouvrir une issue sur GitHub
- Consulter la documentation
- Vérifier les logs d'erreur
