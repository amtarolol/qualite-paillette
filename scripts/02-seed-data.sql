-- Insertion de données de test
INSERT INTO clients (nom, prenom, date_naissance, adresse, code_postal, ville) VALUES
('Dupont', 'Jean', '1985-03-15', '123 Rue de la Paix', '75001', 'Paris'),
('Martin', 'Marie', '1990-07-22', '456 Avenue des Champs', '69001', 'Lyon'),
('Bernard', 'Pierre', '1978-11-08', '789 Boulevard Saint-Michel', '13001', 'Marseille'),
('Dubois', 'Sophie', '1992-05-14', '321 Rue Victor Hugo', '31000', 'Toulouse'),
('Moreau', 'Antoine', '1987-09-03', '654 Place de la République', '44000', 'Nantes'),
('Laurent', 'Isabelle', '1983-12-19', '987 Cours Lafayette', '69003', 'Lyon'),
('Simon', 'François', '1995-02-28', '147 Rue de Rivoli', '75004', 'Paris'),
('Michel', 'Catherine', '1980-06-11', '258 Avenue Jean Jaurès', '33000', 'Bordeaux'),
('Leroy', 'Nicolas', '1988-10-07', '369 Rue Nationale', '59000', 'Lille'),
('Roux', 'Amélie', '1993-04-25', '741 Boulevard Gambetta', '67000', 'Strasbourg');

-- Vérification des données insérées
SELECT COUNT(*) as total_clients FROM clients;
