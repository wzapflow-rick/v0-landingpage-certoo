import { BenefitsSection } from "@/components/landing/benefits-section"
import { CTASection } from "@/components/landing/cta-section"
import { DemoSection } from "@/components/landing/demo-section"
import { FAQSection } from "@/components/landing/faq-section"
import { Footer } from "@/components/landing/footer"
import { Header } from "@/components/landing/header"
import { HeroSection } from "@/components/landing/hero-section"
import { LandingMotionProvider, ScrollProgress } from "@/components/landing/motion-primitives"
import { PricingSection } from "@/components/landing/pricing-section"
import { ProofSection } from "@/components/landing/proof-section"

export default function Home() {
  return (
    <LandingMotionProvider>
      <a
        href="#conteudo"
        className="fixed left-4 top-4 z-[70] -translate-y-24 rounded-full bg-primary px-4 py-2 font-semibold text-primary-foreground transition-transform focus:translate-y-0"
      >
        Ir para o conteúdo
      </a>
      <ScrollProgress />
      <Header />
      <main id="conteudo">
        <HeroSection />
        <BenefitsSection />
        <DemoSection />
        <ProofSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </LandingMotionProvider>
  )
}
