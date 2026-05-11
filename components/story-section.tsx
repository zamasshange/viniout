"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const storyLines = [
  { text: "We stood by him.", delay: 0 },
  { text: "We defended him.", delay: 0.3 },
  { text: "We believed in him.", delay: 0.6 },
  { text: "But enough is enough.", delay: 1.2, highlight: true },
  { text: "This club is bigger than any player.", delay: 1.8, highlight: true },
]

export function StorySection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <section id="story" className="relative py-32 md:py-48 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[200px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-primary uppercase tracking-[0.3em] text-sm">Our Story</span>
        </motion.div>

        <div className="space-y-4 md:space-y-6">
          {storyLines.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ 
                duration: 0.8, 
                delay: line.delay,
                ease: "easeOut"
              }}
              className="overflow-hidden"
            >
              <p 
                className={`text-3xl md:text-5xl lg:text-6xl font-bold text-center leading-tight ${
                  line.highlight 
                    ? "text-gradient-gold" 
                    : "text-foreground/80"
                }`}
                style={{ fontFamily: "var(--font-bebas)" }}
              >
                {line.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Decorative line */}
        <motion.div
          className="mt-20 flex justify-center"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 2.2 }}
        >
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
        </motion.div>

        {/* Additional quote */}
        <motion.blockquote
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 2.5 }}
        >
          <p className="text-xl md:text-2xl text-muted-foreground italic">
            {'"The badge on the front is more important than the name on the back."'}
          </p>
          <footer className="mt-4 text-primary tracking-widest text-sm">
            — MADRIDISTAS WORLDWIDE
          </footer>
        </motion.blockquote>
      </div>
    </section>
  )
}
