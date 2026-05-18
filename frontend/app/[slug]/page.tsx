import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, Sparkles } from "lucide-react"

const infoPages = {
  about: {
    eyebrow: "About BizGen",
    title: "AI website building for small businesses.",
    description:
      "BizGen helps business owners launch polished websites faster with guided templates, AI-generated copy, and a builder that stays approachable.",
    points: [
      "Start from proven layouts instead of a blank canvas.",
      "Generate content, structure, and visuals in a few guided steps.",
      "Move from idea to published site without managing a big toolchain.",
    ],
    primaryHref: "/signup",
    primaryLabel: "Create your account",
    secondaryHref: "/builder",
    secondaryLabel: "Open the builder",
  },
  blog: {
    eyebrow: "BizGen Blog",
    title: "Product updates and practical growth advice.",
    description:
      "The blog is being prepared. For now, the best way to explore BizGen is through the live builder and the product walkthroughs on the homepage.",
    points: [
      "Upcoming release notes and feature spotlights.",
      "Guides for launching faster as a local business.",
      "Examples of AI-assisted website workflows.",
    ],
    primaryHref: "/builder",
    primaryLabel: "Try the builder",
    secondaryHref: "/#examples",
    secondaryLabel: "View live examples",
  },
  careers: {
    eyebrow: "Careers",
    title: "We are not hiring publicly yet.",
    description:
      "This page is a placeholder for upcoming roles and collaboration opportunities as the product grows.",
    points: [
      "Future openings will be listed here first.",
      "Product, design, and growth roles are planned.",
      "For now, partnership inquiries can go through the contact section.",
    ],
    primaryHref: "/#contact",
    primaryLabel: "Contact the team",
    secondaryHref: "/about",
    secondaryLabel: "Learn about BizGen",
  },
  docs: {
    eyebrow: "Documentation",
    title: "Documentation is being assembled.",
    description:
      "The app already includes the core builder flows, auth, templates, and dashboard. Formal docs will follow as those flows stabilize.",
    points: [
      "Guided setup instructions for local development.",
      "Builder and dashboard walkthroughs.",
      "Deployment and environment configuration notes.",
    ],
    primaryHref: "/",
    primaryLabel: "Back to the homepage",
    secondaryHref: "/builder",
    secondaryLabel: "Explore the builder",
  },
  help: {
    eyebrow: "Help Center",
    title: "Support resources are on the way.",
    description:
      "If you are exploring the product right now, the quickest path is through the landing page walkthrough and the in-app flows.",
    points: [
      "Frequently asked questions will live here.",
      "Troubleshooting for auth and publishing will be added.",
      "Guided help content will expand with the beta.",
    ],
    primaryHref: "/#contact",
    primaryLabel: "Get in touch",
    secondaryHref: "/login",
    secondaryLabel: "Go to sign in",
  },
  community: {
    eyebrow: "Community",
    title: "Community space coming soon.",
    description:
      "BizGen will eventually include a place for builders, agencies, and small business owners to share ideas and workflows.",
    points: [
      "Template sharing and inspiration.",
      "Product feedback and roadmap discussion.",
      "Tips from real small-business launches.",
    ],
    primaryHref: "/signup",
    primaryLabel: "Join BizGen",
    secondaryHref: "/#contact",
    secondaryLabel: "Reach out",
  },
  status: {
    eyebrow: "System Status",
    title: "No public status page yet.",
    description:
      "This placeholder keeps the link live while the production status workflow is being wired up.",
    points: [
      "Service health reporting is planned.",
      "Incident history will appear here once enabled.",
      "For urgent issues, contact the team directly.",
    ],
    primaryHref: "/#contact",
    primaryLabel: "Report an issue",
    secondaryHref: "/dashboard",
    secondaryLabel: "Open dashboard",
  },
  privacy: {
    eyebrow: "Privacy Policy",
    title: "Privacy details will be finalized before launch.",
    description:
      "This placeholder page keeps the legal links functional while the final policy text is being prepared for production.",
    points: [
      "Account and authentication data handling will be documented here.",
      "Analytics, uploaded assets, and retention policies will be listed here.",
      "Third-party services such as Firebase will be disclosed here.",
    ],
    primaryHref: "/signup",
    primaryLabel: "Back to sign up",
    secondaryHref: "/cookies",
    secondaryLabel: "View cookie page",
  },
  terms: {
    eyebrow: "Terms of Service",
    title: "Formal terms are being drafted.",
    description:
      "This temporary page prevents a dead end while the final legal copy is being reviewed.",
    points: [
      "Usage rules and account expectations will be published here.",
      "Billing and cancellation terms will appear here for paid plans.",
      "Support, uptime, and acceptable-use language will live here.",
    ],
    primaryHref: "/signup",
    primaryLabel: "Return to sign up",
    secondaryHref: "/privacy",
    secondaryLabel: "Read privacy page",
  },
  cookies: {
    eyebrow: "Cookie Notice",
    title: "Cookie disclosures are coming soon.",
    description:
      "The app currently uses standard web platform storage and third-party auth integrations. A final cookie disclosure will be added before launch.",
    points: [
      "Session and preference storage details will be listed here.",
      "Analytics-related storage will be described here if enabled.",
      "User controls and opt-out guidance will be published here.",
    ],
    primaryHref: "/privacy",
    primaryLabel: "Read privacy page",
    secondaryHref: "/terms",
    secondaryLabel: "Read terms page",
  },
  "forgot-password": {
    eyebrow: "Password Reset",
    title: "Password reset is not wired up yet.",
    description:
      "The login link now resolves correctly, but the actual reset email flow still needs to be implemented against Firebase before it can send reset links.",
    points: [
      "Use Google or GitHub sign-in if your account was created that way.",
      "If you remember your password, head back to the login page.",
      "If you need support, use the contact section on the homepage.",
    ],
    primaryHref: "/login",
    primaryLabel: "Back to login",
    secondaryHref: "/#contact",
    secondaryLabel: "Contact support",
  },
} as const

type InfoSlug = keyof typeof infoPages

function isInfoSlug(slug: string): slug is InfoSlug {
  return slug in infoPages
}

export async function generateMetadata(
  props: PageProps<"/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params

  if (!isInfoSlug(slug)) {
    return {}
  }

  const page = infoPages[slug]

  return {
    title: `${page.title} | BizGen`,
    description: page.description,
  }
}

export default async function InfoPage(props: PageProps<"/[slug]">) {
  const { slug } = await props.params

  if (!isInfoSlug(slug)) {
    notFound()
  }

  const page = infoPages[slug]

  return (
    <main className="min-h-screen bg-background">
      <section className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/20 blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm text-accent">
            <Sparkles className="h-4 w-4" />
            {page.eyebrow}
          </div>

          <h1 className="mt-6 max-w-3xl text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {page.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
            {page.description}
          </p>

          <div className="mt-10 rounded-3xl border border-border bg-card/80 p-8">
            <ul className="space-y-4">
              {page.points.map((point) => (
                <li key={point} className="flex gap-3 text-muted-foreground">
                  <span className="mt-2 h-2 w-2 rounded-full bg-accent" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href={page.primaryHref}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
              >
                {page.primaryLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={page.secondaryHref}
                className="inline-flex items-center justify-center rounded-xl border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                {page.secondaryLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
