"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { HelpCircle } from "lucide-react"

const faqs = [
  {
    question: "Quanto tempo leva pra começar a usar?",
    answer: "Em menos de 15 minutos você já tem seu cardápio no ar. É só cadastrar seus produtos com fotos e pronto. Nosso time ajuda você em todo o processo."
  },
  {
    question: "Preciso de conhecimento técnico?",
    answer: "Zero! Se você sabe usar WhatsApp, sabe usar o ZapFlow. A gente criou pensando em quem não tem tempo pra complicação."
  },
  {
    question: "Tem taxa por pedido como o iFood?",
    answer: "Não! Essa é a melhor parte. Você paga apenas a mensalidade fixa. Pode vender R$10 mil ou R$100 mil por mês - o valor é o mesmo. O lucro é 100% seu."
  },
  {
    question: "Funciona em qualquer cidade?",
    answer: "Sim! O ZapFlow funciona em todo o Brasil. Seja em capital ou interior, você consegue usar sem problemas."
  },
  {
    question: "E se eu não gostar?",
    answer: "Tranquilo! Você tem 7 dias de garantia. Se não curtir, devolvemos cada centavo. Sem perguntas, sem burocracia."
  },
  {
    question: "Posso cancelar quando quiser?",
    answer: "Claro! Não tem fidelidade nem multa. Você fica porque quer, não porque é obrigado. Mas pode confiar: depois que começar a vender mais, você não vai querer parar."
  }
]

export function FaqSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-card/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-muted text-gray-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <HelpCircle className="w-4 h-4" />
              Tire suas dúvidas
            </div>
            <h2 className="text-3xl md:text-4xl font-black mb-4 text-balance">
              Perguntas <span className="text-gradient-orange">frequentes</span>
            </h2>
          </div>
          
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card/50 border border-border/50 rounded-2xl px-6 overflow-hidden"
              >
                <AccordionTrigger className="text-left text-lg font-bold text-white hover:text-orange-400 transition-colors py-5 [&>svg]:text-orange-500">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
