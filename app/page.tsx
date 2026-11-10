import { FinalCta, SiteFooter } from "@/components/zapflow/closing"
import { Faq } from "@/components/zapflow/faq"
import { Hero } from "@/components/zapflow/hero"
import { KeyBenefits } from "@/components/zapflow/key-benefits"
import { MobileCtaBar } from "@/components/zapflow/mobile-cta-bar"
import { Pricing } from "@/components/zapflow/pricing"
import { ProductShowcase } from "@/components/zapflow/product-showcase"
import { SiteHeader } from "@/components/zapflow/site-header"

export default function Home() {
  return (
    <div className="pb-24 font-sans md:pb-0">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Ir para o conteúdo
      </a>
      <SiteHeader />
      <main id="conteudo">
        <Hero />
        <ProductShowcase />
        <KeyBenefits />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
      <MobileCtaBar />
    </div>
  )
}
