export const siteUrl = "https://www.wzapflow.com.br"

export const ctaLabel = "Começar 7 dias grátis"

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
    title: "Cliente acessa o cardápio",
    description: "Pelo link ou QR Code, direto no celular, sem baixar aplicativo.",
  },
  {
    title: "Escolhe os produtos",
    description: "Tamanhos, adicionais e observações em cada item.",
  },
  {
    title: "Finaliza o pedido",
    description: "Endereço, taxa de entrega e pagamento por Pix ou cartão.",
  },
  {
    title: "A loja recebe e organiza",
    description: "O pedido entra completo no Kanban, pronto para preparo.",
  },
  {
    title: "A operação acompanha",
    description: "Cada pedido avança de etapa até a saída para entrega.",
  },
] as const

export const painPoints = [
  {
    pain: "Pedidos desorganizados",
    cost: "Papel, prints e mensagens espalhadas viram erro na cozinha.",
    solution: "Todos os pedidos entram no mesmo Kanban, separados por etapa.",
  },
  {
    pain: "Atendimento manual",
    cost: "Alguém precisa parar tudo para anotar cada pedido.",
    solution: "O cliente monta o pedido sozinho no cardápio. No Pro e Elite, avisos e agente de IA no WhatsApp.",
  },
  {
    pain: "Falta de controle",
    cost: "Sem histórico, não dá para saber o que vendeu e o que travou.",
    solution: "Cada pedido fica registrado com itens, pagamento e status em um só painel.",
  },
  {
    pain: "Entregas sem acompanhamento",
    cost: "Cliente perguntando onde está o pedido, taxa calculada no chute.",
    solution: "Etapas claras até a saída, taxa por bairro ou por Google Maps e app de entregadores no Elite.",
  },
  {
    pain: "Tempo perdido na operação",
    cost: "Retrabalho para confirmar endereço, item e forma de pagamento.",
    solution: "O pedido já chega completo: itens, adicionais, endereço e pagamento.",
  },
] as const

export const features = [
  {
    icon: "menu",
    title: "Cardápio digital",
    description:
      "Seu cardápio com fotos, tamanhos e adicionais, aberto por link ou QR Code. O cliente pede pelo celular e o pedido chega organizado.",
    availability: "Em todos os planos",
  },
  {
    icon: "orders",
    title: "Gestão de pedidos",
    description: "Itens, endereço e pagamento de cada pedido em um só lugar.",
    availability: "Todos os planos",
  },
  {
    icon: "kanban",
    title: "Kanban",
    description: "Pedidos separados por etapa, do recebimento à saída.",
    availability: "Básico no Parceria e Start",
  },
  {
    icon: "tables",
    title: "Gestão de mesas",
    description: "Pedidos do salão organizados junto com o delivery.",
    availability: "Na plataforma",
  },
  {
    icon: "whatsapp",
    title: "WhatsApp",
    description: "Notificações automáticas de status para o cliente.",
    availability: "Pro e Elite",
  },
  {
    icon: "ai",
    title: "Agente de IA",
    description: "Responde seus clientes no WhatsApp enquanto você opera.",
    availability: "Pro e Elite",
  },
  {
    icon: "delivery",
    title: "Gestão de entregas",
    description: "Taxa por bairro, cálculo por Google Maps e app para entregadores.",
    availability: "Evolui por plano",
  },
  {
    icon: "finance",
    title: "Financeiro",
    description: "Acompanhe o que entra por Pix e cartões.",
    availability: "Na plataforma",
  },
  {
    icon: "reports",
    title: "Relatórios",
    description: "Leitura do desempenho da operação para decidir melhor.",
    availability: "Avançados no Elite",
  },
  {
    icon: "loyalty",
    title: "Cupons e fidelização",
    description: "Cupons de desconto e programa de pontos para o cliente voltar.",
    availability: "Cupons no Pro · pontos no Elite",
  },
] as const

export const guarantees = [
  { title: "0% de comissão", description: "Você paga só a mensalidade. A venda continua sendo do seu negócio." },
  { title: "7 dias grátis", description: "Teste o plano Parceria na prática antes da primeira cobrança." },
  { title: "Garantia de 7 dias", description: "Vale para todos os planos, inclusive Start, Pro e Elite." },
  { title: "Cancele quando quiser", description: "Sem fidelidade e sem multa para sair." },
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
    description: "já usam o ZapFlash em sua operação.",
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
    assurances: ["Cancele quando quiser"],
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
    assurances: ["Cancele quando quiser"],
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
    assurances: ["Cancele quando quiser"],
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
    question: "O ZapFlash cobra comissão sobre os pedidos?",
    answer:
      "Não. O ZapFlash informa 0% de taxa por pedido. Você paga a mensalidade correspondente ao plano escolhido.",
  },
  {
    question: "Posso cancelar quando quiser?",
    answer:
      "Sim. Os planos informam cancelamento a qualquer momento. O plano Parceria tem 7 dias grátis.",
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
