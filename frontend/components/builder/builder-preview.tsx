"use client"

import { motion } from "framer-motion"
import { ExternalLink, Sparkles } from "lucide-react"

interface BuilderPreviewProps {
  device: "desktop" | "tablet" | "mobile"
  data: {
    name: string
    tagline: string
    sections: string[]
    pages?: string[]
    generatedUrl?: string
    palette?: {
      shell: string
      hero: string
      accent: string
      card: string
    }
  }
}

export function BuilderPreview({ device, data }: BuilderPreviewProps) {
  const deviceWidth = device === "desktop" ? "100%" : device === "tablet" ? "768px" : "375px"

  const hasContent = Boolean(data.generatedUrl || (data.name && data.sections.length > 0))

  return (
    <div className="flex h-full items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className={`overflow-hidden rounded-[26px] border border-white/10 shadow-[0_20px_60px_rgba(15,23,42,0.22)] bg-gradient-to-br ${data.palette?.shell || "from-slate-950 via-slate-900 to-slate-800"}`}
        style={{
          width: deviceWidth,
          maxWidth: "100%",
          height: device === "mobile" ? "667px" : "auto",
          minHeight: "500px",
        }}
      >
        {hasContent ? (
          data.generatedUrl ? (
            <div className="flex min-h-[500px] items-center justify-center bg-[linear-gradient(180deg,rgba(7,11,22,0.88),rgba(15,23,42,0.96))] p-8">
              <div className="w-full max-w-2xl rounded-[28px] border border-emerald-300/20 bg-[linear-gradient(180deg,rgba(16,185,129,0.12),rgba(59,130,246,0.1))] px-8 py-10 text-center shadow-sm">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-[linear-gradient(135deg,rgba(92,232,196,0.18),rgba(53,126,247,0.16))]">
                  <ExternalLink className="h-8 w-8 text-emerald-200" />
                </div>
                <h3 className="mb-2 text-2xl font-semibold text-white">Generated Site Ready</h3>
                <p className="mx-auto max-w-md text-sm leading-6 text-slate-300">
                  The workflow returned a live output link instead of embeddable preview HTML.
                </p>
                <p className="mt-5 break-all rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
                  {data.generatedUrl}
                </p>
                <div className="mt-6">
                  <a
                    href={data.generatedUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-slate-950 transition hover:opacity-90"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Open generated site
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full">
              <div
                className={`flex items-center justify-between border-b border-border/50 px-4 py-3 ${data.palette?.card || "bg-card"}`}
              >
                <div className="flex items-center gap-2">
                  <div className={`h-6 w-6 rounded ${data.palette?.accent || "bg-accent/20"}`} />
                  <span className="text-sm font-medium text-foreground">{data.name}</span>
                </div>
                <div className="flex gap-4 text-xs text-muted-foreground">
                  {(data.pages?.length ? data.pages : ["Home", "About", "Contact"]).map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>

              <div
                className={`relative border-2 border-transparent px-8 py-16 text-center transition-all group/section hover:border-accent/40 ${data.palette ? `bg-gradient-to-br ${data.palette.hero} text-white` : "bg-gradient-to-br from-accent/20 to-secondary"}`}
              >
                <span className="absolute top-2 right-2 text-[9px] font-semibold bg-background/90 text-foreground px-2 py-0.5 rounded shadow-sm opacity-0 group-hover/section:opacity-100 transition-opacity select-none">
                  Hero Section
                </span>
                <h1 className={`mb-4 text-2xl font-bold sm:text-3xl ${data.palette ? "text-white" : "text-foreground"}`}>
                  {data.name}
                </h1>
                <p className={`mb-6 ${data.palette ? "text-white/90" : "text-muted-foreground"}`}>{data.tagline}</p>
                <div className="flex justify-center gap-3">
                  <button
                    className={`rounded-lg px-4 py-2 text-sm ${data.palette ? "bg-white text-black font-medium" : "bg-foreground text-background"}`}
                  >
                    Get Started
                  </button>
                  <button
                    className={`rounded-lg border px-4 py-2 text-sm ${data.palette ? "border-white/50 text-white hover:bg-white/10" : "border-border text-foreground"}`}
                  >
                    Learn More
                  </button>
                </div>
              </div>

              <div className="space-y-6 p-6">
                {data.sections.slice(1).map((section, index) => (
                  <div
                    key={index}
                    className={`group/section relative rounded-lg border border-border/50 border-2 border-transparent p-4 transition-all hover:border-accent/40 ${data.palette?.card || "bg-card"}`}
                  >
                    <span className="absolute top-2 right-2 rounded bg-background/90 px-2 py-0.5 text-[9px] font-semibold text-foreground opacity-0 shadow-sm transition-opacity select-none group-hover/section:opacity-100">
                      {section || "Section"}
                    </span>
                    <h3 className="mb-2 text-sm font-semibold text-foreground">{section}</h3>
                    <div className={`grid gap-3 ${index % 2 === 0 ? "grid-cols-3" : "grid-cols-2"}`}>
                      {Array.from({ length: index % 2 === 0 ? 3 : 2 }).map((_, i) => (
                        <div key={i} className="aspect-video rounded bg-black/5" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        ) : (
          <div className="flex min-h-[500px] items-center justify-center bg-[linear-gradient(180deg,rgba(7,11,22,0.88),rgba(15,23,42,0.96))] p-8">
            <div className="w-full max-w-2xl rounded-[28px] border-2 border-dashed border-white/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(148,163,184,0.03))] px-8 py-14 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-[linear-gradient(135deg,rgba(92,232,196,0.18),rgba(53,126,247,0.16))]">
                <Sparkles className="h-8 w-8 text-emerald-200" />
              </div>
              <h3 className="mb-2 text-2xl font-semibold text-white">Start Building</h3>
              <p className="mx-auto max-w-md text-sm leading-6 text-slate-400">
                Fill the business brief below and Builder Studio will turn it into a first website draft here.
              </p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}
