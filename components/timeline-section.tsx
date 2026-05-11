"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Star, TrendingUp, Trophy, Users, AlertTriangle, Flag } from "lucide-react"

const timelineEvents = [
  {
    icon: Star,
    date: "Season Start",
    title: "Xabi Arrives",
    description: "A new era begins with tactical brilliance and renewed hope.",
    color: "text-primary"
  },
  {
    icon: TrendingUp,
    date: "Early Season",
    title: "Madrid Improves",
    description: "Visible improvements in team cohesion and defensive structure.",
    color: "text-green-500"
  },
  {
    icon: Trophy,
    date: "Mid Season",
    title: "Winning Streak",
    description: "14 wins in 15 games. The team is unstoppable.",
    color: "text-primary"
  },
  {
    icon: Users,
    date: "Peak",
    title: "Fans United",
    description: "The Bernabéu roars again. Belief is restored.",
    color: "text-blue-500"
  },
  {
    icon: AlertTriangle,
    date: "Recent",
    title: "Crisis Begins",
    description: "Individual egos threaten team unity and success.",
    color: "text-accent"
  },
  {
    icon: Flag,
    date: "Now",
    title: "Movement Launched",
    description: "Fans unite to protect the club&apos;s identity and future.",
    color: "text-primary"
  },
]

export function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <section id="timeline" className="relative py-32 md:py-48 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />

      <div className="relative z-10 max-w-6xl mx-auto px-4" ref={containerRef}>
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-primary uppercase tracking-[0.3em] text-sm">The Journey</span>
          <h2 
            className="text-5xl md:text-7xl lg:text-8xl font-bold mt-4 text-foreground"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            THE TIMELINE
          </h2>
          <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
            How we got here. A story of hope, triumph, and the fight to protect our club.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <motion.div 
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent md:-translate-x-1/2"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ transformOrigin: "top" }}
          />

          <div className="space-y-8 md:space-y-0">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative flex items-center md:justify-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content card */}
                <div className={`ml-12 md:ml-0 md:w-5/12 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <div className="glass rounded-2xl p-6 group hover:border-primary/30 transition-all duration-300">
                    <span className="text-primary text-sm uppercase tracking-widest">{event.date}</span>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground mt-2" style={{ fontFamily: "var(--font-bebas)" }}>
                      {event.title}
                    </h3>
                    <p className="text-muted-foreground mt-2">{event.description}</p>
                  </div>
                </div>

                {/* Icon */}
                <motion.div 
                  className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-8 h-8 rounded-full bg-secondary border-2 border-primary/50 flex items-center justify-center z-10"
                  whileHover={{ scale: 1.2, borderColor: "var(--primary)" }}
                >
                  <event.icon className={`w-4 h-4 ${event.color}`} />
                </motion.div>

                {/* Empty space for other side */}
                <div className="hidden md:block md:w-5/12" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
