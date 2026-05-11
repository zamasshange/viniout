"use client"

import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Mail, Send, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Signature = {
  id: number
  name: string
  country: string | null
  createdAt: string
}

function LiveActivity({ signatures }: { signatures: Signature[] }) {
  const activities = signatures.map((signature) => {
    const countryText = signature.country ? ` from ${signature.country}` : ""
    return `${signature.name}${countryText} signed the petition`
  })

  if (activities.length === 0) {
    return <p className="text-sm text-muted-foreground">No signatures yet. Be the first supporter.</p>
  }

  return (
    <div className="space-y-2">
      <AnimatePresence mode="popLayout">
        {activities.map((activity, index) => (
          <motion.div
            key={`${activity}-${index}`}
            initial={{ opacity: 0, x: -20, height: 0 }}
            animate={{ opacity: 1, x: 0, height: "auto" }}
            exit={{ opacity: 0, x: 20, height: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span>{activity}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export function PetitionSection({
  onSign,
}: {
  onSign: (nextCount: number, signature: Signature) => void
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [formData, setFormData] = useState({ name: "", email: "", country: "", publicName: true })
  const [latestSignatures, setLatestSignatures] = useState<Signature[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const loadLiveActivity = async () => {
      try {
        const response = await fetch("/api/signatures?limit=5", { cache: "no-store" })
        if (!response.ok) return
        const data = await response.json()
        setLatestSignatures(data.latestSignatures ?? [])
      } catch {
        // Ignore UI errors and keep page usable.
      }
    }

    void loadLiveActivity()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email) return

    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch("/api/signatures", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data.error ?? "Could not submit signature")
      }

      const data = await response.json()
      const signature = data.signature as Signature

      setLatestSignatures((prev) => [signature, ...prev].slice(0, 5))
      onSign(data.totalSignatures, signature)
      setSubmitted(true)
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Could not submit signature. Please try again."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="petition" className="relative py-20 md:py-28 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed opacity-5"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2093')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      </div>

      {/* Spotlight effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4" ref={containerRef}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-primary uppercase tracking-[0.3em] text-sm">Make Your Voice Heard</span>
          <h2 
            className="text-5xl md:text-7xl lg:text-8xl font-bold mt-4 text-foreground"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            SIGN THE PETITION
          </h2>
          <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
            We’re pushing for <span className="text-foreground font-semibold">200,000</span> signatures. Your signature matters.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass rounded-3xl p-8"
          >
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground uppercase tracking-wider">Your Name</label>
                  <Input
                    type="text"
                    placeholder="Full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-secondary/50 border-border/50 h-14 text-lg placeholder:text-muted-foreground/50 focus:border-primary"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground uppercase tracking-wider">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-secondary/50 border-border/50 h-14 text-lg pl-12 placeholder:text-muted-foreground/50 focus:border-primary"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground uppercase tracking-wider">Country (Optional)</label>
                  <Input
                    type="text"
                    placeholder="Country"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="bg-secondary/50 border-border/50 h-14 text-lg placeholder:text-muted-foreground/50 focus:border-primary"
                  />
                </div>

                <label className="flex items-center gap-3 text-sm text-muted-foreground select-none">
                  <input
                    type="checkbox"
                    checked={!formData.publicName}
                    onChange={(e) => setFormData({ ...formData, publicName: !e.target.checked })}
                    className="h-4 w-4 accent-[color:var(--primary)]"
                  />
                  Hide my name from the public (your signature is still counted)
                </label>

                {error ? <p className="text-sm text-destructive">{error}</p> : null}

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-14 text-lg font-semibold group"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Signing...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Sign The Petition
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </Button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 mb-6">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2" style={{ fontFamily: "var(--font-bebas)" }}>
                  THANK YOU, {formData.name.toUpperCase()}!
                </h3>
                <p className="text-muted-foreground">
                  Your voice has been added to the movement. Together, we stand for Real Madrid.
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Live activity */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass rounded-3xl p-8"
          >
            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2" style={{ fontFamily: "var(--font-bebas)" }}>
              <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
              LIVE ACTIVITY
            </h3>
            <LiveActivity signatures={latestSignatures} />
            
            <div className="mt-8 pt-6 border-t border-border/30">
              <p className="text-muted-foreground text-sm">
                Join thousands of Madridistas who have already signed. Every signature counts.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
