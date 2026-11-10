import { ArrowRight } from "lucide-react"
import { landingLinks } from "@/lib/landing-content"
import { Brand } from "./brand"

export function FinalCta() {
  return (
    <section aria-labelledby="final-titulo" className="relative overflow-hidden border-t border-border/60">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_75%_50%,color-mix(in_srgb,var(--primary)_8%,transparent),transparent_70%)]"
      />
      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-5 py-20 text-center md:py-28">
        <h2
          id="final-titulo"
          className="text-balance text-4xl font-extrabold leading-[1.02] tracking-[-0.04em] sm:text-6xl"
        >
          Comece hoje. <span className="text-flash italic">Seu primeiro cardápio pode ficar pronto em minutos.</span>
        </h2>
        <a
          data-hide-mobile-cta
          href={landingLinks.partnership}
          className="btn-glow mt-10 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full px-9 text-base font-bold text-primary-foreground sm:w-auto"
        >
          Criar meu cardápio grátis
          <ArrowRight className="size-5" aria-hidden="true" />
        </a>
        <p className="mt-5 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
          7 dias grátis. Depois R$ 29,90/mês no plano Parceria. Zero comissão por pedido.
        </p>
      </div>
    </section>
  )
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between">
        <Brand />
        <nav aria-label="Links do rodapé" className="flex flex-wrap gap-6 text-sm text-muted-foreground">
          <a href="#como-funciona" className="hover:text-foreground">Como funciona</a>
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
