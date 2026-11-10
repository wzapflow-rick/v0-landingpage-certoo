import type { Metadata, Viewport } from "next"
import { Manrope, Montserrat } from "next/font/google"
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

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-montserrat",
  display: "swap",
})

const title = "ZapFlash — Gestão de delivery sem comissão por pedido"
const description =
  "Organize pedidos, cardápio e operação em um só lugar. Venda sem pagar comissão por pedido. 7 dias grátis no plano Parceria."

export const metadata: Metadata = {
  metadataBase,
  title,
  description,
  keywords: [
    "gestão de delivery",
    "cardápio digital",
    "sistema de pedidos",
    "Kanban de pedidos",
    "pedidos no WhatsApp",
    "delivery sem comissão",
  ],
  icons: {
    icon: "/brand/favicon.png",
    shortcut: "/brand/favicon.png",
    apple: "/brand/apple-icon.png",
  },
  openGraph: {
    title,
    description,
    type: "website",
    locale: "pt_BR",
    images: [{ url: "/brand/logo-badge.png", width: 512, height: 512, alt: "Logotipo ZapFlash, Gestão de Delivery" }],
  },
  twitter: {
    card: "summary",
    title,
    description,
    images: ["/brand/logo-badge.png"],
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#090b0d",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className="bg-background">
      <body className={`${manrope.variable} ${montserrat.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === "production" ? <Analytics /> : null}
      </body>
    </html>
  )
}
