import React from "react";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import Heading from "../components/Heading";
import BottomNav from "../components/navbar/BottomNav";
import ReservationInfoCard from "../components/reservations/ReservationInfoCard";

export default async function Reservations() {
  const currentUser = await getCurrentUser();
  const reservations = await getReservations({ userId: currentUser?.id });

  return (
    <ClientOnly>
      <main className="pb-20 px-5 phone:px-10 max-w-6xl mx-auto large:px-10">
        <Heading title="My Reservations" />
        <div className="grid  gap-8">
          {reservations?.map((reservation) => (
            <ReservationInfoCard
              key={reservation.id}
              reservation={reservation}
              currentUser={currentUser}
            />
          ))}
        </div>
      </main>
      <BottomNav currentUser={currentUser} />
    </ClientOnly>
  );
}
