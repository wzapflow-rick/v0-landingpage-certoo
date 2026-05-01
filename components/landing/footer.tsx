"use client"

import Image from "next/image"
import { Instagram, MessageCircle } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-12 bg-card border-t border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT_Image_1_de_mai._de_2026_07_10_10_1-QjuWS8KUURVn8hym7gCPJcjjaxqxC0.png"
              alt="ZapFlow"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <span className="text-xl font-black text-white">
              Zap<span className="text-gradient-orange">Flow</span>
            </span>
          </div>
          
          {/* Links */}
          <div className="flex items-center gap-6">
            <a 
              href="#beneficios" 
              className="text-gray-400 hover:text-orange-400 transition-colors text-sm font-medium"
            >
              Benefícios
            </a>
            <a 
              href="#cardapio" 
              className="text-gray-400 hover:text-orange-400 transition-colors text-sm font-medium"
            >
              Cardápio
            </a>
            <a 
              href="#planos" 
              className="text-gray-400 hover:text-orange-400 transition-colors text-sm font-medium"
            >
              Planos
            </a>
          </div>
          
          {/* Social */}
          <div className="flex items-center gap-4">
            <a 
              href="https://instagram.com/zapflow" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-gray-400 hover:text-orange-400 hover:bg-orange-500/20 transition-all"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href="https://wa.me/5579998841252" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-gray-400 hover:text-green-400 hover:bg-green-500/20 transition-all"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border/50 text-center">
          <p className="text-gray-500 text-sm">
            {new Date().getFullYear()} ZapFlow. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
