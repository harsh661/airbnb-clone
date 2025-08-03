import React from "react"
import getCurrentListing from "@/app/actions/getCurrentListing"
import ListingClient from "./ListingClient"
import getCurrentUser from "@/app/actions/getCurrentUser"
import ClientOnly from "@/app/components/ClientOnly"
import getReservation from "@/app/actions/getReservations"

interface IParams {
  listingId?: string
}

const page = async ({ params } : { params: IParams}) => {
  const listing = await getCurrentListing(params)
  const reservations = await getReservation(params)
  const currentUser = await getCurrentUser()

  if(!listing) return

  return (
    <ClientOnly>
      <ListingClient
        currentUser={currentUser}
        listing={listing}
        reservations={reservations}
      />
    </ClientOnly>
  )
}

export default page
