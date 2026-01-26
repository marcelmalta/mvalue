/* =========================================================
   ShihTzuShop — Cards + Modal + Comparador Multilojas
   (Atual) — mantém todas as suas funções + botão flutuante
             de “Fechar filtros”, carrossel compacto e tooltips
   ========================================================= */

/* ========= CSS: BOTÕES/LOGOS dos filtros (compactos) ========= */
(function injectFiltroCSS() {
  const id = 'filtros-logo-only';
  document.querySelector(`style[data-${id}]`)?.remove();

  const css = `
    /* Container */
    #filtroOrigem{
      display:flex; flex-wrap:wrap; gap:8px; width:100%; align-items:center;
    }

    /* Cápsula responsiva (compacta) - Vibrant Pill */
    #filtroOrigem label{
      display:inline-flex; align-items:center; justify-content:center;
      padding:6px 14px;
      border-radius: 999px; /* Pill shape total */
      border: 1px solid #e2e8f0;
      background: #ffffff;
      cursor:pointer; user-select:none; overflow:hidden;
      min-width:70px;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 1px 2px rgba(0,0,0,0.04);
    }
    
    #filtroOrigem label:hover{
      border-color: #cbd5e1;
      transform: translateY(-2px);
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.06);
    }

    /* Logo (compacto) */
    #filtroOrigem label img.filtro-logo{
      display:block; object-fit:contain; pointer-events:none;
      max-width:100%; height:auto; max-height:28px; /* logos menores p/ caber na pill */
      filter: grayscale(100%) opacity(0.7);
      transition: filter 0.2s;
    }
    
    #filtroOrigem label:hover img.filtro-logo,
    #filtroOrigem label.ativo img.filtro-logo {
      filter: none; opacity: 1;
    }

    @media (max-width:1024px){
      #filtroOrigem label{ padding:6px 10px; }
      #filtroOrigem label img.filtro-logo{ max-height:24px; }
    }

    /* Esconde texto nos botões (só logo) */
    #filtroOrigem label .texto{ display:none !important; }

    /* Realce comum quando ATIVO */
    #filtroOrigem label.ativo{
      border-width: 2px;
      background: #fff;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    }

    /* ===== Ativos por marca (Mantendo Identidade mas Flat) ===== */
    #filtroOrigem label.ativo[data-src="shopee"]{ border-color:#EE4D2D; background:#FFF5F2; }
    #filtroOrigem label.ativo[data-src="petlove"]{ border-color:#00AEEF; background:#F0FAFF; }
    #filtroOrigem label.ativo[data-src="amazon"]{ border-color:#232F3E; background:#F2F4F8; }
    #filtroOrigem label.ativo[data-src="mercadolivre"]{ border-color:#FFE600; background:#FFFEEC; }
    #filtroOrigem label.ativo[data-src="magalu"]{ border-color:#1976D2; background:#F0F7FF; }
    #filtroOrigem label.ativo[data-src="petz"]{ border-color:#00B2FF; background:#F0FAFF; }
    #filtroOrigem label.ativo[data-src="cobasi"]{ border-color:#0077BE; background:#F0F8FF; }
    #filtroOrigem label.ativo[data-src="aliexpress"]{ border-color:#FF5A00; background:#FFF4EB; }
    #filtroOrigem label.ativo[data-src="casasbahia"]{ border-color:#0033A0; background:#EBEEFF; }
    #filtroOrigem label.ativo[data-src="ponto"]{ border-color:#FF5500; background:#FFF2EB; }
  `;
  const style = document.createElement('style');
  style.setAttribute(`data-${id}`, 'true');
  style.textContent = css;
  document.head.appendChild(style);
})();

/* === CSS para carrossel compacto (mais cards por tela) === */
(function injectCarouselTightCSS() {
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
    nome: "Shopee",
    corBorda: "#EE4D2D",
    corTexto: "#8B1F0D",
    bgCard: "linear-gradient(to bottom,#FF8A70,#FFD3C9)",
    logo: `${LOGO_BASE_URL}shopee.svg`,
    btn: ["#EE4D2D", "#FF7B5F"],
    off: "#7A1A0F",
    shipping: [
      { nome: "Shopee Xpress", prazo: "2-4 dias úteis", detalhe: "capitais com estoque nacional", tipo: "regular", freteGratis: true },
      { nome: "Entrega econômica", prazo: "5-12 dias úteis", detalhe: "parceiros e interior", tipo: "economy" }
    ]
  },
  petlove: {
    nome: "Petlove",
    corBorda: "#00AEEF",
    corTexto: "#0070A8",
    bgCard: "linear-gradient(to bottom,#00AEEF,#B3ECFF)",
    logo: `${LOGO_BASE_URL}petlove.svg`,
    btn: ["#00AEEF", "#4FC3F7"],
    off: "#0070A8",
    shipping: [
      { nome: "Expressa Petlove", prazo: "1-2 dias úteis", detalhe: "capitais e regiões metropolitanas", tipo: "express", freteGratis: true },
      { nome: "Entrega programada", prazo: "3-5 dias úteis", detalhe: "todo Brasil com agendamento", tipo: "regular" }
    ]
  },
  amazon: {
    nome: "Amazon",
    corBorda: "#232F3E",
    corTexto: "#FF9900",
    bgCard: "linear-gradient(to bottom,#232F3E,#3A4553)",
    logo: `${LOGO_BASE_URL}amazon.svg`,
    btn: ["#232F3E", "#3A4553"],
    off: "#FF9900",
    shipping: [
      { nome: "Prime 1 dia", prazo: "até 24h", detalhe: "capitais com estoque Prime", tipo: "express", freteGratis: true },
      { nome: "Prime padrão", prazo: "2-3 dias úteis", detalhe: "demais regiões", tipo: "regular", freteGratis: true }
    ]
  },
  mercadolivre: {
    nome: "Mercado Livre",
    corBorda: "#FFE600",
    corTexto: "#0B4EA2",
    bgCard: "linear-gradient(to bottom,#FFF6A6,#FFE600)",
    logo: `${LOGO_BASE_URL}mercadolivre.svg`,
    btn: ["#FFE600", "#FFE24A"],
    off: "#0B4EA2",
    shipping: [
      { nome: "Full 24h", prazo: "até 24h", detalhe: "estoque na sua cidade", tipo: "express", freteGratis: true },
      { nome: "Envio Full", prazo: "1-2 dias úteis", detalhe: "Brasil via hubs Full", tipo: "regular", freteGratis: true }
    ]
  },
  magalu: {
    nome: "Magalu",
    corBorda: "#1976D2",
    corTexto: "#0D47A1",
    bgCard: "linear-gradient(to bottom,#2196F3,#6EC6FF)",
    logo: `${LOGO_BASE_URL}magalu.svg`,
    btn: ["#1976D2", "#64B5F6"],
    off: "#0D47A1",
    shipping: [
      { nome: "Chegou Hoje", prazo: "até 24h", detalhe: "quando há estoque local", tipo: "express" },
      { nome: "Magalu Entregas", prazo: "2-4 dias úteis", detalhe: "transportadora própria", tipo: "regular" }
    ]
  },
  petz: {
    nome: "Petz",
    corBorda: "#00B2FF",
    corTexto: "#004E92",
    bgCard: "linear-gradient(to bottom,#B3E5FF,#E6F5FF)",
    logo: `${LOGO_BASE_URL}petz.svg`,
    btn: ["#00B2FF", "#66CCFF"],
    off: "#004E92",
    shipping: [
      { nome: "Petz Delivery", prazo: "até 2h", detalhe: "lojas com estoque", tipo: "express" },
      { nome: "Entrega padrão", prazo: "2-5 dias úteis", detalhe: "Correios/transportadora", tipo: "regular" }
    ]
  },
  cobasi: {
    nome: "Cobasi",
    corBorda: "#0077BE",
    corTexto: "#005A8C",
    bgCard: "linear-gradient(to bottom,#B3DBFF,#E8F3FF)",
    logo: `${LOGO_BASE_URL}cobasi.svg`,
    btn: ["#0077BE", "#66AEE6"],
    off: "#005A8C",
    shipping: [
      { nome: "Cobasi Já", prazo: "1-3h", detalhe: "retirada e parceiros delivery", tipo: "express" },
      { nome: "Entrega econômica", prazo: "1-3 dias úteis", detalhe: "sudeste/sul", tipo: "regular" }
    ]
  },

  aliexpress: {
    nome: "AliExpress",
    corBorda: "#FF5A00",
    corTexto: "#D84315",
    bgCard: "linear-gradient(to bottom,#FFD5BF,#FFF0E6)",
    logo: `${LOGO_BASE_URL}aliexpress.svg`,
    btn: ["#FF5A00", "#FF8A50"],
    off: "#D84315",
    shipping: [
      { nome: "Entrega Brasil", prazo: "7-12 dias úteis", detalhe: "depósitos nacionais", tipo: "regular" },
      { nome: "Envio internacional", prazo: "12-20 dias úteis", detalhe: "frete combinado", tipo: "economy" }
    ]
  },

  casasbahia: {
    nome: "Casas Bahia",
    corBorda: "#0033A0",
    corTexto: "#001A66",
    bgCard: "linear-gradient(to bottom,#D0DBFF,#EEF3FF)",
    logo: `${LOGO_BASE_URL}casasbahia.svg`,
    btn: ["#0033A0", "#4D6DFF"],
    off: "#001A66",
    shipping: [
      { nome: "Retira rápido", prazo: "2-4h", detalhe: "retirada em loja", tipo: "express" },
      { nome: "Entrega Casas Bahia", prazo: "2-5 dias úteis", detalhe: "transportadora própria", tipo: "regular" }
    ]
  },
  ponto: {
    nome: "Ponto",
    corBorda: "#111111",
    corTexto: "#FF5500",
    bgCard: "linear-gradient(to bottom,#F0F0F0,#FFFFFF)",
    logo: `${LOGO_BASE_URL}ponto.svg`,
    btn: ["#111111", "#444444"],
    off: "#FF5500",
    shipping: [
      { nome: "Retira Ponto", prazo: "até 2h", detalhe: "lojas e lockers", tipo: "express" },
      { nome: "Entrega padrão", prazo: "2-5 dias úteis", detalhe: "transportadora parceira", tipo: "regular" }
    ]
  },
};

/* ===================== PRODUTOS (catálogo com GTIN padronizado) ===================== */
// Dados movidos para products.json

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

let produtos = [];
window.produtos = [];

async function loadProducts() {
  try {
    const res = await fetch("products.json");
    if (!res.ok) throw new Error("Erro ao carregar dados: " + res.status);
    const data = await res.json();

    // Processa dados brutos para formato da aplicação
    produtos = data.flatMap(base =>
      (base.ofertas || []).map(oferta => montarProduto(base, oferta))
    );
    window.produtos = produtos;

    // Inicializa interface
    indexarPorGTIN(produtos);
    renderLista(produtos);

    // Renderiza banners iniciais
    const lojasBanner = ["shopee", "amazon", "magalu", "aliexpress", "petlove", "mercadolivre", "petz", "cobasi", "casasbahia", "ponto"];
    if (typeof renderBanner === 'function') renderBanner("bannerA", lojasBanner);

  } catch (err) {
    console.error(err);
    const lista = document.getElementById("listaProdutos");
    if (lista) {
      lista.innerHTML = `
        <div class="col-span-full p-6 text-center bg-red-50 border border-red-200 rounded-lg">
          <h3 class="text-lg font-bold text-red-700">Erro ao carregar produtos</h3>
          <p class="text-red-600 mb-2">Não foi possível acessar <code>products.json</code>.</p>
          <p class="text-sm text-gray-600">Se você está rodando localmente, certifique-se de usar um <strong>servidor local</strong> (como Live Server) devido a restrições de segurança do navegador (CORS).</p>
        </div>
      `;
    }
  }
}

/* ===================== UTILS ===================== */
const el = (sel, root = document) => root.querySelector(sel);
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
function makeSimKey(nome = "") {
  const base = (nome || "")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  const stop = /\b(para|pra|de|do|da|dos|das|com|e|ou|o|a|os|as|kit|combo|original|novo|nova|pro|plus|max|premium|mega|ultra|pet|cao|cão|gato|cachorro|filhote|adulto|racoes?|ração|raças?|pequenas?|medias?|médias?|grandes?)\b/g;
  let s = base.replace(stop, " ");

  s = s
    .replace(/\b(\d+(\.\d+)?)(ml|l|g|kg|un|cm|mm)\b/g, " ")
    .replace(/\b(\d+)(gb|tb)\b/g, " ")
    .replace(/\b(\d+)\s?(x|un|pcs?)\b/g, " ")
    .replace(/\b(preto|branco|azul|rosa|vermelho|verde|amarelo|roxo|marrom|bege|cinza|grafite|dourado|prata)\b/g, " ");

  s = s.replace(/[^\w\s]/g, " ").replace(/\s{2,}/g, " ").trim();

  const tokens = s.split(" ").filter(Boolean).slice(0, 7);
  return tokens.join("-").replace(/-{2,}/g, "-").slice(0, 40);
}

/* anota simKey/gtin nos produtos (uma vez) */
function indexarSimilares(lista) {
  (lista || []).forEach(p => {
    if (!p.simKey) p.simKey = makeSimKey(p.nome || "");
    if (p.gtin != null) p.gtin = String(p.gtin).trim();
  });
}

/* aplica destaque visual nos cards do alvo selecionado */
function destacarSelecao() {
  const { gtin, simKey } = window.filtrosAlvo;
  const on = !!(gtin || simKey);
  document.querySelectorAll(".card-geral").forEach(card => {
    card.classList.remove("ring-2", "ring-amber-400", "shadow-amber-200", "shadow-lg");
    if (!on) return;
    const cGTIN = card.getAttribute("data-gtin");
    const cSIMK = card.getAttribute("data-simkey");
    const hit = (gtin && cGTIN && String(cGTIN) === String(gtin)) ||
      (simKey && cSIMK && String(cSIMK) === String(simKey));
    if (hit) card.classList.add("ring-2", "ring-amber-400", "shadow-amber-200", "shadow-lg");
  });
}

/* chip de estado dentro da barra de filtros */
function ensureChipSelecionado() {
  const barra = document.getElementById("filtroLinhaProdutos");
  const actions = document.getElementById("produtosActions");
  if (!barra) return;
  const container = barra.querySelector(".f-controls") || barra;
  let chip = container.querySelector(".chip-similares");
  let compareBtn = actions?.querySelector(".chip-compare-btn");
  const ativo = !!(filtrosAlvo.gtin || filtrosAlvo.simKey);

  if (!ativo) {
    chip?.remove();
    compareBtn?.remove();
    actions?.classList.add("hidden");
    return;
  }

  if (!chip) {
    chip = document.createElement("button");
    chip.type = "button";
    chip.className = "chip-similares flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-extrabold border border-amber-300 bg-amber-50 hover:bg-amber-100";
    chip.innerHTML = `<span class="chip-label">Selecionado: ${filtrosAlvo.rotulo || "Produto"} <em class="opacity-70">(similares)</em></span>
                      <span class="ml-1 inline-flex items-center justify-center w-5 h-5 rounded-full border border-amber-300 bg-white">&times;</span>`;
    chip.addEventListener("click", () => {
      filtrosAlvo.gtin = null; filtrosAlvo.simKey = null; filtrosAlvo.rotulo = null;
      aplicarFiltros(); // re-render com todos
    });
    container.appendChild(chip);
  } else {
    const lbl = chip.querySelector(".chip-label");
    if (lbl) lbl.innerHTML = `Selecionado: ${filtrosAlvo.rotulo || "Produto"} <em class="opacity-70">(similares)</em>`;
  }

  if (actions) {
    actions.classList.remove("hidden");
  }

  if (actions && !compareBtn) {
    compareBtn = document.createElement("button");
    compareBtn.type = "button";
    compareBtn.className = "chip-compare-btn cmp-modal-btn cmp-modal-btn--inline";
    compareBtn.textContent = "Comparar pre\u00E7os em outras lojas";
    compareBtn.addEventListener("click", () => {
      const { gtin, simKey } = window.filtrosAlvo;
      if (gtin) {
        abrirComparadorPorGTIN(gtin);
        return;
      }
      if (simKey) {
        const base = (window.produtos || []).find(p => String(p.simKey || "") === String(simKey));
        if (base) abrirComparador(base);
      }
    });
    actions.appendChild(compareBtn);
  }
}

/* ativa o filtro para um produto e força a lista exibir seus similares */
function selecionarProdutoNosFiltros(produto) {
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
  const heights =
    variant === "card"
      ? { desktop: 88, tablet: 82, mobile: 74 }
      : variant === "banner"
        ? { desktop: 88, tablet: 82, mobile: 74 }
        : variant === "compact"
          ? { desktop: 44, tablet: 38, mobile: 30 }
          : { desktop: 56, tablet: 48, mobile: 40 };
  // Alturas responsivas de acordo com o contexto
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
function autoFillDiscount(p) {
  const precoFinal = getFinalPrice(p);
  p.precoFinal = precoFinal;
  p.precoAtual = precoFinal;

  const descontoTexto = p.descontoLabel || p.desconto || "";
  if (!descontoTexto && p.precoAntigo && p.precoAntigo > precoFinal) {
    const pct = Math.round((1 - (precoFinal / p.precoAntigo)) * 100);
    p.desconto = `${pct}% OFF`;
    p.descontoLabel = p.desconto;
  } else {
    p.desconto = descontoTexto;
    p.descontoLabel = descontoTexto;
  }
  return p;
}

function attachLogoFallback(imgEl) {
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
const onlyDigits = (s = "") => (s || "").replace(/\D+/g, "");

function gtin14CheckDigit(body13) {
  let sum = 0;
  for (let i = 0; i < body13.length; i++) {
    const n = body13.charCodeAt(i) - 48;
    sum += (i % 2 === 0 ? 3 : 1) * n;
  }
  const mod = sum % 10; return mod === 0 ? 0 : 10 - mod;
}

/* Normaliza EAN/UPC para GTIN-14 válido (ou "" se inválido) */
function normalizeGTIN(raw) {
  let d = onlyDigits(raw);
  if (!d) return "";
  if (d.length === 12) d = "00" + d;       // UPC-A -> GTIN-14
  else if (d.length === 13) d = "0" + d;   // EAN-13 -> GTIN-14
  else if (![14, 8].includes(d.length)) return "";
  if (d.length === 8) d = d.padStart(14, "0"); // EAN-8 -> GTIN-14 (padding)
  const body = d.slice(0, 13), dv = +d.slice(13);
  const calc = gtin14CheckDigit(body);
  return (dv === calc) ? d : (body + String(calc));
}

/* Índice { GTIN-14: { loja: produto } } para lookup rápido */
const indexByGTIN = new Map();
function indexarPorGTIN(arr) {
  indexByGTIN.clear();
  for (const p of arr) {
    const g = normalizeGTIN(p.gtin);
    if (!g) continue;
    if (!indexByGTIN.has(g)) indexByGTIN.set(g, {});
    indexByGTIN.get(g)[p.tipo] = p;
  }
}

/* ===================== BANNERS (compactos) ===================== */
function renderBanner(containerId, tipos) {
  const faixa = el(`#${containerId}`); if (!faixa) return;
  faixa.innerHTML = "";

  produtos.filter(p => tipos.includes(p.tipo)).forEach(obj => {
    const p = autoFillDiscount({ ...obj });
    const meta = STORE_META[p.tipo];
    const finalPrice = getFinalPrice(p);
    const prazoResumo = ""; // remove label para cards compactos
    const detalhes = Array.isArray(p.detalhes) ? p.detalhes.slice(0, 2) : [];
    const detalhesHtml = detalhes.length
      ? `<p class="card-desc">&bull; ${detalhes.join("  &bull; ")}</p>`
      : "";
    const priceLine = `
      <div class="card-price-row">
        ${p.precoAntigo ? `<span class="card-old">${fmt(p.precoAntigo)}</span>` : ""}
        ${p.desconto ? `<span class="card-off">${p.desconto}</span>` : ""}
      </div>
      <p class="card-price font-black leading-none">${fmt(finalPrice)}</p>
    `;

    const card = document.createElement("div");
    card.className = "relative banner-card card-compact rounded-lg flex-shrink-0 cursor-pointer hover:scale-[1.03] transition";
    card.dataset.tipo = p.tipo || "default";

    const media = document.createElement("div");
    media.className = "card-media";
    const imgWrap = buildImg(p.imagem, p.nome, { variant: "card" });
    media.appendChild(imgWrap);

    const body = document.createElement("div");
    body.className = "card-body";

    const text = document.createElement("div");
    text.className = "card-text";
    text.insertAdjacentHTML("beforeend", `
        <div class="card-logo-row">
          <img src="${meta.logo}" class="card-logo" alt="${meta.nome}">
        </div>
        <h2 class="font-semibold banner-title text-gray-800 leading-tight mb-1 line-clamp-2 text-left">${p.nome}</h2>
        ${p.specsLabel ? `<p class="card-specs text-[10px] text-gray-500 mb-1">${p.specsLabel}</p>` : ""}
        ${detalhesHtml}
        ${priceLine}
    `);

    body.appendChild(text);
    card.appendChild(media);
    card.appendChild(body);

    // clique no card abre o comparador entre lojas
    card.addEventListener("click", () => abrirComparador(p));
    faixa.appendChild(card);
  });
}

/* ===================== NORMALIZAÇÃO p/ COMPARAÇÃO ===================== */
function normalizeKey(obj) {
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

function groupByKey(list) {
  const map = new Map();
  list.forEach(p => {
    const k = normalizeKey(p);
    if (!map.has(k)) map.set(k, []);
    map.get(k).push(p);
  });
  return map;
}

function comparablesFor(product, list = produtos) {
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
    const p = autoFillDiscount({ ...obj });
    const meta = STORE_META[p.tipo];
    const finalPrice = getFinalPrice(p);
    const prazoResumo = "";
    const detalhes = Array.isArray(p.detalhes) ? p.detalhes.slice(0, 2) : [];
    const detalhesHtml = detalhes.length
      ? `<p class="card-desc">&bull; ${detalhes.join("  &bull; ")}</p>`
      : "";
    const priceLine = `
      <div class="card-price-row">
        ${p.precoAntigo ? `<span class="card-old">${fmt(p.precoAntigo)}</span>` : ""}
        ${p.desconto ? `<span class="card-off">${p.desconto}</span>` : ""}
      </div>
      <p class="card-price font-black leading-none">${fmt(finalPrice)}</p>
    `;

    const card = document.createElement("div");
    card.className = "relative card-geral card-compact";

    // === atributos p/ highlight ===
    if (p.gtin) card.setAttribute("data-gtin", String(p.gtin));
    if (!p.simKey) p.simKey = makeSimKey(p.nome || "");
    card.setAttribute("data-simkey", p.simKey);
    card.dataset.tipo = p.tipo || "default";

    const media = document.createElement("div");
    media.className = "card-media";
    const imgWrap = buildImg(p.imagem, p.nome, { variant: "card" });
    media.appendChild(imgWrap);

    const body = document.createElement("div");
    body.className = "card-body";

    const text = document.createElement("div");
    text.className = "card-text";
    text.insertAdjacentHTML("beforeend", `
        <div class="card-logo-row">
          <img src="${meta.logo}" class="card-logo" alt="${meta.nome}">
        </div>
        <h2 class="font-semibold banner-title text-gray-800 leading-tight mb-1 line-clamp-2 text-left">${p.nome}</h2>
        ${p.specsLabel ? `<p class="card-specs text-[10px] text-gray-500 mb-1">${p.specsLabel}</p>` : ""}
        ${detalhesHtml}
        ${priceLine}
    `);

    body.appendChild(text);
    card.appendChild(media);
    card.appendChild(body);

    // clique no card abre o comparador entre lojas
    card.addEventListener("click", () => abrirComparador(p));

    wrap.appendChild(card);
  });

  // aplica destaque se houver seleção
  destacarSelecao();
}

const renderStarsCompact = (rating = 0) => {
  const full = Math.floor(rating);
  const half = rating - full >= 0.25 && rating - full < 0.75 ? 1 : 0;
  const empty = 5 - full - half;
  return "★".repeat(full) + (half ? "☆" : "") + "·".repeat(Math.max(empty, 0));
};
const setMetaRow = (id, html) => {
  const target = el(`#${id}`);
  if (!target) return;
  if (!html) {
    target.classList.add("hidden");
    target.innerHTML = "";
  } else {
    target.classList.remove("hidden");
    target.innerHTML = html;
  }
};

function renderModalSpecs(p) {
  const wrap = el("#modalSpecs");
  if (!wrap) return;
  const specs = Array.isArray(p.specsList) ? p.specsList.slice(0, 3) : [];
  if (!specs.length) {
    wrap.classList.add("hidden");
    wrap.innerHTML = "";
    return;
  }
  wrap.classList.remove("hidden");
  wrap.innerHTML = specs.map(spec => `
    <span class="modal-spec-chip"><strong>${spec.label}:</strong> ${spec.value}</span>
  `).join("");
}

function renderModalFrete(p) {
  const wrap = el("#modalFreteInfo");
  if (!wrap) {
    return;
  }
  const meta = STORE_META[p.tipo] || {};
  const info = p.freteInfo || {};
  const summary = getShippingSummary(p, meta);
  const referencia = typeof info.valorReferencia === "number" ? fmt(info.valorReferencia) : "";
  const headline = summary || info.label || "";
  if (!headline) {
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
    ${[info.observacao, referencia]
      .filter(Boolean)
      .map(text => `<p class="frete-obs">${text}</p>`).join("")
    }
  `;
}

function renderModalCoupon(p) {
  const block = el("#modalCouponBlock");
  if (!block) {
    return;
  }
  const codeEl = el("#modalCouponCode");
  const descEl = el("#modalCouponDesc");
  const copyBtn = el("#modalCouponCopy");
  const info = p.cupom;
  if (!info?.codigo) {
    block.classList.add("hidden");
    if (codeEl) codeEl.textContent = "";
    if (descEl) descEl.textContent = "";
    if (copyBtn) copyBtn.onclick = null;
    return;
  }
  if (codeEl) codeEl.textContent = info.codigo;
  if (descEl) descEl.textContent = p.cupomDescricao || info.descricao || p.cupomValidade || "Copie e aplique no carrinho.";
  block.classList.remove("hidden");
  if (copyBtn) {
    copyBtn.textContent = "Copiar";
    copyBtn.onclick = async () => {
      const ok = await copyTextToClipboard(info.codigo);
      if (ok) {
        copyBtn.textContent = "Copiado!";
        setTimeout(() => copyBtn.textContent = "Copiar", 1600);
      }
    };
  }
}

/* ===================== MODAL ===================== */
function showImagePreview(src, alt = "Prévia do produto") {
  const overlay = el("#modalImagePreview");
  const img = el("#modalZoomImg");
  if (!overlay || !img) return;
  img.src = src || IMG_PLACEHOLDER;
  img.alt = alt || "Prévia do produto";
  overlay.classList.remove("hidden");
  overlay.classList.add("flex");
}

function hideImagePreview() {
  const overlay = el("#modalImagePreview");
  if (!overlay) return;
  overlay.classList.add("hidden");
  overlay.classList.remove("flex");
}

(function bindImagePreview() {
  const overlay = el("#modalImagePreview");
  if (!overlay) return;
  overlay.addEventListener("click", (evt) => {
    if (evt.target === overlay) hideImagePreview();
  });
  const closeBtn = el("#modalZoomClose");
  if (closeBtn) {
    closeBtn.addEventListener("click", hideImagePreview);
  }
  document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") hideImagePreview();
  });
})();

function openModal(obj) {
  const p = autoFillDiscount({ ...obj });
  const meta = STORE_META[p.tipo];
  const modal = el("#productModal");
  const box = el("#modalBox");
  if (!modal || !box) return;

  const modalImg = el("#modalImage");
  if (modalImg) {
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
  if (price) {
    price.textContent = fmt(p.precoAtual);
    price.style.color = meta.corTexto;
  }

  const disc = el("#modalDiscount");
  if (disc) {
    disc.textContent = p.desconto || "";
    disc.style.color = meta.off;
  }

  const parc = el("#modalParcelas");
  if (parc) parc.textContent = p.parcelas || "";

  const link = el("#modalLink");
  if (link) {
    link.href = p.link || "#";
    link.style.background = `linear-gradient(90deg, ${meta.btn[0]}, ${meta.btn[1]})`;
    link.style.color = (p.tipo === "petlove" || p.tipo === "mercadolivre") ? "#0b1322" : "#fff";
    link.style.border = `1px solid ${meta.corBorda}88`;
    const lojaLabel = (meta && meta.nome) ? meta.nome : "loja";
    link.textContent = `Comprar na ${lojaLabel}`;
    link.setAttribute("aria-label", `Ir para ${lojaLabel} e finalizar a compra`);
  }

  const logo = el("#modalStoreLogo");
  if (logo) {
    logo.src = meta.logo;
    attachLogoFallback(logo);
  }

  const sr = el("#modalStoreName");
  if (sr) sr.textContent = meta.nome;

  const ul = el("#modalDetails");
  if (ul) {
    ul.innerHTML = "";
    const maxDetails = window.innerWidth <= 640 ? 2 : 3;
    const detalhes = (p.detalhes || []).slice(0, maxDetails);
    if (detalhes.length) {
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
  if (!btnCmp) {
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
  btnCmp.onclick = (evt) => {
    evt?.preventDefault?.();
    const g = normalizeGTIN(p.gtin);
    if (g) abrirComparadorPorGTIN(g);
    else abrirComparador(p);
  };

  const header = document.querySelector("header.sticky");
  const selo = document.querySelector(".ml-selo");
  if (header) header.classList.add("hidden");
  if (selo) selo.classList.add("hidden");

  modal.classList.remove("hidden");
  modal.classList.add("flex");
  requestAnimationFrame(() => {
    box.classList.remove("scale-95", "opacity-0");
    box.classList.add("scale-100", "opacity-100");
  });
}

function closeModal() {
  const modal = el("#productModal");
  const box = el("#modalBox");
  if (!modal || !box) return;
  box.classList.add("scale-95", "opacity-0");
  setTimeout(() => {
    modal.classList.add("hidden"); modal.classList.remove("flex");
    const header = document.querySelector("header.sticky");
    const selo = document.querySelector(".ml-selo");
    if (header) header.classList.remove("hidden");
    if (selo) selo.classList.remove("hidden");
  }, 200);
}
(function bindModal() {
  const closeBtn = el("#closeModal");
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  const modalBg = el("#productModal");
  if (modalBg) modalBg.addEventListener("click", (e) => { if (e.target.id === "productModal") closeModal(); });
})();

/* ===================== FILTROS ===================== */
function aplicarFiltros(arg) {
  const isEvent = arg && typeof arg === "object" && "target" in arg && typeof arg.preventDefault === "function";
  const options = isEvent ? {} : (arg || {});
  const modoCatalogo = !!options.modoCatalogo;

  const busca = (el("#buscaInput")?.value || "").toLowerCase();
  const categoria = (el("#filtroCategoria")?.value || "").toLowerCase();
  const preco = el("#filtroPreco")?.value || "";
  const origens = Array.from(document.querySelectorAll(".origemCheck:checked")).map(c => c.value);

  const mapaCat = {
    "roupas": ["roupa", "tricot", "bandana", "gravata"],
    "acessórios": ["laço", "peitoral", "gravata", "bandana", "escova", "pente"],
    "higiene": ["shampoo", "condicionador", "perfume", "hidratante"],
    "camas": ["cama", "donut"],
    "rações": ["ração", "racao"]
  };

  const { gtin: alvoGTIN, simKey: alvoSIMK } = window.filtrosAlvo;
  const temAlvo = Boolean(alvoGTIN || alvoSIMK);
  document.body.classList.toggle("catalogo-focus", temAlvo);

  const filtrados = produtos.filter(p => {
    const precoFinal = getFinalPrice(p);
    // origem
    if (origens.length && !origens.includes(p.tipo)) return false;
    // texto
    if (busca && !temAlvo && !p.nome.toLowerCase().includes(busca)) return false;
    // categoria
    if (categoria) {
      const termos = mapaCat[categoria] || [];
      if (!termos.some(t => p.nome.toLowerCase().includes(t))) return false;
    }
    // preço
    if (preco === "0" && precoFinal > 50) return false;
    if (preco === "1" && (precoFinal < 50 || precoFinal > 150)) return false;
    if (preco === "2" && precoFinal < 150) return false;

    // ==== interseção com alvo selecionado ====
    if (alvoGTIN || alvoSIMK) {
      const gOK = alvoGTIN && normalizeGTIN(p.gtin) === alvoGTIN;
      const kOK = alvoSIMK && String(p.simKey || "") === String(alvoSIMK);
      if (!(gOK || kOK)) return false;
    }

    return true;
  });

  if (modoCatalogo) {
    document.body.classList.remove("modo-filtro");
    document.querySelector("header.sticky")?.classList.remove("hidden");
    document.querySelector(".ml-selo")?.classList.remove("hidden");
    const secLista = document.getElementById("secListaProdutos");
    if (secLista) {
      requestAnimationFrame(() => {
        secLista.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  } else {
    ativarFiltro(true);
  }
  toggleComparador(false);
  renderLista(filtrados);

  // estado vazio
  const lista = el("#listaProdutos");
  if (lista && !filtrados.length) {
    lista.innerHTML = `
      <div class="text-center text-gray-600 bg-white rounded-md p-4 shadow-sm mt-4 border border-gray-200 w-full">
        <span class="block text-lg font-semibold">😕 Nenhum item encontrado</span>
        <span class="text-sm text-gray-500">Tente mudar os filtros ou limpar a busca.</span>
      </div>`;
  }

  // atualiza chip
  ensureChipSelecionado();
}

/* cria a barra de filtros rededesenhada (Search Focus + Drawer) */
function criarBarraFiltros() {
  const drawerSlot = document.getElementById("filtroLojasTopo"); // Agora atua como Drawer
  const linhaSlot = document.getElementById("filtroLinhaProdutos"); // Barra principal (Search + Btn)
  if (!drawerSlot || !linhaSlot) return;

  // 1. Monta o conteúdo do Drawer (Marcas + Selects)
  const origemHTML = Object.entries(STORE_META).map(([k, v]) => `
    <label data-src="${k}" class="ativo" aria-label="${v.nome}" title="${v.nome}">
      <input type="checkbox" class="origemCheck" value="${k}" checked />
      <img src="${v.logo}" alt="" class="filtro-logo" />
    </label>
  `).join("");

  drawerSlot.innerHTML = `
    <div class="flex flex-col gap-4 w-full">
      <div class="flex flex-wrap gap-3 items-center justify-between">
        <span class="text-sm font-bold text-gray-500 uppercase tracking-wider">Lojas</span>
        <button id="closeDrawerBtn" class="text-xs font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded hover:bg-teal-100 sm:hidden">Fechar painel</button>
      </div>
      <div id="filtroOrigem" class="w-full pb-2 border-b border-gray-100">
        ${origemHTML}
      </div>
      <div class="flex flex-wrap gap-4 items-center">
         <span class="text-sm font-bold text-gray-500 uppercase tracking-wider">Opções</span>
         <div class="filters-panel flex gap-2">
            <label class="filters-field">
              <select id="filtroPreco" class="select-pill px-4 py-2 rounded-full border border-gray-200 bg-white text-gray-700 font-semibold focus:border-teal-500 focus:ring-1 focus:ring-teal-200 cursor-pointer">
                <option value="">Faixa de Preço</option>
                <option value="0">Até R$ 50</option>
                <option value="1">R$ 50 – R$ 150</option>
                <option value="2">+ R$ 150</option>
              </select>
            </label>
            <label class="filters-field">
              <select id="filtroCategoria" class="select-pill px-4 py-2 rounded-full border border-gray-200 bg-white text-gray-700 font-semibold focus:border-teal-500 focus:ring-1 focus:ring-teal-200 cursor-pointer">
                <option value="">Categoria</option>
                <option>Roupas</option><option>Acessórios</option><option>Higiene</option><option>Camas</option><option>Rações</option>
              </select>
            </label>
         </div>
      </div>
    </div>
  `;

  // 2. Monta a Barra Principal (Search + Toggle Btn)
  linhaSlot.innerHTML = `
    <div class="f-controls w-full flex items-center justify-between gap-3 bg-white p-1 rounded-full border border-gray-200 shadow-sm relative z-20">
      
      <!-- Search Input Wrapper -->
      <div class="search-wrap flex-1 relative flex items-center h-11">
        <svg class="icon absolute left-4 text-gray-400" viewBox="0 0 24 24" width="20" height="20" fill="none">
          <path d="M21 21l-4.3-4.3M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <input id="buscaInput" type="text" placeholder="O que seu pet precisa hoje?" 
               class="w-full h-full rounded-full pl-11 pr-10 text-gray-800 placeholder-gray-400 font-medium outline-none bg-transparent" />
        <button id="clearBusca" type="button"
                class="hidden absolute right-2 w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 font-bold grid place-items-center leading-none transition">&times;</button>
      </div>

      <!-- Filter Toggle Button -->
      <button id="toggleDrawerBtn" class="flex items-center gap-2 px-5 h-9 mr-1 rounded-full bg-teal-50 text-teal-700 font-bold hover:bg-teal-100 active:scale-95 transition-all text-sm border border-teal-100">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 21v-7"/><path d="M4 10V3"/><path d="M12 21v-9"/><path d="M12 8V3"/><path d="M20 21v-5"/><path d="M20 12V3"/><path d="M1 14h6"/><path d="M9 8h6"/><path d="M17 16h6"/></svg>
        <span>Filtros</span>
      </button>

    </div>
  `;

  // === Lógica de Interação === //

  const drawer = drawerSlot;
  const toggleBtn = linhaSlot.querySelector("#toggleDrawerBtn");
  const closeBtn = drawerSlot.querySelector("#closeDrawerBtn");
  const busca = linhaSlot.querySelector("#buscaInput");
  const clear = linhaSlot.querySelector("#clearBusca");

  // Estado inicial do drawer: escondido
  drawer.style.display = 'none';
  // (OBS: O CSS 'body.modo-filtro #filtroLojasTopo { display: block; }' no index.html deve ser ajustado ou sobrescrito 
  // para não interferir, ou usamos display manual aqui).

  // Função Toggle Drawer com Animação
  const toggleDrawer = () => {
    const isHidden = drawer.style.display === 'none';

    if (isHidden) {
      drawer.style.display = 'block';
      drawer.style.opacity = '0';
      drawer.style.transform = 'translateY(-10px)';
      requestAnimationFrame(() => {
        drawer.style.transition = 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)';
        drawer.style.opacity = '1';
        drawer.style.transform = 'translateY(0)';
      });
    } else {
      drawer.style.transition = 'all 0.2s ease-in';
      drawer.style.opacity = '0';
      drawer.style.transform = 'translateY(-10px)';
      setTimeout(() => {
        drawer.style.display = 'none';
      }, 200);
    }

    toggleBtn.classList.toggle("bg-teal-600", isHidden);
    toggleBtn.classList.toggle("text-white", isHidden);
    toggleBtn.classList.toggle("bg-teal-50", !isHidden);
    toggleBtn.classList.toggle("text-teal-700", !isHidden);
  };

  toggleBtn.addEventListener("click", toggleDrawer);
  if (closeBtn) closeBtn.addEventListener("click", () => { drawer.style.display = 'none'; toggleBtn.classList.remove("bg-teal-600", "text-white"); toggleBtn.classList.add("bg-teal-50", "text-teal-700"); });

  // Search Logic
  const showClear = () => { if (clear) clear.classList.toggle("hidden", !busca.value); };
  ["input", "change"].forEach(evt => {
    if (busca) busca.addEventListener(evt, () => { showClear(); aplicarFiltros(); });
  });
  if (clear) clear.addEventListener("click", () => { busca.value = ""; showClear(); aplicarFiltros(); });

  // Filter Listeners (agora dentro do drawer)
  ["filtroPreco", "filtroCategoria"].forEach(id => {
    const elx = drawerSlot.querySelector(`#${id}`);
    if (elx) elx.addEventListener("change", () => aplicarFiltros());
  });

  drawerSlot.querySelectorAll(".origemCheck").forEach(chk => {
    const label = chk.closest("label");
    chk.addEventListener("change", () => {
      label.classList.toggle("ativo", chk.checked);
      aplicarFiltros();
    });
  });

  // Attach Fallbacks logo
  drawerSlot.querySelectorAll("#filtroOrigem img").forEach(attachLogoFallback);
}
/* ===================== BUSCA INTELIGENTE (AUTOCOMPLETE) ===================== */
function setupAutocomplete() {
  const input = document.querySelector("#buscaInput");
  if (!input) return;
  const box = document.createElement("div");
  box.id = "autocompleteBox";
  Object.assign(box.style, {
    position: "absolute", top: "100%", left: "0", right: "0",
    background: "#FFF8ED", border: "1px solid #D6A75C",
    borderRadius: "10px", boxShadow: "0 4px 12px rgba(0,0,0,.12)",
    zIndex: "80", padding: "6px", display: "none", maxHeight: "280px", overflowY: "auto"
  });
  input.parentElement.style.position = "relative";
  input.parentElement.appendChild(box);

  function renderSuggestions(txt, allowDefault = false) {
    const val = txt.toLowerCase().trim();
    const matches = val
      ? produtos.filter(p => p.nome.toLowerCase().includes(val)).slice(0, 8)
      : (allowDefault ? produtos.slice(0, 8) : []);
    if (!matches.length) {
      box.innerHTML = "<div style='padding:6px;color:#555;font-size:13px;'>Nenhum resultado encontrado</div>";
      box.style.display = "block"; return;
    }
    box.innerHTML = "";
    matches.forEach(p => {
      const meta = STORE_META[p.tipo] || {};
      const item = document.createElement("div");
      item.style.display = "flex"; item.style.alignItems = "center"; item.style.gap = "8px";
      item.style.padding = "5px 6px"; item.style.cursor = "pointer"; item.style.borderRadius = "8px";
      item.style.transition = "background .15s"; item.onmouseenter = () => item.style.background = "#fff3d6";
      item.onmouseleave = () => item.style.background = "transparent";

      const img = document.createElement("img");
      img.src = p.imagem || IMG_PLACEHOLDER; img.alt = p.nome;
      Object.assign(img.style, { width: "40px", height: "40px", objectFit: "contain", borderRadius: "6px", flexShrink: "0" });

      const name = document.createElement("div");
      name.style.flex = "1"; name.style.fontSize = "13px"; name.style.fontWeight = "600"; name.style.color = "#333";
      const regex = new RegExp(`(${val})`, "gi");
      name.innerHTML = p.nome.replace(regex, "<b>$1</b>");

      item.appendChild(img); item.appendChild(name);
      item.onclick = () => {
        selecionarProdutoNosFiltros(p);
        box.style.display = "none";
      };
      box.appendChild(item);
    });
    box.style.display = "block";
  }
  input.addEventListener("input", () => renderSuggestions(input.value, true));
  input.addEventListener("focus", () => renderSuggestions(input.value, true));
  document.addEventListener("click", e => {
    if (!box.contains(e.target) && e.target !== input) box.style.display = "none";
  });
}

/* mostra/oculta modo filtro e restaura listas */
function ativarFiltro(ativo) {
  const body = document.body;
  const header = document.querySelector("header.sticky");
  const selo = document.querySelector(".ml-selo");

  if (ativo) {
    body.classList.add("modo-filtro");
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
    if (header) header.classList.remove("hidden");
    if (selo) selo.classList.remove("hidden");
    renderBanner("bannerA", ["shopee", "amazon", "magalu", "aliexpress", "petlove", "mercadolivre", "petz", "cobasi", "casasbahia", "ponto"]);
    toggleComparador(false);
    listaAtual = produtos.slice();
    window.listaAtual = listaAtual;
    renderLista(produtos);
  }
}

/* =============== ROLAGEM AUTOMÁTICA BANNERS =============== */
function autoScroll(containerId) {
  const faixa = document.getElementById(containerId);
  if (!faixa || !faixa.parentElement) return;
  if (window.innerWidth < 768) return; // evita auto-scroll no mobile
  const scroller = faixa.parentElement;
  let dir = 1;
  function loop() {
    scroller.scrollLeft += dir * 0.5;
    if (scroller.scrollLeft + scroller.clientWidth >= scroller.scrollWidth - 1) dir = -1;
    else if (scroller.scrollLeft <= 0) dir = 1;
    requestAnimationFrame(loop);
  }
  loop();
}

/* ===================== COMPARADOR (UI) ===================== */
function toggleComparador(show) {
  const secCmp = el("#secComparador");
  let secList = el("#secListaProdutos");
  if (!secList) {
    const lista = el("#listaProdutos");
    secList = lista ? lista.closest("section") || lista.parentElement : null;
  }
  if (!secCmp || !secList) return;

  document.body.classList.toggle("comparador-focus", !!show);

  if (show) {
    secList.classList.add("hidden");
    secCmp.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    secCmp.classList.add("hidden");
    secList.classList.remove("hidden");
  }
}

function abrirComparadorPorGTIN(gtin14) {
  closeModal();
  const pack = indexByGTIN.get(gtin14);
  if (!pack) {
    const fake = { nome: `GTIN ${gtin14}`, tipo: "mercadolivre", precoAtual: 0 };
    renderComparador([fake], fake);
    toggleComparador(true);
    return;
  }
  const grupo = Object.values(pack);
  renderComparador(grupo, grupo[0]);
  toggleComparador(true);
}

function abrirComparador(baseProduct) {
  closeModal();
  const g = normalizeGTIN(baseProduct.gtin);
  if (g) { abrirComparadorPorGTIN(g); return; }
  const grupo = comparablesFor(baseProduct);
  renderComparador(grupo, baseProduct);
  toggleComparador(true);
}

function normalizeShippingOption(opt) {
  if (!opt) return null;
  const nomeRaw = (opt.nome || opt.label || "Entrega").toString().trim();
  const prazoRaw = (opt.prazo || opt.eta || opt.tempo || "").toString().trim();
  const detalheRaw = (opt.detalhe || opt.obs || opt.descricao || opt.comment || "").toString().trim();
  const isFree = opt.freteGratis || opt.preco === 0 || opt.valor === 0;
  let tipo = opt.tipo;
  if (!tipo) {
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

function resolveShippingOptions(prod, meta) {
  if (Array.isArray(prod?.shippingOptions) && prod.shippingOptions.length) {
    return prod.shippingOptions.map(normalizeShippingOption).filter(Boolean);
  }
  if (Array.isArray(meta?.shipping) && meta.shipping.length) {
    return meta.shipping.map(normalizeShippingOption).filter(Boolean);
  }
  return [];
}

function getShippingSummary(prod, meta) {
  const options = resolveShippingOptions(prod, meta);
  if (options.length) {
    const prefer = options.find(opt => opt.tipo === "express") || options[0];
    if (prefer) {
      if (prefer.nome) {
        return `${prefer.nome}: ${prefer.prazo}`;
      }
      return prefer.prazo;
    }
  }
  if (prod?.freteInfo?.label) {
    return prod.freteInfo.label;
  }
  return "";
}

function buildShippingSummaryHtml(prod, meta) {
  const summary = getShippingSummary(prod, meta);
  if (!summary) return "";
  return `<div class="cmp-ship-summary">Prazo estimado: ${summary}</div>`;
}

function renderComparador(grupo, baseProduct) {
  const cont = el("#listaComparativos");
  if (!cont) return;
  cont.innerHTML = "";

  if (!grupo || grupo.length <= 1) {
    cont.innerHTML = `
      <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <div class="text-center text-gray-700 font-semibold">Só encontramos este item em <b>${grupo?.length || 0}</b> loja no momento.</div>
        <div class="text-center mt-2">
          <button id="btnVoltarLista" class="px-3 py-2 rounded-md bg-black text-white text-sm font-bold">← Voltar para a lista</button>
        </div>
      </div>`;
    el("#btnVoltarLista")?.addEventListener("click", () => toggleComparador(false));
    return;
  }

  const ordenados = [...grupo].sort((a, b) => getFinalPrice(a) - getFinalPrice(b));
  const menor = ordenados[0];
  const maior = ordenados[ordenados.length - 1];
  const menorValor = getFinalPrice(menor);
  const media = ordenados.reduce((acc, p) => acc + getFinalPrice(p), 0) / ordenados.length;
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
  el("#btnVoltarLista")?.addEventListener("click", () => toggleComparador(false));

  ordenados.forEach(p => {
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
    imgW.classList.remove("h-24", "sm:h-28");
    imgW.classList.add("h-16", "sm:h-20");
    top.appendChild(imgW);

    const nm = document.createElement("div");
    nm.className = "cmp-product-name";
    nm.textContent = p.nome;
    top.appendChild(nm);

    card.insertBefore(top, card.firstChild);
    const copyBtn = card.querySelector(".cmp-copy-btn");
    if (copyBtn) {
      copyBtn.addEventListener("click", async () => {
        const code = copyBtn.getAttribute("data-code") || "";
        const ok = await copyTextToClipboard(code);
        if (ok) {
          copyBtn.textContent = "Copiado!";
          setTimeout(() => copyBtn.textContent = "Copiar", 1600);
        }
      });
    }

    card.querySelector(".ver-btn")?.addEventListener("click", () => openModal(p));

    cont.appendChild(card);
  });
}

/* ===================== TOOLTIP / HOVERCARD ===================== */
(function () {
  const tip = document.getElementById('hoverTip');
  if (!tip) { return; }

  const tipImg = tip.querySelector('.tip-img img');
  const tipStore = tip.querySelector('.tip-store');
  const tipTitle = tip.querySelector('.tip-title');
  const tipOld = tip.querySelector('.tip-old');
  const tipOff = tip.querySelector('.tip-off');
  const tipPrice = tip.querySelector('.tip-price');
  const tipDesc = tip.querySelector('.tip-desc');

  let rafMove = null;
  function moveHoverTip(px, py) {
    if (tip.classList.contains('is-mobile')) return;
    if (rafMove) cancelAnimationFrame(rafMove);
    rafMove = requestAnimationFrame(() => {
      const pad = 16;
      const vw = window.innerWidth, vh = window.innerHeight;
      const rect = tip.getBoundingClientRect();
      let x = px + pad, y = py + pad;
      if (x + rect.width > vw - 8) x = vw - rect.width - 8;
      if (y + rect.height > vh - 8) y = py - rect.height - pad;
      tip.style.left = x + 'px';
      tip.style.top = y + 'px';
    });
  }

  function storeMeta(tipo) {
    if (typeof STORE_META === 'object' && STORE_META[tipo]) return STORE_META[tipo];
    return { nome: tipo || 'Loja', logo: '' };
  }

  function showHoverTip(prod, px, py) {
    if (!prod) return;
    const isMobile = window.innerWidth <= 640;
    tip.classList.toggle('is-mobile', isMobile);
    const meta = storeMeta(prod.tipo);

    tipImg.src = prod.imagem || '';
    tipImg.onerror = () => { tipImg.src = ''; };

    if (meta.logo) {
      tipStore.src = meta.logo;
      tipStore.alt = meta.nome || 'Loja';
      tipStore.style.display = 'block';
    } else {
      tipStore.style.display = 'none';
    }

    tipTitle.textContent = prod.nome || '';
    tipOld.textContent = (prod.precoAntigo ? fmt(prod.precoAntigo) : '');
    tipOff.textContent = (prod.desconto || '');
    tipPrice.textContent = fmt(prod.precoAtual || 0);

    if (Array.isArray(prod.detalhes) && prod.detalhes.length) {
      tipDesc.textContent = '• ' + prod.detalhes.slice(0, 2).join('  • ');
    } else {
      tipDesc.textContent = '';
    }

    tip.classList.add('show');
    tip.setAttribute('aria-hidden', 'false');
    if (isMobile) {
      tip.style.left = '50%';
      tip.style.top = '50%';
      tip.style.transform = 'translate(-50%,-50%) scale(1)';
    } else {
      tip.style.left = '';
      tip.style.top = '';
      tip.style.transform = '';
      moveHoverTip(px, py);
    }
  }

  function hideHoverTip() {
    tip.classList.remove('is-mobile');
    tip.classList.remove('show');
    tip.setAttribute('aria-hidden', 'true');
    tip.style.left = '';
    tip.style.top = '';
    tip.style.transform = '';
  }

  function bindHoverForCard(cardEl, prod) {
    if (!cardEl || !prod) return;

    // mouse
    cardEl.addEventListener('mouseenter', e => {
      showHoverTip(prod, e.clientX, e.clientY);
    });
    cardEl.addEventListener('mousemove', e => {
      moveHoverTip(e.clientX, e.clientY);
    });
    cardEl.addEventListener('mouseleave', e => {
      if (e.relatedTarget && tip.contains(e.relatedTarget)) return;
      hideHoverTip();
    });

    // touch
    let touchTimer = null;
    cardEl.addEventListener('touchstart', e => {
      const t = e.touches[0];
      showHoverTip(prod, t.clientX, t.clientY);
    }, { passive: true });
    cardEl.addEventListener('touchmove', e => {
      const t = e.touches[0];
      moveHoverTip(t.clientX, t.clientY);
    }, { passive: true });
    cardEl.addEventListener('touchend', () => {
      if (touchTimer) clearTimeout(touchTimer);
    });
  }

  tip.addEventListener('mouseleave', hideHoverTip);
  window.addEventListener('scroll', hideHoverTip, { passive: true });
  document.addEventListener('touchstart', (e) => {
    if (tip.contains(e.target) || e.target.closest('.card-geral')) return;
    hideHoverTip();
  }, { passive: true });

  // Decorar renderLista e renderBanner para anexar tooltips
  const _renderLista = window.renderLista;
  if (typeof _renderLista === 'function') {
    window.renderLista = function (lista) {
      _renderLista(lista);
      const wrap = document.querySelector('#listaProdutos');
      if (!wrap) return;
      const cards = wrap.querySelectorAll('.card-geral');
      cards.forEach((card, idx) => {
        const prod = lista[idx];
        if (prod) bindHoverForCard(card, prod);
      });
    };
  }

  const _renderBanner = window.renderBanner;
  if (typeof _renderBanner === 'function') {
    window.renderBanner = function (containerId, tipos) {
      _renderBanner(containerId, tipos);
      const faixa = document.getElementById(containerId);
      if (!faixa) return;
      const rendered = (window.produtos || []).filter(p => (tipos || []).includes(p.tipo));
      const cards = faixa.querySelectorAll('.banner-card');
      cards.forEach((card, idx) => {
        const prod = rendered[idx];
        if (prod) bindHoverForCard(card, prod);
      });
    };
  }

  document.addEventListener('DOMContentLoaded', () => {
    // lista
    const wrap = document.querySelector('#listaProdutos');
    if (wrap) {
      const cards = wrap.querySelectorAll('.card-geral');
      cards.forEach((card, idx) => {
        const prod = (window.produtos || [])[idx];
        if (prod) bindHoverForCard(card, prod);
      });
    }
    // banners
    const faixa = document.getElementById('bannerA');
    if (faixa) {
      const tipos = ['shopee', 'amazon', 'magalu', 'aliexpress', 'petlove', 'mercadolivre', 'petz', 'cobasi', 'casasbahia', 'ponto'];
      const rendered = (window.produtos || []).filter(p => tipos.includes(p.tipo));
      const cards = faixa.querySelectorAll('.banner-card');
      cards.forEach((card, idx) => {
        const prod = rendered[idx];
        if (prod) bindHoverForCard(card, prod);
      });
    }
  });

  // Expor helpers se precisar
  window.__hoverTip = { show: showHoverTip, hide: hideHoverTip, bind: bindHoverForCard };
})();

/* ===================== INIT ===================== */
window.addEventListener("DOMContentLoaded", () => {
  // conteúdo padrão
  loadProducts();
  criarBarraFiltros();
  // mover barra de filtros para junto dos botões de lojas no topo (mobile-friendly)
  (function mergeFiltros() {
    const topo = document.getElementById("filtroLojasTopo");
    const barra = document.getElementById("filtroLinhaProdutos");
    if (topo && barra && !topo.contains(barra)) {
      topo.appendChild(barra);
      topo.style.display = "flex";
      barra.style.display = "flex";
    }
  })();
  setupAutocomplete();
  document.body.classList.remove("modo-filtro");

  // (Índice carregado via loadProducts)

  // Toolbar opcional (caso exista)
  const tb = document.querySelector(".ml-toolbar");
  if (tb) {
    const btnBack = document.createElement("button");
    btnBack.className = "hidden ml-auto px-3 py-1.5 rounded-md bg-black text-white text-xs font-bold";
    btnBack.id = "toolbarVoltar";
    btnBack.textContent = "← Voltar para a lista";
    btnBack.onclick = () => toggleComparador(false);
    tb.appendChild(btnBack);

    const obs = new MutationObserver(() => {
      const secCmp = el("#secComparador");
      if (secCmp && !secCmp.classList.contains("hidden")) btnBack.classList.remove("hidden");
      else btnBack.classList.add("hidden");
    });
    const secC = el("#secComparador");
    if (secC) obs.observe(secC, { attributes: true, attributeFilter: ["class"] });
  }
});
