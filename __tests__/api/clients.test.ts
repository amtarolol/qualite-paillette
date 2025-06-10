import { GET, POST } from "@/app/api/clients/route"
import { NextRequest } from "next/server"

// Mock Prisma
jest.mock("@/lib/prisma", () => ({
  prisma: {
    client: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
    },
  },
}))

import { prisma } from "@/lib/prisma"

describe("/api/clients", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe("GET", () => {
    it("returns all clients", async () => {
      const mockClients = [
        {
          id: 1,
          nom: "Dupont",
          prenom: "Jean",
          dateNaissance: new Date("1985-03-15"),
          adresse: "123 Rue de la Paix",
          codePostal: "75001",
          ville: "Paris",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]
      ;(prisma.client.findMany as jest.Mock).mockResolvedValue(mockClients)

      const request = new NextRequest("http://localhost:3000/api/clients")
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toEqual(mockClients)
    })

    it("handles search parameter", async () => {
      const mockClients = [
        {
          id: 1,
          nom: "Dupont",
          prenom: "Jean",
          dateNaissance: new Date("1985-03-15"),
          adresse: "123 Rue de la Paix",
          codePostal: "75001",
          ville: "Paris",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]
      ;(prisma.client.findMany as jest.Mock).mockResolvedValue(mockClients)

      const request = new NextRequest("http://localhost:3000/api/clients?search=Dupont")
      const response = await GET(request)

      expect(prisma.client.findMany).toHaveBeenCalledWith({
        where: {
          OR: [
            { nom: { contains: "Dupont", mode: "insensitive" } },
            { prenom: { contains: "Dupont", mode: "insensitive" } },
          ],
        },
        orderBy: [{ nom: "asc" }, { prenom: "asc" }],
      })
    })
  })

  describe("POST", () => {
    it("creates new client with valid data", async () => {
      const newClient = {
        nom: "Test",
        prenom: "User",
        dateNaissance: "1990-01-01",
        adresse: "123 Test St",
        codePostal: "12345",
        ville: "Test City",
      }

      const mockResult = {
        id: 1,
        ...newClient,
        dateNaissance: new Date("1990-01-01"),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      ;(prisma.client.create as jest.Mock).mockResolvedValue(mockResult)

      const request = new NextRequest("http://localhost:3000/api/clients", {
        method: "POST",
        body: JSON.stringify(newClient),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(201)
      expect(data.id).toBe(1)
      expect(data.nom).toBe("Test")
      expect(prisma.client.create).toHaveBeenCalledWith({
        data: {
          nom: "Test",
          prenom: "User",
          dateNaissance: expect.any(Date),
          adresse: "123 Test St",
          codePostal: "12345",
          ville: "Test City",
        },
      })
    })

    it("validates input data", async () => {
      const invalidClient = {
        nom: "", // Invalid: empty name
        prenom: "User",
      }

      const request = new NextRequest("http://localhost:3000/api/clients", {
        method: "POST",
        body: JSON.stringify(invalidClient),
      })

      const response = await POST(request)

      expect(response.status).toBe(400)
    })
  })
})
