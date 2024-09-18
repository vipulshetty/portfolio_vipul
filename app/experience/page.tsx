'use client'

import PageLayout from '../../components/PageLayout'
import { motion } from 'framer-motion'
import { FaBriefcase, FaGraduationCap } from 'react-icons/fa'

const experiences = [
  {
    title: 'Senior Software Engineer',
    company: 'Tech Innovators Inc.',
    period: '2020 - Present',
    description: 'Leading development of cutting-edge web applications using React and Node.js.',
    icon: FaBriefcase,
  },
  {
    title: 'Full Stack Developer',
    company: 'Digital Solutions Ltd.',
    period: '2018 - 2020',
    description: 'Developed and maintained complex web applications for various clients.',
    icon: FaBriefcase,
  },
  {
    title: 'Junior Developer',
    company: 'StartUp Ventures',
    period: '2016 - 2018',
    description: 'Assisted in the development of mobile apps using React Native.',
    icon: FaBriefcase,
  },
  {
    title: 'B.S. in Computer Science',
    company: 'Tech University',
    period: '2012 - 2016',
    description: 'Graduated with honors, specializing in software engineering.',
    icon: FaGraduationCap,
  },
]

const ExperienceCard = ({ experience, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    className="flex items-start space-x-4 mb-8"
  >
    <div className="flex-shrink-0">
      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
        <experience.icon className="text-white text-2xl" />
      </div>
    </div>
    <div className="flex-grow">
      <h3 className="text-xl font-bold text-white">{experience.title}</h3>
      <p className="text-blue-400">{experience.company}</p>
      <p className="text-gray-400">{experience.period}</p>
      <p className="text-gray-300 mt-2">{experience.description}</p>
    </div>
  </motion.div>
)

export default function ExperiencePage() {
  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
        >
          My Professional Journey
        </motion.h1>
        <div className="space-y-12">
          {experiences.map((experience, index) => (
            <ExperienceCard key={experience.title} experience={experience} index={index} />
          ))}
        </div>
      </div>
    </PageLayout>
  )
}