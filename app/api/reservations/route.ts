import prismas from '@/app/libs/prismadb'
import { NextResponse } from 'next/server'
import getCurrentUser from '@/app/actions/getCurrentUser';

export async function POST(
    request:Request) {
    const currentUser = await getCurrentUser()

    if(!currentUser){
        return NextResponse.error()
    }

    const body = await request.json();

    const{
        listingId,
        startDate,
        endDate, 
        price
    }= body;

   console.log("this is body", price)

    // if(!listingId || !startDate || !endDate || !totalPrice) {
    //     console.log("errrrrrrrrrrrrrrrrrr")
    //     return NextResponse.error()
    // }

    console.log("this is bodyww", price)

    
    
    const listingRes = await prismas.listing.update({
        where: {
            id: listingId
        },
        
        data: {
            reservations: {
                create: {
                    userId: currentUser.id,
                    startDate,
                    endDate,
                    totalPrice:price
                }
            }
        }
    }).catch((err)=>{
        console.log("vvvvvvvv", err)
    });

    return NextResponse.json(listingRes);
}