"use client"

import Image from "next/image"
import airbnb_full from "../../../public/icons/airbnb_full.svg"
import airbnb from "../../../public/icons/airbnb.svg"
import Search from "./Search"
import Menu from "./Menu"
import { SafeUser } from "@/app/types"
import CategoriesContainer from "./categories/CategoriesContainer"

interface NavbarProps {
  currentUser?: SafeUser | null
}

const Navbar: React.FC<NavbarProps> = ({currentUser}) => {
  return (
    <>
    <nav className="phone:border-b flex items-center justify-center px-5 phone:px-10 large:px-20">
      <div className="w-full flex items-center py-4">
        {/* Logo section */}
        <div className="w-10 small:w-full hidden phone:block">
          <Image
            src={airbnb_full}
            alt="logo"
            width={100}
            height={80}
            className="hidden medium:flex"
          />
          <Image
            src={airbnb}
            alt="logo"
            width={40}
            height={80}
            className="medium:hidden max-w-none"
          />
        </div>

        {/* Middle section */}
        <Search />

        {/* Menu section */}
        <Menu currentUser={currentUser}/>

      </div>
    </nav>
    <CategoriesContainer />
    </>
  )
}

export default Navbar
