-- CreateTable
CREATE TABLE "clients" (
    "id" SERIAL NOT NULL,
    "nom" VARCHAR(100) NOT NULL,
    "prenom" VARCHAR(100) NOT NULL,
    "date_naissance" TIMESTAMP(3) NOT NULL,
    "adresse" VARCHAR(255) NOT NULL,
    "code_postal" VARCHAR(5) NOT NULL,
    "ville" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "clients_nom_prenom_idx" ON "clients"("nom", "prenom");

-- CreateIndex
CREATE INDEX "clients_ville_idx" ON "clients"("ville");

-- CreateIndex
CREATE INDEX "clients_code_postal_idx" ON "clients"("code_postal");
