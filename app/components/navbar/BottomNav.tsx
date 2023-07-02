"use client"

import { SafeUser } from "@/app/types"
import { IoSearchSharp } from "react-icons/io5"
import { AiOutlineHeart } from "react-icons/ai"
import { HiOutlineUserCircle } from "react-icons/hi"
import useLoginModal from "@/app/hooks/useLoginModal"
import Avatar from "../Avatar"
import { FaAirbnb } from "react-icons/fa"

interface BottomNavProps {
  currentUser: SafeUser | null | undefined
}

const BottomNav: React.FC<BottomNavProps> = ({ currentUser }) => {
  const loginModal = useLoginModal()
  return (
    <div className="z-30 phone:hidden bg-white border-t py-3 px-12 w-screen flex items-center justify-between fixed bottom-0">
      <span className="flex flex-col items-center text-xs text-light-gray font-semibold">
        <IoSearchSharp size={25} />
        Explore
      </span>
      <span className="flex flex-col items-center text-xs text-light-gray font-semibold">
        <AiOutlineHeart size={25} />
        Whishlists
      </span>
      {currentUser ? (
        <>
          <span className="flex flex-col items-center text-xs text-light-gray font-semibold">
            <FaAirbnb size={25} />
            Trips
          </span>
          <span className="flex flex-col items-center text-xs text-light-gray font-semibold">
            <Avatar size={25} />
            Profile
          </span>
        </>
      ) : (
        <>
          <span
            onClick={loginModal.onOpen}
            className="flex flex-col items-center text-xs text-light-gray font-semibold"
          >
            <HiOutlineUserCircle size={25} />
            Log in
          </span>
        </>
      )}
    </div>
  )
}

export default BottomNav
