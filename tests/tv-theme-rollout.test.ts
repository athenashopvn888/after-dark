import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";
import { getTvTheme, TV_THEMES } from "../app/tv-theme/theme.ts";

test("MJ01 theme assets and data entry are complete", async () => {
  assert.equal(getTvTheme("MJ01"), TV_THEMES.MJ01);
  for (const file of ["header.webp", "background.webp", "corner-left.png", "corner-right.png"]) {
    const info = await stat(`public/tv-theme/mj01/${file}`);
    assert.ok(info.size > 0 && info.size < 500 * 1024, `${file} must be below 500 KB`);
  }
});

test("QR placement and full-height rules remain scoped", async () => {
  const [tv,tv2,tvCss,tv2Css,qrCss] = await Promise.all([
    readFile("app/tv/page.tsx","utf8"), readFile("app/tv2/page.tsx","utf8"),
    readFile("app/tv/tv.module.css","utf8"), readFile("app/tv2/tv2.module.css","utf8"),
    readFile("app/TvReviewQr.module.css","utf8")
  ]);
  assert.match(tv, /<TvReviewQr storeName="After Dark Cannabis" \/>/);
  assert.doesNotMatch(tv, /CURRENT MENU ITEM/);
  assert.doesNotMatch(tv2, /TvReviewQr|SCAN FOR REVIEW/);
  assert.match(qrCss, /reviewQrChase 2s linear infinite/);
  assert.doesNotMatch(qrCss, /position:\s*fixed/);
  assert.match(tvCss, /data-tv-themed="true"[\s\S]*padding-bottom:140px/);
  assert.match(tv2Css, /data-tv-themed="true"[\s\S]*padding-bottom:140px/);
});

test("both boards preserve centered 3840 by 2160 scaling", async () => {
  for (const file of ["app/tv/page.tsx","app/tv2/page.tsx"]) {
    const page = await readFile(file,"utf8");
    assert.match(page, /Math\.min\(W\s*\/\s*3840, H\s*\/\s*2160\)/);
    assert.match(page, /Math\.round\(\(W - 3840\*s\)\/2\)/);
  }
});

