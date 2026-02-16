import { hasEnv } from "@/lib/env";
import type { NormalizedProductInput } from "@/lib/types";

export const validateShopeeConnector = (): void => {
  if (!hasEnv("SHOPEE_API_KEY", "SHOPEE_API_SECRET")) {
    throw new Error("Connector Shopee nao configurado. Defina SHOPEE_* no ambiente.");
  }
};

export const searchShopee = async (): Promise<NormalizedProductInput[]> => {
  validateShopeeConnector();
  throw new Error("TODO: implementar connector Shopee no backend.");
};
