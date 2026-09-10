import { InstagramIcon, MessageCircleIcon } from "lucide-react"

import { BrandMark } from "@/components/landing/brand-mark"
import { landingLinks, navigation } from "@/lib/landing-content"

export function Footer() {
  return (
    <footer className="border-t border-background/12 bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <BrandMark />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-background/56">
              Cardápio digital e operação de pedidos conectados em um só fluxo.
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 sm:gap-16">
            <nav aria-label="Capítulos da página">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-background/42">Explorar</p>
              <ul className="mt-4 flex flex-col gap-3">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <a className="text-sm text-background/70 transition-colors hover:text-background" href={item.href}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Acesso ao produto">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-background/42">Produto</p>
              <ul className="mt-4 flex flex-col gap-3">
                <li>
                  <a className="text-sm text-background/70 transition-colors hover:text-background" href={landingLinks.login}>
                    Entrar
                  </a>
                </li>
                <li>
                  <a className="text-sm text-background/70 transition-colors hover:text-background" href={landingLinks.partnership}>
                    Testar Parceria
                  </a>
                </li>
              </ul>
            </nav>

            <nav aria-label="Redes e contato">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-background/42">Conversar</p>
              <ul className="mt-4 flex flex-col gap-3">
                <li>
                  <a
                    className="inline-flex items-center gap-2 text-sm text-background/70 transition-colors hover:text-background"
                    href={landingLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <InstagramIcon aria-hidden="true" className="size-4" />
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    className="inline-flex items-center gap-2 text-sm text-background/70 transition-colors hover:text-background"
                    href={landingLinks.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircleIcon aria-hidden="true" className="size-4" />
                    WhatsApp
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-background/12 pt-6 text-xs text-background/42 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 ZapFlow. Todos os direitos reservados.</p>
          <p>Feito para operações que querem fluir.</p>
        </div>
      </div>
    </footer>
  )
}
