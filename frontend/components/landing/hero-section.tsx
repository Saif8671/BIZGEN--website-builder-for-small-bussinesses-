"use client"

import { motion } from "framer-motion"
import { ArrowRight, Play } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AIDemoPreview } from "./ai-demo-preview"

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-24 pb-16">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-accent/30 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm text-accent"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            AI-Powered Website Builder
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-8 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl"
          >
            Build Your Business
            <br />
            <span className="bg-gradient-to-r from-accent via-accent to-foreground bg-clip-text text-transparent">
              Website with AI
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground"
          >
            Create professional business websites in under 5 minutes using AI Chat, 
            Voice Commands, Flyer Scanning, and Smart Templates. No coding required.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link href="/signup">
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 gap-2 px-8">
                Start Free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="gap-2 border-border hover:bg-secondary">
              <Play className="h-4 w-4" />
              Watch Demo
            </Button>
          </motion.div>


        </div>

        {/* AI Demo Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16"
        >
          <AIDemoPreview />
        </motion.div>
      </div>
    </section>
  )
}
