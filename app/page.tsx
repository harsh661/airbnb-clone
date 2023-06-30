import getListings from "./actions/getListings"
import ClientOnly from "./components/ClientOnly"
import ListingCard from "./components/ListingCard"

export default async function Home() {
  const listings = await getListings()
  return (
    <ClientOnly>
      <main className="p-5 lg:p-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {listings.map((listing) => (
            <ListingCard
              key={listing.id}
              data={listing}
            />
          ))}
        </div>
      </main>
    </ClientOnly>
  )
}
