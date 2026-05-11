"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Trophy, Shield, Users, TrendingUp } from "lucide-react"

const stats = [
  {
    icon: Trophy,
    value: 14,
    suffix: "",
    label: "Wins in 15 Games",
    description: "Dominant performance"
  },
  {
    icon: TrendingUp,
    value: 5,
    suffix: " pts",
    label: "Points Clear",
    description: "Commanding lead"
  },
  {
    icon: Shield,
    value: 93,
    suffix: "%",
    label: "Defensive Solidity",
    description: "Strong defensive football"
  },
  {
    icon: Users,
    value: 100,
    suffix: "%",
    label: "Team Unity",
    description: "Fans believed again"
  },
]

function AnimatedCounter({ value, suffix, isInView }: { value: number; suffix: string; isInView: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isInView, value])

  return (
    <span className="text-5xl md:text-6xl lg:text-7xl font-bold text-gradient-gold" style={{ fontFamily: "var(--font-bebas)" }}>
      {count}{suffix}
    </span>
  )
}

export function StatsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <section id="stats" className="relative py-32 md:py-48 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed opacity-10"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?q=80&w=2074')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4" ref={containerRef}>
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-primary uppercase tracking-[0.3em] text-sm">The Golden Era</span>
          <h2 
            className="text-5xl md:text-7xl lg:text-8xl font-bold mt-4 text-foreground"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            XABI ALONSO ERA
          </h2>
          <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
            A period of excellence, unity, and belief. The numbers speak for themselves.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group"
            >
              <div className="glass rounded-2xl p-8 h-full text-center relative overflow-hidden transition-all duration-500 hover:scale-105 hover:border-primary/30">
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/10 group-hover:via-primary/5 group-hover:to-transparent transition-all duration-500" />
                
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-6 group-hover:bg-primary/20 transition-colors">
                    <stat.icon className="w-7 h-7 text-primary" />
                  </div>
                  
                  <div className="mb-2">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} isInView={isInView} />
                  </div>
                  
                  <h3 className="text-foreground text-lg font-semibold mb-1">{stat.label}</h3>
                  <p className="text-muted-foreground text-sm">{stat.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional highlight */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="glass rounded-2xl px-8 py-6 inline-block">
            <p className="text-muted-foreground text-sm uppercase tracking-widest mb-2">The Verdict</p>
            <p className="text-2xl md:text-3xl font-bold text-foreground" style={{ fontFamily: "var(--font-bebas)" }}>
              DISCIPLINE. UNITY. <span className="text-gradient-gold">VICTORY.</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
