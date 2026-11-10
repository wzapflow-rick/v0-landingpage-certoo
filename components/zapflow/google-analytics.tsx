import Script from "next/script"
import { GA_LINKER_DOMAINS } from "@/lib/analytics"

const GA_ID_PATTERN = /^G-[A-Z0-9]{4,16}$/

export function GoogleAnalytics() {
  const id = process.env.NEXT_PUBLIC_GA_ID?.trim()
  if (!id || !GA_ID_PATTERN.test(id)) return null

  const config = JSON.stringify({ linker: { domains: GA_LINKER_DOMAINS } })

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments);};gtag('js',new Date());gtag('config','${id}',${config});`}
      </Script>
    </>
  )
}
