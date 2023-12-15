import prismas from '@/app/libs/prismadb'
interface IParams {
    listings: string;
}

export default async function getListingById(
    params: IParams
 ){
    try {
        const { listings } = params

        console.log("raww", params)
        const listing = await prismas.listing.findUnique({
            where:{
                id: listings
            },
            include: {
                user: true
            }
        })

        if(!listing){
            return null;
        }

        return {
            ...listing,
            createdAt: listing.createdAt.toISOString(),
            user: {
                ...listing.user,
                createdAt: listing.user.createdAt.toISOString(),
                updatedAt: listing.user.createdAt.toISOString(),
                emailVerified: listing.user.emailVerified?.toISOString() || null
                
            }
        }
    } catch (error) {
        console.log("mmooon",error)
    }
}