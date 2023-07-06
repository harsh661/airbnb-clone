import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb"

interface IParams {
    listingId?: string
}  

export async function POST(
    request: Request,
    {params}: {params: IParams}
) {
    const currentUser = await getCurrentUser()

    if(!currentUser) {
        return NextResponse.error()
    }

    const {listingId} = params

    if(!listingId) {
        throw new Error("Invalid ID")
    }
     
    let wishlist = [...(currentUser.favoriteIds || [])]

    wishlist.push(listingId)

    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favoriteIds: wishlist
        }
    })

    return NextResponse.json(user)
}

export async function DELETE(
    request: Request,
    {params}: {params: IParams}
) {
    const currentUser = await getCurrentUser()

    if(!currentUser) {
        return NextResponse.error()
    }

    const {listingId} = params

    if(!listingId) {
        throw new Error('Invalid ID')
    }

    let wishlist = [...(currentUser.favoriteIds || [])]

    wishlist = wishlist.filter((id) => id !== listingId)

    const user = await  prisma.user.update({
        where: {
            id: currentUser.id
        }, 
        data: {
            favoriteIds: wishlist
        }
    })

    return NextResponse.json(user)
}