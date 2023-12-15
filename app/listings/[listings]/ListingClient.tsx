'use client'
import Container from '@/app/components/Container';
import useLoginModal from '@/app/components/hooks/useLoginModal';
import ListingHead from '@/app/components/listings/ListingHead';
import ListingInfo from '@/app/components/listings/ListingInfo';
import ListingReservation from '@/app/components/listings/ListingReservation';
import { categories } from '@/app/components/navbar/Categories';
import { SafeListing, SafeResevation, SafeUser } from '@/app/types';
import { Reservation } from '@prisma/client'
import axios from 'axios';
import { differenceInCalendarDays, differenceInDays } from 'date-fns';
import { eachDayOfInterval } from 'date-fns/esm';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Range } from 'react-date-range';
import toast from 'react-hot-toast';

const initialDateRange = {
     startDate: new Date(),
     endDate: new Date(),
     key: 'selection'
}
interface ListingClientProps {
    reservations?: SafeResevation[];
    listing: SafeListing & {
        user: SafeUser
    };
    currentUser : SafeUser | null
}

const ListingClient:React.FC<ListingClientProps> = ({
    reservations = [],
    listing,
    currentUser
}) => {

    const loginModel = useLoginModal()
    const router = useRouter()
    
    const disabledDates = useMemo(()=> {
        let dates: Date[] = [];
        reservations.forEach((reservations)=>{
            const range = eachDayOfInterval({
                start: new Date(reservations.startDate),
                end: new Date(reservations.endDate),
                
            });
            dates = [...dates, ...range]
        })

        return dates;
    }, [reservations])

    console.log("disdaled", disabledDates)
    const [loading, setLoading] = useState(false)
    const [price, setPrice] = useState(listing.price)
    const [dateRange, setDateRange] = useState<Range>(initialDateRange)

    const onCreateReservation = useCallback(
      () => {
        
        if(!currentUser){
            return loginModel.onOpen();
        }

        setLoading(true)

    
        axios.post('/api/reservations', {
            listingId: listing?.id , startDate: dateRange.startDate, 
            endDate: dateRange.endDate,
            price
            
        }).then(()=>{
            
            toast.success('Reservations Successful')
            setDateRange(initialDateRange)
            router.refresh()
        }).catch((err)=>{
            
            toast.error("Error. Something went wrong")
        }).finally(()=>{
            console.log("mmmmmmmmmmmmmmmmmmmmmmmmmmmbbbbbbbbbbgg")
            setLoading(false)
        })
      },
      [price, dateRange, listing?.id, router, currentUser, loginModel],
    )

    useEffect(() => {
      if(dateRange.startDate && dateRange.endDate) {
        const dayCount = differenceInCalendarDays(
            dateRange.endDate, dateRange.startDate
        )

        if(dayCount && listing.price) {
            setPrice(dayCount * listing.price)
        }else{
            setPrice(listing.price)
        }
      }
    
    }, [dateRange, listing.price])
    
    

    const category = useMemo(()=>{
        return categories.find((item)=> item.label === listing.category)
    },[listing.category])
  return (
    <Container>
        <div className="max-w-screen-lg mx-auto">
            <div className="flex flex-col gap-6">
                <ListingHead
                title={listing.title}
                imageSrc={listing.imageSrc}
                locationValue={listing.locationValue}
                id={listing.id}
                currentUser={currentUser} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-10">
                <ListingInfo 
                user={listing.user}
                category={category}
                description={listing.description}
                roomCount={listing.roomCount}
                guestCount={listing.guestCount}
                bathroomCount={listing.bedroomCount}
                locationValue={listing.locationValue}
                />

                <div className='order-first mb-10 
                md:order-last
                md:col-span-3'>
                    <ListingReservation
                    price={listing.price}
                    totalPrice={price}
                    onChangeDate={(value)=> setDateRange(value)}
                    dateRange={dateRange}
                    onSubmit={onCreateReservation}
                    disabled={loading}
                    disabledDates={disabledDates}/>
                </div>

            </div>
        </div>
    </Container>
  )
}

export default ListingClient