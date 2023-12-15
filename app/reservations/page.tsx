import getCurrentUser from "../actions/getCurrentUser"
import getReservations from "../actions/getReservations"
import ClientOnly from "../components/ClientOnly"
import EmptyState from "../components/EmptyState"
import ReservationClient from "./ReservationClient"






const ReservationsPage = async () => {
    const currentUser = await getCurrentUser()
    if(!currentUser){
        return(
            <ClientOnly>
                <EmptyState title="Unauthorized"
                subtitle="Please Login" showReset/>
            </ClientOnly>
        )
    }

    const reservations =await getReservations({
        authorId: currentUser.id
    })

    if(reservations.length === 0){
        return(
            <ClientOnly>
                <EmptyState title="No reservations found"
                subtitle="Looks you have no reservations" showReset/>
            </ClientOnly>
        ) 
    }
  return (
    <ClientOnly>
        <ReservationClient
        reservations={reservations}
        currentUser={currentUser}
        />

    </ClientOnly>
  )
}

export default ReservationsPage