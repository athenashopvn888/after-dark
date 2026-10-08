import "server-only";
import approvedOverridesJson from "./approvedFlowerDisplayOverrides.json";
import {
  ADC_REFRESH_SECONDS,
  buildAdcInventorySnapshot,
  resolveAdcInventory,
  type AdcCatalog,
  type AdcInventorySnapshot,
  type AdcRawInventory,
} from "./adcInventoryCore";
import type { FlowerProduct } from "./products";
import { readAdcInventorySnapshot, writeAdcInventorySnapshot } from "./adcInventoryStore";

export interface AdcInventoryResult {
  snapshot: AdcInventorySnapshot;
  servedFrom: "fresh" | "last-good";
  fallbackReason: string | null;
}

let inputCache: { expiresAt: number; promise: ReturnType<typeof fetchInputs> } | null = null;

async function fetchJson<T>(url: string): Promise<T> {
  let lastError: unknown;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const response = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(30_000) });
      if (!response.ok) throw new Error(`ADC inventory endpoint returned HTTP ${response.status}.`);
      return response.json() as Promise<T>;
    } catch (error) {
      lastError = error;
      if (attempt < 2) await new Promise((resolve) => setTimeout(resolve, 250 * (attempt + 1)));
    }
  }
  throw lastError;
}

// Shared fleet feed (cached ONHAND copy, refreshed 11:15/19:15 Toronto). It never reads Gmail per request,
// unlike the legacy APPS_SCRIPT_URL deployment, which fails with "Service invoked too many times for one day: gmail".
export const ADC_SHARED_FEED_URL =
  "https://script.google.com/macros/s/AKfycbx09_sDal1eMVF1r-hUck4e7oq_XBHEWhGvA79JuhZNQ6P4CdhCas0xE3FfexWQ3hq4/exec";

async function fetchInputs() {
  const endpoint = process.env.ADC_FEED_URL || ADC_SHARED_FEED_URL;
  if (!endpoint) throw new Error("ADC inventory endpoint is not configured.");
  const separator = endpoint.includes("?") ? "&" : "?";
  const base = `${endpoint}${separator}store=MJ01`;
  const inventory = await fetchJson<AdcRawInventory>(`${base}&stock=1`);
  const catalog = await fetchJson<AdcCatalog>(`${base}&catalog=1`);
  return { inventory, catalog };
}

async function cachedInputs(force: boolean) {
  const now = Date.now();
  if (!force && inputCache && inputCache.expiresAt > now) return inputCache.promise;
  const promise = fetchInputs();
  inputCache = { expiresAt: now + ADC_REFRESH_SECONDS * 1000, promise };
  try {
    return await promise;
  } catch (error) {
    inputCache = null;
    throw error;
  }
}

export async function getAdcInventory(options: { force?: boolean } = {}): Promise<AdcInventoryResult> {
  let lastGood: AdcInventorySnapshot | null = null;
  try {
    lastGood = await readAdcInventorySnapshot();
  } catch {
    console.warn("[ADC inventory] LKG read unavailable");
  }
  const result = await resolveAdcInventory({
    lastGood,
    loadFresh: async () => {
    let inputs: Awaited<ReturnType<typeof fetchInputs>>;
    try {
      inputs = await cachedInputs(Boolean(options.force));
    } catch (error) {
      console.warn("[ADC inventory] feed fetch failed:", String((error as Error)?.message || error).slice(0, 200));
      throw error;
    }
    const { inventory, catalog } = inputs;
      return buildAdcInventorySnapshot({
      inventory,
      catalog,
      flowerOverrides: approvedOverridesJson.flowers as FlowerProduct[],
      previous: lastGood,
    });
    },
    persist: async (snapshot) => {
      try {
        await writeAdcInventorySnapshot(snapshot);
      } catch (error) {
        console.warn("[ADC inventory] LKG persistence unavailable", String((error as Error)?.message || error).slice(0, 200));
        throw error;
      }
    },
  });
  if (result.servedFrom === "last-good") {
    console.warn("[ADC inventory] source rejected; serving last-known-good", result.fallbackReason);
  }
  return result;
}
