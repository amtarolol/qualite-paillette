import { z } from "zod"

export const clientSchema = z.object({
  nom: z.string().min(1, "Le nom est requis").max(100, "Le nom ne peut pas dépasser 100 caractères"),
  prenom: z.string().min(1, "Le prénom est requis").max(100, "Le prénom ne peut pas dépasser 100 caractères"),
  dateNaissance: z.string().min(1, "La date de naissance est requise"),
  adresse: z.string().min(1, "L'adresse est requise").max(255, "L'adresse ne peut pas dépasser 255 caractères"),
  codePostal: z
    .string()
    .min(1, "Le code postal est requis")
    .regex(/^\d{5}$/, "Le code postal doit contenir 5 chiffres"),
  ville: z.string().min(1, "La ville est requise").max(100, "La ville ne peut pas dépasser 100 caractères"),
})

export type ClientInput = z.infer<typeof clientSchema>

export interface Client extends ClientInput {
  id: number
  createdAt: string
  updatedAt: string
}
