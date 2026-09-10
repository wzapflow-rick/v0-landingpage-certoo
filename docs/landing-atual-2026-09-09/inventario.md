# Inventário da landing ZapFlow — 9 de setembro de 2026

## 1. Referência preservada

Este diretório registra a landing considerada funcional e válida antes de sua reformulação completa. O material é descritivo: nenhum conteúdo, estilo, comportamento, ativo existente ou destino foi alterado para produzir este arquivo.

| Campo | Valor |
|---|---|
| Repositório | `wzapflow-rick/v0-landingpage-certoo` |
| Branch de origem | `main` |
| Commit de origem | `3e5632e9d9ab13c774451b501265ff7c5e9e6a8f` |
| Árvore Git de origem | `d7c1ba27739382ad766fa383c5ffa5a0636a0f8e` |
| Mensagem do commit | `Merge pull request #3 from wzapflow-rick/plano-parceria-zapflow` |
| Data do commit | `2026-05-15T23:01:59-03:00` |
| Branch de backup | `backup/landing-atual-2026-09-09` |
| Rota registrada | `/` |
| Idioma do documento | `pt-BR` |
| Data/hora da captura | `2026-09-09T23:57:07+00:00` |
| Commit do arquivo | o `HEAD` da branch de backup; por ser uma referência ao próprio commit, obtenha-o com `git rev-parse backup/landing-atual-2026-09-09` |

### Contagem rápida do conteúdo renderizado

- 1 header fixo, 6 seções de conteúdo e 1 footer.
- 1 H1, 5 H2 de seções, 6 títulos de benefícios, 4 títulos de planos e 6 títulos de FAQ: 22 headings no DOM desktop.
- 6 benefícios, 6 funcionalidades do cardápio, 4 planos, 25 itens de planos, 6 perguntas e respostas.
- 16 links no estado desktop; no mobile fechado, os links do menu não estão no DOM; no estado aberto, o conjunto volta a 16.
- 10 ocorrências de imagem no DOM, alimentadas por 5 URLs remotas únicas.
- 3 IDs de seção usados como âncora: `beneficios`, `cardapio` e `planos`.

## 2. Posicionamento, público e mensagem central

- **Produto:** ZapFlow, um cardápio digital e sistema de delivery.
- **Público verbalmente priorizado:** donos de pizzarias, restaurantes e estabelecimentos de delivery.
- **Promessa principal:** transformar fome em pedidos e aumentar vendas com um cardápio visual e rápido.
- **Diferenciais repetidos:** pedido em segundos, ausência de taxa por pedido, aumento de vendas, pagamento online, gestão e recursos de WhatsApp/IA.
- **Conversão principal:** levar o visitante ao cadastro do plano `parceria` ou à comparação dos quatro planos.
- **Tom:** direto, enérgico, apetitoso, orientado a lucro, urgência e simplicidade.
- **Provas e marcadores comerciais:** `+500 estabelecimentos`, `0% taxa por pedido`, `+100% em vendas`, `+47% ticket médio`, `4.9/5 de satisfação`, garantia de 7 dias e setup gratuito limitado.

## 3. Stack e configuração técnica

| Item | Registro atual |
|---|---|
| Framework | Next.js `16.2.4`, App Router (`app/`) |
| UI runtime | React `^19` e React DOM `^19` |
| Linguagem | TypeScript `5.7.3`; `strict: true`; alias `@/*` para a raiz |
| Estilos | Tailwind CSS `^4.2.0` via `@tailwindcss/postcss`; `tw-animate-css` `1.3.3` |
| Sistema de componentes | shadcn/ui, estilo `new-york`, RSC habilitado, variáveis CSS e base Radix |
| Componentes ativos | `Button` com Radix Slot/CVA; `Accordion` com `@radix-ui/react-accordion` `1.2.12` |
| Ícones | Lucide React `^0.564.0` |
| Fonte | Inter via `next/font/google`; corpo computado como `Inter, "Inter Fallback"` |
| Analytics | `@vercel/analytics` `1.6.1`, renderizado apenas quando `NODE_ENV === "production"` |
| Imagens | `next/image`; `images.unoptimized: true` no `next.config.mjs` |
| Build TypeScript | `typescript.ignoreBuildErrors: true` no `next.config.mjs` |
| Gerenciador | `pnpm-lock.yaml`; ambiente observado: pnpm `10.34.3`, Node `v24.16.0` |
| Scripts | `dev: next dev`, `build: next build`, `start: next start`, `lint: eslint .` |
| Tema da página | dark por tokens em `app/globals.css`; `<html className="bg-background">` |

`styles/globals.css` também existe no repositório como stylesheet contextual do scaffold. A rota ativa importa explicitamente `app/globals.css` a partir de `app/layout.tsx`.

## 4. Mapa de implementação

### Composição da rota

`app/page.tsx` renderiza, nesta ordem, dentro de `<main className="min-h-screen overflow-x-hidden">`:

1. `Header`
2. `HeroSection`
3. `BenefitsSection`
4. `DemoSection`
5. `PricingSection`
6. `FaqSection`
7. `CtaSection`
8. `Footer`

### Arquivos ativos e responsabilidade

| Arquivo | Responsabilidade |
|---|---|
| `app/page.tsx` | Composição e ordem da landing `/`. |
| `app/layout.tsx` | Inter, metadados, ícones, idioma, Analytics e import global de CSS. |
| `app/globals.css` | Tokens, base Tailwind e todos os efeitos/animações exclusivos da landing. |
| `components/landing/header.tsx` | Logo, navegação desktop, CTA e menu mobile controlado por estado local. |
| `components/landing/hero-section.tsx` | Promessa principal, CTA, prova social, pizza, partículas, vapor e badges. |
| `components/landing/benefits-section.tsx` | Grade dos seis benefícios. |
| `components/landing/demo-section.tsx` | Mockup do cardápio, lista de recursos, indicadores e depoimento. |
| `components/landing/pricing-section.tsx` | Dados e renderização dos quatro planos, mascotes, CTAs e garantia. |
| `components/landing/faq-section.tsx` | Seis FAQs em acordeão single/collapsible. |
| `components/landing/cta-section.tsx` | Urgência final, CTA para os planos e indicadores de confiança. |
| `components/landing/footer.tsx` | Marca, âncoras, Instagram, WhatsApp e ano dinâmico. |
| `components/landing/cheese-effect.tsx` | SVG animado de cinco fios de queijo atrás da pizza do hero. |
| `components/ui/button.tsx` | Primitive de botão usado nos CTAs. |
| `components/ui/accordion.tsx` | Primitive Radix usado nas FAQs. |
| `lib/utils.ts` | Função `cn`, combinando `clsx` e `tailwind-merge`. |

Todos os componentes em `components/landing/` possuem diretiva `"use client"`. O estado explícito da landing está no header (`mobileMenuOpen`); o estado da FAQ é mantido pelo Radix Accordion.

## 5. Transcrição completa da copy

### 5.1 Header

- Marca: **ZapFlow**.
- Navegação: **Benefícios**, **Cardápio**, **Planos**.
- CTA desktop e mobile: **Quero Vender Mais**.

### 5.2 Hero

- Badge: **Cardápio que dá água na boca**.
- H1: **Tudo que você precisa para vender mais**.
- Texto: **Transforme fome em pedidos. Seu cardápio digital que faz o cliente salivar e comprar em segundos.**
- CTA: **Quero Vender Mais**.
- Prova social:
  - **+500** — estabelecimentos.
  - **0%** — taxa por pedido.
  - **+100%** — em vendas.
- Badges flutuantes da imagem:
  - **+100%** — em vendas.
  - **Zero** — taxa por pedido.
- Alt principal: **Pizza ZapFlow - Delivery rápido como um raio**.

### 5.3 Benefícios

Título: **Por que donos de pizzarias escolhem o ZapFlow?**

Subtítulo: **Porque cansaram de perder dinheiro com iFood e cardápio de papel**.

1. **Cardápio que Dá Fome** — Fotos de dar água na boca. Seu cliente vai querer pedir tudo que ver.
2. **Pedido em 30 Segundos** — Do celular direto pro seu caixa. Sem app, sem download, sem complicação.
3. **Vendas Explodem** — Nossos clientes faturam até 100% mais. Cardápio bonito vende mais.
4. **Relatórios Completos** — Dados de vendas, produtos mais pedidos e faturamento em segundos.
5. **Zero Taxa Por Pedido** — Diferente do iFood, você não paga comissão. O lucro é 100% seu.
6. **Gerenciamento de Mesas** — Controle completo das mesas do seu estabelecimento em tempo real.

### 5.4 Demonstração do cardápio

- Badge de seção: **Cardápio que vende sozinho**.
- H2: **Seu cliente vai querer pedir tudo**.
- Texto: **Esqueça PDF ou foto de cardápio borrada. Com o ZapFlow, cada produto aparece como se fosse capa de revista. O cliente olha, saliva e pede. Simples assim.**
- Recursos:
  1. Design que faz salivar.
  2. Categorias organizadas.
  3. Fotos em alta qualidade.
  4. Pedido em 1 clique.
  5. Combos irresistíveis.
  6. Busca inteligente.
- Badge do mockup: **Mais Pedido**.
- Estatística do mockup: **+47% ticket médio**.
- Depoimento: **“Depois do ZapFlow, meus pedidos triplicaram. O cardápio é tão bonito que o cliente quer pedir tudo!”**
- Autor: **Carlos Silva**.
- Estabelecimento: **Pizzaria Bella Napoli**.
- Alt da tela: **ZapFlow Cardápio Digital - Screenshot do sistema**.

### 5.5 Planos

Título: **Escolha seu plano e comece a lucrar**.

Subtítulo: **Sem taxa por pedido. Sem surpresas. Cancele quando quiser.**

#### PARCERIA

- Badge: **RECOMENDADO**.
- Descrição: **7 dias grátis com acesso total!**
- Preço: **GRÁTIS por 7 dias**.
- Continuidade: **Depois R$ 29,90/mês**.
- Condição: **Sem cartão de crédito • Cancele quando quiser**.
- Recursos:
  1. Cardápio digital (Link + QrCode).
  2. Painel Kanban com notificação WhatsApp.
  3. Pix + Cartões (pagamento online).
  4. Taxa de entregas pelo Google Maps.
  5. Agente de IA no WhatsApp.
  6. Cupons de desconto.
  7. Acesso total a todas as funções.
- CTA: **Testar 7 Dias Grátis**.

#### START

- Descrição: **Pra começar a lucrar**.
- Preço: **R$ 79,90/mês**.
- Recursos:
  1. Cardápio digital (Link + QrCode).
  2. Painel Kanban básico.
  3. Pix + Cartões.
  4. Taxa Fixa por bairro.
  5. Suporte por email.
- CTA: **Começar Agora**.

#### PRO

- Descrição: **O favorito dos campeões**.
- Preço: **R$ 149,90/mês**.
- Recursos:
  1. Tudo do Start +.
  2. Painel com notificação WhatsApp.
  3. Taxa por Google Maps.
  4. Agente de IA no WhatsApp.
  5. Cupons de desconto.
  6. Suporte prioritário.
- CTA: **Escolher PRO**.

#### ELITE

- Descrição: **Pra quem quer dominar**.
- Preço: **R$ 297,90/mês**.
- Recursos:
  1. Tudo do PRO +.
  2. Customização Total.
  3. App para entregadores.
  4. Programa de pontos.
  5. Relatórios avançados.
  6. Onboarding VIP.
  7. Gerente de conta.
- CTA: **Ser ELITE**.

#### Garantia abaixo dos planos

- **Garantia de 7 dias**.
- **Não gostou? Devolvemos cada centavo.**

### 5.6 FAQ

Badge: **Tire suas dúvidas**.

Título: **Perguntas frequentes**.

1. **Quanto tempo leva pra começar a usar?**  
   Em menos de 15 minutos você já tem seu cardápio no ar. É só cadastrar seus produtos com fotos e pronto. Nosso time ajuda você em todo o processo.
2. **Preciso de conhecimento técnico?**  
   Zero! Se você sabe usar WhatsApp, sabe usar o ZapFlow. A gente criou pensando em quem não tem tempo pra complicação.
3. **Tem taxa por pedido como o iFood?**  
   Não! Essa é a melhor parte. Você paga apenas a mensalidade fixa. Pode vender R$10 mil ou R$100 mil por mês - o valor é o mesmo. O lucro é 100% seu.
4. **Funciona em qualquer cidade?**  
   Sim! O ZapFlow funciona em todo o Brasil. Seja em capital ou interior, você consegue usar sem problemas.
5. **E se eu não gostar?**  
   Tranquilo! Você tem 7 dias de garantia. Se não curtir, devolvemos cada centavo. Sem perguntas, sem burocracia.
6. **Posso cancelar quando quiser?**  
   Claro! Não tem fidelidade nem multa. Você fica porque quer, não porque é obrigado. Mas pode confiar: depois que começar a vender mais, você não vai querer parar.

### 5.7 CTA final

- Badge: **Vagas limitadas este mês**.
- H2: **Chega de perder venda pra concorrente**.
- Texto: **Enquanto você espera, seu concorrente já está usando cardápio digital e roubando seus clientes. Não deixe isso acontecer.**
- CTA: **Quero Dominar Meu Delivery**.
- Apoio: **Setup gratuito para os primeiros 10 cadastros do mês**.
- Indicadores:
  - **+500** — estabelecimentos.
  - **4.9/5** — de satisfação.
  - **R$0** — taxa por pedido.

### 5.8 Footer

- Marca: **ZapFlow**.
- Navegação: **Benefícios**, **Cardápio**, **Planos**.
- Redes/contato: Instagram e WhatsApp por ícones.
- Copyright no momento da captura: **2026 ZapFlow. Todos os direitos reservados.** O ano é calculado por `new Date().getFullYear()`.

## 6. Sistema visual atual

### 6.1 Direção visual

Landing escura, energética e gastronômica. A base é azul-marinho quase preta; laranja, amarelo e vermelho representam pizza, queijo, apetite e urgência; verde representa conversão, crescimento e ausência de taxa. Azul/ciano diferencia Start e relatórios; roxo/rosa diferencia o teste do plano Parceria.

### 6.2 Tokens declarados em `app/globals.css`

| Token | Valor |
|---|---|
| `--background` | `oklch(0.10 0.02 250)` |
| `--foreground` | `oklch(0.98 0 0)` |
| `--card` | `oklch(0.15 0.02 250)` |
| `--card-foreground` | `oklch(0.98 0 0)` |
| `--popover` | `oklch(0.15 0.02 250)` |
| `--popover-foreground` | `oklch(0.98 0 0)` |
| `--primary` | `oklch(0.65 0.2 145)` |
| `--primary-foreground` | `oklch(0.98 0 0)` |
| `--secondary` | `oklch(0.55 0.15 250)` |
| `--secondary-foreground` | `oklch(0.98 0 0)` |
| `--muted` | `oklch(0.22 0.02 250)` |
| `--muted-foreground` | `oklch(0.7 0 0)` |
| `--accent` | `oklch(0.7 0.22 40)` |
| `--accent-foreground` | `oklch(0.15 0 0)` |
| `--destructive` | `oklch(0.6 0.25 25)` |
| `--destructive-foreground` | `oklch(0.98 0 0)` |
| `--border` | `oklch(0.28 0.02 250)` |
| `--input` | `oklch(0.22 0.02 250)` |
| `--ring` | `oklch(0.65 0.2 145)` |
| `--chart-1` | `oklch(0.65 0.2 145)` |
| `--chart-2` | `oklch(0.55 0.15 250)` |
| `--chart-3` | `oklch(0.7 0.2 45)` |
| `--chart-4` | `oklch(0.6 0.25 25)` |
| `--chart-5` | `oklch(0.75 0.15 80)` |
| `--radius` | `0.75rem` |

Cores literais centrais dos efeitos:

- Hero: `#0a0f1a` → `#0d1829` → `#0a1628`.
- Texto “derretendo”: `#fbbf24` → `#f59e0b` → `#ea580c` → `#dc2626`.
- Texto laranja: `#fb923c` → `#f97316` → `#ea580c`.
- As superfícies usam transparências de `background`, `card`, `muted` e bordas; os CTAs usam gradientes green/emerald ou orange/red.

### 6.3 Tipografia

- Família única ativa: Inter.
- Peso dominante em títulos e números: `font-black`; subtítulos e controles alternam `font-bold`, `font-semibold` e `font-medium`.
- H1: `text-4xl`, `md:text-5xl`, `lg:text-6xl`, `xl:text-7xl`, line-height `1.1`.
- H2 de benefícios/cardápio/planos: `text-3xl`, `md:text-4xl`, `lg:text-5xl`.
- H2 do CTA final: `text-4xl`, `md:text-5xl`, `lg:text-6xl`.
- Corpo de destaque: `text-lg` a `text-xl`, com `leading-relaxed`.
- `text-balance` é aplicado aos títulos principais; o parágrafo do hero usa `text-pretty`.

### 6.4 Layout, superfícies e espaçamento

- Containers centrais: `container mx-auto px-4`.
- Seções internas: predominância de `py-24`.
- Header: fixed, 64 px de conteúdo, fundo `background/90`, blur e borda inferior; altura observada com borda: 65 px.
- Hero: `min-h-screen`, conteúdo em coluna até `lg`, depois duas colunas flexíveis.
- Benefícios: grid de 1/2/3 colunas em base/`md`/`lg`.
- Cardápio: coluna até `lg`, depois mockup e copy lado a lado.
- Planos: grid de 1/2/4 colunas em base/`md`/`lg`, alinhado pela base; Parceria sobe em `md`.
- Footer: coluna até `md`, depois marca, navegação e social na mesma linha.
- Cards: raios grandes (`rounded-2xl` e `rounded-3xl`), bordas translúcidas, sombras profundas, glows e fundos com backdrop blur.
- O mockup usa frame preto arredondado, notch e tela vertical de 390 × 854.

### 6.5 Responsividade observada

| Viewport | Altura total | Hero | Benefícios | Cardápio | Planos | FAQ | CTA | Footer |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| 1440 × 900 | 5614 | 900 | 872 | 840 | 1188 | 831 | 761 | 222 |
| 768 × 1024 | 7222 | 1218 | 1192 | 1419 | 1609 | 831 | 731 | 222 |
| 390 × 844 | 9731 | 1143 | 2058 | 1653 | 2721 | 911 | 899 | 346 |

- Em 1440 px: hero em duas colunas, benefícios em três, cardápio em duas e planos em quatro.
- Em 768 px: hero e cardápio permanecem empilhados; benefícios e planos usam duas colunas; navegação desktop já está visível.
- Em 390 px: todos os grids principais usam uma coluna; o menu hamburger substitui a navegação desktop; a pizza decorativa do CTA final fica oculta.
- Menu mobile aberto: header observado com 310 px de altura e cinco links visíveis (logo, três âncoras e CTA).

## 7. Animações e interações

| Nome/classe | Duração | Comportamento/uso |
|---|---:|---|
| `drip-wave` / `.text-melting::after` | 3 s | Onda vertical abaixo de “vender mais”. |
| `cheese-drip-1/2/3` | 2,5–3,2 s | Cinco fios SVG de queijo com ritmos e atrasos distintos. |
| `pizza-float` | 5 s | Movimento vertical, rotação e escala da pizza. |
| `pizza-glow` | 3 s | Glow amarelo oscilante junto da pizza. |
| `splat` | 0,5 s no `:active` | Explosão radial ao pressionar CTAs com `.btn-cheese-explosion`. |
| `pulse-glow-green` | 2 s | Glow pulsante no CTA verde do hero. |
| `pulse-glow-orange` | 2 s | Glow pulsante no CTA laranja final. |
| `.card-hover` | transição 0,4 s | Eleva e amplia cards de benefício no hover. |
| `.pricing-card` | transição 0,4 s | Eleva plano; mascote amplia e gira no hover. |
| `steam` | 3 s | Três partículas de vapor com atrasos de 0,8 s. |
| `phone-glow` | 4 s | Halo radial pulsante atrás do mockup. |
| `badge-bounce` | 2 s | Movimento vertical em badges de hero, mockup e CTA. |
| `particle-float` | 6 s | Seis partículas laranja do fundo do hero, com atrasos de 0,5 s. |
| Tailwind `animate-ping` | utilitário | Ponto vivo do badge do hero. |
| Tailwind `animate-bounce` | utilitário | Indicador de scroll do hero. |
| Accordion Radix/tw-animate | 200 ms no ícone + animação de conteúdo | Abre uma FAQ por vez e permite fechar a aberta. |

Outros comportamentos:

- `html { scroll-behavior: smooth; }` suaviza as âncoras.
- O menu mobile entra condicionalmente no DOM e fecha ao selecionar uma âncora.
- Links de planos e redes abrem nova aba; header, hero, CTA final e âncoras usam a aba atual.
- O CTA final navega primeiro para `#planos`; ele não aponta diretamente ao cadastro.
- O header fica fixo durante toda a rolagem.

## 8. SEO, compartilhamento e telemetria

| Campo | Valor |
|---|---|
| `<html lang>` | `pt-BR` |
| Title | `ZapFlow - Venda Mais com Cardápio Digital | Sistema de Delivery` |
| Description | `Transforme seu delivery em uma máquina de vendas. Cardápio digital que dá água na boca, pedidos em segundos, zero taxa por pedido. +500 estabelecimentos já usam.` |
| Keywords | `delivery, cardápio digital, pizzaria, restaurante, pedidos online, whatsapp, sistema delivery, cardapio online` |
| Ícone/shortcut/apple | `/favicon.png` |
| Open Graph title | `ZapFlow - Venda Mais com Cardápio Digital` |
| Open Graph description | `Transforme seu delivery em uma máquina de vendas. Cardápio digital profissional, zero taxa por pedido.` |
| Open Graph type | `website` |
| Open Graph image | URL remota da identidade/pizza, arquivada em `assets/zapflow-identidade-pizza-og.png` |
| Twitter card | `summary_large_image` |
| Twitter title | `ZapFlow - Venda Mais com Cardápio Digital` |
| Twitter description | `Transforme seu delivery em uma máquina de vendas.` |
| Twitter image no runtime | mesma imagem Open Graph |
| Viewport runtime | `width=device-width, initial-scale=1` |
| Analytics | Vercel Analytics somente em produção |

## 9. Ativos remotos renderizados e cópias de preservação

As URLs usadas pelo código continuam remotas. As cópias abaixo existem apenas para preservação.

| Uso | URL original | Arquivo preservado | Dimensão | Bytes | SHA-256 |
|---|---|---|---:|---:|---|
| Logo, pizza principal, decorações, OG e Twitter | `https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT_Image_1_de_mai._de_2026_07_10_10_1-QjuWS8KUURVn8hym7gCPJcjjaxqxC0.png` | `assets/zapflow-identidade-pizza-og.png` | 1313 × 1198 | 1.243.851 | `f1ebd5ab126059bf5b1fc1f725af19f6701558751b239c24e1af3af90a6b77d8` |
| Tela do cardápio no mockup | `https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-YNUtob87H8iyiQ40lik1Rm4aztZ4Wa.png` | `assets/cardapio-digital-screenshot.png` | 390 × 854 | 223.957 | `ee11445e8a336a0225e2ca39890de40eed290ae3f11c49c62ef2ebc8dd895ece` |
| Mascotes Parceria e Start | `https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT_Image_1_de_mai._de_2026__09_01_26-removebg-preview-rgYCkgksm8UH2pqWKyMMK6mUcCwiYt.png` | `assets/mascote-parceria-start.png` | 500 × 500 | 198.828 | `1b90e27f57933a5218667e9d1da75af5e356ea43e7ef5b15fa4aa5ce479a9a0c` |
| Mascote Pro | `https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT_Image_1_de_mai._de_2026__09_03_18-removebg-preview-ITRILTSSlT4vzBTip4SW1zBmtGFdhT.png` | `assets/mascote-pro.png` | 500 × 500 | 214.200 | `6095a991f02632565affb14e67c766b90234e716fcbfdf74b3a8ea4118b7832d` |
| Mascote Elite | `https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT_Image_1_de_mai._de_2026__09_05_23-removebg-preview-kXIqEweXc607FWu020AJ8L2e1pfwUT.png` | `assets/mascote-elite.png` | 500 × 500 | 244.604 | `0da577d4f938e4e7d6e26b411dd9a34a0fcdf7e0e0c7f0d6db3b22c41a4b17bf` |

### Ocorrências no DOM desktop

1. Logo do header: 40 × 40, alt `ZapFlow`.
2. Pizza do hero: aproximadamente 588 × 536, alt `Pizza ZapFlow - Delivery rápido como um raio`, prioridade.
3. Pizza decorativa de benefícios: aproximadamente 299 × 282, alt vazio.
4. Tela do cardápio: aproximadamente 282 × 618, alt descritivo.
5. Mascote Parceria: 96 × 96.
6. Mascote Start: 96 × 96.
7. Mascote Pro: aproximadamente 123 × 123.
8. Mascote Elite: aproximadamente 121 × 107.
9. Pizza decorativa do CTA: aproximadamente 411 × 376, alt vazio.
10. Logo do footer: 40 × 40, alt `ZapFlow`.

## 10. Ativos locais já presentes no repositório

| Caminho | Formato/dimensão detectada | SHA-256 | Papel na rota atual |
|---|---|---|---|
| `admin-dashboard.png` | PNG 1280 × 577 | `dd11a2ee6f17dd7e1200db9f77420e129b4c7792a16bca7ff0568379fa6c4df3` | Ativo contextual do repositório. |
| `public/apple-icon.png` | PNG 180 × 180 | `da678942d4656a903f61000551cc51c09464d7a223faaae304e8210e1ca19257` | Disponível no diretório público. |
| `public/favicon.png` | PNG 500 × 500 | `0da577d4f938e4e7d6e26b411dd9a34a0fcdf7e0e0c7f0d6db3b22c41a4b17bf` | Referenciado por icon, shortcut e apple metadata. |
| `public/icon-dark-32x32.png` | PNG 32 × 32 | `8a1570b2955c3748b6844356a7487d88c60f9f1e699e870a3452a3decd1ba03c` | Disponível no diretório público. |
| `public/icon-light-32x32.png` | PNG 32 × 32 | `83145e5bb033ace23cd8e7fbb63e7c39733aaf58f8a7280d7800995cced6f7c2` | Disponível no diretório público. |
| `public/icon.svg` | SVG | `263f117c0c69a44d3206a5702105c178ebaa164bca325f3c3973a13bd948f1bf` | Disponível no diretório público. |
| `public/mascote-elite.jpg` | JPEG 1024 × 1024 | `b13ed55235e3423249909493be250943ade3e01cf9a1925d1e2f14baa9f6fa81` | Disponível no diretório público. |
| `public/mascote-elite.png` | conteúdo JPEG 1024 × 1024 | `9f2ae55f03e3917af7b9553a3d3ef684ea1ebf6d02139f43ee73508e64736333` | Disponível no diretório público. |
| `public/mascote-pro.jpg` | JPEG 1024 × 1024 | `d97993c91ee9d95c3b81cb26913dada009aaf849287691e2c81c48572a2f4035` | Disponível no diretório público. |
| `public/mascote-pro.png` | conteúdo JPEG 1024 × 1024 | `e78c66c2f0e72e710982b6989b76014d169e219249bf865ce2b9ce1ebe0c89ff` | Disponível no diretório público. |
| `public/mascote-start.jpg` | JPEG 1024 × 1024 | `369496c381317b70fb86e0baff27b30541b151b0679b1d4a9814ec9180d44fa3` | Disponível no diretório público. |
| `public/mascote-start.png` | conteúdo JPEG 1024 × 1024 | `e394f0a50beef122ceb10e9df7d2836e9c422ad791ecc1e64350fd0451d07a3c` | Disponível no diretório público. |
| `public/placeholder-logo.png` | PNG 256 × 144 | `d7c39d978af643ba9525de6fb8171e0f834882db4110c82ecad0df3f4f69551a` | Scaffold disponível. |
| `public/placeholder-logo.svg` | SVG | `19a9e968f4656d52a4c249b4056117ad109370ba9da51cdc630ddded74cec73b` | Scaffold disponível. |
| `public/placeholder-user.jpg` | JPEG 200 × 200 | `22be067d748175598a5e00123902f5c8332dd7f101de03dfb92ec08d85bb5e53` | Scaffold disponível. |
| `public/placeholder.jpg` | JPEG 1 × 1 | `14be0c7aa11cca1e78f0966176b286a6d36d00ec64be027775dfeb33d8e2dfdf` | Scaffold disponível. |
| `public/placeholder.svg` | SVG | `64badf7aabda0b9630b87020ffb6095cb858ccbcf66b355c2aa08b1063954d3b` | Scaffold disponível. |

## 11. Capturas preservadas

As capturas completas foram feitas depois de percorrer a página até o fim para carregar o conteúdo visual e retornar ao topo.

| Arquivo | Dimensão real | Estado | SHA-256 |
|---|---:|---|---|
| `screenshots/desktop-1440x900.png` | 1440 × 5614 | Página completa, viewport 1440 × 900 | `3b23bb33ca2a84b99f0e009cb2c4d0abc391e94624d905f69a3d002fcafc17d7` |
| `screenshots/tablet-768x1024.png` | 768 × 7222 | Página completa, viewport 768 × 1024 | `e25e7876279ee6b4269c1446268df82b312cc87385e9b30c708200e148063532` |
| `screenshots/mobile-390x844.png` | 390 × 9731 | Página completa, viewport 390 × 844 | `12b9b645b21f0f44fba67e12172180babaf26faedd61f3af3ca5799360f99430` |
| `screenshots/mobile-menu-aberto-390x844.png` | 390 × 844 | Menu hamburger aberto, topo | `fd4ef93257a3d1d9f9b5e5aa46fcc079b2ce29cc47ab4199e4bbef66f7af0e10` |
| `screenshots/faq-expandida-mobile-390x844.png` | 390 × 844 | FAQ “Tem taxa por pedido como o iFood?” expandida | `f39f1737a1888dd881e1ad4a83d9f7099a9d42f1f427574f7ea977eb5e3a7473` |

## 12. Preservação dos redirecionamentos

A matriz completa está em [`redirecionamentos.md`](./redirecionamentos.md). Os quatro parâmetros de plano são parte da referência e devem permanecer literais:

- `?plano=parceria`
- `?plano=start`
- `?plano=pro`
- `?plano=elite`

Também fazem parte do comportamento: CTA do header e hero na mesma aba; cartões dos planos, Instagram e WhatsApp em nova aba com `rel="noopener noreferrer"`; CTA final apontando para `#planos`.

## 13. Checksums da implementação de origem

Os hashes abaixo permitem verificar os arquivos centrais independentemente do Git. O manifesto completo também está em `checksums.sha256`.

| Arquivo | SHA-256 |
|---|---|
| `app/page.tsx` | `124f0b7c1fd85b1c426049ee059d40a5ba22863169e8767a6aabf5eb58343990` |
| `app/layout.tsx` | `0880bd2fc3c3e19970d29425bff8dc090a50bbfd307ec39f054b306d28cc789d` |
| `app/globals.css` | `e7601039b0898212114375cabd2f89bfe8309a6672219a7044b6770386a0804a` |
| `components/landing/header.tsx` | `0512a456098f6ae2a39c45e29ca50bdafcade18abc2a844837d1258b087b33e2` |
| `components/landing/hero-section.tsx` | `696a81edaee7aa63581c9f585092259b6cc5328033c00574791199c8416faba6` |
| `components/landing/benefits-section.tsx` | `7693fa16702db43a8e8af52707f741f59b46c8398ae329e06fc082781eb1c0c1` |
| `components/landing/demo-section.tsx` | `2ebe57e212a009a769bfbf9e44c09a8dac26ec0d52f491d291173eddbec9fa18` |
| `components/landing/pricing-section.tsx` | `aa69e7f46d84833d616ba1e6d129a21b2a58a61b84cb96da261fb8fa7cf1920a` |
| `components/landing/faq-section.tsx` | `1e058d19c237d0e12bd20e24eca297ffc277f61a029bb6b1d4261b64ee9f1b6b` |
| `components/landing/cta-section.tsx` | `0f2383680631a5115ab50fbb6f550c978e35c87e5dd409e36cda1fe1b12844d6` |
| `components/landing/footer.tsx` | `d42efe146e960b666f3eaf198d4380dcd8d92a83603e5dc57da8c72f121d61cb` |
| `components/landing/cheese-effect.tsx` | `e46283a892f0763abf4fe9722a3ca8432bf9ebc44de295071c9a029c8e4d5ec4` |

## 14. Como voltar a esta referência

A forma mais direta é abrir a branch `backup/landing-atual-2026-09-09`. O estado funcional original da landing é exatamente o commit `3e5632e9d9ab13c774451b501265ff7c5e9e6a8f`; a branch de backup acrescenta somente este pacote documental.

Para restaurar apenas a landing a partir do ponto original, use o commit acima como fonte para `app/`, `components/landing/`, `components/ui/button.tsx`, `components/ui/accordion.tsx`, `lib/utils.ts`, configurações e ativos. Antes de qualquer restauração futura, compare os destinos com [`redirecionamentos.md`](./redirecionamentos.md) e com `runtime-snapshot.json`.
