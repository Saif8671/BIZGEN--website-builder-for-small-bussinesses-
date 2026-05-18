import { Navbar } from "@/components/landing/navbar"
import { HeroSection } from "@/components/landing/hero-section"
import { FeaturesSection } from "@/components/landing/features-section"
import { IndustriesSection } from "@/components/landing/industries-section"
import { ContactSection } from "@/components/landing/contact-section"
import { PricingSection } from "@/components/landing/pricing-section"
import { CTASection } from "@/components/landing/cta-section"
import { Footer } from "@/components/landing/footer"

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <IndustriesSection />
      <ContactSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </main>
  )
}
