import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  try {
    // Vérifier si des clients existent déjà
    const existingClients = await prisma.client.count()

    if (existingClients > 0) {
      console.log("La base de données contient déjà des clients. Opération annulée.")
      return
    }

    // Insertion de données de test
    const clients = await prisma.client.createMany({
      data: [
        {
          nom: "Dupont",
          prenom: "Jean",
          dateNaissance: new Date("1985-03-15"),
          adresse: "123 Rue de la Paix",
          codePostal: "75001",
          ville: "Paris",
        },
        {
          nom: "Martin",
          prenom: "Marie",
          dateNaissance: new Date("1990-07-22"),
          adresse: "456 Avenue des Champs",
          codePostal: "69001",
          ville: "Lyon",
        },
        {
          nom: "Bernard",
          prenom: "Pierre",
          dateNaissance: new Date("1978-11-08"),
          adresse: "789 Boulevard Saint-Michel",
          codePostal: "13001",
          ville: "Marseille",
        },
        {
          nom: "Dubois",
          prenom: "Sophie",
          dateNaissance: new Date("1992-05-14"),
          adresse: "321 Rue Victor Hugo",
          codePostal: "31000",
          ville: "Toulouse",
        },
        {
          nom: "Moreau",
          prenom: "Antoine",
          dateNaissance: new Date("1987-09-03"),
          adresse: "654 Place de la République",
          codePostal: "44000",
          ville: "Nantes",
        },
        {
          nom: "Laurent",
          prenom: "Isabelle",
          dateNaissance: new Date("1983-12-19"),
          adresse: "987 Cours Lafayette",
          codePostal: "69003",
          ville: "Lyon",
        },
        {
          nom: "Simon",
          prenom: "François",
          dateNaissance: new Date("1995-02-28"),
          adresse: "147 Rue de Rivoli",
          codePostal: "75004",
          ville: "Paris",
        },
        {
          nom: "Michel",
          prenom: "Catherine",
          dateNaissance: new Date("1980-06-11"),
          adresse: "258 Avenue Jean Jaurès",
          codePostal: "33000",
          ville: "Bordeaux",
        },
        {
          nom: "Leroy",
          prenom: "Nicolas",
          dateNaissance: new Date("1988-10-07"),
          adresse: "369 Rue Nationale",
          codePostal: "59000",
          ville: "Lille",
        },
        {
          nom: "Roux",
          prenom: "Amélie",
          dateNaissance: new Date("1993-04-25"),
          adresse: "741 Boulevard Gambetta",
          codePostal: "67000",
          ville: "Strasbourg",
        },
      ],
    })

    console.log(`${clients.count} clients ont été créés avec succès.`)
  } catch (error) {
    console.error("Erreur lors de l'initialisation de la base de données:", error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
