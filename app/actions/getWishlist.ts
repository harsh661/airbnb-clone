import prisma from "@/app/libs/prismadb"
import getCurrentUser from "./getCurrentUser"

export default async function getWishlist() {
  try {
    const currentUser = await getCurrentUser()

    if(!currentUser) {
        return []
    }

    const wishlist = await prisma.listing.findMany({
        where: {
            id: {
                in: [...currentUser.favoriteIds]
            }
        }
    })

    const safeWishlist = wishlist.map((item) => ({
      ...item,
      createdAt: item.createdAt.toISOString()
    }))

    return safeWishlist
  } catch (error) {
    console.log(error)
  }
}
