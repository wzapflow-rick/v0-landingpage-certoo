import { ArrowRight, Plus } from "lucide-react"
import { landingLinks } from "@/lib/landing-content"

const items = [
  {
    question: "Como funcionam os 7 dias grátis?",
    answer: "Você cria sua conta no plano Parceria e usa por 7 dias sem pagar. Depois, a mensalidade é de R$ 29,90.",
  },
  {
    question: "A ZapFlash cobra comissão sobre minhas vendas?",
    answer: "Não. Você paga só a mensalidade do plano. Nenhuma porcentagem sobre os pedidos.",
  },
  {
    question: "Preciso instalar algum aplicativo?",
    answer: "Não. O cardápio abre pelo link ou QR Code, direto no navegador do celular.",
  },
  {
    question: "Posso cancelar quando quiser?",
    answer: "Sim. Sem fidelidade e sem multa para sair.",
  },
]

export function Faq() {
  return (
    <section id="duvidas" aria-labelledby="duvidas-titulo" className="scroll-mt-16 border-t border-border/60">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:py-24 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <h2 id="duvidas-titulo" className="max-w-md text-balance text-4xl font-extrabold tracking-[-0.035em] sm:text-5xl">
            Pronto para organizar <span className="text-flash italic">seu delivery?</span>
          </h2>
          <a
            href={landingLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 font-semibold text-primary hover:underline"
          >
            Outra dúvida? Fale no WhatsApp
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </div>

        <div className="flex flex-col">
          {items.map((item) => (
            <details key={item.question} className="group border-b border-border/80">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-5 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                {item.question}
                <Plus
                  className="size-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-45"
                  aria-hidden="true"
                />
              </summary>
              <p className="pb-5 pr-8 leading-relaxed text-muted-foreground">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
