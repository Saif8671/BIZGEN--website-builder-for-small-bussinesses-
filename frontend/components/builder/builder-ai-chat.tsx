"use client"

import { useState } from "react"
import { ImagePlus, Loader2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/hooks/use-auth"
import { buildSiteDomain, saveUserSite } from "@/lib/user-sites"
import { extractWorkflowSiteDraft, type WorkflowSiteDraft } from "@/lib/workflow-site"

interface BuilderAIChatProps {
  onGenerate: (data: WorkflowSiteDraft) => void
}

const inputMethodOptions = [
  { value: "Image Upload", label: "Upload image" },
  { value: "Manual Input", label: "Manual input" },
]

const industryOptions = [
  "Restaurant",
  "Salon & Beauty",
  "Fitness",
  "Healthcare",
  "Real Estate",
  "Education",
  "E-Commerce",
  "Other",
]

export function BuilderAIChat({ onGenerate }: BuilderAIChatProps) {
  const [businessName, setBusinessName] = useState("")
  const [industry, setIndustry] = useState("")
  const [customIndustry, setCustomIndustry] = useState("")
  const [description, setDescription] = useState("")
  const [services, setServices] = useState("")
  const [inputMethod, setInputMethod] = useState("Image Upload")
  const [customSections, setCustomSections] = useState(false)
  const [websiteImage, setWebsiteImage] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { profile } = useAuth()

  const requiresWebsiteImage = inputMethod === "Image Upload"
  const resolvedIndustry = industry === "Other" ? customIndustry.trim() : industry
  const fallbackSections = customSections
    ? ["Hero", "Services", "Why Choose Us", "Testimonials", "Contact"]
    : ["Hero", "Services", "About", "Contact"]
  const fallbackPages = ["Home", "Services", "About", "Contact"]

  const handleSubmit = async () => {
    if (isLoading) return
    if (!profile) {
      alert("Please log in to run the workflow.")
      return
    }

    if (!businessName.trim() || !resolvedIndustry || !description.trim() || !services.trim()) {
      alert("Please fill in the business name, industry, description, and services.")
      return
    }

    if (requiresWebsiteImage && !websiteImage) {
      alert("Please upload a reference image before starting the build.")
      return
    }

    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.set("business_name", businessName)
      formData.set("industry", resolvedIndustry)
      formData.set("description", description)
      formData.set("services", services)
      formData.set("input_method", inputMethod)
      formData.set("custom_sections", String(customSections))
      if (websiteImage) {
        formData.set("website_image", websiteImage)
      }

      const response = await fetch("/api/supervity/workflow", {
        method: "POST",
        body: formData,
      })

      const payload = await response.json()

      if (!response.ok) {
        throw new Error(payload.error || "Workflow request failed.")
      }

      const siteDraft = extractWorkflowSiteDraft(payload, {
        name: businessName.trim(),
        tagline: description.trim(),
        sections: fallbackSections,
        pages: fallbackPages,
      })

      if (!siteDraft.generatedUrl && typeof payload.raw === "string") {
        console.warn("Workflow finished without a detected generated URL.", payload.raw)
      }

      const now = new Date().toISOString()
      saveUserSite({
        id: typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}`,
        ownerId: profile.id,
        name: siteDraft.name,
        domain: buildSiteDomain(siteDraft.name),
        status: "draft",
        lastUpdated: now,
        createdAt: now,
        views: 0,
        template: resolvedIndustry,
        tagline: siteDraft.tagline,
        sections: siteDraft.sections,
        pages: siteDraft.pages,
        generatedUrl: siteDraft.generatedUrl,
      })

      onGenerate(siteDraft)
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unexpected workflow error."
      alert(`I couldn't run the workflow: ${message}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-5">
      <div className="rounded-[24px] border border-white/10 bg-white/[0.05] p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(92,232,196,0.95),rgba(53,126,247,0.95))] text-slate-950">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Builder workflow</p>
            <p className="mt-1 text-sm text-slate-400">
              Fill the details below and we will send them to your Supervity workflow.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
            Business name
          </label>
          <Input
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="Saif Studio"
            className="mt-2 h-11 rounded-2xl border-white/10 bg-white/5 text-white placeholder:text-slate-500"
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
            Build mode
          </label>
          <Select value={inputMethod} onValueChange={setInputMethod} disabled={isLoading}>
            <SelectTrigger className="mt-2 h-11 rounded-2xl border-white/10 bg-white/5 text-white">
              <SelectValue placeholder="Choose a build mode" />
            </SelectTrigger>
            <SelectContent>
              {inputMethodOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="sm:col-span-2">
          <label className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
            Choose your business category / industry
          </label>
          <Select value={industry} onValueChange={setIndustry} disabled={isLoading}>
            <SelectTrigger className="mt-2 h-11 rounded-2xl border-white/10 bg-white/5 text-white">
              <SelectValue placeholder="Select an industry" />
            </SelectTrigger>
            <SelectContent>
              {industryOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {industry === "Other" ? (
          <div className="sm:col-span-2">
            <label className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
              Custom industry
            </label>
            <Input
              value={customIndustry}
              onChange={(e) => setCustomIndustry(e.target.value)}
              placeholder="Type your industry"
              className="mt-2 h-11 rounded-2xl border-white/10 bg-white/5 text-white placeholder:text-slate-500"
              disabled={isLoading}
            />
          </div>
        ) : null}

        <div className="sm:col-span-2">
          <label className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
            Description
          </label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the business, the target audience, and the overall vibe you want."
            className="mt-2 min-h-28 resize-none rounded-[24px] border-white/10 bg-white/5 text-white placeholder:text-slate-500"
            disabled={isLoading}
          />
        </div>

        <div className="sm:col-span-2">
          <label className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
            Services
          </label>
          <Textarea
            value={services}
            onChange={(e) => setServices(e.target.value)}
            placeholder="Haircuts, skincare, bridal makeup, consultation, training..."
            className="mt-2 min-h-24 resize-none rounded-[24px] border-white/10 bg-white/5 text-white placeholder:text-slate-500"
            disabled={isLoading}
          />
        </div>

        <div className="sm:col-span-2">
          <label className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
            {requiresWebsiteImage ? "Upload image" : "Upload image (optional)"}
          </label>
          <label className="mt-2 flex cursor-pointer items-center gap-3 rounded-[24px] border border-dashed border-white/15 bg-white/5 px-4 py-4 text-sm text-slate-300 transition hover:border-emerald-300/30 hover:bg-white/8">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(92,232,196,0.14),rgba(53,126,247,0.16))] text-emerald-200">
              <ImagePlus className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-medium text-white">{websiteImage ? websiteImage.name : "Choose reference image"}</div>
              <div className="truncate text-xs text-slate-500">
                {requiresWebsiteImage
                  ? "Image upload is required for image-led building."
                  : "Add an image if you want the workflow to use one."}
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              disabled={isLoading}
              onChange={(e) => setWebsiteImage(e.target.files?.[0] ?? null)}
            />
          </label>
        </div>
      </div>

      <div className="rounded-[24px] border border-white/10 bg-white/[0.05] p-4">
        <label className="flex items-start gap-3 text-sm text-slate-300">
          <Checkbox
            checked={customSections}
            onCheckedChange={(checked) => setCustomSections(checked === true)}
            disabled={isLoading}
          />
          <span>
            <span className="block font-medium text-white">Content control</span>
            <span className="mt-1 block text-slate-400">
              Let the builder include extra sections beyond the basic hero, services, about, and contact structure.
            </span>
          </span>
        </label>
      </div>

      <Button
        className="h-12 w-full rounded-full bg-[linear-gradient(135deg,rgba(92,232,196,0.95),rgba(53,126,247,0.95))] text-slate-950 hover:opacity-90"
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="inline-flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Starting build...
          </span>
        ) : (
          "Start building"
        )}
      </Button>
    </div>
  )
}
