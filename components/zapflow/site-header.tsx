import { ArrowRight } from "lucide-react"
import { ctaLabel, landingLinks } from "@/lib/landing-content"
import { Brand } from "./brand"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-foreground/[0.06] bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5">
        <Brand />

        <div className="flex items-center gap-2">
          <a
            href={landingLinks.login}
            data-track="login_click"
            data-position="header"
            className="rounded-full px-3.5 py-2 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
          >
            Entrar
          </a>
          <a
            href={landingLinks.partnership}
            data-track="cta_click"
            data-position="header"
            data-plan="parceria"
            className="btn-glow hidden h-10 items-center gap-1.5 rounded-full pl-5 pr-4 text-sm font-bold text-primary-foreground md:inline-flex"
          >
            {ctaLabel}
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </header>
  )
}
