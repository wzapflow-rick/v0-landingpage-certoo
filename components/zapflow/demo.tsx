import { ArrowRight, Bot, CheckCheck } from "lucide-react"
import type { CSSProperties, ReactNode } from "react"
import { landingLinks } from "@/lib/landing-content"
import { ChatStage } from "./chat-stage"
import { PhoneFrame } from "./phone-frame"

const steps = [
  { title: "O cliente escolhe", text: "Abre o cardápio pelo link ou QR Code e monta o pedido em poucos toques." },
  { title: "O pedido cai no WhatsApp", text: "Itens, endereço e pagamento chegam organizados, sem anotação manual." },
  { title: "A IA confirma e responde", text: "Dúvidas e ajustes são atendidos na hora, mesmo no pico do movimento." },
  { title: "Você só prepara", text: "Acompanhe cada etapa no Kanban e o cliente é avisado automaticamente." },
]

function Bubble({
  index,
  side,
  children,
  ai = false,
}: {
  index: number
  side: "in" | "out"
  children: ReactNode
  ai?: boolean
}) {
  const isOut = side === "out"
  return (
    <div
      className={`chat-bubble flex max-w-[85%] flex-col gap-1 ${isOut ? "self-end" : "self-start"}`}
      style={{ "--i": index } as CSSProperties}
    >
      {ai ? (
        <span className="flex items-center gap-1 px-1 text-[11px] font-semibold text-accent">
          <Bot className="size-3" aria-hidden="true" />
          Resposta automática da IA
        </span>
      ) : null}
      <div
        className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
          isOut ? "rounded-br-sm bg-primary/20 text-foreground" : "rounded-bl-sm bg-secondary text-foreground"
        }`}
      >
        {children}
        <span className="mt-1 flex items-center justify-end gap-1 text-[10px] text-muted-foreground">
          19:4{index + 2}
          {isOut ? <CheckCheck className="size-3 text-primary" aria-hidden="true" /> : null}
        </span>
      </div>
    </div>
  )
}

export function Demo() {
  return (
    <section id="demo" className="relative border-y border-border/60 bg-card/30">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">Como funciona</p>
          <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
            Do toque no cardápio à mensagem no WhatsApp.
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Veja o caminho de um pedido real: o cliente escolhe no celular e a automação cuida da conversa.
          </p>
        </div>

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[auto_1fr] lg:gap-16">
          <div className="mx-auto w-full max-w-[16rem] lg:w-72 lg:max-w-none">
            <PhoneFrame
              src="/images/landing/menu-product-mobile.png"
              alt="Tela do cardápio wZapFlow com a escolha de tamanho da Batata Frita e botão Continuar"
            />
            <p className="mt-4 text-center text-sm text-muted-foreground">No celular do cliente</p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="overflow-hidden rounded-2xl border border-border/80 bg-background shadow-2xl">
              <div className="flex items-center gap-3 border-b border-border/80 bg-card px-4 py-3">
                <span className="flex size-9 items-center justify-center rounded-full bg-accent text-sm font-extrabold text-accent-foreground">
                  TA
                </span>
                <div>
                  <p className="text-sm font-bold">Tropical Açaí</p>
                  <p className="text-xs text-primary">online</p>
                </div>
              </div>

              <ChatStage className="flex min-h-[22rem] flex-col gap-3 p-4 sm:p-6">
                <Bubble index={0} side="in">
                  <strong className="font-bold">Pedido #1042 confirmado</strong>
                  <br />
                  1x Batata Frita Grande · R$ 17,00
                  <br />
                  Entrega: Rua das Flores, 120
                  <br />
                  Pagamento: Pix
                </Bubble>
                <Bubble index={1} side="out">
                  Consegue mandar sem sal?
                </Bubble>
                <Bubble index={2} side="in" ai>
                  Claro! Anotei: sem sal. Previsão de entrega em 35 min.
                </Bubble>
                <Bubble index={3} side="in">
                  Seu pedido saiu para entrega!
                </Bubble>
              </ChatStage>
            </div>
            <p className="text-center text-sm text-muted-foreground lg:text-left">No WhatsApp, sem ninguém digitar</p>
          </div>
        </div>

        <ol className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.title} className="rounded-2xl border border-border/80 bg-card/60 p-5">
              <span className="font-mono text-xs font-semibold text-accent">Passo {index + 1}</span>
              <h3 className="mt-2 font-bold">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex justify-center">
          <a
            href={landingLinks.partnership}
            className="btn-glow inline-flex h-12 items-center gap-2 rounded-full px-7 font-bold text-primary-foreground"
          >
            Quero esse fluxo no meu delivery
            <ArrowRight className="size-5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}
