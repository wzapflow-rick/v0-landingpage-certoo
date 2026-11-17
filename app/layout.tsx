import type { Metadata, Viewport } from "next"
import localFont from "next/font/local"
import { Analytics } from "@vercel/analytics/next"

import { ConversionTracker } from "@/components/zapflow/conversion-tracker"
import { GoogleAnalytics } from "@/components/zapflow/google-analytics"
import { siteUrl } from "@/lib/landing-content"
import "./globals.css"

const metadataBase = new URL(process.env.NODE_ENV === "production" ? siteUrl : "http://localhost:3000")

// Self-hosted so builds never depend on downloading from Google Fonts.
const manrope = localFont({
  src: "./fonts/manrope-latin-wght-normal.woff2",
  weight: "200 800",
  style: "normal",
  variable: "--font-manrope",
  display: "swap",
})

const montserrat = localFont({
  src: [
    { path: "./fonts/montserrat-latin-700-normal.woff2", weight: "700", style: "normal" },
    { path: "./fonts/montserrat-latin-700-italic.woff2", weight: "700", style: "italic" },
    { path: "./fonts/montserrat-latin-800-normal.woff2", weight: "800", style: "normal" },
    { path: "./fonts/montserrat-latin-800-italic.woff2", weight: "800", style: "italic" },
    { path: "./fonts/montserrat-latin-900-normal.woff2", weight: "900", style: "normal" },
    { path: "./fonts/montserrat-latin-900-italic.woff2", weight: "900", style: "italic" },
  ],
  variable: "--font-montserrat",
  display: "swap",
})

const title = "ZapFlash — Venda pelo delivery sem pagar comissão por pedido"
const description =
  "Cardápio digital, pedidos e WhatsApp num só painel, com mensalidade fixa e zero comissão por pedido. Teste 7 dias grátis, sem cartão de crédito."

export const metadata: Metadata = {
  metadataBase,
  title,
  description,
  alternates: { canonical: "/" },
  keywords: [
    "gestão de delivery",
    "cardápio digital",
    "sistema de pedidos",
    "Kanban de pedidos",
    "pedidos no WhatsApp",
    "delivery sem comissão",
  ],
  icons: {
    icon: [{ url: "/brand/favicon.png?v=2", type: "image/png", sizes: "512x512" }],
    shortcut: "/brand/favicon.png?v=2",
    apple: "/brand/apple-icon.png?v=2",
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
        <ConversionTracker />
        <GoogleAnalytics />
        {process.env.NODE_ENV === "production" ? <Analytics /> : null}
      </body>
    </html>
  )
}
