import { Suspense } from "react"
import { WebsiteBuilder } from "@/components/builder/website-builder"

export default function BuilderPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading builder...</div>}>
      <WebsiteBuilder />
    </Suspense>
  )
}
