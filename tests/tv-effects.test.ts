import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  DEFAULT_EFFECTS,
  SATIVA_EFFECTS,
  getFlowerEffects,
} from "../app/tv/flowerEffects.ts";

const tvPage = readFileSync(
  new URL("../app/tv/page.tsx", import.meta.url),
  "utf8",
);

test("ADC TV uses the original Sativa effects mapping", () => {
  assert.deepEqual(SATIVA_EFFECTS, [
    ["⚡", "Energy"],
    ["🧠", "Cerebral"],
    ["🚀", "Uplift"],
  ]);
  assert.strictEqual(getFlowerEffects("sativa"), SATIVA_EFFECTS);
  assert.strictEqual(getFlowerEffects("SATIVA"), SATIVA_EFFECTS);
});

test("ADC TV uses the original Indica/default effects mapping", () => {
  assert.deepEqual(DEFAULT_EFFECTS, [
    ["🛋️", "Couch Lock"],
    ["😌", "Relax"],
    ["🌙", "Sleepy"],
  ]);
  for (const type of ["indica", "hybrid", "", "unknown"]) {
    assert.strictEqual(getFlowerEffects(type), DEFAULT_EFFECTS);
  }
});

test("every rotating VibeCard renders EFFECTS without placeholder labels", () => {
  assert.match(tvPage, /<div className=\{styles\.vibeHead\}>EFFECTS<\/div>/);
  assert.match(tvPage, /const vibes = getFlowerEffects\(type\)/);
  assert.equal((tvPage.match(/<VibeCard type=\{hi\.type\} \/>/g) ?? []).length, 2);
  assert.doesNotMatch(
    tvPage,
    /PRODUCT DETAILS|Package Details|Current Menu/,
  );
});
