"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Sparkles, Send } from "lucide-react"

const demoMessages = [
  { role: "user", content: "Create a restaurant website" },
  { role: "ai", content: "I'll create a modern restaurant website with an elegant menu, online reservations, and a photo gallery. Let me generate that for you..." },
]

const websitePreview = {
  name: "La Bella Cucina",
  tagline: "Authentic Italian Cuisine",
  sections: ["Hero", "Menu", "Gallery", "Reservations", "Contact"],
}

export function AIDemoPreview() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [showWebsite, setShowWebsite] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setCurrentMessageIndex(1)
      setIsTyping(true)
    }, 1500)

    const timer2 = setTimeout(() => {
      setIsTyping(false)
      setCurrentMessageIndex(2)
    }, 3000)

    const timer3 = setTimeout(() => {
      setShowWebsite(true)
    }, 3500)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [])

  return (
    <div className="mx-auto max-w-5xl">
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
        {/* Browser Chrome */}
        <div className="flex items-center gap-2 border-b border-border bg-secondary/50 px-4 py-3">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500/80" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <div className="h-3 w-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex-1 text-center">
            <div className="mx-auto inline-flex items-center gap-2 rounded-lg bg-background/50 px-4 py-1 text-xs text-muted-foreground">
              <Sparkles className="h-3 w-3" />
              BizGen AI Builder
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2">
          {/* Chat Panel */}
          <div className="border-r border-border p-6">
            <div className="mb-4 text-sm font-medium text-muted-foreground">AI Assistant</div>
            <div className="space-y-4 min-h-[280px]">
              {currentMessageIndex >= 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-end"
                >
                  <div className="max-w-[80%] rounded-2xl rounded-tr-md bg-accent/20 px-4 py-2 text-sm text-foreground">
                    {demoMessages[0].content}
                  </div>
                </motion.div>
              )}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <Sparkles className="h-4 w-4 animate-pulse text-accent" />
                  AI is generating...
                </motion.div>
              )}

              {currentMessageIndex >= 2 && !isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="max-w-[90%] rounded-2xl rounded-tl-md bg-secondary px-4 py-2 text-sm text-foreground">
                    {demoMessages[1].content}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2">
              <input
                type="text"
                placeholder="Describe your business..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              <button className="rounded-lg bg-accent p-2 text-accent-foreground hover:bg-accent/90">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="bg-background/50 p-6">
            <div className="mb-4 text-sm font-medium text-muted-foreground">Live Preview</div>
            <div className="relative min-h-[280px] overflow-hidden rounded-lg border border-border bg-card">
              {showWebsite ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="p-4"
                >
                  {/* Mini Website Preview */}
                  <div className="mb-4 flex items-center justify-between">
                    <div className="text-lg font-bold text-foreground">{websitePreview.name}</div>
                    <div className="flex gap-1">
                      {["Home", "Menu", "Contact"].map((item) => (
                        <span key={item} className="text-xs text-muted-foreground">{item}</span>
                      ))}
                    </div>
                  </div>
                  <div className="relative mb-4 h-24 overflow-hidden rounded-lg bg-gradient-to-br from-accent/20 to-secondary">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-xl font-bold text-foreground">{websitePreview.name}</div>
                        <div className="text-sm text-muted-foreground">{websitePreview.tagline}</div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {websitePreview.sections.slice(0, 3).map((section) => (
                      <div key={section} className="rounded-md bg-secondary/50 p-2 text-center text-xs text-muted-foreground">
                        {section}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <div className="flex h-full min-h-[280px] items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <Sparkles className="mx-auto h-8 w-8 animate-pulse text-accent" />
                    <p className="mt-2 text-sm">Waiting for input...</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
