import type { ProviderName } from "@/lib/types";
import { sleep } from "@/lib/utils";

const providerState = new Map<ProviderName, number>();

export const waitForProviderSlot = async (provider: ProviderName): Promise<void> => {
  const now = Date.now();
  const nextAllowed = providerState.get(provider) ?? 0;
  const waitMs = Math.max(0, nextAllowed - now);

  if (waitMs > 0) {
    await sleep(waitMs);
  }

  providerState.set(provider, Date.now() + 1000);
};

export const withRetry = async <T>(
  operation: () => Promise<T>,
  retries = 2,
  delayMs = 450
): Promise<T> => {
  let lastError: unknown;

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      if (attempt < retries) {
        await sleep(delayMs * (attempt + 1));
      }
    }
  }

  throw lastError instanceof Error ? lastError : new Error("Falha inesperada na operacao");
};
