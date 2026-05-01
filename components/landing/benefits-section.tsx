"use client"

import Image from "next/image"
import { Flame, Zap, TrendingUp, Clock, Shield, Sparkles } from "lucide-react"

const benefits = [
  {
    icon: Flame,
    title: "Cardápio que Dá Fome",
    description: "Fotos de dar água na boca. Seu cliente vai querer pedir tudo que ver.",
    color: "from-orange-500 to-red-600"
  },
  {
    icon: Zap,
    title: "Pedido em 30 Segundos",
    description: "Do celular direto pro seu caixa. Sem app, sem download, sem complicação.",
    color: "from-yellow-500 to-orange-500"
  },
  {
    icon: TrendingUp,
    title: "Vendas Explodem",
    description: "Nossos clientes faturam até 300% mais. Cardápio bonito vende mais.",
    color: "from-green-500 to-emerald-600"
  },
  {
    icon: Clock,
    title: "Nunca Fecha",
    description: "Seu cardápio trabalha 24h. Enquanto você dorme, ele recebe pedidos.",
    color: "from-blue-500 to-cyan-600"
  },
  {
    icon: Shield,
    title: "Zero Taxa Por Pedido",
    description: "Diferente do iFood, você não paga comissão. O lucro é 100% seu.",
    color: "from-emerald-500 to-teal-600"
  },
  {
    icon: Sparkles,
    title: "Fideliza Automático",
    description: "Sistema de pontos e cashback que faz o cliente voltar sempre.",
    color: "from-amber-500 to-orange-600"
  }
]

export function BenefitsSection() {
  return (
    <section id="beneficios" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
      
      {/* Decorative pizza slice */}
      <div className="absolute -right-20 top-20 opacity-10 rotate-12">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT_Image_1_de_mai._de_2026_07_10_10_1-QjuWS8KUURVn8hym7gCPJcjjaxqxC0.png"
          alt=""
          width={300}
          height={300}
          className="w-64"
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 text-balance">
            Por que donos de pizzarias{" "}
            <span className="text-gradient-orange">escolhem o ZapFlow?</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Porque cansaram de perder dinheiro com iFood e cardápio de papel
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="group relative bg-card/80 backdrop-blur-sm border border-border/50 rounded-3xl p-8 card-hover overflow-hidden"
            >
              {/* Glow on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              
              <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                <benefit.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-orange-400 transition-colors">
                {benefit.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
