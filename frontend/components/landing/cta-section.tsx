"use client"

import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-accent/30 bg-gradient-to-br from-accent/20 via-card to-card p-12 text-center lg:p-20"
        >
          {/* Background decoration */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-0 right-0 h-[300px] w-[300px] rounded-full bg-accent/20 blur-[100px]" />
            <div className="absolute bottom-0 left-0 h-[200px] w-[200px] rounded-full bg-accent/10 blur-[80px]" />
          </div>

          <div className="relative">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/20"
            >
              <Sparkles className="h-8 w-8 text-accent" />
            </motion.div>

            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Launch Your Website
              <br />
              <span className="text-accent">in Minutes</span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground">
              Join thousands of business owners who have transformed their online presence 
              with BizGen. Start building your professional website today.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/signup">
                <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 gap-2 px-8">
                  Get Started Free
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/#templates">
                <Button size="lg" variant="outline" className="border-border hover:bg-secondary">
                  Browse Templates
                </Button>
              </Link>
            </div>

            <p className="mt-6 text-sm text-muted-foreground">
              No credit card required. Start building in seconds.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
