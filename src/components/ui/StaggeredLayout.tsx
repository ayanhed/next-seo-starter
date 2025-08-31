"use client";

import React, { ReactNode, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface StaggeredLayoutProps {
  id?: string;
  children: ReactNode;
  className?: string;
  type?:
    | "fade"
    | "slideUp"
    | "slideDown"
    | "slideLeft"
    | "slideRight"
    | "scale";
  duration?: number; // seconds
  initialDelay?: number; // seconds
  staggerDelay?: number; // seconds per child
  once?: boolean; // animate only once per element
  show?: boolean; // render or not
  start?: string; // ScrollTrigger start, e.g. "top 85%"
  end?: string; // ScrollTrigger end, e.g. "bottom 15%"
}

function getFromVars(type: NonNullable<StaggeredLayoutProps["type"]>) {
  switch (type) {
    case "slideUp":
      return { opacity: 0, y: 16 } as const;
    case "slideDown":
      return { opacity: 0, y: -16 } as const;
    case "slideLeft":
      return { opacity: 0, x: 16 } as const;
    case "slideRight":
      return { opacity: 0, x: -16 } as const;
    case "scale":
      return { opacity: 0, scale: 0.96 } as const;
    case "fade":
    default:
      return { opacity: 0 } as const;
  }
}

export default function StaggeredLayout({
  id,
  children,
  className,
  type = "slideUp",
  duration = 0.4,
  initialDelay = 0,
  staggerDelay = 0.04,
  once = true,
  show = true,
  start = "top 95%",
  end = "bottom 15%",
}: StaggeredLayoutProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Remove SSR guard so elements don't remain hidden
    containerRef.current.removeAttribute("data-ssr");

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const container = containerRef.current;
    const childrenEls = Array.from(container.children) as HTMLElement[];

    const triggers: ScrollTrigger[] = [];
    const tweens: gsap.core.Tween[] = [];

    const fromVars = getFromVars(type);
    if (prefersReduced) {
      childrenEls.forEach((el) => {
        gsap.set(el, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          clearProps: "transform,opacity",
        });
      });
      return;
    }

    childrenEls.forEach((el, index) => {
      gsap.set(el, { willChange: "opacity, transform" });
      gsap.set(el, fromVars);

      const delay = Math.max(
        0,
        initialDelay + (index > 0 ? index * staggerDelay : 0)
      );
      const tween = gsap.to(el, {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration,
        delay,
        ease: "power2.out",
        paused: true,
      });

      const trigger = ScrollTrigger.create({
        trigger: el,
        start,
        end,
        once,
        onEnter: () => tween.play(),
        onLeaveBack: () => {
          if (!once) {
            gsap.to(el, {
              ...fromVars,
              duration: Math.max(0.2, duration * 0.6),
              ease: "power2.inOut",
            });
          }
        },
      });

      triggers.push(trigger);
      tweens.push(tween);
    });

    const fallback = window.setTimeout(() => {
      childrenEls.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom > 0;
        if (inView) {
          gsap.to(el, {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: Math.max(0.2, duration * 0.8),
            ease: "power2.out",
          });
        }
      });
    }, 60);

    return () => {
      window.clearTimeout(fallback);
      triggers.forEach((t) => t.kill());
      tweens.forEach((tw) => tw.kill());
    };
  }, [type, duration, initialDelay, staggerDelay, once, start, end]);

  if (!show) return null;

  return (
    <div
      id={id}
      ref={containerRef}
      data-ssr="init"
      className={cn("staggered-layout w-full", className)}
    >
      {children}
    </div>
  );
}
