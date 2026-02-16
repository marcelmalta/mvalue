const readEnv = (key: string): string => process.env[key]?.trim() ?? "";

export const env = {
  SUPABASE_URL: readEnv("SUPABASE_URL"),
  SUPABASE_ANON_KEY: readEnv("SUPABASE_ANON_KEY"),
  SUPABASE_SERVICE_ROLE_KEY: readEnv("SUPABASE_SERVICE_ROLE_KEY"),
  CRON_SECRET: readEnv("CRON_SECRET"),
  MERCADOLIVRE_SITE_ID: readEnv("MERCADOLIVRE_SITE_ID") || "MLB",
  AMAZON_PAAPI_ACCESS_KEY: readEnv("AMAZON_PAAPI_ACCESS_KEY"),
  AMAZON_PAAPI_SECRET_KEY: readEnv("AMAZON_PAAPI_SECRET_KEY"),
  AMAZON_PAAPI_PARTNER_TAG: readEnv("AMAZON_PAAPI_PARTNER_TAG"),
  AMAZON_PAAPI_HOST: readEnv("AMAZON_PAAPI_HOST"),
  AMAZON_PAAPI_REGION: readEnv("AMAZON_PAAPI_REGION"),
  AMAZON_PAAPI_MARKETPLACE: readEnv("AMAZON_PAAPI_MARKETPLACE"),
  SHOPEE_PARTNER_ID: readEnv("SHOPEE_PARTNER_ID"),
  SHOPEE_PARTNER_KEY: readEnv("SHOPEE_PARTNER_KEY"),
  SHOPEE_SHOP_ID: readEnv("SHOPEE_SHOP_ID"),
  SHOPEE_ACCESS_TOKEN: readEnv("SHOPEE_ACCESS_TOKEN"),
  SHOPEE_HOST: readEnv("SHOPEE_HOST"),
  SHOPEE_STOREFRONT_URL: readEnv("SHOPEE_STOREFRONT_URL"),
  SHOPEE_API_KEY: readEnv("SHOPEE_API_KEY"),
  SHOPEE_API_SECRET: readEnv("SHOPEE_API_SECRET"),
  MAGALU_CLIENT_ID: readEnv("MAGALU_CLIENT_ID"),
  MAGALU_CLIENT_SECRET: readEnv("MAGALU_CLIENT_SECRET")
};

export const requireEnv = (...keys: Array<keyof typeof env>): void => {
  const missing = keys.filter((key) => !env[key]);
  if (missing.length) {
    throw new Error(`Variaveis de ambiente ausentes: ${missing.join(", ")}`);
  }
};

export const hasEnv = (...keys: Array<keyof typeof env>): boolean =>
  keys.every((key) => Boolean(env[key]));
