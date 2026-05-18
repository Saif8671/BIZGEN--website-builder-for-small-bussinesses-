"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mic, MicOff, Sparkles, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface VoiceBuilderProps {
  onCommand: (command: string) => void
}

export function VoiceBuilder({ onCommand }: VoiceBuilderProps) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [isSupported, setIsSupported] = useState(true)
  const [feedback, setFeedback] = useState<string | null>(null)

  useEffect(() => {
    // Check for browser support
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || (window as { webkitSpeechRecognition?: typeof window.SpeechRecognition }).webkitSpeechRecognition
      if (!SpeechRecognition) {
        setIsSupported(false)
      }
    }
  }, [])

  const startListening = useCallback(() => {
    if (typeof window === "undefined") return

    const SpeechRecognition = window.SpeechRecognition || (window as { webkitSpeechRecognition?: typeof window.SpeechRecognition }).webkitSpeechRecognition
    if (!SpeechRecognition) return

    const recognition = new SpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = true
    recognition.lang = "en-US"

    recognition.onstart = () => {
      setIsListening(true)
      setTranscript("")
    }

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const current = event.resultIndex
      const result = event.results[current]
      const text = result[0].transcript

      setTranscript(text)

      if (result.isFinal) {
        processCommand(text)
      }
    }

    recognition.onerror = () => {
      setIsListening(false)
      setFeedback("Could not understand. Please try again.")
      setTimeout(() => setFeedback(null), 3000)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognition.start()
  }, [])

  const processCommand = (command: string) => {
    const lowerCommand = command.toLowerCase()

    // Parse voice commands
    if (lowerCommand.includes("change color") || lowerCommand.includes("make it")) {
      if (lowerCommand.includes("black") || lowerCommand.includes("dark")) {
        setFeedback("Changing theme to dark...")
        onCommand("theme:dark")
      } else if (lowerCommand.includes("blue")) {
        setFeedback("Changing primary color to blue...")
        onCommand("color:blue")
      } else if (lowerCommand.includes("green")) {
        setFeedback("Changing primary color to green...")
        onCommand("color:green")
      }
    } else if (lowerCommand.includes("add")) {
      if (lowerCommand.includes("testimonial")) {
        setFeedback("Adding testimonials section...")
        onCommand("add:testimonials")
      } else if (lowerCommand.includes("pricing")) {
        setFeedback("Adding pricing section...")
        onCommand("add:pricing")
      } else if (lowerCommand.includes("contact")) {
        setFeedback("Adding contact section...")
        onCommand("add:contact")
      } else if (lowerCommand.includes("gallery")) {
        setFeedback("Adding gallery section...")
        onCommand("add:gallery")
      }
    } else if (lowerCommand.includes("create") || lowerCommand.includes("build")) {
      setFeedback("Creating website based on your description...")
      onCommand(`create:${command}`)
    } else {
      setFeedback("Processing your request...")
      onCommand(command)
    }

    setTimeout(() => setFeedback(null), 3000)
  }

  if (!isSupported) {
    return (
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="flex items-center gap-3 text-muted-foreground">
          <MicOff className="h-5 w-5" />
          <span className="text-sm">Voice commands not supported in this browser</span>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Volume2 className="h-4 w-4 text-accent" />
          <span className="text-sm font-medium text-foreground">Voice Builder</span>
        </div>
        <Button
          size="sm"
          variant={isListening ? "destructive" : "default"}
          onClick={startListening}
          disabled={isListening}
          className={isListening ? "" : "bg-accent text-accent-foreground hover:bg-accent/90"}
        >
          {isListening ? (
            <>
              <MicOff className="h-4 w-4 mr-2" />
              Listening...
            </>
          ) : (
            <>
              <Mic className="h-4 w-4 mr-2" />
              Start Voice
            </>
          )}
        </Button>
      </div>

      <AnimatePresence mode="wait">
        {isListening && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4"
          >
            <div className="flex items-center justify-center gap-1 py-4">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    height: [8, 24, 8],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                  className="w-1 rounded-full bg-accent"
                />
              ))}
            </div>
            {transcript && (
              <p className="text-center text-sm text-muted-foreground italic">
                &quot;{transcript}&quot;
              </p>
            )}
          </motion.div>
        )}

        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 rounded-lg bg-accent/10 px-3 py-2"
          >
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-sm text-foreground">{feedback}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-4 text-xs text-muted-foreground">
        <p className="font-medium mb-1">Try saying:</p>
        <ul className="space-y-1 text-muted-foreground/80">
          <li>&quot;Create a restaurant website&quot;</li>
          <li>&quot;Add testimonials section&quot;</li>
          <li>&quot;Change color to blue&quot;</li>
          <li>&quot;Add pricing table&quot;</li>
        </ul>
      </div>
    </div>
  )
}
