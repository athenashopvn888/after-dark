import { AUTHORITY_RESOURCE_PAGES } from "../app/resources/authorityResourceData.ts";

const origin = process.argv[2] || "http://localhost:3410";
const failures = [];
const dynamicTierRoutes = new Set(["/exotic-weed", "/premium-weed", "/aaa-weed", "/aa-weed", "/budget-weed"]);
const checkedLinks = new Map();
const decodeHtml = (value) => value
  .replace(/<[^>]*>/g, "")
  .replaceAll("&amp;", "&")
  .replaceAll("&quot;", '"')
  .replaceAll("&#x27;", "'")
  .replaceAll("&apos;", "'")
  .replaceAll("&nbsp;", " ")
  .replaceAll("&ldquo;", "“")
  .replaceAll("&rdquo;", "”")
  .replaceAll("&rsquo;", "’")
  .trim();

const blockedPublicPhrases = [
  "for seo",
  "seo/content",
  "keyword mash-up",
  "keyword stuffing",
  "search volume",
  "source truth",
  "hard-code",
  "hard-coding",
  "website should",
  "educational page should",
  "the page should explain",
  "resource centre should remain",
  "local seo",
  "keyword variation",
  "search topic",
  "street-smart rule",
];

for (const page of AUTHORITY_RESOURCE_PAGES) {
  const response = await fetch(`${origin}${page.path}`);
  const html = await response.text();
  const title = decodeHtml(html.match(/<title>(.*?)<\/title>/s)?.[1] || "");
  const description = decodeHtml(html.match(/<meta name="description" content="([^"]*)"/)?.[1] || "");
  const canonical = html.match(/<link rel="canonical" href="([^"]+)/)?.[1] || "";
  const h1Count = html.match(/<h1/g)?.length || 0;
  const h1 = decodeHtml(html.match(/<h1[^>]*>(.*?)<\/h1>/s)?.[1] || "");
  const noindex = /<meta name="robots" content="[^"]*noindex/i.test(html);
  const markdownLeak = /(?:^|[\s>])(?:-{3,}|\*{3,}|_{3,})(?:[\s<]|$)/m.test(html);
  const normalizedHtml = decodeHtml(html).toLowerCase();
  const exposedWorkflow = blockedPublicPhrases.filter((phrase) => normalizedHtml.includes(phrase));
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)]
    .map((match) => {
      try { return JSON.parse(match[1]); } catch { return null; }
    })
    .filter(Boolean);
  const faqSchema = schemas.some((schema) =>
    (schema?.["@graph"] || []).some((entry) =>
      entry?.["@type"] === "FAQPage" && entry.mainEntity?.length === page.faqs?.length));

  if (
    response.status !== 200 ||
    title !== page.seoTitle ||
    description !== page.metaDescription ||
    canonical !== `https://afterdarkcannabis.com${page.path}` ||
    h1Count !== 1 ||
    h1 !== page.h1 ||
    noindex ||
    markdownLeak ||
    exposedWorkflow.length > 0 ||
    !faqSchema
  ) {
    failures.push({ path: page.path, status: response.status, title, description, canonical, h1Count, h1, noindex, markdownLeak, exposedWorkflow, faqSchema });
  }

  const internalLinks = [...html.matchAll(/href="(\/[^"]*)"/g)].map((match) => match[1].split("#")[0]);
  for (const href of new Set([...page.commercialLinks.map((link) => link.href), ...internalLinks])) {
    if (!href || checkedLinks.has(href)) continue;
    const linked = await fetch(`${origin}${href}`);
    checkedLinks.set(href, linked.status);
    if (linked.status >= 400) failures.push({ path: page.path, brokenLink: href, status: linked.status });
  }
}

for (const route of dynamicTierRoutes) {
  const linked = await fetch(`${origin}${route}`);
  checkedLinks.set(route, linked.status);
  if (linked.status >= 400) failures.push({ protectedTier: route, status: linked.status });
}

console.log(JSON.stringify({ pages: AUTHORITY_RESOURCE_PAGES.length, linksChecked: checkedLinks.size, failures }, null, 2));
if (failures.length) process.exitCode = 1;
