"use client"

import { useEffect, useMemo, useState } from "react"
import Modal from "./Modal"
import useRentModal from "@/app/hooks/useRentModal"
import Heading from "../Heading"
import { categories } from "../navbar/categories/CategoriesContainer"
import CategoryInput from "../navbar/categories/CategoryInput"
import Input from "../inputs/Input"
import CountryInput, { CountrySelectValue } from "../inputs/CountryInput"
import Counter from "../inputs/Counter"
import UploadImage from "../inputs/UploadImage"

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESC = 4,
  PRICE = 5,
}

const RentModal = () => {
  const rentModal = useRentModal()
  const [step, setStep] = useState(STEPS.CATEGORY)

  const [selectedCategory, setSelectedCategory] = useState<string>("Rooms")
  const [selectedCountry, setSelectedCountry] = useState<CountrySelectValue>()
  const [guests, setGuests] = useState<number>(4)
  const [rooms, setRooms] = useState<number>(1)
  const [bathrooms, setBathrooms] = useState<number>(1)
  const [image, setImage] = useState<string>('')

  // Move a step up or down
  const nextStep = () => {
    setStep((prev) => prev + 1)
  }
  const prevStep = () => {
    setStep((prev) => prev - 1)
  }

  // Change the button labels based on current step
  const buttonLabel = useMemo(() => {
    // Main button label
    if (step === STEPS.PRICE) {
      return "Continue"
    }

    return "Next"
  }, [step])

  const secondaryLabel = useMemo(() => {
    // Secondary button label
    if (step === STEPS.CATEGORY) {
      return undefined
    }

    return "Back"
  }, [step])

  // Initial body content
  let bodyContent = (
    <div className="p-5">
      <Heading title="Which of these best describes your place?" />
      <div className="grid grid-cols-2 phone:grid-cols-3 gap-3 max-h-[50vh] overflow-auto pb-5">
        {categories.map((category) => {
          return (
            <CategoryInput
              key={category.label}
              label={category.label}
              icon={category.icon}
              onClick={() => setSelectedCategory(category.label)}
              selected={selectedCategory === category.label}
            />
          )
        })}
      </div>
    </div>
  )

  // Content for location selector
  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="p-5">
        <Heading
          title="Where's your place located?"
          subtitle="Your address is only shared with guests after they’ve made a reservation."
        />
        <CountryInput
          value={selectedCountry}
          onChange={(value) => setSelectedCountry(value)}
        />
      </div>
    )
  }

  // Content for info selector
  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="p-5">
        <Heading
          title="Share some basics about your place"
          subtitle="You'll add more details later, such as bed types."
        />
        <Counter label="Guests" value={guests} onChange={setGuests} />
        <hr />
        <Counter label="Rooms" value={rooms} onChange={setRooms} />
        <hr />
        <Counter label="Bathrooms" value={bathrooms} onChange={setBathrooms} />
      </div>
    )
  }

  // Content for image selector
  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="p-5">
        <Heading
          title="Add some photos of your house"
          subtitle="You'll need 5 photos to get started." 
        />
        <UploadImage value={image} onChange={setImage}/>
      </div>
    )
  }

  return (
    <Modal
      isOpen={rentModal.isOpen}
      close={rentModal.onClose}
      label="Airbnb you home"
      buttonLabel={buttonLabel}
      buttonColored
      onSubmit={nextStep}
      secondaryLabel={secondaryLabel}
      secondaryAction={prevStep}
      body={bodyContent}
    />
  )
}

export default RentModal
