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
    opacity: 0
  }),
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    }
  },
  exit: (direction: number) => ({
    x: direction > 0 ? '-100%' : '100%',
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: 'easeIn'
    }
  })
}

export default function PageLayout({ children }: PageLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const currentPageIndex = pages.indexOf(pathname)
  const [direction, setDirection] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [lastWheelTime, setLastWheelTime] = useState(0)
  const [wheelDirection, setWheelDirection] = useState(0)
  const wheelCount = useRef(0)
  const touchStart = useRef(0)
  const touchEnd = useRef(0)
  const contentRef = useRef<HTMLDivElement>(null)

  const isAtBottom = () => {
    const content = contentRef.current
    if (!content) return false
    const threshold = 1 // Tolerance for rounding errors
    return Math.abs(content.scrollHeight - content.clientHeight - content.scrollTop) <= threshold
  }

  const isAtTop = () => {
    const content = contentRef.current
    if (!content) return false
    return content.scrollTop <= 0
  }

  const handleNavigation = (newIndex: number) => {
    if (isTransitioning || newIndex < 0 || newIndex >= pages.length) return
    setDirection(newIndex > currentPageIndex ? 1 : -1)
    setIsTransitioning(true)
    router.push(pages[newIndex])
    setTimeout(() => {
      setIsTransitioning(false)
      wheelCount.current = 0
    }, 800)
  }

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isTransitioning) return

      const content = contentRef.current
      if (!content) return

      const now = Date.now()
      const timeDiff = now - lastWheelTime
      const currentDirection = Math.sign(e.deltaY)

      // Allow normal scrolling if not at edges
      if (!(isAtTop() && currentDirection < 0) && !(isAtBottom() && currentDirection > 0)) {
        return
      }

      e.preventDefault()

      // Reset wheel count if direction changed or too much time passed
      if (currentDirection !== wheelDirection || timeDiff > 200) {
        wheelCount.current = 0
      }

      wheelCount.current += Math.abs(e.deltaY)
      setWheelDirection(currentDirection)
      setLastWheelTime(now)

      // Only trigger navigation after accumulated enough wheel events in same direction
      if (wheelCount.current > 100) {
        if (currentDirection > 0 && isAtBottom() && currentPageIndex < pages.length - 1) {
          handleNavigation(currentPageIndex + 1)
        } else if (currentDirection < 0 && isAtTop() && currentPageIndex > 0) {
          handleNavigation(currentPageIndex - 1)
        }
        wheelCount.current = 0
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      touchStart.current = e.touches[0].clientY
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (isTransitioning) return
      
      const content = contentRef.current
      if (!content) return

      touchEnd.current = e.touches[0].clientY
      const distance = touchStart.current - touchEnd.current
      const minSwipeDistance = 50 // minimum distance for swipe

      // Only handle page transitions at content boundaries
      if (Math.abs(distance) > minSwipeDistance) {
        if (distance > 0 && isAtBottom() && currentPageIndex < pages.length - 1) {
          handleNavigation(currentPageIndex + 1)
        } else if (distance < 0 && isAtTop() && currentPageIndex > 0) {
          handleNavigation(currentPageIndex - 1)
        }
        touchStart.current = touchEnd.current
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [currentPageIndex, isTransitioning, lastWheelTime, wheelDirection])

  return (
    <div className="fixed inset-0 bg-background">
      <AnimatePresence mode="wait" initial={false} custom={direction}>
        <motion.div
          key={pathname}
          custom={direction}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="h-full"
        >
          <div 
            ref={contentRef}
            className="h-full overflow-y-auto overflow-x-hidden"
            style={{
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {children}
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Page Indicators */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-50">
        {pages.map((page, index) => (
          <button
            key={page}
            onClick={() => handleNavigation(index)}
            className={`w-2 h-2 rounded-full transition-all duration-500 ${
              index === currentPageIndex 
                ? 'bg-primary h-6' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
            disabled={isTransitioning}
          />
        ))}
      </div>
    </div>
  )
}