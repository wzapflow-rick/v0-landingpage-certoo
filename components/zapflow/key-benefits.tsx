import { BadgePercent, Bot, LayoutGrid } from "lucide-react"

const benefits = [
  { icon: LayoutGrid, title: "Pedidos organizados", text: "Tudo chega completo e separado por etapa." },
  { icon: Bot, title: "Atendimento mais inteligente", text: "O cliente pede sozinho. No Pro e Elite, a IA responde no WhatsApp." },
  { icon: BadgePercent, title: "Zero comissão por pedido", text: "Você paga só a mensalidade. A venda é toda sua." },
] as const

export function KeyBenefits() {
  return (
    <section aria-label="Benefícios" className="border-t border-border/60">
      <ul className="mx-auto grid max-w-7xl gap-8 px-5 py-14 md:grid-cols-3 md:gap-6">
        {benefits.map(({ icon: Icon, title, text }) => (
          <li key={title} className="flex items-start gap-4">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <div>
              <h3 className="font-extrabold">{title}</h3>
              <p className="mt-1 text-pretty text-sm leading-relaxed text-muted-foreground">{text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
