'use client'

import {
  MdOutlineHomeWork,
  MdCabin,
  MdSportsGolf,
  MdOutlineCastle,
  MdOutlineDownhillSkiing,
  MdOutlinePalette,
} from "react-icons/md"
import {PiBoat, PiCactus, PiLighthouse, PiSwimmingPool, PiTree, PiTreePalm} from 'react-icons/pi'
import { TbBeach, TbChefHat } from "react-icons/tb"
import {BiDish} from 'react-icons/bi'
import { TbUfo } from "react-icons/tb"
import { HiOutlineHomeModern, HiOutlineFire } from "react-icons/hi2"
import { IoSnowOutline, IoBedOutline } from "react-icons/io5"
import { SlCup } from "react-icons/sl"

import Category from "./Category"
import { usePathname, useSearchParams } from "next/navigation"

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
    label: "Luxury",
    icon: BiDish
  },
  {
    label: "Amazing Pools",
    icon: PiSwimmingPool,
  },
  {
    label: "Tropical",
    icon: PiTreePalm
  },
  {
    label: "Castles",
    icon: MdOutlineCastle,
  },
  {
    label: "Breakfasts",
    icon: SlCup,
  },
  {
    label: "Towers",
    icon: PiLighthouse
  },
  {
    label: "Historical",
    icon: MdOutlineHomeWork,
  },
  {
    label: "Tiny Homes",
    icon: HiOutlineHomeModern,
  },
  {
    label: "Desert",
    icon: PiCactus
  },
  {
    label: "Trending",
    icon: HiOutlineFire,
  },
  {
    label: "Treehouses",
    icon: PiTree
  },
  {
    label: "Arctic",
    icon: IoSnowOutline,
  },
  {
    label: "Skiing",
    icon: MdOutlineDownhillSkiing,
  },
  {
    label: "Creative spaces",
    icon: MdOutlinePalette,
  },
  {
    label: "Boats",
    icon: PiBoat
  },
  {
    label: "Kitchen",
    icon: TbChefHat
  }
]

const CategoriesContainer = () => {
  const pathname = usePathname()
  const params = useSearchParams()
  const category = params?.get('category')

  if(pathname !== '/') return

  return (
    <div className="phone:px-10 large:px-20 phone:my-5 w-full shadow-md phone:shadow-none shadow-light-gray/10 flex items-center">
      <div className="px-5 phone:px-0 flex items-center gap-5 phone:gap-10 w-full no_scrollbar overflow-x-scroll">
        {categories.map((item) => (
          <Category
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </div>
  )
}

export default CategoriesContainer
