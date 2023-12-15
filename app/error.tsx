'use client'

import { useEffect } from "react";
import EmptyState from "./components/EmptyState";


interface ErrorStateProp {
    error: Error;
}

const ErrorState:React.FC<ErrorStateProp> = ({
    error
}) => {
    useEffect(()=>{
        console.error(error)
    },[error])
  return (
    <EmptyState
    title="Sorry"
    subtitle="Something went wrong"
    showReset={false}
    />

  )
}

export default ErrorState