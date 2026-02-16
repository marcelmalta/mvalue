import { createHash, createHmac } from "node:crypto";
import { env, hasEnv } from "@/lib/env";
import type { NormalizedProductInput } from "@/lib/types";
import { sleep, toNumber, uniqueTags } from "@/lib/utils";

interface AmazonConnectorConfig {
  host?: string;
  region?: string;
  marketplace?: string;
  search_index?: string;
}

interface AmazonSearchOptions {
  query: string;
  limit?: number;
  category?: string | null;
  tags?: string[];
  config?: Record<string, unknown>;
}

interface AmazonApiError {
  Message?: string;
}

interface AmazonApiItem {
  ASIN?: string;
  DetailPageURL?: string;
  ItemInfo?: {
    Title?: {
      DisplayValue?: string;
    };
    Classifications?: {
      ProductGroup?: {
        DisplayValue?: string;
      };
    };
  };
  Images?: {
    Primary?: {
      Medium?: { URL?: string };
      Large?: { URL?: string };
    };
  };
  Offers?: {
    Listings?: Array<{
      Price?: {
        Amount?: number;
        Currency?: string;
      };
    }>;
  };
  CustomerReviews?: {
    StarRating?: {
      Value?: number;
    };
  };
}

interface AmazonSearchPayload {
  Errors?: AmazonApiError[];
  SearchResult?: {
    Items?: AmazonApiItem[];
  };
}

const AMAZON_TARGET = "com.amazon.paapi5.v1.ProductAdvertisingAPIv1.SearchItems";
const AMAZON_SERVICE = "ProductAdvertisingAPI";

const sha256 = (value: string): string =>
  createHash("sha256").update(value, "utf8").digest("hex");

const hmac = (key: Buffer | string, value: string): Buffer =>
  createHmac("sha256", key).update(value, "utf8").digest();

const toConfig = (raw: Record<string, unknown> | undefined): AmazonConnectorConfig => ({
  host: typeof raw?.host === "string" ? raw.host.trim() : "",
  region: typeof raw?.region === "string" ? raw.region.trim() : "",
  marketplace: typeof raw?.marketplace === "string" ? raw.marketplace.trim() : "",
  search_index: typeof raw?.search_index === "string" ? raw.search_index.trim() : ""
});

const formatAmzDate = (date: Date): { amzDate: string; dateStamp: string } => {
  const iso = date.toISOString().replace(/[:-]|\.\d{3}/g, "");
  return {
    amzDate: iso,
    dateStamp: iso.slice(0, 8)
  };
};

const getSigningKey = (secretKey: string, dateStamp: string, region: string): Buffer => {
  const kDate = hmac(`AWS4${secretKey}`, dateStamp);
  const kRegion = hmac(kDate, region);
  const kService = hmac(kRegion, AMAZON_SERVICE);
  return hmac(kService, "aws4_request");
};

const buildSignedHeaders = (
  accessKey: string,
  secretKey: string,
  region: string,
  host: string,
  payload: string
): Record<string, string> => {
  const { amzDate, dateStamp } = formatAmzDate(new Date());

  const headers = {
    "content-encoding": "amz-1.0",
    "content-type": "application/json; charset=utf-8",
    host,
    "x-amz-date": amzDate,
    "x-amz-target": AMAZON_TARGET
  };

  const signedHeaders = Object.keys(headers).sort().join(";");
  const canonicalHeaders = Object.entries(headers)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}:${value}\n`)
    .join("");

  const canonicalRequest = [
    "POST",
    "/paapi5/searchitems",
    "",
    canonicalHeaders,
    signedHeaders,
    sha256(payload)
  ].join("\n");

  const credentialScope = `${dateStamp}/${region}/${AMAZON_SERVICE}/aws4_request`;
  const stringToSign = [
    "AWS4-HMAC-SHA256",
    amzDate,
    credentialScope,
    sha256(canonicalRequest)
  ].join("\n");

  const signingKey = getSigningKey(secretKey, dateStamp, region);
  const signature = createHmac("sha256", signingKey).update(stringToSign, "utf8").digest("hex");

  return {
    ...headers,
    Authorization: [
      `AWS4-HMAC-SHA256 Credential=${accessKey}/${credentialScope}`,
      `SignedHeaders=${signedHeaders}`,
      `Signature=${signature}`
    ].join(", ")
  };
};

const mapAmazonItem = (
  item: AmazonApiItem,
  options: AmazonSearchOptions
): NormalizedProductInput | null => {
  const externalId = String(item.ASIN || "").trim();
  const title = String(item.ItemInfo?.Title?.DisplayValue || "").trim();
  const price = toNumber(item.Offers?.Listings?.[0]?.Price?.Amount, 0);

  if (!externalId || !title || price <= 0) {
    return null;
  }

  return {
    provider: "amazon",
    external_id: externalId,
    title,
    price,
    currency: item.Offers?.Listings?.[0]?.Price?.Currency || "BRL",
    image_url: item.Images?.Primary?.Large?.URL || item.Images?.Primary?.Medium?.URL || null,
    product_url: item.DetailPageURL || null,
    category:
      options.category ?? item.ItemInfo?.Classifications?.ProductGroup?.DisplayValue ?? null,
    tags: uniqueTags([...(options.tags || []), "amazon"]),
    rating: toNumber(item.CustomerReviews?.StarRating?.Value, 0) || null,
    raw_json: item as unknown as Record<string, unknown>
  };
};

const searchAmazonPage = async (
  options: AmazonSearchOptions,
  itemPage: number,
  itemCount: number,
  config: AmazonConnectorConfig
): Promise<NormalizedProductInput[]> => {
  const accessKey = env.AMAZON_PAAPI_ACCESS_KEY;
  const secretKey = env.AMAZON_PAAPI_SECRET_KEY;
  const partnerTag = env.AMAZON_PAAPI_PARTNER_TAG;

  const host = config.host || env.AMAZON_PAAPI_HOST || "webservices.amazon.com.br";
  const region = config.region || env.AMAZON_PAAPI_REGION || "us-east-1";
  const marketplace = config.marketplace || env.AMAZON_PAAPI_MARKETPLACE || "www.amazon.com.br";
  const searchIndex = config.search_index || "All";

  const payload = JSON.stringify({
    Keywords: options.query,
    SearchIndex: searchIndex,
    ItemCount: itemCount,
    ItemPage: itemPage,
    PartnerTag: partnerTag,
    PartnerType: "Associates",
    Marketplace: marketplace,
    Resources: [
      "Images.Primary.Medium",
      "Images.Primary.Large",
      "ItemInfo.Title",
      "ItemInfo.Classifications",
      "Offers.Listings.Price",
      "CustomerReviews.StarRating"
    ]
  });

  const headers = buildSignedHeaders(accessKey, secretKey, region, host, payload);
  const response = await fetch(`https://${host}/paapi5/searchitems`, {
    method: "POST",
    headers,
    body: payload,
    cache: "no-store"
  });

  const text = await response.text();
  let parsed: AmazonSearchPayload = {};

  try {
    parsed = text ? (JSON.parse(text) as AmazonSearchPayload) : {};
  } catch {
    throw new Error(`Amazon PA-API retornou JSON invalido (status ${response.status})`);
  }

  if (!response.ok) {
    const apiError = (parsed.Errors || [])
      .map((item) => item.Message)
      .filter(Boolean)
      .join(" | ");
    throw new Error(`Amazon PA-API falhou (${response.status})${apiError ? `: ${apiError}` : ""}`);
  }

  if (parsed.Errors?.length) {
    const message = parsed.Errors.map((item) => item.Message || "Erro Amazon").join(" | ");
    throw new Error(`Amazon PA-API retornou erro: ${message}`);
  }

  const items = Array.isArray(parsed.SearchResult?.Items) ? parsed.SearchResult?.Items : [];
  return items
    .map((item) => mapAmazonItem(item, options))
    .filter((item): item is NormalizedProductInput => Boolean(item));
};

export const validateAmazonConnector = (): void => {
  if (!hasEnv("AMAZON_PAAPI_ACCESS_KEY", "AMAZON_PAAPI_SECRET_KEY", "AMAZON_PAAPI_PARTNER_TAG")) {
    throw new Error("Connector Amazon nao configurado. Defina AMAZON_PAAPI_* no ambiente.");
  }
};

export const searchAmazon = async (
  options: AmazonSearchOptions
): Promise<NormalizedProductInput[]> => {
  validateAmazonConnector();

  const query = String(options.query || "").trim();
  if (!query) {
    return [];
  }

  const config = toConfig(options.config);
  const requestedLimit = Math.max(1, Math.min(options.limit ?? 20, 30));
  const perPage = 10;
  const pages = Math.ceil(requestedLimit / perPage);
  const collected: NormalizedProductInput[] = [];

  for (let page = 1; page <= pages; page += 1) {
    const remaining = requestedLimit - collected.length;
    if (remaining <= 0) break;

    const pageItems = await searchAmazonPage(options, page, Math.min(perPage, remaining), config);
    collected.push(...pageItems);

    if (!pageItems.length || pageItems.length < Math.min(perPage, remaining)) {
      break;
    }

    if (page < pages) {
      await sleep(250);
    }
  }

  return collected.slice(0, requestedLimit);
};
