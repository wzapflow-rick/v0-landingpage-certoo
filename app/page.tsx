import { FinalCta, SiteFooter } from "@/components/zapflow/closing"
import { Faq } from "@/components/zapflow/faq"
import { Hero } from "@/components/zapflow/hero"
import { MobileCtaBar } from "@/components/zapflow/mobile-cta-bar"
import { Operation } from "@/components/zapflow/operation"
import { OrderDemo } from "@/components/zapflow/order-demo"
import { Pricing } from "@/components/zapflow/pricing"
import { Savings } from "@/components/zapflow/savings"
import { SegmentsBand } from "@/components/zapflow/segments-band"
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
        <SegmentsBand />
        <OrderDemo />
        <Savings />
        <Operation />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
      <MobileCtaBar />
    </div>
  )
}
