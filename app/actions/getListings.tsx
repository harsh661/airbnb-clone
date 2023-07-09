import prisma from '@/app/libs/prismadb'

export interface Iparams {
    userId?: string;
    guestCount?: number;
    roomCount?: number;
    bathroomCount?: number;
    startDate?: string;
    endDate?: string;
    locationValue?: string;
    category?: string;
}

export default async function getListings( params: Iparams ) {
    let query: any = {}

    const {category, locationValue, guestCount, roomCount} = params

    if (category) {
        query.category = category
    }
    if (locationValue) {
        query.locationValue = locationValue
    }
    if (guestCount && guestCount>1) {
        query.guestCount = {
            gte: Number(guestCount)
        }
    }
    if (roomCount) {
        query.roomCount = {
            gte: Number(roomCount)
        }
    }

    try {
        const listings = await prisma.listing.findMany({
            where: query,
            orderBy: {
                createdAt: 'desc'
            }
        })

        const safeListings = listings.map((listing) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString(),
          }));
        return safeListings

    } catch (error: any) {
        throw new Error(error)
    }
}