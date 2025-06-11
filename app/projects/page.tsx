'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Github, ExternalLink, Code } from 'lucide-react'

interface Project {
  title: string
  description: string
  image: string
  technologies: string[]
  githubLink: string
  liveLink: string
}

const projects: Project[] = [
  {
    title: "EcoEarn",
    description: "A sustainable earning platform that rewards users for eco-friendly actions and environmental contributions. Features gamification, carbon footprint tracking, and green rewards system.",
    image: "/placeholder.svg?height=400&width=600",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    githubLink: "https://github.com/yourusername/ecoearn",
    liveLink: "https://ecoearn-pi.vercel.app/"
  },
  {
    title: "AI-powered Chatbot",
    description: "An intelligent chatbot using natural language processing to provide customer support and information.",
    image: "/placeholder.svg?height=400&width=600",
    technologies: ["Python", "TensorFlow", "Flask", "React"],
    githubLink: "https://github.com/yourusername/ai-chatbot",
    liveLink: "https://ai-chatbot-demo.com"
  },
  {
    title: "Fitness Tracking App",
    description: "A mobile app for tracking workouts, nutrition, and progress with personalized recommendations.",
    image: "/placeholder.svg?height=400&width=600",
    technologies: ["React Native", "Firebase", "Redux", "D3.js"],
    githubLink: "https://github.com/yourusername/fitness-tracker",
    liveLink: "https://fitness-tracker-demo.com"
  },
  {
    title: "Smart Home Dashboard",
    description: "A centralized dashboard for controlling and monitoring various smart home devices and systems.",
    image: "/placeholder.svg?height=400&width=600",
    technologies: ["Vue.js", "Node.js", "MQTT", "InfluxDB"],
    githubLink: "https://github.com/yourusername/smart-home-dashboard",
    liveLink: "https://smart-home-dashboard-demo.com"
  }
]

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">{project.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
          >
            <Github className="inline-block mr-1" size={20} />
            Code
          </a>
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
          >
            <ExternalLink className="inline-block mr-1" size={20} />
            Live Demo
          </a>
        </div>
      </div>
    </motion.div>
  )
}

const ProjectsShowcase: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
            My Projects
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500 dark:text-gray-300">
            Explore a collection of my latest work, showcasing a range of skills and technologies.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProjectsShowcase