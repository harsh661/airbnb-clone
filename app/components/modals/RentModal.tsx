"use client";

import { useEffect, useMemo, useState } from "react";
import Modal from "./Modal";
import useRentModal from "@/app/hooks/useRentModal";
import Heading from "../Heading";
import { categories } from "../navbar/categories/CategoriesContainer";
import CategoryInput from "../navbar/categories/CategoryInput";
import Input from "../inputs/Input";
import CountryInput, { CountrySelectValue } from "../inputs/CountryInput";
import Counter from "../inputs/Counter";
import UploadImage from "../inputs/UploadImage";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESC = 4,
  PRICE = 5,
}

const RentModal = () => {
  const router = useRouter();
  const rentModal = useRentModal();
  const [step, setStep] = useState(STEPS.CATEGORY);

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<CountrySelectValue>();
  const [guests, setGuests] = useState<number>(1);
  const [rooms, setRooms] = useState<number>(1);
  const [bathrooms, setBathrooms] = useState<number>(1);
  const [image, setImage] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number | "">("");

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const data = {
    title,
    description,
    imageSrc: image,
    category: selectedCategory,
    roomCount: rooms,
    bathroomCount: bathrooms,
    guestCount: guests,
    location: selectedCountry,
    price,
  };

  const validateStep = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    switch (step) {
      case STEPS.CATEGORY:
        if (!selectedCategory) newErrors.category = "Please select a category";
        break;
      case STEPS.LOCATION:
        if (!selectedCountry) newErrors.location = "Please select a location";
        break;
      case STEPS.INFO:
        if (guests < 1) newErrors.guests = "At least 1 guest required";
        if (rooms < 1) newErrors.rooms = "At least 1 room required";
        if (bathrooms < 1) newErrors.bathrooms = "At least 1 bathroom required";
        break;
      case STEPS.IMAGES:
        if (!image) newErrors.image = "Please upload an image";
        break;
      case STEPS.DESC:
        if (!title.trim()) newErrors.title = "Title is required";
        if (!description.trim())
          newErrors.description = "Description is required";
        break;
      case STEPS.PRICE:
        if (price === "" || price <= 0)
          newErrors.price = "Please enter a valid price";
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (!validateStep()) return;
    if (step !== STEPS.PRICE) {
      setStep((prev) => prev + 1);
      return;
    }

    setLoading(true);
    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("Listing is published");
        router.refresh();

        // Reset form
        setStep(STEPS.CATEGORY);
        setSelectedCategory("");
        setSelectedCountry(undefined);
        setGuests(1);
        setRooms(1);
        setBathrooms(1);
        setImage("");
        setTitle("");
        setDescription("");
        setPrice("");
        setErrors({});
        rentModal.onClose();
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => setLoading(false));
  };

  const prevStep = () => {
    setErrors({});
    setStep((prev) => prev - 1);
  };

  const buttonLabel = useMemo(() => {
    if (step === STEPS.PRICE) return "Create";
    return "Next";
  }, [step]);

  const secondaryLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) return undefined;
    return "Back";
  }, [step]);

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
          );
        })}
      </div>
      {errors.category && (
        <p className="text-xs text-red-500">{errors.category}</p>
      )}
    </div>
  );

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
        {errors.location && (
          <p className="text-xs text-red-500 mt-1">{errors.location}</p>
        )}
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="p-5">
        <Heading
          title="Share some basics about your place"
          subtitle="You'll add more details later, such as bed types."
        />
        <Counter label="Guests" value={guests} onChange={setGuests} />
        {errors.guests && (
          <p className="text-xs text-red-500 mt-1">{errors.guests}</p>
        )}
        <hr />
        <Counter label="Rooms" value={rooms} onChange={setRooms} />
        {errors.rooms && (
          <p className="text-xs text-red-500 mt-1">{errors.rooms}</p>
        )}
        <hr />
        <Counter label="Bathrooms" value={bathrooms} onChange={setBathrooms} />
        {errors.bathrooms && (
          <p className="text-xs text-red-500 mt-1">{errors.bathrooms}</p>
        )}
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="p-5">
        <Heading
          title="Add some photos of your house"
          subtitle="Show what your place looks like."
        />
        <UploadImage value={image} onChange={setImage} />
        {errors.image && (
          <p className="text-xs text-red-500 mt-1">{errors.image}</p>
        )}
      </div>
    );
  }

  if (step === STEPS.DESC) {
    bodyContent = (
      <div className="p-5">
        <Heading
          title="How would you describe your place?"
          subtitle="Short and sweet works the best."
        />
        <div className="flex flex-col gap-10">
          <Input placeholder="Title" value={title} onChange={setTitle} />
          {errors.title && (
            <p className="text-xs text-red-500 mt-1">{errors.title}</p>
          )}
          <Input
            placeholder="Description"
            value={description}
            onChange={setDescription}
          />
          {errors.description && (
            <p className="text-xs text-red-500 mt-1">{errors.description}</p>
          )}
        </div>
      </div>
    );
  }

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
        {errors.price && (
          <p className="text-xs text-red-500 mt-1">{errors.price}</p>
        )}
      </div>
    );
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
      buttonLoading={loading}
    />
  );
};

export default RentModal;
