import React from "react"
import ClientOnly from "../components/ClientOnly"
import ListingCard from "../components/listing/ListingCard"
import getCurrentUser from "../actions/getCurrentUser"
import getWishlist from "../actions/getWishlist"
import Heading from "../components/Heading"
import { IoArrowBackOutline } from "react-icons/io5"
import Link from "next/link"
import BottomNav from "../components/navbar/BottomNav"

export default async function Wishlist() {
  const currentUser = await getCurrentUser()
  const wishlist = await getWishlist()

  return (
    <ClientOnly>
      <Link
        href={"/"}
        className="rounded-full p-3 m-1 hover:bg-hover-gray absolute"
      >
        <IoArrowBackOutline size={20} />
      </Link>
      <main className="pb-20 pt-10 px-5 phone:px-10 large:px-20">
        <Heading title="Wishlists" />
        <div className="grid grid-cols-1 sm:grid-cols-2 small:grid-cols-3 medium:grid-cols-4 2xl:grid-cols-5 largest:grid-cols-6 gap-8">
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
