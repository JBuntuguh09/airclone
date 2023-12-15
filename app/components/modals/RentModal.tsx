'use client'
import Modal from './Modal'

import useRentModal  from "../hooks/useRentModal"
import Heading from "../Heading"
import Input from "../inputs/Input"
import { toast } from 'react-hot-toast'
import Button from "../Button"
import { signIn } from "next-auth/react"
import useLoginModal from "../hooks/useLoginModal"
import { useMemo, useState } from 'react'
import { categories } from '../navbar/Categories'
import CategoryInput from '../inputs/CategoryInput'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import CountrySelect from '../inputs/CountrySelect'
import dynamic from 'next/dynamic'
import Counter from '../inputs/Counter'
import ImageUpload from '../inputs/ImageUpload'
import axios from 'axios'
import { useRouter } from 'next/navigation'

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5
}

const RentModal = () => {
  const router = useRouter()
    const rentModal = useRentModal()
    const loginModal = useLoginModal()
    const [isLoading, setIsLoading] = useState(false)

    const [steps, setSteps] = useState(STEPS.CATEGORY)

    const {
        register, 
        handleSubmit,
        setValue,
        watch,
        formState:{
            errors,
        },
        reset
    } = useForm<FieldValues>({
        defaultValues : {
            category:'',
            location:null,
            guestCount:1,
            roomCount:1,
            bedroomCount:1,
            imageSrc: '',
            price: 1,
            title: '',
            description:''
        }
    })

    const category = watch('category')
    const location = watch('location')
    const guestCount = watch('guestCount')
    const roomCount = watch('roomCount')
    const bedroomCount = watch('bedroomCount')
    const imageSrc = watch('imageSrc')
    const price = watch('price')
    const title = watch('title')
    const description = watch('description')
    
    

    const Map = useMemo(()=> dynamic(() => import('../Map'),
    {ssr: false
    }),[location])

    const setCustomValue = (id: string, value: any) => {
      setValue(id, value, {
        shouldValidate:true,
        shouldDirty: true,
        shouldTouch: true
      })
    }

    const onSubmit: SubmitHandler<FieldValues>=(data)=>{
      if(steps!==STEPS.PRICE){
        return onNext()
      }

      setIsLoading(true)

      console.log("daTA" , data)
      axios.post('/api/listings', data)
      .then(()=>{
        toast.success("Listing created")
        router.refresh()
        reset()
        setSteps(STEPS.CATEGORY)
        rentModal.onClose()
      })
      .catch((err)=>{
        console.log("errrrrror",err)
        toast.error("Error. Unable to create listing")
      })
    }

    const  onBack = () =>{
      setSteps((value) => value - 1)
    }

    const  onNext = () =>{
      setSteps((value) => value + 1)
    }

    const  actionLabel = useMemo(() =>{
      if(steps === STEPS.PRICE){
        return "Create"
      }
      return "Next"
    }, [steps])

    const  secondaryActionLabel = useMemo(() =>{
      if(steps === STEPS.CATEGORY){
        return undefined
      }
      return "Back"
    }, [steps])

    let bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
        title="Pick a category"
        subtitle='Which of the following best describes you place?'
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3
        max-h-[50vh] overflow-y-auto">
            {categories.map((item)=> (
              <div key={item.label} className="col-span-1">
                <CategoryInput
                icon={item.icon}
                label={item.label}
                selected={category === item.label}
                onClick={(category)=> setCustomValue('category', category)}
                />
              </div>    
            ))}
        </div>

      </div>
    )
    
    
    if(steps === STEPS.LOCATION){
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
          title='Where is you place located'
          subtitle='Help guest find you!'
          />

          <CountrySelect
          value={location}
          onChange={(value)=> setCustomValue('location', value)}
          />
          <Map center={location?.latlng}/>
        </div>
      )
    }

    if(steps === STEPS.INFO){
      bodyContent = (
        <div className="flex flex-col gap-8">
        <Heading
        title='Share some details about your place'
        subtitle='What facilities do you have?'
        />
        <Counter title='Guests'
        subtitle='How many guest do u allow?'
        value={guestCount}
        onChange={(value)=> setCustomValue('guestCount', value)}/>

        <hr/>

        <Counter title='Rooms'
        subtitle='How many rooms do you have?'
        value={roomCount}
        onChange={(value)=> setCustomValue('roomCount', value)}/>

        <hr/>

        <Counter title='Bathrooms'
        subtitle='How many bathrooms do you have?'
        value={bedroomCount}
        onChange={(value)=> setCustomValue('bedroomCount', value)}/>
        </div>
      )
    }

    if(steps === STEPS.IMAGES){
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
          title='Add photos of you place'
          subtitle='Show guest what you place looks like'
          />

          <ImageUpload
          value={imageSrc} 
          onChange={(value)=> setCustomValue('imageSrc', value)}/>

          
        </div>
      )
    }

    if(steps === STEPS.DESCRIPTION){
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
          title='How would you describe your place'
          subtitle='Give a short summary'
          />

          <Input 
          id='title'
          label='Title'
          disabled={isLoading}
          registers={register}
          errors={errors}
          type={"text"}
          required/>

          <Input 
          id='description'
          label='Description'
          disabled={isLoading}
          registers={register}
          errors={errors}
          type={"text"}
          required/>
          
        </div>
      )
    }

    if(steps === STEPS.PRICE){
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
          title='How would you describe your place'
          subtitle='Give a short summary'
          />

          <Input 
          id='price'
          label='Price'
          formatPrice
          disabled={isLoading}
          registers={register}
          errors={errors}
          type={"number"}
          required/>  
        </div>
      )
    }

    
    
  return (
    <Modal 
    isOpen= {rentModal.isOpen}
    title = "Airbnb you home"
    actionLabel={actionLabel}
    onClose={rentModal.onClose}
    onSubmit={handleSubmit(onSubmit)}
    secondaryLabel={secondaryActionLabel}
    secondaryAction={steps=== STEPS.CATEGORY?undefined:onBack}
   body={bodyContent}
    />
  )
}

export default RentModal