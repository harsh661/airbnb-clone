import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "../../libs/prismadb";
import getReservation from "@/app/actions/getReservations";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  const body = await request.json();

  const { listingId, totalPrice, startDate, endDate } = body;

  if (!listingId || !totalPrice || !startDate || !endDate)
    return NextResponse.error();

  const reservation = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      reservations: {
        create: {
          userId: currentUser.id,
          totalPrice,
          startDate,
          endDate,
        },
      },
    },
  });

  return NextResponse.json(reservation);
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const listingId = url.searchParams.get("listingId");
  if (!listingId) {
    return NextResponse.json({ error: "Missing listingId" }, { status: 400 });
  }
  const reservations = await getReservation({ listingId });
  return NextResponse.json(reservations);
}
