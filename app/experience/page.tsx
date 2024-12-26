'use client'

import { Timeline } from "@/components/ui/timeline"

const timelineData = [
  {
    title: '2024',
    content: (
      <div className="space-y-8">
        <div className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-colors">
          <h3 className="text-2xl font-semibold text-white mb-1">Full Stack Developer</h3>
          <div className="flex items-center gap-2 text-gray-400 mb-4">
            <span className="font-medium text-purple-400">Algorizz</span>
            <span>•</span>
            <span>Remote</span>
            <span>•</span>
            <span>June 2024 - Present</span>
          </div>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Optimized interactive tools for Qrizz, an AI-driven application, improving user engagement and reducing API costs by 25%</li>
            <li>Enhanced data workflows on Actian (HCL product), increasing conversion speed by 40%</li>
            <li>Collaborated with cross-functional teams to deliver scalable AI-powered solutions</li>
          </ul>
        </div>

        <div className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-colors">
          <h3 className="text-2xl font-semibold text-white mb-1">Open Source Contributor</h3>
          <div className="flex items-center gap-2 text-gray-400 mb-4">
            <span className="font-medium text-purple-400">GirlScript Foundation</span>
            <span>•</span>
            <span>Remote</span>
            <span>•</span>
            <span>June 2024 - Aug 2024</span>
          </div>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Implemented accessibility-focused features and contributed to open-source documentation</li>
            <li>Earned Postman Student Expert Certification, showcasing API testing and development expertise</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: '2022',
    content: (
      <div className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-colors">
        <h3 className="text-2xl font-semibold text-white mb-1">Bachelor of Engineering (Computer Science)</h3>
        <div className="flex items-center gap-2 text-gray-400 mb-4">
          <span className="font-medium text-pink-400">RNS Institute of Technology</span>
          <span>•</span>
          <span>Bengaluru</span>
          <span>•</span>
          <span>2022 - 2026</span>
        </div>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Pursuing Computer Science Engineering</li>
          <li>Focus on AI, Machine Learning, and Full Stack Development</li>
        </ul>
      </div>
    ),
  },
  {
    title: '2020',
    content: (
      <div className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-colors">
        <h3 className="text-2xl font-semibold text-white mb-1">Class XII (Science)</h3>
        <div className="flex items-center gap-2 text-gray-400 mb-4">
          <span className="font-medium text-pink-400">Venkataramana PU College</span>
          <span>•</span>
          <span>Kundapur</span>
          <span>•</span>
          <span>2020 - 2022</span>
        </div>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Completed Higher Secondary Education in Science</li>
          <li>Strong foundation in Mathematics and Computer Science</li>
        </ul>
      </div>
    ),
  },
];

export default function Experience() {
  return (
    <main className="min-h-screen bg-slate-950">
      <Timeline data={timelineData} />
    </main>
  );
}