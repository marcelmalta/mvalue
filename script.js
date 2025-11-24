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
    /* Cards do carrossel (mantêm largura fixa para deslizar) */
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

    /* Cards do carrossel ganham mesma curvatura das listas */
    .banner-card .card-logo{
      height: 14px;
      width: auto;
      opacity:.95;
    }

  `;
  const style = document.createElement('style');
  style.setAttribute(`data-${id}`, 'true');
  style.textContent = css;
  document.head.appendChild(style);
})();

/* ================== IDENTIDADE POR LOJA ================== */
const LOGO_BASE_URL = "logos/";
const STORE_META = {
  shopee: {
    nome:"Shopee",
    corBorda:"#EE4D2D",
    corTexto:"#8B1F0D",
    bgCard:"linear-gradient(to bottom,#FF8A70,#FFD3C9)",
    logo:`${LOGO_BASE_URL}shopee.svg`,
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
    logo:`${LOGO_BASE_URL}petlove.svg`,
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
    logo:`${LOGO_BASE_URL}amazon.svg`,
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
    logo:`${LOGO_BASE_URL}mercadolivre.svg`,
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
    logo:`${LOGO_BASE_URL}magalu.svg`,
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
    logo:`${LOGO_BASE_URL}petz.svg`,
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
    logo:`${LOGO_BASE_URL}cobasi.svg`,
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
    logo:`${LOGO_BASE_URL}americanas.svg`,
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
    logo:`${LOGO_BASE_URL}aliexpress.svg`,
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
    logo:`${LOGO_BASE_URL}carrefour.svg`,
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
    logo:`${LOGO_BASE_URL}casasbahia.svg`,
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
    logo:`${LOGO_BASE_URL}ponto.svg`,
    btn:["#111111","#444444"],
    off:"#FF5500",
    shipping:[
      { nome:"Retira Ponto", prazo:"até 2h", detalhe:"lojas e lockers", tipo:"express" },
      { nome:"Entrega padrão", prazo:"2-5 dias úteis", detalhe:"transportadora parceira", tipo:"regular" }
    ]
  },
};

/* ===================== PRODUTOS (catálogo com GTIN padronizado) ===================== */
const PRODUTOS_BASE = [
  {
    gtin: "7898049719488",
    nome: "Simparic Zoetis 40 mg 10,1–20 kg — 1 unidade",
    brand: "Zoetis",
    specs: {
      doseMg: 40,
      faixaPeso: "10,1–20 kg",
      unidadesPorKit: 1,
      tipoUnidade: "comprimido mastigável",
      pesoLiquidoKg: 0.04
    },
    descricaoPadrao: [
      "Dose mastigável de 40 mg indicada para cães de 10,1–20 kg.",
      "Protege contra pulgas e carrapatos por até 5 semanas.",
      "Kit com 1 comprimido mastigável individual."
    ],
    ofertas: [
      {
        tipo: "mercadolivre",
        precoAntigo: 118.33,
        precoFinal: 74.60,
        descontoPercent: 36,
        parcelas: "12x R$ 7,35",
        rating: 4.8,
        reviews: 29113,
        badges: ["Novo","Mais vendido"],
        categoryRank: "1º em Tratamentos Anti-Pulgas",
        cashback: "até R$ 2,24",
        imagem: "https://http2.mlstatic.com/D_NQ_NP_2X_905561-MLA88406142177_072025-F.webp",
        link: "https://mercadolivre.com/sec/1t7W5Sn",
        freteInfo: {
          tipo: "variavel",
          label: "Frete calculado no checkout",
          observacao: "Valores variam conforme o CEP e o tipo de envio."
        }
      },
      {
        tipo: "cobasi",
        precoAntigo: 133.90,
        precoFinal: 79.90,
        descontoPercent: 40,
        parcelas: "à vista",
        rating: 4.8,
        reviews: 1370,
        badges: ["Produto original", "Compra Programada", "Amigo Cobasi"],
        loyaltyPoints: 79,
        pickupAvailable: true,
        imagem: "https://cobasi.vteximg.com.br/arquivos/ids/1089375-368-368/Antipulgas%20Simparic%2040mg%20para%20Caes%2010%20a%2020kg.webp?v=638974276600530000",
        link: "#",
        shippingOptions: [
          { nome: "Retire na loja", prazo: "até 11h", preco: 0, freteGratis: true },
          { nome: "Econômica", prazo: "até 1 dia útil", preco: 15.90 },
          { nome: "Cobasi Já", prazo: "até 1 hora*", preco: 17.90 }
        ],
        freteInfo: {
          tipo: "variavel",
          label: "Frete varia por região",
          observacao: "Consulte retirada e entrega no site da Cobasi."
        }
      },
      {
        tipo: "magalu",
        precoAntigo: 85.87,
        precoFinal: 74.97,
        precoPix: 59.98,
        descontoLabel: "≈30% OFF",
        parcelas: "1x R$ 74,97 sem juros",
        rating: 4.7,
        reviews: 232,
        badges: ["Magalu garante", "Olist Plus"],
        cupom: {
          codigo: "PET10",
          descricao: "10% OFF (válido até 16/11)"
        },
        freteAPartir: 28.47,
        imagem: "https://a-static.mlcdn.com.br/800x560/antipulgas-simparic-1-comp-10-a-20kg-zoetis/olistplus/opmjuho68xxtdv8l/43719ef3c6447d809db36e10d861f933.jpeg",
        link: "https://divulgador.magalu.com/3BWYo8lG",
        freteInfo: {
          tipo: "variavel",
          label: "Frete varia por CEP",
          observacao: "Magalu calcula valores a partir do endereço informado.",
          valorReferencia: 28.47
        }
      }
    ]
  },
  {
    gtin: "7898904621243",
    nome: "Ração Premier Ambientes Internos Adultos Castrados Raças Pequenas 12kg",
    brand: "PremierPet",
    specs: {
      unidadesPorKit: 1,
      tipoUnidade: "saco",
      pesoLiquidoKg: 12,
      faixaPeso: "Raças pequenas adultas castradas"
    },
    descricaoPadrao: [
      "Ração Super Premium para cães adultos castrados de raças pequenas.",
      "Embalagem de 12 kg com sabor frango e salmão.",
      "Ajuda no controle de peso e na saúde urinária."
    ],
    ofertas: [
      {
        tipo: "magalu",
        precoAntigo: 263.41,
        precoFinal: 237.07,
        precoPix: 237.07,
        descontoPercent: 10,
        parcelas: "1x R$ 263,41 sem juros",
        rating: 4.9,
        reviews: 17,
        badges: ["Magalu garante"],
        freteAPartir: 62.90,
        imagem: "https://a-static.mlcdn.com.br/800x560/racao-premier-ambientes-internos-caes-adultos-castrados-racas-pequenas-frango-e-salmao-12kg/tudodebichoii/101927/668e894ba2fb3213df9ae0338500762d.jpeg",
        link: "https://divulgador.magalu.com/vc8Itlv6",
        freteInfo: {
          tipo: "variavel",
          label: "Frete varia por CEP",
          observacao: "O valor mostrado é apenas uma referência inicial.",
          valorReferencia: 62.90
        }
      },
      {
        tipo: "mercadolivre",
        precoAntigo: 295.00,
        precoFinal: 260.00,
        precoPix: 260.00,
        descontoPercent: 11,
        parcelas: "6x de R$ 46,83 sem juros",
        rating: 4.9,
        reviews: 63,
        badges: ["Loja oficial Long Dog", "Mais vendido"],
        imagem: "https://http2.mlstatic.com/D_NQ_NP_2X_841714-MLA84121834736_052025-F.webp",
        link: "https://mercadolivre.com/sec/1hrWuPA",
        freteInfo: {
          tipo: "variavel",
          label: "Frete calculado no checkout",
          observacao: "O marketplace mostra opções após informar o CEP."
        }
      }
    ]
  }
];

function montarSpecsInfo(specs = {}) {
  const list = [];
  if (specs.doseMg) list.push({ label: "Dose", value: `${specs.doseMg} mg` });
  if (specs.faixaPeso) list.push({ label: "Faixa de peso", value: specs.faixaPeso });
  if (specs.unidadesPorKit) {
    const unidade = specs.tipoUnidade || (specs.unidadesPorKit > 1 ? "unidades" : "unidade");
    list.push({ label: "Embalagem", value: `${specs.unidadesPorKit} ${unidade}` });
  }
  if (specs.pesoLiquidoKg) list.push({ label: "Peso líquido", value: `${specs.pesoLiquidoKg} kg` });
  if (specs.medidaExtra) list.push({ label: "Medida", value: specs.medidaExtra });
  return {
    specsList: list,
    specsLabel: list.map(item => item.value).join(" • ")
  };
}

function normalizeCupomInfo(raw) {
  if (!raw) return null;
  if (typeof raw === "string") {
    const codigo = raw.trim();
    return codigo ? { codigo, descricao: "", expiraEm: "", destaque: "" } : null;
  }
  if (typeof raw === "object") {
    const codigo = (raw.codigo || raw.code || raw.cupom || "").trim();
    if (!codigo) return null;
    return {
      codigo,
      descricao: raw.descricao || raw.descr || "",
      expiraEm: raw.expiraEm || raw.validade || "",
      destaque: raw.destaque || raw.label || ""
    };
  }
  return null;
}

function montarProduto(base, oferta) {
  const specsInfo = montarSpecsInfo(base.specs || {});
  const precoFinal = Number(oferta.precoFinal ?? oferta.precoAtual ?? oferta.preco ?? 0);
  const precoAntigo = typeof oferta.precoAntigo === "number" ? oferta.precoAntigo : null;
  const descontoPercent = oferta.descontoPercent ??
    (precoAntigo && precoAntigo > precoFinal ? Math.round((1 - (precoFinal / precoAntigo)) * 100) : null);
  const descontoLabel = oferta.descontoLabel || oferta.desconto || (descontoPercent ? `${descontoPercent}% OFF` : "");
  const cupom = normalizeCupomInfo(oferta.cupom);
  const freteInfo = oferta.freteInfo || base.freteInfo || {
    tipo: "variavel",
    label: "Frete varia conforme o CEP",
    observacao: "Calcule o frete na loja para ver o valor final."
  };

  return {
    tipo: oferta.tipo,
    gtin: base.gtin,
    nome: base.nome,
    brand: base.brand,
    doseMg: base.specs?.doseMg ?? null,
    weightRange: base.specs?.faixaPeso || "",
    packQty: base.specs?.unidadesPorKit ?? null,
    precoAntigo,
    precoAtual: precoFinal,
    precoFinal,
    precoPix: oferta.precoPix ?? null,
    parcelas: oferta.parcelas || "",
    rating: oferta.rating ?? null,
    reviews: oferta.reviews ?? null,
    badges: oferta.badges || [],
    categoryRank: oferta.categoryRank || "",
    cashback: oferta.cashback || "",
    imagem: oferta.imagem || "",
    link: oferta.link || "#",
    detalhes: (base.descricaoPadrao || []).slice(),
    descricaoPadrao: (base.descricaoPadrao || []).slice(),
    specsLabel: specsInfo.specsLabel,
    specsList: specsInfo.specsList,
    descontoPercent,
    descontoLabel,
    desconto: descontoLabel,
    freteInfo: {
      ...freteInfo,
      valorReferencia: typeof oferta.freteAPartir === "number" ? oferta.freteAPartir : freteInfo.valorReferencia ?? null
    },
    freteAPartir: typeof oferta.freteAPartir === "number" ? oferta.freteAPartir : null,
    shippingOptions: oferta.shippingOptions || [],
    pickupAvailable: oferta.pickupAvailable ?? false,
    loyaltyPoints: oferta.loyaltyPoints ?? null,
    cupom: cupom,
    cupomDescricao: cupom?.descricao || "",
    cupomValidade: cupom?.expiraEm || "",
    cupomDestaque: cupom?.destaque || "",
    precosAlternativos: oferta.precosAlternativos || (oferta.precoPix ? { pix: oferta.precoPix } : null)
  };
}

const produtos = PRODUTOS_BASE.flatMap(base =>
  (base.ofertas || []).map(oferta => montarProduto(base, oferta))
);
window.produtos = produtos;

/* ===================== UTILS ===================== */
const el  = (sel, root=document) => root.querySelector(sel);
const fmt = (n) => `R$ ${Number(n).toFixed(2)}`;
const getFinalPrice = (prod) => {
  const value = Number(prod?.precoFinal ?? prod?.precoAtual ?? 0);
  return Number.isFinite(value) ? value : 0;
};

function copyTextToClipboard(text) {
  if (!text) return Promise.resolve(false);
  if (navigator?.clipboard?.writeText) {
    return navigator.clipboard.writeText(text).then(
      () => true,
      () => false
    );
  }
  return new Promise((resolve) => {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      resolve(ok);
    } catch (err) {
      resolve(false);
    }
  });
}

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
  const barra = document.getElementById("filtroLinhaProdutos");
  const actions = document.getElementById("produtosActions");
  if (!barra) return;
  const container = barra.querySelector(".f-controls") || barra;
  let chip = container.querySelector(".chip-similares");
  let compareBtn = actions?.querySelector(".chip-compare-btn");
  const ativo = !!(filtrosAlvo.gtin || filtrosAlvo.simKey);

  if (!ativo){
    chip?.remove();
    compareBtn?.remove();
    actions?.classList.add("hidden");
    return;
  }

  if (!chip){
    chip = document.createElement("button");
    chip.type = "button";
    chip.className = "chip-similares flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-extrabold border border-amber-300 bg-amber-50 hover:bg-amber-100";
    chip.innerHTML = `<span class="chip-label">Selecionado: ${filtrosAlvo.rotulo||"Produto"} <em class="opacity-70">(similares)</em></span>
                      <span class="ml-1 inline-flex items-center justify-center w-5 h-5 rounded-full border border-amber-300 bg-white">&times;</span>`;
    chip.addEventListener("click", ()=>{
      filtrosAlvo.gtin = null; filtrosAlvo.simKey = null; filtrosAlvo.rotulo = null;
      aplicarFiltros(); // re-render com todos
    });
    container.appendChild(chip);
  } else {
    const lbl = chip.querySelector(".chip-label");
    if (lbl) lbl.innerHTML = `Selecionado: ${filtrosAlvo.rotulo||"Produto"} <em class="opacity-70">(similares)</em>`;
  }

  if (actions){
    actions.classList.remove("hidden");
  }

  if (actions && !compareBtn){
    compareBtn = document.createElement("button");
    compareBtn.type = "button";
    compareBtn.className = "chip-compare-btn cmp-modal-btn cmp-modal-btn--inline";
    compareBtn.textContent = "Comparar pre\u00E7os em outras lojas";
    compareBtn.addEventListener("click", ()=>{
      const { gtin, simKey } = window.filtrosAlvo;
      if (gtin){
        abrirComparadorPorGTIN(gtin);
        return;
      }
      if (simKey){
        const base = (window.produtos || []).find(p => String(p.simKey||"") === String(simKey));
        if (base) abrirComparador(base);
      }
    });
    actions.appendChild(compareBtn);
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

/* garante preço final e etiqueta de desconto calculada */
function autoFillDiscount(p){
  const precoFinal = getFinalPrice(p);
  p.precoFinal = precoFinal;
  p.precoAtual = precoFinal;

  const descontoTexto = p.descontoLabel || p.desconto || "";
  if (!descontoTexto && p.precoAntigo && p.precoAntigo > precoFinal){
    const pct = Math.round((1 - (precoFinal / p.precoAntigo))*100);
    p.desconto = `${pct}% OFF`;
    p.descontoLabel = p.desconto;
  } else {
    p.desconto = descontoTexto;
    p.descontoLabel = descontoTexto;
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
    const finalPrice = getFinalPrice(p);
    const prazoResumo = ""; // remove label para cards compactos

    const card = document.createElement("div");
    card.className = "relative banner-card card-compact rounded-lg flex-shrink-0 cursor-pointer hover:scale-[1.03] transition";
    card.dataset.tipo = p.tipo || "default";

    const imgWrap = buildImg(p.imagem, p.nome);
    card.appendChild(imgWrap);

    const seloWrap = document.createElement("div");
    seloWrap.className = "mt-1 card-selo";
    seloWrap.innerHTML = `<img src="${meta.logo}" class="card-logo" alt="${meta.nome}">`;
    card.appendChild(seloWrap);
    attachLogoFallback(seloWrap.querySelector("img"));

    card.insertAdjacentHTML("beforeend", `
      <div class="flex flex-col justify-between h-full w-full">
          <div class="mt-1">
            <h2 class="font-semibold text-center banner-title text-gray-800 leading-tight mb-1 line-clamp-2 min-h-[2.4em]">${p.nome}</h2>
            ${p.specsLabel ? `<p class="card-specs text-[10px] text-gray-500 text-center mb-1">${p.specsLabel}</p>` : ""}
          </div>

          <div class="text-center mt-auto">
            <p class="card-price font-black leading-none mb-2">${fmt(finalPrice)}</p>
          </div>
      </div>
    `);

    // clique no card abre o comparador entre lojas
    card.addEventListener("click", () => abrirComparador(p));
    faixa.appendChild(card);
  });
}

/* ===================== NORMALIZAÇÃO p/ COMPARAÇÃO ===================== */
function normalizeKey(obj){
  if (obj.sku) return `sku:${String(obj.sku).trim().toLowerCase()}`;
  if (obj.key) return `key:${String(obj.key).trim().toLowerCase()}`;

  let name = (obj.nome || "").toLowerCase();

  name = name.replace(/\([^)]*\)/g, " ");
  name = name.replace(/[-–—]/g, " ");
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
    const finalPrice = getFinalPrice(p);
    const prazoResumo = "";

    const card = document.createElement("div");
    card.className = "relative card-geral card-compact";

    // === atributos p/ highlight ===
    if (p.gtin)   card.setAttribute("data-gtin", String(p.gtin));
    if (!p.simKey) p.simKey = makeSimKey(p.nome||"");
    card.setAttribute("data-simkey", p.simKey);
    card.dataset.tipo = p.tipo || "default";

    const imgWrap = buildImg(p.imagem, p.nome);
    card.appendChild(imgWrap);

    const seloWrap = document.createElement("div");
    seloWrap.className = "card-selo mt-1";
    seloWrap.innerHTML = `<img src="${meta.logo}" class="card-logo" alt="${meta.nome}">`;
    card.appendChild(seloWrap);
    attachLogoFallback(seloWrap.querySelector("img"));

    card.insertAdjacentHTML("beforeend", `
      <div class="flex flex-col justify-between h-full w-full">
          <div class="mt-1">
            <h2 class="font-semibold text-center banner-title text-gray-800 leading-tight mb-1 line-clamp-2 min-h-[2.4em]">${p.nome}</h2>
            ${p.specsLabel ? `<p class="card-specs text-[10px] text-gray-500 text-center mb-1">${p.specsLabel}</p>` : ""}
          </div>

          <div class="text-center mt-auto">
            <p class="card-price font-black leading-none mb-2">${fmt(finalPrice)}</p>
          </div>
      </div>
    `);

    // clique no card abre o comparador entre lojas
    card.addEventListener("click", ()=> abrirComparador(p));

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

function renderModalSpecs(p){
  const wrap = el("#modalSpecs");
  if (!wrap) return;
  const specs = Array.isArray(p.specsList) ? p.specsList.slice(0,3) : [];
  if (!specs.length){
    wrap.classList.add("hidden");
    wrap.innerHTML = "";
    return;
  }
  wrap.classList.remove("hidden");
  wrap.innerHTML = specs.map(spec => `
    <span class="modal-spec-chip"><strong>${spec.label}:</strong> ${spec.value}</span>
  `).join("");
}

function renderModalFrete(p){
  const wrap = el("#modalFreteInfo");
  if (!wrap){
    return;
  }
  const meta = STORE_META[p.tipo] || {};
  const info = p.freteInfo || {};
  const summary = getShippingSummary(p, meta);
  const referencia = typeof info.valorReferencia === "number" ? fmt(info.valorReferencia) : "";
  const headline = summary || info.label || "";
  if (!headline){
    wrap.classList.add("hidden");
    wrap.innerHTML = "";
    return;
  }
  wrap.classList.remove("hidden");
  wrap.innerHTML = `
    <div class="frete-head">
      <span>Prazo estimado</span>
      <strong>${headline}</strong>
    </div>
    ${
      [info.observacao, referencia]
        .filter(Boolean)
        .map(text => `<p class="frete-obs">${text}</p>`).join("")
    }
  `;
}

function renderModalCoupon(p){
  const block = el("#modalCouponBlock");
  if (!block){
    return;
  }
  const codeEl = el("#modalCouponCode");
  const descEl = el("#modalCouponDesc");
  const copyBtn = el("#modalCouponCopy");
  const info = p.cupom;
  if (!info?.codigo){
    block.classList.add("hidden");
    if (codeEl) codeEl.textContent = "";
    if (descEl) descEl.textContent = "";
    if (copyBtn) copyBtn.onclick = null;
    return;
  }
  if (codeEl) codeEl.textContent = info.codigo;
  if (descEl) descEl.textContent = p.cupomDescricao || info.descricao || p.cupomValidade || "Copie e aplique no carrinho.";
  block.classList.remove("hidden");
  if (copyBtn){
    copyBtn.textContent = "Copiar";
    copyBtn.onclick = async () => {
      const ok = await copyTextToClipboard(info.codigo);
      if (ok){
        copyBtn.textContent = "Copiado!";
        setTimeout(()=> copyBtn.textContent = "Copiar", 1600);
      }
    };
  }
}

/* ===================== MODAL ===================== */
function showImagePreview(src, alt="Prévia do produto"){
  const overlay = el("#modalImagePreview");
  const img = el("#modalZoomImg");
  if (!overlay || !img) return;
  img.src = src || IMG_PLACEHOLDER;
  img.alt = alt || "Prévia do produto";
  overlay.classList.remove("hidden");
  overlay.classList.add("flex");
}

function hideImagePreview(){
  const overlay = el("#modalImagePreview");
  if (!overlay) return;
  overlay.classList.add("hidden");
  overlay.classList.remove("flex");
}

(function bindImagePreview(){
  const overlay = el("#modalImagePreview");
  if (!overlay) return;
  overlay.addEventListener("click", (evt)=>{
    if (evt.target === overlay) hideImagePreview();
  });
  const closeBtn = el("#modalZoomClose");
  if (closeBtn){
    closeBtn.addEventListener("click", hideImagePreview);
  }
  document.addEventListener("keydown", (evt)=>{
    if (evt.key === "Escape") hideImagePreview();
  });
})();

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
    modalImg.alt = p.nome || "Produto";
    modalImg.classList.add("modal-img-zoomable");
    modalImg.onclick = () => showImagePreview(p.imagem || IMG_PLACEHOLDER, p.nome);
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
    const maxDetails = window.innerWidth <= 640 ? 2 : 3;
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
  setMetaRow("modalCupomRow", "");

  renderModalSpecs(p);
  renderModalFrete(p);
  renderModalCoupon(p);

  let btnCmp = el("#btnModalComparar");
  if (!btnCmp){
    btnCmp = document.createElement("button");
    btnCmp.id = "btnModalComparar";
    btnCmp.type = "button";
    btnCmp.className = "cmp-modal-btn";
    btnCmp.textContent = "Comparar pre\u00E7os em outras lojas";
    const linkRef = el("#modalLink");
    if (linkRef) linkRef.insertAdjacentElement("afterend", btnCmp);
  } else {
    btnCmp.type = "button";
    btnCmp.classList.add("cmp-modal-btn");
    btnCmp.textContent = "Comparar pre\u00E7os em outras lojas";
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
    const precoFinal = getFinalPrice(p);
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
    if (preco === "0" && precoFinal > 50) return false;
    if (preco === "1" && (precoFinal < 50 || precoFinal > 150)) return false;
    if (preco === "2" && precoFinal < 150) return false;

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
  const lojasSlot = document.getElementById("filtroLojasTopo");
  const linhaSlot = document.getElementById("filtroLinhaProdutos");
  if (!lojasSlot || !linhaSlot) return;

  const origemHTML = Object.entries(STORE_META).map(([k,v])=>`
    <label data-src="${k}" class="ativo" aria-label="${v.nome}" title="${v.nome}">
      <input type="checkbox" class="origemCheck" value="${k}" checked />
      <img src="${v.logo}" alt="" class="filtro-logo" />
    </label>
  `).join("");

  lojasSlot.innerHTML = `
    <div id="filtroOrigem" class="w-full">
      ${origemHTML}
    </div>
  `;

  linhaSlot.innerHTML = `
    <div class="f-controls w-full flex flex-wrap items-center justify-end gap-2">
      <div class="search-wrap relative min-w-[240px] max-w-[680px] w-full">
        <svg class="icon absolute left-3 top-1/2 -translate-y-1/2" viewBox="0 0 24 24" width="18" height="18" fill="none">
          <path d="M21 21l-4.3-4.3M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" stroke="#6b7280" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <input id="buscaInput" type="text" placeholder="Buscar (ex: la\u00E7\u00E3o, cama, shampoo)..." class="w-full h-10 rounded-full border px-9 pr-9" />
        <button id="clearBusca" type="button"
                class="clear hidden absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full border grid place-items-center leading-none">&times;</button>
      </div>

      <select id="filtroPreco" class="select-pill px-3 py-1.5 rounded-full border h-10">
        <option value="">Pre\u00E7o</option>
        <option value="0">At\u00E9 R$ 50</option>
        <option value="1">R$ 50\u2013R$ 150</option>
        <option value="2">+ R$ 150</option>
      </select>

      <select id="filtroCategoria" class="px-3 py-1.5 rounded-full border min-w-[180px] md:min-w-[160px] sm:min-w-[140px] h-10 font-semibold">
        <option value="">Categoria</option>
        <option>Roupas</option><option>Acess\u00F3rios</option><option>Higiene</option><option>Camas</option><option>Ra\u00E7\u00F5es</option>
      </select>
    </div>
  `;

  const busca = linhaSlot.querySelector("#buscaInput");
  const clear = linhaSlot.querySelector("#clearBusca");
  const showClear = () => { if (clear) clear.classList.toggle("hidden", !busca.value); };

  ["input","change"].forEach(evt=>{
    if (busca) busca.addEventListener(evt, ()=>{ showClear(); aplicarFiltros(); });
  });
  if (clear) clear.addEventListener("click", ()=>{ busca.value = ""; showClear(); aplicarFiltros(); });

  ["filtroPreco","filtroCategoria"].forEach(id=>{
    const elx = linhaSlot.querySelector(`#${id}`);
    if (elx) elx.addEventListener("change", aplicarFiltros);
  });

  lojasSlot.querySelectorAll(".origemCheck").forEach(chk=>{
    const label = chk.closest("label");
    chk.addEventListener("change", ()=>{
      label.classList.toggle("ativo", chk.checked);
      aplicarFiltros();
    });
  });

  lojasSlot.querySelectorAll("#filtroOrigem img").forEach(attachLogoFallback);
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

  function renderSuggestions(txt, allowDefault=false){
    const val=txt.toLowerCase().trim();
    const matches = val
      ? produtos.filter(p=>p.nome.toLowerCase().includes(val)).slice(0,8)
      : (allowDefault ? produtos.slice(0,8) : []);
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
  input.addEventListener("input",()=>renderSuggestions(input.value,true));
  input.addEventListener("focus",()=>renderSuggestions(input.value,true));
  document.addEventListener("click",e=>{
    if(!box.contains(e.target)&&e.target!==input) box.style.display="none";
  });
}

/* mostra/oculta modo filtro e restaura listas */
function ativarFiltro(ativo){
  const body = document.body;
  const btn = document.getElementById("btnBuscaFlutuante");
  const header = document.querySelector("header.sticky");
  const selo = document.querySelector(".ml-selo");

  if (ativo){
    body.classList.add("modo-filtro");
    if (btn){
      btn.classList.add("ativo");
      btn.innerHTML = '<span class="ico" aria-hidden="true">&times;</span><span class="lbl lbl-sm">Fechar</span><span class="lbl lbl-lg">Fechar filtros</span>';
    }
    if (header) header.classList.add("hidden");
    if (selo) selo.classList.add("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    body.classList.remove("modo-filtro");
    document.body.classList.remove("catalogo-focus");
    window.filtrosAlvo.gtin = null;
    window.filtrosAlvo.simKey = null;
    window.filtrosAlvo.rotulo = null;
    ensureChipSelecionado();
    destacarSelecao();
    if (btn){
      btn.classList.remove("ativo");
      btn.innerHTML = '<span class="ico" aria-hidden="true">&#128269;</span><span class="lbl lbl-sm">Compare</span><span class="lbl lbl-lg">Comparar Pre\u00E7os</span>';
    }
    if (header) header.classList.remove("hidden");
    if (selo) selo.classList.remove("hidden");
    renderBanner("bannerA", ["shopee","amazon","magalu","americanas","aliexpress","petlove","mercadolivre","petz","cobasi","carrefour","casasbahia","ponto"]);
    toggleComparador(false);
    listaAtual = produtos.slice();
    window.listaAtual = listaAtual;
    renderLista(produtos);
  }
}

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
  if (window.innerWidth < 768) return; // evita auto-scroll no mobile
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

function getShippingSummary(prod, meta){
  const options = resolveShippingOptions(prod, meta);
  if (options.length){
    const prefer = options.find(opt => opt.tipo === "express") || options[0];
    if (prefer){
      if (prefer.nome){
        return `${prefer.nome}: ${prefer.prazo}`;
      }
      return prefer.prazo;
    }
  }
  if (prod?.freteInfo?.label){
    return prod.freteInfo.label;
  }
  return "";
}

function buildShippingSummaryHtml(prod, meta){
  const summary = getShippingSummary(prod, meta);
  if (!summary) return "";
  return `<div class="cmp-ship-summary">Prazo estimado: ${summary}</div>`;
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

  const ordenados = [...grupo].sort((a,b)=> getFinalPrice(a) - getFinalPrice(b));
  const menor = ordenados[0];
  const maior = ordenados[ordenados.length-1];
  const menorValor = getFinalPrice(menor);
  const media = ordenados.reduce((acc,p)=>acc+getFinalPrice(p),0)/ordenados.length;
  const metaMenor = STORE_META[menor.tipo] || {};
  const metaMaior = STORE_META[maior.tipo] || {};
  const logoMenor = metaMenor.logo ? `<img src="${metaMenor.logo}" alt="${metaMenor.nome || menor.tipo}" class="h-5 w-auto" />` : "";
  const logoMaior = metaMaior.logo ? `<img src="${metaMaior.logo}" alt="${metaMaior.nome || maior.tipo}" class="h-5 w-auto" />` : "";

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
          <div class="text-green-800 flex items-center gap-2">${logoMenor}<span><b>${fmt(menorValor)}</b></span></div>
        </div>
        <div class="bg-amber-50 border border-amber-200 rounded-md p-2">
          <div class="font-bold text-amber-700">Preço médio</div>
          <div class="text-amber-800"><b>${fmt(media)}</b> (entre ${grupo.length} lojas)</div>
        </div>
        <div class="bg-red-50 border border-red-200 rounded-md p-2">
          <div class="font-bold text-red-700">Maior preço</div>
          <div class="text-red-800 flex items-center gap-2">${logoMaior}<span><b>${fmt(getFinalPrice(maior))}</b></span></div>
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
    const finalPrice = getFinalPrice(p);
    const diffValue = finalPrice - menorValor;
    const diffChip = !isBest ? `<span class="cmp-chip cmp-chip--neutral">+ ${fmt(diffValue)} vs melhor</span>` : "";
    const parcelasInfo = p.parcelas ? `<span class="cmp-price-note">${p.parcelas}</span>` : "";
    const tagChips = [
      p.precoAntigo ? `<span class="cmp-chip cmp-chip--old">${fmt(p.precoAntigo)}</span>` : "",
      p.desconto ? `<span class="cmp-chip cmp-chip--discount">${p.desconto}</span>` : ""
    ].filter(Boolean).join("");
    const tagsBlock = tagChips ? `<div class="cmp-card-tags">${tagChips}</div>` : "";
    const shippingHtml = buildShippingSummaryHtml(p, meta);
    const cupomHtml = p.cupom?.codigo ? `
      <div class="cmp-coupon">
        <div class="cmp-coupon-row">
          <span class="cmp-coupon-code">${p.cupom.codigo}</span>
          <button type="button" class="cmp-copy-btn" data-code="${p.cupom.codigo}">Copiar</button>
        </div>
        ${p.cupomDescricao || p.cupom?.descricao || p.cupomValidade ? `<small>${p.cupomDescricao || p.cupom?.descricao || p.cupomValidade}</small>` : ""}
      </div>
    ` : "";
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
        <div class="cmp-price" style="color:${priceColor}">${fmt(finalPrice)}</div>
        <div class="cmp-price-meta">
          ${parcelasInfo}
          ${diffChip}
        </div>
      </div>

      ${tagsBlock}
      ${cupomHtml}
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
    const copyBtn = card.querySelector(".cmp-copy-btn");
    if (copyBtn){
      copyBtn.addEventListener("click", async ()=> {
        const code = copyBtn.getAttribute("data-code") || "";
        const ok = await copyTextToClipboard(code);
        if (ok){
          copyBtn.textContent = "Copiado!";
          setTimeout(()=> copyBtn.textContent = "Copiar", 1600);
        }
      });
    }

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
    if (window.innerWidth <= 640) return;
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
