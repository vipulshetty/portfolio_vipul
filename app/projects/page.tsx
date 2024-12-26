"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import { LampDemo } from "@/components/ui/lamp";
import Image from 'next/image';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const projects = [
  {
    title: 'EcoEarn',
    description: 'AI-powered waste management platform with blockchain-based rewards system, revolutionizing recycling incentives.',
    image: '/ecoEarn.jpg',
    category: 'Full Stack',
    tech: ['AI/ML', 'Blockchain', 'React', 'Node.js', 'Python'],
    github: 'https://github.com/vipulshetty/EcoEarn',
    demo: 'https://github.com/vipulshetty/EcoEarn',
    highlights: [
      'Boosted waste identification accuracy by 35% using ML models',
      'Implemented blockchain-based reward system',
      'Reduced collection costs by 20% with AI route optimization'
    ]
  },
  {
    title: 'CollabAI',
    description: 'WebRTC-based collaboration platform with AI-driven features for enhanced team productivity.',
    image: '/collabai.jpg',
    category: 'Full Stack',
    tech: ['WebRTC', 'AI', 'React', 'Node.js', 'MongoDB'],
    github: 'https://github.com/vipulshetty/CollabAI',
    demo: 'https://collabai-frontend.vercel.app/',
    highlights: [
      'Real-time video, audio, and chat functionality',
      'AI-driven transcription and task extraction',
      'Increased team productivity by 25%',
      'GDPR-compliant encryption'
    ]
  }
];

const categories = ['All', 'Full Stack'];

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const filteredProjects = projects.filter(project => 
    selectedCategory === 'All' || project.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="relative z-10">
        <LampDemo>
          <div className="text-center mb-16">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              My Projects
            </motion.h1>
            <motion.p 
              className="text-gray-400 max-w-2xl mx-auto text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Explore my latest work and side projects
            </motion.p>
          </div>
        </LampDemo>
      </div>

      <div className="relative z-20 container mx-auto px-4 py-16">
        {/* Category Filter */}
        <motion.div 
          className="flex justify-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {categories.map(category => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`mx-2 px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 
                ${selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25'
                  : 'bg-white/5 text-white hover:bg-white/10'
                } backdrop-blur-sm border border-white/10 hover:border-white/20`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="group relative bg-gradient-to-br from-white/[0.08] to-transparent backdrop-blur-xl rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500"
            >
              {/* Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Content Container */}
              <div className="relative p-8">
                {/* Project Image */}
                <div className="relative w-full h-72 mb-8 rounded-xl overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Floating Tech Stack on Image */}
                  <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
                    {project.tech.map(tech => (
                      <motion.span
                        key={tech}
                        className="px-3 py-1 text-sm bg-white/10 backdrop-blur-md rounded-full text-white border border-white/20"
                        whileHover={{ scale: 1.05 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Project Header */}
                <motion.h3 
                  className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {project.title}
                </motion.h3>

                {/* Project Description */}
                <p className="text-gray-300 text-lg mb-6 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                  {project.description}
                </p>

                {/* Highlights */}
                <div className="mb-8 space-y-3">
                  <h4 className="text-white font-semibold text-lg flex items-center gap-2">
                    <span className="h-px flex-1 bg-gradient-to-r from-blue-500/50 to-transparent"></span>
                    Key Highlights
                    <span className="h-px flex-1 bg-gradient-to-l from-blue-500/50 to-transparent"></span>
                  </h4>
                  <ul className="space-y-2">
                    {project.highlights.map((highlight, idx) => (
                      <motion.li
                        key={idx}
                        className="flex items-start space-x-3 text-gray-300"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.1 }}
                      >
                        <span className="text-purple-500 text-lg">•</span>
                        <span>{highlight}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-white/[0.08] rounded-xl text-white hover:bg-white/[0.12] transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 border border-white/10 hover:border-white/20"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaGithub className="text-xl" />
                    <span>GitHub</span>
                  </motion.a>
                  <motion.a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white hover:opacity-90 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaExternalLinkAlt />
                    <span>Live Demo</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}