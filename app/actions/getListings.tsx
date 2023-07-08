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

    const {category} = params

    if (category) {
        query.category = category
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