import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import PageLayout from '@/components/PageLayout'
import { Analytics } from '@vercel/analytics/next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Portfolio - Vipul Shetty',
  description: 'Personal portfolio showcasing my work and experience',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <PageLayout>
          {children}
        </PageLayout>
        <Analytics />
      </body>
    </html>
  )
}