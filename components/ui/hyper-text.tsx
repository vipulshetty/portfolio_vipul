"use client";
 
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
 
type CharacterSet = string[] | readonly string[];
 
interface HyperTextProps {
  /** The text content to be animated */
  children: string;
  /** Optional className for styling */
  className?: string;
  /** Duration of the animation in milliseconds */
  duration?: number;
  /** Delay before animation starts in milliseconds */
  delay?: number;
  /** Component to render as - defaults to div */
  as?: React.ElementType;
  /** Whether to start animation when element comes into view */
  startOnView?: boolean;
  /** Whether to trigger animation on hover */
  animateOnHover?: boolean;
  /** Custom character set for scramble effect. Defaults to uppercase alphabet */
  characterSet?: CharacterSet;
}
 
const DEFAULT_CHARACTER_SET = Object.freeze(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
) as readonly string[];
 
const getRandomInt = (max: number): number => Math.floor(Math.random() * max);
 
export function HyperText({
  children,
  className,
  duration = 800,
  delay = 0,
  as: Component = "div",
  startOnView = false,
  animateOnHover = true,
  characterSet = DEFAULT_CHARACTER_SET,
}: HyperTextProps) {
  const MotionComponent = motion(Component);
 
  const [displayText, setDisplayText] = useState<string[]>(() =>
    children.split(""),
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const iterationCount = useRef(0);
  const elementRef = useRef<HTMLElement>(null);
 
  const handleAnimationTrigger = () => {
    if (animateOnHover && !isAnimating) {
      iterationCount.current = 0;
      setIsAnimating(true);
    }
  };
 
  // Handle animation start based on view or delay
  useEffect(() => {
    if (!startOnView) {
      const startTimeout = setTimeout(() => {
        setIsAnimating(true);
      }, delay);
      return () => clearTimeout(startTimeout);
    }
 
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsAnimating(true);
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "-30% 0px -30% 0px" },
    );
 
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
 
    return () => observer.disconnect();
  }, [delay, startOnView]);
 
  // Handle scramble animation
  useEffect(() => {
    if (!isAnimating) return;
 
    const intervalDuration = 100; // Fixed interval for consistent scramble speed
    const pauseDuration = 2000; // 2 seconds pause between transitions
    const maxIterations = children.length;
    let currentIndex = 0;
 
    const interval = setInterval(() => {
      if (currentIndex < maxIterations) {
        setDisplayText((currentText) =>
          currentText.map((letter, index) =>
            letter === " "
              ? letter
              : index === currentIndex
                ? children[index]
                : index < currentIndex
                  ? children[index]
                  : characterSet[getRandomInt(characterSet.length)],
          ),
        );
        currentIndex++;
      } else {
        clearInterval(interval);
        // After completing one transition, wait for pauseDuration before starting next
        setTimeout(() => {
          if (animateOnHover) {
            setIsAnimating(false);
          } else {
            currentIndex = 0; // Reset for next animation
            setDisplayText(children.split("").map(() => 
              characterSet[getRandomInt(characterSet.length)]
            ));
          }
        }, pauseDuration);
      }
    }, intervalDuration);
 
    return () => clearInterval(interval);
  }, [children, animateOnHover, isAnimating, characterSet]);
 
  return (
    <MotionComponent
      ref={elementRef}
      className={cn("overflow-hidden py-2 text-4xl font-bold", className)}
      onMouseEnter={handleAnimationTrigger}
    >
      <AnimatePresence>
        {displayText.map((letter, index) => (
          <motion.span
            key={index}
            className={cn("font-mono", letter === " " ? "w-3" : "")}
          >
            {letter.toUpperCase()}
          </motion.span>
        ))}
      </AnimatePresence>
    </MotionComponent>
  );
}
