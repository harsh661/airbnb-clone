'use client'

import { useCallback, useState } from "react"
import Avatar from "../Avatar"
import MenuItems from "./MenuItems"
import {LuGlobe} from 'react-icons/lu'
import {MdMenu} from 'react-icons/md'
import useRegisterModal from "@/app/hooks/useRegisterModal"
import useLoginModal from "@/app/hooks/useLoginModal"

const Menu = () => {
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = useCallback(() => {
    setIsOpen(prev => !prev)
  }, [])

  return (
    <div className="w-full hidden phone:flex items-center justify-end text-sm gap-2 relative">
      <div className="font-bold whitespace-nowrap text-dark-gray p-3 hover:bg-hover-gray rounded-full cursor-pointer">
        Airbnb your home
      </div>

      <span className="p-3 rounded-full hover:bg-hover-gray">
        {/* Globe icon */}
        <LuGlobe size={16}/>
      </span>

      <div onClick={toggleOpen} className="flex items-center gap-2 px-2 py-1 rounded-full border border-border-gray shadow-sm hover:shadow-md">
        {/* Hamburger icon */}
        <MdMenu size={20}/>

        {/* User icon */}
        <Avatar />
        
      </div>

      {isOpen && (
        <div className="absolute right-0 top-14 rounded-md card-shadow bg-white flex flex-col py-2">
            <MenuItems 
              onClick={registerModal.onOpen}
              label="Sign up"
            />
            <MenuItems 
              onClick={loginModal.onOpen}
              label="Log in"
              border={true}
            />
            <MenuItems 
              onClick={() => {}}
              label="Airbnb your home"
            />
            <MenuItems 
              onClick={() => {}}
              label="Help"
            />
        </div>
      )}
    </div>
  )
}

export default Menu
