# Matriz de redirecionamentos — landing ZapFlow

Referência: `main@3e5632e9d9ab13c774451b501265ff7c5e9e6a8f`, capturada em 9 de setembro de 2026.

## Regra de preservação

Os destinos, protocolos, domínios, caminhos, parâmetros, hashes, `target` e `rel` abaixo são parte do comportamento comercial atual. Este inventário não realizou cliques em URLs externas nem submeteu cadastros.

## Destinos canônicos

| Identificador | Destino literal |
|---|---|
| Topo | `#` |
| Benefícios | `#beneficios` |
| Cardápio | `#cardapio` |
| Planos | `#planos` |
| Cadastro Parceria | `https://cardapio.wzapflow.com.br/signup?plano=parceria` |
| Cadastro Start | `https://cardapio.wzapflow.com.br/signup?plano=start` |
| Cadastro Pro | `https://cardapio.wzapflow.com.br/signup?plano=pro` |
| Cadastro Elite | `https://cardapio.wzapflow.com.br/signup?plano=elite` |
| Instagram | `https://instagram.com/zapflow` |
| WhatsApp | `https://wa.me/5579998841252` |

## Todas as ocorrências por componente

| # | Componente/estado | Texto ou identificação visual | `href` literal | Abertura | `rel` | Observação |
|---:|---|---|---|---|---|---|
| 1 | `Header`, todos os viewports | Logo `ZapFlow` | `#` | mesma aba | ausente | Volta ao topo da rota atual. |
| 2 | `Header`, desktop/tablet | Benefícios | `#beneficios` | mesma aba | ausente | Navegação desktop a partir de `md`. |
| 3 | `Header`, desktop/tablet | Cardápio | `#cardapio` | mesma aba | ausente | Navegação desktop a partir de `md`. |
| 4 | `Header`, desktop/tablet | Planos | `#planos` | mesma aba | ausente | Navegação desktop a partir de `md`. |
| 5 | `Header`, desktop/tablet | Quero Vender Mais | `https://cardapio.wzapflow.com.br/signup?plano=parceria` | mesma aba | ausente | CTA principal do header. |
| 6 | `Header`, menu mobile aberto | Benefícios | `#beneficios` | mesma aba | ausente | Fecha o menu pelo `onClick`. |
| 7 | `Header`, menu mobile aberto | Cardápio | `#cardapio` | mesma aba | ausente | Fecha o menu pelo `onClick`. |
| 8 | `Header`, menu mobile aberto | Planos | `#planos` | mesma aba | ausente | Fecha o menu pelo `onClick`. |
| 9 | `Header`, menu mobile aberto | Quero Vender Mais | `https://cardapio.wzapflow.com.br/signup?plano=parceria` | mesma aba | ausente | CTA dentro do menu. |
| 10 | `HeroSection` | Quero Vender Mais | `https://cardapio.wzapflow.com.br/signup?plano=parceria` | mesma aba | ausente | Conversão direta do hero. |
| 11 | `PricingSection`, Parceria | Testar 7 Dias Grátis | `https://cardapio.wzapflow.com.br/signup?plano=parceria` | nova aba (`_blank`) | `noopener noreferrer` | Mantém `plano=parceria`. |
| 12 | `PricingSection`, Start | Começar Agora | `https://cardapio.wzapflow.com.br/signup?plano=start` | nova aba (`_blank`) | `noopener noreferrer` | Mantém `plano=start`. |
| 13 | `PricingSection`, Pro | Escolher PRO | `https://cardapio.wzapflow.com.br/signup?plano=pro` | nova aba (`_blank`) | `noopener noreferrer` | Mantém `plano=pro`. |
| 14 | `PricingSection`, Elite | Ser ELITE | `https://cardapio.wzapflow.com.br/signup?plano=elite` | nova aba (`_blank`) | `noopener noreferrer` | Mantém `plano=elite`. |
| 15 | `CtaSection` | Quero Dominar Meu Delivery | `#planos` | mesma aba | ausente | Faz scroll suave para a comparação dos planos. |
| 16 | `Footer` | Benefícios | `#beneficios` | mesma aba | ausente | Navegação interna. |
| 17 | `Footer` | Cardápio | `#cardapio` | mesma aba | ausente | Navegação interna. |
| 18 | `Footer` | Planos | `#planos` | mesma aba | ausente | Navegação interna. |
| 19 | `Footer` | Ícone Instagram | `https://instagram.com/zapflow` | nova aba (`_blank`) | `noopener noreferrer` | Link social. |
| 20 | `Footer` | Ícone WhatsApp | `https://wa.me/5579998841252` | nova aba (`_blank`) | `noopener noreferrer` | Contato no número `+55 79 99884-1252`. |

A contagem desktop é 16 porque as quatro ocorrências exclusivas do menu mobile não são renderizadas nesse estado. No mobile com menu aberto, as quatro ocorrências desktop do nav/CTA são substituídas pelas quatro ocorrências mobile, mantendo 16 links visíveis/renderizados no conjunto da página.

## IDs que recebem as âncoras

| Hash | Elemento de destino | Arquivo |
|---|---|---|
| `#beneficios` | `<section id="beneficios">` | `components/landing/benefits-section.tsx` |
| `#cardapio` | `<section id="cardapio">` | `components/landing/demo-section.tsx` |
| `#planos` | `<section id="planos">` | `components/landing/pricing-section.tsx` |
| `#` | início do documento atual | Logo em `components/landing/header.tsx` |

O scroll entre âncoras é suavizado por `html { scroll-behavior: smooth; }` em `app/globals.css`.

## Matriz observada no DOM desktop

Ordem exata obtida no DOM renderizado:

1. `ZapFlow` → `#`.
2. `Benefícios` → `#beneficios`.
3. `Cardápio` → `#cardapio`.
4. `Planos` → `#planos`.
5. `Quero Vender Mais` (header) → cadastro Parceria, mesma aba.
6. `Quero Vender Mais` (hero) → cadastro Parceria, mesma aba.
7. `Testar 7 Dias Grátis` → cadastro Parceria, nova aba.
8. `Começar Agora` → cadastro Start, nova aba.
9. `Escolher PRO` → cadastro Pro, nova aba.
10. `Ser ELITE` → cadastro Elite, nova aba.
11. `Quero Dominar Meu Delivery` → `#planos`.
12. `Benefícios` (footer) → `#beneficios`.
13. `Cardápio` (footer) → `#cardapio`.
14. `Planos` (footer) → `#planos`.
15. Ícone Instagram → Instagram, nova aba.
16. Ícone WhatsApp → WhatsApp, nova aba.

## Checklist para a reformulação futura

- Manter o domínio de cadastro como `cardapio.wzapflow.com.br`.
- Manter o caminho `/signup`.
- Manter o nome do parâmetro em minúsculas: `plano`.
- Manter os valores em minúsculas: `parceria`, `start`, `pro`, `elite`.
- Não trocar o CTA final por cadastro direto sem uma decisão explícita; atualmente ele leva a `#planos`.
- Preservar abertura na mesma aba para header/hero e em nova aba para os quatro cards, salvo nova decisão explícita.
- Preservar `noopener noreferrer` em links com `_blank`.
- Preservar exatamente o usuário `zapflow` do Instagram e o número completo do WhatsApp.
- Conferir desktop e menu mobile separadamente, pois o header possui duas renderizações de navegação.
