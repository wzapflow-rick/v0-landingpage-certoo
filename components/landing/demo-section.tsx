"use client"

import Image from "next/image"
import { Check, Flame } from "lucide-react"

const features = [
  "Design que faz salivar",
  "Categorias organizadas",
  "Fotos em alta qualidade",
  "Pedido em 1 clique",
  "Combos irresistíveis",
  "Busca inteligente"
]

export function DemoSection() {
  return (
    <section id="cardapio" className="py-24 bg-gradient-to-b from-card via-card/80 to-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent" />
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Phone mockup */}
          <div className="flex-1 relative phone-mockup">
            <div className="relative mx-auto w-[280px] sm:w-[300px]">
              {/* Phone frame */}
              <div className="relative bg-black rounded-[3rem] p-2 shadow-2xl shadow-green-500/20 border border-gray-800">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-b-3xl z-10" />
                {/* Screen */}
                <div className="rounded-[2.5rem] overflow-hidden bg-black">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-YNUtob87H8iyiQ40lik1Rm4aztZ4Wa.png"
                    alt="ZapFlow Cardápio Digital - Screenshot do sistema"
                    width={300}
                    height={650}
                    className="w-full"
                  />
                </div>
              </div>
              
              {/* Floating badge */}
              <div className="absolute -right-4 top-20 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl px-4 py-2 shadow-xl badge-animated">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4" />
                  <span className="font-bold text-sm">Mais Pedido</span>
                </div>
              </div>
              
              {/* Stats badge */}
              <div className="absolute -left-8 bottom-32 bg-card/95 backdrop-blur-md border border-green-500/30 rounded-2xl p-3 shadow-xl badge-animated" style={{ animationDelay: '0.3s' }}>
                <div className="text-xl font-black text-green-400">+47%</div>
                <div className="text-xs text-gray-400">ticket médio</div>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 text-orange-400 px-4 py-2 rounded-full text-sm font-bold mb-6">
              <Flame className="w-4 h-4" />
              Cardápio que vende sozinho
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 text-balance leading-tight">
              Seu cliente vai{" "}
              <span className="text-gradient-orange">querer pedir tudo</span>
            </h2>
            
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Esqueça PDF ou foto de cardápio borrada. Com o ZapFlow, cada produto 
              aparece como se fosse capa de revista. <span className="text-orange-400 font-semibold">O cliente olha, saliva e pede.</span> Simples assim.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 group">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-300 font-medium">{feature}</span>
                </div>
              ))}
            </div>
            
            {/* Testimonial */}
            <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-2xl p-6">
              <p className="text-orange-200 font-medium text-lg italic">
                &ldquo;Depois do ZapFlow, meus pedidos triplicaram. O cardápio é tão bonito que o cliente quer pedir tudo!&rdquo;
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold">
                  C
                </div>
                <div>
                  <p className="text-white font-semibold">Carlos Silva</p>
                  <p className="text-gray-400 text-sm">Pizzaria Bella Napoli</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
