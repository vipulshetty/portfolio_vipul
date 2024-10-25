'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useAnimation, useInView } from 'framer-motion'

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  color: string;
}

const experiences: Experience[] = [
  {
    title: 'Senior Software Engineer',
    company: 'Tech Innovators Inc.',
    period: '2020 - Present',
    description: 'Leading development of cutting-edge web applications using React and Node.js.',
    color: '#00ffff',
  },
  {
    title: 'Full Stack Developer',
    company: 'Digital Solutions Ltd.',
    period: '2018 - 2020',
    description: 'Developed and maintained complex web applications for various clients.',
    color: '#ff00ff',
  },
  {
    title: 'Junior Developer',
    company: 'StartUp Ventures',
    period: '2016 - 2018',
    description: 'Assisted in the development of mobile apps using React Native.',
    color: '#ffff00',
  },
  {
    title: 'B.S. in Computer Science',
    company: 'Tech University',
    period: '2012 - 2016',
    description: 'Graduated with honors, specializing in software engineering.',
    color: '#00ff00',
  },
]

interface ExperienceCardProps {
  experience: Experience;
  index: number;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, index }) => {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.2 } },
        hidden: { opacity: 0, y: 50 }
      }}
      className="bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700 hover:border-gray-600 transition-all duration-300"
    >
      <h3 className="text-2xl font-bold mb-2" style={{ color: experience.color }}>
        {experience.title}
      </h3>
      <p className="text-gray-300 mb-1">{experience.company}</p>
      <p className="text-gray-400 mb-4">{experience.period}</p>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-white bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
        aria-expanded={isExpanded}
      >
        {isExpanded ? 'Hide Details' : 'Show Details'}
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="text-gray-300 mt-4"
          >
            {experience.description}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function ExperiencePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-6xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
        >
          My Journey
        </motion.h1>
        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} index={index} />
          ))}
        </div>
      </div>
    </div>
  )
}