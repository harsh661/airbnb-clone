"use client"

import { SafeListing, SafeUser } from "@/app/types"
import React, { FC } from "react"
import Button from "../Button"
import Calendar from "../inputs/Calendar"
import { Range } from "react-date-range"

interface ReservationCardProps {
  listing: SafeListing
  dateRange: Range,
  totalPrice: number
  onDateChange: (value: Range) => void
  onSubmit: () => void
  disabledDates: Date[]
}

const ReservationCard: FC<ReservationCardProps> = ({
  listing,
  dateRange,
  totalPrice,
  onDateChange,
  onSubmit,
  disabledDates
}) => {
  return (
    <div className="p-5 flex flex-col gap-5 card-shadow border border-border-gray rounded-lg">
      <span className="flex items-end gap-2">
        <span className="text-2xl font-medium">₹{listing.price}</span> night
      </span>
      <div className="flex flex-col rounded-md">
        <Calendar value={dateRange} onChange={(value) => onDateChange(value.selection)} disabled={disabledDates}/>
      </div>
      <Button text="Reserve" onClick={onSubmit}/>
      <div className="flex items-center justify-between font-medium">
        <span>Total before taxes</span>
        <span>₹{totalPrice}</span>
      </div>
    </div>
  )
}

export default ReservationCard
