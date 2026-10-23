import assert from "node:assert/strict";
import test from "node:test";
import {
  CIG_WORDING_FALLBACK,
  decideCigaretteGuide,
  decideCigaretteSurface,
  publicWebsiteCigaretteFlag,
  reconcileSurfaceItems,
  resolveCigWording,
  resolveSurfaceFlag,
  webGateFromDecision,
} from "../app/lib/cigDecision.ts";
import { isItemPageCigaretteGated, isRealCigaretteItem } from "../app/lib/cigMarkers.ts";
import { readCigaretteFeed, toPublicCigaretteState } from "../app/lib/cigaretteFeed.ts";
import { SHOW_CIGARETTES } from "../app/lib/siteConfig.ts";
import { readFileSync } from "node:fs";

const carton = { category: "CIGARETTES", name: "BB FULL CARTON", slug: "bb-full-carton" };
const grabba = { category: "CIGARETTES", name: "GRABBA", slug: "grabba" };
const backwoods = { category: "CIGARETTES", name: "BACKWOODS ASSORTED FLAVORS $20-$25", slug: "backwoods-assorted-flavors-20-25" };
const pouch = { category: "CIGARETTES", name: "NICOTINE POUCHES , VELO, PABLO, KILLA", slug: "nicotine-pouches-velo-pablo-killa" };
const vape = { category: "VAPE PENS", name: "Mango Ice", slug: "mango-ice" };

const wording = {
  bannerText: "FEED BANNER",
  promoBrands: "FEED BRANDS",
  tv2BoardTitle: "FEED BOARD",
  wrapsTitle: "🍂 WRAPS & POUCHES",
  tickerLine1: "FEED TICKER",
  priceTwoPack: "$5",
  priceCarton: "$25",
  priceBelmont: "$10",
  priceBB2Pack: "$5",
};

function cig(extra: Record<string, unknown> = {}) {
  return { on: false, tvOn: false, webOn: false, webFollowsTv: true, wording, ...extra };
}

test("website follows webOn and TV follows tvOn, with on as the fallback", () => {
  const items = [carton, backwoods];
  assert.equal(decideCigaretteSurface({ cig: cig({ webOn: true, tvOn: false }), items, surface: "web" }).show, true);
  assert.equal(decideCigaretteSurface({ cig: cig({ webOn: true, tvOn: false }), items, surface: "tv" }).show, false);
  assert.equal(decideCigaretteSurface({ cig: cig({ webOn: false, tvOn: true }), items, surface: "web" }).show, false);
  assert.equal(decideCigaretteSurface({ cig: cig({ webOn: false, tvOn: true }), items, surface: "tv" }).show, true);
  assert.equal(resolveSurfaceFlag({ on: true }, "web"), true);
  assert.equal(resolveSurfaceFlag({ on: true }, "tv"), true);
  assert.equal(resolveSurfaceFlag(cig({ on: true, webOn: false }), "web"), false);
  assert.equal(resolveSurfaceFlag(cig({ on: false, tvOn: true, webFollowsTv: true }), "tv"), true);
  assert.equal(resolveSurfaceFlag(cig({ on: true, webOn: false, webFollowsTv: true }), "web"), false);
});

test("a feed error uses coded behaviour and an explicit false stays off without a new redirect", () => {
  const items = [carton, grabba, backwoods];
  const missing = decideCigaretteSurface({ cig: null, items, surface: "web" });
  assert.equal(missing.reason, "missing");
  assert.equal(missing.show, false);
  assert.equal(webGateFromDecision(missing), "coded");
  const off = decideCigaretteSurface({ cig: cig(), items, surface: "tv" });
  assert.equal(off.show, false);
  assert.equal(webGateFromDecision(off), "unavailable");
  assert.equal(decideCigaretteSurface({ cig: cig({ on: true, webOn: true, tvOn: true }), items: [backwoods, pouch], surface: "web" }).reason, "no-items");
  const errored = decideCigaretteSurface({ cig: cig({ on: true, webOn: false, tvOn: false }), items, surface: "web", errored: true });
  assert.equal(errored.reason, "error");
  assert.equal(errored.show, false);
  assert.equal(webGateFromDecision(errored), "coded");
  const openOnError = decideCigaretteSurface({ cig: cig({ on: true, webOn: false }), items, surface: "web", errored: true, codedShow: true });
  assert.equal(openOnError.show, true);
  assert.equal(decideCigaretteSurface({ cig: cig({ on: true, webOn: true, tvOn: true }), items, surface: "tv", envRaw: "false" }).reason, "env");
  assert.equal(decideCigaretteSurface({ cig: cig({ on: true, webOn: true, tvOn: true }), items, surface: "web", envRaw: "true" }).show, true);
  assert.equal(webGateFromDecision(decideCigaretteSurface({ cig: cig({ webOn: true, tvOn: true, on: true }), items, surface: "web" })), "show");
});

test("wording uses the feed and falls back to the current copy field by field", () => {
  assert.equal(resolveCigWording({ bannerText: "  FEED BANNER  ", wrapsTitle: "" }).bannerText, "FEED BANNER");
  assert.equal(resolveCigWording({ bannerText: "  FEED BANNER  " }).wrapsTitle, CIG_WORDING_FALLBACK.wrapsTitle);
  assert.equal(resolveCigWording(undefined).tickerLine1, CIG_WORDING_FALLBACK.tickerLine1);
  assert.equal(decideCigaretteSurface({ cig: cig({ webOn: false }), items: [backwoods], surface: "web" }).wording.wrapsTitle, "🍂 WRAPS & POUCHES");
  assert.equal(decideCigaretteSurface({ cig: null, items: [], surface: "tv" }).wording.bannerText, CIG_WORDING_FALLBACK.bannerText);
});

test("null flags with real cigarettes stay open and an explicit false still hides", () => {
  const open = decideCigaretteSurface({ cig: { on: null, webOn: null, tvOn: null, wording }, items: [carton], surface: "web" });
  assert.equal(open.show, true);
  assert.equal(open.reason, "on");
  assert.equal(decideCigaretteSurface({ cig: { on: false }, items: [carton], surface: "tv" }).reason, "off");
  assert.equal(decideCigaretteGuide({ cig: { master: null, on: null }, items: [carton] }).show, true);
});

test("guide pages follow the master switch and a feed error stays on coded behaviour", () => {
  const items = [carton];
  assert.equal(decideCigaretteGuide({ cig: cig({ on: false, master: false, webOn: true }), items }).show, false);
  assert.equal(decideCigaretteGuide({ cig: cig({ on: true, master: true, webOn: false }), items }).show, true);
  assert.equal(decideCigaretteGuide({ cig: null, items, errored: true }).show, false);
  assert.equal(decideCigaretteGuide({ cig: null, items, errored: true, codedShow: true }).show, true);
  assert.equal(decideCigaretteGuide({ cig: cig({ on: true, master: true }), items, envRaw: "off" }).reason, "env");
});

test("each surface hides real cigarettes itself and always keeps wraps and pouches", () => {
  const wrap = { category: "CIGARETTES", name: "HEMP WRAPS", slug: "hemp-wraps" };
  const cigarillo = { category: "CIGARETTES", name: "GRAPE CIGARILLO", slug: "grape-cigarillo" };
  const paper = { category: "ADD ONS", name: "RAW PAPER KING SIZE", slug: "raw-paper-king-size" };
  const zyn = { category: "CIGARETTES", name: "ZYN NICOTINE POUCHES", slug: "zyn-nicotine-pouches" };
  const velo = { category: "CIGARETTES", name: "VELO POUCH", slug: "velo-pouch" };
  const kept = [wrap, pouch, backwoods, cigarillo, paper, zyn, velo];
  const menu = [vape, carton, grabba, ...kept];
  const hidden = reconcileSurfaceItems(menu, menu, false);
  assert.deepEqual(hidden.map((item) => item.slug), [vape.slug, ...kept.map((item) => item.slug)]);
  const shown = reconcileSurfaceItems([vape, backwoods], [carton, backwoods], true);
  assert.deepEqual(shown.map((item) => item.slug), [vape.slug, backwoods.slug, carton.slug]);
  for (const item of kept) assert.equal(isRealCigaretteItem(item), false, item.slug);
  assert.equal(isRealCigaretteItem(carton), true);
  assert.equal(isRealCigaretteItem(grabba), true);
});

test("TV hides on a feed error or a missing cig block, and follows tvOn on a successful feed", () => {
  const items = [carton, backwoods, pouch];
  const errored = decideCigaretteSurface({
    cig: cig({ on: true, webOn: true, tvOn: true }),
    items,
    surface: "tv",
    errored: true,
    codedShow: true,
  });
  assert.equal(errored.reason, "error");
  assert.equal(errored.show, false);
  const missing = decideCigaretteSurface({ cig: null, items, surface: "tv", codedShow: true });
  assert.equal(missing.reason, "missing");
  assert.equal(missing.show, false);
  const liveMissing = decideCigaretteSurface({ cig: null, items, surface: "tv", errored: false, codedShow: true });
  assert.equal(liveMissing.show, false);
  assert.equal(liveMissing.reason, "missing");
  const shown = decideCigaretteSurface({ cig: cig({ on: false, tvOn: true }), items, surface: "tv" });
  assert.equal(shown.show, true);
  assert.equal(shown.reason, "on");
  const hidden = decideCigaretteSurface({ cig: cig({ on: true, tvOn: false }), items, surface: "tv" });
  assert.equal(hidden.show, false);
  assert.equal(hidden.reason, "off");
  // A saved last-good block is not an error, so it still follows tvOn.
  assert.equal(decideCigaretteSurface({ cig: cig({ tvOn: true }), items, surface: "tv", errored: false }).show, true);
  assert.equal(decideCigaretteSurface({ cig: cig({ tvOn: false }), items, surface: "tv", errored: false }).show, false);
});

test("website flag stays false whenever the static gate is off, and on a feed error or missing block", () => {
  const items = [carton, backwoods];
  const explicitOn = decideCigaretteSurface({ cig: cig({ webOn: true, tvOn: true }), items, surface: "web" });
  const explicitOff = decideCigaretteSurface({ cig: cig({ webOn: false, tvOn: true }), items, surface: "web" });
  const errored = decideCigaretteSurface({ cig: cig({ webOn: true, tvOn: true }), items, surface: "web", errored: true, codedShow: true });
  const missing = decideCigaretteSurface({ cig: null, items, surface: "web", codedShow: true });
  assert.equal(explicitOn.show, true);
  assert.equal(publicWebsiteCigaretteFlag(explicitOn, false), false);
  assert.equal(publicWebsiteCigaretteFlag(explicitOff, false), false);
  assert.equal(publicWebsiteCigaretteFlag(errored, false), false);
  assert.equal(publicWebsiteCigaretteFlag(missing, false), false);
  assert.equal(publicWebsiteCigaretteFlag(errored, true), false);
  assert.equal(publicWebsiteCigaretteFlag(missing, true), false);
  assert.equal(publicWebsiteCigaretteFlag(explicitOff, true), false);
  assert.equal(publicWebsiteCigaretteFlag(explicitOn, true), true);
  assert.equal(SHOW_CIGARETTES, false);
  assert.equal(publicWebsiteCigaretteFlag(explicitOn, SHOW_CIGARETTES), false);
  assert.equal(publicWebsiteCigaretteFlag(errored, SHOW_CIGARETTES), false);
  assert.equal(publicWebsiteCigaretteFlag(missing, SHOW_CIGARETTES), false);
  assert.equal(toPublicCigaretteState({
    web: explicitOn,
    tv: decideCigaretteSurface({ cig: cig({ tvOn: true }), items, surface: "tv" }),
    guides: { show: false, reason: "off" },
    wording: explicitOn.wording,
    live: true,
    items: [],
  }).web, false);
});

test("a failed cigarette feed hides TV and a saved tvOn still shows", async () => {
  const items = [carton, backwoods, pouch];
  const shown = await readCigaretteFeed({
    fetchImpl: async () => Response.json({ cig: cig({ on: false, webOn: true, tvOn: true }), items }),
  });
  assert.equal(shown.tv.show, true);
  assert.equal(shown.tv.reason, "on");
  assert.equal(toPublicCigaretteState(shown).web, false);
  const hidden = await readCigaretteFeed({
    fetchImpl: async () => Response.json({ cig: cig({ on: true, webOn: true, tvOn: false }), items }),
  });
  assert.equal(hidden.tv.show, false);
  assert.equal(hidden.tv.reason, "off");
  const errored = await readCigaretteFeed({
    fetchImpl: async () => {
      throw new Error("down");
    },
  });
  assert.equal(errored.tv.show, false);
  assert.equal(errored.tv.reason, "error");
  assert.equal(toPublicCigaretteState(errored).web, false);
  const missing = await readCigaretteFeed({
    fetchImpl: async () => Response.json({ items }),
  });
  assert.equal(missing.tv.show, false);
  assert.equal(missing.tv.reason, "missing");
  assert.equal(toPublicCigaretteState(missing).web, false);
});

test("website surfaces keep the static gate and TV still reads the feed on the existing poll", () => {
  const feed = readFileSync(new URL("../app/lib/cigaretteFeed.ts", import.meta.url), "utf8");
  const layout = readFileSync(new URL("../app/layout.tsx", import.meta.url), "utf8");
  const status = readFileSync(new URL("../app/api/content-status/route.ts", import.meta.url), "utf8");
  const catalog = readFileSync(new URL("../app/lib/cigaretteCatalog.ts", import.meta.url), "utf8");
  const route = readFileSync(new URL("../app/api/tv-data/route.ts", import.meta.url), "utf8");
  const tv = readFileSync(new URL("../app/tv/page.tsx", import.meta.url), "utf8");
  const tv2 = readFileSync(new URL("../app/tv2/page.tsx", import.meta.url), "utf8");
  assert.match(feed, /publicWebsiteCigaretteFlag\(snap\.web, SHOW_CIGARETTES\)/);
  assert.match(feed, /now - memory\.at < MEMORY_MS/);
  assert.match(layout, /web: SHOW_CIGARETTES \? cigarettes\.web : false/);
  assert.match(status, /web: SHOW_CIGARETTES \? cigarettes\.web : false/);
  assert.match(catalog, /return isRealCigaretteItem\(item\)/);
  assert.match(route, /isCigaretteItemHidden\(item, cigarettes\.tv\.show\)/);
  assert.match(tv, /readCigaretteTvHeader/);
  assert.match(tv, /setInterval\(loadData, 5\*60\*1000\)/);
  assert.match(tv2, /readCigaretteTvHeader/);
  assert.match(tv2, /isRealCigaretteItem/);
  assert.match(tv2, /setInterval\(loadData, 5\*60\*1000\)/);
  assert.doesNotMatch(tv, /SHOW_CIGARETTES/);
  assert.doesNotMatch(tv2, /SHOW_CIGARETTES/);
});

test("a live-only carton item page is gated and a Backwoods item is not", () => {
  const page = readFileSync(new URL("../app/item/[slug]/page.tsx", import.meta.url), "utf8");
  const markers = readFileSync(new URL("../app/lib/cigMarkers.ts", import.meta.url), "utf8");
  const items = JSON.parse(readFileSync(new URL("../app/lib/items.json", import.meta.url), "utf8")) as Array<{ slug?: string }>;
  const belmont = { category: "CIGARETTES", name: "BELMONT KING SIZE (PACK ONLY)", slug: "belmont-king-size-pack-only" };
  const wrap = { category: "CIGARETTES", name: "HEMP WRAPS", slug: "hemp-wraps-live" };
  const cigarillo = { category: "CIGARETTES", name: "GRAPE CIGARILLO", slug: "grape-cigarillo-live" };
  const paper = { category: "ADD ONS", name: "RAW PAPER KING SIZE", slug: "raw-paper-king-size-live" };
  const zyn = { category: "CIGARETTES", name: "ZYN NICOTINE POUCHES", slug: "zyn-nicotine-pouches-live" };
  const velo = { category: "CIGARETTES", name: "VELO POUCH", slug: "velo-pouch-live" };
  const kept = [wrap, pouch, backwoods, cigarillo, paper, zyn, velo];

  assert.equal(items.some((item) => item.slug === carton.slug), false);
  assert.equal(items.some((item) => item.slug === belmont.slug), false);
  assert.equal(isRealCigaretteItem(carton), true);
  assert.equal(isItemPageCigaretteGated(carton, false), true);
  assert.equal(isItemPageCigaretteGated(belmont, false), true);
  assert.equal(isItemPageCigaretteGated(backwoods, false), false);
  assert.equal(isItemPageCigaretteGated(backwoods, true), false);
  for (const item of kept) {
    assert.equal(isItemPageCigaretteGated(item, false), false, item.slug);
    assert.equal(isItemPageCigaretteGated(item, true), false, item.slug);
  }

  assert.match(markers, /pathIsGated \|\| isRealCigaretteItem\(item\)/);
  assert.match(page, /isItemPageCigaretteGated\(item, isGatedCigarettePath\(`\/item\/\$\{item\.slug\}`\)\)/);
  assert.match(page, /toPublicCigaretteState\(await getCigaretteSnapshot\(\)\)\.web/);
  assert.match(page, /getWebGate\(\)\) === "unavailable" \|\| !websiteCigarettesOn/);
});
