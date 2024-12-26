'use client'

import { VortexDemo } from '@/components/VortexDemo';
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formState)
  }

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/yourusername',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/yourusername',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/yourusername',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      )
    }
  ]

  return (
    <main className="min-h-screen pt-32 pb-24">
      <VortexDemo />
      {/* Background Elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 grid-background opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#6C63FF]/5 via-transparent to-transparent" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 1 }}
          className="absolute top-20 right-20 w-[600px] h-[600px] bg-[#6C63FF] rounded-full blur-[160px]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute -bottom-20 -left-20 w-[800px] h-[800px] bg-[#5C4CE5] rounded-full blur-[180px]"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-20"
          >
            <h1 className="text-6xl md:text-7xl font-bold mb-8">
              Let's <span className="gradient-heading">Connect</span>
            </h1>
            <p className="text-xl text-white/60 leading-relaxed">
              Have a project in mind or just want to chat? 
              I'd love to hear from you. Let's create something amazing together.
            </p>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="railway-card p-8 mb-16 relative overflow-hidden group"
          >
            <div className="relative z-10 space-y-6">
              {/* Name Input */}
              <div>
                <label 
                  htmlFor="name" 
                  className="block text-sm font-medium text-white/80 mb-2"
                >
                  Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white/80 focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/50 transition-all duration-300"
                    placeholder="Your name"
                  />
                  {focusedField === 'name' && (
                    <motion.div
                      layoutId="input-focus"
                      className="absolute inset-0 border-2 border-[#6C63FF] rounded-lg pointer-events-none"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label 
                  htmlFor="email" 
                  className="block text-sm font-medium text-white/80 mb-2"
                >
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white/80 focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/50 transition-all duration-300"
                    placeholder="your@email.com"
                  />
                  {focusedField === 'email' && (
                    <motion.div
                      layoutId="input-focus"
                      className="absolute inset-0 border-2 border-[#6C63FF] rounded-lg pointer-events-none"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </div>
              </div>

              {/* Message Input */}
              <div>
                <label 
                  htmlFor="message" 
                  className="block text-sm font-medium text-white/80 mb-2"
                >
                  Message
                </label>
                <div className="relative">
                  <textarea
                    id="message"
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    rows={6}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white/80 focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/50 transition-all duration-300"
                    placeholder="Your message..."
                  />
                  {focusedField === 'message' && (
                    <motion.div
                      layoutId="input-focus"
                      className="absolute inset-0 border-2 border-[#6C63FF] rounded-lg pointer-events-none"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="railway-button group bg-[#6C63FF] hover:bg-[#5C4CE5] border-transparent w-full"
              >
                Send Message
                <svg 
                  className="w-5 h-5 ml-2 transform transition-transform group-hover:translate-x-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M13 7l5 5m0 0l-5 5m5-5H6" 
                  />
                </svg>
              </button>
            </div>

            {/* Form Card Effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#6C63FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.5, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute -bottom-20 -right-20 w-40 h-40 bg-[#6C63FF] rounded-full blur-[100px] opacity-0 group-hover:opacity-50 transition-opacity duration-300"
            />
          </motion.form>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold mb-8">Or connect with me on</h2>
            <div className="flex justify-center space-x-6">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
                  className="railway-button group"
                >
                  {link.icon}
                  <span className="ml-2">{link.name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
