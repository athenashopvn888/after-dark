export async function resolveLiveProduct<T extends { slug: string }>({
  slug,
  loadLive,
  fallback,
}: {
  slug: string;
  loadLive: () => Promise<T[]>;
  fallback: T[];
}): Promise<T | null> {
  try {
    const liveProducts = await loadLive();
    return liveProducts.find((product) => product.slug === slug) ?? null;
  } catch {
    return fallback.find((product) => product.slug === slug) ?? null;
  }
}
