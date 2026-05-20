"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight, Flame } from "lucide-react"
import { MetaEvents } from "@/components/meta-pixel"

export function CtaSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-background to-green-900/10" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-green-500/10 rounded-full blur-[100px]" />
      
      {/* Floating pizza - decorativo */}
      <div className="absolute -right-20 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none hidden lg:block">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT_Image_1_de_mai._de_2026_07_10_10_1-QjuWS8KUURVn8hym7gCPJcjjaxqxC0.png"
          alt=""
          width={400}
          height={400}
          className="animate-pizza-float"
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/30 text-red-400 px-5 py-2 rounded-full text-sm font-bold mb-8 badge-animated">
            <Flame className="w-4 h-4" />
            Vagas limitadas este mês
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-balance leading-tight">
            Chega de perder venda
            <br />
            <span className="text-gradient-orange">pra concorrente</span>
          </h2>
          
          <p className="text-gray-300 text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Enquanto você espera, seu concorrente já está usando cardápio digital 
            e roubando seus clientes. <span className="text-orange-400 font-semibold">Não deixe isso acontecer.</span>
          </p>
          
          {/* CTA Button */}
          <div className="flex flex-col items-center gap-4">
            <Button 
              size="lg"
              className="btn-cheese-explosion bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 hover:from-orange-400 hover:via-red-400 hover:to-orange-500 text-white font-black text-xl px-12 py-8 rounded-2xl shadow-2xl shadow-orange-500/30 animate-pulse-glow-orange transition-all duration-300 hover:scale-105 group"
              asChild
              onClick={() => MetaEvents.lead()}
            >
              <a href="#planos">
                Quero Dominar Meu Delivery
                <ChevronRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            
            <p className="text-gray-500 text-sm">
              Setup gratuito para os primeiros 10 cadastros do mês
            </p>
          </div>
          
          {/* Trust badges */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8">
            <div className="flex flex-col items-center">
              <div className="text-3xl font-black text-white">+500</div>
              <div className="text-sm text-gray-400">estabelecimentos</div>
            </div>
            <div className="w-px h-12 bg-gray-700" />
            <div className="flex flex-col items-center">
              <div className="text-3xl font-black text-green-400">4.9/5</div>
              <div className="text-sm text-gray-400">de satisfação</div>
            </div>
            <div className="w-px h-12 bg-gray-700" />
            <div className="flex flex-col items-center">
              <div className="text-3xl font-black text-orange-400">R$0</div>
              <div className="text-sm text-gray-400">taxa por pedido</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
