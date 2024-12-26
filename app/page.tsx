'use client'

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useRef, useState, useEffect } from 'react'
import Card from '@/components/Card'
import { TextGenerateEffect } from '@/components/ui/text-generate-effect'
import { HyperText } from '@/components/ui/hyper-text'

const roles = ['Full Stack Developer', 'Data Scientist', 'DevOps Engineer']

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
}

const textVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
}

const cardVariants = {
  hidden: (custom: number) => ({
    opacity: 0,
    y: 20,
    transition: {
      delay: custom * 0.2
    }
  }),
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.2,
      duration: 0.5
    }
  }),
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.2
    }
  }
}

const backgroundVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const [currentRole, setCurrentRole] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <main ref={containerRef} className="relative">
      {/* Hero Section */}
      <section className="min-h-screen pt-16 flex flex-col justify-center relative overflow-hidden">
        {/* Background Elements */}
        <motion.div 
          className="absolute inset-0 z-0"
          variants={backgroundVariants}
          initial="hidden"
          animate="visible"
          style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '50%']) }}
        >
          <div className="absolute inset-0 grid-background opacity-30" />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-[#6C63FF]/5 via-transparent to-transparent"
            animate={{
              background: [
                'linear-gradient(to bottom right, rgba(108,99,255,0.05), transparent)',
                'linear-gradient(to bottom right, rgba(92,76,229,0.05), transparent)',
                'linear-gradient(to bottom right, rgba(108,99,255,0.05), transparent)'
              ]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: [0.15, 0.2, 0.15],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-20 right-20 w-[600px] h-[600px] bg-[#6C63FF] rounded-full blur-[160px]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: [0.1, 0.15, 0.1],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
            className="absolute -bottom-20 -left-20 w-[800px] h-[800px] bg-[#5C4CE5] rounded-full blur-[180px]"
          />
        </motion.div>

        {/* Main Content */}
        <div className="relative z-10 container mx-auto px-4 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full mx-auto pt-12"
          >
            {/* Hero Content */}
            <div className="mb-10">
              <motion.h1 
                variants={textVariants}
                className="text-6xl md:text-7xl font-bold mb-4 text-left tracking-tight"
              >
                Hey, I'm{' '}
                <HyperText 
                  className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#6C63FF] via-[#5C4CE5] to-[#6C63FF] bg-[length:200%_auto] animate-gradient"
                  duration={2000}
                  delay={300}
                  animateOnHover={true}
                  startOnView={true}
                >
                  VIPUL SHETTY
                </HyperText>
              </motion.h1>
            </div>

            <TextGenerateEffect
              words="Crafting scalable applications with modern technologies. Transforming data into insights. Building robust cloud infrastructure."
              className="text-sm text-white/70 max-w-2xl text-left leading-relaxed mb-8"
            />

            <motion.div 
              variants={textVariants}
              className="h-[40px] overflow-hidden text-left mb-8"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={roles[currentRole]}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -40, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-2xl font-medium bg-gradient-to-r from-white/90 to-white/60 bg-clip-text text-transparent"
                >
                  {roles[currentRole]}
                </motion.div>
              </AnimatePresence>
            </motion.div>

            <motion.p 
              variants={textVariants}
              className="text-xl text-white/70 max-w-2xl text-left leading-relaxed mb-20"
            >
            </motion.p>

            <motion.div 
              variants={textVariants}
              className="flex items-center gap-4 mb-10"
            >
              <Link 
                href="/projects"
                className="group relative px-6 py-3 rounded-lg overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#6C63FF] to-[#4c45cc] transition-transform duration-300 group-hover:scale-[1.05]" />
                <span className="relative z-10 text-white font-medium flex items-center gap-2">
                  View Projects
                  <motion.svg 
                    className="w-4 h-4"
                    initial={{ x: 0 }}
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </motion.svg>
                </span>
              </Link>
              <Link 
                href="/contact"
                className="group relative px-6 py-3 rounded-lg overflow-hidden"
              >
                <div className="absolute inset-0 border border-white/10 rounded-lg transition-colors duration-300 group-hover:border-white/20" />
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 text-white font-medium flex items-center gap-2">
                  Contact Me
                  <motion.svg 
                    className="w-4 h-4"
                    initial={{ x: 0 }}
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </motion.svg>
                </span>
              </Link>
            </motion.div>

            {/* Proficiency Areas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Full Stack',
                  description: 'Building scalable web applications with modern technologies.',
                  gradient: 'from-[#FF6B6B] to-[#FF8E8E]',
                  color: '#FF6B6B',
                  command: 'next create-app@latest',
                },
                {
                  title: 'Data Science',
                  description: 'Transforming data into actionable insights.',
                  gradient: 'from-[#4ECDC4] to-[#6EE7E7]',
                  color: '#4ECDC4',
                  command: 'pip install tensorflow',
                },
                {
                  title: 'DevOps',
                  description: 'Automating and optimizing development workflows.',
                  gradient: 'from-[#FFD93D] to-[#FFE869]',
                  color: '#FFD93D',
                  command: 'docker-compose up -d',
                }
              ].map((area, index) => (
                <motion.div
                  key={area.title}
                  variants={cardVariants}
                  custom={index}
                  className="relative group"
                >
                  <div
                    className="absolute inset-0 rounded-2xl transition-all duration-300 group-hover:blur-sm"
                    style={{
                      background: `linear-gradient(45deg, ${area.color}10, transparent)`,
                      border: `1px solid ${area.color}20`,
                      boxShadow: `0 0 30px ${area.color}20`
                    }}
                  />
                  <div className="relative h-full rounded-2xl border border-white/5 bg-black/20 backdrop-blur-sm p-6 overflow-hidden">
                    <div className="relative z-10 space-y-5">
                      <div className="flex flex-col space-y-2.5">
                        <h3 className={`text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${area.gradient}`}>
                          {area.title}
                        </h3>
                        <p className="text-sm text-white/60 leading-relaxed">
                          {area.description}
                        </p>
                      </div>
                      <Card command={area.command} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="absolute bottom-8 left-8 flex flex-col items-start"
            >
              <motion.span 
                className="text-sm text-white/50 mb-2"
                animate={{
                  opacity: [0.5, 1, 0.5],
                  y: [0, -5, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Scroll to explore
              </motion.span>
              <motion.div
                className="w-5 h-8 border-2 border-white/20 rounded-full relative"
                animate={{
                  boxShadow: [
                    "0 0 0px rgba(255,255,255,0.2)",
                    "0 0 20px rgba(255,255,255,0.2)",
                    "0 0 0px rgba(255,255,255,0.2)"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <motion.div
                  className="absolute top-1 left-1/2 w-1 h-1 bg-white/50 rounded-full -translate-x-1/2"
                  animate={{
                    y: [0, 20, 0],
                    opacity: [1, 0.5, 1]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

      </section>
    </main>
  )
}