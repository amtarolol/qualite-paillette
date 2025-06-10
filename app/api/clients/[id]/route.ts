import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { clientSchema } from "@/types/client"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    if (isNaN(id)) {
      return NextResponse.json({ error: "ID invalide" }, { status: 400 })
    }

    const client = await prisma.client.findUnique({
      where: { id },
    })

    if (!client) {
      return NextResponse.json({ error: "Client non trouvé" }, { status: 404 })
    }

    return NextResponse.json(client)
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

    const client = await prisma.client.update({
      where: { id },
      data: {
        nom: validatedData.nom,
        prenom: validatedData.prenom,
        dateNaissance: new Date(validatedData.dateNaissance),
        adresse: validatedData.adresse,
        codePostal: validatedData.codePostal,
        ville: validatedData.ville,
      },
    })

    return NextResponse.json(client)
  } catch (error: any) {
    console.error("Error updating client:", error)

    if (error.name === "ZodError") {
      return NextResponse.json({ error: "Données invalides", details: error.errors }, { status: 400 })
    }

    if (error.code === "P2025") {
      return NextResponse.json({ error: "Client non trouvé" }, { status: 404 })
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

    await prisma.client.delete({
      where: { id },
    })

    return NextResponse.json({ message: "Client supprimé avec succès" })
  } catch (error: any) {
    console.error("Error deleting client:", error)

    if (error.code === "P2025") {
      return NextResponse.json({ error: "Client non trouvé" }, { status: 404 })
    }

    return NextResponse.json({ error: "Erreur lors de la suppression du client" }, { status: 500 })
  }
}
