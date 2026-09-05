import { AUTHORITY_RESOURCE_PAGES } from "../app/resources/authorityResourceData.ts";

const origin = process.argv[2] || "http://localhost:3410";
const failures = [];
const dynamicTierRoutes = new Set(["/exotic-weed", "/premium-weed", "/aaa-weed", "/aa-weed", "/budget-weed"]);
const decodeTitle = (value) => value.replaceAll("&amp;", "&").replaceAll("&quot;", '"').replaceAll("&#x27;", "'");

for (const page of AUTHORITY_RESOURCE_PAGES) {
  const response = await fetch(`${origin}${page.path}`);
  const html = await response.text();
  const title = decodeTitle(html.match(/<title>(.*?)<\/title>/s)?.[1] || "");
  const canonical = html.match(/<link rel="canonical" href="([^"]+)/)?.[1] || "";
  const h1Count = html.match(/<h1/g)?.length || 0;
  const noindex = /<meta name="robots" content="[^"]*noindex/i.test(html);

  if (
    response.status !== 200 ||
    title !== page.seoTitle ||
    canonical !== `https://afterdarkcannabis.com${page.path}` ||
    h1Count !== 1 ||
    noindex
  ) {
    failures.push({ path: page.path, status: response.status, title, canonical, h1Count, noindex });
  }

  for (const link of page.commercialLinks) {
    if (dynamicTierRoutes.has(link.href)) continue;
    const linked = await fetch(`${origin}${link.href}`, { redirect: "manual" });
    if (linked.status >= 400) failures.push({ path: page.path, brokenLink: link.href, status: linked.status });
  }
}

console.log(JSON.stringify({ pages: AUTHORITY_RESOURCE_PAGES.length, failures }, null, 2));
if (failures.length) process.exitCode = 1;
