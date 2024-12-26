'use client';

import { useEffect, useRef } from "react";
import { useInView, motion, useAnimation } from "framer-motion";

interface VortexProps {
  children: React.ReactNode;
  backgroundColor?: string;
  className?: string;
}

export function Vortex({
  children,
  backgroundColor = "transparent",
  className = "",
}: VortexProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      style={{ background: backgroundColor }}
    >
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-[2px] w-full"
            style={{
              top: `${(i / 40) * 100}%`,
              background: `linear-gradient(90deg, transparent, rgba(255,255,255,${
                0.1 - i * 0.0025
              }), transparent)`,
            }}
            initial={{ rotate: 0, scale: 1 }}
            animate={{
              rotate: [0, 360],
              scale: [1, i % 2 === 0 ? 1.1 : 0.9, 1],
            }}
            transition={{
              duration: 20 + i * 0.2,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.1,
            }}
          />
        ))}
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={`vertical-${i}`}
            className="absolute w-[2px] h-full"
            style={{
              left: `${(i / 40) * 100}%`,
              background: `linear-gradient(180deg, transparent, rgba(255,255,255,${
                0.1 - i * 0.0025
              }), transparent)`,
            }}
            initial={{ rotate: 0, scale: 1 }}
            animate={{
              rotate: [0, -360],
              scale: [1, i % 2 === 0 ? 1.1 : 0.9, 1],
            }}
            transition={{
              duration: 20 + i * 0.2,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.1,
            }}
          />
        ))}
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
