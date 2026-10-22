import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { ARTICLE_MARKDOWN } from "../app/resources/how-cannabis-delivery-works-ontario/articleCopy.ts";
import {
  ARTICLE_CANONICAL,
  ARTICLE_DATE,
  ARTICLE_DESCRIPTION,
  ARTICLE_PATH,
  ARTICLE_TITLE,
} from "../app/resources/how-cannabis-delivery-works-ontario/articleMeta.ts";
import { articlePlainText, collectLinks, parseArticle } from "../app/resources/how-cannabis-delivery-works-ontario/parseArticle.ts";

function stripInline(line: string): string {
  return line.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*/g, "").replace(/\*/g, "");
}

function expectedPlain(markdown: string): string {
  return markdown
    .replace(/\r\n/g, "\n")
    .replace(/\n$/, "")
    .split("\n")
    .filter((line) => line.trim() !== "" && line.trim() !== "---")
    .map((line) => {
      if (line.startsWith("### ")) return stripInline(line.slice(4));
      if (line.startsWith("## ")) return stripInline(line.slice(3));
      if (line.startsWith("# ")) return stripInline(line.slice(2));
      if (line.startsWith("- ")) return stripInline(line.slice(2));
      if (/^\d+\. /.test(line)) return stripInline(line.replace(/^\d+\. /, ""));
      return stripInline(line);
    })
    .join("\n");
}

test("article body keeps the approved copy, last-checked line, and visit link", () => {
  assert.equal(articlePlainText(ARTICLE_MARKDOWN), expectedPlain(ARTICLE_MARKDOWN));
  assert.equal(parseArticle(ARTICLE_MARKDOWN).title, ARTICLE_TITLE);
  assert.match(ARTICLE_MARKDOWN, /^# What actually happens when a cannabis order is delivered in Ontario\n/);
  assert.match(ARTICLE_MARKDOWN, /Last checked: September 30, 2026\n/);
  assert.deepEqual(collectLinks(ARTICLE_MARKDOWN), [{ text: "visit page", href: "/visit" }]);
  assert.doesNotMatch(ARTICLE_MARKDOWN, /store_code|North York|AGCO|coupon|\$\d/);
});

test("page metadata, schema, sitemap, and resources card point at the new article", () => {
  const page = readFileSync("app/resources/how-cannabis-delivery-works-ontario/page.tsx", "utf8");
  const view = readFileSync("app/resources/ResourceView.tsx", "utf8");
  const sitemap = readFileSync("app/sitemap.ts", "utf8");
  const nextConfig = readFileSync("next.config.ts", "utf8");

  assert.equal(ARTICLE_PATH, "/resources/how-cannabis-delivery-works-ontario");
  assert.equal(ARTICLE_CANONICAL, "https://afterdarkcannabis.com/resources/how-cannabis-delivery-works-ontario");
  assert.equal(ARTICLE_DATE, "2026-10-22");
  assert.match(ARTICLE_DESCRIPTION, /hand-off/);
  assert.match(page, /title: \{ absolute: ARTICLE_TITLE \}/);
  assert.match(page, /canonical: ARTICLE_CANONICAL/);
  assert.match(page, /index: true/);
  assert.match(page, /follow: true/);
  assert.match(page, /"@type": "Article"/);
  assert.match(page, /headline: ARTICLE_TITLE/);
  assert.match(page, /datePublished: ARTICLE_DATE/);
  assert.match(page, /dateModified: ARTICLE_DATE/);
  assert.match(page, /name: "After Dark Cannabis"/);
  assert.doesNotMatch(page, /aggregateRating|reviewCount|Rating/);
  assert.match(view, /ARTICLE_PATH/);
  assert.match(view, /extraCards=\{page\.kind === "root" \? \[deliveryArticleCard\] : undefined\}/);
  assert.match(sitemap, /ARTICLE_CANONICAL/);
  assert.match(nextConfig, /source: "\/blog"/);
  assert.match(nextConfig, /source: "\/blog\/:path\*"/);
});
