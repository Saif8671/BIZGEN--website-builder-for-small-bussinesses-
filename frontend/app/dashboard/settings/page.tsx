"use client"

import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { SettingsContent } from "@/components/dashboard/settings-content"

export default function SettingsPage() {
  return (
    <DashboardShell>
      <SettingsContent />
    </DashboardShell>
  )
}
