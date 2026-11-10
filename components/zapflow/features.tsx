import Image from "next/image"
import {
  BarChart3,
  Bike,
  Bot,
  ClipboardList,
  Columns3,
  LayoutGrid,
  type LucideIcon,
  MessageCircle,
  QrCode,
  Ticket,
  Wallet,
} from "lucide-react"
import { features } from "@/lib/landing-content"

const icons: Record<(typeof features)[number]["icon"], LucideIcon> = {
  menu: QrCode,
  orders: ClipboardList,
  kanban: Columns3,
  tables: LayoutGrid,
  whatsapp: MessageCircle,
  ai: Bot,
  delivery: Bike,
  finance: Wallet,
  reports: BarChart3,
  loyalty: Ticket,
}

export function Features() {
  const [highlight, ...rest] = features
  const HighlightIcon = icons[highlight.icon]

  return (
    <section id="recursos" aria-labelledby="recursos-titulo" className="relative border-t border-border/60">
      <div className="mx-auto max-w-7xl px-5 py-20 md:py-28">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
          <h2 id="recursos-titulo" className="max-w-xl text-balance text-4xl font-extrabold tracking-[-0.035em] sm:text-5xl">
            Tudo o que o seu delivery precisa, <span className="text-flash italic">no mesmo painel.</span>
          </h2>
          <p className="max-w-md text-pretty leading-relaxed text-muted-foreground lg:justify-self-end">
            Cada recurso mostra em quais planos está disponível. Comece pelo essencial e libere o resto quando a operação
            pedir.
          </p>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          <article className="relative flex flex-col overflow-hidden rounded-3xl bg-card ring-1 ring-border/80 sm:flex-row lg:col-span-2 lg:row-span-2">
            <div className="flex flex-1 flex-col p-7 sm:p-8">
              <span className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <HighlightIcon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-2xl font-extrabold tracking-tight sm:text-3xl">{highlight.title}</h3>
              <p className="mt-3 max-w-sm text-pretty leading-relaxed text-muted-foreground">{highlight.description}</p>
              <p className="mt-6 w-fit rounded-full bg-primary/12 px-3 py-1 text-xs font-semibold text-primary sm:mt-auto">
                {highlight.availability}
              </p>
            </div>
            <div className="relative mx-auto -mb-16 w-56 shrink-0 self-end pt-2 sm:mr-8 sm:mt-8 sm:w-60">
              <div className="overflow-hidden rounded-t-[2rem] bg-background p-2 ring-1 ring-border">
                <Image
                  src="/images/landing/menu-product-mobile.png"
                  alt="Tela real de produto em um cardápio ZapFlash, com escolha de tamanho e preço"
                  width={390}
                  height={844}
                  className="h-auto w-full rounded-t-[1.6rem]"
                />
              </div>
            </div>
          </article>

          {rest.map((feature) => {
            const Icon = icons[feature.icon]
            return (
              <article
                key={feature.title}
                className="flex flex-col rounded-3xl bg-card/60 p-6 ring-1 ring-border/80 transition-colors duration-200 hover:bg-card"
              >
                <div className="flex items-center justify-between gap-4">
                  <Icon className="size-5 text-primary" aria-hidden="true" />
                  <p className="text-right text-xs font-semibold text-muted-foreground">{feature.availability}</p>
                </div>
                <h3 className="mt-6 text-lg font-extrabold tracking-tight">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
