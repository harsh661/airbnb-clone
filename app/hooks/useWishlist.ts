import axios from "axios";
import { SafeUser } from "../types";
import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

interface IUseWishlist {
    listingId: string
    currentUser?: SafeUser | null 
}

const useWishlist = ({listingId, currentUser}: IUseWishlist) => {

    const router = useRouter()

    const isWishlisted = useMemo(()=>{
        return currentUser?.favoriteIds.includes(listingId)
    }, [currentUser, listingId])

    const toggleWishlist = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()

        try {
            if(isWishlisted) {
                await axios.delete(`/api/wishlist/${listingId}`)
            } else {
                await axios.post(`/api/wishlist/${listingId}`)
            }

            router.refresh()
        } catch (error) {
            toast.error('Something went wrong!')
        }
    }, [currentUser, isWishlisted, listingId, router])

    return {
        isWishlisted, toggleWishlist
    }
}

export default useWishlist