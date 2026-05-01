"use client"

import Image from "next/image"
import { Check } from "lucide-react"

const features = [
  "Design profissional que vende",
  "Categorias organizadas",
  "Fotos em alta qualidade",
  "Botão de pedido direto",
  "Horário de funcionamento",
  "Busca inteligente de produtos"
]

export function DemoSection() {
  return (
    <section id="demo" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Phone mockup */}
          <div className="flex-1 relative">
            <div className="relative mx-auto w-[280px] sm:w-[320px]">
              {/* Phone frame */}
              <div className="relative bg-black rounded-[3rem] p-3 shadow-2xl shadow-green-500/20">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-2xl" />
                <div className="rounded-[2.5rem] overflow-hidden">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-YNUtob87H8iyiQ40lik1Rm4aztZ4Wa.png"
                    alt="ZapFlow Cardápio Digital - Screenshot do sistema"
                    width={320}
                    height={692}
                    className="w-full"
                  />
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -z-10 top-10 -left-10 w-40 h-40 bg-green-500/20 rounded-full blur-3xl" />
              <div className="absolute -z-10 bottom-10 -right-10 w-40 h-40 bg-orange-500/20 rounded-full blur-3xl" />
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">
              Um cardápio que{" "}
              <span className="text-gradient-orange">faz seu cliente</span>{" "}
              querer comprar
            </h2>
            
            <p className="text-gray-400 text-lg mb-8">
              Esqueça cardápios de papel ou PDFs confusos. Com o ZapFlow, seu cliente 
              visualiza produtos incríveis, escolhe o que quer e faz o pedido em segundos. 
              Tudo pelo celular, direto no seu WhatsApp.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-green-400" />
                  </div>
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
            
            <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-xl p-6">
              <p className="text-orange-300 font-medium">
                &ldquo;Depois do ZapFlow, meus pedidos triplicaram. O cardápio 
                é tão bonito que o cliente quer pedir tudo!&rdquo;
              </p>
              <p className="text-gray-400 mt-2 text-sm">
                - Carlos Silva, Pizzaria Bella Napoli
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
