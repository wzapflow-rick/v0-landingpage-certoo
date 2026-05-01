"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "Preciso saber programar para usar o ZapFlow?",
    answer: "De jeito nenhum! O ZapFlow foi feito para ser simples. Você cadastra seus produtos, coloca as fotos e pronto. Em 5 minutos seu cardápio está no ar."
  },
  {
    question: "Quanto tempo leva para configurar?",
    answer: "A maioria dos nossos clientes configura o cardápio completo em menos de 1 hora. Se você já tiver as fotos dos produtos, pode ser ainda mais rápido."
  },
  {
    question: "Vocês cobram taxa por pedido?",
    answer: "NÃO! Diferente dos apps de delivery, nós não cobramos nenhuma taxa por pedido. Você paga apenas a mensalidade fixa do plano escolhido."
  },
  {
    question: "Como funciona o pedido pelo WhatsApp?",
    answer: "O cliente escolhe os produtos no seu cardápio digital e clica em fazer pedido. Automaticamente, uma mensagem formatada é enviada para seu WhatsApp com todos os itens, valores e dados do cliente."
  },
  {
    question: "Posso testar antes de assinar?",
    answer: "Sim! Oferecemos 7 dias de garantia. Se não gostar ou não for o que esperava, devolvemos 100% do seu dinheiro sem perguntas."
  },
  {
    question: "Funciona para qualquer tipo de restaurante?",
    answer: "Sim! Pizzarias, hamburguerias, marmitarias, açaiterias, lanchonetes, bares, confeitarias... O ZapFlow se adapta a qualquer tipo de estabelecimento de alimentação."
  },
  {
    question: "Posso mudar de plano depois?",
    answer: "Claro! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento, sem multas ou burocracia."
  }
]

export function FaqSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-gray-400 text-lg">
            Tire suas dúvidas sobre o ZapFlow
          </p>
        </div>
        
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-card border border-border rounded-xl px-6"
            >
              <AccordionTrigger className="text-left text-lg font-medium hover:no-underline hover:text-green-400 py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
