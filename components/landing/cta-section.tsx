"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"

export function CtaSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-green-900/30 via-background to-orange-900/20 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-green-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Content */}
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">
              Pronto para{" "}
              <span className="text-gradient-orange">triplicar</span>{" "}
              suas vendas?
            </h2>
            
            <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto lg:mx-0">
              Junte-se a mais de 500 estabelecimentos que já transformaram seu 
              delivery com o ZapFlow. Comece hoje e veja resultados em 7 dias.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold text-lg px-8 py-6 rounded-xl shadow-lg shadow-green-500/30"
                asChild
              >
                <a 
                  href="https://wa.me/5579999999999?text=Quero%20começar%20no%20ZapFlow" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Falar com Consultor
                </a>
              </Button>
            </div>
            
            <p className="mt-4 text-sm text-gray-500">
              Sem compromisso. Tire suas dúvidas e descubra o plano ideal.
            </p>
          </div>
          
          {/* Image */}
          <div className="flex-1">
            <div className="relative animate-float">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT_Image_1_de_mai._de_2026_07_10_10_1-QjuWS8KUURVn8hym7gCPJcjjaxqxC0.png"
                alt="Pizza ZapFlow"
                width={400}
                height={400}
                className="w-full max-w-md mx-auto drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
