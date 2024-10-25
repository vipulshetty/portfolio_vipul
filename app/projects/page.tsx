'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { Sun, Moon, Volume2, VolumeX, ExternalLink, Github, Cpu, Globe, Shield, ChevronUp, Sparkles } from 'lucide-react'

interface Project {
  id: number
  title: string
  description: string
  image: string
  icon: JSX.Element
  color: string
  technologies: string[]
  githubUrl: string
  liveUrl: string
}

const projects: Project[] = [
  {
    id: 1,
    title: "Quantum AI Assistant",
    description: "Revolutionary AI powered by quantum computing, offering unparalleled problem-solving capabilities.",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80",
    icon: <Cpu className="w-12 h-12" />,
    color: "#6366f1",
    technologies: ["Quantum Computing", "TensorFlow", "Python"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com"
  },
  {
    id: 2,
    title: "Neuro-Virtual Reality",
    description: "Immersive VR experience that adapts to your thoughts and emotions in real-time.",
    image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=800&q=80",
    icon: <Globe className="w-12 h-12" />,
    color: "#ec4899",
    technologies: ["Unity", "NeuroSky EEG", "C#"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com"
  },
  {
    id: 3,
    title: "Cybersecurity Nexus",
    description: "AI-driven cybersecurity platform that predicts and neutralizes threats before they occur.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
    icon: <Shield className="w-12 h-12" />,
    color: "#10b981",
    technologies: ["Rust", "TensorFlow", "Blockchain"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com"
  }
]

const useAudio = (url: string) => {
  const [audio] = useState(new Audio(url))
  const [playing, setPlaying] = useState(false)

  const toggle = () => setPlaying(!playing)

  useEffect(() => {
    playing ? audio.play() : audio.pause()
  }, [playing, audio])

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false))
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false))
    }
  }, [audio])

  return [playing, toggle, () => audio.play()] as const
}

const AnimatedBackground = ({ darkMode }: { darkMode: boolean }) => {
  return (
    <div className="fixed inset-0 z-0">
      <div className={`absolute inset-0 transition-colors duration-500 ${darkMode ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800' : 'bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500'}`} />
      {[...Array(200)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${darkMode ? 'bg-white' : 'bg-blue-600'}`}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

const ColorTheme = {
  light: {
    background: "rgba(239, 246, 255, 0.8)",
    text: "#1e293b",
    card: "rgba(255, 255, 255, 0.8)",
    hover: "rgba(59, 130, 246, 0.2)",
  },
  dark: {
    background: "rgba(15, 23, 42, 0.8)",
    text: "#f8fafc",
    card: "rgba(30, 41, 59, 0.8)",
    hover: "rgba(56, 189, 248, 0.2)",
  },
}

export default function EnchantedProjectShowcase() {
  const [darkMode, setDarkMode] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const controls = useAnimation()
  const containerRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorGlowRef = useRef<HTMLDivElement>(null)

  const [, , playHoverSound] = useAudio('/hover.mp3')
  const [, , playClickSound] = useAudio('/click.mp3')

  const theme = darkMode ? ColorTheme.dark : ColorTheme.light

  useEffect(() => {
    controls.start((i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 },
    }))
  }, [controls])

  const handleScroll = () => {
    if (containerRef.current) {
      // Handle scroll logic if needed
    }
  }

  const playSound = (sound: () => void) => {
    if (soundEnabled) {
      sound()
    }
  }

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current && cursorGlowRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
        cursorGlowRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      }
    }

    window.addEventListener('mousemove', moveCursor)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
    }
  }, [])

  return (
    <motion.div 
      className="min-h-screen overflow-hidden cursor-none perspective-1000"
      style={{ backgroundColor: theme.background, color: theme.text }}
      animate={{ backgroundColor: theme.background, color: theme.text }}
      transition={{ duration: 0.5 }}
    >
      <AnimatedBackground darkMode={darkMode} />
      <div 
        ref={cursorRef} 
        className="fixed w-6 h-6 rounded-full border-2 pointer-events-none z-50 mix-blend-difference"
        style={{ borderColor: theme.text,   transition: 'width 0.3s, height 0.3s, border-radius 0.3s' }}
      />
      <div 
        ref={cursorGlowRef} 
        className="fixed w-24 h-24 rounded-full pointer-events-none z-40 opacity-20 blur-xl"
        style={{ backgroundColor: activeProject?.color || theme.text }}
      />
      <motion.div 
        className="fixed top-4 right-4 z-40 flex space-x-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 rounded-full ${darkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-800 text-yellow-400'}`}
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
        >
          {darkMode ? <Sun /> : <Moon />}
        </motion.button>
        <motion.button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className={`p-2 rounded-full ${soundEnabled ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {soundEnabled ? <Volume2 /> : <VolumeX />}
        </motion.button>
      </motion.div>
      <div 
        ref={containerRef} 
        className="h-screen overflow-y-scroll custom-scrollbar" 
        onScroll={handleScroll}
      >
        <motion.div 
          className="container mx-auto px-4 py-16 relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="text-7xl md:text-9xl font-extrabold text-center mb-16 relative z-10"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
              Futuristic Innovations
            </span>
            <motion.span
              className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
            >
              <Sparkles className="w-12 h-12 text-yellow-400" />
            </motion.span>
          </motion.h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="relative perspective"
                initial={{ opacity: 0, y: 50 }}
                animate={controls}
                custom={index}
                onHoverStart={() => {
                  setActiveProject(project)
                  playSound(playHoverSound)
                  if (cursorRef.current) {
                    cursorRef.current.style.width = '60px'
                    cursorRef.current.style.height = '60px'
                    cursorRef.current.style.borderRadius = '30%'
                  }
                }}
                onHoverEnd={() => {
                  setActiveProject(null)
                  if (cursorRef.current) {
                    cursorRef.current.style.width = '24px'
                    cursorRef.current.style.height = '24px'
                    cursorRef.current.style.borderRadius = '50%'
                  }
                }}
                onClick={() => playSound(playClickSound)}
              >
                <motion.div
                  className="w-full h-[450px] rounded-2xl shadow-2xl transition-all duration-500 preserve-3d"
                  style={{ backgroundColor: theme.card }}
                  whileHover={{
                    rotateY: 180,
                    scale: 1.05,
                    boxShadow: `0 25px 50px -12px ${project.color}66`,
                  }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden">
                    <img src={project.image} alt={project.title} className="w-full h-56 object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <motion.h2 
                        className="text-3xl font-bold mb-2 text-white"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        {project.title}
                      </motion.h2>
                      <motion.p 
                        className="text-gray-200 mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        {project.description}
                      </motion.p>
                      <motion.div 
                        className="flex flex-wrap gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        {project.technologies.map((tech, index) => (
                          <motion.span 
                            key={index} 
                            className="px-3 py-1 rounded-full text-sm font-medium text-white"
                            style={{ backgroundColor: project.color }}
                            whileHover={{ scale: 1.1, boxShadow: `0 0 10px ${project.color}` }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </motion.div>
                    </div>
                  </div>
                  <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl overflow-hidden">
                    <div className="w-full h-full flex flex-col justify-center items-center p-6" style={{ backgroundColor: theme.card }}>
                      <motion.div 
                        className="mb-6"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      >
                        {project.icon}
                      </motion.div>
                      <h3 className="text-3xl font-bold mb-4" style={{ color: project.color }}>{project.title}</h3>
                      <p className="text-center mb-6" style={{ color: theme.text }}>
                        Dive deeper into the {project.title} project. Explore the code or see it in action!
                      </p>
                      <div className="flex space-x-4">
                        <motion.a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center px-4 py-2 rounded-full"
                          style={{ backgroundColor: theme.text, color: theme.card }}
                          whileHover={{ scale: 1.05, boxShadow: `0 0 15px ${project.color}` }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Github className="w-5 h-5 mr-2" />
                          <span>GitHub</span>
                        </motion.a>
                        <motion.a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center px-4 py-2 rounded-full"
                          style={{ backgroundColor: project.color, color: 'white' }}
                          whileHover={{ scale: 1.05, boxShadow: `0 0 15px ${project.color}` }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ExternalLink className="w-5 h-5 mr-2" />
                          <span>Live Demo</span>
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <motion.div
        className="fixed bottom-8 right-8 z-40"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.button
          className="p-3 rounded-full bg-white text-gray-900 shadow-lg"
          whileHover={{ scale: 1.1, rotate: 360, boxShadow: "0 0 15px rgba(255, 255, 255, 0.5)" }}
          whileTap={{ scale: 0.9 }}
          onClick={() => containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <ChevronUp className="w-6 h-6" />
        </motion.button>
      </motion.div>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap');

        body {
          font-family: 'Orbitron', sans-serif;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: ${theme.background};
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${activeProject?.color || theme.text};
          border-radius: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${activeProject?.color ? activeProject.color + 'cc' : theme.text + 'cc'};
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        .backface-hidden {
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </motion.div>
  )
}