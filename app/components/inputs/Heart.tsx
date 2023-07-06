'use client'

import useWishlist from '@/app/hooks/useWishlist'
import { SafeUser } from '@/app/types'
import React from 'react'
import {FiHeart} from 'react-icons/fi'

interface HeartProps {
    listingId: string
    currentUser: SafeUser | null
}

const Heart: React.FC<HeartProps> = ({
    listingId,
    currentUser
}) => {

  const {isWishlisted, toggleWishlist} = useWishlist({currentUser, listingId})

  return (
    <div onClick={toggleWishlist} className='absolute right-4 top-4 text-white cursor-pointer'>
        <FiHeart size={25} className={isWishlisted ? 'fill-red-500': 'fill-black/30'}/>
    </div>
  )
}

export default Heart