import React, { FC } from 'react'
import { IconType } from 'react-icons'

interface ListingCategoryProps {
    icon: IconType
    label: string
}

const ListingCategory: FC<ListingCategoryProps> = ({icon: Icon, label}) => {
  return (
    <div className='flex items-center gap-3'>
        <Icon size={25}/>
        <span className='text-lg font-medium'>{label}</span>
    </div>
  )
}

export default ListingCategory