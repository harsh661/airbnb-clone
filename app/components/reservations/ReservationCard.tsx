"use client"

import { SafeListing, SafeUser } from "@/app/types"
import React, { FC } from "react"
import Button from "../Button"

interface ReservationCardProps {
  listing: SafeListing
  currentUser: SafeUser
}

const ReservationCard: FC<ReservationCardProps> = ({
  listing,
  currentUser,
}) => {
  return (
    <div className="p-5 flex flex-col gap-5 card-shadow border border-border-gray rounded-lg">
      <span className="flex items-end gap-2">
        <span className="text-2xl font-medium">₹{listing.price}</span> night
      </span>

      <Button text="Reserve" />
    </div>
  )
}

export default ReservationCard
