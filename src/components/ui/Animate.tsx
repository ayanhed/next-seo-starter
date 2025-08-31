"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimateProps {
  children: ReactNode;
  type?:
    | "fade"
    | "slide"
    | "scale"
    | "slideUp"
    | "slideDown"
    | "slideLeft"
    | "slideRight";
  duration?: number;
  delay?: number;
  className?: string;
  show?: boolean;
  once?: boolean;
}

const animations = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slide: {
    initial: { x: -20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 20, opacity: 0 },
  },
  scale: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
  },
  slideUp: {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
  },
  slideDown: {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 20, opacity: 0 },
  },
  slideLeft: {
    initial: { x: 20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -20, opacity: 0 },
  },
  slideRight: {
    initial: { x: -20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 20, opacity: 0 },
  },
};

export default function Animate({
  children,
  type = "fade",
  duration = 0.3,
  delay = 0,
  className,
  show = true,
  once = false,
}: AnimateProps) {
  const animation = animations[type];

  if (!show) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={animation.initial}
        animate={animation.animate}
        exit={animation.exit}
        transition={{
          duration,
          delay,
          ease: "easeInOut",
        }}
        className={cn(className)}
        whileInView={once ? animation.animate : undefined}
        viewport={{ once: true, margin: "-50px" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
