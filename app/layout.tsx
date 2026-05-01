import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'ZapFlow - Sistema de Delivery | Venda Mais com Cardápio Digital',
  description: 'Transforme seu delivery com o ZapFlow. Cardápio digital profissional, pedidos pelo WhatsApp, gestão completa. Aumente suas vendas em até 300%.',
  keywords: 'delivery, cardápio digital, pizzaria, restaurante, pedidos online, whatsapp',
  openGraph: {
    title: 'ZapFlow - Sistema de Delivery',
    description: 'Transforme seu delivery com o ZapFlow. Venda mais com cardápio digital profissional.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="bg-background">
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
