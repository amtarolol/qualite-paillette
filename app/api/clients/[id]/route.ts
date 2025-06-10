import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/database"
import { clientSchema } from "@/types/client"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    if (isNaN(id)) {
      return NextResponse.json({ error: "ID invalide" }, { status: 400 })
    }

    const result = await sql`
      SELECT id, nom, prenom, date_naissance as "dateNaissance", 
             adresse, code_postal as "codePostal", ville,
             created_at as "createdAt", updated_at as "updatedAt"
      FROM clients 
      WHERE id = ${id}
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Client non trouvé" }, { status: 404 })
    }

    return NextResponse.json(result[0])
  } catch (error) {
    console.error("Error fetching client:", error)
    return NextResponse.json({ error: "Erreur lors de la récupération du client" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    if (isNaN(id)) {
      return NextResponse.json({ error: "ID invalide" }, { status: 400 })
    }

    const body = await request.json()
    const validatedData = clientSchema.parse(body)

    const result = await sql`
      UPDATE clients 
      SET nom = ${validatedData.nom}, 
          prenom = ${validatedData.prenom}, 
          date_naissance = ${validatedData.dateNaissance},
          adresse = ${validatedData.adresse}, 
          code_postal = ${validatedData.codePostal}, 
          ville = ${validatedData.ville},
          updated_at = NOW()
      WHERE id = ${id}
      RETURNING id, nom, prenom, date_naissance as "dateNaissance", 
                adresse, code_postal as "codePostal", ville,
                created_at as "createdAt", updated_at as "updatedAt"
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Client non trouvé" }, { status: 404 })
    }

    return NextResponse.json(result[0])
  } catch (error: any) {
    console.error("Error updating client:", error)

    if (error.name === "ZodError") {
      return NextResponse.json({ error: "Données invalides", details: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Erreur lors de la mise à jour du client" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    if (isNaN(id)) {
      return NextResponse.json({ error: "ID invalide" }, { status: 400 })
    }

    const result = await sql`
      DELETE FROM clients 
      WHERE id = ${id}
      RETURNING id
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Client non trouvé" }, { status: 404 })
    }

    return NextResponse.json({ message: "Client supprimé avec succès" })
  } catch (error) {
    console.error("Error deleting client:", error)
    return NextResponse.json({ error: "Erreur lors de la suppression du client" }, { status: 500 })
  }
}
