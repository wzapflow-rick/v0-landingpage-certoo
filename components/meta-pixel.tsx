"use client"

import Script from "next/script"

const META_PIXEL_ID = "1993504354377402"

// Funções para tracking de eventos
export const MetaEvents = {
  // Evento quando usuário inicia trial/teste
  startTrial: () => {
    if (typeof window !== "undefined" && (window as Window & { fbq?: (...args: unknown[]) => void }).fbq) {
      (window as Window & { fbq?: (...args: unknown[]) => void }).fbq!("track", "StartTrial")
    }
  },
  // Evento quando usuário se torna lead
  lead: () => {
    if (typeof window !== "undefined" && (window as Window & { fbq?: (...args: unknown[]) => void }).fbq) {
      (window as Window & { fbq?: (...args: unknown[]) => void }).fbq!("track", "Lead")
    }
  },
  // Evento de visualização de conteúdo
  viewContent: (contentName?: string) => {
    if (typeof window !== "undefined" && (window as Window & { fbq?: (...args: unknown[]) => void }).fbq) {
      (window as Window & { fbq?: (...args: unknown[]) => void }).fbq!("track", "ViewContent", {
        content_name: contentName,
      })
    }
  },
  // Evento de compra
  purchase: (value: number, currency: string = "BRL") => {
    if (typeof window !== "undefined" && (window as Window & { fbq?: (...args: unknown[]) => void }).fbq) {
      (window as Window & { fbq?: (...args: unknown[]) => void }).fbq!("track", "Purchase", {
        value,
        currency,
      })
    }
  },
  // Evento customizado
  custom: (eventName: string, params?: Record<string, unknown>) => {
    if (typeof window !== "undefined" && (window as Window & { fbq?: (...args: unknown[]) => void }).fbq) {
      (window as Window & { fbq?: (...args: unknown[]) => void }).fbq!("trackCustom", eventName, params)
    }
  },
}

export function MetaPixel() {
  return (
    <>
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  )
}
