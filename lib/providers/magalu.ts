import { hasEnv } from "@/lib/env";
import type { NormalizedProductInput } from "@/lib/types";

export const validateMagaluConnector = (): void => {
  if (!hasEnv("MAGALU_CLIENT_ID", "MAGALU_CLIENT_SECRET")) {
    throw new Error("Connector Magalu nao configurado. Defina MAGALU_* no ambiente.");
  }
};

export const searchMagalu = async (): Promise<NormalizedProductInput[]> => {
  validateMagaluConnector();
  throw new Error("TODO: implementar connector Magalu no backend.");
};
