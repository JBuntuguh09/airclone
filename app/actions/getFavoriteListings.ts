import prismas from '@/app/libs/prismadb'
import getCurrentUser from './getCurrentUser'

export default async function getFavoriteListings() {
    
    try {
        const currentUser = await getCurrentUser()
        if(!currentUser){
            return []
        }

        const favourites = await prismas.listing.findMany({
            where: {
                id: {
                    in: [...(currentUser.favouriteIds || [])]
                }
            }
        })

        const safeFavorites = favourites.map((favourite)=>({
            ...favourite,
            createdAt: favourite.createdAt.toISOString()
        })) 

        return safeFavorites
        
    } catch (error: any) {
        throw new Error(error)
    }
}