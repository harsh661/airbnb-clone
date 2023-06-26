"use client"

import { useEffect, useMemo, useState } from "react"
import Modal from "./Modal"
import useRentModal from "@/app/hooks/useRentModal"
import Heading from "../Heading"
import { categories } from "../Navbar/categories/CategoriesContainer"

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

  useEffect(()=>{
    console.log(step)
  }, [step])

  const nextStep = () => {
    setStep(prev => prev + 1)
  }
  const prevStep = () => {
    setStep(prev => prev - 1)
  }

  const buttonLabel = useMemo(() => {
    if(step === STEPS.PRICE) {
      return "Continue"
    }

    return "Next"
  }, [step])

  const secondaryLabel = useMemo(() => {
    if(step === STEPS.CATEGORY) {
      return undefined
    }

    return "Back"
  }, [step])

  const bodyContent = (
    <div className="p-5">
      <Heading title="Which of these best describes your place?" />
      <div className="grid grid-cols-2 phone:grid-cols-3 gap-3 max-h-[50vh] overflow-auto pb-5">
        {categories.map((category) => {
          return (
            <div className="border border-border-gray hover:border-dark-gray flex flex-col gap-2 p-3 rounded-md">
              {<category.icon size={30}/>}
              <h2 className="font-medium">{category.label}</h2>
            </div>
          )
        })}
      </div>
    </div>
  )


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
