import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/database"
import { clientSchema } from "@/types/client"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search")

    if (search) {
      const clients = await sql`
        SELECT id, nom, prenom, date_naissance as "dateNaissance", 
               adresse, code_postal as "codePostal", ville,
               created_at as "createdAt", updated_at as "updatedAt"
        FROM clients
        WHERE LOWER(nom) LIKE LOWER(${`%${search}%`}) OR LOWER(prenom) LIKE LOWER(${`%${search}%`})
        ORDER BY nom, prenom
      `
      return NextResponse.json(clients)
    } else {
      const clients = await sql`
        SELECT id, nom, prenom, date_naissance as "dateNaissance", 
               adresse, code_postal as "codePostal", ville,
               created_at as "createdAt", updated_at as "updatedAt"
        FROM clients
        ORDER BY nom, prenom
      `
      return NextResponse.json(clients)
    }
  } catch (error) {
    console.error("Error fetching clients:", error)
    return NextResponse.json({ error: "Erreur lors de la récupération des clients" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validation des données
    const validatedData = clientSchema.parse(body)

    const result = await sql`
      INSERT INTO clients (nom, prenom, date_naissance, adresse, code_postal, ville)
      VALUES (${validatedData.nom}, ${validatedData.prenom}, ${validatedData.dateNaissance}, 
              ${validatedData.adresse}, ${validatedData.codePostal}, ${validatedData.ville})
      RETURNING id, nom, prenom, date_naissance as "dateNaissance", 
                adresse, code_postal as "codePostal", ville,
                created_at as "createdAt", updated_at as "updatedAt"
    `

    return NextResponse.json(result[0], { status: 201 })
  } catch (error: any) {
    console.error("Error creating client:", error)

    if (error.name === "ZodError") {
      return NextResponse.json({ error: "Données invalides", details: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Erreur lors de la création du client" }, { status: 500 })
  }
}
