(function () {
  const stores = ["mercadolivre", "magalu", "amazon", "shopee", "aliexpress"];
  const offersWrap = document.getElementById("offers");
  const offerTpl = document.getElementById("offerTemplate");
  const statusEl = document.getElementById("status");
  const outputEl = document.getElementById("output");
  const outputWithCommaEl = document.getElementById("outputWithComma");

  const byId = (id) => document.getElementById(id);

  const parseNum = (value, allowZero = true) => {
    const normalized = String(value || "").replace(",", ".").trim();
    if (!normalized) return null;
    const n = Number(normalized);
    if (!Number.isFinite(n)) return null;
    if (!allowZero && n <= 0) return null;
    return n;
  };

  const splitCsv = (value) =>
    String(value || "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

  const splitLines = (value) =>
    String(value || "")
      .split(/\r?\n/)
      .map((item) => item.trim())
      .filter(Boolean);

  const setStatus = (text, type) => {
    statusEl.textContent = text || "";
    statusEl.classList.remove("ok", "err");
    if (type) statusEl.classList.add(type);
  };

  const createFakeGtin = () => {
    const base = `789${Date.now().toString().slice(-10)}`;
    return base.slice(0, 13);
  };

  const refreshOfferIndexes = () => {
    const cards = offersWrap.querySelectorAll(".offer-card");
    cards.forEach((card, idx) => {
      const target = card.querySelector('[data-role="offer-index"]');
      if (target) target.textContent = String(idx + 1);
    });
  };

  const createOfferCard = (initialData = {}) => {
    const fragment = offerTpl.content.cloneNode(true);
    const card = fragment.querySelector(".offer-card");
    const removeBtn = fragment.querySelector('[data-action="remove-offer"]');

    card.querySelectorAll("[data-field]").forEach((el) => {
      const field = el.getAttribute("data-field");
      if (!field) return;
      if (initialData[field] == null) return;
      el.value = String(initialData[field]);
    });

    removeBtn.addEventListener("click", () => {
      card.remove();
      if (!offersWrap.querySelector(".offer-card")) {
        offersWrap.appendChild(createOfferCard({ tipo: "mercadolivre" }));
      }
      refreshOfferIndexes();
      setStatus("");
    });

    return fragment;
  };

  const getOfferField = (card, name) => {
    const input = card.querySelector(`[data-field="${name}"]`);
    return input ? input.value : "";
  };

  const compactObject = (obj) => {
    if (Array.isArray(obj)) {
      const arr = obj.map(compactObject).filter((item) => item != null);
      return arr.length ? arr : null;
    }
    if (obj && typeof obj === "object") {
      const out = {};
      Object.entries(obj).forEach(([key, value]) => {
        const compacted = compactObject(value);
        const emptyString = compacted === "";
        if (compacted == null || emptyString) return;
        out[key] = compacted;
      });
      return Object.keys(out).length ? out : null;
    }
    return obj;
  };

  const collectOffer = (card, idx) => {
    const tipo = getOfferField(card, "tipo").trim();
    const precoFinal = parseNum(getOfferField(card, "precoFinal"), false);
    const link = getOfferField(card, "link").trim();
    const imagem = getOfferField(card, "imagem").trim();
    const freteTipo = getOfferField(card, "freteTipo").trim() || "variavel";
    const freteLabel = getOfferField(card, "freteLabel").trim() || "Frete variavel por CEP";
    const freteObservacao = getOfferField(card, "freteObservacao").trim();

    const errors = [];
    if (!tipo) errors.push(`Oferta ${idx}: loja obrigatoria.`);
    if (precoFinal == null) errors.push(`Oferta ${idx}: preco final obrigatorio.`);
    if (!link) errors.push(`Oferta ${idx}: link afiliado obrigatorio.`);
    if (!imagem) errors.push(`Oferta ${idx}: link de imagem obrigatorio.`);

    const badges = splitCsv(getOfferField(card, "badges"));
    const cupomCodigo = getOfferField(card, "cupomCodigo").trim();
    const cupomDescricao = getOfferField(card, "cupomDescricao").trim();

    const offer = {
      tipo,
      precoAntigo: parseNum(getOfferField(card, "precoAntigo")),
      precoFinal,
      precoPix: parseNum(getOfferField(card, "precoPix")),
      descontoPercent: parseNum(getOfferField(card, "descontoPercent")),
      parcelas: getOfferField(card, "parcelas").trim(),
      rating: parseNum(getOfferField(card, "rating")),
      reviews: parseNum(getOfferField(card, "reviews")),
      badges,
      imagem,
      link,
      freteAPartir: parseNum(getOfferField(card, "freteAPartir")),
      freteInfo: {
        tipo: freteTipo,
        label: freteLabel,
        observacao: freteObservacao
      },
      cupom: cupomCodigo
        ? {
            codigo: cupomCodigo,
            descricao: cupomDescricao
          }
        : null
    };

    return {
      offer: compactObject(offer),
      errors
    };
  };

  const buildPayload = () => {
    const gtin = byId("gtin").value.trim();
    const nome = byId("nome").value.trim();
    const brand = byId("brand").value.trim();

    const errors = [];
    if (!nome) errors.push("Nome do modelo e obrigatorio.");
    if (!brand) errors.push("Marca e obrigatoria.");
    if (!gtin) errors.push("GTIN e obrigatorio.");

    const specs = compactObject({
      cor: byId("cor").value.trim(),
      ramGb: parseNum(byId("ramGb").value),
      armazenamentoGb: parseNum(byId("armazenamentoGb").value),
      telaPolegadas: parseNum(byId("telaPolegadas").value),
      bateriaMah: parseNum(byId("bateriaMah").value),
      cameraMp: parseNum(byId("cameraMp").value)
    });

    const descricaoPadrao = splitLines(byId("descricaoPadrao").value);

    const cards = [...offersWrap.querySelectorAll(".offer-card")];
    if (!cards.length) {
      errors.push("Adicione ao menos 1 oferta.");
    }

    const offers = [];
    cards.forEach((card, idx) => {
      const { offer, errors: offerErrors } = collectOffer(card, idx + 1);
      offers.push(offer);
      errors.push(...offerErrors);
    });

    if (!offers.length) {
      errors.push("Nenhuma oferta valida encontrada.");
    }

    if (errors.length) {
      return { errors, payload: null };
    }

    const payload = compactObject({
      gtin,
      nome,
      brand,
      specs,
      descricaoPadrao,
      ofertas: offers
    });

    return { errors: [], payload };
  };

  const generateJson = () => {
    const { payload, errors } = buildPayload();
    if (errors.length) {
      setStatus(errors.join(" "), "err");
      outputEl.value = "";
      outputWithCommaEl.value = "";
      return;
    }

    const json = JSON.stringify(payload, null, 2);
    outputEl.value = json;
    outputWithCommaEl.value = `,\n${json}`;
    setStatus("JSON gerado com sucesso.", "ok");
  };

  const copyText = async (text) => {
    if (!text) return false;
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (_err) {
      return false;
    }
  };

  const clearForm = () => {
    ["gtin", "nome", "brand", "cor", "ramGb", "armazenamentoGb", "telaPolegadas", "bateriaMah", "cameraMp", "descricaoPadrao"].forEach(
      (id) => {
        byId(id).value = "";
      }
    );
    offersWrap.innerHTML = "";
    offersWrap.appendChild(createOfferCard({ tipo: "mercadolivre" }));
    refreshOfferIndexes();
    setStatus("Formulario limpo.", "ok");
    outputEl.value = "";
    outputWithCommaEl.value = "";
  };

  byId("btnAddOffer").addEventListener("click", () => {
    offersWrap.appendChild(createOfferCard({ tipo: "mercadolivre" }));
    refreshOfferIndexes();
    setStatus("");
  });

  byId("btnAddPack").addEventListener("click", () => {
    stores.forEach((store) => {
      offersWrap.appendChild(createOfferCard({ tipo: store }));
    });
    refreshOfferIndexes();
    setStatus("5 lojas adicionadas.", "ok");
  });

  byId("btnGenerate").addEventListener("click", generateJson);

  byId("btnCopy").addEventListener("click", async () => {
    if (!outputEl.value) generateJson();
    const ok = await copyText(outputEl.value);
    setStatus(ok ? "JSON copiado." : "Nao foi possivel copiar o JSON.", ok ? "ok" : "err");
  });

  byId("btnCopyWithComma").addEventListener("click", async () => {
    if (!outputWithCommaEl.value) generateJson();
    const ok = await copyText(outputWithCommaEl.value);
    setStatus(ok ? "JSON com virgula copiado." : "Nao foi possivel copiar.", ok ? "ok" : "err");
  });

  byId("btnClear").addEventListener("click", clearForm);

  byId("btnGenGtin").addEventListener("click", () => {
    byId("gtin").value = createFakeGtin();
    setStatus("GTIN fake gerado.", "ok");
  });

  clearForm();
})();
