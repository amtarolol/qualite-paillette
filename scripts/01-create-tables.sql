-- Création de la table clients
CREATE TABLE IF NOT EXISTS clients (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    date_naissance DATE NOT NULL,
    adresse VARCHAR(255) NOT NULL,
    code_postal VARCHAR(5) NOT NULL,
    ville VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour améliorer les performances de recherche
CREATE INDEX IF NOT EXISTS idx_clients_nom_prenom ON clients(nom, prenom);
CREATE INDEX IF NOT EXISTS idx_clients_ville ON clients(ville);
CREATE INDEX IF NOT EXISTS idx_clients_code_postal ON clients(code_postal);

-- Commentaires pour la documentation
COMMENT ON TABLE clients IS 'Table des fiches clients';
COMMENT ON COLUMN clients.nom IS 'Nom de famille du client';
COMMENT ON COLUMN clients.prenom IS 'Prénom du client';
COMMENT ON COLUMN clients.date_naissance IS 'Date de naissance du client';
COMMENT ON COLUMN clients.adresse IS 'Adresse complète du client';
COMMENT ON COLUMN clients.code_postal IS 'Code postal (5 chiffres)';
COMMENT ON COLUMN clients.ville IS 'Ville de résidence';
