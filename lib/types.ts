export type ProviderName = "mercadolivre" | "amazon" | "shopee" | "magalu";

export interface ProfileRow {
  id: string;
  role: "user" | "admin";
  created_at: string;
}

export interface ProviderRow {
  id: string;
  name: ProviderName;
  enabled: boolean;
  config_json: Record<string, unknown>;
  created_at: string;
}

export interface ImportRuleRow {
  id: string;
  provider_id: string;
  name: string;
  query: string;
  category: string | null;
  tags: string[];
  enabled: boolean;
  schedule_minutes: number;
  last_run_at: string | null;
  created_at?: string;
}

export interface ImportRuleWithProvider extends ImportRuleRow {
  provider?: ProviderRow;
}

export interface ProductRow {
  id: string;
  provider: ProviderName | string;
  external_id: string;
  title: string;
  price: number;
  currency: string;
  image_url: string | null;
  product_url: string | null;
  category: string | null;
  tags: string[];
  rating: number | null;
  updated_at: string;
  raw_json: Record<string, unknown>;
}

export interface ProductOverrideRow {
  id: string;
  product_id: string;
  custom_title: string | null;
  custom_price: number | null;
  custom_image_url: string | null;
  custom_url: string | null;
  pinned: boolean;
  hidden: boolean;
  updated_at: string;
}

export interface PublicProductRow {
  id: string;
  provider: string;
  external_id: string;
  title: string;
  price: number;
  currency: string;
  image_url: string | null;
  product_url: string | null;
  category: string | null;
  tags: string[];
  rating: number | null;
  pinned: boolean;
  updated_at: string;
}

export interface ImportRunRow {
  id: string;
  provider_id: string;
  rule_id: string | null;
  status: "running" | "success" | "error" | "skipped";
  started_at: string;
  finished_at: string | null;
  items_fetched: number;
  items_upserted: number;
  error: string | null;
}

export interface NormalizedProductInput {
  provider: ProviderName;
  external_id: string;
  title: string;
  price: number;
  currency: string;
  image_url: string | null;
  product_url: string | null;
  category: string | null;
  tags: string[];
  rating: number | null;
  raw_json: Record<string, unknown>;
}
