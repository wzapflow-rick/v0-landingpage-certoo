# ZapFlow — produção e edição

## Entrega
Landing completa, arte original, camadas animadas, captura real do produto, quatro planos preservados e style tile em `/style-tile` (noindex). Fonte comercial estática: `lib/landing-content.ts`; não há sincronização automática com o cadastro.

## Edição
- Tokens e responsividade: `app/globals.css`.
- Capítulos: `components/landing/flow-scene.tsx`.
- Recortes e animação: `components/landing/food-scene.tsx`.
- Originais PNG e derivados WebP: `public/images/landing`.
- Proveniência e intervalos: `public/images/landing/cinema-manifest.json`.
- Preparação dos derivados: `scripts/prepare-cinema.mjs` (sharp).
- Montagem termina em 84% do progresso, seguida de pausa até 100%. Scroll nativo, sem captura de wheel ou animações infinitas.

## Validação
TypeScript, build, frozen-lockfile e git diff --check passaram. O script de lint não executa porque ESLint não está instalado no projeto. Não foi encontrada política syncpack.

Chrome automatizado: hero, camadas, montagem, retorno do scroll, menu móvel, navegação por âncoras, expansão do FAQ, foco inicial no skip-link, URLs dos quatro planos e style tile. Overflow horizontal ausente em 390×844, 515×516, 768×1024, 1280×540, 1280×610 e 1440×900. Foi corrigido um overflow de camadas invisíveis com contenção no palco decorativo.

Reduced motion emulado: sticky desativado e capítulos estáticos disponíveis. Âncora do fluxo a 104px do topo. Imagens ocultadas para verificar que título e CTA permanecem independentes; não substitui teste real de falha de rede.

Web Vitals de laboratório, desenvolvimento, `/`, 1440×900: TTFB 194ms, FCP 420ms, LCP 448ms, CLS 0, hidratação 152ms. INP não capturado. Não são métricas de produção ou de usuários reais.

## Limitações
A transformação usa recortes e transição 2.5D, não morph volumétrico ou simulação física do queijo. Mobile, janelas baixas e reduced motion usam imagens estáticas por capítulo; o scroll animado é reservado ao desktop com área útil suficiente. Breakpoints CSS, sem ResizeObserver para medição dinâmica de texto.

Firefox, Safari, dispositivos físicos e matriz completa de zoom não foram testados. Nenhum cadastro, pagamento ou pedido real foi enviado. A main não foi alterada; trabalho em `feat/landing-imersiva`.
