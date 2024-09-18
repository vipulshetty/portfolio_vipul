'use client'

import PageLayout from '../../components/PageLayout'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa'

const socials = [
  { name: 'GitHub', icon: FaGithub, link: 'https://github.com/yourusername' },
  { name: 'LinkedIn', icon: FaLinkedin, link: 'https://www.linkedin.com/in/yourusername' },
  { name: 'Twitter', icon: FaTwitter, link: 'https://twitter.com/yourusername' },
  { name: 'Email', icon: FaEnvelope, link: 'mailto:your.email@example.com' },
]

export default function SocialsPage() {
  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
        >
          Connect With Me
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {socials.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800 rounded-lg shadow-lg p-6 flex items-center justify-center space-x-4"
            >
              <social.icon className="text-4xl text-purple-500" />
              <span className="text-xl font-semibold text-white">{social.name}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </PageLayout>
  )
}