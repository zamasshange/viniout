"use client"

import { motion } from "framer-motion"
import { Twitter, Instagram, Facebook, Youtube } from "lucide-react"

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Youtube, href: "#", label: "YouTube" },
]

export function Footer() {
  return (
    <footer className="relative py-16 border-t border-border/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo/Brand */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <h3 
              className="text-3xl font-bold text-gradient-gold"
              style={{ fontFamily: "var(--font-bebas)" }}
            >
              VINÍCIUS OUT
            </h3>
            <p className="text-muted-foreground text-sm mt-1">A Fan Movement</p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-4"
          >
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                aria-label={social.label}
                className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </motion.div>

          {/* Navigation */}
          <motion.nav
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground"
          >
            <button 
              onClick={() => document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' })}
              className="hover:text-primary transition-colors"
            >
              Our Story
            </button>
            <button 
              onClick={() => document.getElementById('stats')?.scrollIntoView({ behavior: 'smooth' })}
              className="hover:text-primary transition-colors"
            >
              Stats
            </button>
            <button 
              onClick={() => document.getElementById('voices')?.scrollIntoView({ behavior: 'smooth' })}
              className="hover:text-primary transition-colors"
            >
              Fan Voices
            </button>
            <button 
              onClick={() => document.getElementById('petition')?.scrollIntoView({ behavior: 'smooth' })}
              className="hover:text-primary transition-colors"
            >
              Sign Petition
            </button>
          </motion.nav>
        </div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 pt-8 border-t border-border/20 text-center"
        >
          <p className="text-muted-foreground/60 text-xs max-w-2xl mx-auto">
            <strong>Disclaimer:</strong> This is a fan-made opinion/parody website. It is not affiliated with, 
            endorsed by, or connected to Real Madrid C.F. or any of its players. All content is for satirical 
            and entertainment purposes only.
          </p>
          <p className="text-muted-foreground/40 text-xs mt-4">
            © {new Date().getFullYear()} VINÍCIUS OUT Movement. Made with passion by Madridistas.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
