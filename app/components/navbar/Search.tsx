"use client"

import useSearchModal from "@/app/hooks/useSearchModal"
import { IoSearch } from "react-icons/io5"

const Search = () => {

  const searchModal = useSearchModal()

  return (
    <div onClick={searchModal.onOpen} className="flex items-center justify-center w-full pl-0 text-sm phone:pl-5 small:pl-0">
      <div className="flex flex-row-reverse phone:flex-row justify-between w-full phone:w-max items-center p-2 border border-border-gray rounded-full shadow-md phone:shadow-sm hover:shadow-md">
        {/* For bigger screen */}
        <div className="w-auto phone:flex items-center justify-between hidden">
          <span className="px-4 overflow-hidden font-semibold whitespace-nowrap cursor-pointer">
            Anywhere
          </span>
          <span className="px-4 overflow-hidden font-semibold whitespace-nowrap cursor-pointer">
            Any week
          </span>
          <span className="px-4 overflow-hidden text-light-gray whitespace-nowrap cursor-pointer">
            Add guests
          </span>
        </div>

        {/* For phone screen */}
        <div className="w-full phone:hidden flex flex-col">
          <span className="px-4 text-base overflow-hidden font-bold whitespace-nowrap cursor-pointer">
            Anywhere
          </span>
          <span className="flex items-center text-xs">
            <span className="px-4 overflow-hidden text-light-gray phone:text-dark-gray phone:font-bold whitespace-nowrap cursor-pointer">
              Any week
            </span>
            <span className="overflow-hidden text-light-gray whitespace-nowrap cursor-pointer">
              Add guests
            </span>
          </span>
        </div>

        <span className="w-8 h-8 phone:p-2 rounded-full text-light-gray phone:text-white phone:bg-accent-pink flex items-center justify-center">
          <IoSearch size={20} />
        </span>
      </div>
    </div>
  )
}

export default Search
