"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Check, Star } from "lucide-react"

const plans = [
  {
    name: "START",
    price: "79,90",
    mascot: "/mascote-start.jpg",
    description: "Perfeito para começar a vender online",
    features: [
      "Cardápio digital completo",
      "Até 50 produtos",
      "Pedidos via WhatsApp",
      "QR Code personalizado",
      "Suporte por email"
    ],
    cta: "Começar Agora",
    popular: false,
    color: "from-blue-500 to-cyan-500"
  },
  {
    name: "PRO",
    price: "149,90",
    mascot: "/mascote-pro.jpg",
    description: "Para quem quer crescer de verdade",
    features: [
      "Tudo do Start +",
      "Produtos ilimitados",
      "Múltiplos cardápios",
      "Relatórios de vendas",
      "Cupons de desconto",
      "Suporte prioritário"
    ],
    cta: "Escolher PRO",
    popular: true,
    color: "from-green-500 to-emerald-500"
  },
  {
    name: "ELITE",
    price: "297,90",
    mascot: "/mascote-elite.jpg",
    description: "Máximo poder para seu delivery",
    features: [
      "Tudo do PRO +",
      "Domínio personalizado",
      "API de integração",
      "Multi-unidades",
      "Gestor de pedidos",
      "Onboarding exclusivo",
      "Gerente de conta"
    ],
    cta: "Ser ELITE",
    popular: false,
    color: "from-orange-500 to-red-500"
  }
]

export function PricingSection() {
  return (
    <section id="planos" className="py-20 bg-gradient-to-b from-card to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Escolha o plano ideal para{" "}
            <span className="text-gradient-orange">seu negócio</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Sem taxa por pedido. Sem surpresas. Cancele quando quiser.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative bg-card border rounded-3xl p-6 card-hover ${
                plan.popular 
                  ? "border-green-500 scale-105 shadow-xl shadow-green-500/20" 
                  : "border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-bold px-4 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-4 h-4 fill-current" />
                  MAIS POPULAR
                </div>
              )}
              
              {/* Mascot */}
              <div className="relative w-28 h-28 mx-auto mb-4">
                <Image
                  src={plan.mascot}
                  alt={`Mascote ${plan.name}`}
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
              
              <div className="text-center mb-6">
                <h3 className={`text-2xl font-bold bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`}>
                  {plan.name}
                </h3>
                <p className="text-gray-400 text-sm mt-1">{plan.description}</p>
              </div>
              
              <div className="text-center mb-6">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-gray-400 text-lg">R$</span>
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400">/mês</span>
                </div>
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center shrink-0`}>
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className={`w-full py-6 font-bold text-lg rounded-xl ${
                  plan.popular 
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg shadow-green-500/30" 
                    : "bg-muted hover:bg-muted/80 text-white"
                }`}
                asChild
              >
                <a href="https://wa.me/5579999999999?text=Quero%20assinar%20o%20plano%20ZapFlow" target="_blank" rel="noopener noreferrer">
                  {plan.cta}
                </a>
              </Button>
            </div>
          ))}
        </div>
        
        {/* Guarantee */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 bg-green-500/10 border border-green-500/30 rounded-full px-6 py-3">
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
              <Check className="w-6 h-6 text-green-400" />
            </div>
            <span className="text-green-300 font-medium">
              Garantia de 7 dias. Não gostou? Devolvemos seu dinheiro.
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
