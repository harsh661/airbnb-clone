"use client"

import axios from "axios"
import { toast } from "react-hot-toast"
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns"
import { SafeListing, SafeResevations, SafeUser } from "@/app/types"
import ClientOnly from "@/app/components/ClientOnly"
import ListingBody from "@/app/components/listing/ListingBody"
import ListingHeader from "@/app/components/listing/ListingHeader"
import useGetCountries from "@/app/hooks/useGetCountries"
import useLoginModal from "@/app/hooks/useLoginModal"
import React, { FC, useCallback, useEffect, useMemo, useState } from "react"
import { categories } from "@/app/components/navbar/categories/CategoriesContainer"

const initialRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
}

interface ListingClientProps {
  currentUser?: SafeUser | null
  listing: SafeListing & {
    user: SafeUser
  }
  reservations?: SafeResevations[]
}

const ListingClient: FC<ListingClientProps> = ({
  currentUser,
  listing,
  reservations = [],
}) => {
  const { getCountry } = useGetCountries()
  const loginModal = useLoginModal()
  const location = getCountry(listing.locationValue)
  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category)
  }, [listing.category])

  const disabledDates = useMemo(() => {
    let dates: Date[] = []

    reservations.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      })

      dates = [...dates, ...range]
    })

    return dates
  }, [reservations])

  const [totalPrice, setTotalPrice] = useState(listing.price)
  const [dateRange, setDateRange] = useState(initialRange)

  const onReservation = useCallback(() => {
    if (!currentUser) return loginModal.onOpen()

    axios
      .post("/api/reservations", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
      })
      .then(() => {
        toast.success("Reservation created")
      })
      .catch(() => {
        toast.error("Something went wrong")
      })
  }, [totalPrice, dateRange, listing?.id, currentUser, loginModal])

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const totalDays = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      )

      if (totalDays && listing.price) {
        setTotalPrice(totalDays * listing.price)
      } else {
        setTotalPrice(listing.price)
      }
    }
  }, [dateRange, listing.price])

  return (
    <ClientOnly>
      <ListingHeader listing={listing} location={location} />
      <div className="phone:px-10 py-10 max-w-6xl mx-auto">
        <ListingBody
          totalPrice={totalPrice}
          onDateChange={(value) => setDateRange(value)}
          dateRange={dateRange}
          onSubmit={onReservation}
          currentUser={currentUser}
          user={listing.user}
          listing={listing}
          category={category}
          disabledDates={disabledDates}
        />
      </div>
    </ClientOnly>
  )
}

export default ListingClient
