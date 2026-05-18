"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for trying out BizGen",
    features: [
      "1 Website",
      "BizGen branding",
      "Basic templates",
      "Limited AI credits (10/month)",
      "Community support",
    ],
    cta: "Start Free",
    popular: false,
  },
  {
    name: "Starter",
    price: "$19",
    period: "/month",
    description: "For small businesses ready to grow",
    features: [
      "5 Websites",
      "Custom domain",
      "Remove branding",
      "50 AI credits/month",
      "Priority support",
      "Basic analytics",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "$49",
    period: "/month",
    description: "For businesses that need more power",
    features: [
      "Unlimited websites",
      "Custom domain",
      "Advanced AI features",
      "Unlimited AI credits",
      "Advanced analytics",
      "A/B testing",
      "Team collaboration (3 seats)",
    ],
    cta: "Go Pro",
    popular: true,
  },
  {
    name: "Agency",
    price: "$149",
    period: "/month",
    description: "For agencies and professionals",
    features: [
      "Everything in Pro",
      "White-label mode",
      "Client management",
      "Unlimited team seats",
      "API access",
      "Dedicated support",
      "Custom integrations",
    ],
    cta: "Contact Sales",
    popular: false,
  },
]

export function PricingSection() {
  return (
    <section className="relative py-24">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-accent/10 blur-[100px]" />
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
            Pricing
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Simple, transparent pricing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-pretty text-muted-foreground"
          >
            Start for free and upgrade as you grow. No hidden fees, cancel anytime.
          </motion.p>
        </div>

        {/* Pricing Grid */}
        <div className="mt-16 grid gap-6 lg:grid-cols-4">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-2xl border p-6 ${
                plan.popular 
                  ? "border-accent bg-card shadow-lg shadow-accent/10" 
                  : "border-border bg-card"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>

              <ul className="mb-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="h-5 w-5 shrink-0 text-accent" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="/signup" className="block">
                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? "bg-accent text-accent-foreground hover:bg-accent/90" 
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {plan.cta}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
