import prisma from '@/app/libs/prismadb'

export default async function getListings() {
    try {
        const listings = await prisma.listing.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })

        return listings
    } catch (error: any) {
        throw new Error(error)
    }
}

export async function getSpecificListings(query: string) {
    try {
        const listings = await prisma.listing.findMany({
            where: {
                category: query
            }
        })

        return listings
    } catch (error: any) {
        throw new Error(error)
    }
}