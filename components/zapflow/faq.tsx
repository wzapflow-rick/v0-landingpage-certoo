import { ArrowRight, Plus } from "lucide-react"
import { faqs, landingLinks } from "@/lib/landing-content"

const items = [
  {
    question: "Preciso ter um site ou aplicativo?",
    answer: "Não. Seu cardápio ganha um link próprio e um QR Code para compartilhar com os clientes.",
  },
  ...faqs.slice(0, 4),
]

export function Faq() {
  return (
    <section id="duvidas" className="border-t border-border/60">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:py-24 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <h2 className="text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">Dúvidas frequentes</h2>
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
