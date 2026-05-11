"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export function FinalSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <section className="relative py-32 md:py-48 lg:py-64 overflow-hidden">
      {/* Dramatic background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=2070')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/70" />
      </div>

      {/* Stadium light effects */}
      <div className="absolute top-0 left-1/4 w-64 h-[600px] bg-primary/5 blur-[100px] transform -rotate-12" />
      <div className="absolute top-0 right-1/4 w-64 h-[600px] bg-primary/5 blur-[100px] transform rotate-12" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.p
            className="text-primary uppercase tracking-[0.4em] text-sm md:text-base mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            Remember
          </motion.p>

          <motion.h2
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold text-gradient-gold leading-none"
            style={{ fontFamily: "var(--font-bebas)" }}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            THE SHIRT
          </motion.h2>

          <motion.h2
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold text-foreground leading-none mt-2"
            style={{ fontFamily: "var(--font-bebas)" }}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            IS SACRED.
          </motion.h2>

          <motion.div
            className="mt-12"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.2 }}
          >
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-8" />
            <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              No player is bigger than{" "}
              <span className="text-foreground font-semibold">Real Madrid</span>.
            </p>
          </motion.div>

          {/* Final CTA */}
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.5 }}
          >
            <button
              onClick={() => document.getElementById('petition')?.scrollIntoView({ behavior: 'smooth' })}
              className="glass px-12 py-6 rounded-full text-primary text-lg uppercase tracking-widest hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 group"
            >
              <span className="flex items-center gap-3">
                Join The Movement
                <svg 
                  className="w-5 h-5 group-hover:translate-x-2 transition-transform" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
