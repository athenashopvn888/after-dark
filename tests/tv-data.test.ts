import test from "node:test";
import assert from "node:assert/strict";
import {
  fetchProductFeed,
  LIVE_PRODUCT_REVALIDATE_SECONDS,
  mergeProductDisplayOverrides,
} from "../app/lib/liveProductFeed.ts";

const freshStockDate = "2030-01-01T00:00:00.000Z";
const snapshotAsOf = "2026-07-29T00:00:00.000Z";
const fallbackItems = [{ sku: "fallback-item", name: "Fallback item" }];
const fallbackFlowers = [{ sku: "fallback-flower", name: "Fallback flower" }];
const approvedBudgetFlowers = [
  "105",
  "106",
  "107",
  "112",
  "115",
  "172",
  "184",
  "185",
  "186",
  "187",
  "392",
  "396",
].map((sku) => ({
  sku,
  name: `Approved Budget ${sku}`,
  tier: "BUDGET",
}));
const approvedPairedTierFlowers = [
  { sku: "392", name: "Approved AAA+ 392", tier: "AAA+" },
  { sku: "396", name: "Approved AAA+ 396", tier: "AAA+" },
];
const approvedFlowerDisplayRows = [
  ...approvedBudgetFlowers,
  ...approvedPairedTierFlowers,
];

function responseJson(value: unknown, status = 200): Response {
  return new Response(JSON.stringify(value), {
    status,
    headers: { "content-type": "application/json" },
  });
}

test("missing endpoint uses checked-in snapshots without fetching", async () => {
  let fetched = false;
  const result = await fetchProductFeed({
    endpoint: "",
    snapshotAsOf,
    fallbackItems,
    fallbackFlowers,
    fetcher: async () => {
      fetched = true;
      throw new Error("should not fetch");
    },
  });
  assert.equal(fetched, false);
  assert.equal(result.items, fallbackItems);
  assert.equal(result.flowers, fallbackFlowers);
  assert.deepEqual(result.sources, {
    items: "static-fallback",
    flowers: "static-fallback",
  });
});

test("fresh valid feed is selected and cached for four hours", async () => {
  const liveItems = [{ sku: "live-item", name: "Live item" }];
  const liveFlowers = [{ sku: "live-flower", name: "Live flower" }];
  let requestedUrl = "";
  let revalidate = 0;
  const result = await fetchProductFeed({
    endpoint: "https://example.test/feed",
    snapshotAsOf,
    fallbackItems,
    fallbackFlowers,
    fetcher: async (input, init) => {
      requestedUrl = String(input);
      revalidate = init?.next?.revalidate || 0;
      return responseJson({
        items: liveItems,
        flowers: liveFlowers,
        stockDate: freshStockDate,
      });
    },
  });
  assert.equal(requestedUrl, "https://example.test/feed?store=MJ01");
  assert.equal(revalidate, LIVE_PRODUCT_REVALIDATE_SECONDS);
  assert.equal(revalidate, 14_400);
  assert.deepEqual(result.items, liveItems);
  assert.deepEqual(result.flowers, liveFlowers);
  assert.deepEqual(result.sources, { items: "live", flowers: "live" });
});

test("stale successful payload cannot override a newer POS snapshot", async () => {
  const result = await fetchProductFeed({
    endpoint: "https://example.test/feed",
    snapshotAsOf,
    fallbackItems,
    fallbackFlowers,
    fetcher: async () =>
      responseJson({
        items: [{ sku: "stale-item", name: "Stale item" }],
        flowers: [{ sku: "stale-flower", name: "Stale flower" }],
        stockDate: "2026-07-28T16:39:41.000Z",
      }),
  });
  assert.equal(result.items, fallbackItems);
  assert.equal(result.flowers, fallbackFlowers);
  assert.deepEqual(result.sources, {
    items: "static-fallback",
    flowers: "static-fallback",
  });
});

test("invalid collection falls back independently from a fresh valid one", async () => {
  const liveFlowers = [{ sku: "live-flower", name: "Live flower" }];
  const result = await fetchProductFeed({
    endpoint: "https://example.test/feed",
    snapshotAsOf,
    fallbackItems,
    fallbackFlowers,
    fetcher: async () =>
      responseJson({
        items: [
          { sku: "duplicate", name: "One" },
          { sku: "duplicate", name: "Two" },
        ],
        flowers: liveFlowers,
        stockDate: freshStockDate,
      }),
  });
  assert.equal(result.items, fallbackItems);
  assert.deepEqual(result.flowers, liveFlowers);
  assert.deepEqual(result.sources, {
    items: "static-fallback",
    flowers: "live",
  });
});

test("flower feed accepts one active SKU displayed in multiple tiers", async () => {
  const liveFlowers = [
    { sku: "392", name: "RAINBOW KUSH", tier: "AAA+" },
    { sku: "392", name: "RAINBOW KUSH", tier: "BUDGET" },
  ];
  const result = await fetchProductFeed({
    endpoint: "https://example.test/feed",
    snapshotAsOf,
    fallbackItems,
    fallbackFlowers,
    fetcher: async () =>
      responseJson({
        items: [{ sku: "live-item", name: "Live item" }],
        flowers: liveFlowers,
        stockDate: freshStockDate,
      }),
  });
  assert.deepEqual(result.flowers, liveFlowers);
  assert.equal(result.sources.flowers, "live");
});

test("flower feed rejects a true duplicate with the same SKU and tier", async () => {
  const result = await fetchProductFeed({
    endpoint: "https://example.test/feed",
    snapshotAsOf,
    fallbackItems,
    fallbackFlowers,
    fetcher: async () =>
      responseJson({
        items: [{ sku: "live-item", name: "Live item" }],
        flowers: [
          { sku: "392", name: "RAINBOW KUSH", tier: "BUDGET" },
          { sku: "392", name: "RAINBOW KUSH", tier: "budget" },
        ],
        stockDate: freshStockDate,
      }),
  });
  assert.equal(result.flowers, fallbackFlowers);
  assert.equal(result.sources.flowers, "static-fallback");
});

test("all approved MJ01 Budget rows survive a newer live feed omission", async () => {
  const result = await fetchProductFeed({
    endpoint: "https://example.test/feed",
    snapshotAsOf,
    fallbackItems,
    fallbackFlowers,
    flowerDisplayOverrides: approvedFlowerDisplayRows,
    fetcher: async () =>
      responseJson({
        items: [{ sku: "live-item", name: "Live item" }],
        flowers: [{ sku: "live-flower", name: "Live flower", tier: "AA" }],
        stockDate: freshStockDate,
      }),
  });
  assert.deepEqual(result.flowers, [
    { sku: "live-flower", name: "Live flower", tier: "AA" },
    ...approvedFlowerDisplayRows,
  ]);
  assert.deepEqual(
    result.flowers
      .filter((flower) => flower.tier === "BUDGET")
      .map((flower) => flower.sku),
    approvedBudgetFlowers.map((flower) => flower.sku),
  );
  assert.equal(result.sources.flowers, "live");
  for (const sku of ["392", "396"]) {
    assert.deepEqual(
      result.flowers
        .filter((flower) => flower.sku === sku)
        .map((flower) => flower.tier)
        .sort(),
      ["AAA+", "BUDGET"],
    );
  }
});

test("approved display row replaces an incoming row with the same SKU and tier", () => {
  const approved = [
    { sku: "172", name: "LAVENDER KUSH", tier: "BUDGET" },
  ];
  assert.deepEqual(
    mergeProductDisplayOverrides(
      [{ sku: "172", name: "stale name", tier: "budget" }],
      approved,
    ),
    approved,
  );
});

test("newer live rows update matching approved identities without duplicates", async () => {
  const liveBudget = approvedBudgetFlowers.map((flower) => ({
    ...flower,
    name: `Newer ${flower.sku}`,
  }));
  const liveFlowers = [
    { sku: "392", name: "RAINBOW KUSH", tier: "AAA+" },
    { sku: "396", name: "KHALIFA KUSH", tier: "AAA+" },
    ...liveBudget,
  ];
  const result = await fetchProductFeed({
    endpoint: "https://example.test/feed",
    snapshotAsOf,
    fallbackItems,
    fallbackFlowers,
    flowerDisplayOverrides: approvedFlowerDisplayRows,
    fetcher: async () =>
      responseJson({
        items: [{ sku: "live-item", name: "Live item" }],
        flowers: liveFlowers,
        stockDate: freshStockDate,
      }),
  });
  assert.deepEqual(result.flowers, liveFlowers);
  assert.equal(
    result.flowers.filter(
      (flower) => flower.sku === "392" && flower.tier === "BUDGET",
    ).length,
    1,
  );
  assert.equal(
    result.flowers.filter(
      (flower) => flower.sku === "392" && flower.tier === "AAA+",
    ).length,
    1,
  );
});

test("network failure preserves both static snapshots", async () => {
  const result = await fetchProductFeed({
    endpoint: "https://example.test/feed",
    snapshotAsOf,
    fallbackItems,
    fallbackFlowers,
    fetcher: async () => {
      throw new Error("offline");
    },
  });
  assert.equal(result.items, fallbackItems);
  assert.equal(result.flowers, fallbackFlowers);
});
