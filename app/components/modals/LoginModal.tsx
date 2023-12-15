'use client'
import axios from "axios"
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { useCallback, useState } from "react"
import { signIn } from 'next-auth/react'

import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form'

import useLoginModal  from "../hooks/useLoginModal"
import userRegistrationModal from "../hooks/userRegistrationModal"
import Modal from "./Modal"
import Heading from "../Heading"
import Input from "../inputs/Input"
import { toast } from 'react-hot-toast'
import Button from "../Button"
import { useRouter } from "next/navigation"

const LoginModal = () => {
    const router = useRouter()
    const loginModal = useLoginModal()
    const registerModal = userRegistrationModal()
    const [isLoading, setIsLoading] = useState(false)
    const {
        register, 
        handleSubmit,
        formState:{
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues : {
            email:'',
            password:''
        }
    })

    const onSubmit:SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
        signIn('credentials', {
            ...data,
            redirect: true
        })
        .then((callback) => {
           
            setIsLoading(false)
            if(callback?.ok){
                toast.success("Logged In")
                router.refresh
                console.log("awesome")
                loginModal.onClose()
            }

            if(callback?.error){
                toast.error(callback.error)
            }
        })
       
    }

    const toggle = useCallback(()=>{
        loginModal.onClose()
        registerModal.onOpen()
    },[loginModal, registerModal])

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr/>
            <Button
            outline
            label="Continue with Google"
            icon={FcGoogle}
            onClick={()=>{signIn('google')}}
            />
            <Button
            outline
            label="Continue with Github"
            icon={AiFillGithub}
            onClick={()=>{signIn('github')}}
            />

            <div className="text-neutral-500 
            text-center mt-4 font-light">
                <div className="flex flex-row justify-center items-center gap-2">
                    <div>No account?</div>
                    <div
                    onClick={toggle}
                    className="text-neutal-600 cursor-pointer hover:underline"
                    >Sign up</div>
                </div>
            </div>

        </div>
    )

    const bodyContent =(
        <div className="flex flex-col gap-4">
            <Heading title="Welcome back"
            subtitle="Login to your account"
            center />

        <Input id="email"
            label="Email"
            disabled={isLoading}
            registers={register}
            errors = {errors}
            type="email"
            required/>

        <Input id="password"
            label="Password"
            disabled={isLoading}
            registers={register}
            errors = {errors}
            type="password"
            required/>

        </div> 
    )
  return (
    <Modal disabled={isLoading}
    isOpen= {loginModal.isOpen}
    title = "Login"
    actionLabel="Login"
    onClose={loginModal.onClose}
    onSubmit={handleSubmit(onSubmit)}
    body={bodyContent}
    footer={footerContent}
    />
  ) 
}

export default LoginModal