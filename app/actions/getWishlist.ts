import prisma from "@/app/libs/prismadb"
import getCurrentUser from "./getCurrentUser"

export default async function getWishlist() {
  try {
    const currentUser = await getCurrentUser()

    if(!currentUser) {
        return []
    }

    const wishlist = prisma.listing.findMany({
        where: {
            id: {
                in: [...currentUser.favoriteIds]
            }
        }
    })

    return wishlist
  } catch (error) {
    console.log(error)
  }
}
