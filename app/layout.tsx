import type { Metadata, Viewport } from "next"
import { Geist_Mono, Manrope } from "next/font/google"
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

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase,
  title: "wZapFlow — Do cardápio ao pedido. Tudo flui.",
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
    title: "wZapFlow — Do cardápio ao pedido. Tudo flui.",
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
    title: "wZapFlow — Do cardápio ao pedido. Tudo flui.",
    description: "Cardápio digital e operação de pedidos conectados, sem taxa por pedido.",
    images: ["/images/landing/zapflow-social.png"],
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#061c16",
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
