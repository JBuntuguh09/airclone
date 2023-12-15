import { SafeUser } from "@/app/types";
import axios from "axios";

import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import useLoginModal from "./useLoginModal";

interface IUseFavorite {
    listingId: string;
    currentUser?: SafeUser | null;
}

const useFavorite = ({
    listingId,
    currentUser
}: IUseFavorite) =>{
    const router = useRouter()
    const loginModel = useLoginModal()

    const hasFavorite = useMemo(()=> {
        const list = currentUser?.favouriteIds || []
        console.log("Moove", currentUser?.favouriteIds)
        console.log("Moove2", listingId)
        console.log("Moove3", list)
        
        
        return list.includes(listingId)
    }, [currentUser, listingId])

    const toggleFavorite = useCallback(async(
        e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        
        if(!currentUser){
            return loginModel.onOpen()
        }

        try {
            let request;
           
            if(hasFavorite){
                console.log("aaaaaaaaaaaaaaaaaaaaa",hasFavorite)
                request = () => axios.delete(`/api/favorites/${listingId}`);
            }else {
                console.log("aaaaaaaaaaaaaaaammmaaaaa",hasFavorite)
                request = () => axios.post(`/api/favorites/${listingId}`);
            }

            await request();
            router.refresh();
            toast.success('Success');
        } catch (error) {
            toast.error('Somethibg went wrong');
        }
      },
      [currentUser, hasFavorite, listingId, loginModel, router],
    )

    return {
        hasFavorite,
        toggleFavorite
    }
    
}

export default useFavorite