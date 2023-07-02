import {
  MdOutlineHomeWork,
  MdCabin,
  MdSportsGolf,
  MdOutlineCastle,
  MdOutlineDownhillSkiing,
  MdOutlinePalette,
} from "react-icons/md"
import { TbBeach } from "react-icons/tb"
import { FaSwimmingPool } from "react-icons/fa"
import { TbUfo } from "react-icons/tb"
import { HiOutlineHomeModern, HiOutlineFire } from "react-icons/hi2"
import { IoSnowOutline, IoBedOutline } from "react-icons/io5"
import { SlCup } from "react-icons/sl"
import Category from "./Category"
import { useState } from "react"

export const categories = [
  {
    label: "Rooms",
    icon: IoBedOutline,
  },
  {
    label: "Cabins",
    icon: MdCabin,
  },
  {
    label: "Beachfronts",
    icon: TbBeach,
  },
  {
    label: "Golfing",
    icon: MdSportsGolf,
  },
  {
    label: "OMG!",
    icon: TbUfo,
  },
  {
    label: "Amazing Pools",
    icon: FaSwimmingPool,
  },
  {
    label: "Historical homes",
    icon: MdOutlineHomeWork,
  },
  {
    label: "Tiny Homes",
    icon: HiOutlineHomeModern,
  },
  {
    label: "Trending",
    icon: HiOutlineFire,
  },
  {
    label: "Castles",
    icon: MdOutlineCastle,
  },
  {
    label: "Arctic",
    icon: IoSnowOutline,
  },
  {
    label: "Bed & breakfasts",
    icon: SlCup,
  },
  {
    label: "Skiing",
    icon: MdOutlineDownhillSkiing,
  },
  {
    label: "Creative spaces",
    icon: MdOutlinePalette,
  },
]

const CategoriesContainer = () => {
  const [isSelected, setIsSelected] = useState<boolean>(false)

  return (
    <div className="phone:px-10 large:px-20 phone:my-5 w-screen shadow-md phone:shadow-none shadow-light-gray/10 flex items-center">
      <div className="px-5 phone:px-0 flex items-center gap-5 phone:gap-10 w-full no_scrollbar overflow-x-scroll">
        {categories.map((category) => (
          <Category
            key={category.label}
            label={category.label}
            icon={category.icon}
            selected={true}
          />
        ))}
      </div>
    </div>
  )
}

export default CategoriesContainer
