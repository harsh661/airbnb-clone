import prisma from "@/app/libs/prismadb"

export default async function currentListing(id: string) {
  try {
    const listing = await prisma.listing.findUnique({
      where: {
        id: id,
      },
      include: {
        user: true
      }
    })

    if(!listing) return null
    return {
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toISOString(),
        updatedAt: listing.user.updatedAt.toISOString()
      }
    }

  } catch (error) {
    console.log(error)
  }
}
