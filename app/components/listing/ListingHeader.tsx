"use client"

import { SafeListing } from "@/app/types"
import Image from "next/image"
import React, { FC } from "react"

interface ListingHeaderProps {
  listing: SafeListing
  location: any
}

const ListingHeader: FC<ListingHeaderProps> = ({ listing, location }) => {
  return (
    <div className="phone:px-10 max-w-6xl mx-auto flex flex-col-reverse phone:flex-col">
      <div className="flex flex-col gap-3 py-5 px-5 phone:px-0">
        <h1 className="text-2xl font-semibold">{listing.title}</h1>
        <div className="flex items-center gap-5">
          <span className="font-extralight text-dark-gray">Superhost</span>
          <p className="underline font-semibold">
            {location.label}, {location.region}
          </p>
        </div>
      </div>

      <div className="relative phone:rounded-xl overflow-hidden h-[30vh] sm:h-[50vh] phone:h-[60vh]">
        <Image
          src={listing.imageSrc}
          alt={listing.title}
          fill
          className="object-cover"
        />
      </div>
    </div>
  )
}

export default ListingHeader
