'use client';

import { portfolioData } from "@/lib/portfolio-data";
import { motion } from "framer-motion";
import {
  SiNextdotjs, SiRedux, SiExpress, SiMongodb, SiJavascript, 
  SiTypescript, SiFramer, SiCplusplus, SiPostgresql, 
  SiKubernetes, SiApachekafka, SiPrometheus, SiGrafana
} from 'react-icons/si';
import { 
  FaReact, FaNodeJs, FaPython, FaSass, FaDocker, 
  FaAws, FaCode, FaMicrosoft
} from 'react-icons/fa';

const skillIconMap: { [key: string]: React.ComponentType<any> } = {
  'Next.js': SiNextdotjs,
  'React': FaReact,
  'Node.js': FaNodeJs,
  'Redux': SiRedux,
  'Express': SiExpress,
  'MongoDB': SiMongodb,
  'JavaScript': SiJavascript,
  'TypeScript': SiTypescript,
  'Framer Motion': SiFramer,
  'Python': FaPython,
  'C++': SiCplusplus,
  'Sass': FaSass,
  'PostgreSQL': SiPostgresql,
  'Three.js': FaCode,
  'Docker': FaDocker,
  'Kubernetes': SiKubernetes,
  'Kafka': SiApachekafka,
  'Prometheus': SiPrometheus,
  'Grafana': SiGrafana,
  'Azure DevOps': FaMicrosoft,
  'AWS': FaAws,
};

const allSkills = [...portfolioData.skills.dev, ...portfolioData.skills.devops];

export function SkillsMarquee() {
  const marqueeVariants = {
    animate: {
      x: [0, -1660],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 30,
          ease: "linear",
        },
      },
    },
  };

  return (
    <div className="relative w-full overflow-hidden py-12 bg-black">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />
      </div>
      <motion.div
        className="flex"
        variants={marqueeVariants}
        animate="animate"
      >
        {[...allSkills, ...allSkills].map((skill, index) => {
          const Icon = skillIconMap[skill.name];
          return (
            <motion.div 
              key={index} 
              className="flex-shrink-0 w-48 flex flex-col items-center justify-center mx-4"
              whileHover={{ scale: 1.1, zIndex: 20 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {Icon && (
                <div 
                  className="p-4 rounded-full transition-all duration-300"
                  style={{ 
                    color: skill.color, 
                    boxShadow: `0 0 15px ${skill.color}33`,
                  }}
                >
                  <Icon className="text-5xl" />
                </div>
              )}
              <span className="mt-3 text-sm text-gray-300 font-medium">{skill.name}</span>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
} 