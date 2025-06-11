import { Inter } from 'next/font/google'
import './globals.css'
import CustomCursor from '@/components/CustomCursor'
import { Analytics } from '@vercel/analytics/next'

const inter = Inter({ subsets: ['latin'] })



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-gray-900 to-gray-800 text-white`}>
        <CustomCursor />
        {children}
        <Analytics />
      </body>
    </html>
  )
}