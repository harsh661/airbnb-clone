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
import axios from "axios"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESC = 4,
  PRICE = 5,
}

const RentModal = () => {
  const router = useRouter()
  const rentModal = useRentModal()
  const [step, setStep] = useState(STEPS.CATEGORY)

  const [selectedCategory, setSelectedCategory] = useState<string>("Rooms")
  const [selectedCountry, setSelectedCountry] = useState<CountrySelectValue>()
  const [guests, setGuests] = useState<number>(4)
  const [rooms, setRooms] = useState<number>(1)
  const [bathrooms, setBathrooms] = useState<number>(1)
  const [image, setImage] = useState<string>("")
  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [price, setPrice] = useState<number>(99)

  const data = {
    title,
    description,
    imageSrc: image,
    category: selectedCategory,
    roomCount: rooms,
    bathroomCount: bathrooms,
    guestCount: guests,
    location: selectedCountry,
    price
  }

  // Move a step up or down
  const nextStep = () => {
    if(step !== STEPS.PRICE) {
      setStep((prev) => prev + 1)
      return
    }
    console.log(data)
    axios.post('/api/listings', data)
      .then(() => {
        toast.success("Listing is published")
        router.refresh()
        setStep(STEPS.CATEGORY)
        rentModal.onClose()
      })
      .catch((e) => {
        console.log(e)
        toast.error("Something went wrong")
      })
      .finally(() => {
        rentModal.onClose()
      })
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
          subtitle="Show what your place looks like."
        />
        <UploadImage value={image} onChange={setImage} />
      </div>
    )
  }

  // Content for description
  if (step === STEPS.DESC) {
    bodyContent = (
      <div className="p-5">
        <Heading
          title="How would you describe your place?"
          subtitle="Short and sweet works the best."
        />
        <div className="flex flex-col gap-10">
          <Input placeholder="Title" value={title} onChange={setTitle} />
          <Input
            placeholder="Description"
            value={description}
            onChange={setDescription}
          />
        </div>
      </div>
    )
  }

  // Content for price input
  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="p-5">
        <Heading
          title="Now, set a price for your place"
          subtitle="How much do you charge per night?"
        />
        <Input
          type="number"
          placeholder="Price"
          value={price}
          onChange={setPrice}
          price
        />
      </div>
    )
  }

  return (
    <Modal
      isOpen={rentModal.isOpen}
      close={rentModal.onClose}
      label="Airbnb your home"
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
