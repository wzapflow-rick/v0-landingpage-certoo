"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CheeseEffect } from "./cheese-effect"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0f2847] to-[#0a1628]" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              +500 estabelecimentos confiam no ZapFlow
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-balance">
              Pare de perder vendas.{" "}
              <br className="hidden md:block" />
              Comece a{" "}
              <span className="text-gradient-orange font-extrabold">
                vender mais
              </span>{" "}
              <br className="hidden md:block" />
              com o ZapFlow.
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0 text-pretty">
              Seu cardápio digital profissional que transforma visitantes em clientes. 
              Pedidos direto no WhatsApp, sem taxas por pedido, sem complicação.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold text-lg px-8 py-6 rounded-xl shadow-lg shadow-green-500/30 animate-pulse-glow"
                asChild
              >
                <a href="#planos">
                  Quero Vender Mais Agora
                </a>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800/50 font-medium text-lg px-8 py-6 rounded-xl"
                asChild
              >
                <a href="#demo">
                  Ver Demonstração
                </a>
              </Button>
            </div>
            
            {/* Social proof */}
            <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div 
                    key={i} 
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-red-500 border-2 border-background flex items-center justify-center text-xs font-bold text-white"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div className="text-sm text-gray-400">
                <span className="text-green-400 font-bold">4.9/5</span> de satisfação
                <br />
                <span className="text-white font-medium">+2.000</span> avaliações
              </div>
            </div>
          </div>
          
          {/* Right content - Pizza image */}
          <div className="flex-1 relative">
            <CheeseEffect />
            <div className="relative animate-float">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT_Image_1_de_mai._de_2026_07_10_10_1-QjuWS8KUURVn8hym7gCPJcjjaxqxC0.png"
                alt="Pizza ZapFlow - Delivery rápido como um raio"
                width={600}
                height={600}
                className="w-full max-w-lg mx-auto drop-shadow-2xl"
                priority
              />
              
              {/* Stats badges */}
              <div className="absolute -left-4 top-1/4 bg-card/90 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-border">
                <div className="text-2xl font-bold text-green-400">+300%</div>
                <div className="text-sm text-gray-400">em vendas</div>
              </div>
              
              <div className="absolute -right-4 bottom-1/4 bg-card/90 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-border">
                <div className="text-2xl font-bold text-orange-400">0%</div>
                <div className="text-sm text-gray-400">taxa por pedido</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-gray-500 flex justify-center pt-2">
          <div className="w-1 h-3 bg-gray-500 rounded-full" />
        </div>
      </div>
    </section>
  )
}
