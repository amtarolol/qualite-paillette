import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { clientSchema } from "@/types/client"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search")

    if (search) {
      const clients = await prisma.client.findMany({
        where: {
          OR: [
            { nom: { contains: search, mode: "insensitive" } },
            { prenom: { contains: search, mode: "insensitive" } },
          ],
        },
        orderBy: [{ nom: "asc" }, { prenom: "asc" }],
      })
      return NextResponse.json(clients)
    } else {
      const clients = await prisma.client.findMany({
        orderBy: [{ nom: "asc" }, { prenom: "asc" }],
      })
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

    const client = await prisma.client.create({
      data: {
        nom: validatedData.nom,
        prenom: validatedData.prenom,
        dateNaissance: new Date(validatedData.dateNaissance),
        adresse: validatedData.adresse,
        codePostal: validatedData.codePostal,
        ville: validatedData.ville,
      },
    })

    return NextResponse.json(client, { status: 201 })
  } catch (error: any) {
    console.error("Error creating client:", error)

    if (error.name === "ZodError") {
      return NextResponse.json({ error: "Données invalides", details: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Erreur lors de la création du client" }, { status: 500 })
  }
}
