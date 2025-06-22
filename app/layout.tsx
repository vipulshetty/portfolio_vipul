import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import PageLayout from '@/components/PageLayout'
import { Analytics } from '@vercel/analytics/react'
import SmoothScroll from '@/components/ui/SmoothScroll'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Vipul Shetty - Portfolio',
  description: 'The portfolio of Vipul Shetty, a Full Stack Developer, Data Scientist, and DevOps Engineer.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="!scroll-smooth">
      <body className={`${inter.className} bg-black text-white`}>
        <SmoothScroll />
        <Navbar />
        <PageLayout>
          {children}
        </PageLayout>
        <Analytics />
      </body>
    </html>
  )
}