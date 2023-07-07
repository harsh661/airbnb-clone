import React from "react"
import getCurrentListing from "@/app/actions/getCurrentListing"
import ListingClient from "./ListingClient"
import getCurrentUser from "@/app/actions/getCurrentUser"
import ClientOnly from "@/app/components/ClientOnly"

const page = async ({ params }) => {
  const listing = await getCurrentListing(params.listingId)
  const currentUser = await getCurrentUser()

  return (
    <ClientOnly>
      <ListingClient currentUser={currentUser} listing={listing} />
    </ClientOnly>
  )
}

export default page
