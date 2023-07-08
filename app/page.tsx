import getCurrentUser from "./actions/getCurrentUser"
import getListings from "./actions/getListings"
import ClientOnly from "./components/ClientOnly"
import ListingCard from "./components/listing/ListingCard"
import PriceSwitch from "./components/inputs/PriceSwitch"

export default async function Home({searchParams}: any) {
  const listings = await getListings(searchParams)
  const currentUser = await getCurrentUser()
  return (
    <ClientOnly>
      <main className="pb-20 px-5 phone:px-10 large:px-20">
        <PriceSwitch />
        <div className="grid grid-cols-1 sm:grid-cols-2 small:grid-cols-3 medium:grid-cols-4 2xl:grid-cols-5 largest:grid-cols-6 gap-8">
          {listings.map((listing) => (
            <ListingCard
              key={listing.id}
              data={listing}
              currentUser={currentUser}
            />
          ))}
        </div>
      </main>
    </ClientOnly>
  )
}
