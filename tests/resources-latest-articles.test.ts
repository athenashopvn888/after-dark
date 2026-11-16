import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  ARTICLE_DESCRIPTION as AUTOFLOWER_DESCRIPTION,
  ARTICLE_PATH as AUTOFLOWER_PATH,
  ARTICLE_TITLE as AUTOFLOWER_TITLE,
} from "../app/resources/autoflower-vs-photoperiod-cannabis/articleMeta.ts";
import {
  ARTICLE_DESCRIPTION as GRINDER_DESCRIPTION,
  ARTICLE_PATH as GRINDER_PATH,
  ARTICLE_TITLE as GRINDER_TITLE,
} from "../app/resources/how-to-clean-a-weed-grinder/articleMeta.ts";

function slicePage(source: string, path: string, nextPath: string): string {
  const start = source.indexOf(`"path": "${path}"`);
  const end = source.indexOf(`"path": "${nextPath}"`);
  assert.ok(start >= 0 && end > start, `missing page slice ${path}`);
  return source.slice(start, end);
}

test("resources hub keeps its sections and lists the live orphan articles", () => {
  const data = readFileSync("app/resources/resourceData.ts", "utf8");
  const view = readFileSync("app/resources/ResourceView.tsx", "utf8");
  const latest = data.slice(data.indexOf('heading: "Latest articles"'), data.indexOf("commercialLinks:", data.indexOf('heading: "Latest articles"')));

  assert.match(data, /heading: "Cannabis Basics and Flower Knowledge"/);
  assert.match(data, /label: "Cannabis 101", href: "\/resources\/cannabis-101"/);
  assert.match(data, /label: "Cannabis Dispensary vs\. Weed Dispensary", href: "\/resources\/cannabis-dispensary-vs-weed-dispensary"/);
  assert.match(data, /label: "Flower Guides", href: "\/resources\/flower-guides"/);
  assert.match(data, /heading: "Ontario Tobacco Information"/);
  assert.match(view, /section\.links && <LinkList links=\{section\.links\} \/>/);
  assert.match(view, /extraCards=\{page\.kind === "root" \? \[deliveryArticleCard\] : undefined\}/);

  assert.match(latest, /label: GRINDER_TITLE/);
  assert.match(latest, /href: GRINDER_PATH/);
  assert.match(latest, /description: GRINDER_DESCRIPTION/);
  assert.match(latest, /label: AUTOFLOWER_TITLE/);
  assert.match(latest, /href: AUTOFLOWER_PATH/);
  assert.match(latest, /description: AUTOFLOWER_DESCRIPTION/);
  assert.doesNotMatch(latest, /how-cannabis-delivery-works-ontario/);
  assert.equal(GRINDER_TITLE, "How to Clean a Weed Grinder: The Jane Street Step-by-Step");
  assert.equal(GRINDER_PATH, "/resources/how-to-clean-a-weed-grinder");
  assert.equal(GRINDER_DESCRIPTION.includes("\n"), false);
  assert.match(GRINDER_DESCRIPTION, /how to clean a weed grinder/i);
  assert.equal(AUTOFLOWER_TITLE, "Autoflower vs Photoperiod: How Cannabis Decides When to Flower");
  assert.equal(AUTOFLOWER_PATH, "/resources/autoflower-vs-photoperiod-cannabis");
  assert.equal(AUTOFLOWER_DESCRIPTION.includes("\n"), false);
  assert.match(AUTOFLOWER_DESCRIPTION, /days to get shorter/);
  assert.match(latest, /Adults 19\+/);
  assert.doesNotMatch(latest, /3\.5|\+1|\(\d{3}\)/);
});

test("flower guides adds one grinder link and does not repeat the article outbound targets", () => {
  const authority = readFileSync("app/resources/authorityResourceData.ts", "utf8");
  const flower = slicePage(authority, "/resources/flower-guides", "/resources/what-is-good-weed");
  const cannabis101 = slicePage(authority, "/resources/cannabis-101", "/resources/flower-guides");
  const grinderBlock = flower.slice(flower.lastIndexOf("GRINDER_TITLE") - 20);

  assert.equal(flower.split("GRINDER_PATH").length - 1, 1);
  assert.match(grinderBlock, /"label": GRINDER_TITLE/);
  assert.match(grinderBlock, /"href": GRINDER_PATH/);
  assert.match(grinderBlock, /"description": GRINDER_DESCRIPTION/);
  assert.equal(cannabis101.includes("GRINDER_"), false);
  assert.equal(cannabis101.includes(GRINDER_PATH), false);
  assert.equal(flower.split("/resources/smalls-vs-big-buds").length - 1, 2);
  assert.equal(flower.split("/resources/frosty-weed-trichomes").length - 1, 2);
  assert.equal(flower.includes("dateModified\": \"2026-09-05\"") || flower.includes('"dateModified": "2026-09-05"'), true);
});
