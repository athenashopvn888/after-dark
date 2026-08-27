import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { NICOTINE_VAPES_YORK_CARDS } from "../app/lib/nicotineVapesYork.ts";

const expectedSlugs = [
  "nexa-pix-30k-puffs-many-flavors",
  "ovns-10000-5-10k-puffs",
  "ovns-disposable-5-8ml-many-flavors",
  "uwell-caliburn-pod",
];

test("reduced-card data contains exactly the four audited products", () => {
  assert.equal(NICOTINE_VAPES_YORK_CARDS.length, 4);
  assert.deepEqual(NICOTINE_VAPES_YORK_CARDS.map((item) => item.slug), expectedSlugs);
  assert.ok(NICOTINE_VAPES_YORK_CARDS.every((item) => item.href === "/items/vapes"));
  assert.ok(NICOTINE_VAPES_YORK_CARDS.every((item) => item.image.startsWith("https://pub-eb3e1fe18a43477eabc885cfb791d97c.r2.dev/products/")));
});

test("page copy preserves the nicotine boundary and required warning", () => {
  const source = readFileSync(new URL("../app/info/nicotine-vapes-york/page.tsx", import.meta.url), "utf8");
  assert.match(source, /Nicotine is addictive\./);
  assert.match(source, /\/items\/vape-disposables are excluded/);
  assert.match(source, /showMenuSection=\{false\}/);
  assert.doesNotMatch(source, /listed prices|available in-store|current selection/i);
  for (const excluded of [
    "geek-promax-5-30k-puffs",
    "geek-universe-25k-puffs",
    "ovns-pioneer-5-22k-puffs",
    "stlth-type-c-device",
    "vice-disposable-25k",
  ]) {
    assert.doesNotMatch(source, new RegExp(excluded));
  }
});
