"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"
import { clientSchema, type Client, type ClientInput } from "@/types/client"

interface ClientFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  client?: Client | null
  onClientSaved: () => void
}

export function ClientForm({ open, onOpenChange, client, onClientSaved }: ClientFormProps) {
  const [formData, setFormData] = useState<ClientInput>({
    nom: "",
    prenom: "",
    dateNaissance: "",
    adresse: "",
    codePostal: "",
    ville: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState("")

  useEffect(() => {
    if (client) {
      setFormData({
        nom: client.nom,
        prenom: client.prenom,
        dateNaissance: client.dateNaissance.split("T")[0], // Format YYYY-MM-DD pour input date
        adresse: client.adresse,
        codePostal: client.codePostal,
        ville: client.ville,
      })
    } else {
      setFormData({
        nom: "",
        prenom: "",
        dateNaissance: "",
        adresse: "",
        codePostal: "",
        ville: "",
      })
    }
    setErrors({})
    setSubmitError("")
  }, [client, open])

  const handleInputChange = (field: keyof ClientInput, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    try {
      clientSchema.parse(formData)
      setErrors({})
      return true
    } catch (error: any) {
      const newErrors: Record<string, string> = {}
      error.errors?.forEach((err: any) => {
        if (err.path?.[0]) {
          newErrors[err.path[0]] = err.message
        }
      })
      setErrors(newErrors)
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)
    setSubmitError("")

    try {
      const url = client ? `/api/clients/${client.id}` : "/api/clients"
      const method = client ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        onClientSaved()
      } else {
        const errorData = await response.json()
        setSubmitError(errorData.error || "Une erreur est survenue")
      }
    } catch (error) {
      setSubmitError("Erreur de connexion au serveur")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{client ? "Modifier le client" : "Nouveau client"}</DialogTitle>
          <DialogDescription>
            {client
              ? "Modifiez les informations du client ci-dessous."
              : "Ajoutez un nouveau client en remplissant le formulaire ci-dessous."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nom">Nom *</Label>
              <Input
                id="nom"
                value={formData.nom}
                onChange={(e) => handleInputChange("nom", e.target.value)}
                className={errors.nom ? "border-red-500" : ""}
              />
              {errors.nom && <p className="text-sm text-red-500">{errors.nom}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="prenom">Prénom *</Label>
              <Input
                id="prenom"
                value={formData.prenom}
                onChange={(e) => handleInputChange("prenom", e.target.value)}
                className={errors.prenom ? "border-red-500" : ""}
              />
              {errors.prenom && <p className="text-sm text-red-500">{errors.prenom}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dateNaissance">Date de naissance *</Label>
            <Input
              id="dateNaissance"
              type="date"
              value={formData.dateNaissance}
              onChange={(e) => handleInputChange("dateNaissance", e.target.value)}
              className={errors.dateNaissance ? "border-red-500" : ""}
            />
            {errors.dateNaissance && <p className="text-sm text-red-500">{errors.dateNaissance}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="adresse">Adresse *</Label>
            <Input
              id="adresse"
              value={formData.adresse}
              onChange={(e) => handleInputChange("adresse", e.target.value)}
              className={errors.adresse ? "border-red-500" : ""}
            />
            {errors.adresse && <p className="text-sm text-red-500">{errors.adresse}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="codePostal">Code postal *</Label>
              <Input
                id="codePostal"
                value={formData.codePostal}
                onChange={(e) => handleInputChange("codePostal", e.target.value)}
                className={errors.codePostal ? "border-red-500" : ""}
              />
              {errors.codePostal && <p className="text-sm text-red-500">{errors.codePostal}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="ville">Ville *</Label>
              <Input
                id="ville"
                value={formData.ville}
                onChange={(e) => handleInputChange("ville", e.target.value)}
                className={errors.ville ? "border-red-500" : ""}
              />
              {errors.ville && <p className="text-sm text-red-500">{errors.ville}</p>}
            </div>
          </div>

          {submitError && (
            <Alert variant="destructive">
              <AlertDescription>{submitError}</AlertDescription>
            </Alert>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
              Annuler
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {client ? "Modifier" : "Créer"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
