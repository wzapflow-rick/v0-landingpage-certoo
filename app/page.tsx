import { Addons } from "@/components/zapflow/addons"
import { Benefits } from "@/components/zapflow/benefits"
import { FinalCta, SiteFooter } from "@/components/zapflow/closing"
import { MobileCtaBar } from "@/components/zapflow/mobile-cta-bar"
import { Demo } from "@/components/zapflow/demo"
import { Faq } from "@/components/zapflow/faq"
import { Hero } from "@/components/zapflow/hero"
import { Pricing } from "@/components/zapflow/pricing"
import { ScrollReveal } from "@/components/zapflow/scroll-reveal"
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
        <Benefits />
        <Demo />
        <Addons />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
      <MobileCtaBar />
      <ScrollReveal />
    </div>
  )
}
