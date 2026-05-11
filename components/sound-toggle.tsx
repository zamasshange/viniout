"use client"

import { motion } from "framer-motion"
import { Volume2, VolumeX } from "lucide-react"
import { useState, useEffect, useRef } from "react"

export function SoundToggle() {
  const [isMuted, setIsMuted] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Create audio context for crowd ambience (using a placeholder)
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio()
      // In a real implementation, you would use an actual crowd ambience audio file
      // audioRef.current.src = "/sounds/crowd-ambience.mp3"
      audioRef.current.loop = true
      audioRef.current.volume = 0.3
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [])

  const toggleSound = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play().catch(() => {
          // Autoplay was prevented
        })
      } else {
        audioRef.current.pause()
      }
    }
    setIsMuted(!isMuted)
  }

  return (
    <motion.button
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2 }}
      onClick={toggleSound}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed bottom-8 right-8 z-40 glass rounded-full p-4 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 group"
      aria-label={isMuted ? "Unmute crowd ambience" : "Mute crowd ambience"}
    >
      <motion.div
        animate={{ scale: isHovered ? 1.1 : 1 }}
        transition={{ duration: 0.2 }}
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
        ) : (
          <Volume2 className="w-5 h-5 text-primary" />
        )}
      </motion.div>

      {/* Tooltip */}
      <motion.span
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 10 }}
        className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap text-sm text-muted-foreground bg-secondary/80 backdrop-blur-sm px-3 py-1 rounded-lg pointer-events-none"
      >
        {isMuted ? "Enable ambient sound" : "Disable ambient sound"}
      </motion.span>
    </motion.button>
  )
}
