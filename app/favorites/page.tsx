import getCurrentUser from '@/app/actions/getCurrentUser';
import getListingById from '@/app/actions/getListingById';
import getReservations from '@/app/actions/getReservations';
import ClientOnly from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';
import React from 'react'
import getFavoriteListings from '../actions/getFavoriteListings';
import FavoritesClient from './FavoritesClient';


interface IParams {
    listings: string;
}

const ListingPage = async({ params }: { params: IParams }) => {
    
   // const listing = await getListingById(params)
    const favListing = await getFavoriteListings()
    const currentUser = await getCurrentUser()

    
    if(favListing.length=== 0){
        return (
            <ClientOnly>
                <EmptyState
                title='No favorites found'
                subtitle="Looks like you don't have any favorites"
                showReset = {false}/>
            </ClientOnly>
        )
    }
  return (
    <ClientOnly>
        <FavoritesClient
        listing={favListing}
        currentUser={currentUser}
        
        />

       
    </ClientOnly>
  )
}

export default ListingPage