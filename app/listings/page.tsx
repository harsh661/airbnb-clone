import React from "react";
import ClientOnly from "../components/ClientOnly";
import ListingCard from "../components/listing/ListingCard";
import getCurrentUser from "../actions/getCurrentUser";
import Heading from "../components/Heading";
import BottomNav from "../components/navbar/BottomNav";
import getListings from "../actions/getListings";

export default async function Listings() {
  const currentUser = await getCurrentUser();
  const listings = await getListings({ userId: currentUser?.id });

  return (
    <ClientOnly>
      <main className="pb-20 px-5 phone:px-10 max-w-6xl mx-auto large:px-10">
        <Heading title="My properties" />
        <div className="grid grid-cols-1 sm:grid-cols-2 medium:grid-cols-3 largest:grid-cols-4 gap-8">
          {listings?.map((listing) => (
            <ListingCard
              key={listing.id}
              data={listing}
              currentUser={currentUser}
            />
          ))}
        </div>
      </main>
      <BottomNav currentUser={currentUser} />
    </ClientOnly>
  );
}
