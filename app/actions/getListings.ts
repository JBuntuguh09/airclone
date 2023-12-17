import prismas from '@/app/libs/prismadb'

export interface iListingParams {
    userId?: string;
    guestCount?: string;
    roomCount?: string;
    bedroomCount?: string;
    startDate?: string;
    endDate?: string;
    locationValue?: string;
    category?:string;
    
}
export default async function getListings(
    params: iListingParams
) {
    try {
        const { 
            userId,
            guestCount,
            roomCount, 
            bedroomCount,
            locationValue,
            startDate,
            endDate,
            category
        } = params

        let query: any = {}
        if(userId){
            query.userId = userId
        }

        if(category) {
            query.category = category
        }

        if(roomCount){
            query.roomCount = {
                gte: +roomCount
            }
        }

        if(guestCount){
            query.guestCount = {
                gte: +guestCount
            }
        }

        if(bedroomCount){
            query.bedroomCount = {
                gte: +bedroomCount
            }
        }

        if(locationValue){
            query.locationValue = locationValue
        }

        if(startDate && endDate) {
            query.NOT = {
                reservations: {
                    some: {
                        OR: [
                            {
                                endDate: { gte: startDate},
                                startDate: {lte: endDate}
                            },
                            {
                                startDate: { gte: endDate},
                                endDate: {lte: startDate}
                            }
                    ]
                    }
                }
            }
        }

        
       const listings = await prismas?.listing.findMany({
        where: query,
        orderBy: {
            createdAt: 'desc'
        }
       }) 

       const safeListings = listings.map((listing)=>({
            ...listing,
            createdAt: listing.createdAt.toISOString()
       }));

       return safeListings
    } catch (error: any) {
        
        throw new Error(error)
    }
}