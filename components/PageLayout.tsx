'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

interface PageLayoutProps {
  children: React.ReactNode
}

const pages = ['/', '/skills', '/projects', '/experience', '/socials']

const pageVariants = {
  initial: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
  }),
  animate: {
    x: 0,
    transition: {
      duration: 0.4,
      ease: 'easeInOut',
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? '-100%' : '100%',
    transition: {
      duration: 0.4,
      ease: 'easeInOut',
    },
  }),
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen w-full">
      {children}
    </div>
  )
}