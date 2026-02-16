import { hasEnv } from "@/lib/env";
import type { NormalizedProductInput } from "@/lib/types";

export const validateAmazonConnector = (): void => {
  if (!hasEnv("AMAZON_PAAPI_ACCESS_KEY", "AMAZON_PAAPI_SECRET_KEY", "AMAZON_PAAPI_PARTNER_TAG")) {
    throw new Error("Connector Amazon nao configurado. Defina AMAZON_PAAPI_* no ambiente.");
  }
};

export const searchAmazon = async (): Promise<NormalizedProductInput[]> => {
  validateAmazonConnector();
  throw new Error("TODO: implementar connector Amazon PA-API no backend.");
};
