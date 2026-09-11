export const landingLinks = {
  login: "https://cardapio.wzapflow.com.br/login",
  partnership: "https://cardapio.wzapflow.com.br/signup?plano=parceria",
  start: "https://cardapio.wzapflow.com.br/signup?plano=start",
  pro: "https://cardapio.wzapflow.com.br/signup?plano=pro",
  elite: "https://cardapio.wzapflow.com.br/signup?plano=elite",
  instagram: "https://instagram.com/zapflow",
  whatsapp: "https://wa.me/5579998841252",
} as const

export const navigation = [
  { label: "O fluxo", href: "#fluxo" },
  { label: "Produto", href: "#produto" },
  { label: "Recursos", href: "#recursos" },
  { label: "Planos", href: "#planos" },
  { label: "Dúvidas", href: "#duvidas" },
] as const

export const flowSteps = [
  {
    label: "Cardápio",
    title: "O cliente escolhe",
    description: "Um cardápio digital acessível por link ou QR Code.",
  },
  {
    label: "Pedido",
    title: "A operação recebe",
    description: "Os pedidos chegam organizados no Kanban.",
  },
  {
    label: "Pagamento",
    title: "A venda acontece",
    description: "Pix e cartões conectados ao mesmo fluxo.",
  },
  {
    label: "Entrega",
    title: "O pedido avança",
    description: "Taxas e etapas claras até a saída.",
  },
] as const

export const featureGroups = [
  {
    index: "01",
    label: "Escolha",
    title: "Um cardápio pronto para vender",
    description:
      "Seu cliente acessa pelo link ou QR Code, encontra os itens e faz o pedido no próprio celular.",
    availability: "Em todos os planos",
    features: ["Cardápio digital", "Link + QR Code", "Pix + cartões"],
  },
  {
    index: "02",
    label: "Operação",
    title: "Cada pedido no lugar certo",
    description:
      "O Kanban organiza as etapas. Nos planos Pro e Elite, WhatsApp e agente de IA ampliam a automação.",
    availability: "Kanban em todos • Automação no Pro+",
    features: [
      "Kanban de pedidos",
      "Notificações no WhatsApp",
      "Agente de IA no WhatsApp",
    ],
  },
  {
    index: "03",
    label: "Entrega",
    title: "Da taxa fixa à rota completa",
    description:
      "Comece com taxa por bairro, evolua para cálculo por Google Maps e adicione o app de entregadores no Elite.",
    availability: "Recursos evoluem por plano",
    features: [
      "Taxa fixa por bairro",
      "Taxa por Google Maps",
      "App para entregadores",
    ],
  },
  {
    index: "04",
    label: "Crescimento",
    title: "Mais motivos para o cliente voltar",
    description:
      "Cupons entram no Pro. Programa de pontos, customização total e relatórios avançados fazem parte do Elite.",
    availability: "Pro e Elite",
    features: [
      "Cupons de desconto",
      "Programa de pontos",
      "Relatórios avançados",
    ],
  },
] as const

export const proofPoints = [
  {
    value: "+500",
    label: "estabelecimentos",
    description: "já usam o wZapFlow em sua operação.",
  },
  {
    value: "0%",
    label: "taxa por pedido",
    description: "a venda continua sendo do seu negócio.",
  },
  {
    value: "7 dias",
    label: "para testar",
    description: "o plano Parceria antes da mensalidade.",
  },
] as const

export type LandingPlan = {
  name: string
  stage: string
  price: string
  cadence: string
  billingNote?: string
  description: string
  features: readonly string[]
  assurances: readonly string[]
  cta: string
  href: string
  tone: "light" | "dark"
}

export const plans: readonly LandingPlan[] = [
  {
    name: "Parceria",
    stage: "Começar",
    price: "Grátis",
    cadence: "por 7 dias",
    billingNote: "Depois, R$ 29,90/mês",
    description: "O essencial para colocar o cardápio no ar e organizar os primeiros pedidos.",
    features: [
      "Cardápio digital (link + QR Code)",
      "Kanban básico",
      "Pix + cartões",
      "Taxa fixa por bairro",
      "Suporte por e-mail",
      "7 dias grátis para testar",
    ],
    assurances: ["Garantia de 7 dias", "Cancele quando quiser"],
    cta: "Testar Parceria",
    href: landingLinks.partnership,
    tone: "light",
  },
  {
    name: "Start",
    stage: "Operar",
    price: "R$ 79,90",
    cadence: "/mês",
    description: "Uma base direta para receber pedidos e manter a rotina organizada.",
    features: [
      "Cardápio digital",
      "Kanban básico",
      "Pix + cartões",
      "Taxa fixa por bairro",
      "Suporte por e-mail",
    ],
    assurances: ["Garantia de 7 dias", "Cancele quando quiser"],
    cta: "Escolher Start",
    href: landingLinks.start,
    tone: "light",
  },
  {
    name: "Pro",
    stage: "Automatizar",
    price: "R$ 149,90",
    cadence: "/mês",
    description: "Automação e comunicação para uma operação que já pede mais ritmo.",
    features: [
      "Tudo do Start",
      "Notificações no WhatsApp",
      "Taxa por Google Maps",
      "Agente de IA no WhatsApp",
      "Cupons de desconto",
      "Suporte prioritário",
    ],
    assurances: ["Garantia de 7 dias", "Cancele quando quiser"],
    cta: "Escolher Pro",
    href: landingLinks.pro,
    tone: "dark",
  },
  {
    name: "Elite",
    stage: "Escalar",
    price: "R$ 297,90",
    cadence: "/mês",
    description: "Estrutura completa para operações com entrega, fidelização e gestão avançada.",
    features: [
      "Tudo do Pro",
      "Customização total",
      "App para entregadores",
      "Programa de pontos",
      "Relatórios avançados",
      "Onboarding VIP",
      "Gerente de conta",
    ],
    assurances: ["Garantia de 7 dias", "Cancele quando quiser"],
    cta: "Escolher Elite",
    href: landingLinks.elite,
    tone: "light",
  },
] as const

export const faqs = [
  {
    question: "Como funcionam os 7 dias do plano Parceria?",
    answer:
      "Você começa gratuitamente no plano Parceria por 7 dias. Depois desse período, a assinatura passa a R$ 29,90 por mês.",
  },
  {
    question: "O wZapFlow cobra comissão sobre os pedidos?",
    answer:
      "Não. O wZapFlow informa 0% de taxa por pedido. Você paga a mensalidade correspondente ao plano escolhido.",
  },
  {
    question: "Posso cancelar quando quiser?",
    answer:
      "Sim. Os planos informam cancelamento a qualquer momento e garantia de 7 dias.",
  },
  {
    question: "Qual é a diferença entre Start, Pro e Elite?",
    answer:
      "O Start cobre a operação básica. O Pro adiciona WhatsApp, cálculo por Google Maps, agente de IA, cupons e suporte prioritário. O Elite acrescenta customização total, app de entregadores, pontos, relatórios avançados, onboarding VIP e gerente de conta.",
  },
  {
    question: "Quais meios de pagamento aparecem nos planos?",
    answer:
      "Os planos incluem Pix e cartões entre os recursos informados no cadastro.",
  },
  {
    question: "Como funciona o suporte?",
    answer:
      "Parceria e Start incluem suporte por e-mail. O Pro oferece suporte prioritário; o Elite inclui onboarding VIP e gerente de conta.",
  },
] as const
