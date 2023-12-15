"use client"

import  Container  from "../Container"
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb'
import { GiFishingBoat, GiIsland, GiWindmill } from 'react-icons/gi'
import { MdOutlineVilla } from 'react-icons/md'
import CategoryBox from "../CategoryBox"
import { usePathname, useSearchParams } from "next/navigation"


export const categories = [
    {
        label: 'Beach',
        icon: TbBeach, 
        description: 'This property is close to the beach'
    },
    {
        label: 'Windmills',
        icon: TbBeach, 
        description: 'This property has windmills'
    },
    {
        label: 'Modern',
        icon: MdOutlineVilla, 
        description: 'This property is mardern achitecture'
    },
    {
        label: 'Countryside',
        icon: TbMountain, 
        description: 'This property is in the countryside'
    },
    {
        label: 'Pool',
        icon: TbPool, 
        description: 'This property has a pool'
    },
    {
        label: 'Islands',
        icon: GiIsland, 
        description: 'This property is on an island'
    },
    {
        label: 'Lake',
        icon: GiFishingBoat, 
        description: 'This property is close to a lake'
    },
    
]

const Categories = () => 
{
    const params = useSearchParams()
    const category = params?.get('category')
    const pathname = usePathname()
    const isMainPage = pathname === '/'

    if(!isMainPage){
        return null
    }
  return (
    <Container>
        <div className="pt-6 flex flex-row items-center justify-between
        overflow-x-auto">

        {categories.map((item)=>(
            <CategoryBox
            key={item.label}
            label = {item.label}
            selected={category === item.label}
            icon={item.icon}
            />
        ))}
        </div>

    </Container>
  )
}

export default Categories