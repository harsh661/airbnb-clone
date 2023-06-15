"use client"

import { IoSearch } from "react-icons/io5"

const Search = () => {
  return (
    <div className="flex items-center justify-center w-full pl-0 text-sm phone:pl-5 small:pl-0">
      <div className="flex justify-between w-full phone:w-max items-center p-2 border border-border-gray rounded-full shadow-sm hover:shadow-md">
        <span className="phone:hidden text-light-gray">
          <IoSearch size={20}/>
        </span>
        <span className="px-4 overflow-hidden font-bold whitespace-nowrap cursor-pointer">
          Anywhere
        </span>
        <span className="px-4 overflow-hidden font-bold whitespace-nowrap cursor-pointer">
          Any week
        </span>
        <span className="px-4 overflow-hidden text-light-gray whitespace-nowrap cursor-pointer">
          Add guests
        </span>
        <span className="w-8 h-8 rounded-full bg-accent-pink hidden phone:flex items-center justify-center text-white">
          <IoSearch />
        </span>
      </div>
    </div>
  )
}

export default Search
