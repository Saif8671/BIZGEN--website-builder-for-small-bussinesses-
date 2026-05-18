"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  Plus,
  Search,
  MoreVertical,
  Globe,
  Eye,
  Edit,
  Trash2,
  ExternalLink,
  Copy,
  BarChart3,
  Calendar,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useAuth } from "@/hooks/use-auth"
import { deleteUserSite, formatRelativeUpdate, getUserSites, type UserSite } from "@/lib/user-sites"

export function MySitesContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [sites, setSites] = useState<UserSite[]>([])
  const { profile, loading } = useAuth()

  useEffect(() => {
    if (!profile?.id) {
      setSites([])
      return
    }

    const loadSites = () => {
      setSites(getUserSites(profile.id))
    }

    loadSites()
    window.addEventListener("storage", loadSites)

    return () => {
      window.removeEventListener("storage", loadSites)
    }
  }, [profile?.id])

  const filteredSites = useMemo(
    () =>
      sites.filter((site) =>
        `${site.name} ${site.domain} ${site.template}`.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [searchQuery, sites],
  )

  const handleDeleteSite = (siteId: string) => {
    if (!profile?.id) {
      return
    }

    deleteUserSite(siteId, profile.id)
    setSites(getUserSites(profile.id))
  }

  const getSiteUrl = (site: UserSite) => site.generatedUrl || `https://${site.domain}`

  const handleCopyUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      window.prompt("Copy this URL", url)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Sites</h1>
          <p className="text-muted-foreground">Manage the websites you have created in Builder Studio</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Site
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Website</DialogTitle>
              <DialogDescription>Choose how you want to create your new website</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Link href="/builder" onClick={() => setIsCreateOpen(false)}>
                <Card className="cursor-pointer transition-colors hover:bg-secondary/50">
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="rounded-lg bg-accent/10 p-3">
                      <Edit className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <p className="font-semibold">Start from Scratch</p>
                      <p className="text-sm text-muted-foreground">
                        Build your website using our AI-powered builder
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/dashboard/templates" onClick={() => setIsCreateOpen(false)}>
                <Card className="cursor-pointer transition-colors hover:bg-secondary/50">
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="rounded-lg bg-accent/10 p-3">
                      <Globe className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <p className="font-semibold">Use a Template</p>
                      <p className="text-sm text-muted-foreground">
                        Start with a pre-designed template for your industry
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search sites..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {loading ? (
        <Card>
          <CardContent className="p-10 text-center text-muted-foreground">Loading your sites...</CardContent>
        </Card>
      ) : filteredSites.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSites.map((site, index) => (
            <motion.div
              key={site.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              <Card className="group overflow-hidden">
                <div className="relative aspect-video bg-[linear-gradient(135deg,rgba(92,232,196,0.14),rgba(53,126,247,0.16))]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Globe className="h-12 w-12 text-accent/60" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                    <Link href={`/builder?site=${site.id}`}>
                      <Button size="sm" variant="secondary">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                    </Link>
                    {site.generatedUrl ? (
                      <a href={site.generatedUrl} target="_blank" rel="noreferrer">
                        <Button size="sm" variant="secondary">
                          <Eye className="mr-2 h-4 w-4" />
                          Open
                        </Button>
                      </a>
                    ) : (
                      <Link href={`/builder?site=${site.id}`}>
                        <Button size="sm" variant="secondary">
                          <Eye className="mr-2 h-4 w-4" />
                          Preview
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h3 className="font-semibold">{site.name}</h3>
                      <p className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Globe className="h-3 w-3" />
                        {site.domain}
                      </p>
                      <p className="text-xs text-muted-foreground">{site.template}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => window.open(getSiteUrl(site), "_blank", "noopener,noreferrer")}>
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Visit Site
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleCopyUrl(getSiteUrl(site))}>
                          <Copy className="mr-2 h-4 w-4" />
                          Copy URL
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <BarChart3 className="mr-2 h-4 w-4" />
                          View Analytics
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteSite(site.id)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Site
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <Badge
                      variant={site.status === "published" ? "default" : "secondary"}
                      className={site.status === "published" ? "bg-green-500/10 text-green-500" : ""}
                    >
                      {site.status === "published" ? "Published" : "Draft"}
                    </Badge>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {site.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatRelativeUpdate(site.lastUpdated)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: filteredSites.length * 0.08 }}
          >
            <Card
              className="flex aspect-[4/3] cursor-pointer items-center justify-center border-dashed transition-colors hover:border-accent hover:bg-accent/5"
              onClick={() => setIsCreateOpen(true)}
            >
              <div className="text-center">
                <div className="mx-auto mb-3 rounded-full bg-accent/10 p-4">
                  <Plus className="h-6 w-6 text-accent" />
                </div>
                <p className="font-medium">Create New Site</p>
                <p className="text-sm text-muted-foreground">Start building your next website</p>
              </div>
            </Card>
          </motion.div>
        </div>
      ) : (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center gap-4 p-12 text-center">
            <div className="rounded-full bg-accent/10 p-4">
              <Globe className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">No sites yet</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                The websites you create in Builder Studio will appear here.
              </p>
            </div>
            <Link href="/builder">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create your first site
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
