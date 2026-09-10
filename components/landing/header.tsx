"use client"

import { LogInIcon, MenuIcon } from "lucide-react"

import { BrandMark } from "@/components/landing/brand-mark"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { landingLinks, navigation } from "@/lib/landing-content"

export function Header() {
  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl rounded-full border border-background/15 bg-foreground/85 px-3 py-2 text-background shadow-2xl shadow-foreground/15 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <BrandMark className="pl-1" />

          <nav aria-label="Navegação principal" className="hidden items-center gap-6 lg:flex">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-semibold text-background/70 transition-colors hover:text-background focus-visible:text-background"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 sm:flex">
            <Button asChild variant="ghost" size="sm">
              <a href={landingLinks.login}>
                <LogInIcon data-icon="inline-start" />
                Entrar
              </a>
            </Button>
            <Button asChild size="sm" className="rounded-full">
              <a href={landingLinks.partnership}>Testar 7 dias</a>
            </Button>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Abrir menu">
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[88%] overflow-y-auto border-border sm:max-w-sm">
              <SheetHeader>
                <SheetTitle>
                  <BrandMark />
                </SheetTitle>
                <SheetDescription>Escolha um capítulo ou acesse sua conta.</SheetDescription>
              </SheetHeader>

              <nav aria-label="Navegação móvel" className="flex flex-col px-4">
                {navigation.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <a
                      href={item.href}
                      className="border-b border-border py-4 text-xl font-bold tracking-tight"
                    >
                      {item.label}
                    </a>
                  </SheetClose>
                ))}
              </nav>

              <SheetFooter>
                <Button asChild variant="outline" className="rounded-full">
                  <a href={landingLinks.login}>Entrar na conta</a>
                </Button>
                <Button asChild className="rounded-full">
                  <a href={landingLinks.partnership}>Começar pelo Parceria</a>
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
