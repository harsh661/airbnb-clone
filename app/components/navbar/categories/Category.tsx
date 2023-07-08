"use client"

import { IconType } from "react-icons"
import { useRouter, useSearchParams } from "next/navigation"
import qs from "query-string"
import { useCallback } from "react"

interface CategoryProps {
  label: string
  icon: IconType
  selected: boolean
}

const Category: React.FC<CategoryProps> = ({ label, icon: Icon, selected }) => {
  const router = useRouter()
  const params = useSearchParams()

  const handleClick = useCallback(() => {
  
    let currentQuery = {}

    if(params) {
      currentQuery = qs.parse(params.toString())
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: label
    }

    if (params?.get('category') === label) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    )
    router.push(url)
  }, [label, router, params])

  return (
    <div
      onClick={handleClick}
      className={`${
        selected ? "text-dark-gray" : "text-light-gray"
      } relative hover:text-dark-gray cursor-pointer flex flex-col gap-2 items-center pb-3 phone:py-3`}
    >
      <Icon size={25} />
      <div className="font-medium text-xs phone:text-sm whitespace-nowrap">
        {label}
      </div>
      {selected && (
        <span className="absolute w-full h-[2px] bg-dark-gray bottom-0"></span>
      )}
    </div>
  )
}

export default Category
