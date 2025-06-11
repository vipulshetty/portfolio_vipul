"use client";

import { motion } from 'framer-motion';
import { SiNextdotjs, SiRedux, SiExpress, SiMongodb, SiJavascript, 
         SiTypescript, SiFramer, SiCplusplus, SiPostgresql, 
         SiKubernetes, SiApachekafka, SiPrometheus, SiGrafana } from 'react-icons/si';
import { FaReact, FaNodeJs, FaPython, FaSass, FaDocker, 
         FaAws, FaCode, FaMicrosoft } from 'react-icons/fa';
import { WarpBackground } from '@/components/ui/warp-background';
import { useState } from 'react';

interface Skill {
  name: string
  icon: any
  color: string
  type: 'dev' | 'devops'
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
  { name: 'Three.js', icon: FaCode, color: '#000000', type: 'dev' },
  { name: 'Docker', icon: FaDocker, color: '#2496ED', type: 'devops' },
  { name: 'Kubernetes', icon: SiKubernetes, color: '#326CE5', type: 'devops' },
  { name: 'Kafka', icon: SiApachekafka, color: '#231F20', type: 'devops' },
  { name: 'Prometheus', icon: SiPrometheus, color: '#E6522C', type: 'devops' },
  { name: 'Grafana', icon: SiGrafana, color: '#F46800', type: 'devops' },
  { name: 'Azure DevOps', icon: FaMicrosoft, color: '#0078D4', type: 'devops' },
  { name: 'AWS', icon: FaAws, color: '#FF9900', type: 'devops' },
]

const groupedSkills = {
  dev: skills.filter(skill => skill.type === 'dev'),
  devops: skills.filter(skill => skill.type === 'devops')
}

export default function SkillsPage() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-black/90 relative overflow-hidden">
      <WarpBackground 
        className="min-h-screen w-full"
        perspective={150}
        beamsPerSide={4}
        beamSize={4}
        beamDuration={4}
        gridColor="rgba(100, 100, 100, 0.3)"
      >
        <div className="max-w-7xl mx-auto px-4 py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              Skills & Expertise
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              A showcase of my technical journey and proficiency across various technologies
            </p>
          </motion.div>

          <div className="space-y-20">
            {/* Development Skills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
                Development
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {groupedSkills.dev.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ 
                      scale: 1.1,
                      y: -8,
                    }}
                    onHoverStart={() => setHoveredSkill(skill.name)}
                    onHoverEnd={() => setHoveredSkill(null)}
                    className="group relative flex flex-col items-center gap-3 p-6 rounded-xl backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-500"
                  >
                    {/* Animated Background Glow */}
                    <div 
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500"
                      style={{
                        background: `radial-gradient(circle at center, ${skill.color}40 0%, transparent 70%)`,
                        filter: 'blur(10px)',
                        transform: 'scale(1.1)'
                      }}
                    />

                    {/* Outer Glow Ring */}
                    <div 
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-50 transition-all duration-500"
                      style={{
                        border: `2px solid ${skill.color}`,
                        boxShadow: `0 0 20px ${skill.color}, inset 0 0 20px ${skill.color}`,
                      }}
                    />

                    {/* Icon Container with Glow */}
                    <motion.div
                      style={{ color: skill.color }}
                      animate={{
                        scale: hoveredSkill === skill.name ? [1, 1.2, 1] : 1,
                      }}
                      transition={{ 
                        duration: 1.5,
                        repeat: hoveredSkill === skill.name ? Infinity : 0,
                        repeatType: "reverse"
                      }}
                      className="relative z-10 transform-gpu"
                    >
                      {/* Icon Glow Effect */}
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
                        style={{
                          filter: `drop-shadow(0 0 8px ${skill.color}) drop-shadow(0 0 20px ${skill.color})`,
                        }}
                      >
                        <skill.icon className="text-4xl" />
                      </div>
                      
                      {/* Main Icon */}
                      <skill.icon className="text-4xl relative z-10" />
                    </motion.div>

                    {/* Skill Name with Glow */}
                    <span 
                      className="text-gray-200 font-medium relative z-10 text-center transition-all duration-500 group-hover:text-white"
                      style={{
                        textShadow: hoveredSkill === skill.name ? `0 0 10px ${skill.color}` : 'none'
                      }}
                    >
                      {skill.name}
                    </span>

                    {/* Animated Border */}
                    <motion.div
                      className="absolute -bottom-[2px] left-0 right-0 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"
                      style={{
                        background: `linear-gradient(90deg, transparent 0%, ${skill.color} 50%, transparent 100%)`,
                        boxShadow: `0 0 10px ${skill.color}`,
                      }}
                      initial={{ scaleX: 0 }}
                      animate={{ 
                        scaleX: hoveredSkill === skill.name ? 1 : 0
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* DevOps Skills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                DevOps & Cloud
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {groupedSkills.devops.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ 
                      scale: 1.1,
                      y: -8,
                    }}
                    onHoverStart={() => setHoveredSkill(skill.name)}
                    onHoverEnd={() => setHoveredSkill(null)}
                    className="group relative flex flex-col items-center gap-3 p-6 rounded-xl backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-500"
                  >
                    {/* Animated Background Glow */}
                    <div 
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500"
                      style={{
                        background: `radial-gradient(circle at center, ${skill.color}40 0%, transparent 70%)`,
                        filter: 'blur(10px)',
                        transform: 'scale(1.1)'
                      }}
                    />

                    {/* Outer Glow Ring */}
                    <div 
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-50 transition-all duration-500"
                      style={{
                        border: `2px solid ${skill.color}`,
                        boxShadow: `0 0 20px ${skill.color}, inset 0 0 20px ${skill.color}`,
                      }}
                    />

                    {/* Icon Container with Glow */}
                    <motion.div
                      style={{ color: skill.color }}
                      animate={{
                        scale: hoveredSkill === skill.name ? [1, 1.2, 1] : 1,
                      }}
                      transition={{ 
                        duration: 1.5,
                        repeat: hoveredSkill === skill.name ? Infinity : 0,
                        repeatType: "reverse"
                      }}
                      className="relative z-10 transform-gpu"
                    >
                      {/* Icon Glow Effect */}
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
                        style={{
                          filter: `drop-shadow(0 0 8px ${skill.color}) drop-shadow(0 0 20px ${skill.color})`,
                        }}
                      >
                        <skill.icon className="text-4xl" />
                      </div>
                      
                      {/* Main Icon */}
                      <skill.icon className="text-4xl relative z-10" />
                    </motion.div>

                    {/* Skill Name with Glow */}
                    <span 
                      className="text-gray-200 font-medium relative z-10 text-center transition-all duration-500 group-hover:text-white"
                      style={{
                        textShadow: hoveredSkill === skill.name ? `0 0 10px ${skill.color}` : 'none'
                      }}
                    >
                      {skill.name}
                    </span>

                    {/* Animated Border */}
                    <motion.div
                      className="absolute -bottom-[2px] left-0 right-0 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"
                      style={{
                        background: `linear-gradient(90deg, transparent 0%, ${skill.color} 50%, transparent 100%)`,
                        boxShadow: `0 0 10px ${skill.color}`,
                      }}
                      initial={{ scaleX: 0 }}
                      animate={{ 
                        scaleX: hoveredSkill === skill.name ? 1 : 0
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </WarpBackground>
    </main>
  )
}