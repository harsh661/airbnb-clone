"use client"

import { SafeListing, SafeUser } from "@/app/types"
import React, { FC } from "react"
import { IconType } from "react-icons"
import Avatar from "../Avatar"
import ListingCategory from "./ListingCategory"
import { PiCalendarBlank } from "react-icons/pi"
import ReservationCard from "../reservations/ReservationCard"
import { Range } from "react-date-range"

interface ListingBodyProps {
  user: SafeUser
  currentUser?: SafeUser | null
  listing: SafeListing
  category:
    | {
        icon: IconType
        label: string
      }
    | undefined
  totalPrice: number
  onDateChange: (value: any) => void
  onSubmit: () => void
  dateRange: Range
  disabledDates: Date[]
}

const ListingBody: FC<ListingBodyProps> = ({
  currentUser,
  user,
  listing,
  category,
  totalPrice,
  onDateChange,
  onSubmit,
  dateRange,
  disabledDates
}) => {
  return (
    <div className="flex flex-col phone:flex-row gap-5 px-5 phone:px-0 w-full">
      <div className="phone:flex-[3] w-full">
        <div className="flex justify-between items-center pb-5 border-b border-border-gray">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold">Hosted by {user.name}</h2>
            <div className="flex gap-3 text-sm phone:text-base">
              <span>{listing.guestCount} guests</span>
              <span>
                {listing.roomCount}{" "}
                {listing.roomCount > 1 ? "bedrooms" : "bedroom"}
              </span>
              <span>{listing.bathroomCount} bathroom</span>
            </div>
          </div>
          <Avatar src={user.image} size={50} />
        </div>

        <div className="flex flex-col gap-5 py-5">
          {category && (
            <ListingCategory icon={category.icon} label={category.label} />
          )}
          <ListingCategory
            icon={PiCalendarBlank}
            label="Free cancellation for 48 hours."
          />
        </div>
        <div className="py-5 border-y border-border-gray text-lg text-dark-gray">
          {listing.description}
        </div>
      </div>
      <div className="phone:flex-[2] w-full phone:pl-10 mb-10">
        <ReservationCard
          totalPrice={totalPrice}
          dateRange={dateRange}
          listing={listing}
          onDateChange={onDateChange}
          onSubmit={onSubmit}
          disabledDates={disabledDates}
        />
      </div>
    </div>
  )
}

export default ListingBody
