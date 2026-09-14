import test from "node:test";
import assert from "node:assert/strict";
import { buildTierCollectionJsonLd } from "../app/lib/tierStructuredData.ts";

test("tier collection schema preserves visible product order without volatile offer fields", () => {
  const jsonLd = buildTierCollectionJsonLd({
    canonicalPath: "/exotic-weed",
    name: "Exotic Weed & Cannabis Flower in York",
    description: "Exotic flower collection.",
    flowers: [
      { name: "Sale First", slug: "sale-first" },
      { name: "Regular Second", slug: "regular-second" },
    ] as never,
  });

  const collection = jsonLd["@graph"][0];
  const list = jsonLd["@graph"][1];

  assert.equal(collection["@type"], "CollectionPage");
  assert.deepEqual(collection.about, { "@id": "https://afterdarkcannabis.com/#store" });
  assert.deepEqual(collection.isPartOf, { "@id": "https://afterdarkcannabis.com/#website" });
  assert.equal(list["@type"], "ItemList");
  assert.equal(list.numberOfItems, 2);
  assert.deepEqual(list.itemListElement, [
    {
      "@type": "ListItem",
      position: 1,
      name: "Sale First",
      url: "https://afterdarkcannabis.com/flower/sale-first",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Regular Second",
      url: "https://afterdarkcannabis.com/flower/regular-second",
    },
  ]);
  assert.equal(JSON.stringify(jsonLd).includes("Offer"), false);
  assert.equal(JSON.stringify(jsonLd).includes("availability"), false);
  assert.equal(JSON.stringify(jsonLd).includes("price"), false);
});
