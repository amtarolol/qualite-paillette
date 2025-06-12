import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { ClientForm } from "@/components/client-form"
import type { Client } from "@/types/client"
import React from "react"


// Mock fetch
global.fetch = jest.fn()

const mockClient: Client = {
  id: 1,
  nom: "Dupont",
  prenom: "Jean",
  dateNaissance: "1985-03-15T00:00:00.000Z",
  adresse: "123 Rue de la Paix",
  codePostal: "75001",
  ville: "Paris",
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z",
}

describe("ClientForm", () => {
  const mockOnOpenChange = jest.fn()
  const mockOnClientSaved = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockClient,
    })
  })

  it("renders form for new client", () => {
    render(<ClientForm open={true} onOpenChange={mockOnOpenChange} onClientSaved={mockOnClientSaved} />)

    expect(screen.getByText("Nouveau client")).toBeInTheDocument()
    expect(screen.getByLabelText(/nom/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/prénom/i)).toBeInTheDocument()
  })

  it("renders form for editing client", () => {
    render(
      <ClientForm open={true} onOpenChange={mockOnOpenChange} client={mockClient} onClientSaved={mockOnClientSaved} />,
    )

    expect(screen.getByText("Modifier le client")).toBeInTheDocument()
    expect(screen.getByDisplayValue("Dupont")).toBeInTheDocument()
    expect(screen.getByDisplayValue("Jean")).toBeInTheDocument()
  })

  it("validates required fields", async () => {
    render(<ClientForm open={true} onOpenChange={mockOnOpenChange} onClientSaved={mockOnClientSaved} />)

    const submitButton = screen.getByText("Créer")
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText("Le nom est requis")).toBeInTheDocument()
      expect(screen.getByText("Le prénom est requis")).toBeInTheDocument()
    })
  })

  it("submits form with valid data", async () => {
    render(<ClientForm open={true} onOpenChange={mockOnOpenChange} onClientSaved={mockOnClientSaved} />)

    // Fill form
    fireEvent.change(screen.getByLabelText(/nom/i), { target: { value: "Test" } })
    fireEvent.change(screen.getByLabelText(/prénom/i), { target: { value: "User" } })
    fireEvent.change(screen.getByLabelText(/date de naissance/i), { target: { value: "1990-01-01" } })
    fireEvent.change(screen.getByLabelText(/adresse/i), { target: { value: "123 Test St" } })
    fireEvent.change(screen.getByLabelText(/code postal/i), { target: { value: "12345" } })
    fireEvent.change(screen.getByLabelText(/ville/i), { target: { value: "Test City" } })

    const submitButton = screen.getByText("Créer")
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom: "Test",
          prenom: "User",
          dateNaissance: "1990-01-01",
          adresse: "123 Test St",
          codePostal: "12345",
          ville: "Test City",
        }),
      })
      expect(mockOnClientSaved).toHaveBeenCalled()
    })
  })
})
