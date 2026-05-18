"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { 
  UtensilsCrossed, 
  Stethoscope, 
  Scissors, 
  Dumbbell, 
  GraduationCap, 
  Building2,
  Wrench,
  Car,
  Palette,
  ShoppingBag,
  PartyPopper,
  Home
} from "lucide-react"

const industries = [
  { icon: UtensilsCrossed, name: "Restaurants & Food", count: "25+ templates" },
  { icon: Scissors, name: "Beauty & Salon", count: "18+ templates" },
  { icon: ShoppingBag, name: "Fashion & Apparel", count: "22+ templates" },
  { icon: Dumbbell, name: "Fitness & Wellness", count: "15+ templates" },
  { icon: GraduationCap, name: "Education & Coaching", count: "20+ templates" },
  { icon: Stethoscope, name: "Healthcare", count: "16+ templates" },
  { icon: Wrench, name: "Home Services", count: "12+ templates" },
  { icon: Building2, name: "Real Estate", count: "14+ templates" },
  { icon: Car, name: "Automotive", count: "10+ templates" },
  { icon: Palette, name: "Digital & Creative", count: "18+ templates" },
  { icon: Home, name: "E-Commerce & D2C", count: "24+ templates" },
  { icon: PartyPopper, name: "Events & Entertainment", count: "12+ templates" },
]

export function IndustriesSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const x1 = useTransform(scrollYProgress, [0, 1], [0, -200])
  const x2 = useTransform(scrollYProgress, [0, 1], [-200, 0])

  return (
    <section ref={containerRef} className="relative overflow-hidden py-24">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/4 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-accent/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-medium uppercase tracking-wider text-accent"
          >
            Industry Templates
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Templates for every business
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-pretty text-muted-foreground"
          >
            From restaurants to real estate, we have templates designed specifically 
            for your industry with all the features you need.
          </motion.p>
        </div>

        {/* Scrolling Industries */}
        <div className="mt-16 space-y-4 overflow-hidden">
          {/* Row 1 */}
          <motion.div style={{ x: x1 }} className="flex gap-4">
            {[...industries.slice(0, 6), ...industries.slice(0, 6)].map((industry, index) => (
              <div
                key={`${industry.name}-${index}`}
                className="flex min-w-[280px] items-center gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-accent/50"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <industry.icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-medium text-foreground">{industry.name}</div>
                  <div className="text-sm text-muted-foreground">{industry.count}</div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Row 2 */}
          <motion.div style={{ x: x2 }} className="flex gap-4">
            {[...industries.slice(6), ...industries.slice(6)].map((industry, index) => (
              <div
                key={`${industry.name}-${index}`}
                className="flex min-w-[280px] items-center gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-accent/50"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <industry.icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-medium text-foreground">{industry.name}</div>
                  <div className="text-sm text-muted-foreground">{industry.count}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
