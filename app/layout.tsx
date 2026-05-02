import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: 'ZapFlow - Venda Mais com Cardápio Digital | Sistema de Delivery',
  description: 'Transforme seu delivery em uma máquina de vendas. Cardápio digital que dá água na boca, pedidos em segundos, zero taxa por pedido. +500 estabelecimentos já usam.',
  keywords: 'delivery, cardápio digital, pizzaria, restaurante, pedidos online, whatsapp, sistema delivery, cardapio online',
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'ZapFlow - Venda Mais com Cardápio Digital',
    description: 'Transforme seu delivery em uma máquina de vendas. Cardápio digital profissional, zero taxa por pedido.',
    type: 'website',
    images: ['https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT_Image_1_de_mai._de_2026_07_10_10_1-QjuWS8KUURVn8hym7gCPJcjjaxqxC0.png']
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZapFlow - Venda Mais com Cardápio Digital',
    description: 'Transforme seu delivery em uma máquina de vendas.',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="bg-background">
      <body className={`${inter.className} antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
