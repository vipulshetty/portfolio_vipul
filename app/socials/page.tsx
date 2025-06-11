'use client';

import { motion } from 'framer-motion';
import { Vortex } from '@/components/ui/vortex';

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/vipulshetty',
    color: '#6e5494',
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/vipul-shetty-49a1a9251/',
    color: '#0077b5',
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'Email',
    url: 'mailto:vipulshetty918@gmail.com',
    color: '#EA4335',
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
  },
];

export default function SocialsPage() {
  return (
    <main className="min-h-screen">
      <Vortex
        backgroundColor="black"
        className="flex items-center flex-col justify-center w-full min-h-screen"
        baseHue={220}
        baseSpeed={0.5}
        rangeSpeed={1}
        particleCount={500}
      >
        <div className="text-center px-4">
          <motion.h2 
            className="text-white text-4xl md:text-6xl font-bold mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Let&apos;s Connect
          </motion.h2>
          <motion.p 
            className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Find me on various platforms and let&apos;s create something amazing together.
          </motion.p>
          <motion.div 
            className="flex items-center justify-center gap-8 md:gap-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Connect with me on ${link.name}`}
                className="group relative p-4 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                style={{
                  background: `radial-gradient(circle at center, ${link.color}20 0%, transparent 70%)`,
                }}
              >
                <div 
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  style={{ 
                    background: `radial-gradient(circle at center, ${link.color} 0%, transparent 70%)`,
                    filter: 'blur(10px)',
                  }}
                />
                <div 
                  className="relative text-white/90 group-hover:text-white transition-colors duration-300"
                  style={{
                    filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))',
                  }}
                >
                  {link.icon}
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </Vortex>
    </main>
  );
}