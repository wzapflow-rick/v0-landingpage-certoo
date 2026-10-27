import { ArrowRight } from "lucide-react"
import { landingLinks } from "@/lib/landing-content"
import { Brand, brandLogoUrl } from "./brand"

export function FinalCta() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-20 md:pb-28">
      <div className="hero-halo relative flex flex-col items-center overflow-hidden rounded-3xl border border-border/80 bg-card/60 px-6 py-14 text-center sm:px-12">
        <img src={brandLogoUrl} alt="" width={96} height={86} loading="lazy" className="h-20 w-auto" />
        <h2 className="mt-6 max-w-2xl text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
          Seu próximo pedido pode chegar <span className="text-warm">ainda hoje.</span>
        </h2>
        <p className="mt-4 max-w-lg text-pretty leading-relaxed text-muted-foreground">
          Monte seu cardápio, compartilhe o link e comece a receber pedidos no WhatsApp. 7 dias grátis e zero comissão
          por venda.
        </p>
        <a
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
          {new Date().getFullYear()} wZapFlow. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}

export function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border/80 bg-background/85 px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 backdrop-blur-xl md:hidden">
      <a
        href={landingLinks.partnership}
        className="btn-glow flex h-12 w-full items-center justify-center gap-2 rounded-full font-bold text-primary-foreground"
      >
        Criar meu cardápio grátis
        <ArrowRight className="size-5" aria-hidden="true" />
      </a>
    </div>
  )
}
