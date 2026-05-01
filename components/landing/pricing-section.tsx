"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Check, Star, Crown, Zap, Rocket } from "lucide-react"

const plans = [
  {
    name: "START",
    price: "79,90",
    mascot: "/mascote-start.png",
    mascotPosition: "sitting", // sentado no topo do card
    description: "Pra começar a lucrar",
    icon: Zap,
    features: [
      "Cardápio digital (Link + QrCode)",
      "Painel Kanban básico",
      "Pix + Cartões",
      "Taxa Fixa por bairro",
      "Suporte por email"
    ],
    cta: "Começar Agora",
    popular: false,
    gradient: "from-blue-500 to-cyan-500",
    bgGlow: "bg-blue-500/10"
  },
  {
    name: "PRO",
    price: "149,90",
    mascot: "/mascote-pro.png",
    mascotPosition: "pointing", // apontando para o card
    description: "O favorito dos campeões",
    icon: Rocket,
    features: [
      "Tudo do Start +",
      "Painel com notificação WhatsApp",
      "Taxa por Google Maps",
      "Agente de IA no WhatsApp",
      "Cupons de desconto",
      "Suporte prioritário"
    ],
    cta: "Escolher PRO",
    popular: true,
    gradient: "from-green-500 to-emerald-500",
    bgGlow: "bg-green-500/20"
  },
  {
    name: "ELITE",
    price: "297,90",
    mascot: "/mascote-elite.png",
    mascotPosition: "relaxed", // deitado, relaxado
    description: "Pra quem quer dominar",
    icon: Crown,
    features: [
      "Tudo do PRO +",
      "Customização Total",
      "App para entregadores",
      "Programa de pontos",
      "Relatórios avançados",
      "Onboarding VIP",
      "Gerente de conta"
    ],
    cta: "Ser ELITE",
    popular: false,
    gradient: "from-orange-500 to-red-500",
    bgGlow: "bg-orange-500/10"
  }
]

export function PricingSection() {
  return (
    <section id="planos" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      
      {/* Decorative blurs */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-green-500/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-[120px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 text-balance">
            Escolha seu plano e{" "}
            <span className="text-gradient-orange">comece a lucrar</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Sem taxa por pedido. Sem surpresas. Cancele quando quiser.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-end">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative pricing-card ${
                plan.popular 
                  ? "md:-mt-8" 
                  : ""
              }`}
            >
              {/* Mascot */}
              <div className={`absolute -top-16 z-20 ${
                plan.mascotPosition === "sitting" 
                  ? "left-4 w-24 h-24" 
                  : plan.mascotPosition === "pointing" 
                    ? "right-0 w-28 h-28 -rotate-6" 
                    : "right-2 w-28 h-24 rotate-6"
              }`}>
                <Image
                  src={plan.mascot}
                  alt={`Mascote ${plan.name}`}
                  fill
                  className="object-contain mascot-image drop-shadow-2xl"
                />
              </div>
              
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-black px-6 py-2 rounded-full flex items-center gap-2 shadow-xl shadow-green-500/30 z-10">
                  <Star className="w-4 h-4 fill-current" />
                  MAIS ESCOLHIDO
                </div>
              )}
              
              {/* Card */}
              <div className={`relative bg-card border rounded-3xl p-6 lg:p-8 overflow-hidden ${
                plan.popular 
                  ? "border-green-500/50 shadow-2xl shadow-green-500/20" 
                  : "border-border/50"
              }`}>
                {/* Background glow */}
                <div className={`absolute inset-0 ${plan.bgGlow} opacity-50`} />
                
                <div className="relative">
                  {/* Plan icon & name */}
                  <div className="flex items-center gap-3 mb-4 mt-8">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center`}>
                      <plan.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className={`text-2xl font-black bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}>
                        {plan.name}
                      </h3>
                      <p className="text-gray-400 text-sm">{plan.description}</p>
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-gray-400 text-lg">R$</span>
                      <span className="text-5xl font-black text-white">{plan.price}</span>
                      <span className="text-gray-400">/mês</span>
                    </div>
                  </div>
                  
                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${plan.gradient} flex items-center justify-center shrink-0 mt-0.5`}>
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* CTA Buttons */}
                  <div className="space-y-3">
                    <Button 
                      className={`w-full py-6 font-bold text-lg rounded-xl transition-all duration-300 ${
                        plan.popular 
                          ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white shadow-lg shadow-green-500/30 hover:scale-105" 
                          : `bg-gradient-to-r ${plan.gradient} hover:opacity-90 text-white`
                      }`}
                      asChild
                    >
                      <a href="https://wa.me/5579999999999?text=Quero%20assinar%20o%20plano%20ZapFlow" target="_blank" rel="noopener noreferrer">
                        {plan.cta}
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Guarantee */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 bg-green-500/10 border border-green-500/30 rounded-full px-8 py-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
              <Check className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <p className="text-green-400 font-bold">Garantia de 7 dias</p>
              <p className="text-gray-400 text-sm">Não gostou? Devolvemos cada centavo.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
