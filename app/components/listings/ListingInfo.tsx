'use client'

import { SafeUser } from "@/app/types";
import dynamic from "next/dynamic";
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import useCountries from "../hooks/useCountries";
import ListingCategory from "./ListingCategory";

const Map = dynamic(()=> import('../Map'), {
    ssr:false
})

interface ListingInfoProps {
    user: SafeUser | null;
    roomCount: number;
    category: {
        icon: IconType;
        label: string;
        description: string;
    } | undefined
    guestCount: number;
    description: string;
    bathroomCount: number;
    locationValue: string

} 

const ListingInfo: React.FC<ListingInfoProps> = ({
    user, 
    description, 
    guestCount,
    roomCount,
    bathroomCount,
    category, 
    locationValue
}) => {
    const  {getByValue } = useCountries()
    const cordinates = getByValue(locationValue)?.latlng
  return (
    <div className="col-span-4 flex flex-col gap-8">
        <div className="flex flex-col gap-2">
            <div className="text-xl font-semi flex flex-row items-center gap-2">
                <div>Hosted By {user?.name}</div>
                <Avatar src={user?.image} />
            </div>
            <div className="flex flex-row items-center gap-4
            font-light text-neutral-500">
               <div>{guestCount} guest(s)</div> 
               <div>{roomCount} room(s)</div> 
               <div>{bathroomCount} bathroom(s)</div> 
               
               
            </div>
        </div>
        <hr/>
        {category &&  (
            <ListingCategory
            icon={category.icon}
            label={category.label}
            description={category.description}
            />
        )}
        <hr/>
        <div className="text-lg font-light text-neutral-500">
            {description}
        </div>
        <hr/>
        <Map center={cordinates} />

    </div>

  )
}

export default ListingInfo