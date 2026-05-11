"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Quote, Heart, MessageCircle, Share2 } from "lucide-react"

const fanComments = [
  {
    text: "No player is bigger than the badge.",
    author: "MadridFan_1902",
    location: "Madrid, Spain",
    likes: 2341,
    time: "2h ago"
  },
  {
    text: "Madrid comes first. Always has, always will.",
    author: "HalaMadridForever",
    location: "London, UK",
    likes: 1892,
    time: "3h ago"
  },
  {
    text: "We want passion and discipline. Not divas.",
    author: "BernabeuUltra",
    location: "Barcelona, Spain",
    likes: 3124,
    time: "4h ago"
  },
  {
    text: "The club identity matters more than any individual fame.",
    author: "RealMadridista_",
    location: "New York, USA",
    likes: 2756,
    time: "5h ago"
  },
  {
    text: "We&apos;ve seen legends come and go. The club remains eternal.",
    author: "WhiteKnight_RM",
    location: "São Paulo, Brazil",
    likes: 1567,
    time: "6h ago"
  },
  {
    text: "Respect the history. Respect the fans. Respect the badge.",
    author: "MadristaForLife",
    location: "Tokyo, Japan",
    likes: 2089,
    time: "7h ago"
  },
]

function FanCard({ comment, index }: { comment: typeof fanComments[0]; index: number }) {
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(comment.likes)

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1)
    } else {
      setLikes(likes + 1)
    }
    setLiked(!liked)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="glass rounded-2xl p-6 min-w-[300px] md:min-w-[400px] flex-shrink-0 hover:border-primary/30 transition-all duration-300 group"
    >
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center flex-shrink-0">
          <span className="text-primary font-bold text-sm">{comment.author[0]}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-foreground truncate">@{comment.author}</p>
          <p className="text-muted-foreground text-sm truncate">{comment.location} · {comment.time}</p>
        </div>
        <Quote className="w-5 h-5 text-primary/50 flex-shrink-0" />
      </div>

      <p className="text-foreground text-lg mb-6 leading-relaxed">{`"${comment.text}"`}</p>

      <div className="flex items-center gap-6 text-muted-foreground">
        <button 
          onClick={handleLike}
          className={`flex items-center gap-2 transition-colors ${liked ? 'text-red-accent' : 'hover:text-primary'}`}
        >
          <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
          <span className="text-sm">{likes.toLocaleString()}</span>
        </button>
        <button className="flex items-center gap-2 hover:text-primary transition-colors">
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm">Reply</span>
        </button>
        <button className="flex items-center gap-2 hover:text-primary transition-colors">
          <Share2 className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  )
}

export function FanVoicesSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [scrollPosition, setScrollPosition] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let animationId: number
    let direction = 1

    const animate = () => {
      if (!scrollContainer) return
      
      const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth
      
      setScrollPosition(prev => {
        let newPos = prev + direction * 0.5
        
        if (newPos >= maxScroll) {
          direction = -1
        } else if (newPos <= 0) {
          direction = 1
        }
        
        return newPos
      })
      
      animationId = requestAnimationFrame(animate)
    }

    const handleMouseEnter = () => {
      cancelAnimationFrame(animationId)
    }

    const handleMouseLeave = () => {
      animationId = requestAnimationFrame(animate)
    }

    scrollContainer.addEventListener('mouseenter', handleMouseEnter)
    scrollContainer.addEventListener('mouseleave', handleMouseLeave)
    
    animationId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationId)
      scrollContainer?.removeEventListener('mouseenter', handleMouseEnter)
      scrollContainer?.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollPosition
    }
  }, [scrollPosition])

  return (
    <section id="voices" className="relative py-32 md:py-48 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />

      <div className="relative z-10" ref={containerRef}>
        <motion.div
          className="text-center mb-16 px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-primary uppercase tracking-[0.3em] text-sm">The People Speak</span>
          <h2 
            className="text-5xl md:text-7xl lg:text-8xl font-bold mt-4 text-foreground"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            FAN VOICES
          </h2>
          <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
            Thousands of Madridistas worldwide are speaking up. Here are some of their voices.
          </p>
        </motion.div>

        {/* Scrolling cards */}
        <div 
          ref={scrollRef}
          className="flex gap-6 px-4 md:px-8 overflow-x-auto hide-scrollbar pb-4 cursor-grab active:cursor-grabbing"
        >
          {fanComments.map((comment, index) => (
            <FanCard key={index} comment={comment} index={index} />
          ))}
          {/* Duplicate for seamless scroll */}
          {fanComments.map((comment, index) => (
            <FanCard key={`dup-${index}`} comment={comment} index={index + fanComments.length} />
          ))}
        </div>

        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
      </div>
    </section>
  )
}
