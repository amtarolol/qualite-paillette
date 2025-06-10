-- Script d'initialisation PostgreSQL
-- Ce script est exécuté automatiquement lors de la création du conteneur

-- Créer la base de données si elle n'existe pas
SELECT 'CREATE DATABASE client_management'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'client_management');

-- Créer un utilisateur pour l'application (optionnel)
DO
$do$
BEGIN
   IF NOT EXISTS (
      SELECT FROM pg_catalog.pg_roles
      WHERE  rolname = 'client_app_user') THEN

      CREATE ROLE client_app_user LOGIN PASSWORD 'secure_password';
   END IF;
END
$do$;

-- Accorder les privilèges
GRANT ALL PRIVILEGES ON DATABASE client_management TO client_app_user;
