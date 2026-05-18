"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ChevronLeft, Globe, Monitor, Palette, Plus, Save, Smartphone, Tablet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BuilderAIChat } from "./builder-ai-chat"
import { BuilderPreview } from "./builder-preview"
import { templates, type BuilderTemplate } from "./builder-templates"
import { getUserSiteById } from "@/lib/user-sites"
import type { WorkflowSiteDraft } from "@/lib/workflow-site"

type DeviceType = "desktop" | "tablet" | "mobile"

export function WebsiteBuilder() {
  const [device, setDevice] = useState<DeviceType>("desktop")
  const [newSectionTitle, setNewSectionTitle] = useState("")
  const searchParams = useSearchParams()
  const initialTemplateId = searchParams.get("template")
  const savedSiteId = searchParams.get("site")
  const initialTemplate = initialTemplateId
    ? templates.find((template) => template.id === parseInt(initialTemplateId))
    : null

  const [selectedTemplateId, setSelectedTemplateId] = useState<number | null>(initialTemplate?.id ?? null)
  const [previewData, setPreviewData] = useState<{
    name: string
    tagline: string
    sections: string[]
    pages: string[]
    palette?: BuilderTemplate["palette"]
    generatedUrl?: string
  }>({
    name: initialTemplate?.name || "",
    tagline: initialTemplate?.tagline || "",
    sections: initialTemplate?.previewSections.map((section) => section.title) || [],
    pages: initialTemplate?.pages || [],
    palette: initialTemplate?.palette,
    generatedUrl: undefined,
  })

  const selectedTemplate =
    templates.find((template) => template.id === selectedTemplateId) ?? initialTemplate ?? null

  useEffect(() => {
    if (!savedSiteId) {
      return
    }

    const savedSite = getUserSiteById(savedSiteId)
    if (!savedSite) {
      return
    }

    setPreviewData({
      name: savedSite.name,
      tagline: savedSite.tagline,
      sections: savedSite.sections,
      pages: savedSite.pages,
      generatedUrl: savedSite.generatedUrl,
      palette: initialTemplate?.palette,
    })
  }, [initialTemplate?.palette, savedSiteId])

  const handleAIGenerate = (data: WorkflowSiteDraft) => {
    setPreviewData({
      name: data.name,
      tagline: data.tagline,
      sections: data.sections,
      pages: data.pages.length ? data.pages : selectedTemplate?.pages || ["Home", "Services", "About", "Contact"],
      palette: selectedTemplate?.palette,
      generatedUrl: data.generatedUrl,
    })
  }

  const handleTemplateSelect = (template: BuilderTemplate) => {
    setSelectedTemplateId(template.id)
    setPreviewData((prev) => ({
      ...prev,
      tagline: prev.tagline || template.tagline,
      sections: prev.sections.length ? prev.sections : template.previewSections.map((section) => section.title),
      pages: template.pages,
      palette: template.palette,
      generatedUrl: undefined,
    }))
  }

  const handleContentChange = (field: "name" | "tagline", value: string) => {
    setPreviewData((prev) => ({
      ...prev,
      [field]: value,
      generatedUrl: undefined,
    }))
  }

  const handleSectionNameChange = (index: number, newName: string) => {
    setPreviewData((prev) => {
      const updatedSections = [...prev.sections]
      updatedSections[index] = newName

      return {
        ...prev,
        sections: updatedSections,
        generatedUrl: undefined,
      }
    })
  }

  const handleAddSection = () => {
    if (!newSectionTitle.trim()) return

    setPreviewData((prev) => ({
      ...prev,
      sections: [...prev.sections, newSectionTitle.trim()],
      generatedUrl: undefined,
    }))
    setNewSectionTitle("")
  }

  const pageMap = previewData.pages.length ? previewData.pages : ["Home", "Services", "About", "Contact"]

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(92,232,196,0.14),transparent_26%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.18),transparent_24%),linear-gradient(180deg,#040a14_0%,#0a1324_42%,#111c31_100%)]">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[rgba(4,10,20,0.76)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to dashboard
            </Link>
            <div className="hidden h-6 w-px bg-white/10 sm:block" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Builder studio</p>
              <p className="text-sm text-slate-300">Live website preview first, brief and sections underneath.</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 rounded-full border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
            >
              <Save className="h-4 w-4" />
              Save draft
            </Button>
            <Button
              size="sm"
              className="gap-2 rounded-full bg-[linear-gradient(135deg,rgba(92,232,196,0.95),rgba(53,126,247,0.95))] text-slate-950 hover:opacity-90"
            >
              <Globe className="h-4 w-4" />
              Publish later
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(10,18,34,0.92),rgba(13,24,42,0.88))] shadow-[0_30px_90px_rgba(2,6,23,0.45)] backdrop-blur">
          <div className="border-b border-white/10 px-6 py-6 sm:px-8">
            <div className="max-w-3xl">
              <h1 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Build the website while seeing the live preview.
              </h1>
              <p className="mt-3 text-sm leading-6 text-slate-400 sm:text-base">
                This Builder Studio now follows a simpler flow like your sketch: preview first, then business details,
                image upload, services, and page sections in one clean workspace.
              </p>
            </div>
          </div>

          <div className="px-6 py-6 sm:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  {previewData.generatedUrl ? "Generated website link" : "Live website preview"}
                </h2>
                <p className="text-sm text-slate-400">
                  {previewData.generatedUrl
                    ? "Open the workflow output directly from the link below."
                    : "Keep the draft visible while you shape the business brief."}
                </p>
              </div>

              {!previewData.generatedUrl ? (
                <div className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 shadow-sm">
                  <button
                    onClick={() => setDevice("desktop")}
                    className={`rounded-full p-2 transition-colors ${
                      device === "desktop"
                        ? "bg-[linear-gradient(135deg,rgba(92,232,196,0.95),rgba(53,126,247,0.95))] text-slate-950"
                        : "text-slate-400 hover:bg-white/10 hover:text-white"
                    }`}
                    aria-label="Desktop preview"
                  >
                    <Monitor className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setDevice("tablet")}
                    className={`rounded-full p-2 transition-colors ${
                      device === "tablet"
                        ? "bg-[linear-gradient(135deg,rgba(92,232,196,0.95),rgba(53,126,247,0.95))] text-slate-950"
                        : "text-slate-400 hover:bg-white/10 hover:text-white"
                    }`}
                    aria-label="Tablet preview"
                  >
                    <Tablet className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setDevice("mobile")}
                    className={`rounded-full p-2 transition-colors ${
                      device === "mobile"
                        ? "bg-[linear-gradient(135deg,rgba(92,232,196,0.95),rgba(53,126,247,0.95))] text-slate-950"
                        : "text-slate-400 hover:bg-white/10 hover:text-white"
                    }`}
                    aria-label="Mobile preview"
                  >
                    <Smartphone className="h-4 w-4" />
                  </button>
                </div>
              ) : null}
            </div>

            <div className="mt-5 rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(148,163,184,0.06))] p-4 shadow-inner sm:p-6">
              <BuilderPreview device={device} data={previewData} />
            </div>
          </div>

          <div className="border-t border-white/10 px-6 py-6 sm:px-8">
            <div className="grid gap-6 xl:grid-cols-[minmax(0,1.18fr)_minmax(300px,0.82fr)]">
              <section className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_20px_40px_rgba(2,6,23,0.24)] sm:p-6">
                <div className="mb-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Business brief</p>
                  <h3 className="mt-2 text-xl font-semibold text-white">Tell Builder Studio what to create</h3>
                  <p className="mt-2 text-sm text-slate-400">
                    Add the business name, choose the category, describe the brand, upload a reference image, and start
                    building.
                  </p>
                </div>

                <BuilderAIChat onGenerate={handleAIGenerate} />
              </section>

              <aside className="space-y-6">
                <section className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_20px_40px_rgba(2,6,23,0.24)]">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Control content</p>
                      <h3 className="mt-2 text-lg font-semibold text-white">Page sections</h3>
                    </div>
                    <span className="rounded-full border border-emerald-300/15 bg-emerald-300/10 px-3 py-1 text-xs text-emerald-200">
                      {previewData.sections.length} blocks
                    </span>
                  </div>

                  <div className="mt-5 space-y-4">
                    <div>
                      <label className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                        Business name
                      </label>
                      <Input
                        type="text"
                        placeholder="Saif Studio"
                        value={previewData.name}
                        onChange={(e) => handleContentChange("name", e.target.value)}
                        className="mt-2 h-11 rounded-2xl border-white/10 bg-white/5 text-white placeholder:text-slate-500"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                        Description
                      </label>
                      <Input
                        type="text"
                        placeholder="A quick one-line promise for the hero section"
                        value={previewData.tagline}
                        onChange={(e) => handleContentChange("tagline", e.target.value)}
                        className="mt-2 h-11 rounded-2xl border-white/10 bg-white/5 text-white placeholder:text-slate-500"
                      />
                    </div>

                    <div className="space-y-2">
                      {previewData.sections.map((section, index) => (
                        <Input
                          key={`${section}-${index}`}
                          type="text"
                          value={section}
                          onChange={(e) => handleSectionNameChange(index, e.target.value)}
                          className="h-10 rounded-2xl border-white/10 bg-white/5 text-white"
                        />
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <Input
                        type="text"
                        placeholder="Add page section"
                        value={newSectionTitle}
                        onChange={(e) => setNewSectionTitle(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleAddSection()}
                        className="h-10 rounded-2xl border-white/10 bg-white/5 text-white placeholder:text-slate-500"
                      />
                      <Button
                        size="icon"
                        className="h-10 w-10 rounded-2xl bg-[linear-gradient(135deg,rgba(92,232,196,0.95),rgba(53,126,247,0.95))] text-slate-950 hover:opacity-90"
                        onClick={handleAddSection}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </section>

                <section className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_20px_40px_rgba(2,6,23,0.24)]">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(92,232,196,0.14),rgba(53,126,247,0.16))] text-emerald-200">
                      <Palette className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Style presets</p>
                      <h3 className="mt-2 text-lg font-semibold text-white">Quick visual directions</h3>
                      <p className="mt-2 text-sm text-slate-400">
                        Pick a preset to change the preview mood without reopening a large template gallery.
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3">
                    {templates.slice(0, 4).map((template) => {
                      const isActive = template.id === selectedTemplate?.id

                      return (
                        <button
                          key={template.id}
                          onClick={() => handleTemplateSelect(template)}
                          className={`rounded-2xl border px-4 py-3 text-left transition ${
                            isActive
                              ? "border-emerald-300/20 bg-[linear-gradient(135deg,rgba(44,162,140,0.16),rgba(59,130,246,0.18))] text-white shadow-[inset_0_0_0_1px_rgba(148,163,184,0.16)]"
                              : "border-white/10 bg-white/5 text-slate-100 hover:border-slate-500"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <div className="font-medium">{template.name}</div>
                              <div className={`text-xs ${isActive ? "text-slate-300" : "text-slate-500"}`}>
                                {template.category}
                              </div>
                            </div>
                            <div
                              className={`h-3 w-3 rounded-full ${
                                isActive ? "bg-emerald-200" : template.palette.accent
                              }`}
                            />
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </section>

                <section className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_20px_40px_rgba(2,6,23,0.24)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Page map</p>
                  <h3 className="mt-2 text-lg font-semibold text-white">Current website pages</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {pageMap.map((page) => (
                      <span
                        key={page}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300"
                      >
                        {page}
                      </span>
                    ))}
                  </div>
                </section>
              </aside>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
