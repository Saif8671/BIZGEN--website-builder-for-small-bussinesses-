"use client"

export type WorkflowSiteDraft = {
  name: string
  tagline: string
  sections: string[]
  pages: string[]
  generatedUrl?: string
}

const NAME_KEYS = new Set([
  "business_name",
  "businessname",
  "brand_name",
  "brandname",
  "company",
  "company_name",
  "companyname",
  "name",
  "site_name",
  "sitename",
  "title",
  "website_name",
  "websitename",
])

const TAGLINE_KEYS = new Set([
  "description",
  "hero_subtitle",
  "hero_text",
  "subtitle",
  "summary",
  "tagline",
])

const PAGE_KEYS = new Set([
  "menu",
  "menu_items",
  "navigation",
  "nav_items",
  "page_map",
  "page_names",
  "pages",
  "routes",
])

const SECTION_KEYS = new Set([
  "blocks",
  "content_sections",
  "section_names",
  "sections",
])

const URL_PRIORITY = new Map<string, number>([
  ["generated_url", 120],
  ["website_url", 120],
  ["site_url", 115],
  ["public_url", 110],
  ["live_url", 110],
  ["deployment_url", 105],
  ["redirect_url", 100],
  ["redirect_link", 100],
  ["preview_url", 95],
  ["preview_link", 95],
  ["website_link", 92],
  ["site_link", 90],
  ["generated_link", 90],
  ["link", 35],
  ["url", 25],
])

const LABEL_KEYS = ["title", "name", "label", "heading", "page", "section"]
const NEGATIVE_URL_HOSTS = [
  "auto-workflow-api.supervity.ai",
  "auto.supervity.ai",
  "react.dev",
  "nextjs.org",
  "localhost",
  "127.0.0.1",
]

type UrlCandidate = {
  score: number
  url: string
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function normalizeText(value: string) {
  return value.replace(/\s+/g, " ").trim()
}

function looksLikeUrl(value: string) {
  return /^https?:\/\/[^\s]+$/i.test(value.trim())
}

function sanitizeUrl(value: string) {
  return value.trim().replace(/^["']|["']$/g, "").replace(/[),.;]+$/, "")
}

function tryParseJsonString(value: string) {
  const trimmed = value.trim()

  if (
    (trimmed.startsWith("{") && trimmed.endsWith("}")) ||
    (trimmed.startsWith("[") && trimmed.endsWith("]"))
  ) {
    try {
      return JSON.parse(trimmed) as unknown
    } catch {
      return value
    }
  }

  return value
}

function getLabelsFromArray(items: unknown[]) {
  const labels = items.flatMap((item) => {
    if (typeof item === "string") {
      const text = normalizeText(item)
      return text ? [text] : []
    }

    if (!isRecord(item)) {
      return []
    }

    for (const key of LABEL_KEYS) {
      const value = item[key]
      if (typeof value === "string" && normalizeText(value)) {
        return [normalizeText(value)]
      }
    }

    return []
  })

  return Array.from(new Set(labels)).slice(0, 12)
}

function scoreUrlCandidate(url: string, path: string[], eventName?: string) {
  let score = 10

  for (const key of path) {
    score += URL_PRIORITY.get(key) ?? 0

    if (key.includes("final") || key.includes("result") || key.includes("output")) {
      score += 28
    }

    if (key.includes("complete") || key.includes("completed") || key.includes("success")) {
      score += 18
    }
  }

  if (eventName) {
    const normalizedEvent = eventName.toLowerCase()

    if (normalizedEvent.includes("complete") || normalizedEvent.includes("completed")) {
      score += 35
    }

    if (normalizedEvent.includes("result") || normalizedEvent.includes("output")) {
      score += 35
    }

    if (normalizedEvent.includes("finish") || normalizedEvent.includes("done")) {
      score += 25
    }
  }

  try {
    const parsed = new URL(url)
    const host = parsed.host.toLowerCase()

    if (NEGATIVE_URL_HOSTS.some((blocked) => host.includes(blocked))) {
      score -= 80
    }

    if (host.includes("vercel.app") || host.includes("netlify.app") || host.includes("pages.dev")) {
      score += 12
    }

    if (parsed.pathname && parsed.pathname !== "/") {
      score += 4
    }
  } catch {
    score -= 100
  }

  return score
}

export function extractWorkflowSiteDraft(
  payload: unknown,
  fallback: Omit<WorkflowSiteDraft, "generatedUrl">,
): WorkflowSiteDraft {
  let name = fallback.name
  let tagline = fallback.tagline
  let pages = [...fallback.pages]
  let sections = [...fallback.sections]
  const urlCandidates: UrlCandidate[] = []

  const pushUrlCandidate = (value: string, path: string[], eventName?: string) => {
    const url = sanitizeUrl(value)
    if (!looksLikeUrl(url)) {
      return
    }

    urlCandidates.push({
      url,
      score: scoreUrlCandidate(url, path, eventName),
    })
  }

  const visit = (node: unknown, path: string[] = [], eventName?: string) => {
    if (typeof node === "string") {
      const parsedNode = tryParseJsonString(node)
      if (parsedNode !== node) {
        visit(parsedNode, path, eventName)
        return
      }

      const text = node.trim()
      if (!text) {
        return
      }

      pushUrlCandidate(text, path, eventName)
      return
    }

    if (Array.isArray(node)) {
      const parentKey = path[path.length - 1]
      const labels = getLabelsFromArray(node)

      if (labels.length > 0) {
        if (PAGE_KEYS.has(parentKey ?? "") && labels.length >= pages.length) {
          pages = labels
        }

        if (SECTION_KEYS.has(parentKey ?? "") && labels.length >= sections.length) {
          sections = labels
        }
      }

      node.forEach((item, index) => {
        visit(item, [...path, String(index)], eventName)
      })
      return
    }

    if (!isRecord(node)) {
      return
    }

    const currentEventName =
      typeof node.event === "string"
        ? node.event
        : typeof node.type === "string"
          ? node.type
          : eventName

    for (const [rawKey, rawValue] of Object.entries(node)) {
      const key = rawKey.toLowerCase()
      const nextPath = [...path, key]

      if (typeof rawValue === "string") {
        const value = normalizeText(rawValue)

        if (!value) {
          continue
        }

        if (NAME_KEYS.has(key) && (!name || value.length > name.length)) {
          name = value
        }

        if (TAGLINE_KEYS.has(key) && (!tagline || value.length > tagline.length)) {
          tagline = value
        }

        pushUrlCandidate(value, nextPath, currentEventName)
      }

      if (Array.isArray(rawValue)) {
        const labels = getLabelsFromArray(rawValue)

        if (PAGE_KEYS.has(key) && labels.length > 0 && labels.length >= pages.length) {
          pages = labels
        }

        if (SECTION_KEYS.has(key) && labels.length > 0 && labels.length >= sections.length) {
          sections = labels
        }
      }

      visit(rawValue, nextPath, currentEventName)
    }
  }

  visit(payload)

  urlCandidates.sort((a, b) => b.score - a.score)
  const generatedUrl = urlCandidates[0]?.url

  return {
    name: name || fallback.name,
    tagline: tagline || fallback.tagline,
    sections: sections.length > 0 ? sections : fallback.sections,
    pages: pages.length > 0 ? pages : fallback.pages,
    generatedUrl,
  }
}
