'use client'

import getCurrentUser from '@/app/actions/getCurrentUser';
import getListingById from '@/app/actions/getListingById';
import getReservations from '@/app/actions/getReservations';
import ClientOnly from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';
import React from 'react'
import Container from '../components/Container';
import Heading from '../components/Heading';
import ListingCard from '../components/listings/ListingCard';
import { SafeListing, SafeUser } from '../types';


interface FavoritesClientProps {
    listing: SafeListing[];
    currentUser?: SafeUser | null
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({
    listing,
    currentUser
}) => {
  return (
    <Container>
        <Heading 
        title='Favorites'
        subtitle='Your Favourites'
        />

        <div className="mt-10 gap-8
        grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
        lg:frid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {listing.map((listing)=> (
                <ListingCard
                currentUser={currentUser}
                key={listing.id}
                data={listing}
                />


            ))}
        </div>

    </Container>
  )
}

export default FavoritesClient