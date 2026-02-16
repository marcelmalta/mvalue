export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const parseTags = (raw: unknown): string[] => {
  if (Array.isArray(raw)) {
    return raw
      .map((item) => String(item || "").trim())
      .filter(Boolean);
  }

  if (typeof raw === "string") {
    return raw
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  return [];
};

export const uniqueTags = (tags: string[]): string[] =>
  [...new Set(tags.map((tag) => tag.trim()).filter(Boolean))];

export const toNumber = (value: unknown, fallback = 0): number => {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
};

export const safeJson = (value: unknown): Record<string, unknown> => {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return {};
};
