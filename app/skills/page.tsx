'use client'

import { useState, useRef, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Text, OrbitControls, Stars, Html, Sparkles, Trail, Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { FaReact, FaNodeJs, FaPython, FaSass, FaDocker, FaAws } from 'react-icons/fa'
import { SiNextdotjs, SiRedux, SiExpress, SiMongodb, SiJavascript, SiTypescript, SiFramer, SiCplusplus, SiPostgresql, SiKubernetes, SiApachekafka, SiPrometheus, SiGrafana, SiAzuredevops, SiThreedotjs } from 'react-icons/si'

interface Skill {
  name: string;
  icon: React.ElementType;
  color: string;
  type: 'dev' | 'devops';
}

const skills: Skill[] = [
  { name: 'Next.js', icon: SiNextdotjs, color: '#000000', type: 'dev' },
  { name: 'React', icon: FaReact, color: '#61DAFB', type: 'dev' },
  { name: 'Node.js', icon: FaNodeJs, color: '#339933', type: 'dev' },
  { name: 'Redux', icon: SiRedux, color: '#764ABC', type: 'dev' },
  { name: 'Express', icon: SiExpress, color: '#000000', type: 'dev' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248', type: 'dev' },
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E', type: 'dev' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6', type: 'dev' },
  { name: 'Framer Motion', icon: SiFramer, color: '#0055FF', type: 'dev' },
  { name: 'Python', icon: FaPython, color: '#3776AB', type: 'dev' },
  { name: 'C++', icon: SiCplusplus, color: '#00599C', type: 'dev' },
  { name: 'Sass', icon: FaSass, color: '#CC6699', type: 'dev' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#336791', type: 'dev' },
  { name: 'Three.js', icon: SiThreedotjs, color: '#000000', type: 'dev' },
  { name: 'Docker', icon: FaDocker, color: '#2496ED', type: 'devops' },
  { name: 'Kubernetes', icon: SiKubernetes, color: '#326CE5', type: 'devops' },
  { name: 'Kafka', icon: SiApachekafka, color: '#231F20', type: 'devops' },
  { name: 'Prometheus', icon: SiPrometheus, color: '#E6522C', type: 'devops' },
  { name: 'Grafana', icon: SiGrafana, color: '#F46800', type: 'devops' },
  { name: 'Azure', icon: SiAzuredevops, color: '#0078D4', type: 'devops' },
  { name: 'AWS', icon: FaAws, color: '#FF9900', type: 'devops' },
]

interface SkillNodeProps {
  skill: Skill;
  position: [number, number, number];
  setHovered: (skill: Skill | null) => void;
  setSelected: (skill: Skill | null) => void;
}

const SkillNode: React.FC<SkillNodeProps> = ({ skill, position, setHovered, setSelected }) => {
  const mesh = useRef<THREE.Mesh>(null)
  const { viewport } = useThree()

  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.2
      mesh.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.1
    }
  })

  const texture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 128
    canvas.height = 128
    const context = canvas.getContext('2d')
    if (context) {
      const gradient = context.createRadialGradient(64, 64, 0, 64, 64, 64)
      gradient.addColorStop(0, skill.color)
      gradient.addColorStop(1, 'rgba(0,0,0,0)')
      context.fillStyle = gradient
      context.fillRect(0, 0, 128, 128)
    }
    return new THREE.CanvasTexture(canvas)
  }, [skill.color])

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <group position={position}>
        <Trail
          width={0.2}
          length={8}
          color={new THREE.Color(skill.color)}
          attenuation={(t) => t * t}
        >
          <mesh
            ref={mesh}
            onPointerOver={() => setHovered(skill)}
            onPointerOut={() => setHovered(null)}
            onClick={() => setSelected(skill)}
          >
            <sphereGeometry args={[0.5, 32, 32]} />
            <MeshDistortMaterial
              color={skill.color}
              emissive={skill.color}
              emissiveIntensity={0.5}
              transparent
              opacity={0.8}
              distort={0.3}
              speed={2}
              map={texture}
            />
            <Html distanceFactor={10}>
              <div className="w-16 h-16 flex items-center justify-center bg-white bg-opacity-20 rounded-full backdrop-blur-sm">
                <skill.icon className="text-4xl" style={{ color: skill.color }} />
              </div>
            </Html>
          </mesh>
        </Trail>
        <Text
          position={[0, -0.8, 0]}
          fontSize={viewport.width * 0.015}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {skill.name}
        </Text>
        <Sparkles count={20} scale={2} size={6} speed={0.4} color={skill.color} />
      </group>
    </Float>
  )
}

interface SkillConstellationProps {
  skills: Skill[];
  setHovered: (skill: Skill | null) => void;
  setSelected: (skill: Skill | null) => void;
}

const SkillConstellation: React.FC<SkillConstellationProps> = ({ skills, setHovered, setSelected }) => {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.1) * 0.1
    }
  })

  const skillNodes = useMemo(() => 
    skills.map((skill, index) => {
      const theta = (index / skills.length) * Math.PI * 2
      const radius = 6
      const x = Math.cos(theta) * radius
      const z = Math.sin(theta) * radius
      return (
        <SkillNode
          key={skill.name}
          skill={skill}
          position={[x, 0, z]}
          setHovered={setHovered}
          setSelected={setSelected}
        />
      )
    }),
    [skills, setHovered, setSelected]
  )

  return <group ref={groupRef}>{skillNodes}</group>
}

interface SkillDetailsProps {
  skill: Skill;
}

const SkillDetails: React.FC<SkillDetailsProps> = ({ skill }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    className="absolute bottom-4 left-4 right-4 bg-gradient-to-r from-purple-900 to-blue-900 p-6 rounded-lg text-white flex items-center justify-between backdrop-blur-md shadow-lg"
  >
    <div>
      <h2 className="text-4xl font-bold mb-2 flex items-center">
        <skill.icon className="mr-2 text-5xl" style={{ color: skill.color }} /> {skill.name}
      </h2>
      <p className="text-xl">
        {skill.type === 'dev' ? 'Development Skill' : 'DevOps Skill'}
      </p>
    </div>
    <motion.div
      className="text-9xl"
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
      <skill.icon style={{ color: skill.color }} />
    </motion.div>
  </motion.div>
)

const ParticleField: React.FC = () => {
  const particlesRef = useRef<THREE.Points>(null)

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.0005
      particlesRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.2) * 0.1
    }
  })

  const particleCount = 8000
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      const radius = Math.random() * 30

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)

      const color = new THREE.Color().setHSL(Math.random(), 0.7, 0.5)
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }
    return [positions, colors]
  }, [])

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} vertexColors />
    </points>
  )
}

const GlowingRing: React.FC = () => {
  const ringRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = clock.getElapsedTime() * 0.2
    }
  })

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[10, 0.1, 16, 100]} />
      <meshBasicMaterial color="#4a0e4e" />
    </mesh>
  )
}

export default function Component() {
  const [hovered, setHovered] = useState<Skill | null>(null)
  const [selected, setSelected] = useState<Skill | null>(null)
  const [skillType, setSkillType] = useState<'all' | 'dev' | 'devops'>('all')
  const [autoRotate, setAutoRotate] = useState(true)

  const filteredSkills = useMemo(() => 
    skillType === 'all' ? skills : skills.filter(skill => skill.type === skillType),
    [skillType]
  )

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelected(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="relative h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-purple-900 overflow-hidden">
      <Canvas camera={{ position: [0, 0, 12], fov: 70 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <ParticleField />
        <GlowingRing />
        <SkillConstellation skills={filteredSkills} setHovered={setHovered} setSelected={setSelected} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate={autoRotate} autoRotateSpeed={0.5} />
      </Canvas>
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          My Skill Constellation
        </h1>
        <div className="space-x-4">
          {['all', 'dev', 'devops'].map((type) => (
            <button
              key={type}
              className={`px-6 py-3 rounded-full ${
                skillType === type ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-700'
              } text-white transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:scale-105 transform`}
              onClick={() => setSkillType(type as 'all' | 'dev' |   'devops')}
            >
              {type === 'all' ? 'All' : type === 'dev' ? 'Development' : 'DevOps'}
            </button>
          ))}
          <button
            className={`px-6 py-3 rounded-full ${
              autoRotate ? 'bg-gradient-to-r from-green-500 to-teal-500' : 'bg-gray-700'
            } text-white transition-all duration-300 hover:bg-gradient-to-r hover:from-green-600 hover:to-teal-600 hover:scale-105 transform`}
            onClick={() => setAutoRotate(!autoRotate)}
          >
            {autoRotate ? 'Auto-rotate On' : 'Auto-rotate Off'}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {selected && <SkillDetails skill={selected} />}
      </AnimatePresence>
      {hovered && !selected && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="absolute bottom-4 left-4 bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-lg text-white backdrop-blur-sm shadow-lg"
        >
          <span className="text-2xl font-bold">{hovered.name}</span>
        </motion.div>
      )}
      <div className="absolute bottom-4 right-4 text-white text-lg bg-gray-800 bg-opacity-50 p-2 rounded-lg backdrop-blur-sm">
        Press ESC to deselect a skill
      </div>
    </div>
  )
}