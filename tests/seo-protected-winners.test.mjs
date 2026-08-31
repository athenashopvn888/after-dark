import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const tierPage = await readFile(new URL("../app/[tier]/page.tsx", import.meta.url), "utf8");

test("tier metadata emits a self-canonical and matching Open Graph URL", () => {
  assert.match(tierPage, /const SITE_ORIGIN = "https:\/\/afterdarkcannabis\.com"/);
  assert.match(tierPage, /canonical: `\$\{SITE_ORIGIN\}\/\$\{tierSlug\}`/);
  assert.match(tierPage, /url: `\$\{SITE_ORIGIN\}\/\$\{tierSlug\}`/);
});

