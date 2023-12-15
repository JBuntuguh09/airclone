'use client'
import { PuffLoader } from "react-spinners"

const Loading=()=>{
    return(
       <div className="flex flex-col h-[70vh] justify-center items-center">
         <PuffLoader size={24} color="red"/>
         Loading...........
         
       </div>
    )
}

export default Loading