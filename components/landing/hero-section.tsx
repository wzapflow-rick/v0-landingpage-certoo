"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CheeseEffect } from "./cheese-effect"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1a] via-[#0d1829] to-[#0a1628]" />
      
      {/* Decorative blurs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-green-500/10 rounded-full blur-[100px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-500/5 rounded-full blur-[150px]" />
      
      {/* Floating food particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-2 h-2 rounded-full bg-orange-400/30"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Left content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Badge com texto derretendo */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 text-orange-300 px-5 py-2.5 rounded-full text-sm font-bold mb-8 badge-animated">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
              </span>
              Cardápio que dá água na boca
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.1] mb-6 text-balance">
              Tudo que você
              <br />
              precisa para{" "}
              <span className="text-melting inline-block">
                vender mais
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-xl mx-auto lg:mx-0 text-pretty leading-relaxed">
              Transforme fome em pedidos. Seu cardápio digital que faz o cliente 
              <span className="text-orange-400 font-semibold"> salivar </span> 
              e comprar em segundos.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="btn-cheese-explosion bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white font-black text-lg px-10 py-7 rounded-2xl shadow-2xl animate-pulse-glow transition-all duration-300 hover:scale-105"
                asChild
              >
                <a href="#planos">
                  Quero Vender Mais
                </a>
              </Button>
            </div>
            
            {/* Social proof */}
            <div className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-8">
              <div className="flex flex-col items-center lg:items-start">
                <div className="text-3xl font-black text-white">+500</div>
                <div className="text-sm text-gray-400">estabelecimentos</div>
              </div>
              <div className="w-px h-10 bg-gray-700 hidden sm:block" />
              <div className="flex flex-col items-center lg:items-start">
                <div className="text-3xl font-black text-green-400">0%</div>
                <div className="text-sm text-gray-400">taxa por pedido</div>
              </div>
              <div className="w-px h-10 bg-gray-700 hidden sm:block" />
              <div className="flex flex-col items-center lg:items-start">
                <div className="text-3xl font-black text-orange-400">+100%</div>
                <div className="text-sm text-gray-400">em vendas</div>
              </div>
            </div>
          </div>
          
          {/* Right content - Pizza image */}
          <div className="flex-1 relative mt-8 lg:mt-0">
            {/* Cheese dripping effect behind pizza */}
            <CheeseEffect />
            
            {/* Pizza principal com animação */}
            <div className="relative">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT_Image_1_de_mai._de_2026_07_10_10_1-QjuWS8KUURVn8hym7gCPJcjjaxqxC0.png"
                alt="Pizza ZapFlow - Delivery rápido como um raio"
                width={650}
                height={650}
                className="w-full max-w-xl mx-auto animate-pizza-glow"
                priority
              />
              
              {/* Steam/smoke effects */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex gap-4">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="steam-particle w-8 h-8 bg-gradient-to-t from-yellow-500/20 to-transparent rounded-full blur-sm"
                    style={{ animationDelay: `${i * 0.8}s` }}
                  />
                ))}
              </div>
              
              {/* Badge flutuante */}
              <div className="absolute -left-4 lg:-left-8 top-1/3 bg-card/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-green-500/30 badge-animated">
                <div className="text-2xl font-black text-green-400">+100%</div>
                <div className="text-xs text-gray-400">em vendas</div>
              </div>
              
              <div className="absolute -right-4 lg:-right-8 bottom-1/3 bg-card/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-orange-500/30 badge-animated" style={{ animationDelay: '0.5s' }}>
                <div className="text-2xl font-black text-orange-400">Zero</div>
                <div className="text-xs text-gray-400">taxa por pedido</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-orange-500/50 flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-orange-500 rounded-full" />
        </div>
      </div>
    </section>
  )
}
