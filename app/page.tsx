'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { FaCode, FaDatabase, FaChartBar, FaCubes, FaRocket, FaMagic, FaScroll, FaGem, FaDragon } from 'react-icons/fa'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Float } from '@react-three/drei'
import * as THREE from 'three'
import PageLayout from '../components/PageLayout'

const roles = [
  { title: 'Full-Stack Developer', icon: FaCode, color: '#61DAFB' },
  { title: 'Database Architect', icon: FaDatabase, color: '#339933' },
  { title: 'Data Scientist', icon: FaChartBar, color: '#F7DF1E' },
  { title: 'Cloud Engineer', icon: FaCubes, color: '#764ABC' },
  { title: 'DevOps Specialist', icon: FaRocket, color: '#FF6B6B' },
]

function CodeParticles() {
  const particlesRef = useRef()
  const { viewport } = useThree()

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
  })

  const particleCount = 200
  const positions = new Float32Array(particleCount * 3)
  const colors = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount; i++) {
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(Math.random() * 2 - 1)
    const r = 2 + Math.random() * 1

    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    positions[i * 3 + 2] = r * Math.cos(phi)

    const color = new THREE.Color()
    color.setHSL(Math.random(), 0.7, 0.7)
    colors[i * 3] = color.r
    colors[i * 3 + 1] = color.g
    colors[i * 3 + 2] = color.b
  }

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.05} vertexColors />
    </points>
  )
}

function FloatingShapes() {
  const shapesRef = useRef()

  useFrame((state) => {
    if (shapesRef.current) {
      shapesRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  const shapePositions = [
    [-1.5, 1, 0],
    [1.5, -1, 0],
    [0, 1.5, 1],
    [0, -1.5, -1],
    [1, 0, 1.5],
    [-1, 0, -1.5],
  ]

  const shapes = [
    <boxGeometry args={[0.3, 0.3, 0.3]} />,
    <sphereGeometry args={[0.15, 32, 32]} />,
    <coneGeometry args={[0.15, 0.3, 32]} />,
    <torusGeometry args={[0.15, 0.05, 16, 100]} />,
    <octahedronGeometry args={[0.2]} />,
    <dodecahedronGeometry args={[0.2]} />,
  ]

  return (
    <group ref={shapesRef}>
      {shapePositions.map((position, index) => (
        <Float key={index} speed={1.5} rotationIntensity={1} floatIntensity={2}>
          <mesh position={position}>
            {shapes[index]}
            <meshPhongMaterial color={new THREE.Color().setHSL(index / 6, 0.7, 0.7)} />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <CodeParticles />
      <FloatingShapes />
    </>
  )
}

export default function Home() {
  const [currentRole, setCurrentRole] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <PageLayout>
      <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-gray-900 to-black">
        <div className="absolute inset-0 z-0 opacity-50">
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 0, 5]} />
            <OrbitControls enableZoom={false} enablePan={false} />
            <Scene />
          </Canvas>
        </div>
        <div className="relative z-10 text-center max-w-4xl mx-auto backdrop-filter backdrop-blur-sm bg-opacity-30 bg-gray-900 p-8 rounded-2xl shadow-2xl">
          <motion.h1
            className="text-6xl sm:text-7xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-gradient">
              Innovating Through
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-yellow-500 to-red-500 animate-gradient">
              Code & Creativity
            </span>
          </motion.h1>
          <motion.div
            className="text-2xl sm:text-3xl font-medium mb-8 text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="block">Vipul shetty</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-2xl sm:text-3xl font-semibold mb-12 h-20 flex flex-col items-center justify-center"
          >
            <span className="text-gray-400">Specialized in</span>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentRole}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="flex items-center space-x-2"
                style={{ color: roles[currentRole].color }}
              >
                {React.createElement(roles[currentRole].icon, { className: "text-4xl" })}
                <span className="font-bold">{roles[currentRole].title}</span>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="grid grid-cols-2 gap-4 sm:flex sm:space-x-4 relative z-10 mt-8"
        >
          {[
            { href: '/skills', text: 'Expertise', icon: FaScroll, color: '#61DAFB' },
            { href: '/projects', text: 'Portfolio', icon: FaGem, color: '#CC6699' },
            { href: '/experience', text: 'Journey', icon: FaDragon, color: '#F7DF1E' },
            { href: '/socials', text: 'Connect', icon: FaMagic, color: '#47A248' },
          ].map((item, index) => (
            <Link key={item.href} href={item.href} passHref>
              <motion.a
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-lg font-semibold text-lg shadow-lg flex items-center justify-center space-x-2 transition-all duration-300 backdrop-filter backdrop-blur-sm"
                style={{
                  background: `linear-gradient(45deg, ${item.color}33, ${item.color}22)`,
                  boxShadow: `0 4px 20px ${item.color}44`,
                  border: `1px solid ${item.color}55`,
                }}
              >
                {React.createElement(item.icon, { className: "text-white text-2xl" })}
                <span className="text-white">{item.text}</span>
              </motion.a>
            </Link>
          ))}
        </motion.div>
      </div>
    </PageLayout>
  )
}