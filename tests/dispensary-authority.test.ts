import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const resources = await readFile(new URL("../app/resources/resourceData.ts", import.meta.url), "utf8");
const route = await readFile(new URL("../app/resources/[...slug]/page.tsx", import.meta.url), "utf8");

test("MJ01 dispensary authority page preserves exact identity and supports the York local owner", () => {
  assert.match(resources, /path: "\/resources\/cannabis-dispensary-vs-weed-dispensary"/);
  assert.match(resources, /seoTitle: "Cannabis Dispensary vs Weed Dispensary \| After Dark York"/);
  assert.match(resources, /h1: "Cannabis Dispensary vs\. Weed Dispensary: What's the Difference\?"/);
  assert.match(resources, /href: "\/info\/dispensary-near-me-york"/);
  assert.match(resources, /parent: "\/resources"/);
  assert.match(route, /alternates: \{ canonical \}/);
  assert.match(route, /title: \{ absolute: page\.seoTitle \}/);
});
