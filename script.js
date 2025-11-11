/* =========================================================
   ShihTzuShop — Cards + Modal + Comparador Multilojas
   (Atual) — mantém todas as suas funções + botão flutuante
             de “Fechar filtros”, carrossel compacto e tooltips
   ========================================================= */

/* ========= CSS: BOTÕES/LOGOS dos filtros (compactos) ========= */
(function injectFiltroCSS(){
  const id = 'filtros-logo-only';
  document.querySelector(`style[data-${id}]`)?.remove();

  const css = `
    /* Container */
    #filtroOrigem{
      display:flex; flex-wrap:wrap; gap:10px; width:100%; align-items:center;
    }

    /* Cápsula responsiva (compacta) */
    #filtroOrigem label{
      display:inline-flex; align-items:center; justify-content:center;
      padding:8px 10px;
      border-radius:14px; border:1.5px solid #e5e7eb; background:#fff;
      cursor:pointer; user-select:none; overflow:hidden;
      max-width:142px; min-width:68px;
      transition:transform .15s ease, box-shadow .15s ease, border-color .15s ease;
    }
    @media (min-width:1025px){
      #filtroOrigem label:hover{ transform: translateY(-1px) scale(1.01); box-shadow: 0 8px 16px rgba(0,0,0,.08); }
    }

    /* Logo (compacto) */
    #filtroOrigem label img.filtro-logo{
      display:block; object-fit:contain; pointer-events:none;
      max-width:100%; height:auto; max-height:36px;
    }
    @media (max-width:1024px){
      #filtroOrigem{ gap:9px; }
      #filtroOrigem label{ padding:8px 9px; border-radius:12px; max-width:128px; min-width:64px; }
      #filtroOrigem label img.filtro-logo{ max-height:34px; }
    }
    @media (max-width:640px){
      #filtroOrigem{ gap:8px; }
      #filtroOrigem label{ padding:7px 8px; border-radius:12px; max-width:116px; min-width:60px; }
      #filtroOrigem label img.filtro-logo{ max-height:30px; }
    }

    /* Esconde texto nos botões (só logo) */
    #filtroOrigem label .texto{ display:none !important; }

    /* Realce comum quando ATIVO (vale para todas as marcas) */
    #filtroOrigem label.ativo{
      border-width:2px;
      transform: translateY(-1px);
      box-shadow: 0 0 0 3px var(--ring, rgba(0,0,0,.06)), 0 6px 14px rgba(0,0,0,.10);
    }

    /* ===== Ativos por marca ===== */
    #filtroOrigem label.ativo[data-src="shopee"]{ --ring: rgba(238,77,45,.18); background: linear-gradient(145deg,#FFF0E6,#FFE5DA); color:#7A1A0F; border-color:#EE4D2D; }
    #filtroOrigem label.ativo[data-src="petlove"]{ --ring: rgba(0,174,239,.16); background: linear-gradient(145deg,#E6F7FF,#BDEBFF); color:#005C87; border-color:#00AEEF; }
    #filtroOrigem label.ativo[data-src="amazon"]{ --ring: rgba(58,69,83,.18); background: linear-gradient(145deg,#ECEFF1,#CFD8DC); color:#111; border-color:#3A4553; }
    #filtroOrigem label.ativo[data-src="mercadolivre"]{ --ring: rgba(255,230,0,.22); background: linear-gradient(145deg,#FFF9C8,#FFE600); color:#0B4EA2; border-color:#FFE600; }
    #filtroOrigem label.ativo[data-src="magalu"]{ --ring: rgba(25,118,210,.18); background: linear-gradient(145deg,#E5F2FF,#BFE0FF); color:#0D47A1; border-color:#1976D2; }
    #filtroOrigem label.ativo[data-src="petz"]{ --ring: rgba(0,178,255,.18); background: linear-gradient(145deg,#E9F6FF,#CDECFF); color:#004E92; border-color:#00B2FF; }
    #filtroOrigem label.ativo[data-src="cobasi"]{ --ring: rgba(0,119,190,.18); background: linear-gradient(145deg,#E6F2FF,#CFE6FF); color:#005A8C; border-color:#0077BE; }
    #filtroOrigem label.ativo[data-src="americanas"]{ --ring: rgba(213,0,0,.18); background: linear-gradient(145deg,#FFE1E1,#FFCACA); color:#8F1010; border-color:#D50000; }
    #filtroOrigem label.ativo[data-src="aliexpress"]{ --ring: rgba(255,90,0,.18); background: linear-gradient(145deg,#FFEEE2,#FFE0CC); color:#B33A12; border-color:#FF5A00; }
    #filtroOrigem label.ativo[data-src="carrefour"]{ --ring: rgba(0,94,184,.18); background: linear-gradient(145deg,#E7F1FF,#D7E9FF); color:#003B73; border-color:#005EB8; }
    #filtroOrigem label.ativo[data-src="casasbahia"]{ --ring: rgba(0,51,160,.18); background: linear-gradient(145deg,#E7EDFF,#D8E4FF); color:#001A66; border-color:#0033A0; }
    #filtroOrigem label.ativo[data-src="ponto"]{ --ring: rgba(255,106,42,.18); background: linear-gradient(145deg,#FFE8D9,#FFD8BF); color:#6B2E00; border-color:#FF6A2A; }
  `;
  const style = document.createElement('style');
  style.setAttribute(`data-${id}`,'true');
  style.textContent = css;
  document.head.appendChild(style);
})();

/* === CSS para carrossel compacto (mais cards por tela) === */
(function injectCarouselTightCSS(){
  const id = 'carousel-tight-v2';
  document.querySelector(`style[data-${id}]`)?.remove();
  const css = `
    /* Cards do carrossel apenas */
    .banner-card{
      width: 5.75rem;           /* ~92px */
      padding: 4px !important;
      border-radius: 10px;
    }
    @media (min-width: 640px){  /* sm */
      .banner-card{ width: 6.75rem; }   /* ~108px */
    }
    @media (min-width: 1024px){ /* lg */
      .banner-card{ width: 7.25rem; }   /* ~116px */
    }

    /* Imagem menor só no carrossel */
    .banner-card .card-img-wrap{
      height: 72px !important;
    }
    @media (min-width: 640px){
      .banner-card .card-img-wrap{ height: 84px !important; }
    }

    /* Logo menor só no carrossel */
    .banner-card .card-logo{
      height: 14px;
      width: auto;
      opacity: .95;
    }

    /* Tipografia mais compacta no carrossel */
    .banner-card h2{
      font-size: 9px !important;
      line-height: 1.15;
      height: 28px;
      margin-top: 2px !important;
    }
    .banner-card .card-old{
      font-size: 9px; color:#9CA3AF; margin-top:2px;
    }
    .banner-card .card-price{
      font-size: 11px; font-weight: 800; margin-top:1px;
    }
    .banner-card .card-off{
      font-size: 10px; font-weight: 800;
      display:inline-block; margin-top:1px;
    }

    /* Botão flutuante para fechar filtro — lateral, sem cobrir cards */
    #btnFecharFiltroFloat{
      position: fixed;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      z-index: 60;
      display: none;
      align-items: center; justify-content: center; gap: 8px;
      padding: 10px 14px; font-size: 13px; font-weight: 900;
      color: #7f1d1d; background:#fff; border-radius: 9999px;
      border: 1.5px solid #fca5a5; box-shadow: 0 6px 16px rgba(0,0,0,.10);
      white-space: nowrap;
    }
    #btnFecharFiltroFloat:hover{ background:#fff7f7; color:#991b1b; }
    body.modo-filtro #btnFecharFiltroFloat{ display: inline-flex; }

    @media (max-width: 640px){
      #btnFecharFiltroFloat{
        right: 6px;
        padding: 10px 12px;
        font-size: 12px;
      }
    }
  `;
  const style = document.createElement('style');
  style.setAttribute(`data-${id}`, 'true');
  style.textContent = css;
  document.head.appendChild(style);
})();

/* ================== IDENTIDADE POR LOJA ================== */
const STORE_META = {
  shopee: {
    nome:"Shopee",
    corBorda:"#EE4D2D",
    corTexto:"#8B1F0D",
    bgCard:"linear-gradient(to bottom,#FF8A70,#FFD3C9)",
    logo:"logos/shopee.svg",
    btn:["#EE4D2D","#FF7B5F"],
    off:"#7A1A0F",
    shipping:[
      { nome:"Shopee Xpress", prazo:"2-4 dias úteis", detalhe:"capitais com estoque nacional", tipo:"regular", freteGratis:true },
      { nome:"Entrega econômica", prazo:"5-12 dias úteis", detalhe:"parceiros e interior", tipo:"economy" }
    ]
  },
  petlove:{
    nome:"Petlove",
    corBorda:"#00AEEF",
    corTexto:"#0070A8",
    bgCard:"linear-gradient(to bottom,#00AEEF,#B3ECFF)",
    logo:"logos/petlove.svg",
    btn:["#00AEEF","#4FC3F7"],
    off:"#0070A8",
    shipping:[
      { nome:"Expressa Petlove", prazo:"1-2 dias úteis", detalhe:"capitais e regiões metropolitanas", tipo:"express", freteGratis:true },
      { nome:"Entrega programada", prazo:"3-5 dias úteis", detalhe:"todo Brasil com agendamento", tipo:"regular" }
    ]
  },
  amazon: {
    nome:"Amazon",
    corBorda:"#232F3E",
    corTexto:"#FF9900",
    bgCard:"linear-gradient(to bottom,#232F3E,#3A4553)",
    logo:"logos/amazon.svg",
    btn:["#232F3E","#3A4553"],
    off:"#FF9900",
    shipping:[
      { nome:"Prime 1 dia", prazo:"até 24h", detalhe:"capitais com estoque Prime", tipo:"express", freteGratis:true },
      { nome:"Prime padrão", prazo:"2-3 dias úteis", detalhe:"demais regiões", tipo:"regular", freteGratis:true }
    ]
  },
  mercadolivre:{
    nome:"Mercado Livre",
    corBorda:"#FFE600",
    corTexto:"#0B4EA2",
    bgCard:"linear-gradient(to bottom,#FFF6A6,#FFE600)",
    logo:"logos/mercadolivre.svg",
    btn:["#FFE600","#FFE24A"],
    off:"#0B4EA2",
    shipping:[
      { nome:"Full 24h", prazo:"até 24h", detalhe:"estoque na sua cidade", tipo:"express", freteGratis:true },
      { nome:"Envio Full", prazo:"1-2 dias úteis", detalhe:"Brasil via hubs Full", tipo:"regular", freteGratis:true }
    ]
  },
  magalu: {
    nome:"Magalu",
    corBorda:"#1976D2",
    corTexto:"#0D47A1",
    bgCard:"linear-gradient(to bottom,#2196F3,#6EC6FF)",
    logo:"logos/magalu.svg",
    btn:["#1976D2","#64B5F6"],
    off:"#0D47A1",
    shipping:[
      { nome:"Chegou Hoje", prazo:"até 24h", detalhe:"quando há estoque local", tipo:"express" },
      { nome:"Magalu Entregas", prazo:"2-4 dias úteis", detalhe:"transportadora própria", tipo:"regular" }
    ]
  },
  petz:  {
    nome:"Petz",
    corBorda:"#00B2FF",
    corTexto:"#004E92",
    bgCard:"linear-gradient(to bottom,#B3E5FF,#E6F5FF)",
    logo:"logos/petz.svg",
    btn:["#00B2FF","#66CCFF"],
    off:"#004E92",
    shipping:[
      { nome:"Petz Delivery", prazo:"até 2h", detalhe:"lojas com estoque", tipo:"express" },
      { nome:"Entrega padrão", prazo:"2-5 dias úteis", detalhe:"Correios/transportadora", tipo:"regular" }
    ]
  },
  cobasi:{
    nome:"Cobasi",
    corBorda:"#0077BE",
    corTexto:"#005A8C",
    bgCard:"linear-gradient(to bottom,#B3DBFF,#E8F3FF)",
    logo:"logos/cobasi.svg",
    btn:["#0077BE","#66AEE6"],
    off:"#005A8C",
    shipping:[
      { nome:"Cobasi Já", prazo:"1-3h", detalhe:"retirada e parceiros delivery", tipo:"express" },
      { nome:"Entrega econômica", prazo:"1-3 dias úteis", detalhe:"sudeste/sul", tipo:"regular" }
    ]
  },
  americanas:{
    nome:"Americanas",
    corBorda:"#D50000",
    corTexto:"#B71C1C",
    bgCard:"linear-gradient(to bottom,#FFCCCC,#FFE6E6)",
    logo:"logos/americanas.svg",
    btn:["#D50000","#FF5252"],
    off:"#B71C1C",
    shipping:[
      { nome:"Entrega rápida", prazo:"1-3 dias úteis", detalhe:"capitais com estoque", tipo:"express" },
      { nome:"Marketplace padrão", prazo:"3-7 dias úteis", detalhe:"lojistas parceiros", tipo:"regular" }
    ]
  },
  aliexpress:{
    nome:"AliExpress",
    corBorda:"#FF5A00",
    corTexto:"#D84315",
    bgCard:"linear-gradient(to bottom,#FFD5BF,#FFF0E6)",
    logo:"logos/aliexpress.svg",
    btn:["#FF5A00","#FF8A50"],
    off:"#D84315",
    shipping:[
      { nome:"Entrega Brasil", prazo:"7-12 dias úteis", detalhe:"depósitos nacionais", tipo:"regular" },
      { nome:"Envio internacional", prazo:"12-20 dias úteis", detalhe:"frete combinado", tipo:"economy" }
    ]
  },
  carrefour:{
    nome:"Carrefour",
    corBorda:"#005EB8",
    corTexto:"#003B73",
    bgCard:"linear-gradient(to bottom,#CFE8FF,#EAF3FF)",
    logo:"logos/carrefour.svg",
    btn:["#005EB8","#4EA3FF"],
    off:"#003B73",
    shipping:[
      { nome:"Express Carrefour", prazo:"1-2 dias úteis", detalhe:"capitais e RMSP/RJ", tipo:"express" },
      { nome:"Entrega padrão", prazo:"3-5 dias úteis", detalhe:"transportadora parceira", tipo:"regular" }
    ]
  },
  casasbahia:{
    nome:"Casas Bahia",
    corBorda:"#0033A0",
    corTexto:"#001A66",
    bgCard:"linear-gradient(to bottom,#D0DBFF,#EEF3FF)",
    logo:"logos/casasbahia.svg",
    btn:["#0033A0","#4D6DFF"],
    off:"#001A66",
    shipping:[
      { nome:"Retira rápido", prazo:"2-4h", detalhe:"retirada em loja", tipo:"express" },
      { nome:"Entrega Casas Bahia", prazo:"2-5 dias úteis", detalhe:"transportadora própria", tipo:"regular" }
    ]
  },
  ponto: {
    nome:"Ponto",
    corBorda:"#111111",
    corTexto:"#FF5500",
    bgCard:"linear-gradient(to bottom,#F0F0F0,#FFFFFF)",
    logo:"logos/ponto.svg",
    btn:["#111111","#444444"],
    off:"#FF5500",
    shipping:[
      { nome:"Retira Ponto", prazo:"até 2h", detalhe:"lojas e lockers", tipo:"express" },
      { nome:"Entrega padrão", prazo:"2-5 dias úteis", detalhe:"transportadora parceira", tipo:"regular" }
    ]
  },
};

/* ===================== PRODUTOS (exemplos; inclui GTIN) ===================== */
const produtos = [
  // Exemplos gerais
  { tipo:"shopee", nome:"Laços Premium — kit 20 un. (cores sortidas)", precoAntigo:69.90, precoAtual:39.90, desconto:"43% OFF", parcelas:"6x sem juros", detalhes:["Elástico macio","Não puxa o pelo","Cores vivas"], imagem:"https://images.unsplash.com/photo-1596495578065-8c1b2f6a3513?q=80&w=800&auto=format&fit=crop", link:"#"},
  { tipo:"shopee", nome:"Peitoral Conforto X-Soft (PP/P) — Anti-puxão", precoAntigo:89.90, precoAtual:54.90, desconto:"39% OFF", parcelas:"6x sem juros", detalhes:["Ajuste rápido","Almofadado","Anel em metal"], imagem:"https://images.unsplash.com/photo-1560807707-8cc77767d783?q=80&w=800&auto=format&fit=crop", link:"#"},
  { tipo:"petlove", nome:"Shampoo Hipoalergênico (300ml) — Pelos longos", precoAntigo:54.90, precoAtual:39.90, desconto:"27% OFF", parcelas:"3x sem juros", detalhes:["pH balanceado","Sem parabenos","Cheiro suave"], imagem:"https://images.unsplash.com/photo-1625314887424-9f189ffd40dc?q=80&w=800&auto=format&fit=crop", link:"#"},
  { tipo:"petlove", nome:"Cama Donut Antiestresse (P) — Bege", precoAntigo:189.90, precoAtual:129.90, desconto:"32% OFF", parcelas:"6x sem juros", detalhes:["Tecido soft","Antiderrapante","Zíper para lavar"], imagem:"https://images.unsplash.com/photo-1548191265-cc70d3d45ba1?q=80&w=800&auto=format&fit=crop", link:"#"},
  { tipo:"amazon", nome:"Escova Slicker + Pente 2 em 1 — Anti-embolo", precoAntigo:59.90, precoAtual:39.90, desconto:"33% OFF", parcelas:"Em até 10x", detalhes:["Cerdas macias","Cabo ergonômico"], imagem:"https://images.unsplash.com/photo-1567359781514-3b964e06a3ab?q=80&w=800&auto=format&fit=crop", link:"#"},
  { tipo:"amazon", nome:"Hidratante de Almofadinhas (50g) — Natural", precoAntigo:49.90, precoAtual:31.90, desconto:"36% OFF", parcelas:"Em até 10x", detalhes:["Manteiga de karité","Sem álcool"], imagem:"https://images.unsplash.com/photo-1525253013412-55c1a69a5738?q=80&w=800&auto=format&fit=crop", link:"#"},

  /* ====== COMPARADOR (MESMO PRODUTO — MESMO GTIN) ======
     Produto: Simparic Zoetis 40 mg (10,1–20 kg) — 1 unidade
     GTIN/EAN: 7898049719488
  */
  {
    tipo: "mercadolivre",
    gtin: "7898049719488",
    nome: "Simparic Zoetis 40 mg 10,1–20 kg — 1 unidade",
    brand: "Zoetis",
    doseMg: 40,
    weightRange: "10,1–20 kg",
    packQty: 1,
    precoAntigo: 118.33,
    precoAtual: 74.60,
    desconto: "36% OFF",
    parcelas: "12x R$ 7,35",
    rating: 4.8,
    reviews: 29113,
    badges: ["Novo","Mais vendido"],
    categoryRank: "1º em Tratamentos Anti-Pulgas",
    cashback: "até R$ 2,24",
    imagem: "https://http2.mlstatic.com/D_NQ_NP_2X_905561-MLA88406142177_072025-F.webp",
    link: "https://mercadolivre.com/sec/1t7W5Sn",
    detalhes: [
      "Proteção contra parasitas por 5 semanas.",
      "Indicado para cães de 10,1 a 20 kg.",
      "Unidades por kit: 1."
    ]
  },
  {
    tipo: "cobasi",
    gtin: "7898049719488",
    nome: "Simparic Zoetis 40 mg 10,1–20 kg — 1 unidade",
    brand: "Zoetis",
    doseMg: 40,
    weightRange: "10,1–20 kg",
    packQty: 1,
    precoAntigo: 133.90,
    precoAtual: 79.90,
    desconto: "40% OFF",
    parcelas: "à vista",
    rating: 4.8,
    reviews: 1370,
    badges: ["Produto original", "Compra Programada", "Amigo Cobasi"],
    loyaltyPoints: 79,
    shippingOptions: [
      { nome: "Retire na loja", prazo: "até 11h", preco: 0, freteGratis: true },
      { nome: "Econômica", prazo: "até 1 dia útil", preco: 15.90 },
      { nome: "Cobasi Já", prazo: "até 1 hora*", preco: 17.90 }
    ],
    pickupAvailable: true,
    imagem: "https://cobasi.vteximg.com.br/arquivos/ids/1089375-368-368/Antipulgas%20Simparic%2040mg%20para%20Caes%2010%20a%2020kg.webp?v=638974276600530000",
    link: "#",
    detalhes: [
      "Elimina 100% de pulgas e carrapatos.",
      "Comprimido mastigável e altamente palatável.",
      "Combate também três tipos de sarnas.",
      "Indicado para cães a partir de 8 semanas de idade.",
      "Começa a fazer efeito em 3 horas e protege por até 35 dias."
    ]
  },
  {
    tipo: "magalu",
    gtin: "7898049719488",
    nome: "Simparic Zoetis 40 mg 10,1–20 kg — 1 unidade",
    brand: "Zoetis",
    doseMg: 40,
    weightRange: "10,1–20 kg",
    packQty: 1,
    precoAntigo: 85.87,
    precoAtual: 74.97,
    precoPix: 59.98,
    desconto: "≈30% OFF",
    parcelas: "1x R$ 74,97 sem juros",
    rating: 4.7,
    reviews: 232,
    badges: ["Magalu garante", "Olist Plus"],
    cupom: "PET10",
    cupomDescricao: "10% OFF (válido até 16/11)",
    freteAPartir: 28.47,
    imagem: "https://a-static.mlcdn.com.br/800x560/antipulgas-simparic-1-comp-10-a-20kg-zoetis/olistplus/opmjuho68xxtdv8l/43719ef3c6447d809db36e10d861f933.jpeg",
    link: "https://divulgador.magalu.com/3BWYo8lG",
    detalhes: [
      "Proteção contra parasitas por 5 semanas.",
      "Indicado para cães de 10,1 a 20 kg.",
      "Unidades por kit: 1."
    ]
  },

  // Outros exemplos
  { tipo:"mercadolivre", nome:"Conjunto Bandana + Gravata (3 peças) — Shih Tzu", precoAntigo:49.90, precoAtual:32.90, desconto:"34% OFF", parcelas:"10x sem juros", detalhes:["Tecido respirável","Lavável","Ajuste com velcro"], imagem:"https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=800&auto=format&fit=crop", link:"#"},
  { tipo:"petz", nome:"Tapete Higiênico Premium p/ Cães (30 un.)", precoAntigo:119.90, precoAtual:89.90, parcelas:"3x sem juros", detalhes:["Gel superabsorvente","Adesivo antideslizante","Neutraliza odores"], imagem:"https://images.unsplash.com/photo-1543465077-db45d34b88a5?q=80&w=800&auto=format&fit=crop", link:"#"},
  { tipo:"petz", nome:"Escova Dupla — Macia & Pinos (p/ pelos longos)", precoAntigo:69.90, precoAtual:44.90, parcelas:"4x sem juros", detalhes:["Remoção de nós","Evita quebra do pelo","Cabo ergonômico"], imagem:"https://images.unsplash.com/photo-1561736778-92e52a7769ef?q=80&w=800&auto=format&fit=crop", link:"#"},
  { tipo:"cobasi", nome:"Bebedouro Portátil Retrátil — Passeios", precoAntigo:79.90, precoAtual:49.90, parcelas:"3x sem juros", detalhes:["Livre de BPA","Trava anti-vazamento","Ideal para viagens"], imagem:"https://images.unsplash.com/photo-1583511655867-9b681b2d7239?q=80&w=800&auto=format&fit=crop", link:"#"},
  { tipo:"cobasi", nome:"Lenços Umedecidos p/ Patas e Focinho (100 un.)", precoAntigo:59.90, precoAtual:34.90, parcelas:"3x sem juros", detalhes:["Aloe vera","Sem álcool","Uso diário"], imagem:"https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=800&auto=format&fit=crop", link:"#"},
  { tipo:"americanas", nome:"Kit Banho: Shampoo + Condicionador — Pelos Sedosos", precoAntigo:79.90, precoAtual:52.90, parcelas:"Em até 10x", detalhes:["Brilho e maciez","Sem parabenos","Aroma suave"], imagem:"https://images.unsplash.com/photo-1556229060-3f04231b39d0?q=80&w=800&auto=format&fit=crop", link:"#"},
  { tipo:"americanas", nome:"Corta Unhas com Trava de Segurança — Shih Tzu", precoAntigo:49.90, precoAtual:29.90, parcelas:"Em até 10x", detalhes:["Lâmina afiada","Cabo antiderrapante","Uso doméstico"], imagem:"https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=800&auto=format&fit=crop", link:"#"},
  { tipo:"aliexpress", nome:"Coleira com Plaquinha Personalizada — Anti-Perda", precoAntigo:69.90, precoAtual:35.90, parcelas:"Em até 6x", detalhes:["Gravação do nome","Ajuste macio","Várias cores"], imagem:"https://images.unsplash.com/photo-1543796076-2a4270f1502b?q=80&w=800&auto=format&fit=crop", link:"#"},
  { tipo:"aliexpress", nome:"Macacão de Tricô para Inverno — Tamanho P", precoAntigo:89.90, precoAtual:49.90, parcelas:"Em até 6x", detalhes:["Quentinho","Confortável","Não prende os pelos"], imagem:"https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=800&auto=format&fit=crop", link:"#"},
  { tipo:"carrefour", nome:"Comedouro Antivoracidade — Médio", precoAntigo:69.90, precoAtual:39.90, parcelas:"3x sem juros", detalhes:["Reduz ansiedade ao comer","Base antiderrapante","Fácil de lavar"], imagem:"https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?q=80&w=800&auto=format&fit=crop", link:"#"},
  { tipo:"carrefour", nome:"Escova para Desembolar Nós — Uso Diário", precoAntigo:64.90, precoAtual:34.90, parcelas:"3x sem juros", detalhes:["Minimiza queda de pelos","Ideal para pelagem longa","Cabo confortável"], imagem:"https://images.unsplash.com/photo-1505628346881-b72b27e84530?q=80&w=800&auto=format&fit=crop", link:"#"},
  { tipo:"casasbahia", nome:"Kit Higiene Bucal — Pasta + Escova", precoAntigo:59.90, precoAtual:36.90, parcelas:"4x sem juros", detalhes:["Ação antitártaro","Sabor agradável","Uso fácil"], imagem:"https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop", link:"#"},
  { tipo:"casasbahia", nome:"Toalha de Microfibra — Secagem Rápida", precoAntigo:49.90, precoAtual:27.90, parcelas:"4x sem juros", detalhes:["Superabsorvente","Antiodor","Tamanho P (50×90cm)"], imagem:"https://images.unsplash.com/photo-1543357530-d91dab30fa50?q=80&w=800&auto=format&fit=crop", link:"#"},
  { tipo:"ponto", nome:"Caminha Retangular — Confort P", precoAntigo:159.90, precoAtual:109.90, parcelas:"6x sem juros", detalhes:["Espuma de alta densidade","Zíper para lavar","Tecido antialérgico"], imagem:"https://images.unsplash.com/photo-1620088809808-5850b89cd87a?q=80&w=800&auto=format&fit=crop", link:"#"},
  { tipo:"ponto", nome:"Escova Removedora de Pelos — Reutilizável", precoAntigo:79.90, precoAtual:39.90, parcelas:"6x sem juros", detalhes:["Remove pelos de sofás/roupas","Sem refis","Lavagem rápida"], imagem:"https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?q=80&w=800&auto=format&fit=crop", link:"#"}
];

/* ===================== UTILS ===================== */
const el  = (sel, root=document) => root.querySelector(sel);
const fmt = (n) => `R$ ${Number(n).toFixed(2)}`;

const IMG_PLACEHOLDER =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="300" height="220">
    <rect width="100%" height="100%" fill="#f3f4f6"/>
    <g fill="#9ca3af" transform="translate(150 110)">
      <circle r="22" cx="-55" cy="-25"/><circle r="22" cx="-20" cy="-40"/>
      <circle r="22" cx="20" cy="-40"/><circle r="22" cx="55" cy="-25"/>
      <circle r="38"/>
    </g>
  </svg>`);

/* ======= Estado de filtros-alvo (item + similares) ======= */
window.filtrosAlvo = {
  gtin: null,
  simKey: null,
  rotulo: null
};

/* gera uma chave de similaridade a partir do nome */
function makeSimKey(nome=""){
  const base = (nome||"")
    .normalize("NFD").replace(/[\u0300-\u036f]/g,"")
    .toLowerCase();

  const stop = /\b(para|pra|de|do|da|dos|das|com|e|ou|o|a|os|as|kit|combo|original|novo|nova|pro|plus|max|premium|mega|ultra|pet|cao|cão|gato|cachorro|filhote|adulto|racoes?|ração|raças?|pequenas?|medias?|médias?|grandes?)\b/g;
  let s = base.replace(stop, " ");

  s = s
    .replace(/\b(\d+(\.\d+)?)(ml|l|g|kg|un|cm|mm)\b/g," ")
    .replace(/\b(\d+)(gb|tb)\b/g," ")
    .replace(/\b(\d+)\s?(x|un|pcs?)\b/g," ")
    .replace(/\b(preto|branco|azul|rosa|vermelho|verde|amarelo|roxo|marrom|bege|cinza|grafite|dourado|prata)\b/g," ");

  s = s.replace(/[^\w\s]/g, " ").replace(/\s{2,}/g, " ").trim();

  const tokens = s.split(" ").filter(Boolean).slice(0, 7);
  return tokens.join("-").replace(/-{2,}/g,"-").slice(0, 40);
}

/* anota simKey/gtin nos produtos (uma vez) */
function indexarSimilares(lista){
  (lista||[]).forEach(p=>{
    if (!p.simKey) p.simKey = makeSimKey(p.nome||"");
    if (p.gtin != null) p.gtin = String(p.gtin).trim();
  });
}

/* aplica destaque visual nos cards do alvo selecionado */
function destacarSelecao(){
  const { gtin, simKey } = window.filtrosAlvo;
  const on = !!(gtin || simKey);
  document.querySelectorAll(".card-geral").forEach(card=>{
    card.classList.remove("ring-2","ring-amber-400","shadow-amber-200","shadow-lg");
    if (!on) return;
    const cGTIN  = card.getAttribute("data-gtin");
    const cSIMK  = card.getAttribute("data-simkey");
    const hit = (gtin && cGTIN && String(cGTIN)===String(gtin)) ||
                (simKey && cSIMK && String(cSIMK)===String(simKey));
    if (hit) card.classList.add("ring-2","ring-amber-400","shadow-amber-200","shadow-lg");
  });
}

/* chip de estado dentro da barra de filtros */
function ensureChipSelecionado(){
  const barra = document.getElementById("barraFiltros");
  if (!barra) return;
  let chip = barra.querySelector(".chip-similares");
  const ativo = !!(filtrosAlvo.gtin || filtrosAlvo.simKey);

  if (!ativo){ chip?.remove(); return; }

  if (!chip){
    chip = document.createElement("button");
    chip.type = "button";
    chip.className = "chip-similares flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-extrabold border border-amber-300 bg-amber-50 hover:bg-amber-100";
    chip.innerHTML = `<span>Selecionado: ${filtrosAlvo.rotulo||"Produto"} <em class="opacity-70">(similares)</em></span>
                      <span class="ml-1 inline-flex items-center justify-center w-5 h-5 rounded-full border border-amber-300 bg-white">✕</span>`;
    chip.addEventListener("click", ()=>{
      filtrosAlvo.gtin = null; filtrosAlvo.simKey = null; filtrosAlvo.rotulo = null;
      aplicarFiltros(); // re-render com todos
    });
    (barra.querySelector(".f-controls")||barra).appendChild(chip);
  } else {
    chip.querySelector("span").firstChild.textContent = `Selecionado: ${filtrosAlvo.rotulo||"Produto"} `;
  }
}

/* ativa o filtro para um produto e força a lista exibir seus similares */
function selecionarProdutoNosFiltros(produto){
  if (!produto) return;
  if (!produto.simKey) produto.simKey = makeSimKey(produto.nome || "");

  const alvoGTIN = normalizeGTIN(produto.gtin);
  window.filtrosAlvo.gtin = alvoGTIN || null;
  window.filtrosAlvo.simKey = alvoGTIN ? null : (produto.simKey || null);
  window.filtrosAlvo.rotulo = produto.nome || "Produto";

  aplicarFiltros({ modoCatalogo: true });
}


/* cria <img> com lazy, onload/onerror e esqueleto */
function buildImg(src, alt, opts = "") {
  const config = typeof opts === "string" ? { imgClass: opts } : (opts || {});
  const variant = config.variant || "default";
  const extraImgClass = config.imgClass || config.className || "";
  const extraWrapClass = config.wrapClass || "";
  const wrap = document.createElement("div");
  const heights = variant === "compact"
    ? { desktop: 44, tablet: 38, mobile: 30 }
    : { desktop: 56, tablet: 48, mobile: 40 };
  // Alturas responsivas mais baixas (compactas)
  const applyHeight = () => {
    if (window.innerWidth >= 1024) wrap.style.height = `${heights.desktop}px`;
    else if (window.innerWidth >= 640) wrap.style.height = `${heights.tablet}px`;
    else wrap.style.height = `${heights.mobile}px`;
  };
  applyHeight();
  window.addEventListener("resize", applyHeight);

  wrap.className = [
    "card-img-wrap skel w-full flex items-center justify-center rounded-md overflow-hidden",
    extraWrapClass
  ].join(" ").trim();
  const img = document.createElement("img");
  img.loading = "lazy";
  img.decoding = "async";
  img.referrerPolicy = "no-referrer";
  img.src = src || IMG_PLACEHOLDER;
  img.alt = alt || "";
  img.className = `card-img max-h-full object-contain transition-transform duration-200 ${extraImgClass}`.trim();
  img.onerror = () => { img.src = IMG_PLACEHOLDER; };
  img.onload = () => { wrap.classList.remove("skel"); };

  wrap.appendChild(img);
  return wrap;
}

/* calcula % OFF se vier vazio mas houver preço antigo */
function autoFillDiscount(p){
  if ((!p.desconto || p.desconto.trim()==="") && p.precoAntigo && p.precoAntigo>p.precoAtual){
    const pct = Math.round((1 - (p.precoAtual / p.precoAntigo))*100);
    p.desconto = `${pct}% OFF`;
  }
  return p;
}

function attachLogoFallback(imgEl){
  if (!imgEl) return;
  imgEl.onerror = () => {
    const PAW =
      'data:image/svg+xml;utf8,' + encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
          <rect width="100%" height="100%" fill="#fff"/>
          <g fill="#9ca3af" transform="translate(48 50)">
            <circle r="10" cx="-22" cy="-10"/><circle r="10" cx="-8" cy="-18"/>
            <circle r="10" cx="8" cy="-18"/><circle r="10" cx="22" cy="-10"/>
            <circle r="18" cx="0" cy="8"/>
          </g>
        </svg>`);
    imgEl.src = PAW; imgEl.classList.add('filtro-logo');
    const label = imgEl.closest('label');
    if (label) label.style.visibility = 'visible';
  };
}

/* ===================== Helpers GTIN + índice por GTIN ===================== */
const onlyDigits = (s="") => (s||"").replace(/\D+/g,"");

function gtin14CheckDigit(body13){
  let sum=0;
  for(let i=0;i<body13.length;i++){
    const n = body13.charCodeAt(i)-48;
    sum += (i%2===0?3:1)*n;
  }
  const mod = sum%10; return mod===0?0:10-mod;
}

/* Normaliza EAN/UPC para GTIN-14 válido (ou "" se inválido) */
function normalizeGTIN(raw){
  let d = onlyDigits(raw);
  if (!d) return "";
  if (d.length===12) d = "00"+d;       // UPC-A -> GTIN-14
  else if (d.length===13) d = "0"+d;   // EAN-13 -> GTIN-14
  else if (![14,8].includes(d.length)) return "";
  if (d.length===8) d = d.padStart(14,"0"); // EAN-8 -> GTIN-14 (padding)
  const body = d.slice(0,13), dv = +d.slice(13);
  const calc = gtin14CheckDigit(body);
  return (dv===calc)?d:(body+String(calc));
}

/* Índice { GTIN-14: { loja: produto } } para lookup rápido */
const indexByGTIN = new Map();
function indexarPorGTIN(arr){
  indexByGTIN.clear();
  for(const p of arr){
    const g = normalizeGTIN(p.gtin);
    if(!g) continue;
    if(!indexByGTIN.has(g)) indexByGTIN.set(g,{});
    indexByGTIN.get(g)[p.tipo] = p;
  }
}

/* ===================== BANNERS (compactos) ===================== */
function renderBanner(containerId, tipos) {
  const faixa = el(`#${containerId}`); if (!faixa) return;
  faixa.innerHTML = "";

  produtos.filter(p => tipos.includes(p.tipo)).forEach(obj => {
    const p = autoFillDiscount({...obj});
    const meta = STORE_META[p.tipo];

    const card = document.createElement("div");
    card.className = "relative banner-card rounded-lg flex-shrink-0 cursor-pointer hover:scale-[1.03] transition";
    card.style.border = `2px solid ${meta.corBorda}80`;
    card.style.boxShadow = `0 1px 4px rgba(0,0,0,.06)`;

    const imgWrap = buildImg(p.imagem, p.nome);
    imgWrap.style.background = meta.bgCard;
    card.appendChild(imgWrap);

    const seloWrap = document.createElement("div");
    seloWrap.className = "mt-1 card-selo";
    seloWrap.innerHTML = `<img src="${meta.logo}" class="card-logo" alt="${meta.nome}">`;
    card.appendChild(seloWrap);
    attachLogoFallback(seloWrap.querySelector("img"));

    card.insertAdjacentHTML("beforeend", `
      <h2 class="font-semibold text-center banner-title text-gray-800">${p.nome}</h2>
      <p class="card-old">${p.precoAntigo ? fmt(p.precoAntigo) : ""}</p>
      <p class="card-price" style="color:${meta.corTexto}">${fmt(p.precoAtual)}</p>
      <span class="card-off" style="color:${meta.off}">${p.desconto || ""}</span>
    `);

    card.addEventListener("click", () => openModal(p));
    faixa.appendChild(card);
  });
}

/* ===================== NORMALIZAÇÃO p/ COMPARAÇÃO ===================== */
function normalizeKey(obj){
  if (obj.sku) return `sku:${String(obj.sku).trim().toLowerCase()}`;
  if (obj.key) return `key:${String(obj.key).trim().toLowerCase()}`;

  let name = (obj.nome || "").toLowerCase();

  name = name.replace(/\([^)]*\)/g, " ");
  name = name.replace(/[—–\-]/g, " ");
  name = name.replace(/\b(pp|p|m|g|gg|xg|xl|xxl|preto|branco|bege|azul|rosa|vermelho)\b/g, " ");
  name = name.replace(/\b(\d+(?:,\d+)?)\b(?!\s*(kg|mg|ml|comprimid))/g, " ");
  name = name.replace(/\s+/g, " ").trim();

  const tokens = name.split(" ").filter(Boolean);
  return "nm:" + tokens.slice(0, 6).join(" ");
}

function groupByKey(list){
  const map = new Map();
  list.forEach(p=>{
    const k = normalizeKey(p);
    if (!map.has(k)) map.set(k, []);
    map.get(k).push(p);
  });
  return map;
}

function comparablesFor(product, list=produtos){
  const key = normalizeKey(product);
  return groupByKey(list).get(key) || [];
}

let listaAtual = produtos.slice();
window.listaAtual = listaAtual;

/* ===================== LISTA PRINCIPAL ===================== */
function renderLista(lista) {
  const wrap = el("#listaProdutos"); if (!wrap) return;
  const data = Array.isArray(lista) ? lista : [];
  listaAtual = [...data];
  window.listaAtual = listaAtual;
  wrap.innerHTML = "";
  data.forEach(obj => {
    const p = autoFillDiscount({...obj});
    const meta = STORE_META[p.tipo];

    const card = document.createElement("div");
    card.className = "relative card-geral p-1";
    card.style.border = `2px solid ${meta.corBorda}80`;

    // === atributos p/ highlight ===
    if (p.gtin)   card.setAttribute("data-gtin", String(p.gtin));
    if (!p.simKey) p.simKey = makeSimKey(p.nome||"");
    card.setAttribute("data-simkey", p.simKey);

    if (meta?.bgCard){
      card.style.background = meta.bgCard;
    }
    card.style.borderColor = `${meta?.corBorda || "#e5e7eb"}80`;

    const imgWrap = buildImg(p.imagem, p.nome, { variant: "compact" });
    imgWrap.style.background = meta.bgCard;
    card.appendChild(imgWrap);

    const seloWrap = document.createElement("div");
    seloWrap.className = "card-selo mt-1";
    seloWrap.innerHTML = `<img src="${meta.logo}" class="card-logo" alt="${meta.nome}">`;
    card.appendChild(seloWrap);
    attachLogoFallback(seloWrap.querySelector("img"));

    card.insertAdjacentHTML("beforeend", `
      <div class="card-nome">${p.nome}</div>
      <p class="card-old">${p.precoAntigo ? fmt(p.precoAntigo) : ""}</p>
      <div class="card-price card-price--solo" style="color:${meta.corTexto}">${fmt(p.precoAtual)}</div>
      ${p.desconto ? `<span class="card-off">${p.desconto}</span>` : ""}
    `);

    card.addEventListener("click", ()=> openModal(p));

    wrap.appendChild(card);
  });

  // aplica destaque se houver seleção
  destacarSelecao();
}

const renderStarsCompact = (rating=0) => {
  const full = Math.floor(rating);
  const half = rating - full >= 0.25 && rating - full < 0.75 ? 1 : 0;
  const empty = 5 - full - half;
  return "★".repeat(full) + (half?"☆":"") + "·".repeat(Math.max(empty,0));
};
const setMetaRow = (id, html) => {
  const target = el(`#${id}`);
  if (!target) return;
  if (!html){
    target.classList.add("hidden");
    target.innerHTML = "";
  } else {
    target.classList.remove("hidden");
    target.innerHTML = html;
  }
};

/* ===================== MODAL ===================== */
function openModal(obj) {
  const p = autoFillDiscount({...obj});
  const meta = STORE_META[p.tipo];
  const modal = el("#productModal");
  const box   = el("#modalBox");
  if (!modal || !box) return;

  const modalImg = el("#modalImage");
  if (modalImg){
    modalImg.src = p.imagem || IMG_PLACEHOLDER;
    modalImg.onerror = () => { modalImg.src = IMG_PLACEHOLDER; };
  }

  const title = el("#modalTitle");
  if (title) title.textContent = p.nome || "";

  const oldP = el("#modalOldPrice");
  if (oldP) oldP.textContent = p.precoAntigo ? fmt(p.precoAntigo) : "";

  const price = el("#modalPrice");
  if (price){
    price.textContent = fmt(p.precoAtual);
    price.style.color = meta.corTexto;
  }

  const disc = el("#modalDiscount");
  if (disc){
    disc.textContent = p.desconto || "";
    disc.style.color = meta.off;
  }

  const parc = el("#modalParcelas");
  if (parc) parc.textContent = p.parcelas || "";

  const link = el("#modalLink");
  if (link){
    link.href = p.link || "#";
    link.style.background = `linear-gradient(90deg, ${meta.btn[0]}, ${meta.btn[1]})`;
    link.style.color = (p.tipo === "petlove" || p.tipo === "mercadolivre") ? "#0b1322" : "#fff";
    link.style.border = `1px solid ${meta.corBorda}88`;
    const lojaLabel = (meta && meta.nome) ? meta.nome : "loja";
    link.textContent = `Comprar na ${lojaLabel}`;
    link.setAttribute("aria-label", `Ir para ${lojaLabel} e finalizar a compra`);
  }

  const logo = el("#modalStoreLogo");
  if (logo){
    logo.src = meta.logo;
    attachLogoFallback(logo);
  }

  const sr = el("#modalStoreName");
  if (sr) sr.textContent = meta.nome;

  const ul = el("#modalDetails");
  if (ul){
    ul.innerHTML = "";
    const maxDetails = window.innerWidth <= 640 ? 3 : 6;
    const detalhes = (p.detalhes || []).slice(0, maxDetails);
    if (detalhes.length){
      ul.classList.remove("hidden");
      detalhes.forEach(t => {
        const li = document.createElement("li");
        li.textContent = t;
        ul.appendChild(li);
      });
    } else {
      ul.classList.add("hidden");
    }
  }

  setMetaRow("modalRatingRow",
    p.rating
      ? `<span class="text-gray-900 font-semibold">${p.rating.toFixed(1)}</span> <span class="text-amber-500">${renderStarsCompact(p.rating)}</span> <span class="text-[11px] text-gray-500">${p.reviews ? (p.reviews.toLocaleString ? '(' + p.reviews.toLocaleString('pt-BR') + ')' : '(' + p.reviews + ')') : ''}</span>`
      : ""
  );
  setMetaRow("modalRankRow", p.categoryRank ? `${p.categoryRank}` : "");
  setMetaRow("modalCashbackRow", p.cashback ? `Cashback: ${p.cashback}` : "");
  setMetaRow("modalPixRow", p.precoPix ? `Pix: <strong>${fmt(p.precoPix)}</strong>` : "");
  setMetaRow("modalGtinRow", p.gtin ? `GTIN/EAN: <strong>${normalizeGTIN(p.gtin)}</strong>` : "");
  setMetaRow("modalCupomRow", p.cupom ? `Cupom ${p.cupom}${p.cupomDescricao ? ' - ' + p.cupomDescricao : ''}` : "");

  let btnCmp = el("#btnModalComparar");
  if (!btnCmp){
    btnCmp = document.createElement("button");
    btnCmp.id = "btnModalComparar";
    btnCmp.type = "button";
    btnCmp.className = "cmp-modal-btn";
    btnCmp.textContent = "Comparar preços em outras lojas";
    const linkRef = el("#modalLink");
    if (linkRef) linkRef.insertAdjacentElement("afterend", btnCmp);
  } else {
    btnCmp.type = "button";
    btnCmp.classList.add("cmp-modal-btn");
    btnCmp.textContent = "Comparar preços em outras lojas";
  }
  btnCmp.onclick = (evt)=> {
    evt?.preventDefault?.();
    const g = normalizeGTIN(p.gtin);
    if (g) abrirComparadorPorGTIN(g);
    else   abrirComparador(p);
  };

  const header = document.querySelector("header.sticky");
  const selo = document.querySelector(".ml-selo");
  if(header) header.classList.add("hidden");
  if(selo) selo.classList.add("hidden");

  modal.classList.remove("hidden");
  modal.classList.add("flex");
  requestAnimationFrame(()=> {
    box.classList.remove("scale-95","opacity-0");
    box.classList.add("scale-100","opacity-100");
  });
}

function closeModal(){
  const modal = el("#productModal");
  const box   = el("#modalBox");
  if (!modal || !box) return;
  box.classList.add("scale-95","opacity-0");
  setTimeout(()=>{
    modal.classList.add("hidden"); modal.classList.remove("flex");
    const header = document.querySelector("header.sticky");
    const selo = document.querySelector(".ml-selo");
    if(header) header.classList.remove("hidden");
    if(selo) selo.classList.remove("hidden");
  },200);
}
(function bindModal(){
  const closeBtn = el("#closeModal");
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  const modalBg = el("#productModal");
  if (modalBg) modalBg.addEventListener("click", (e)=>{ if(e.target.id==="productModal") closeModal(); });
})();

/* ===================== FILTROS ===================== */
function aplicarFiltros(arg){
  const isEvent = arg && typeof arg === "object" && "target" in arg && typeof arg.preventDefault === "function";
  const options = isEvent ? {} : (arg || {});
  const modoCatalogo = !!options.modoCatalogo;

  const busca = (el("#buscaInput")?.value || "").toLowerCase();
  const categoria = (el("#filtroCategoria")?.value || "").toLowerCase();
  const preco = el("#filtroPreco")?.value || "";
  const origens = Array.from(document.querySelectorAll(".origemCheck:checked")).map(c=>c.value);

  const mapaCat = {
    "roupas": ["roupa","tricot","bandana","gravata"],
    "acessórios": ["laço","peitoral","gravata","bandana","escova","pente"],
    "higiene": ["shampoo","condicionador","perfume","hidratante"],
    "camas": ["cama","donut"],
    "rações": ["ração","racao"]
  };

  const { gtin: alvoGTIN, simKey: alvoSIMK } = window.filtrosAlvo;
  const temAlvo = Boolean(alvoGTIN || alvoSIMK);
  document.body.classList.toggle("catalogo-focus", temAlvo);

  const filtrados = produtos.filter(p=>{
    // origem
    if (origens.length && !origens.includes(p.tipo)) return false;
    // texto
    if (busca && !temAlvo && !p.nome.toLowerCase().includes(busca)) return false;
    // categoria
    if (categoria){
      const termos = mapaCat[categoria] || [];
      if (!termos.some(t=>p.nome.toLowerCase().includes(t))) return false;
    }
    // preço
    if (preco === "0" && p.precoAtual > 50) return false;
    if (preco === "1" && (p.precoAtual < 50 || p.precoAtual > 150)) return false;
    if (preco === "2" && p.precoAtual < 150) return false;

    // ==== interseção com alvo selecionado ====
    if (alvoGTIN || alvoSIMK){
      const gOK = alvoGTIN && normalizeGTIN(p.gtin) === alvoGTIN;
      const kOK = alvoSIMK && String(p.simKey||"") === String(alvoSIMK);
      if (!(gOK || kOK)) return false;
    }

    return true;
  });

  if (modoCatalogo){
    document.body.classList.remove("modo-filtro");
    document.querySelector("header.sticky")?.classList.remove("hidden");
    document.querySelector(".ml-selo")?.classList.remove("hidden");
    document.getElementById("barraFiltros")?.classList.add("hidden");
    const secLista = document.getElementById("secListaProdutos");
    if (secLista){
      requestAnimationFrame(()=>{
        secLista.scrollIntoView({ behavior:"smooth", block:"start" });
      });
    }
  } else {
    ativarFiltro(true);
  }
  toggleComparador(false);
  renderLista(filtrados);

  // estado vazio
  const lista = el("#listaProdutos");
  if (lista && !filtrados.length){
    lista.innerHTML = `
      <div class="text-center text-gray-600 bg-white rounded-md p-4 shadow-sm mt-4 border border-gray-200 w-full">
        <span class="block text-lg font-semibold">😕 Nenhum item encontrado</span>
        <span class="text-sm text-gray-500">Tente mudar os filtros ou limpar a busca.</span>
      </div>`;
  }

  // atualiza chip
  ensureChipSelecionado();
}

/* cria a barra de filtros logo abaixo do selo multimarcas */
function criarBarraFiltros(){
  const selo = document.querySelector(".ml-selo");
  const barra = document.createElement("div");
  barra.id = "barraFiltros";
  barra.className = "hidden rounded-xl mt-1.5 p-2 shadow-md flex flex-col items-center justify-center gap-2 max-w-6xl mx-auto";

  const origemHTML = Object.entries(STORE_META).map(([k,v])=>`
    <label data-src="${k}" class="ativo" aria-label="${v.nome}" title="${v.nome}">
      <input type="checkbox" class="origemCheck" value="${k}" checked />
      <img src="${v.logo}" alt="" class="filtro-logo" />
    </label>
  `).join("");

  barra.innerHTML = `
    <div class="f-controls w-full flex flex-wrap items-center justify-center gap-2">
      <div class="search-wrap relative min-w-[240px] max-w-[680px] w-full">
        <svg class="icon absolute left-3 top-1/2 -translate-y-1/2" viewBox="0 0 24 24" width="18" height="18" fill="none">
          <path d="M21 21l-4.3-4.3M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" stroke="#6b7280" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <input id="buscaInput" type="text" placeholder="Buscar (ex: laço, cama, shampoo)..." class="w-full h-10 rounded-full border px-9 pr-9" />
        <button id="clearBusca" type="button"
                class="clear hidden absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full border grid place-items-center leading-none">×</button>
      </div>

      <select id="filtroPreco" class="select-pill px-3 py-1.5 rounded-full border h-10">
        <option value="">Preço</option>
        <option value="0">Até R$ 50</option>
        <option value="1">R$ 50–R$ 150</option>
        <option value="2">+ R$ 150</option>
      </select>

      <select id="filtroCategoria" class="px-3 py-1.5 rounded-full border min-w-[180px] md:min-w-[160px] sm:min-w-[140px] h-10 font-semibold">
        <option value="">Categoria</option>
        <option>Roupas</option><option>Acessórios</option><option>Higiene</option><option>Camas</option><option>Rações</option>
      </select>
    </div>

    <div id="filtroOrigem" class="w-full">
      ${origemHTML}
    </div>
  `;

  if (selo) selo.insertAdjacentElement("afterend", barra);
  else document.body.insertBefore(barra, document.body.firstChild);

  const busca = barra.querySelector("#buscaInput");
  const clear = barra.querySelector("#clearBusca");
  const showClear = () => { if (clear) clear.classList.toggle("hidden", !busca.value); };

  ["input","change"].forEach(evt=>{
    if (busca) busca.addEventListener(evt, ()=>{ showClear(); aplicarFiltros(); });
  });
  if (clear) clear.addEventListener("click", ()=>{ busca.value = ""; showClear(); aplicarFiltros(); });

  ["filtroPreco","filtroCategoria"].forEach(id=>{
    const elx = barra.querySelector(`#${id}`);
    if (elx) elx.addEventListener("change", aplicarFiltros);
  });

  barra.querySelectorAll(".origemCheck").forEach(chk=>{
    const label = chk.closest("label");
    chk.addEventListener("change", ()=>{
      label.classList.toggle("ativo", chk.checked);
      aplicarFiltros();
    });
  });

  barra.querySelectorAll("#filtroOrigem img").forEach(attachLogoFallback);

  barra.classList.add("hidden");
}
/* ===================== BUSCA INTELIGENTE (AUTOCOMPLETE) ===================== */
function setupAutocomplete(){
  const input = document.querySelector("#buscaInput");
  if(!input) return;
  const box = document.createElement("div");
  box.id = "autocompleteBox";
  Object.assign(box.style,{
    position:"absolute",top:"100%",left:"0",right:"0",
    background:"#FFF8ED",border:"1px solid #D6A75C",
    borderRadius:"10px",boxShadow:"0 4px 12px rgba(0,0,0,.12)",
    zIndex:"80",padding:"6px",display:"none",maxHeight:"280px",overflowY:"auto"
  });
  input.parentElement.style.position="relative";
  input.parentElement.appendChild(box);

  function renderSuggestions(txt){
    const val=txt.toLowerCase().trim();
    if(!val){ box.style.display="none"; return; }
    const matches=produtos.filter(p=>p.nome.toLowerCase().includes(val)).slice(0,8);
    if(!matches.length){
      box.innerHTML="<div style='padding:6px;color:#555;font-size:13px;'>Nenhum resultado encontrado</div>";
      box.style.display="block";return;
    }
    box.innerHTML="";
    matches.forEach(p=>{
      const meta=STORE_META[p.tipo]||{};
      const item=document.createElement("div");
      item.style.display="flex";item.style.alignItems="center";item.style.gap="8px";
      item.style.padding="5px 6px";item.style.cursor="pointer";item.style.borderRadius="8px";
      item.style.transition="background .15s";item.onmouseenter=()=>item.style.background="#fff3d6";
      item.onmouseleave=()=>item.style.background="transparent";

      const img=document.createElement("img");
      img.src=p.imagem||IMG_PLACEHOLDER;img.alt=p.nome;
      Object.assign(img.style,{width:"40px",height:"40px",objectFit:"contain",borderRadius:"6px",flexShrink:"0"});

      const name=document.createElement("div");
      name.style.flex="1";name.style.fontSize="13px";name.style.fontWeight="600";name.style.color="#333";
      const regex=new RegExp(`(${val})`,"gi");
      name.innerHTML=p.nome.replace(regex,"<b>$1</b>");

      item.appendChild(img);item.appendChild(name);
      item.onclick=()=>{
        selecionarProdutoNosFiltros(p);
        box.style.display="none";
      };
      box.appendChild(item);
    });
    box.style.display="block";
  }
  input.addEventListener("input",()=>renderSuggestions(input.value));
  document.addEventListener("click",e=>{
    if(!box.contains(e.target)&&e.target!==input) box.style.display="none";
  });
}

/* mostra/oculta modo filtro e restaura listas */
function ativarFiltro(ativo){
  const body = document.body;
  const btn = document.getElementById("btnBuscaFlutuante");
  const barra = document.getElementById("barraFiltros");
  const header = document.querySelector("header.sticky");
  const selo = document.querySelector(".ml-selo");

  if (ativo){
    body.classList.add("modo-filtro");
    if (btn){ btn.classList.add("ativo"); btn.innerHTML = '<span>??</span> Fechar Filtro'; }
    if (header) header.classList.add("hidden");
    if (selo) selo.classList.add("hidden");
    if (barra){
      barra.classList.remove("hidden");
      barra.style.opacity = "0"; barra.style.transform = "translateY(-10px)";
      requestAnimationFrame(()=>{
        barra.style.transition = "all .35s ease"; barra.style.opacity="1"; barra.style.transform="translateY(0)";
      });
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    body.classList.remove("modo-filtro");
    document.body.classList.remove("catalogo-focus");
    window.filtrosAlvo.gtin = null;
    window.filtrosAlvo.simKey = null;
    window.filtrosAlvo.rotulo = null;
    ensureChipSelecionado();
    destacarSelecao();
    if (btn){ btn.classList.remove("ativo"); btn.innerHTML = '?? Buscar / Filtrar'; }
    if (header) header.classList.remove("hidden");
    if (selo) selo.classList.remove("hidden");
    if (barra){
      barra.style.transition = "all .3s ease";
      barra.style.opacity="0"; barra.style.transform="translateY(-10px)";
      setTimeout(()=> barra.classList.add("hidden"), 280);
    }
    renderBanner("bannerA", ["shopee","amazon","magalu","americanas","aliexpress","petlove","mercadolivre","petz","cobasi","carrefour","casasbahia","ponto"]);
    toggleComparador(false);
    listaAtual = produtos.slice();
    window.listaAtual = listaAtual;
    renderLista(produtos);
  }
}

/* =============== BOTÕES: abrir/fechar filtro =============== */
(function mountCloseFloat(){
  // cria botão flutuante lateral para fechar filtros (só exibe no modo-filtro)
  if (!document.getElementById('btnFecharFiltroFloat')){
    const btn = document.createElement('button');
    btn.id = 'btnFecharFiltroFloat';
    btn.type = 'button';
    btn.title = 'Fechar filtros';
    btn.setAttribute('aria-label','Fechar filtros');
    btn.innerHTML = '✖ Fechar filtros';
    document.body.appendChild(btn);

    btn.addEventListener('click', (e)=>{
      e.preventDefault();
      if (document.body.classList.contains('modo-filtro')){
        ativarFiltro(false);
      }
    });
  }
})();

(function bindOpenToggle(){
  const btnFloat = document.getElementById("btnBuscaFlutuante");
  if (!btnFloat) return;
  const syncAria = () => {
    btnFloat.setAttribute(
      'aria-expanded',
      document.body.classList.contains('modo-filtro') ? 'true':'false'
    );
    btnFloat.classList.toggle('ativo', document.body.classList.contains('modo-filtro'));
  };
  btnFloat.addEventListener("click", () => {
    const ativo = document.body.classList.contains("modo-filtro");
    ativarFiltro(!ativo);
    setTimeout(syncAria, 0);
  });
  document.addEventListener('DOMContentLoaded', syncAria);
})();

/* =============== ROLAGEM AUTOMÁTICA BANNERS =============== */
function autoScroll(containerId){
  const faixa = document.getElementById(containerId);
  if (!faixa || !faixa.parentElement) return;
  const scroller = faixa.parentElement;
  let dir = 1;
  function loop(){
    scroller.scrollLeft += dir*0.5;
    if (scroller.scrollLeft + scroller.clientWidth >= scroller.scrollWidth - 1) dir = -1;
    else if (scroller.scrollLeft <= 0) dir = 1;
    requestAnimationFrame(loop);
  }
  loop();
}

/* ===================== COMPARADOR (UI) ===================== */
function toggleComparador(show){
  const secCmp  = el("#secComparador");
  let secList = el("#secListaProdutos");
  if (!secList){
    const lista = el("#listaProdutos");
    secList = lista ? lista.closest("section") || lista.parentElement : null;
  }
  if (!secCmp || !secList) return;

  document.body.classList.toggle("comparador-focus", !!show);

  if (show){
    secList.classList.add("hidden");
    secCmp.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    secCmp.classList.add("hidden");
    secList.classList.remove("hidden");
  }
}

function abrirComparadorPorGTIN(gtin14){
  closeModal();
  const pack = indexByGTIN.get(gtin14);
  if (!pack){
    const fake = { nome:`GTIN ${gtin14}`, tipo:"mercadolivre", precoAtual:0 };
    renderComparador([fake], fake);
    toggleComparador(true);
    return;
  }
  const grupo = Object.values(pack);
  renderComparador(grupo, grupo[0]);
  toggleComparador(true);
}

function abrirComparador(baseProduct){
  closeModal();
  const g = normalizeGTIN(baseProduct.gtin);
  if (g){ abrirComparadorPorGTIN(g); return; }
  const grupo = comparablesFor(baseProduct);
  renderComparador(grupo, baseProduct);
  toggleComparador(true);
}

function normalizeShippingOption(opt){
  if (!opt) return null;
  const nomeRaw = (opt.nome || opt.label || "Entrega").toString().trim();
  const prazoRaw = (opt.prazo || opt.eta || opt.tempo || "").toString().trim();
  const detalheRaw = (opt.detalhe || opt.obs || opt.descricao || opt.comment || "").toString().trim();
  const isFree = opt.freteGratis || opt.preco === 0 || opt.valor === 0;
  let tipo = opt.tipo;
  if (!tipo){
    if (/hora|24h|1 dia/i.test(prazoRaw)) tipo = "express";
    else if (/10|12|15|20|semana/i.test(prazoRaw)) tipo = "economy";
    else tipo = "regular";
  }
  return {
    nome: nomeRaw || "Entrega",
    prazo: prazoRaw || "Consultar prazo",
    detalhe: detalheRaw,
    freteGratis: Boolean(isFree),
    tipo
  };
}

function resolveShippingOptions(prod, meta){
  if (Array.isArray(prod?.shippingOptions) && prod.shippingOptions.length){
    return prod.shippingOptions.map(normalizeShippingOption).filter(Boolean);
  }
  if (Array.isArray(meta?.shipping) && meta.shipping.length){
    return meta.shipping.map(normalizeShippingOption).filter(Boolean);
  }
  return [];
}

function buildShippingHtml(options){
  if (!options.length) return "";
  const trimmed = options.slice(0,3);
  return `
    <div class="cmp-ship-grid">
      ${trimmed.map(opt => `
        <div class="cmp-ship-chip ${opt.freteGratis ? "is-free" : ""}" data-speed="${opt.tipo || "regular"}">
          <div>
            <span>${opt.nome}</span>
            ${opt.detalhe ? `<small>${opt.detalhe}</small>` : ""}
          </div>
          <strong>${opt.prazo}</strong>
        </div>
      `).join("")}
    </div>
  `;
}

function renderComparador(grupo, baseProduct){
  const cont = el("#listaComparativos");
  if (!cont) return;
  cont.innerHTML = "";

  if (!grupo || grupo.length <= 1){
    cont.innerHTML = `
      <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <div class="text-center text-gray-700 font-semibold">Só encontramos este item em <b>${grupo?.length || 0}</b> loja no momento.</div>
        <div class="text-center mt-2">
          <button id="btnVoltarLista" class="px-3 py-2 rounded-md bg-black text-white text-sm font-bold">← Voltar para a lista</button>
        </div>
      </div>`;
    el("#btnVoltarLista")?.addEventListener("click", ()=> toggleComparador(false));
    return;
  }

  const ordenados = [...grupo].sort((a,b)=> a.precoAtual - b.precoAtual);
  const menor = ordenados[0];
  const maior = ordenados[ordenados.length-1];
  const media = ordenados.reduce((acc,p)=>acc+p.precoAtual,0)/ordenados.length;

  const head = document.createElement("div");
  head.className = "col-span-full bg-white border border-gray-200 rounded-lg p-3 shadow-sm";
  head.classList.add("cmp-summary");
  head.innerHTML = `
    <div class="flex flex-col gap-2">
      <div class="flex flex-wrap items-center justify-between gap-2">
        <h3 class="text-sm sm:text-base font-extrabold text-gray-800">
          🔎 Comparando: <span class="text-gray-900">${baseProduct?.nome || menor.nome}</span>
        </h3>
        <div class="flex gap-2">
          <button id="btnVoltarLista" class="px-3 py-2 rounded-md bg-black text-white text-xs sm:text-sm font-bold">← Voltar para a lista</button>
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs sm:text-sm">
        <div class="bg-green-50 border border-green-200 rounded-md p-2">
          <div class="font-bold text-green-700">Menor preço</div>
          <div class="text-green-800">${(STORE_META[menor.tipo]?.nome) || menor.tipo} — <b>${fmt(menor.precoAtual)}</b></div>
        </div>
        <div class="bg-amber-50 border border-amber-200 rounded-md p-2">
          <div class="font-bold text-amber-700">Preço médio</div>
          <div class="text-amber-800"><b>${fmt(media)}</b> (entre ${grupo.length} lojas)</div>
        </div>
        <div class="bg-red-50 border border-red-200 rounded-md p-2">
          <div class="font-bold text-red-700">Maior preço</div>
          <div class="text-red-800">${(STORE_META[maior.tipo]?.nome) || maior.tipo} — <b>${fmt(maior.precoAtual)}</b></div>
        </div>
      </div>
      <p class="text-[11px] sm:text-xs text-gray-500 leading-snug">Estimativas de frete abaixo consideram as modalidades mais rápidas de cada loja e podem variar por CEP.</p>
    </div>
  `;
  cont.appendChild(head);
  el("#btnVoltarLista")?.addEventListener("click", ()=> toggleComparador(false));

  ordenados.forEach(p=>{
    const meta = STORE_META[p.tipo] || {};
    const card = document.createElement("div");
    card.className = "cmp-card bg-white border border-gray-200 rounded-2xl shadow-sm";
    const isBest = (p === menor);
    const diffValue = p.precoAtual - menor.precoAtual;
    const diffChip = !isBest ? `<span class="cmp-chip cmp-chip--neutral">+ ${fmt(diffValue)} vs melhor</span>` : "";
    const parcelasInfo = p.parcelas ? `<span class="cmp-price-note">${p.parcelas}</span>` : "";
    const tagChips = [
      p.precoAntigo ? `<span class="cmp-chip cmp-chip--old">${fmt(p.precoAntigo)}</span>` : "",
      p.desconto ? `<span class="cmp-chip cmp-chip--discount">${p.desconto}</span>` : "",
      p.freteAPartir ? `<span class="cmp-chip cmp-chip--neutral">Frete: ${fmt(p.freteAPartir)}</span>` : ""
    ].filter(Boolean).join("");
    const tagsBlock = tagChips ? `<div class="cmp-card-tags">${tagChips}</div>` : "";
    const shippingHtml = buildShippingHtml(resolveShippingOptions(p, meta));
    const storeName = meta?.nome || (p.tipo || "Loja");
    const logoSrc = meta?.logo || "";
    const priceColor = meta?.corTexto || "#0f172a";
    const btnStart = meta?.btn?.[0] || "#111827";
    const btnEnd = meta?.btn?.[1] || btnStart;
    const borderColor = meta?.corBorda || "#111827";

    card.innerHTML = `
      <div class="cmp-card-head">
        <div class="cmp-card-store">
          <img src="${logoSrc}" alt="${storeName}" class="h-6 w-auto" />
          <span class="cmp-store-name">${storeName}</span>
        </div>
        ${isBest ? `<span class="cmp-chip cmp-chip--best">MENOR PREÇO</span>` : ""}
      </div>

      <div class="cmp-card-priceRow">
        <div class="cmp-price" style="color:${priceColor}">${fmt(p.precoAtual)}</div>
        <div class="cmp-price-meta">
          ${parcelasInfo}
          ${diffChip}
        </div>
      </div>

      ${tagsBlock}
      ${shippingHtml}

      <div class="cmp-card-actions">
        <a href="${p.link || "#"}" target="_blank"
           class="cmp-btn-primary"
           style="background:linear-gradient(90deg, ${btnStart}, ${btnEnd}); border:1px solid ${borderColor}33">
          Abrir na loja
        </a>
        <button class="cmp-btn-secondary ver-btn">Detalhes</button>
      </div>
    `;

    const top = document.createElement("div");
    top.className = "cmp-card-product";
    const imgW = buildImg(p.imagem, p.nome, "h-14");
    imgW.classList.remove("h-24","sm:h-28");
    imgW.classList.add("h-16","sm:h-20");
    top.appendChild(imgW);

    const nm = document.createElement("div");
    nm.className = "cmp-product-name";
    nm.textContent = p.nome;
    top.appendChild(nm);

    card.insertBefore(top, card.firstChild);
    card.querySelector(".ver-btn")?.addEventListener("click", ()=> openModal(p));

    cont.appendChild(card);
  });
}

/* ===================== TOOLTIP / HOVERCARD ===================== */
(function(){
  const tip = document.getElementById('hoverTip');
  if(!tip){ return; }

  const tipImg   = tip.querySelector('.tip-img img');
  const tipStore = tip.querySelector('.tip-store');
  const tipTitle = tip.querySelector('.tip-title');
  const tipOld   = tip.querySelector('.tip-old');
  const tipOff   = tip.querySelector('.tip-off');
  const tipPrice = tip.querySelector('.tip-price');
  const tipDesc  = tip.querySelector('.tip-desc');

  let rafMove = null;
  function moveHoverTip(px, py){
    if(rafMove) cancelAnimationFrame(rafMove);
    rafMove = requestAnimationFrame(()=>{
      const pad = 16;
      const vw = window.innerWidth, vh = window.innerHeight;
      const rect = tip.getBoundingClientRect();
      let x = px + pad, y = py + pad;
      if (x + rect.width > vw - 8)  x = vw - rect.width - 8;
      if (y + rect.height > vh - 8) y = py - rect.height - pad;
      tip.style.left = x + 'px';
      tip.style.top  = y + 'px';
    });
  }

  function storeMeta(tipo){
    if (typeof STORE_META === 'object' && STORE_META[tipo]) return STORE_META[tipo];
    return { nome: tipo || 'Loja', logo: '' };
  }

  function showHoverTip(prod, px, py){
    if(!prod) return;
    const meta = storeMeta(prod.tipo);

    tipImg.src = prod.imagem || '';
    tipImg.onerror = ()=>{ tipImg.src = ''; };

    if (meta.logo){
      tipStore.src = meta.logo;
      tipStore.alt = meta.nome || 'Loja';
      tipStore.style.display = 'block';
    } else {
      tipStore.style.display = 'none';
    }

    tipTitle.textContent = prod.nome || '';
    tipOld.textContent   = (prod.precoAntigo ? fmt(prod.precoAntigo) : '');
    tipOff.textContent   = (prod.desconto || '');
    tipPrice.textContent = fmt(prod.precoAtual||0);

    if (Array.isArray(prod.detalhes) && prod.detalhes.length){
      tipDesc.textContent = '• ' + prod.detalhes.slice(0,2).join('  • ');
    } else {
      tipDesc.textContent = '';
    }

    tip.classList.add('show');
    tip.setAttribute('aria-hidden','false');
    moveHoverTip(px, py);
  }

  function hideHoverTip(){
    tip.classList.remove('show');
    tip.setAttribute('aria-hidden','true');
  }

  function bindHoverForCard(cardEl, prod){
    if(!cardEl || !prod) return;

    // mouse
    cardEl.addEventListener('mouseenter', e=>{
      showHoverTip(prod, e.clientX, e.clientY);
    });
    cardEl.addEventListener('mousemove', e=>{
      moveHoverTip(e.clientX, e.clientY);
    });
    cardEl.addEventListener('mouseleave', e=>{
      if (e.relatedTarget && tip.contains(e.relatedTarget)) return;
      hideHoverTip();
    });

    // touch
    let touchTimer = null;
    cardEl.addEventListener('touchstart', e=>{
      const t = e.touches[0];
      showHoverTip(prod, t.clientX, t.clientY);
    }, {passive:true});
    cardEl.addEventListener('touchmove', e=>{
      const t = e.touches[0];
      moveHoverTip(t.clientX, t.clientY);
    }, {passive:true});
    cardEl.addEventListener('touchend', ()=>{
      if (touchTimer) clearTimeout(touchTimer);
    });
  }

  tip.addEventListener('mouseleave', hideHoverTip);
  window.addEventListener('scroll', hideHoverTip, { passive:true });
  document.addEventListener('touchstart', (e)=>{
    if (tip.contains(e.target) || e.target.closest('.card-geral')) return;
    hideHoverTip();
  }, { passive:true });

  // Decorar renderLista e renderBanner para anexar tooltips
  const _renderLista = window.renderLista;
  if (typeof _renderLista === 'function'){
    window.renderLista = function(lista){
      _renderLista(lista);
      const wrap = document.querySelector('#listaProdutos');
      if (!wrap) return;
      const cards = wrap.querySelectorAll('.card-geral');
      cards.forEach((card, idx)=>{
        const prod = lista[idx];
        if (prod) bindHoverForCard(card, prod);
      });
    };
  }

  const _renderBanner = window.renderBanner;
  if (typeof _renderBanner === 'function'){
    window.renderBanner = function(containerId, tipos){
      _renderBanner(containerId, tipos);
      const faixa = document.getElementById(containerId);
      if (!faixa) return;
      const rendered = (window.produtos || []).filter(p => (tipos||[]).includes(p.tipo));
      const cards = faixa.querySelectorAll('.banner-card');
      cards.forEach((card, idx)=>{
        const prod = rendered[idx];
        if (prod) bindHoverForCard(card, prod);
      });
    };
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    // lista
    const wrap = document.querySelector('#listaProdutos');
    if (wrap){
      const cards = wrap.querySelectorAll('.card-geral');
      cards.forEach((card, idx)=>{
        const prod = (window.produtos || [])[idx];
        if (prod) bindHoverForCard(card, prod);
      });
    }
    // banners
    const faixa = document.getElementById('bannerA');
    if (faixa){
      const tipos = ['shopee','amazon','magalu','americanas','aliexpress','petlove','mercadolivre','petz','cobasi','carrefour','casasbahia','ponto'];
      const rendered = (window.produtos || []).filter(p => tipos.includes(p.tipo));
      const cards = faixa.querySelectorAll('.banner-card');
      cards.forEach((card, idx)=>{
        const prod = rendered[idx];
        if (prod) bindHoverForCard(card, prod);
      });
    }
  });

  // Expor helpers se precisar
  window.__hoverTip = { show: showHoverTip, hide: hideHoverTip, bind: bindHoverForCard };
})();

/* ===================== INIT ===================== */
window.addEventListener("DOMContentLoaded", ()=>{
  // conteúdo padrão
  renderBanner("bannerA", ["shopee","amazon","magalu","americanas","aliexpress","petlove","mercadolivre","petz","cobasi","carrefour","casasbahia","ponto"]);
  renderLista(produtos);
  criarBarraFiltros();
  setupAutocomplete();
  autoScroll("bannerA");
  document.body.classList.remove("modo-filtro");

  // Índice de GTIN para comparador por código
  indexarPorGTIN(produtos);

  // Toolbar opcional (caso exista)
  const tb = document.querySelector(".ml-toolbar");
  if (tb){
    const btnBack = document.createElement("button");
    btnBack.className = "hidden ml-auto px-3 py-1.5 rounded-md bg-black text-white text-xs font-bold";
    btnBack.id = "toolbarVoltar";
    btnBack.textContent = "← Voltar para a lista";
    btnBack.onclick = ()=> toggleComparador(false);
    tb.appendChild(btnBack);

    const obs = new MutationObserver(()=>{
      const secCmp = el("#secComparador");
      if (secCmp && !secCmp.classList.contains("hidden")) btnBack.classList.remove("hidden");
      else btnBack.classList.add("hidden");
    });
    const secC = el("#secComparador");
    if (secC) obs.observe(secC, { attributes:true, attributeFilter:["class"] });
  }
});
