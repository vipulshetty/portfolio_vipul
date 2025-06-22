"use client";
import { motion } from 'framer-motion';

type ExperienceItem = {
  title: string;
  company: string;
  location: string;
  date: string;
  description: string[];
};

type ExperienceYear = {
  year: string;
  items: ExperienceItem[];
};

export function Timeline({ data }: { data: ExperienceYear[] }) {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="relative">
      {/* The vertical line */}
      <div className="absolute left-1/2 -translate-x-1/2 h-full w-px bg-gray-800" />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
        className="space-y-16"
      >
        {data.map((yearData) => (
          <motion.div key={yearData.year} variants={itemVariants} className="relative">
            <div className="flex items-center justify-center mb-12">
              <div className="z-10 bg-gray-900 px-4 py-1 rounded-full border border-gray-700">
                <p className="text-lg font-semibold text-purple-300">{yearData.year}</p>
              </div>
            </div>
            <div className="grid gap-12">
              {yearData.items.map((item) => (
                <div key={item.title} className="text-center max-w-2xl mx-auto">
                  <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                  <p className="text-purple-300 mt-1">{item.company} &middot; {item.location}</p>
                  <p className="text-sm text-gray-500 mt-1">{item.date}</p>
                  <ul className="mt-4 space-y-2 text-gray-400">
                    {item.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
