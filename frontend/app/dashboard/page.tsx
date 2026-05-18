import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { AnalyticsContent } from "@/components/dashboard/analytics-content"

export default function DashboardPage() {
  return (
    <DashboardShell>
      <AnalyticsContent />
    </DashboardShell>
  )
}
