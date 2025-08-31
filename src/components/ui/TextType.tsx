"use client";

import React, {
  ElementType,
  useEffect,
  useRef,
  useState,
  createElement,
  useMemo,
} from "react";
import { gsap } from "gsap";

interface TextTypeProps {
  className?: string;
  showCursor?: boolean;
  hideCursorWhileTyping?: boolean;
  cursorCharacter?: string | React.ReactNode;
  cursorBlinkDuration?: number;
  cursorClassName?: string;
  text: string | string[];
  as?: ElementType;
  typingSpeed?: number;
  initialDelay?: number;
  pauseDuration?: number;
  deletingSpeed?: number;
  loop?: boolean;
  playOnce?: boolean;
  textColors?: string[];
  variableSpeed?: { min: number; max: number };
  onSentenceComplete?: (sentence: string, index: number) => void;
  startOnVisible?: boolean;
  reverseMode?: boolean;
  children?: React.ReactNode;
}

const TextType = ({
  text,
  as: Component = "div",
  typingSpeed = 50,
  initialDelay = 0,
  pauseDuration = 2000,
  deletingSpeed = 30,
  loop = true,
  playOnce = false,
  className = "",
  showCursor = true,
  hideCursorWhileTyping = false,
  cursorCharacter = "|",
  cursorClassName = "",
  cursorBlinkDuration = 0.5,
  textColors = [],
  variableSpeed,
  onSentenceComplete,
  startOnVisible = false,
  reverseMode = false,
  children,
  ...props
}: TextTypeProps & React.HTMLAttributes<HTMLElement>) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(!startOnVisible);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const childrenRef = useRef<HTMLDivElement>(null);

  const textArray = useMemo(
    () => (Array.isArray(text) ? text : [text]),
    [text]
  );

  const getCurrentTextColor = () => {
    if (textColors.length === 0) return "var(--color-foreground)";
    return textColors[currentTextIndex % textColors.length];
  };

  // Determine if we're currently typing or deleting
  const isCurrentlyTyping =
    currentCharIndex < textArray[currentTextIndex].length || isDeleting;

  // Show cursor if:
  // 1. showCursor is true, OR
  // 2. showCursor is false but we're currently typing (and not completed)
  const shouldShowCursor = showCursor || (isCurrentlyTyping && !hasCompleted);

  useEffect(() => {
    if (!startOnVisible || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [startOnVisible]);

  useEffect(() => {
    if (shouldShowCursor && cursorRef.current) {
      gsap.set(cursorRef.current, { opacity: 1 });
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: cursorBlinkDuration,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });
    }
  }, [shouldShowCursor, cursorBlinkDuration]);

  // Fade in children when typing is complete
  useEffect(() => {
    if (isTypingComplete && children && childrenRef.current) {
      gsap.fromTo(
        childrenRef.current,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        }
      );
    }
  }, [isTypingComplete, children]);

  useEffect(() => {
    if (!isVisible || (playOnce && hasCompleted)) return;

    let timeout: NodeJS.Timeout;

    const getRandomSpeed = () => {
      if (!variableSpeed) return typingSpeed;
      const { min, max } = variableSpeed;
      return Math.random() * (max - min) + min;
    };

    const currentText = textArray[currentTextIndex];
    const processedText = reverseMode
      ? currentText.split("").reverse().join("")
      : currentText;

    const executeTypingAnimation = () => {
      if (isDeleting && !playOnce) {
        if (displayedText === "") {
          setIsDeleting(false);

          // Check if we should stop the animation
          if (currentTextIndex === textArray.length - 1 && !loop) {
            return;
          }

          if (onSentenceComplete) {
            onSentenceComplete(textArray[currentTextIndex], currentTextIndex);
          }

          setCurrentTextIndex((prev) => (prev + 1) % textArray.length);
          setCurrentCharIndex(0);
          timeout = setTimeout(() => {}, pauseDuration);
        } else {
          timeout = setTimeout(() => {
            setDisplayedText((prev) => prev.slice(0, -1));
          }, deletingSpeed);
        }
      } else {
        if (currentCharIndex < processedText.length) {
          timeout = setTimeout(
            () => {
              setDisplayedText(
                (prev) => prev + processedText[currentCharIndex]
              );
              setCurrentCharIndex((prev) => prev + 1);
            },
            variableSpeed ? getRandomSpeed() : typingSpeed
          );
        } else {
          // Check if playOnce is true - don't start deletion, just stay on final text
          if (playOnce) {
            // For single text, mark as completed
            if (textArray.length === 1) {
              setHasCompleted(true);
              setIsTypingComplete(true);
              return;
            }
            // For multiple texts, move to next text without deletion
            if (currentTextIndex < textArray.length - 1) {
              if (onSentenceComplete) {
                onSentenceComplete(
                  textArray[currentTextIndex],
                  currentTextIndex
                );
              }
              setCurrentTextIndex((prev) => prev + 1);
              setCurrentCharIndex(0);
              setDisplayedText("");
              timeout = setTimeout(() => {}, pauseDuration);
            } else {
              // Reached the last text, mark as completed
              setHasCompleted(true);
              setIsTypingComplete(true);
              return;
            }
          } else {
            // Normal behavior - continue with deletion or looping
            if (textArray.length > 1) {
              if (loop) {
                timeout = setTimeout(() => {
                  setIsDeleting(true);
                }, pauseDuration);
              } else {
                // If not looping and we're at the last text, mark as complete
                if (currentTextIndex === textArray.length - 1) {
                  setHasCompleted(true);
                  setIsTypingComplete(true);
                  return;
                } else {
                  timeout = setTimeout(() => {
                    setIsDeleting(true);
                  }, pauseDuration);
                }
              }
            } else {
              // Single text with loop - either loop or complete
              if (loop) {
                timeout = setTimeout(() => {
                  setIsDeleting(true);
                }, pauseDuration);
              } else {
                setHasCompleted(true);
                setIsTypingComplete(true);
                return;
              }
            }
          }
        }
      }
    };

    if (currentCharIndex === 0 && !isDeleting && displayedText === "") {
      timeout = setTimeout(executeTypingAnimation, initialDelay);
    } else {
      executeTypingAnimation();
    }

    return () => clearTimeout(timeout);
  }, [
    currentCharIndex,
    displayedText,
    isDeleting,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    textArray,
    currentTextIndex,
    loop,
    playOnce,
    hasCompleted,
    initialDelay,
    isVisible,
    reverseMode,
    variableSpeed,
    onSentenceComplete,
  ]);

  const shouldHideCursor = hideCursorWhileTyping && isCurrentlyTyping;

  return createElement(
    Component,
    {
      ref: containerRef,
      className: `inline-block whitespace-pre-wrap tracking-tight ${className}`,
      ...props,
    },
    <span style={{ color: getCurrentTextColor() }}>{displayedText}</span>,
    shouldShowCursor && (
      <span
        ref={cursorRef}
        className={`ml-0 inline-block opacity-100 ${
          shouldHideCursor ? "hidden" : ""
        } ${cursorClassName}`}
      >
        {cursorCharacter}
      </span>
    ),
    children && (
      <span
        ref={childrenRef}
        style={{ opacity: 0 }}
        className="inline-block ml-2"
      >
        {children}
      </span>
    )
  );
};

export default TextType;
