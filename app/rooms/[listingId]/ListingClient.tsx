"use client"

import ClientOnly from "@/app/components/ClientOnly"
import ListingBody from "@/app/components/listing/ListingBody"
import ListingHeader from "@/app/components/listing/ListingHeader"
import { categories } from "@/app/components/navbar/categories/CategoriesContainer"
import useGetCountries from "@/app/hooks/useGetCountries"
import { SafeListing, SafeUser } from "@/app/types"
import React, { FC, useMemo } from "react"

interface ListingClientProps {
  currentUser: SafeUser
  listing: SafeListing & {
    user: SafeUser
  }
}

const ListingClient: FC<ListingClientProps> = ({ currentUser, listing }) => {
  const { getCountry } = useGetCountries()
  const location = getCountry(listing.locationValue)
  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category)
  }, [listing.category])

  return (
    <ClientOnly>
      <ListingHeader listing={listing} location={location} />
      <div className="phone:px-10 py-10 max-w-6xl mx-auto">
        <ListingBody currentUser={currentUser} user={listing.user} listing={listing} category={category}/>
      </div>
    </ClientOnly>
  )
}

export default ListingClient
