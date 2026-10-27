import { ArrowRight, Plus } from "lucide-react"
import { faqs, landingLinks } from "@/lib/landing-content"

const productFaqs = [
  {
    question: "Preciso ter um site?",
    answer: "Não. Seu cardápio ganha um link próprio e um QR Code para compartilhar com os clientes.",
  },
  {
    question: "Como meus clientes fazem os pedidos?",
    answer:
      "Eles acessam o link ou QR Code, escolhem os produtos e finalizam. Você acompanha tudo no Kanban; nos planos Pro e Elite, o WhatsApp e o agente de IA automatizam a conversa.",
  },
]

export function Faq() {
  const items = [...productFaqs, ...faqs]

  return (
    <section id="duvidas" className="border-t border-border/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:py-28 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-accent">Dúvidas</p>
          <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">Perguntas frequentes</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">Não encontrou o que procurava? Fale com a nossa equipe.</p>
          <a
            href={landingLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 font-semibold text-primary hover:underline"
          >
            Falar no WhatsApp
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </div>

        <div className="flex flex-col">
          {items.map((item) => (
            <details key={item.question} className="group border-b border-border/80">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-semibold [&::-webkit-details-marker]:hidden">
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
