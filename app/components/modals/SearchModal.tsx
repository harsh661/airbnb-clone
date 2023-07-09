"use client"

import useSearchModal from "@/app/hooks/useSearchModal"
import Modal from "./Modal"
import CountryInput, { CountrySelectValue } from "../inputs/CountryInput"
import { useCallback, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import qs from "query-string"
import Counter from "../inputs/Counter"

const SearchModal = () => {
  const searchModal = useSearchModal()
  const [country, setCountry] = useState<CountrySelectValue>()
  const [guests, setGuests] = useState<number>(1)
  const [rooms, setRooms] = useState<number>(1)
  const params = useParams()
  const router = useRouter()

  const handleClick = useCallback(() => {
    let currentQuery = {}

    if (params) {
      currentQuery = qs.parse(params.toString())
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: country?.value,
      guestCount: guests,
      roomCount: rooms,
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    )
    router.push(url)
    searchModal.onClose()
  }, [country, router, params])

  const body = (
    <div className="p-5">
      <CountryInput value={country} onChange={(value) => setCountry(value)} />
      <Counter
        label="Guests"
        value={guests}
        onChange={(value) => setGuests(value)}
      />
      <Counter
        label="Rooms"
        value={rooms}
        onChange={(value) => setRooms(value)}
      />
    </div>
  )

  return (
    <Modal
      label="Search"
      isOpen={searchModal.isOpen}
      close={searchModal.onClose}
      onSubmit={handleClick}
      body={body}
      buttonLabel="Search"
    />
  )
}

export default SearchModal
