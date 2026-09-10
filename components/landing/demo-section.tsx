import Image from "next/image"
import {
  ArrowDownIcon,
  BarChart3Icon,
  BotIcon,
  MapPinnedIcon,
  PanelsTopLeftIcon,
  QrCodeIcon,
  type LucideIcon,
} from "lucide-react"

import { Reveal } from "@/components/landing/motion-primitives"
import { Badge } from "@/components/ui/badge"
import { featureGroups } from "@/lib/landing-content"

const groupIcons: readonly LucideIcon[] = [
  QrCodeIcon,
  PanelsTopLeftIcon,
  MapPinnedIcon,
  BarChart3Icon,
]

export function DemoSection() {
  return (
    <section id="produto" aria-labelledby="product-heading" className="scroll-mt-24 bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <div className="max-w-5xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              02 — O produto entra em cena
            </p>
            <h2
              id="product-heading"
              className="mt-6 text-balance text-4xl font-extrabold leading-[1.02] tracking-[-0.055em] sm:text-6xl lg:text-8xl"
            >
              Uma experiência simples na frente. Um fluxo inteiro por trás.
            </h2>
          </div>
        </Reveal>

        <div className="mt-16 grid items-start gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <div className="relative mx-auto max-w-sm">
                <div className="rounded-[2.75rem] border border-border bg-foreground p-2.5 shadow-2xl shadow-foreground/15">
                  <div className="overflow-hidden rounded-[2.25rem] bg-foreground">
                    <Image
                      src="/images/landing/cardapio-digital.png"
                      alt="Cardápio digital real criado no ZapFlow, com categorias, produtos, preços e botões de pedido"
                      width={390}
                      height={854}
                      sizes="(min-width: 1024px) 360px, 82vw"
                      className="h-auto w-full"
                    />
                  </div>
                </div>

                <div className="absolute -right-3 top-20 hidden rounded-2xl border border-border bg-card p-4 shadow-xl sm:block lg:-right-20">
                  <div className="flex items-center gap-3">
                    <span className="size-2 rounded-full bg-primary" />
                    <div>
                      <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">Status</p>
                      <p className="mt-1 text-sm font-bold">Pedido recebido</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                    <ArrowDownIcon aria-hidden="true" className="size-3.5" />
                    segue para o Kanban
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div id="recursos" className="scroll-mt-28">
            <Reveal>
              <div className="border-b border-border pb-8">
                <div className="flex items-center gap-3">
                  <BotIcon aria-hidden="true" className="size-5 text-primary" />
                  <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Recursos conectados à jornada
                  </p>
                </div>
                <p className="mt-4 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
                  Você começa pelo essencial e adiciona automação, entrega e relacionamento conforme o plano evolui.
                </p>
              </div>
            </Reveal>

            <div className="flex flex-col">
              {featureGroups.map((group, index) => {
                const Icon = groupIcons[index]

                return (
                  <Reveal key={group.index} delay={index * 0.05}>
                    <article className="border-b border-border py-10">
                      <div className="grid gap-6 sm:grid-cols-[4rem_1fr]">
                        <div>
                          <span className="flex size-12 items-center justify-center rounded-full border border-border bg-card">
                            <Icon aria-hidden="true" className="size-5 text-primary" />
                          </span>
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-3">
                            <p className="font-mono text-xs font-bold tracking-[0.18em] text-primary">
                              {group.index} / {group.label}
                            </p>
                            <Badge variant="outline">{group.availability}</Badge>
                          </div>
                          <h3 className="mt-4 text-balance text-3xl font-bold tracking-[-0.035em]">{group.title}</h3>
                          <p className="mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
                            {group.description}
                          </p>
                          <ul className="mt-6 flex flex-wrap gap-2" aria-label={`Recursos de ${group.label}`}>
                            {group.features.map((feature) => (
                              <li key={feature} className="rounded-full bg-muted px-3 py-2 text-sm font-semibold">
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </article>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
