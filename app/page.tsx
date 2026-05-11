"use client"

import { useState, useEffect } from "react"
import { HeroSection } from "@/components/hero-section"
import { StorySection } from "@/components/story-section"
import { StatsSection } from "@/components/stats-section"
import { PetitionSection } from "@/components/petition-section"
import { TimelineSection } from "@/components/timeline-section"
import { FinalSection } from "@/components/final-section"
import { Footer } from "@/components/footer"
import { LoadingScreen } from "@/components/loading-screen"
import { SoundToggle } from "@/components/sound-toggle"
import { SIGNATURE_DISPLAY_OFFSET } from "@/lib/signature-display-offset"

type Signature = {
  id: number
  name: string
  country: string | null
  createdAt: string
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [petitionCount, setPetitionCount] = useState(SIGNATURE_DISPLAY_OFFSET)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const loadSignatures = async () => {
      try {
        const response = await fetch("/api/signatures?limit=1", { cache: "no-store" })
        if (!response.ok) return
        const data = await response.json()
        setPetitionCount((data.totalSignatures ?? 0) + SIGNATURE_DISPLAY_OFFSET)
      } catch {
        // Keep UI available even if API is temporarily unavailable.
      }
    }

    void loadSignatures()
  }, [])

  const handleSign = (nextCount: number, _signature: Signature) => {
    setPetitionCount(nextCount + SIGNATURE_DISPLAY_OFFSET)
  }

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation overlay - subtle fixed nav */}
      <nav className="fixed top-0 left-0 right-0 z-40 py-4 px-6 bg-gradient-to-b from-background/80 to-transparent backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-xl font-bold text-gradient-gold cursor-pointer"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            VINÍCIUS OUT
          </button>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <button 
              onClick={() => document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' })}
              className="hover:text-primary transition-colors"
            >
              Story
            </button>
            <button 
              onClick={() => document.getElementById('stats')?.scrollIntoView({ behavior: 'smooth' })}
              className="hover:text-primary transition-colors"
            >
              Stats
            </button>
            <button 
              onClick={() => document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' })}
              className="hover:text-primary transition-colors"
            >
              Timeline
            </button>
            <button 
              onClick={() => document.getElementById('petition')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary hover:bg-primary/20 transition-colors"
            >
              Sign Petition
            </button>
          </div>
        </div>
      </nav>

      {/* Main content sections */}
      <HeroSection petitionCount={petitionCount} />
      <PetitionSection onSign={handleSign} />
      <StorySection />
      <StatsSection />
      <TimelineSection />
      <FinalSection />
      <Footer />

      {/* Sound toggle */}
      <SoundToggle />
    </main>
  )
}
