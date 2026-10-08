import type { FlowerProduct, ItemProduct } from "./products";
import { getAdcInventory } from "./adcInventoryService";

/**
 * ONE product loader for every web page (Grok 2026-10-09): the same getAdcInventory() call /api/tv-data uses,
 * so web, /tv and /tv2 always show the same products (live -> last-good -> static only as last resort).
 */
export async function getLiveMenu(): Promise<{ flowers: FlowerProduct[]; items: ItemProduct[] }> {
  const { snapshot } = await getAdcInventory();
  return { flowers: snapshot.flowers as unknown as FlowerProduct[], items: snapshot.items as unknown as ItemProduct[] };
}

export async function liveFlowersByTier(tier: string): Promise<FlowerProduct[]> {
  const { flowers } = await getLiveMenu();
  return flowers.filter((f) => String(f.tier || "").toUpperCase() === String(tier || "").toUpperCase());
}

export async function liveItemsByCategory(category: string): Promise<ItemProduct[]> {
  const { items } = await getLiveMenu();
  return items.filter((i) => String(i.category || "").toUpperCase() === String(category || "").toUpperCase());
}
