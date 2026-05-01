"use client"

import { Smartphone, Zap, TrendingUp, MessageCircle, Clock, Shield } from "lucide-react"

const benefits = [
  {
    icon: Smartphone,
    title: "Cardápio Digital Profissional",
    description: "Visual moderno que valoriza seus produtos e faz o cliente querer comprar",
    color: "from-green-500 to-emerald-600"
  },
  {
    icon: MessageCircle,
    title: "Pedidos no WhatsApp",
    description: "Cliente faz o pedido e você recebe direto no seu WhatsApp. Sem app extra.",
    color: "from-blue-500 to-cyan-600"
  },
  {
    icon: Zap,
    title: "Ativação em 5 Minutos",
    description: "Cadastre seus produtos e comece a vender hoje mesmo. Sem complicação.",
    color: "from-yellow-500 to-orange-500"
  },
  {
    icon: TrendingUp,
    title: "Aumente Suas Vendas",
    description: "Nossos clientes relatam aumento de até 300% nas vendas em 30 dias.",
    color: "from-orange-500 to-red-500"
  },
  {
    icon: Clock,
    title: "Funciona 24 Horas",
    description: "Seu cardápio nunca fecha. Receba pedidos a qualquer hora do dia ou noite.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Shield,
    title: "Zero Taxa por Pedido",
    description: "Diferente dos apps de delivery, você não paga taxa por venda. Lucro 100% seu.",
    color: "from-green-400 to-teal-500"
  }
]

export function BenefitsSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Por que donos de pizzarias e restaurantes{" "}
            <span className="text-gradient-orange">escolhem o ZapFlow?</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Tudo que você precisa para transformar seu delivery em uma máquina de vendas
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="group bg-card border border-border rounded-2xl p-6 card-hover"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <benefit.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">{benefit.title}</h3>
              <p className="text-gray-400">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
