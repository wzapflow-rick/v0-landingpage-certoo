"use client";
import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ImageIcon,
  MessageCircle,
  Store,
  Zap,
  Menu,
  X,
  Check,
  Plus,
} from "lucide-react";
import { plans, faqs, landingLinks } from "@/lib/landing-content";
import {
  MenuPhone,
  RestaurantBrand,
  RocketEntrance,
  rocketUrl,
} from "./restaurant-art";
const features = [
  {
    icon: ImageIcon,
    title: "Design irresistível",
    text: "Seu cardápio com fotos, categorias e uma apresentação que dá vontade de pedir.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp conectado",
    text: "Notificações e agente de IA nos planos Pro e Elite. Mais conexão com seus clientes.",
  },
  {
    icon: Zap,
    title: "Do cardápio ao pedido",
    text: "Link, QR Code, Pix e cartões. O essencial para começar em um só lugar.",
  },
  {
    icon: Store,
    title: "No tamanho do seu negócio",
    text: "Do pequeno delivery à operação completa. Escolha o plano para o seu momento.",
  },
];
const planCharacters: Record<string, { src: string; message: string }> = {
  Parceria: {
    src: rocketUrl,
    message: "Primeiros pedidos",
  },
  Start: {
    src: "/images/landing/plan-parceria.png",
    message: "Rotina organizada",
  },
  Pro: {
    src: "/images/landing/plan-start.png",
    message: "Hora de acelerar",
  },
  Elite: {
    src: "/images/landing/plan-pro.png",
    message: "Operação no topo",
  },
} as const;
export const testimonialTemplates: {
  name: string;
  restaurant: string;
  quote: string;
  photo: string;
  approved: boolean;
}[] = [
  { name: "", restaurant: "", quote: "", photo: "", approved: false },
  { name: "", restaurant: "", quote: "", photo: "", approved: false },
  { name: "", restaurant: "", quote: "", photo: "", approved: false },
];
export function RestaurantLanding() {
  const [menu, setMenu] = useState(false);
  const links = [
    ["Recursos", "#recursos"],
    ["Vantagens", "#vantagens"],
    ["Exemplo", "#exemplo"],
    ["Preços", "#planos"],
    ["Dúvidas", "#duvidas"],
  ];
  return (
    <div className="restaurant-page font-sans">
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>
      <header className="restaurant-header">
        <div className="restaurant-container header-inner">
          <RestaurantBrand />
          <nav aria-label="Navegação principal" className="desktop-nav">
            {links.map(([label, href]) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
          </nav>
          <a className="restaurant-button header-cta" href="#planos">
            Criar meu cardápio <ArrowRight size={16} />
          </a>
          <button
            className="mobile-toggle"
            aria-label={menu ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menu}
            aria-controls="mobile-menu"
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
        {menu && (
          <nav
            id="mobile-menu"
            className="mobile-links"
            aria-label="Navegação móvel"
          >
            {links.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMenu(false)}>
                {label}
              </a>
            ))}
            <a href={landingLinks.login}>Entrar na minha conta</a>
          </nav>
        )}
      </header>
      <main id="conteudo">
        <section id="inicio" className="restaurant-hero">
          <div className="restaurant-container hero-grid">
            <div className="restaurant-hero-copy">
              <span className="restaurant-kicker">
                Cardápio digital para restaurantes
              </span>
              <h1>
                Seu cardápio pode <em className="mouthwatering">dar água na boca.</em>
              </h1>
              <p className="hero-lead">
                Crie um cardápio digital bonito, rápido e fácil de pedir.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#planos" className="restaurant-button">
                  Criar meu cardápio <ArrowRight size={18} />
                </a>
                <a href="#exemplo" className="restaurant-button outline-button">
                  Ver um exemplo
                </a>
              </div>
              <div className="hero-assurances">
                {[
                  "Zero comissão por pedido",
                  "7 dias grátis no Parceria",
                  "Suporte por plano",
                ].map((t) => (
                  <span key={t}>
                    <CheckCircle2 size={16} />
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="restaurant-hero-art">
              <MenuPhone />
              <RocketEntrance />
            </div>
          </div>
          <div className="counter-edge" />
        </section>
        <section id="recursos" className="restaurant-container feature-section">
          <div className="section-intro">
            <span className="restaurant-kicker">Mais do que um link</span>
            <h2>
              Tudo o que você precisa para
              <br />
              um cardápio <em>que vende.</em>
            </h2>
            <p>
              A vitrine do seu restaurante, sempre disponível.
              <br />
              Do primeiro olhar ao próximo pedido.
            </p>
          </div>
          <div className="feature-grid">
            {features.map((f, i) => (
              <article className="restaurant-card" key={f.title}>
                <div className={`feature-preview preview-${i}`} aria-hidden="true"><span className={`menu-photo food-${i}`} /><div><span>{["Cardápio da casa", "Pedido recebido", "Foto. Nome. Pronto.", "Do delivery ao salão"][i]}</span><small>{["Feito para abrir o apetite", "Tudo organizado", "Sua vitrine no ar", "Um cardápio, sua identidade"][i]}</small></div></div>
                <f.icon className="text-primary" size={24} />
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </article>
            ))}
          </div>
        </section>
        <section id="vantagens" className="restaurant-product">
          <div className="restaurant-container product-grid">
            <div id="exemplo" className="product-art">
              <MenuPhone product />
            </div>
            <div className="product-copy">
              <span className="restaurant-kicker">Do cardápio ao pedido</span>
              <h2>
                Simples para você.
                <br />
                Incrível para <em>seus clientes.</em>
              </h2>
              <p>
                Seu cardápio em poucos cliques, com fotos, preços e categorias
                organizadas. O cliente escolhe, você acompanha os pedidos e a
                operação segue.
              </p>
              <ul>
                {[
                  "Cardápio digital por link e QR Code",
                  "Pedidos organizados no Kanban",
                  "Pix e cartões no mesmo fluxo",
                  "WhatsApp e agente de IA no Pro e Elite",
                ].map((t) => (
                  <li key={t}>
                    <CheckCircle2 size={18} />
                    {t}
                  </li>
                ))}
              </ul>
              <a href="#planos" className="text-link">
                Encontre o seu plano <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>
        {testimonialTemplates.some((t) => t.approved) && (
          <section className="restaurant-container feature-section">
            <h2>Restaurantes que já <em>decolaram</em><br />com o Cardápio wZapFlow.</h2>
            <div className="feature-grid">
              {testimonialTemplates
                .filter((t) => t.approved)
                .map((t) => (
                  <blockquote key={t.name} className="restaurant-card">
                    <p>{t.quote}</p>
                    <footer className="flex items-center gap-3">
                      {t.photo && <img src={t.photo} alt={t.name} width={48} height={48} className="size-12 rounded-full object-cover" loading="lazy" />}
                      <span>{t.name}<br /><small>{t.restaurant}</small></span>
                    </footer>
                  </blockquote>
                ))}
            </div>
          </section>
        )}
        <section
          id="planos"
          className="restaurant-container restaurant-pricing"
        >
          <span className="restaurant-kicker">
            Planos que cabem no seu negócio
          </span>
          <div className="pricing-heading">
            <h2>
              Escolha o <em>plano ideal</em>
              <br />
              para o seu restaurante.
            </h2>
              <p>
                Mais pedidos.<br />Mais lucro.
              </p>
          </div>
          <div className="restaurant-plans">
            {plans.map((plan) => (
              <article
                key={plan.name}
                className={`restaurant-plan ${plan.name === "Pro" ? "featured-plan" : ""}`}
              >
                <div className={`plan-mascot plan-mascot-${plan.name.toLowerCase()}`}>
                  <img
                    src={planCharacters[plan.name].src}
                    alt=""
                    width={112}
                    height={112}
                    loading="lazy"
                  />
                  <span>{planCharacters[plan.name].message}</span>
                </div>
                <div>
                  <span className="plan-stage">{plan.name === "Pro" ? "Mais escolhido" : plan.stage}</span>
                  <h3>{plan.name}</h3>
                  <p>{plan.description}</p>
                </div>
                <div className="price-line">
                  <strong>{plan.price}</strong>
                  <span>{plan.cadence}</span>
                </div>
                <p className="billing-note">
                  {plan.billingNote || "Mensalidade do plano"}
                </p>
                <ul>
                  {plan.features.map((f) => (
                    <li key={f}>
                      <Check size={15} />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  className={`restaurant-button ${plan.name === "Pro" ? "" : "outline-button"}`}
                  href={plan.href}
                >
                  {plan.cta}
                  <ArrowRight size={16} />
                </a>
                <small>Cancele quando quiser</small>
              </article>
            ))}
          </div>
        </section>
        <section id="duvidas" className="restaurant-container restaurant-faq">
          <div>
            <span className="restaurant-kicker">Dúvidas frequentes</span>
            <h2>Ainda tem dúvidas?</h2>
            <p>
              A gente te ajuda. Veja as respostas sobre o Cardápio wZapFlow.
            </p>
            <a
              href={landingLinks.whatsapp}
              className="text-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Falar com a equipe <ArrowRight size={16} />
            </a>
          </div>
          <div>
            {[
              { question: "Como funciona o Cardápio wZapFlow?", answer: "Você organiza seus produtos em um cardápio digital e compartilha o link ou QR Code. Seus clientes consultam as opções e fazem seus pedidos online." },
              { question: "Preciso ter um site?", answer: "Não. Seu cardápio possui um link próprio para compartilhar com os clientes." },
              { question: "Posso personalizar o cardápio?", answer: "Você pode organizar fotos, produtos e categorias. O plano Elite inclui customização total; consulte os recursos de cada plano." },
              { question: "Como meus clientes fazem os pedidos?", answer: "Eles acessam o link ou QR Code e escolhem os produtos. Você acompanha os pedidos no Kanban. Recursos de WhatsApp estão disponíveis no Pro e Elite." },
              { question: "O pagamento é seguro?", answer: "Pix e cartões estão entre os meios oferecidos. Antes de contratar, consulte a equipe sobre o processamento dos pagamentos e as condições aplicáveis ao seu restaurante." },
              ...faqs,
            ].map((f) => (
              <details key={f.question}>
                <summary>
                  {f.question}
                  <Plus size={18} />
                </summary>
                <p>{f.answer}</p>
              </details>
            ))}
          </div>
        </section>
        <section className="restaurant-container final-section">
          <div className="final-panel">
            <img src={rocketUrl} alt="" width={170} height={152} />
            <div>
              <span className="restaurant-kicker">
                O próximo pedido começa aqui
              </span>
              <h2>
                Pronto para transformar<br /><em>seu cardápio em pedidos?</em>
              </h2>
              <p>Crie agora seu cardápio digital e leve seu restaurante para outro nível.</p>
            </div>
            <a href="#planos" className="restaurant-button">
              Criar meu cardápio <ArrowRight size={18} />
            </a>
          </div>
        </section>
      </main>
      <footer className="restaurant-container restaurant-footer">
        <RestaurantBrand />
        <nav aria-label="Links do rodapé">
          <a href="#recursos">Produto</a>
          <a href="#planos">Preços</a>
          <a href={landingLinks.whatsapp}>Suporte</a>
          <a href={landingLinks.login}>Entrar</a>
        </nav>
        <small>
          © {new Date().getFullYear()} wZapFlow.
          <br />
          Todos os direitos reservados.
        </small>
      </footer>
    </div>
  );
}
