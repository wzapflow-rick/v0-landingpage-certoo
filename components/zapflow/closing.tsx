import { ArrowRight } from "lucide-react"
import { landingLinks } from "@/lib/landing-content"
import { Brand, brandLogoUrl } from "./brand"
import { TextRing } from "./text-ring"

export function FinalCta() {
  return (
    <section data-reveal className="mx-auto max-w-6xl px-5 pb-20 md:pb-28">
      <div className="surface relative flex flex-col items-center overflow-hidden rounded-[2rem] px-6 py-16 text-center sm:px-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_70%_at_50%_0%,color-mix(in_srgb,var(--accent)_8%,transparent),transparent_70%)]"
        />
        <TextRing words={["7 dias grátis", "Zero comissão", "Pedidos no WhatsApp"]}>
          <img src={brandLogoUrl} alt="" width={96} height={86} loading="lazy" className="h-16 w-auto" />
        </TextRing>
        <h2 data-wipe className="mt-6 max-w-2xl text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
          Seu próximo pedido pode chegar <span className="text-warm">ainda hoje.</span>
        </h2>
        <p className="mt-4 max-w-lg text-pretty leading-relaxed text-muted-foreground">
          Monte seu cardápio, compartilhe o link e comece a receber pedidos no WhatsApp. 7 dias grátis e zero comissão
          por venda.
        </p>
        <a
          data-hide-mobile-cta
          href={landingLinks.partnership}
          className="btn-glow mt-8 inline-flex h-13 items-center gap-2 rounded-full px-8 text-base font-bold text-primary-foreground"
        >
          Criar meu cardápio
          <ArrowRight className="size-5" aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between">
        <Brand />
        <nav aria-label="Links do rodapé" className="flex flex-wrap gap-6 text-sm text-muted-foreground">
          <a href="#recursos" className="hover:text-foreground">Recursos</a>
          <a href="#planos" className="hover:text-foreground">Planos</a>
          <a href={landingLinks.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
            Instagram
          </a>
          <a href={landingLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
            Suporte
          </a>
          <a href={landingLinks.login} className="hover:text-foreground">Entrar</a>
        </nav>
        <p className="text-xs text-muted-foreground">
          {"© "}
          {new Date().getFullYear()} ZapFlash. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
