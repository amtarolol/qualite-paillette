import { PrismaClient } from "@prisma/client"

// PrismaClient est attaché au global object en développement pour éviter
// d'épuiser la limite de connexions à la base de données pendant le hot-reloading
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
