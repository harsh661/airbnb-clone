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
import { BiSliderAlt } from "react-icons/bi"
import { SlCup } from "react-icons/sl"
import Category from "./Category"

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
  return (
    <div className="phone:px-10 large:px-20 phone:my-5 w-screen shadow-md phone:shadow-none shadow-light-gray/10 flex items-center">
      <div className="px-5 phone:px-0 flex items-center gap-5 phone:gap-10 w-full no_scrollbar overflow-x-scroll">
        {categories.map((category) => (
          <Category
            key={category.label}
            label={category.label}
            icon={category.icon}
            selected={false}
          />
        ))}
      </div>
      <div className="right-5 h-full hidden phone:flex items-center justify-end py-3 bg-gradient-to-r from-transparent to-white">
        <div className="flex items-center gap-2 border bg-white border-border-gray rounded-lg p-4 font-bold text-xs">
          <svg
            width={15}
            height={15}
            viewBox="0 0 16 16"
            aria-hidden="true"
            role="presentation"
            focusable="false"
          >
            <path d="M5 8a3 3 0 0 1 2.83 2H14v2H7.83A3 3 0 1 1 5 8zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm6-8a3 3 0 1 1-2.83 4H2V4h6.17A3 3 0 0 1 11 2zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path>
          </svg>{" "}
          Filters
        </div>
      </div>
    </div>
  )
}

export default CategoriesContainer
