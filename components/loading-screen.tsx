"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(onComplete, 500)
          return 100
        }
        return prev + 2
      })
    }, 30)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <AnimatePresence>
      {progress < 100 && (
        <motion.div
          className="fixed inset-0 z-50 bg-background flex items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center">
            {/* Logo reveal */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 
                className="text-5xl md:text-7xl font-bold text-gradient-gold mb-8"
                style={{ fontFamily: "var(--font-bebas)" }}
              >
                VINÍCIUS OUT
              </h1>
            </motion.div>

            {/* Progress bar */}
            <div className="w-64 h-1 bg-secondary/30 rounded-full overflow-hidden mx-auto">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-primary/70"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>

            {/* Loading text */}
            <motion.p
              className="text-muted-foreground mt-4 text-sm tracking-widest uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {progress < 30 && "Loading the movement..."}
              {progress >= 30 && progress < 60 && "Gathering supporters..."}
              {progress >= 60 && progress < 90 && "Preparing the protest..."}
              {progress >= 90 && "¡Hala Madrid!"}
            </motion.p>
          </div>

          {/* Background effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[150px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: "1s" }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
