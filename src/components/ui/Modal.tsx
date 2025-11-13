"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { X } from "lucide-react";
import { Button } from ".";

interface ModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
  maxWidth?: string;
  className?: string;
}

export default function Modal({
  isOpen,
  onOpenChange,
  title = "Modal",
  children,
  maxWidth = "max-w-sm",
  className = "",
}: ModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
          <Dialog.Portal>
            <>
              <Dialog.Overlay asChild>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                />
              </Dialog.Overlay>

              <Dialog.Content asChild>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 30 }}
                  transition={{
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.1,
                  }}
                  className="fixed inset-0 z-50 flex items-center justify-center p-4"
                >
                  <div className={`relative w-full ${maxWidth} ${className}`}>
                    {/* Glass effect container */}
                    <div className="relative overflow-hidden rounded-2xl bg-surface/80 backdrop-blur-xl border border-border shadow-2xl">
                      {/* Content */}
                      <div className="relative p-6">
                        {/* Hidden title for accessibility */}
                        <VisuallyHidden asChild>
                          <Dialog.Title>{title}</Dialog.Title>
                        </VisuallyHidden>

                        {/* Close button - always available for accessibility */}
                        <div className="absolute top-4 right-4 z-10">
                          <Dialog.Close asChild>
                            <Button
                              variant="ghost"
                              size="lg"
                              icon={X}
                              onClick={() => onOpenChange(false)}
                            />
                          </Dialog.Close>
                        </div>

                        {/* Modal content */}
                        {children}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Dialog.Content>
            </>
          </Dialog.Portal>
        </Dialog.Root>
      )}
    </AnimatePresence>
  );
}
