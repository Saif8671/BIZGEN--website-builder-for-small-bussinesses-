"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState, type ComponentType, type ReactNode } from "react"
import {
  Bell,
  Globe2,
  LayoutDashboard,
  LogOut,
  Menu,
  Plus,
  Search,
  Sparkles,
  UserRound,
} from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

type NavigationLink = {
  href: string
  label: string
  description: string
  icon: ComponentType<{ className?: string }>
}

const navigationGroups: { label: string; links: NavigationLink[] }[] = [
  {
    label: "Overview",
    links: [
      {
        href: "/dashboard",
        label: "Dashboard",
        description: "Traffic, leads, and growth overview",
        icon: LayoutDashboard,
      },
      {
        href: "/dashboard/sites",
        label: "My Sites",
        description: "Manage published and draft sites",
        icon: Globe2,
      },
    ],
  },
]

const pageCopy: Record<string, { title: string; description: string }> = {
  "/dashboard": {
    title: "Dashboard",
    description: "Measure traffic, conversions, and performance trends across your sites.",
  },
  "/dashboard/sites": {
    title: "My Sites",
    description: "Review every active build, jump into edits, and keep your live sites organized.",
  },
}

function getInitials(name?: string | null, email?: string | null) {
  if (name) {
    return name
      .split(" ")
      .filter(Boolean)
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  if (email) {
    return email.slice(0, 2).toUpperCase()
  }

  return "BG"
}

function getFirstName(name?: string | null, email?: string | null) {
  if (name) {
    return name.split(" ")[0]
  }

  if (email) {
    return email.split("@")[0]
  }

  return "there"
}

function getPageMeta(pathname: string) {
  return pageCopy[pathname] ?? {
    title: "Workspace",
    description: "Manage your projects, AI tools, and account settings from one place.",
  }
}

function NavigationContent({
  pathname,
  onNavigate,
}: {
  pathname: string
  onNavigate?: () => void
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="space-y-6 px-5 py-6">
        <Link href="/dashboard" className="flex items-center gap-3" onClick={onNavigate}>
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(92,232,196,0.95),rgba(53,126,247,0.9))] shadow-[0_18px_48px_rgba(44,162,140,0.25)]">
            <Sparkles className="h-5 w-5 text-slate-950" />
          </div>
          <div>
            <p className="font-display text-lg font-semibold tracking-tight text-white">BizGen</p>
            <p className="text-xs text-slate-400">Operator dashboard</p>
          </div>
        </Link>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-[0_18px_40px_rgba(3,7,18,0.3)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Workspace</p>
              <p className="mt-1 text-sm font-medium text-slate-100">Core Dashboard</p>
            </div>
            <Badge className="border-emerald-400/20 bg-emerald-400/10 text-emerald-200 hover:bg-emerald-400/10">
              Live pages
            </Badge>
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Only the active dashboard pages are shown here so navigation stays clean and useful.
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 pb-6">
        {navigationGroups.map((group) => (
          <div key={group.label} className="mb-6">
            <p className="px-3 pb-2 text-[11px] font-medium uppercase tracking-[0.24em] text-slate-500">
              {group.label}
            </p>
            <div className="space-y-1">
              {group.links.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/dashboard" && pathname.startsWith(link.href))

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onNavigate}
                    className={cn(
                      "group flex items-start gap-3 rounded-2xl px-3 py-3 transition-all duration-200",
                      isActive
                        ? "bg-[linear-gradient(135deg,rgba(44,162,140,0.16),rgba(59,130,246,0.18))] text-white shadow-[inset_0_0_0_1px_rgba(148,163,184,0.16)]"
                        : "text-slate-300 hover:bg-white/[0.06] hover:text-white"
                    )}
                  >
                    <div
                      className={cn(
                        "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-colors",
                        isActive
                          ? "border-emerald-300/20 bg-emerald-300/10 text-emerald-200"
                          : "border-white/10 bg-white/5 text-slate-400 group-hover:text-slate-100"
                      )}
                    >
                      <link.icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium">{link.label}</div>
                      <div className="mt-1 text-xs leading-5 text-slate-500 group-hover:text-slate-400">
                        {link.description}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function DashboardHeader({
  pathname,
  onOpenMobileNav,
}: {
  pathname: string
  onOpenMobileNav: () => void
}) {
  const { user, logout } = useAuth()
  const router = useRouter()
  const meta = getPageMeta(pathname)

  const handleLogout = async () => {
    try {
      await logout()
      router.push("/login")
    } catch (error) {
      console.error("Failed to sign out:", error)
    }
  }

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-[rgba(4,10,20,0.78)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            className="border-white/10 bg-white/5 text-slate-100 lg:hidden"
            onClick={onOpenMobileNav}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="min-w-0">
            <div className="text-xs uppercase tracking-[0.24em] text-slate-500">BizGen workspace</div>
            <div className="truncate text-lg font-semibold tracking-tight text-white">{meta.title}</div>
            <p className="hidden max-w-2xl truncate text-sm text-slate-400 md:block">{meta.description}</p>
          </div>
        </div>

        <div className="hidden w-full max-w-xs items-center rounded-2xl border border-white/10 bg-white/5 px-3 md:flex">
          <Search className="h-4 w-4 text-slate-500" />
          <Input
            placeholder="Search sites and dashboard metrics..."
            className="border-0 bg-transparent pl-2 text-slate-100 shadow-none focus-visible:ring-0"
          />
        </div>

        <div className="flex items-center gap-2">
          <Badge className="hidden border-sky-400/20 bg-sky-400/10 text-sky-200 lg:inline-flex">
            {getFirstName(user?.displayName, user?.email)} is live
          </Badge>

          <Button
            variant="outline"
            size="icon"
            className="border-white/10 bg-white/5 text-slate-100 hover:bg-white/10"
          >
            <Bell className="h-4 w-4" />
          </Button>

          <Link href="/builder">
            <Button className="rounded-2xl bg-[linear-gradient(135deg,#5ce8c4,#357ef7)] px-4 text-slate-950 hover:opacity-95">
              <Plus className="mr-2 h-4 w-4" />
              New Website
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-auto rounded-2xl border border-white/10 bg-white/5 px-2 py-1.5 text-left hover:bg-white/10"
              >
                <Avatar className="h-9 w-9 border border-white/10 bg-emerald-300/10">
                  <AvatarFallback className="bg-transparent text-sm font-semibold text-emerald-200">
                    {getInitials(user?.displayName, user?.email)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuLabel className="space-y-1">
                <div className="font-medium text-foreground">{user?.displayName || "BizGen user"}</div>
                <div className="truncate text-xs font-normal text-muted-foreground">{user?.email || ""}</div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => router.push("/dashboard/sites")}>
                <UserRound className="mr-2 h-4 w-4" />
                My sites
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

export function DashboardShell({ children }: { children: ReactNode }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const { user, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login")
    }
  }, [loading, router, user])

  if (loading || !user) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050b14]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(92,232,196,0.16),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(53,126,247,0.18),transparent_28%)]" />
        <div className="relative rounded-[28px] border border-white/10 bg-white/5 px-8 py-7 text-center shadow-[0_30px_80px_rgba(2,8,23,0.45)] backdrop-blur-xl">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(92,232,196,0.95),rgba(53,126,247,0.9))]">
            <Sparkles className="h-6 w-6 animate-pulse text-slate-950" />
          </div>
          <p className="mt-4 text-sm font-medium tracking-[0.18em] text-slate-300 uppercase">
            Preparing your workspace
          </p>
          <p className="mt-2 text-sm text-slate-500">Checking session, loading projects, and syncing dashboard state.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#050b14] text-foreground">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(92,232,196,0.14),transparent_26%),radial-gradient(circle_at_top_right,rgba(53,126,247,0.16),transparent_24%),linear-gradient(180deg,#050b14_0%,#07101f_42%,#050b14_100%)]" />

      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-white/10 bg-[rgba(4,9,18,0.88)] backdrop-blur-xl lg:block">
        <NavigationContent pathname={pathname} />
      </aside>

      <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
        <SheetContent
          side="left"
          className="w-[88vw] max-w-sm border-r border-white/10 bg-[rgba(4,9,18,0.96)] p-0 text-white"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Dashboard navigation</SheetTitle>
            <SheetDescription>Browse dashboard sections and workspace tools.</SheetDescription>
          </SheetHeader>
          <NavigationContent pathname={pathname} onNavigate={() => setMobileNavOpen(false)} />
        </SheetContent>
      </Sheet>

      <div className="lg:pl-72">
        <DashboardHeader pathname={pathname} onOpenMobileNav={() => setMobileNavOpen(true)} />

        <main className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6 rounded-[28px] border border-white/10 bg-white/[0.03] p-3 shadow-[0_20px_60px_rgba(2,8,23,0.28)] backdrop-blur-sm sm:p-4">
              <div className="flex flex-col gap-3 rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-300/10 text-emerald-200">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-100">Clean dashboard mode</p>
                    <p className="text-sm text-slate-400">
                      Only the active dashboard routes are shown here: dashboard, sites, and builder.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-400">
                  <Badge className="border-white/10 bg-white/[0.06] text-slate-200 hover:bg-white/[0.06]">
                    Lean navigation
                  </Badge>
                  <Separator orientation="vertical" className="hidden h-5 bg-white/10 sm:block" />
                  <span>Updated 2 min ago</span>
                </div>
              </div>
            </div>

            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
