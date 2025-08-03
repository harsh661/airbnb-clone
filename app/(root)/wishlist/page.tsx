import React from "react"
import ClientOnly from "../../components/ClientOnly"
import ListingCard from "../../components/listing/ListingCard"
import getCurrentUser from "../../actions/getCurrentUser"
import getWishlist from "../../actions/getWishlist"
import Heading from "../../components/Heading"
import BottomNav from "../../components/navbar/BottomNav"

export default async function Wishlist() {
  const currentUser = await getCurrentUser()
  const wishlist = await getWishlist()

  return (
    <ClientOnly>
      <main className="pb-20 px-5 phone:px-10 max-w-6xl mx-auto large:px-10">
        <Heading title="My Wishlist" />
        <div className="grid grid-cols-1 sm:grid-cols-2 medium:grid-cols-3 largest:grid-cols-4 gap-8">
          {wishlist?.map((listing) => (
            <ListingCard
              key={listing.id}
              data={listing}
              currentUser={currentUser}
            />
          ))}
        </div>
      </main>
      <BottomNav currentUser={currentUser} />
    </ClientOnly>
  )
}
