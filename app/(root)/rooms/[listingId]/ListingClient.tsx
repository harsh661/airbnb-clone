"use client";

import axios from "axios";
import { toast } from "react-hot-toast";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { SafeListing, SafeResevations, SafeUser } from "@/app/types";
import ClientOnly from "@/app/components/ClientOnly";
import ListingBody from "@/app/components/listing/ListingBody";
import ListingHeader from "@/app/components/listing/ListingHeader";
import useGetCountries from "@/app/hooks/useGetCountries";
import useLoginModal from "@/app/hooks/useLoginModal";
import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { categories } from "@/app/components/navbar/categories/CategoriesContainer";
import getReservation from "@/app/actions/getReservations";
import { loadStripe } from "@stripe/stripe-js";

const initialRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface ListingClientProps {
  currentUser?: SafeUser | null;
  listing: SafeListing & {
    user: SafeUser;
  };
  reservations?: SafeResevations[];
}

const ListingClient: FC<ListingClientProps> = ({
  currentUser,
  listing,
  reservations = [],
}) => {
  const { getCountry } = useGetCountries();
  const loginModal = useLoginModal();
  const location = getCountry(listing.locationValue);
  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);

  const [localReservations, setLocalReservations] = useState(reservations);
  const [loading, setLoading] = useState(false);

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];
    localReservations.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });
      dates = [...dates, ...range];
    });
    return dates;
  }, [localReservations]);

  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState(initialRange);

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  );

  const onReservation = useCallback(async () => {
    if (!currentUser) return loginModal.onOpen();

    setLoading(true);

    try {
      const response = await axios.post("/api/create-stripe-session", {
        listingId: listing.id,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        price: totalPrice,
        userId: currentUser.id,
      });

      const { sessionId } = response.data;

      const stripe = await stripePromise;
      if (!stripe) throw new Error("Stripe failed to load");

      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) {
        toast.error(error.message || "Failed to initiate payment");
        setLoading(false);
      }
    } catch (error) {
      toast.error("Failed to initiate payment");
      setLoading(false);
    }
  }, [totalPrice, dateRange, listing.id, currentUser, loginModal]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const totalDays = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );
      if (totalDays && listing.price) {
        setTotalPrice(totalDays * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

  return (
    <ClientOnly>
      <ListingHeader listing={listing} location={location} />
      <div className="phone:px-10 py-10 max-w-6xl mx-auto">
        <ListingBody
          totalPrice={totalPrice}
          onDateChange={(value) => setDateRange(value)}
          dateRange={dateRange}
          onSubmit={onReservation}
          currentUser={currentUser}
          user={listing.user}
          listing={listing}
          category={category}
          disabledDates={disabledDates}
          loading={loading}
        />
      </div>
    </ClientOnly>
  );
};

export default ListingClient;
