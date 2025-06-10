# Makefile pour simplifier les commandes Docker

.PHONY: help build up down logs clean dev-up dev-down prod-up prod-down

# Afficher l'aide
help:
	@echo "Commandes disponibles:"
	@echo "  build      - Construire les images Docker"
	@echo "  up         - Démarrer l'application en production"
	@echo "  down       - Arrêter l'application"
	@echo "  logs       - Afficher les logs"
	@echo "  clean      - Nettoyer les conteneurs et volumes"
	@echo "  dev-up     - Démarrer en mode développement"
	@echo "  dev-down   - Arrêter le mode développement"
	@echo "  prod-up    - Démarrer en mode production"
	@echo "  prod-down  - Arrêter le mode production"
	@echo "  db-shell   - Accéder au shell PostgreSQL"
	@echo "  app-shell  - Accéder au shell de l'application"

# Construire les images
build:
	docker-compose build

# Démarrer en production
up: prod-up

prod-up:
	docker-compose up -d
	@echo "🚀 Application démarrée en production sur http://localhost:3000"
	@echo "📊 Adminer disponible sur http://localhost:8080"

# Démarrer en développement
dev-up:
	docker-compose  up -d
	@echo "🚀 Application démarrée en développement sur http://localhost:3000"

# Arrêter l'application
down:
	docker-compose down

prod-down:
	docker-compose down

dev-down:
	docker-compose -f docker-compose.dev.yml down

# Afficher les logs
logs:
	docker-compose logs -f

dev-logs:
	docker-compose -f docker-compose.dev.yml logs -f

# Nettoyer
clean:
	docker-compose down -v
	docker system prune -f

# Accéder au shell PostgreSQL
db-shell:
	docker exec -it client-management-db psql -U postgres -d client_management

# Accéder au shell de l'application
app-shell:
	docker exec -it client-management-app sh

# Reconstruire et redémarrer
rebuild:
	docker-compose down
	docker-compose build --no-cache
	docker-compose up -d

# Sauvegarder la base de données
backup:
	docker exec client-management-db pg_dump -U postgres client_management > backup_$(shell date +%Y%m%d_%H%M%S).sql

# Restaurer la base de données
restore:
	@read -p "Nom du fichier de sauvegarde: " backup_file; \
	docker exec -i client-management-db psql -U postgres client_management < $$backup_file
