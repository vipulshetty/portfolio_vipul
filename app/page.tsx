'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaCode, FaDatabase, FaChartBar, FaCubes, FaRocket, FaMagic, FaScroll, FaGem, FaDragon } from 'react-icons/fa'

const roles = [
  { title: 'Full-Stack Developer', icon: FaCode, color: '#61DAFB' },
  { title: 'Database Architect', icon: FaDatabase, color: '#339933' },
  { title: 'Data Scientist', icon: FaChartBar, color: '#F7DF1E' },
  { title: 'Cloud Engineer', icon: FaCubes, color: '#764ABC' },
  { title: 'DevOps Specialist', icon: FaRocket, color: '#FF6B6B' },
]

interface TypewriterEffectProps {
  text: string;
  delay?: number;
}

function TypewriterEffect({ text, delay = 50 }: TypewriterEffectProps) {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText((prevText) => prevText + text[currentIndex])
        setCurrentIndex((prevIndex) => prevIndex + 1)
      }, delay)

      return () => clearTimeout(timer)
    }
  }, [currentIndex, delay, text])

  return <span>{displayText}</span>
}

interface NavigationButtonProps {
  href: string;
  text: string;
  icon: React.ElementType;
  color: string;
}

function NavigationButton({ href, text, icon: Icon, color }: NavigationButtonProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotateY: 15 }}
      whileTap={{ scale: 0.95 }}
      className="relative group perspective"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
      <a
        href={href}
        className="relative block px-8 py-6 rounded-xl font-bold text-lg shadow-2xl flex items-center justify-center space-x-3 bg-black border border-gray-800 group-hover:border-gray-700 transition duration-200"
      >
        <Icon className="text-3xl" style={{ color }} />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">{text}</span>
      </a>
    </motion.div>
  )
}

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
    }> = []
    const particleCount = 100

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: Math.random() * 3 - 1.5,
        speedY: Math.random() * 3 - 1.5
      })
    }

    function drawParticles() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
      particles.forEach((particle) => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        particle.x += particle.speedX
        particle.y += particle.speedY

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1
      })
      requestAnimationFrame(drawParticles)
    }

    drawParticles()

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
}

export default function Home() {
  const [currentRole, setCurrentRole] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-black text-white">
      <ParticleField />
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20"></div>
      <header className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-6xl sm:text-8xl font-extrabold mb-6 relative"
          >
            <span className="inline-block animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">
              <TypewriterEffect text="Welcome to My Portfolio" delay={100} />
            </span>
          </motion.h1>
          <motion.h2 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
            className="text-5xl sm:text-7xl font-bold mb-8 relative inline-block"
          >
            <span className="animate-subtle-glow">
              I'm Vipul Shetty
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Passionate about crafting innovative solutions and pushing the boundaries of technology. 
            With expertise in full-stack development, data science, and cloud engineering, 
            I bring a versatile skill set to tackle complex challenges in the digital landscape.
          </motion.p>
        </div>
      </header>
      <main className="relative z-10 flex-grow flex items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="backdrop-blur-xl bg-white/5 p-8 sm:p-12 rounded-3xl shadow-2xl border border-gray-800"
          >
            <div className="text-3xl sm:text-4xl font-semibold mb-12 flex flex-col items-center justify-center">
              <span className="text-gray-400 mb-4">Specialized in</span>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentRole}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center space-x-4"
                >
                  {React.createElement(roles[currentRole].icon, { 
                    className: "text-6xl",
                    style: { color: roles[currentRole].color } 
                  })}
                  <span className="font-bold animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">
                    {roles[currentRole].title}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { href: '/skills', text: 'Expertise', icon: FaScroll, color: '#61DAFB' },
                { href: '/projects', text: 'Portfolio', icon: FaGem, color: '#CC6699' },
                { href: '/experience', text: 'Journey', icon: FaDragon, color: '#F7DF1E' },
                { href: '/socials', text: 'Connect', icon: FaMagic, color: '#47A248' },
              ].map((item) => (
                <NavigationButton key={item.href} {...item} />
              ))}
            </div>
          </motion.div>
        </div>
      </main>
      <style jsx global>{`
        @keyframes textclip {
          to {
            background-position: 200% center;
          }
        }
        .animate-text {
          animation: textclip 3s linear infinite;
          background-size: 200% auto;
        }
        @keyframes subtle-glow {
          0%, 100% { text-shadow: 0 0 5px rgba(255, 255, 255, 0.1), 0 0 10px rgba(255, 255, 255, 0.1); }
          50% { text-shadow: 0 0 10px rgba(255, 255, 255, 0.2), 0 0 20px rgba(255, 255, 255, 0.2); }
        }
        .animate-subtle-glow {
          animation: subtle-glow 5s ease-in-out infinite;
        }
        @keyframes tilt {
          0%, 50%, 100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(1deg);
          }
          75% {
            transform: rotate(-1deg);
          }
        }
        .animate-tilt {
          animation: tilt 10s infinite linear;
        }
      `}</style>
    </div>
  )
}