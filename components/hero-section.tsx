"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

function Particle({ delay, x }: { delay: number; x: number }) {
  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-primary/30"
      initial={{ y: "100vh", x: `${x}vw`, opacity: 0 }}
      animate={{ 
        y: "-10vh", 
        opacity: [0, 0.8, 0],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  )
}

function SmokeEffect({ delay, side }: { delay: number; side: "left" | "right" }) {
  return (
    <motion.div
      className={`absolute bottom-0 ${side === "left" ? "left-0" : "right-0"} w-64 h-64 rounded-full`}
      style={{
        background: "radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 70%)"
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: [1, 2, 3],
        opacity: [0.5, 0.3, 0],
        y: [0, -200, -400]
      }}
      transition={{
        duration: 6,
        delay,
        repeat: Infinity,
        ease: "easeOut"
      }}
    />
  )
}

export function HeroSection({ petitionCount }: { petitionCount: number }) {
  const [displayCount, setDisplayCount] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const duration = 2000
    const steps = 60
    const increment = petitionCount / steps
    let current = 0
    
    const timer = setInterval(() => {
      current += increment
      if (current >= petitionCount) {
        setDisplayCount(petitionCount)
        clearInterval(timer)
      } else {
        setDisplayCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [petitionCount])

  const particles = Array.from({ length: 30 }, (_, i) => ({
    delay: i * 0.3,
    x: Math.random() * 100
  }))

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Stadium background with overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/hero-bg.png')`,
            backgroundPosition: "center 30%",
            filter: "contrast(1.08) saturate(1.08)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/75 via-background/45 to-background/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-background/70" />
      </div>

      {/* Animated particles */}
      {mounted && particles.map((p, i) => (
        <Particle key={i} delay={p.delay} x={p.x} />
      ))}

      {/* Smoke effects */}
      {mounted && (
        <>
          <SmokeEffect delay={0} side="left" />
          <SmokeEffect delay={2} side="right" />
          <SmokeEffect delay={4} side="left" />
        </>
      )}

      {/* Stadium light glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px] animate-flicker" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px] animate-flicker" style={{ animationDelay: "1.5s" }} />

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.p
            className="text-muted-foreground tracking-[0.3em] uppercase text-sm md:text-base mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            A Fan Movement
          </motion.p>

          <motion.h1
            className="text-gradient-gold text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] font-bold tracking-tight leading-none"
            style={{ fontFamily: "var(--font-bebas), system-ui" }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            VINÍCIUS OUT
          </motion.h1>

          <motion.p
            className="text-lg md:text-3xl text-foreground/80 mt-5 md:mt-6 font-light tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Real Madrid deserves better.
          </motion.p>

          {/* Chant text animation */}
          <motion.div
            className="mt-8 overflow-hidden h-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.p
              className="text-muted-foreground/60 italic text-lg"
              animate={{ 
                y: [0, -32, -64, -96, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <span className="block h-8">{'"¡Hala Madrid!"'}</span>
              <span className="block h-8">{'"The shirt is sacred"'}</span>
              <span className="block h-8">{'"No player is bigger than the club"'}</span>
              <span className="block h-8">{'"Madrid comes first"'}</span>
            </motion.p>
          </motion.div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-8 sm:mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 text-base sm:text-lg px-7 sm:px-8 py-6 animate-pulse-glow"
            onClick={() => document.getElementById('petition')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Sign The Petition
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary/50 text-foreground hover:bg-primary/10 hover:border-primary text-base sm:text-lg px-7 sm:px-8 py-6"
            onClick={() => document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Join The Movement
          </Button>
        </motion.div>

        {/* Live petition counter */}
        <motion.div
          className="mt-10 sm:mt-16 glass rounded-2xl px-7 sm:px-8 py-6 inline-block"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 }}
        >
          <p className="text-muted-foreground text-sm uppercase tracking-widest mb-2">Supporters United</p>
          <p className="text-5xl md:text-6xl font-bold text-gradient-gold" style={{ fontFamily: "var(--font-bebas)" }}>
            {displayCount.toLocaleString()}
          </p>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={() => document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-muted-foreground text-sm uppercase tracking-widest">Scroll</span>
        <ChevronDown className="w-6 h-6 text-primary animate-scroll-indicator" />
      </motion.div>
    </section>
  )
}
