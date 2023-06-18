import './globals.css'
import { Nunito } from 'next/font/google'
import Navbar from './components/Navbar/Navbar'
import RegisterModal from './components/Modals/RegisterModal'
import ToastProvider from './providers/ToastProvider'
import LoginModal from './components/Modals/LoginModal'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'Holiday Homes & Apartment Rentals - Airbnb - Airbnb',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <ToastProvider />
        <RegisterModal />
        <LoginModal />
        <Navbar />
        {children}
      </body>
    </html>
  )
}
