import { NextResponse } from "next/server";
import { ADC_REFRESH_SECONDS } from "../../lib/adcInventoryCore";
import { getAdcInventory } from "../../lib/adcInventoryService";
import { isCigaretteItemHidden } from "../../lib/cigaretteCatalog";
import { getCigaretteSnapshot, snapshotHeaders } from "../../lib/cigaretteFeed";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "flowers";
  const [inventory, cigarettes] = await Promise.all([getAdcInventory(), getCigaretteSnapshot()]);
  const selectedType = type === "items" ? "items" : "flowers";
  const visibleItems = inventory.snapshot.items.filter((item) => !isCigaretteItemHidden(item, cigarettes.tv.show));
  const data = selectedType === "items" ? visibleItems : inventory.snapshot.flowers;
  const headers = {
    "cache-control": `public, s-maxage=${ADC_REFRESH_SECONDS}, stale-while-revalidate=60`,
    "x-tv-data-cache-seconds": String(ADC_REFRESH_SECONDS),
    "x-tv-data-source": inventory.servedFrom,
    "x-tv-data-as-of": inventory.snapshot.sourceTimestamp,
    // Grok 2026-10-08: lets /tv + /tv2 show a small "Menu updating" notice when stock is older than 48 h.
    "x-tv-data-stale":
      Number.isFinite(Date.parse(inventory.snapshot.sourceTimestamp || "")) && Date.now() - Date.parse(inventory.snapshot.sourceTimestamp || "") <= 48 * 60 * 60 * 1000 ? "0" : "1",
    "x-tv-data-version": inventory.snapshot.version,
    "x-tv-data-store": inventory.snapshot.storeCode,
    "x-tv-data-flower-count": String(inventory.snapshot.flowers.length),
    "x-tv-data-item-count": String(visibleItems.length),
    ...snapshotHeaders(cigarettes),
  };

  return NextResponse.json(data, { headers });
}
