"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { 
  Sparkles, 
  MessageSquare, 
  Mic, 
  Camera, 
  Wand2, 
  FileText, 
  Image as ImageIcon,
  Globe,
  ArrowRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const aiTools = [
  {
    icon: MessageSquare,
    title: "AI Chat Builder",
    description: "Describe your business and let AI create your entire website",
    href: "/builder?mode=chat",
    color: "from-blue-500/20 to-blue-500/5",
  },
  {
    icon: Mic,
    title: "Voice Commands",
    description: "Build and edit your website using voice instructions",
    href: "/builder?mode=voice",
    color: "from-green-500/20 to-green-500/5",
  },
  {
    icon: Camera,
    title: "Flyer Scanner",
    description: "Scan business cards or flyers to auto-generate websites",
    href: "/builder?mode=scan",
    color: "from-orange-500/20 to-orange-500/5",
  },
  {
    icon: Wand2,
    title: "Smart Templates",
    description: "AI-powered templates that adapt to your content",
    href: "/dashboard/templates",
    color: "from-accent/20 to-accent/5",
  },
]

const aiCapabilities = [
  {
    icon: FileText,
    title: "Content Generation",
    description: "Generate business descriptions, taglines, and SEO content",
    credits: 2,
  },
  {
    icon: ImageIcon,
    title: "Image Suggestions",
    description: "AI recommends perfect images for your business type",
    credits: 3,
  },
  {
    icon: Globe,
    title: "Full Website",
    description: "Generate complete multi-page websites instantly",
    credits: 10,
  },
]

export function AIStudioContent() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null)

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/20">
            <Sparkles className="h-5 w-5 text-accent" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">AI Studio</h1>
        </div>
        <p className="text-muted-foreground">
          Powerful AI tools to build and enhance your websites
        </p>
      </motion.div>

      {/* AI Tools Grid */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">AI Building Tools</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {aiTools.map((tool, index) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={tool.href}>
                <Card className="group border-border bg-card hover:border-accent/50 transition-colors cursor-pointer overflow-hidden">
                  <CardContent className="p-6">
                    <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                    <div className="relative">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-foreground group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                          <tool.icon className="h-6 w-6" />
                        </div>
                        <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-1">{tool.title}</h3>
                      <p className="text-sm text-muted-foreground">{tool.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* AI Capabilities */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">AI Capabilities</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {aiCapabilities.map((capability, index) => (
            <motion.div
              key={capability.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <Card className="border-border bg-card">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                      <capability.icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">
                      {capability.credits} credits
                    </span>
                  </div>
                  <h3 className="font-medium text-foreground mb-1">{capability.title}</h3>
                  <p className="text-xs text-muted-foreground">{capability.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Credits Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card className="border-accent/30 bg-gradient-to-br from-accent/10 to-transparent">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-foreground mb-1">AI Credits</h3>
                <p className="text-sm text-muted-foreground">
                  You have 55 credits remaining this month
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-foreground">55</div>
                <div className="text-xs text-muted-foreground">of 100 credits</div>
              </div>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-secondary">
              <div className="h-full w-[55%] rounded-full bg-accent" />
            </div>
            <div className="mt-4 flex gap-3">
              <Link href="/dashboard/billing">
                <Button variant="outline" size="sm">
                  Get More Credits
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
