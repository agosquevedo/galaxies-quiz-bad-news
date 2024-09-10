import { Poppins } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import { Analytics } from '@vercel/analytics/react';

const poppins = Poppins({ 
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'Bad News Quiz',
  description: 'Descubre qué photocard de Bad News te tocaría',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={poppins.className}>
      <body>
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  )
}