"use client"

import { useState } from "react"
import { ArrowRight, Menu, X } from "lucide-react"
import { landingLinks } from "@/lib/landing-content"
import { Brand } from "./brand"

const links = [
  { label: "Recursos", href: "#recursos" },
  { label: "Como funciona", href: "#demo" },
  { label: "Planos", href: "#planos" },
  { label: "Dúvidas", href: "#duvidas" },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-foreground/[0.06] bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5">
        <Brand />

        <nav
          aria-label="Navegação principal"
          className="hidden items-center gap-1 text-sm font-medium text-foreground/65 md:flex"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-2 transition-colors hover:bg-foreground/[0.05] hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href={landingLinks.login}
            className="rounded-full px-3.5 py-2 text-sm font-medium text-foreground/65 transition-colors hover:text-foreground"
          >
            Entrar
          </a>
          <a
            href={landingLinks.partnership}
            className="btn-glow inline-flex h-10 items-center gap-1.5 rounded-full pl-5 pr-4 text-sm font-bold text-primary-foreground"
          >
            Criar meu cardápio
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </div>

        <button
          type="button"
          className="btn-quiet inline-flex size-10 items-center justify-center rounded-full md:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="menu-movel"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
        </button>
      </div>

      {open ? (
        <nav id="menu-movel" aria-label="Navegação móvel" className="border-t border-border/60 px-5 pb-6 pt-2 md:hidden">
          <ul className="flex flex-col">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-border/60 py-4 text-base font-medium"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a href={landingLinks.login} className="block py-4 text-base text-muted-foreground">
                Entrar na minha conta
              </a>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  )
}
