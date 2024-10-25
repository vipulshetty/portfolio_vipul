"use client"

import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence, useAnimation, useInView } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, OrbitControls, Stars, Text } from '@react-three/drei'
import * as THREE from 'three'

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

const Atom = ({ position, color, title }) => {
  const mesh = useRef()
  const [hovered, setHover] = useState(false)

  useFrame((state, delta) => {
    mesh.current.rotation.x += delta * 0.5
    mesh.current.rotation.y += delta * 0.5
  })

  return (
    <group position={position}>
      <Sphere
        args={[0.5, 32, 32]}
        ref={mesh}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <meshStandardMaterial color={hovered ? 'white' : color} emissive={color} emissiveIntensity={0.5} />
      </Sphere>
      <Text
        position={[0, -0.7, 0]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {title}
      </Text>
    </group>
  )
}

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
      className="bg-black bg-opacity-50 backdrop-blur-lg rounded-lg p-6 mb-8 border border-gray-800 hover:border-gray-600 transition-all duration-300"
    >
      <h3 className="text-2xl font-bold mb-2" style={{ color: experience.color }}>
        {experience.title}
      </h3>
      <p className="text-gray-300 mb-1">{experience.company}</p>
      <p className="text-gray-400 mb-4">{experience.period}</p>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-white bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
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

const Background = () => {
  const count = 2000
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
      colors[i * 3] = Math.random()
      colors[i * 3 + 1] = Math.random()
      colors[i * 3 + 2] = Math.random()
    }
    return [positions, colors]
  }, [count])

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attachObject={['attributes', 'position']}
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attachObject={['attributes', 'color']}
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.015} vertexColors />
    </points>
  )
}

export default function ExperiencePage() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-white">
      <Canvas className="absolute inset-0" camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Background />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={true} />
        {experiences.map((exp, index) => (
          <Atom 
            key={index} 
            position={[
              Math.cos(index / experiences.length * Math.PI * 2) * 3,
              Math.sin(index / experiences.length * Math.PI * 2) * 3,
              0
            ]} 
            color={exp.color}
            title={exp.title}
          />
        ))}
      </Canvas>
      <div className="absolute inset-0 overflow-auto">
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-6xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
          >
            My Cosmic Journey
          </motion.h1>
          <div className="space-y-8">
            {experiences.map((experience, index) => (
              <ExperienceCard key={index} experience={experience} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}