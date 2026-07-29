import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { TOP_TIER_BUNDLE_LABELS } from "../app/tv/bundleLabels.ts";

const tvPage = readFileSync(
  new URL("../app/tv/page.tsx", import.meta.url),
  "utf8",
);
const tvStyles = readFileSync(
  new URL("../app/tv/tv.module.css", import.meta.url),
  "utf8",
);

test("ADC top-three TV rows always use explicit equals-sign bundle labels", () => {
  assert.deepEqual(TOP_TIER_BUNDLE_LABELS, {
    price3g: "2G = 3G",
    price5g: "3G = 6G",
  });
  assert.match(tvPage, /TOP_TIER_BUNDLE_LABELS\.price3g/);
  assert.match(tvPage, /TOP_TIER_BUNDLE_LABELS\.price5g/);
  assert.doesNotMatch(tvPage, /f\.isSale\s*\?\s*"3G="/);
  assert.doesNotMatch(tvPage, /f\.isSale\s*\?\s*"6G="/);
  assert.doesNotMatch(tvPage, /2G-3G|3G-6G/);
});

test("ADC TV renders sale prices as old struck-through then new", () => {
  assert.match(
    tvPage,
    /pp\.sale !== null && pp\.sale !== pp\.regular/,
  );
  assert.match(tvPage, /<del className=\{styles\.oldPrice\}>/);
  assert.match(
    tvPage,
    /<b className=\{`\$\{styles\.salePrice\} \$\{color \|\| ''\}`\}>/,
  );
  assert.match(
    tvPage,
    /return <b className=\{color \|\| ''\}>\$\{pp\.regular\}<\/b>/,
  );
});

test("ADC TV sale prices use GPC solid red treatment without rainbow animation", () => {
  const saleRule = tvStyles.match(
    /\.rowSale \.salePrice\s*\{([^}]*)\}/,
  )?.[1];
  assert.ok(saleRule);
  assert.match(
    saleRule,
    /color:\s*#b91c1c\s*!important/,
  );
  assert.match(
    saleRule,
    /text-shadow:\s*0 0 10px rgba\(250,\s*204,\s*21,\s*0\.5\)/,
  );
  assert.doesNotMatch(tvStyles, /@keyframes saleHue/);
  assert.doesNotMatch(saleRule, /background:\s*linear-gradient/);
});
