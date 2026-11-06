import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { ARTICLE_MARKDOWN } from "../app/resources/how-to-clean-a-weed-grinder/articleCopy.ts";
import {
  ARTICLE_CANONICAL,
  ARTICLE_DATE,
  ARTICLE_DESCRIPTION,
  ARTICLE_PATH,
  ARTICLE_TITLE,
} from "../app/resources/how-to-clean-a-weed-grinder/articleMeta.ts";
import { articlePlainText, collectLinks, parseArticle } from "../app/resources/how-to-clean-a-weed-grinder/parseArticle.ts";

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

test("article body keeps the approved copy, last-checked line, and resource links", () => {
  assert.equal(articlePlainText(ARTICLE_MARKDOWN), expectedPlain(ARTICLE_MARKDOWN));
  assert.equal(parseArticle(ARTICLE_MARKDOWN).title, ARTICLE_TITLE);
  assert.match(ARTICLE_MARKDOWN, /^# How to Clean a Weed Grinder: The Jane Street Step-by-Step\n/);
  assert.match(ARTICLE_MARKDOWN, /Last checked: October 30, 2026\n/);
  assert.deepEqual(collectLinks(ARTICLE_MARKDOWN), [
    { text: "smalls vs big buds", href: "/resources/smalls-vs-big-buds" },
    { text: "frosty weed and trichomes", href: "/resources/frosty-weed-trichomes" },
  ]);
  assert.equal(ARTICLE_DESCRIPTION.length <= 155, true);
  assert.doesNotMatch(ARTICLE_MARKDOWN, /3\.5|coupon|\$\d|Farmers Link/);
  assert.doesNotMatch(ARTICLE_DESCRIPTION, /3\.5|coupon|\$\d|Farmers Link/);
});

test("page metadata, schema, and sitemap point at the new article", () => {
  const page = readFileSync("app/resources/how-to-clean-a-weed-grinder/page.tsx", "utf8");
  const sitemap = readFileSync("app/sitemap.ts", "utf8");
  const nextConfig = readFileSync("next.config.ts", "utf8");

  assert.equal(ARTICLE_PATH, "/resources/how-to-clean-a-weed-grinder");
  assert.equal(ARTICLE_CANONICAL, "https://afterdarkcannabis.com/resources/how-to-clean-a-weed-grinder");
  assert.equal(ARTICLE_DATE, "2026-11-06");
  assert.equal(ARTICLE_TITLE, "How to Clean a Weed Grinder: The Jane Street Step-by-Step");
  assert.match(page, /title: \{ absolute: ARTICLE_TITLE \}/);
  assert.match(page, /canonical: ARTICLE_CANONICAL/);
  assert.match(page, /index: true/);
  assert.match(page, /follow: true/);
  assert.match(page, /"@type": "Article"/);
  assert.match(page, /headline: ARTICLE_TITLE/);
  assert.match(page, /datePublished: ARTICLE_DATE/);
  assert.match(page, /dateModified: ARTICLE_DATE/);
  assert.match(page, /mainEntityOfPage: ARTICLE_CANONICAL/);
  assert.match(page, /name: "After Dark Cannabis"/);
  assert.match(page, /<h1>\{ARTICLE_TITLE\}<\/h1>/);
  assert.doesNotMatch(page, /BreadcrumbList|aggregateRating|reviewCount|Rating|Offer|Product/);
  assert.match(sitemap, /GRINDER_CANONICAL/);
  assert.doesNotMatch(nextConfig, /how-to-clean-a-weed-grinder/);
});
