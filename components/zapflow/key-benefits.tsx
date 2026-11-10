import { BadgePercent, LayoutGrid, Smartphone } from "lucide-react"

const benefits = [
  {
    icon: LayoutGrid,
    title: "Pedidos organizados",
    text: "Tudo chega ao mesmo painel, separado por etapa. Chega de pedidos perdidos em conversas e papéis.",
  },
  {
    icon: Smartphone,
    title: "Mais autonomia",
    text: "Seu cliente monta o pedido sozinho pelo cardápio digital, sem precisar chamar alguém para anotar tudo.",
  },
  {
    icon: BadgePercent,
    title: "Zero comissão",
    text: "Você paga uma mensalidade fixa e não entrega uma porcentagem de cada venda para a plataforma.",
  },
] as const

export function KeyBenefits() {
  return (
    <section id="beneficios" aria-labelledby="beneficios-titulo" className="scroll-mt-16 border-t border-border/60">
      <div className="mx-auto max-w-7xl px-5 py-20 md:py-24">
        <h2
          id="beneficios-titulo"
          className="max-w-xl text-balance text-4xl font-extrabold tracking-[-0.035em] sm:text-5xl"
        >
          Seu delivery merece <span className="text-flash italic">mais controle.</span>
        </h2>

        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {benefits.map(({ icon: Icon, title, text }, index) => (
            <li key={title} className="flex flex-col gap-5 rounded-3xl bg-card p-6 sm:p-7">
              <div className="flex items-center justify-between">
                <span className="flex size-11 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span className="font-display text-sm font-bold tabular-nums text-muted-foreground" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-extrabold tracking-tight">{title}</h3>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
