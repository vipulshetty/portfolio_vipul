'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

type Project = {
  title: string;
  category: string;
  image: string;
  demo: string;
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={project.demo} target="_blank" className="block group">
      <motion.div 
        className="relative w-full p-6 bg-gray-900/50 border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-purple-400/50 hover:shadow-2xl hover:shadow-purple-500/10"
        whileHover={{ y: -8 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <div className="mb-4 overflow-hidden rounded-lg aspect-video">
          <Image
            src={project.image}
            alt={project.title}
            width={800}
            height={450}
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="absolute bottom-6 left-6 right-6">
          <h3 className="text-xl font-bold text-white">{project.title}</h3>
          <p className="text-gray-400">{project.category}</p>
        </div>
        
        <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 bg-black/50 border border-white/10 rounded-full text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Live Demo
          <ArrowUpRight size={14} />
        </div>
      </motion.div>
    </Link>
  );
} 