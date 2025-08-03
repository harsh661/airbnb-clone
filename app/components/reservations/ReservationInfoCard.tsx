"use client";

import Image from "next/image";
import Link from "next/link";
import { SafeListing, SafeUser } from "../../types";
import useGetCountries from "../../hooks/useGetCountries";
import React from "react";
import {
  MdOutlineKingBed,
  MdPeopleAlt,
  MdBathtub,
  MdCalendarMonth,
} from "react-icons/md";
import { getCloudinaryBlurURL } from "@/app/libs/utils";

interface ReservationInfoCardProps {
  reservation: {
    createdAt: string;
    id: string;
    startDate: string;
    endDate: string;
    totalPrice: number;
    listing: SafeListing;
  };
  currentUser: SafeUser | null;
}

const formatShortDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
};

const formatFullDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const ReservationInfoCard: React.FC<ReservationInfoCardProps> = ({
  reservation,
}) => {
  const { getCountry } = useGetCountries();
  const location = getCountry(reservation.listing.locationValue);
  const start = formatShortDate(reservation.startDate);
  const end = formatShortDate(reservation.endDate);

  const blurURL = getCloudinaryBlurURL(reservation.listing.imageSrc);

  return (
    <div className="flex max-md:flex-col gap-5 items-center bg-white rounded-2xl border border-border-gray shadow-sm p-3 hover:shadow-md transition">
      <Link
        href={`/rooms/${reservation.listing.id}`}
        className="relative w-full max-md:aspect-video md:w-52 md:h-36 min-w-[10rem] rounded-lg overflow-hidden flex-shrink-0"
        style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}
      >
        <Image
          src={reservation.listing.imageSrc}
          alt={reservation.listing.title}
          fill
          className="object-cover w-full h-full rounded"
          priority={false}
          sizes="208px"
          placeholder="blur"
          blurDataURL={blurURL}
        />
      </Link>
      <div className="md:flex-1 flex flex-col justify-between min-w-0">
        <div className="text-sm text-light-gray flex gap-2 items-center mb-2 truncate">
          {formatFullDate(reservation.createdAt)}
        </div>
        <Link href={`/rooms/${reservation.listing.id}`}>
          <div
            className="font-semibold truncate mb-1 max-w-full md:max-w-none break-words text-base md:text-lg"
            style={{ wordBreak: "break-word" }}
          >
            {reservation.listing.title}
          </div>
        </Link>
        <div className="text-sm text-light-gray flex gap-2 items-center mb-2 truncate">
          {location && <span>{location.label}</span>}
          <span>&middot;</span>
          <MdCalendarMonth className="inline -mt-0.5" size={15} />
          <span>
            {start}–{end}
          </span>
        </div>
        <div className="flex gap-4 text-sm text-dark-gray items-center">
          <div className="flex gap-1 items-center">
            <MdOutlineKingBed size={16} /> {reservation.listing.roomCount}
          </div>
          <div className="flex gap-1 items-center">
            <MdBathtub size={16} /> {reservation.listing.bathroomCount}
          </div>
          <div className="flex gap-1 items-center">
            <MdPeopleAlt size={16} /> {reservation.listing.guestCount}
          </div>
        </div>
        <div className="mt-3 font-semibold text-base text-black">
          ₹{reservation.totalPrice}
        </div>
      </div>
    </div>
  );
};

export default ReservationInfoCard;
