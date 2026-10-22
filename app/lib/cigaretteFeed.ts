import { cache } from "react";
import {
  cigarettePublicHeaders,
  decideCigaretteGuide,
  decideCigaretteSurface,
  webGateFromDecision,
  type CigaretteSurfaceDecision,
  type CigaretteWording,
  type WebGate,
} from "./cigDecision.ts";
import { cigaretteEnvHardOff } from "./siteConfig.ts";
import type { ItemProduct } from "./products.ts";

const MENU_FEED_DEFAULT =
  "https://script.google.com/macros/s/AKfycbx09_sDal1eMVF1r-hUck4e7oq_XBHEWhGvA79JuhZNQ6P4CdhCas0xE3FfexWQ3hq4/exec";

export type CigaretteSnapshot = {
  web: CigaretteSurfaceDecision;
  tv: CigaretteSurfaceDecision;
  guides: CigaretteSurfaceDecision;
  wording: CigaretteWording;
  live: boolean;
  items: ItemProduct[];
};

export type PublicCigaretteState = {
  web: boolean;
  tv: boolean;
  wording: CigaretteWording;
};

type CacheEntry = { at: number; snap: CigaretteSnapshot };
let memory: CacheEntry | null = null;
const MEMORY_MS = 60_000;

function snapshotFrom(cig: unknown, items: ItemProduct[], live: boolean, errored: boolean): CigaretteSnapshot {
  const web = decideCigaretteSurface({ cig, items, surface: "web", errored });
  const tv = decideCigaretteSurface({ cig, items, surface: "tv", errored });
  const guides = decideCigaretteGuide({ cig, items, errored });
  return { web, tv, guides, wording: web.wording, live, items };
}

export function resetCigaretteFeedCache(): void {
  memory = null;
}

function feedEndpoint(): string {
  const base = (process.env.MENU_FEED_URL || process.env.ADC_FEED_URL || MENU_FEED_DEFAULT).trim();
  return `${base}${base.includes("?") ? "&" : "?"}store=MJ01`;
}

export async function readCigaretteFeed(options: { fetchImpl?: typeof fetch; endpoint?: string; now?: number } = {}): Promise<CigaretteSnapshot> {
  if (cigaretteEnvHardOff()) return snapshotFrom(null, [], false, false);
  const now = options.now ?? Date.now();
  if (!options.fetchImpl && memory && now - memory.at < MEMORY_MS) return memory.snap;
  try {
    const response = await (options.fetchImpl ?? fetch)(options.endpoint ?? feedEndpoint(), {
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error("http");
    const data = await response.json() as { cig?: unknown; items?: ItemProduct[] };
    const items = Array.isArray(data?.items) ? data.items : [];
    const snap = snapshotFrom(data?.cig ?? null, items, true, false);
    if (!options.fetchImpl) memory = { at: now, snap };
    return snap;
  } catch {
    const snap = snapshotFrom(null, [], false, true);
    if (!options.fetchImpl) memory = { at: now, snap };
    return snap;
  }
}

export const getCigaretteSnapshot = cache(readCigaretteFeed);

export function toPublicCigaretteState(snap: CigaretteSnapshot): PublicCigaretteState {
  return { web: snap.web.show, tv: snap.tv.show, wording: snap.wording };
}

export function snapshotHeaders(snap: CigaretteSnapshot): Record<string, string> {
  return cigarettePublicHeaders({ web: snap.web.show, tv: snap.tv.show, wording: snap.wording });
}

export async function getWebGate(): Promise<WebGate> {
  const snap = await getCigaretteSnapshot();
  return webGateFromDecision(snap.web);
}
