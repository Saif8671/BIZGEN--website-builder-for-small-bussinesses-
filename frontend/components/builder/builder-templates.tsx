"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

const templateCategories = [
  "All",
  "Restaurant",
  "Beauty",
  "Fitness",
  "Healthcare",
  "Real Estate",
  "Education",
  "E-Commerce",
]

type TemplatePreviewSection = {
  title: string
  lines: string[]
}

export type BuilderTemplate = {
  id: number
  name: string
  category: string
  tagline: string
  palette: {
    shell: string
    hero: string
    accent: string
    card: string
  }
  pages: string[]
  previewSections: TemplatePreviewSection[]
}

export const templates: BuilderTemplate[] = [
  {
    id: 1,
    name: "Modern Restaurant",
    category: "Restaurant",
    tagline: "Fresh dishes, easy reservations, and a menu that sells the experience.",
    palette: {
      shell: "from-orange-50 via-white to-amber-50",
      hero: "from-orange-500 to-red-500",
      accent: "bg-orange-500",
      card: "bg-orange-100/80",
    },
    pages: ["Home", "Menu", "Reservations", "Contact"],
    previewSections: [
      { title: "Chef specials", lines: ["Seasonal tasting menu", "Reserve in one tap"] },
      { title: "Signature dishes", lines: ["Handmade pasta", "Wood-fired mains", "Desserts"] },
      { title: "Guest reviews", lines: ["4.9 average rating", "Loved by locals"] },
    ],
  },
  {
    id: 2,
    name: "Elegant Salon",
    category: "Beauty",
    tagline: "Show services, stylists, and online booking in a polished beauty layout.",
    palette: {
      shell: "from-rose-50 via-white to-pink-50",
      hero: "from-pink-500 to-rose-500",
      accent: "bg-pink-500",
      card: "bg-rose-100/80",
    },
    pages: ["Home", "Services", "Team", "Book Now"],
    previewSections: [
      { title: "Featured services", lines: ["Hair styling", "Skin treatments"] },
      { title: "Meet the team", lines: ["Senior stylists", "Color experts", "Bridal looks"] },
      { title: "Book online", lines: ["Live availability", "Instant confirmation"] },
    ],
  },
  {
    id: 3,
    name: "Fitness Studio",
    category: "Fitness",
    tagline: "Drive class signups with bold schedules, memberships, and trainer highlights.",
    palette: {
      shell: "from-emerald-50 via-white to-lime-50",
      hero: "from-green-500 to-emerald-600",
      accent: "bg-green-500",
      card: "bg-green-100/80",
    },
    pages: ["Home", "Classes", "Trainers", "Membership"],
    previewSections: [
      { title: "Today’s classes", lines: ["HIIT", "Strength", "Yoga flow"] },
      { title: "Trainer spotlight", lines: ["Certified coaches", "Progress plans"] },
      { title: "Membership plans", lines: ["Monthly passes", "Free trial week"] },
    ],
  },
  {
    id: 4,
    name: "Medical Clinic",
    category: "Healthcare",
    tagline: "A calm clinic site for appointments, services, and patient trust signals.",
    palette: {
      shell: "from-sky-50 via-white to-cyan-50",
      hero: "from-blue-500 to-cyan-500",
      accent: "bg-blue-500",
      card: "bg-blue-100/80",
    },
    pages: ["Home", "Doctors", "Services", "Appointments"],
    previewSections: [
      { title: "Care services", lines: ["Primary care", "Diagnostics", "Telehealth"] },
      { title: "Trusted providers", lines: ["Experienced doctors", "Patient-first care"] },
      { title: "Book a visit", lines: ["Same-day options", "Insurance accepted"] },
    ],
  },
  {
    id: 5,
    name: "Real Estate Pro",
    category: "Real Estate",
    tagline: "Highlight listings, neighborhoods, and agent expertise in a premium layout.",
    palette: {
      shell: "from-amber-50 via-white to-yellow-50",
      hero: "from-amber-500 to-yellow-600",
      accent: "bg-amber-500",
      card: "bg-amber-100/80",
    },
    pages: ["Home", "Listings", "Neighborhoods", "Agents"],
    previewSections: [
      { title: "Featured listings", lines: ["Luxury homes", "Modern apartments"] },
      { title: "Market insights", lines: ["Area guides", "Recent sales", "Buyer tips"] },
      { title: "Agent contact", lines: ["Schedule tours", "Request valuation"] },
    ],
  },
  {
    id: 6,
    name: "Online Academy",
    category: "Education",
    tagline: "Turn courses and coaching into a clean, conversion-focused learning site.",
    palette: {
      shell: "from-violet-50 via-white to-indigo-50",
      hero: "from-indigo-500 to-violet-500",
      accent: "bg-indigo-500",
      card: "bg-indigo-100/80",
    },
    pages: ["Home", "Courses", "Instructors", "Enroll"],
    previewSections: [
      { title: "Top programs", lines: ["Career tracks", "Live workshops"] },
      { title: "Learning format", lines: ["Video lessons", "Projects", "Certificates"] },
      { title: "Enroll today", lines: ["Flexible plans", "Student community"] },
    ],
  },
  {
    id: 7,
    name: "Fashion Store",
    category: "E-Commerce",
    tagline: "Merchandising-first storefront with collections, offers, and product focus.",
    palette: {
      shell: "from-stone-50 via-white to-zinc-100",
      hero: "from-zinc-900 to-zinc-700",
      accent: "bg-zinc-900",
      card: "bg-zinc-200/80",
    },
    pages: ["Home", "Collections", "New Arrivals", "Cart"],
    previewSections: [
      { title: "Seasonal drop", lines: ["New arrivals", "Limited offers"] },
      { title: "Best sellers", lines: ["Dresses", "Outerwear", "Accessories"] },
      { title: "Shop benefits", lines: ["Fast shipping", "Easy returns"] },
    ],
  },
  {
    id: 8,
    name: "Cafe Minimal",
    category: "Restaurant",
    tagline: "A lighter cafe-style homepage with featured drinks, story, and visit info.",
    palette: {
      shell: "from-amber-50 via-white to-orange-50",
      hero: "from-amber-700 to-orange-500",
      accent: "bg-amber-700",
      card: "bg-amber-100/80",
    },
    pages: ["Home", "Menu", "Story", "Visit"],
    previewSections: [
      { title: "Today’s pours", lines: ["Single-origin coffee", "Bakery pairings"] },
      { title: "Our story", lines: ["Local roastery", "Warm neighborhood vibe"] },
      { title: "Plan your visit", lines: ["Opening hours", "Find us downtown"] },
    ],
  },
]

function TemplateThumbnail({ template }: { template: BuilderTemplate }) {
  return (
    <div className={`aspect-[4/3] overflow-hidden bg-gradient-to-br ${template.palette.shell}`}>
      <div className="flex h-full flex-col p-2.5">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className={`h-2.5 w-2.5 rounded-full ${template.palette.accent}`} />
            <div className="text-[8px] font-semibold uppercase tracking-[0.18em] text-slate-700">
              {template.category}
            </div>
          </div>
          <div className="flex gap-1">
            <div className="h-1.5 w-1.5 rounded-full bg-slate-300" />
            <div className="h-1.5 w-1.5 rounded-full bg-slate-300" />
          </div>
        </div>

        <div className={`rounded-xl bg-gradient-to-r ${template.palette.hero} px-3 py-2.5 text-white shadow-sm`}>
          <div className="max-w-[70%] text-[9px] font-semibold leading-tight">{template.name}</div>
          <div className="mt-1 max-w-[78%] text-[7px] leading-tight text-white/80">
            {template.tagline}
          </div>
          <div className="mt-2 flex gap-1.5">
            <div className="h-3 w-12 rounded-full bg-white/90" />
            <div className="h-3 w-9 rounded-full bg-white/25" />
          </div>
        </div>

        <div className="mt-2 grid flex-1 gap-2">
          {template.previewSections.slice(0, 2).map((section) => (
            <div key={section.title} className={`rounded-lg ${template.palette.card} p-2 text-left`}>
              <div className="text-[8px] font-semibold text-slate-800">{section.title}</div>
              <div className="mt-1 space-y-1">
                {section.lines.slice(0, 2).map((line) => (
                  <div key={line} className="h-1.5 rounded-full bg-white/80" style={{ width: `${Math.max(45, Math.min(92, line.length * 4))}%` }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

interface BuilderTemplatesProps {
  selectedCategory: string
  searchQuery: string
  onCategoryChange: (category: string) => void
  onSearchQueryChange: (query: string) => void
  onTemplateSelect: (template: BuilderTemplate) => void
}

export function BuilderTemplates({
  selectedCategory,
  searchQuery,
  onCategoryChange,
  onSearchQueryChange,
  onTemplateSelect,
}: BuilderTemplatesProps) {
  const filteredTemplates = templates.filter((template) => {
    const matchesCategory = selectedCategory === "All" || template.category === selectedCategory
    const query = searchQuery.toLowerCase()
    const matchesSearch =
      template.name.toLowerCase().includes(query) ||
      template.category.toLowerCase().includes(query)

    return matchesCategory && matchesSearch
  })

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-border p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            className="border-border bg-background pl-9"
          />
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto border-b border-border p-4">
        {templateCategories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              selectedCategory === category
                ? "bg-accent text-accent-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-auto p-4">
        <div className="grid grid-cols-2 gap-3">
          {filteredTemplates.map((template) => (
            <button
              key={template.id}
              onClick={() => onTemplateSelect(template)}
              className="group overflow-hidden rounded-lg border border-border bg-background text-left transition-colors hover:border-accent/50"
            >
              <div className="relative">
                <TemplateThumbnail template={template} />
                <div className="absolute inset-0 flex items-center justify-center bg-background/70 opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="rounded-lg bg-background px-2 py-1 text-xs font-medium text-foreground shadow-sm">
                    Use Template
                  </div>
                </div>
              </div>
              <div className="p-2">
                <div className="truncate text-xs font-medium text-foreground">{template.name}</div>
                <div className="text-xs text-muted-foreground">{template.category}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
