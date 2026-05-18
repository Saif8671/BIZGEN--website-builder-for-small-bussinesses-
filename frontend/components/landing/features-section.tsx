"use client"

import { motion } from "framer-motion"
import { 
  Sparkles, 
  Mic, 
  Camera, 
  LayoutTemplate, 
  Smartphone, 
  Search, 
  Zap, 
  BarChart3 
} from "lucide-react"

const features = [
  {
    icon: Sparkles,
    title: "AI Website Generator",
    description: "Describe your business and watch AI create a complete website with content, images, and design.",
  },
  {
    icon: Mic,
    title: "Voice Website Builder",
    description: "Use voice commands to build and modify your website. Just speak and watch changes happen in real-time.",
  },
  {
    icon: Camera,
    title: "Flyer Scanner",
    description: "Scan business cards, flyers, or banners with your camera. AI extracts info and creates your website.",
  },
  {
    icon: LayoutTemplate,
    title: "Smart Templates",
    description: "Choose from 100+ industry-specific templates that adapt to your content and brand automatically.",
  },
  {
    icon: Smartphone,
    title: "Mobile Optimization",
    description: "Every website is fully responsive and optimized for mobile devices out of the box.",
  },
  {
    icon: Search,
    title: "SEO Ready",
    description: "Built-in SEO optimization ensures your business gets found on search engines.",
  },
  {
    icon: Zap,
    title: "One-click Publish",
    description: "Publish your website instantly with a custom domain. No technical setup required.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Track visitors, leads, and conversions with a comprehensive analytics dashboard.",
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function FeaturesSection() {
  return (
    <section id="features" className="relative scroll-mt-24 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-medium uppercase tracking-wider text-accent"
          >
            Features
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Everything you need to build your online presence
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-pretty text-muted-foreground"
          >
            Powerful AI tools combined with intuitive design to help any business owner 
            create a stunning website without any technical knowledge.
          </motion.p>
        </div>

        {/* Features Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={item}
              className="group relative rounded-2xl border border-border bg-card p-6 transition-colors hover:border-accent/50 hover:bg-card/80"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-semibold text-foreground">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
