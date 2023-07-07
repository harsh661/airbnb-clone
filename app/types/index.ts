import { Listing, User } from "@prisma/client"

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string
  updatedAt: string
  emailVerified: string | null
}

export type SafeListing = Omit<
  Listing,
  "createdAt"
> & {
  createdAt: string
}
