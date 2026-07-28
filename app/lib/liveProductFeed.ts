export const LIVE_PRODUCT_REVALIDATE_SECONDS = 14_400;

export type ProductSource = "live" | "static-fallback";

export type ProductIdentity = {
  sku: string;
  name: string;
};

export type FetchWithNextCache = (
  input: string | URL | Request,
  init?: RequestInit & { next?: { revalidate?: number } },
) => Promise<Response>;

export function isLiveStockNewerThanSnapshot(
  stockDate: string | undefined,
  snapshotAsOf: string,
): boolean {
  const liveTime = Date.parse(stockDate || "");
  const snapshotTime = Date.parse(snapshotAsOf);
  return (
    Number.isFinite(liveTime) &&
    Number.isFinite(snapshotTime) &&
    liveTime > snapshotTime
  );
}

function isValidProductCollection(
  value: unknown,
  allowTierVariants = false,
): value is ProductIdentity[] {
  if (!Array.isArray(value) || value.length === 0) return false;
  const seen = new Set<string>();
  return value.every((entry) => {
    if (!entry || typeof entry !== "object") return false;
    const sku = String((entry as { sku?: unknown }).sku || "").trim();
    const name = String((entry as { name?: unknown }).name || "").trim();
    const tier = allowTierVariants
      ? String((entry as { tier?: unknown }).tier || "").trim().toUpperCase()
      : "";
    const displayIdentity = tier ? `${sku}\u0000${tier}` : sku;
    if (!sku || !name || seen.has(displayIdentity)) return false;
    seen.add(displayIdentity);
    return true;
  });
}

export async function fetchProductFeed<
  Flower extends ProductIdentity,
  Item extends ProductIdentity,
>(options: {
  endpoint: string;
  fetcher: FetchWithNextCache;
  snapshotAsOf: string;
  fallbackFlowers: Flower[];
  fallbackItems: Item[];
}): Promise<{
  flowers: Flower[];
  items: Item[];
  isLive: boolean;
  sources: { flowers: ProductSource; items: ProductSource };
  stockDate: string | null;
  sourceAsOf: string;
}> {
  const fallback = {
    flowers: options.fallbackFlowers,
    items: options.fallbackItems,
    isLive: false,
    sources: {
      flowers: "static-fallback" as const,
      items: "static-fallback" as const,
    },
    stockDate: null,
    sourceAsOf: options.snapshotAsOf,
  };

  if (!options.endpoint) return fallback;

  try {
    const separator = options.endpoint.includes("?") ? "&" : "?";
    const response = await options.fetcher(
      `${options.endpoint}${separator}store=MJ01`,
      { next: { revalidate: LIVE_PRODUCT_REVALIDATE_SECONDS } },
    );
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = (await response.json()) as {
      flowers?: unknown;
      items?: unknown;
      stockDate?: string;
    };
    if (
      !isLiveStockNewerThanSnapshot(data.stockDate, options.snapshotAsOf)
    ) {
      throw new Error("live stock is not newer than the POS snapshot");
    }

    const flowersLive = isValidProductCollection(data.flowers, true);
    const itemsLive = isValidProductCollection(data.items);
    if (!flowersLive && !itemsLive) {
      throw new Error("live stock collections failed validation");
    }

    return {
      flowers: flowersLive
        ? (data.flowers as Flower[])
        : options.fallbackFlowers,
      items: itemsLive ? (data.items as Item[]) : options.fallbackItems,
      isLive: flowersLive && itemsLive,
      sources: {
        flowers: flowersLive ? "live" : "static-fallback",
        items: itemsLive ? "live" : "static-fallback",
      },
      stockDate: data.stockDate || null,
      sourceAsOf: data.stockDate || options.snapshotAsOf,
    };
  } catch (error) {
    console.warn(
      "[products] Live fetch rejected; using static data:",
      error instanceof Error ? error.message : "unknown error",
    );
    return fallback;
  }
}
