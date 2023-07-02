import Image from "next/image"
import useGetCountries from "../hooks/useGetCountries"
import { Listing } from "@prisma/client"
import Link from "next/link"
import Heart from "@/app/components/inputs/Heart"
import getCurrentUser from "../actions/getCurrentUser"
import { SafeUser } from "../types"

interface ListingCardProps {
  data: Listing
  currentUser: SafeUser | null
}

const ListingCard: React.FC<ListingCardProps> = ({ data, currentUser }) => {
  const { getCountry } = useGetCountries()
  const location = getCountry(data.locationValue)

  return (
    <Link href={`/rooms/${data.id}`} className="flex flex-col gap-2 relative">
      <Heart listingId={data.id} currentUser={currentUser} />
      <Image
        alt={data.title}
        src={data.imageSrc}
        width={800}
        height={800}
        className="rounded-xl w-full h-full aspect-square object-cover"
      />

      <div className="flex flex-col">
        <h3 className="font-bold">{`${location?.label}, ${location?.region}`}</h3>
        <span className="text-light-gray">{data.category}</span>
      </div>

      <span>
        <b>{`₹ ${data.price}`}</b> night
      </span>
    </Link>
  )
}

export default ListingCard
