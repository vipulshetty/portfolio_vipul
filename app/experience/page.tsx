'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useAnimation, useInView } from 'framer-motion'

const experiences = [
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

const ExperienceCard = ({ experience, index }) => {
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
      className="bg-white rounded-lg p-6 mb-8 shadow-md"
    >
      <h3 className="text-2xl font-bold mb-2" style={{ color: experience.color }}>
        {experience.title}
      </h3>
      <p className="text-gray-700 mb-1">{experience.company}</p>
      <p className="text-gray-600 mb-4">{experience.period}</p>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
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
            className="text-gray-700 mt-4"
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
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-6xl font-bold text-center mb-16 text-gray-800"
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