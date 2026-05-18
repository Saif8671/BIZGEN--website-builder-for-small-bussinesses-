"use client"

import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { MySitesContent } from "@/components/dashboard/my-sites-content"

export default function MySitesPage() {
  return (
    <DashboardShell>
      <MySitesContent />
    </DashboardShell>
  )
}
