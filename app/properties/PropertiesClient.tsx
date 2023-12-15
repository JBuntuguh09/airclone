'use client'
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";
import { SafeListing, SafeResevation, SafeUser } from "../types"


interface PropertiesClientProps {
    listings: SafeListing[];
    currentUser: SafeUser | null
}
const PropertiesClient: React.FC<PropertiesClientProps> = ({
    listings,
    currentUser
}) => {

    const router = useRouter()
    const [deletingId, setDeletingId] = useState('')

    const onCancel = useCallback((id:string)=> {
        setDeletingId(id)
        axios.delete(`/api/listings/${id}`)
        .then(()=>{
            toast.success("Lising Deleted")
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
        title="Properties"
        subtitle="List of your properties"/>

        <div className="mt-10 grid gap-8
        grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:frid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {listings.map((listing)=>(
                <ListingCard
                key={listing.id}
                data={listing}
                actionId={listing.id}
                onAction={onCancel}
                disabled={deletingId===listing.id}
                actionLabel="Delete property"
                currentUser={currentUser}
                />
            ))}
        </div>
    </Container>
  )
}

export default PropertiesClient