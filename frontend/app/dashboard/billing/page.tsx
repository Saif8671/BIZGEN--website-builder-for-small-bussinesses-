"use client"

import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { BillingContent } from "@/components/dashboard/billing-content"

export default function BillingPage() {
  return (
    <DashboardShell>
      <BillingContent />
    </DashboardShell>
  )
}
