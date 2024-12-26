'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter, usePathname } from 'next/navigation'

interface PageLayoutProps {
  children: React.ReactNode
}

const pages = ['/', '/skills', '/projects', '/experience', '/socials']

const pageVariants = {
  initial: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? '5%' : '-5%',
    scale: 0.98
  }),
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1]
    }
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? '-5%' : '5%',
    scale: 0.98,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1]
    }
  })
}

const backgroundVariants = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

export default function PageLayout({ children }: PageLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const currentPageIndex = pages.indexOf(pathname)
  const [direction, setDirection] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const pageRef = useRef<HTMLDivElement>(null)
  const wheelTimeout = useRef<NodeJS.Timeout>()
  const transitionLock = useRef(false)

  const navigateToPage = (newIndex: number, newDirection: number) => {
    if (transitionLock.current || newIndex < 0 || newIndex >= pages.length) return
    
    transitionLock.current = true
    setIsTransitioning(true)
    setDirection(newDirection)
    
    router.push(pages[newIndex])
    
    setTimeout(() => {
      setIsTransitioning(false)
      if (pageRef.current) {
        pageRef.current.scrollTop = 0
      }
      setTimeout(() => {
        transitionLock.current = false
      }, 100)
    }, 400)
  }

  useEffect(() => {
    let lastScrollTime = Date.now()
    let touchStartY = 0
    let touchEndY = 0

    const handleWheel = (e: WheelEvent) => {
      if (transitionLock.current) return
      
      const now = Date.now()
      if (now - lastScrollTime < 50) return
      lastScrollTime = now

      if (!pageRef.current) return

      const delta = e.deltaY
      const { scrollTop, scrollHeight, clientHeight } = pageRef.current
      const isScrollable = scrollHeight > clientHeight
      const isAtPageBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 10
      const isAtPageTop = scrollTop === 0

      // If the page is scrollable and we're not at the boundaries, let it scroll normally
      if (isScrollable && !isAtPageBottom && !isAtPageTop) {
        return
      }

      // If we're at the boundaries, prevent default and handle page transition
      if (Math.abs(delta) > 50) {
        if (delta > 0 && isAtPageBottom && currentPageIndex < pages.length - 1) {
          e.preventDefault()
          navigateToPage(currentPageIndex + 1, 1)
        } else if (delta < 0 && isAtPageTop && currentPageIndex > 0) {
          e.preventDefault()
          navigateToPage(currentPageIndex - 1, -1)
        }
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (transitionLock.current) return
      touchEndY = e.touches[0].clientY

      if (!pageRef.current) return

      const { scrollTop, scrollHeight, clientHeight } = pageRef.current
      const isScrollable = scrollHeight > clientHeight
      const isAtPageBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 10
      const isAtPageTop = scrollTop === 0

      // If we're not at boundaries, let it scroll normally
      if (isScrollable && !isAtPageBottom && !isAtPageTop) {
        return
      }

      // Prevent default only at boundaries
      if (isAtPageBottom || isAtPageTop) {
        e.preventDefault()
      }
    }

    const handleTouchEnd = () => {
      if (transitionLock.current) return
      
      const touchDelta = touchStartY - touchEndY
      
      if (!pageRef.current) return

      const { scrollTop, scrollHeight, clientHeight } = pageRef.current
      const isAtPageBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 10
      const isAtPageTop = scrollTop === 0
      
      if (Math.abs(touchDelta) > 50) {
        if (touchDelta > 0 && isAtPageBottom && currentPageIndex < pages.length - 1) {
          navigateToPage(currentPageIndex + 1, 1)
        } else if (touchDelta < 0 && isAtPageTop && currentPageIndex > 0) {
          navigateToPage(currentPageIndex - 1, -1)
        }
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (transitionLock.current) return
      
      if (!pageRef.current) return

      const { scrollTop, scrollHeight, clientHeight } = pageRef.current
      const isAtPageBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 10
      const isAtPageTop = scrollTop === 0
      
      if (e.key === 'ArrowDown' && isAtPageBottom && currentPageIndex < pages.length - 1) {
        navigateToPage(currentPageIndex + 1, 1)
      } else if (e.key === 'ArrowUp' && isAtPageTop && currentPageIndex > 0) {
        navigateToPage(currentPageIndex - 1, -1)
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: false })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('touchend', handleTouchEnd)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('keydown', handleKeyDown)
      if (wheelTimeout.current) {
        clearTimeout(wheelTimeout.current)
      }
    }
  }, [currentPageIndex])

  return (
    <div className="fixed inset-0 bg-background overflow-hidden">
      {/* Background Grid with Gradient */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div
          key={pathname + '-bg'}
          variants={backgroundVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute inset-0"
        >
          <div className="absolute inset-0 grid-background opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        </motion.div>
      </div>
      
      {/* Main Content */}
      <div 
        ref={contentRef}
        className="relative z-10 h-full"
      >
        <AnimatePresence
          mode="wait"
          initial={false}
          custom={direction}
        >
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
              ref={pageRef}
              className="h-full overflow-y-auto overflow-x-hidden scroll-smooth"
            >
              {children}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Indicators */}
        <div className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3">
          {pages.map((page, index) => (
            <button
              key={page}
              onClick={() => navigateToPage(index, index > currentPageIndex ? 1 : -1)}
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
    </div>
  )
}