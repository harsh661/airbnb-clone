import Image from "next/image"
import useGetCountries from "../../hooks/useGetCountries"
import Link from "next/link"
import Heart from "@/app/components/inputs/Heart"
import { SafeListing, SafeUser } from "../../types"

interface ListingCardProps {
  data: SafeListing
  currentUser: SafeUser | null
}

const ListingCard: React.FC<ListingCardProps> = ({ data, currentUser }) => {
  const { getCountry } = useGetCountries()
  const location = getCountry(data.locationValue)

  return (
    <div className="flex flex-col gap-2 relative">
      <Heart listingId={data.id} currentUser={currentUser} />
      <Link href={`/rooms/${data.id}`}>
        <Image
          alt={data.title}
          src={data.imageSrc}
          width={800}
          height={800}
          className="rounded-xl w-full h-full aspect-square object-cover"
        />
      </Link>

      <div className="flex flex-col">
        <h3 className="font-semibold">{`${location?.label}, ${location?.region}`}</h3>
        <span className="text-light-gray">{data.category}</span>
      </div>

      <span>
        <span className="font-semibold">{`₹ ${data.price}`}</span> night
      </span>
    </div>
  )
}

export default ListingCard
