'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { FaDownload } from 'react-icons/fa'

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Skills', href: '/skills' },
  { name: 'Projects', href: '/projects' },
  { name: 'Experience', href: '/experience' },
  { name: 'Socials', href: '/socials' },
]

export default function PageLayout({ children }: { children: React.ReactNode }) {
  const [activeItem, setActiveItem] = useState('')
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-900">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900" />
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            backgroundPosition: ['0px 0px', '100px 100px'],
          }}
          transition={{
            repeat: Infinity,
            repeatType: 'reverse',
            duration: 20,
          }}
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }}
        />
      </div>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
        className="fixed top-0 left-0 right-0 z-50 bg-opacity-90 bg-gray-900 backdrop-blur-md shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 flex items-center">
                <motion.span
                  className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Portfolio
                </motion.span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              {navItems.map((item) => (
                <Link key={item.name} href={item.href} className="relative">
                  <motion.span
                    className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                    onHoverStart={() => setActiveItem(item.name)}
                    onHoverEnd={() => setActiveItem('')}
                    whileHover={{ y: -2 }}
                  >
                    {item.name}
                    {activeItem === item.name && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500"
                        layoutId="underline"
                      />
                    )}
                  </motion.span>
                </Link>
              ))}
              <motion.a
                href="/resume.pdf"
                download
                className="bg-purple-600 text-white px-4 py-2 rounded-full font-semibold text-sm hover:bg-purple-700 transition-colors duration-300 shadow-lg flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaDownload />
                <span>Resume</span>
              </motion.a>
            </div>
          </div>
        </div>
      </motion.nav>
      <main className="pt-16 relative z-10">
        {children}
      </main>
      <motion.div
        className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"
        style={{ scaleX: scrollY / (document.documentElement.scrollHeight - window.innerHeight) }}
      />
    </div>
  )
}