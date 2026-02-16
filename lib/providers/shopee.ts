import { createHmac } from "node:crypto";
import { env } from "@/lib/env";
import type { NormalizedProductInput } from "@/lib/types";
import { sleep, toNumber, uniqueTags } from "@/lib/utils";

interface ShopeeSearchOptions {
  query: string;
  limit?: number;
  category?: string | null;
  tags?: string[];
  config?: Record<string, unknown>;
}

interface ShopeeConnectorConfig {
  host?: string;
  shop_id?: string | number;
  storefront_url?: string;
  max_scan_pages?: number;
}

interface ShopeeCredentials {
  partnerId: string;
  partnerKey: string;
  accessToken: string;
  shopId: string;
  host: string;
  storefrontUrl: string;
}

interface ShopeeApiEnvelope<T> {
  error?: string;
  message?: string;
  request_id?: string;
  warning?: string;
  response?: T;
}

interface ShopeeItemListRow {
  item_id?: number;
}

interface ShopeeItemListResponse {
  item?: ShopeeItemListRow[];
  has_next_page?: boolean;
  next_offset?: number;
}

interface ShopeePriceInfo {
  currency?: string;
  current_price?: number;
  original_price?: number;
  inflated_price?: number;
}

interface ShopeeItemBaseInfo {
  item_id?: number;
  category_id?: number;
  item_name?: string;
  rating_star?: number;
  image?: {
    image_url_list?: string[];
  };
  price_info?: ShopeePriceInfo[];
}

interface ShopeeItemBaseInfoResponse {
  item_list?: ShopeeItemBaseInfo[];
}

const SHOPEE_ITEM_LIST_PATH = "/api/v2/product/get_item_list";
const SHOPEE_BASE_INFO_PATH = "/api/v2/product/get_item_base_info";

const sanitizeHost = (value: string): string =>
  value.replace(/^https?:\/\//i, "").replace(/\/+$/g, "");

const toConfig = (raw: Record<string, unknown> | undefined): ShopeeConnectorConfig => ({
  host: typeof raw?.host === "string" ? raw.host.trim() : "",
  shop_id:
    typeof raw?.shop_id === "number" || typeof raw?.shop_id === "string"
      ? raw.shop_id
      : undefined,
  storefront_url: typeof raw?.storefront_url === "string" ? raw.storefront_url.trim() : "",
  max_scan_pages:
    typeof raw?.max_scan_pages === "number" && Number.isFinite(raw.max_scan_pages)
      ? raw.max_scan_pages
      : undefined
});

const normalizeText = (value: string): string =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const matchesQuery = (title: string, query: string): boolean => {
  const normalizedTitle = normalizeText(title);
  const terms = normalizeText(query)
    .split(/\s+/)
    .map((term) => term.trim())
    .filter((term) => term.length >= 2);

  if (!terms.length) {
    return true;
  }

  return terms.every((term) => normalizedTitle.includes(term));
};

const normalizePrice = (info: ShopeePriceInfo | undefined): { price: number; currency: string } => {
  const raw = toNumber(info?.current_price ?? info?.original_price ?? info?.inflated_price, 0);
  if (raw <= 0) {
    return { price: 0, currency: info?.currency || "BRL" };
  }

  const normalized = raw > 100000 ? raw / 100000 : raw;
  return {
    price: Number(normalized.toFixed(2)),
    currency: info?.currency || "BRL"
  };
};

const signRequest = (
  partnerId: string,
  partnerKey: string,
  path: string,
  timestamp: string,
  accessToken: string,
  shopId: string
): string =>
  createHmac("sha256", partnerKey)
    .update(`${partnerId}${path}${timestamp}${accessToken}${shopId}`, "utf8")
    .digest("hex");

const resolveCredentials = (config: ShopeeConnectorConfig): ShopeeCredentials => {
  const partnerId = (env.SHOPEE_PARTNER_ID || env.SHOPEE_API_KEY || "").trim();
  const partnerKey = (env.SHOPEE_PARTNER_KEY || env.SHOPEE_API_SECRET || "").trim();
  const accessToken = (env.SHOPEE_ACCESS_TOKEN || "").trim();
  const shopId = String(config.shop_id ?? env.SHOPEE_SHOP_ID ?? "").trim();
  const host = sanitizeHost(config.host || env.SHOPEE_HOST || "partner.shopeemobile.com");
  const storefrontUrl = (config.storefront_url || env.SHOPEE_STOREFRONT_URL || "https://shopee.com.br")
    .trim()
    .replace(/\/+$/g, "");

  const missing: string[] = [];
  if (!partnerId) missing.push("SHOPEE_PARTNER_ID ou SHOPEE_API_KEY");
  if (!partnerKey) missing.push("SHOPEE_PARTNER_KEY ou SHOPEE_API_SECRET");
  if (!accessToken) missing.push("SHOPEE_ACCESS_TOKEN");
  if (!shopId) missing.push("SHOPEE_SHOP_ID (ou providers.config_json.shop_id)");

  if (missing.length) {
    throw new Error(`Connector Shopee nao configurado. Faltando: ${missing.join(", ")}`);
  }

  return {
    partnerId,
    partnerKey,
    accessToken,
    shopId,
    host,
    storefrontUrl
  };
};

const buildSignedParams = (
  credentials: ShopeeCredentials,
  path: string,
  extra: Record<string, string>
): URLSearchParams => {
  const timestamp = String(Math.floor(Date.now() / 1000));
  const sign = signRequest(
    credentials.partnerId,
    credentials.partnerKey,
    path,
    timestamp,
    credentials.accessToken,
    credentials.shopId
  );

  const params = new URLSearchParams({
    partner_id: credentials.partnerId,
    timestamp,
    access_token: credentials.accessToken,
    shop_id: credentials.shopId,
    sign
  });

  Object.entries(extra).forEach(([key, value]) => params.set(key, value));
  return params;
};

const callShopeeApi = async <T>(
  credentials: ShopeeCredentials,
  path: string,
  extra: Record<string, string>
): Promise<T> => {
  const params = buildSignedParams(credentials, path, extra);
  const url = new URL(`https://${credentials.host}${path}`);
  url.search = params.toString();

  const response = await fetch(url.toString(), {
    method: "GET",
    cache: "no-store"
  });

  const text = await response.text();
  let payload: ShopeeApiEnvelope<T> = {};

  try {
    payload = text ? (JSON.parse(text) as ShopeeApiEnvelope<T>) : {};
  } catch {
    throw new Error(`Shopee retornou JSON invalido (${response.status})`);
  }

  if (!response.ok) {
    const snippet = text.slice(0, 220);
    throw new Error(`Shopee API falhou (${response.status}): ${snippet}`);
  }

  if (payload.error && payload.error !== "0") {
    throw new Error(
      `Shopee API error=${payload.error}${payload.message ? ` message=${payload.message}` : ""}`
    );
  }

  return (payload.response || {}) as T;
};

const chunk = <T>(list: T[], size: number): T[][] => {
  const out: T[][] = [];
  for (let i = 0; i < list.length; i += size) {
    out.push(list.slice(i, i + size));
  }
  return out;
};

const getItemIdsPage = async (
  credentials: ShopeeCredentials,
  offset: number,
  pageSize: number
): Promise<ShopeeItemListResponse> =>
  callShopeeApi<ShopeeItemListResponse>(credentials, SHOPEE_ITEM_LIST_PATH, {
    item_status: "NORMAL",
    offset: String(offset),
    page_size: String(pageSize)
  });

const getBaseInfoByIds = async (
  credentials: ShopeeCredentials,
  itemIds: number[]
): Promise<ShopeeItemBaseInfo[]> => {
  if (!itemIds.length) return [];

  const pages = chunk(itemIds, 20);
  const items: ShopeeItemBaseInfo[] = [];

  for (let index = 0; index < pages.length; index += 1) {
    const ids = pages[index];
    const response = await callShopeeApi<ShopeeItemBaseInfoResponse>(
      credentials,
      SHOPEE_BASE_INFO_PATH,
      {
        item_id_list: JSON.stringify(ids),
        need_tax_info: "false",
        need_complaint_policy: "false"
      }
    );

    items.push(...(Array.isArray(response.item_list) ? response.item_list : []));

    if (index < pages.length - 1) {
      await sleep(200);
    }
  }

  return items;
};

const mapShopeeItem = (
  item: ShopeeItemBaseInfo,
  options: ShopeeSearchOptions,
  credentials: ShopeeCredentials
): NormalizedProductInput | null => {
  const itemId = toNumber(item.item_id, 0);
  const title = String(item.item_name || "").trim();

  if (!itemId || !title || !matchesQuery(title, options.query)) {
    return null;
  }

  const { price, currency } = normalizePrice(item.price_info?.[0]);
  if (price <= 0) {
    return null;
  }

  return {
    provider: "shopee",
    external_id: String(itemId),
    title,
    price,
    currency,
    image_url: item.image?.image_url_list?.[0] || null,
    product_url: `${credentials.storefrontUrl}/product/${credentials.shopId}/${itemId}`,
    category: options.category ?? (item.category_id ? String(item.category_id) : null),
    tags: uniqueTags([...(options.tags || []), "shopee"]),
    rating: toNumber(item.rating_star, 0) || null,
    raw_json: item as unknown as Record<string, unknown>
  };
};

export const validateShopeeConnector = (config?: Record<string, unknown>): void => {
  resolveCredentials(toConfig(config));
};

export const searchShopee = async (
  options: ShopeeSearchOptions
): Promise<NormalizedProductInput[]> => {
  const query = String(options.query || "").trim();
  if (!query) {
    return [];
  }

  validateShopeeConnector(options.config);
  const config = toConfig(options.config);
  const credentials = resolveCredentials(config);

  const limit = Math.max(1, Math.min(options.limit ?? 24, 50));
  const pageSize = 50;
  const maxScanPages = Math.max(1, Math.min(Math.floor(config.max_scan_pages ?? 4), 10));
  const results: NormalizedProductInput[] = [];
  const seen = new Set<string>();

  let offset = 0;

  for (let page = 0; page < maxScanPages && results.length < limit; page += 1) {
    const idsPage = await getItemIdsPage(credentials, offset, pageSize);
    const rawIds = Array.isArray(idsPage.item)
      ? idsPage.item.map((item) => toNumber(item.item_id, 0)).filter((id) => id > 0)
      : [];

    if (!rawIds.length) {
      break;
    }

    const baseItems = await getBaseInfoByIds(credentials, rawIds);
    for (const item of baseItems) {
      const mapped = mapShopeeItem(item, options, credentials);
      if (!mapped) continue;
      if (seen.has(mapped.external_id)) continue;

      seen.add(mapped.external_id);
      results.push(mapped);
      if (results.length >= limit) break;
    }

    if (!idsPage.has_next_page) {
      break;
    }

    offset = toNumber(idsPage.next_offset, offset + pageSize);
    await sleep(250);
  }

  return results.slice(0, limit);
};
