"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LampDemoProps {
  onAnimationComplete?: () => void;
}

export function LampDemo({ onAnimationComplete }: LampDemoProps) {
  return (
    <LampContainer onAnimationComplete={onAnimationComplete}>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
        className="bg-gradient-to-br from-slate-200 to-slate-400 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        My Projects
      </motion.h1>
    </LampContainer>
  );
}

interface LampContainerProps {
  children: React.ReactNode;
  className?: string;
  onAnimationComplete?: () => void;
}

export const LampContainer = ({
  children,
  className,
  onAnimationComplete,
}: LampContainerProps) => {
  return (
    <div
      className={cn(
        "relative flex h-[24rem] flex-col items-center justify-center overflow-hidden bg-slate-950 w-full rounded-md z-0",
        className
      )}
    >
      <motion.div
        initial={{ opacity: 0, width: "15rem" }}
        animate={{ opacity: 1, width: "30rem" }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
        }}
        onAnimationComplete={onAnimationComplete}
        className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-conic from-cyan-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
      >
        <div className="absolute w-[100%] left-0 bg-slate-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        <div className="absolute w-40 h-[100%] left-0 bg-slate-950 bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, width: "15rem" }}
        animate={{ opacity: 1, width: "30rem" }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
        }}
        className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-cyan-500 text-white [--conic-position:from_290deg_at_center_top]"
      >
        <div className="absolute w-40 h-[100%] right-0 bg-slate-950 bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
        <div className="absolute w-[100%] right-0 bg-slate-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
      </motion.div>

      {/* Glow Effects */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-slate-950 blur-2xl"
      />
      <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-cyan-500 blur-3xl"
      />

      {/* Center Glow */}
      <motion.div
        initial={{ width: "4rem", opacity: 0 }}
        animate={{ width: "16rem", opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-cyan-400 blur-2xl"
      />
      <motion.div
        initial={{ width: "8rem" }}
        animate={{ width: "30rem" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] bg-cyan-400"
      />

      <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-slate-950" />

      <div className="relative z-50 flex -translate-y-8 flex-col items-center px-5">
        {children}
      </div>
    </div>
  );
};
