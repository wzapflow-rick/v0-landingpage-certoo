import type { Metadata, Viewport } from "next"
import { Caveat, Manrope } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"

import "./globals.css"

const metadataBase = new URL(
  process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000",
)

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
})

const geistMono = Caveat({
  subsets: ["latin"],
  variable: "--font-hand",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase,
  title: "Cardápio wZapFlow — Seu cardápio pode dar água na boca.",
  description:
    "Cardápio digital, pedidos e operação em um só fluxo. Receba pedidos online com 0% de taxa por pedido e teste o plano Parceria por 7 dias.",
  keywords: [
    "cardápio digital",
    "sistema de pedidos",
    "delivery",
    "restaurante",
    "pizzaria",
    "Kanban de pedidos",
    "pedidos no WhatsApp",
  ],
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Cardápio wZapFlow — Seu cardápio pode dar água na boca.",
    description: "Cardápio digital e operação de pedidos conectados, sem taxa por pedido.",
    type: "website",
    locale: "pt_BR",
    images: [
      {
        url: "/images/landing/zapflow-social.png",
        width: 1024,
        height: 1024,
        alt: "Pizza artesanal ao lado de uma interface móvel, representando o fluxo wZapFlow",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cardápio wZapFlow — Seu cardápio pode dar água na boca.",
    description: "Cardápio digital e operação de pedidos conectados, sem taxa por pedido.",
    images: ["/images/landing/zapflow-social.png"],
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#100c08",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className="bg-background">
      <body className={`${manrope.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === "production" ? <Analytics /> : null}
      </body>
    </html>
  )
}
