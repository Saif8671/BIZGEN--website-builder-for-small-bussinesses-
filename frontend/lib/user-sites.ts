"use client"

export type UserSite = {
  id: string
  ownerId: string
  name: string
  domain: string
  status: "draft" | "published"
  lastUpdated: string
  createdAt: string
  views: number
  template: string
  tagline: string
  sections: string[]
  pages: string[]
  generatedUrl?: string
}

const STORAGE_KEY = "bizgen.user-sites"

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined"
}

function readAllSites() {
  if (!canUseStorage()) {
    return [] as UserSite[]
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return []
    }

    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as UserSite[]) : []
  } catch {
    return []
  }
}

function writeAllSites(sites: UserSite[]) {
  if (!canUseStorage()) {
    return
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sites))
}

export function getUserSites(ownerId: string) {
  return readAllSites()
    .filter((site) => site.ownerId === ownerId)
    .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
}

export function getUserSiteById(siteId: string) {
  return readAllSites().find((site) => site.id === siteId) ?? null
}

export function saveUserSite(site: UserSite) {
  const sites = readAllSites()
  const existingIndex = sites.findIndex((entry) => entry.id === site.id)

  if (existingIndex >= 0) {
    sites[existingIndex] = site
  } else {
    sites.unshift(site)
  }

  writeAllSites(sites)
}

export function deleteUserSite(siteId: string, ownerId: string) {
  const sites = readAllSites().filter((site) => !(site.id === siteId && site.ownerId === ownerId))
  writeAllSites(sites)
}

export function buildSiteDomain(name: string) {
  const slug = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40)

  return `${slug || "new-site"}.bizgen.site`
}

export function formatRelativeUpdate(isoString: string) {
  const diffMs = Date.now() - new Date(isoString).getTime()
  const diffMinutes = Math.max(1, Math.floor(diffMs / 60000))

  if (diffMinutes < 60) {
    return `${diffMinutes} min ago`
  }

  const diffHours = Math.floor(diffMinutes / 60)
  if (diffHours < 24) {
    return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`
  }

  const diffDays = Math.floor(diffHours / 24)
  return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`
}
