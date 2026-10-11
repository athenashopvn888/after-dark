import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import ts from "typescript";
const read = (file) => fs.readFileSync(new URL(`../${file}`, import.meta.url), "utf8");
test("feed ranges use sale price per gram and source THC", () => {
  const output = ts.transpileModule(read("app/lib/tierPriceRanges.ts"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  const compiled = { exports: {} }; new Function("module", "exports", output)(compiled, compiled.exports);
  const ranges = compiled.exports;
  assert.equal(ranges.tierRangeText(ranges.storeTierRange([{ tier: "EXOTIC", thc: "35-39%", price3g: { regular: 42, sale: 36 }, price28g: { regular: 196 } }], "EXOTIC")), "From $7 to $12 a gram · THC about 35 to 39%");
  assert.equal(ranges.tierRangeText(ranges.storeTierRange([], "AA")), null);
});
test("price rules, labels, FAQ schema source, delivery ranges, and chat greeting are wired", () => {
  for (const file of ["app/HomePageClient.tsx", "app/[tier]/page.tsx"]) assert.match(read(file), /IN-STORE PRICES ONLY\./);
  assert.match(read("app/delivery/DeliveryContent.tsx"), /DELIVERY PRICES ONLY\./);
  assert.match(read("app/delivery/DeliveryContent.tsx"), /deliveryTierRanges\(products\)/);
  assert.match(read("app/faq/page.tsx"), /Can I get the store price on a delivery order\?/);
  assert.match(read("app/faq/page.tsx"), /FAQPage/);
  assert.match(read("app/delivery/AfterDarkWebChat.tsx"), /Delivery orders are charged these prices, not in-store prices\./);
});

test("tier pages show no range when live inventory is unavailable", () => {
  const page = read("app/[tier]/page.tsx");
  assert.doesNotMatch(page, /allFlowers/);
  assert.match(page, /catch\s*\{[\s\S]*?flowers:\s*\[\]/);
  assert.match(page, /rangeLine\s*\?/);

  const output = ts.transpileModule(read("app/lib/tierPriceRanges.ts"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  const compiled = { exports: {} }; new Function("module", "exports", output)(compiled, compiled.exports);
  assert.equal(compiled.exports.tierRangeText(compiled.exports.storeTierRange([], "PREMIUM")), null);
});
