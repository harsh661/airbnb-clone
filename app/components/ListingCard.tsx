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
    <div className="flex flex-col gap-2">
      <Image
        alt={data.title}
        src={data.imageSrc}
        width={800}
        height={800}
        className="rounded-xl w-full h-full aspect-square object-cover"
      />

      <div className="flex flex-col">
        <h3 className="font-bold">{`${location?.label}, ${location?.region}`}</h3>
        <span className="text-light-gray">{data.createdAt.toISOString()}</span>
      </div>

      <span>
        <b>{`₹ ${data.price}`}</b> night
      </span>
    </div>
  )
}

export default ListingCard
