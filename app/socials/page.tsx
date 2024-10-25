'use client'

import { useRef, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa'

const socials = [
  { name: 'GitHub', icon: FaGithub, link: 'https://github.com/yourusername', color: '#6e5494' },
  { name: 'LinkedIn', icon: FaLinkedin, link: 'https://www.linkedin.com/in/yourusername', color: '#0077b5' },
  { name: 'Twitter', icon: FaTwitter, link: 'https://twitter.com/yourusername', color: '#1da1f2' },
  { name: 'Email', icon: FaEnvelope, link: 'mailto:your.email@example.com', color: '#ea4335' },
]

const SocialCard = ({ social, index }) => {
  const cardRef = useRef(null)
  const controls = useAnimation()

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 })
  }, [controls])

  const handleMouseMove = (event) => {
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const rotateX = (event.clientY - centerY) / 10
    const rotateY = (centerX - event.clientX) / 10

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }

  const handleMouseLeave = () => {
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
  }

  return (
    <motion.div
      ref={cardRef}
      className="relative w-full"
      style={{ perspective: 1000 }}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="w-full h-32 rounded-2xl bg-gradient-to-br from-gray-900 to-black shadow-lg overflow-hidden p-4 relative"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="text-5xl"
            initial={{ opacity: 0.5, scale: 0.5 }}
            whileHover={{ opacity: 1, scale: 1.2, rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <social.icon style={{ color: social.color }} />
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-center">
          <span className="text-lg font-bold text-white">{social.name}</span>
          <motion.a
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 bg-white bg-opacity-10 rounded-full text-sm font-medium text-white hover:bg-opacity-20 transition-all duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Connect
          </motion.a>
        </div>
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${social.color}33 0%, transparent 50%)`,
            opacity: 0,
          }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  )
}

const BackgroundAnimation = () => (
  <div className="fixed inset-0 z-0">
    {[...Array(100)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute bg-white rounded-full opacity-20"
        initial={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          scale: 0,
        }}
        animate={{
          scale: [0, 1, 1, 0],
          opacity: [0, 0.2, 0.2, 0],
        }}
        transition={{
          duration: Math.random() * 4 + 2,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
          delay: Math.random() * 2,
        }}
        style={{
          width: `${Math.random() * 3 + 1}px`,
          height: `${Math.random() * 3 + 1}px`,
        }}
      />
    ))}
  </div>
)

export default function EnhancedSocialsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black overflow-hidden relative">
      <BackgroundAnimation />
      <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
        >
          Let&apos;s Connect
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center text-gray-400 mb-12 max-w-2xl mx-auto"
        >
          <p>Explore my digital presence and get in touch. I&apos;m always excited to connect and collaborate!</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {socials.map((social, index) => (
            <SocialCard key={social.name} social={social} index={index} />
          ))}
        </div>
      </div>
    </div>
  )
}