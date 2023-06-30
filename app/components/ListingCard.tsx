import Image from "next/image"
import useGetCountries from "../hooks/useGetCountries"
import { Listing } from "@prisma/client"

interface ListingCardProps {
  data: Listing
}

const ListingCard: React.FC<ListingCardProps> = ({ data }) => {
  const { getCountry } = useGetCountries()
  const location = getCountry(data.locationValue)
  return (
    <div className="flex flex-col gap-3">
      <Image
        alt={data.title}
        src={data.imageSrc}
        width={800}
        height={800}
        className="rounded-xl w-full h-full aspect-square"
      />
      <div>
        <h3 className="font-semibold">{`${location?.label}, ${location?.region}`}</h3>
      </div>

      <div className="flex items-center gap-1">
        <span className="font-semibold">₹ {data.price} </span>
        <span>night</span>
      </div>
    </div>
  )
}

export default ListingCard
