'use client'
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";
import { SafeResevation, SafeUser } from "../types"


interface TripsClientProps {
    reservations: SafeResevation[];
    currentUser: SafeUser | null
}
const TripsClient: React.FC<TripsClientProps> = ({
    reservations,
    currentUser
}) => {

    const router = useRouter()
    const [deletingId, setDeletingId] = useState('')

    const onCancel = useCallback((id:string)=> {
        setDeletingId(id)
        axios.delete(`/api/reservations/${id}`)
        .then(()=>{
            toast.success("Reservation cancelled")
            router.refresh()
        })
        .catch((err)=>{
            console.log(err)
            toast.error(err?.response?.data?.error)
        })
        .finally(()=>{
            setDeletingId('')
        })
    }, [router])
  return (
    <Container>
        <Heading
        title="Trips"
        subtitle="Where you have been and where you're going"/>

        <div className="mt-10 grid gap-8
        grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:frid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {reservations.map((reservation)=>(
                <ListingCard
                key={reservation.id}
                data={reservation.listing}
                reservation={reservation}
                actionId={reservation.id}
                onAction={onCancel}
                disabled={deletingId===reservation.id}
                actionLabel="Cancel Reservation"
                currentUser={currentUser}
                />
            ))}
        </div>
    </Container>
  )
}

export default TripsClient