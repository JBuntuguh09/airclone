import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import getCurrentUser from './actions/getCurrentUser'
import ClientOnly from './components/ClientOnly'
import LoginModal from './components/modals/LoginModal'
import RegisterModal from './components/modals/RegisterModal'
import RentModal from './components/modals/RentModal'
import SearchModal from './components/modals/SearchModal'
import Navbar from './components/navbar/Navbar'
import ToasterProvider from './components/providers/ToasterProvider'
import './globals.css'

const inter = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AirBnB',
  description: 'Airbnb Clone ',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientOnly>
          <ToasterProvider/>
          <RegisterModal/>
          <LoginModal/>
          <RentModal/>
          <SearchModal/>
          <Navbar currentUser={currentUser}/>
        </ClientOnly>
        <div className='pb-20 pt-28'>
          {children}
        </div>
        </body>
    </html>
  )
}
