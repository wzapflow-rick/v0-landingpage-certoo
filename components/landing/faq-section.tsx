import { Reveal } from "@/components/landing/motion-primitives"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { faqs } from "@/lib/landing-content"

export function FAQSection() {
  return (
    <section id="duvidas" aria-labelledby="faq-heading" className="scroll-mt-24 bg-background text-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-24 sm:px-8 sm:pb-32 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              05 — Antes de começar
            </p>
            <h2
              id="faq-heading"
              className="mt-6 text-balance text-4xl font-extrabold leading-[1.04] tracking-[-0.05em] sm:text-5xl"
            >
              Respostas diretas para decidir com calma.
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <Accordion type="single" collapsible className="border-t border-border">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`item-${index + 1}`} className="border-border">
                <AccordionTrigger className="py-6 text-left text-lg font-bold tracking-tight hover:no-underline sm:text-xl">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="max-w-2xl pb-6 text-base leading-relaxed text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  )
}
