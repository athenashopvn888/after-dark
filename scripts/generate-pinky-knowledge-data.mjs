import fs from "node:fs";
import path from "node:path";

const sourcePath = process.argv[2];
if (!sourcePath) throw new Error("Pass the corrected PINKY master path as the first argument.");

const source = fs.readFileSync(sourcePath, "utf8").replace(/\r\n/g, "\n");
const sectionNumbers = [5, 6, 7, 8, 9, 10, 11, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37];
const routeLinks = {
  "/resources/cannabis-dispensary-vs-weed-dispensary": [
    ["After Dark Cannabis Weed Dispensary in York", "/weed-dispensary-york"],
    ["Cannabis Flower Quality & Tiers", "/resources/cannabis-flower-quality-tiers"],
  ],
  "/resources/cannabis-101": [
    ["Your First Cannabis Dispensary Visit", "/resources/first-cannabis-dispensary-visit"],
    ["Weed Slang Explained", "/resources/weed-quality-slang"],
    ["Indica vs Sativa vs Hybrid", "/resources/indica-sativa-hybrid"],
    ["Strain vs Cultivar", "/resources/strain-vs-cultivar"],
    ["THC vs Weed Quality", "/resources/thc-vs-weed-quality"],
    ["Flower Guides", "/resources/flower-guides"],
  ],
  "/resources/flower-guides": [
    ["What Makes Good Weed?", "/resources/what-is-good-weed"],
    ["Cannabis Flower Quality & Tiers", "/resources/cannabis-flower-quality-tiers"],
    ["Top Shelf vs Mids vs Quads", "/resources/top-shelf-mids-quads-aaaa-aaa-aa"],
    ["Cannabis Bag Appeal", "/resources/cannabis-bag-appeal"],
    ["Frosty Weed and Trichomes", "/resources/frosty-weed-trichomes"],
    ["Cannabis Aroma and Terpenes", "/resources/cannabis-aroma-terpenes-gas-loud-dank"],
    ["Fresh vs Dry Weed", "/resources/fresh-dry-weed-curing-storage"],
    ["Smalls vs Big Buds", "/resources/smalls-vs-big-buds"],
    ["BC Grown and Growing Methods", "/resources/bc-grown-indoor-hydroponic-outdoor-cannabis"],
    ["Craft vs Commercial Cannabis", "/resources/craft-vs-commercial-cannabis"],
    ["Indica vs Sativa vs Hybrid", "/resources/indica-sativa-hybrid"],
    ["Strain vs Cultivar", "/resources/strain-vs-cultivar"],
    ["Landrace vs Hybrid", "/resources/landrace-vs-hybrid"],
    ["Exotic Weed", "/exotic-weed"], ["Premium Weed", "/premium-weed"],
    ["AAA+ Weed", "/aaa-weed"], ["AA Weed", "/aa-weed"], ["Budget Weed", "/budget-weed"],
  ],
  "/resources/native-cigarettes-ontario": [["Native Cigarettes in York", "/info/native-cigarettes-york"]],
  "/resources/indica-sativa-hybrid": [["Strain vs Cultivar", "/resources/strain-vs-cultivar"], ["Landrace vs Hybrid", "/resources/landrace-vs-hybrid"]],
  "/resources/strain-vs-cultivar": [["Indica vs Sativa vs Hybrid", "/resources/indica-sativa-hybrid"], ["Landrace vs Hybrid", "/resources/landrace-vs-hybrid"]],
  "/resources/landrace-vs-hybrid": [["Indica vs Sativa vs Hybrid", "/resources/indica-sativa-hybrid"], ["Strain vs Cultivar", "/resources/strain-vs-cultivar"]],
  "/resources/what-is-good-weed": [["Flower Quality & Tiers", "/resources/cannabis-flower-quality-tiers"], ["Top Shelf vs Mids vs Quads", "/resources/top-shelf-mids-quads-aaaa-aaa-aa"], ["Fresh vs Dry Weed", "/resources/fresh-dry-weed-curing-storage"]],
  "/resources/cannabis-bag-appeal": [["Frosty Weed and Trichomes", "/resources/frosty-weed-trichomes"], ["Cannabis Aroma and Terpenes", "/resources/cannabis-aroma-terpenes-gas-loud-dank"]],
  "/resources/frosty-weed-trichomes": [["Cannabis Bag Appeal", "/resources/cannabis-bag-appeal"], ["Cannabis Aroma and Terpenes", "/resources/cannabis-aroma-terpenes-gas-loud-dank"]],
  "/resources/fresh-dry-weed-curing-storage": [["What Makes Good Weed?", "/resources/what-is-good-weed"], ["Craft vs Commercial Cannabis", "/resources/craft-vs-commercial-cannabis"]],
};

const stripInline = (value) => value.replace(/\*\*([^*]+)\*\*/g, "$1").replace(/\*([^*]+)\*/g, "$1").replace(/`([^`]+)`/g, "$1").replace(/^>\s*/, "").trim();

const publicCopyReplacements = new Map([
  ["The useful question is not which phrase is “correct.” It is what each phrase tells us about the searcher's intent.", "The useful question is not which phrase is “correct.” It is what the person is trying to find or understand."],
  ["A website should therefore explain the language naturally rather than creating a separate thin page for every possible phrase.", "The terms can be explained together naturally."],
  ["When someone searches only for dispensary, the word is broad. When it is combined with terms such as cannabis, weed, York or “near me,” the local intent becomes much clearer.", "When someone searches only for dispensary, the word is broad. Combining it with terms such as cannabis, weed, York or “near me” makes the request more specific to a nearby cannabis business."],
  ["For After Dark Cannabis, the main York store page remains the correct destination for those visit details.", "For current After Dark Cannabis visit details, use the York store information."],
  ["For that reason, a good local page should not simply repeat “near me” over and over. It should give Google and the user concrete location information: a real store identity, a real address, useful visit details and clear links to the relevant menu or resource pages.", "Useful local information includes the real store name, location, current visit details and clear paths to the information a visitor may need."],
  ["The phrase signals local intent. The person is generally trying to identify a nearby business and confirm practical details such as location, hours and what sections are available to browse.", "The phrase usually means someone is trying to identify a nearby business and confirm practical details such as location, hours and what sections are available to browse."],
  ["After Dark Cannabis is located at 1664 Jane St, York, Ontario. The primary local store page should remain the source for current visit information.", "After Dark Cannabis is located at 1664 Jane St, York, Ontario. For current visit information, use the York store page."],
  ["The wording differs, but the terms often overlap in normal search behaviour. A business should keep its true identity consistent rather than changing its name to match every keyword variation.", "The wording differs, but the terms often overlap in normal search behaviour. A business should keep its true identity consistent even when people use different search wording."],
  ["For SEO and education, that distinction is powerful because it lets After Dark answer the exact natural question — “what makes weed look good?” — without turning the answer into empty sales hype.", "That distinction helps answer a more useful question: what can make cannabis flower look appealing without treating appearance as proof of overall quality?"],
  ["That made “frosty” a natural cannabis keyword long before most consumers knew the word trichome.", "That made “frosty” a common cannabis slang term long before most consumers knew the word trichome."],
  ["A strong educational page should connect the two:", ""],
  ["That pattern — translate slang into useful science — is exactly how this Resource Centre should work.", ""],
  ["The website should explain aroma families without turning them into universal product promises.", "Aroma-family terms are most useful as descriptions, not universal product promises."],
  ["Because it is subjective, a serious educational page should translate the compliment into specifics.", "Because it is subjective, the compliment is more useful when translated into specifics."],
  ["At After Dark, Exotic is a named menu tier. The page should explain how that tier is positioned within the store rather than claim the word has one universal meaning.", "At After Dark, Exotic is a named menu tier, so its meaning comes from how the store positions that tier rather than a universal definition."],
  ["Aroma Is a Better Search Topic Than “Best Smell”", "Aroma Gives More Detail Than “Best Smell”"],
  ["The important SEO/content point is that curing is part of production quality.", "Curing is part of production quality."],
  ["A page that talks about Premium or Exotic flower without ever mentioning post-harvest handling is missing a major part of the story.", "Post-harvest handling is a major part of how Premium or Exotic flower is understood."],
  ["That is a useful Street-Smart rule:", "The practical rule is simple:"],
  ["Why Curing Deserves Its Own SEO Topic", "Why Curing Matters When Comparing Flower"],
  ["People use words such as smooth, harsh, fresh, dry, grassy, cured and sticky when talking about flower. Those are natural search terms tied to post-harvest quality.", "People use words such as smooth, harsh, fresh, dry, grassy, cured and sticky when talking about flower because they describe post-harvest condition."],
  ["Explaining drying and curing gives After Dark a better answer than simply calling a product “premium.” It shows why post-harvest work matters.", "Drying and curing help explain why post-harvest work matters beyond a simple “premium” label."],
  ["Why link this article from Premium and Exotic pages?", "Why does post-harvest handling matter across flower tiers?"],
  ["Should a tier page mention bud size?", "Does bud size define an entire flower tier?"],
  ["Only when the current batch information actually supports it. Do not hard-code a size claim across every product in a tier.", "Only when current batch information supports it. Bud size can vary, so it should not be treated as a fixed claim for every product in a tier."],
  ["That is why After Dark should avoid automatically applying “craft” to inventory just because it sounds premium. Use the word only when source truth supports it or when discussing the category generically.", "The term is most useful when it is supported by reliable product information or discussed as a general production category."],
  ["Keeping those ideas separate prevents another common keyword mash-up.", "Production scale and geographic origin are different concepts."],
  ["Why This Matters for SEO and Shoppers", "Why Both Words Still Appear"],
  ["Searchers still type:", "Both terms still appear in everyday conversations and product information:"],
  ["So the website should not erase the word.", ""],
  ["Instead, the article can naturally connect:", "The terms can be understood together:"],
  ["That builds a stronger cannabis entity vocabulary without keyword stuffing.", "Knowing the relationship makes menus and product descriptions easier to understand."],
  ["That means a website should avoid inventing lineage when it is not supplied by an authoritative product source.", "Lineage should not be assumed when it is not supplied by an authoritative product source."],
  ["If the source truth says only “Gelato,” for example, do not automatically add a specific parent cross unless the product/producer actually confirms it.", "If product information says only “Gelato,” for example, do not assume a specific parent cross unless the product or producer confirms it."],
  ["Search Language vs Technical Language", "Everyday Language vs. Technical Language"],
  ["For SEO, both terms are useful because they capture different audiences.", "Both terms appear because they are used by different audiences."],
  ["Strain is the high-frequency consumer term.", "Strain is the more familiar consumer term."],
  ["Should After Dark product pages say strain or cultivar?", "Why do menus use both strain and cultivar?"],
  ["Use the terminology supplied by the product/source truth, and educational pages can explain both terms.", "Strain is familiar consumer language, while cultivar is the more precise horticultural term. Product information may use either."],
  ["Why does this topic matter for a dispensary Resource Centre?", "Why does this terminology matter when reading a flower menu?"],
  ["After Dark's local page should remain the place for:", "Use the After Dark York store page to confirm the address, current hours, phone and visit information."],
  ["The Resource Centre should remain the place for:", "Use the Resource Centre to explore terminology, flower quality, genetics, cultivation and product education."],
  ["That separation keeps local SEO cleaner.", ""],
  ["Why “Near Me” Searchers Need a Different Page", "Using the York Store Page and Resource Centre"],
  ["Someone searching “weed dispensary near me” is usually solving a location problem, not asking for a 1,500-word genetics lesson.", "Someone searching “weed dispensary near me” is usually looking for practical local information."],
  ["That is why the first-visit article should link to the York store page for exact visit facts while keeping the education here.", "Use the York store page for current visit details and the Resource Centre for cannabis terminology and product education."],
  ["This separation protects both intents:", "These two paths keep practical trip information separate from longer educational guides."],
  ["local page = where/when/how to visit", ""],
  ["resource page = what the terminology means", ""],
  ["A visit-planning guide should never accidentally imply that cannabis consumption and driving belong together.", "Plan transportation that does not involve driving while impaired."],
  ["Use the current After Dark local/store page for exact address and hours rather than hard-coding mutable visit facts across every educational article.", "Use the current After Dark store page for the latest address and hours."],
]);

const publicationDates = new Map([
  ["/resources/cannabis-dispensary-vs-weed-dispensary", "2026-09-04"],
  ["/resources/cannabis-101", "2026-07-15"],
  ["/resources/flower-guides", "2026-07-15"],
]);

function applyPublicCopyCorrections(value) {
  if (typeof value === "string") return publicCopyReplacements.get(value) ?? value;
  if (Array.isArray(value)) return value.map(applyPublicCopyCorrections).filter((item) => item !== "");
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, applyPublicCopyCorrections(item)]));
  }
  return value;
}

function numberedSection(n) {
  const start = source.search(new RegExp(`^# ${n}\\.`, "m"));
  if (start < 0) throw new Error(`Missing section ${n}`);
  const tail = source.slice(start);
  const next = tail.slice(1).search(/^# \d+\./m);
  return next < 0 ? tail : tail.slice(0, next + 1);
}

function field(block, names) {
  for (const name of names) {
    const inline = block.match(new RegExp(`\\*\\*${name}:\\*\\*\\s*([^\\n]+)`, "i"));
    if (inline) return stripInline(inline[1]);
    const stacked = block.match(new RegExp(`\\*\\*${name}\\*\\*\\s{0,2}\\n+([^\\n]+)`, "i"));
    if (stacked) return stripInline(stacked[1]);
  }
  throw new Error(`Missing field ${names[0]}`);
}

function paragraphize(lines) {
  const body = [], bullets = [];
  let paragraph = [];
  const flush = () => { if (paragraph.length) body.push(stripInline(paragraph.join(" "))); paragraph = []; };
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) { flush(); continue; }
    if (/^(?:-{3,}|\*{3,}|_{3,})$/.test(line)) { flush(); continue; }
    if (/^(?:-|\d+\.)\s+/.test(line)) { flush(); bullets.push(stripInline(line.replace(/^(?:-|\d+\.)\s+/, ""))); }
    else if (/^\*\*(?:Internal links?|Links?):\*\*/i.test(line)) flush();
    else paragraph.push(line);
  }
  flush();
  return { body, ...(bullets.length ? { bullets } : {}) };
}

function parseBody(block) {
  let body = block.split(/## APPROVED BODY COPY\s*\n/i)[1];
  if (!body) throw new Error("Missing approved body copy");
  body = body.split(/^## REQUIRED PAGE GUARDRAILS/m)[0];
  const introLines = [], sections = [], faqs = [];
  let current = null, sub = null, inFaq = false;
  const flushSub = () => { if (sub && current) current.subsections.push({ heading: sub.heading, ...paragraphize(sub.lines) }); sub = null; };
  const flushSection = () => {
    flushSub();
    if (current) sections.push({ heading: current.heading, ...paragraphize(current.lines), ...(current.subsections.length ? { subsections: current.subsections } : {}) });
    current = null;
  };
  for (const raw of body.split("\n")) {
    const h2 = raw.match(/^## (.+)$/), h3 = raw.match(/^### (.+)$/);
    if (h2) { flushSection(); inFaq = /^(Frequently Asked Questions|FAQ)$/i.test(h2[1]); if (!inFaq) current = { heading: stripInline(h2[1]), lines: [], subsections: [] }; continue; }
    if (h3) {
      if (inFaq) faqs.push({ q: stripInline(h3[1]), lines: [] });
      else if (current) { flushSub(); sub = { heading: stripInline(h3[1]), lines: [] }; }
      continue;
    }
    if (inFaq) { if (faqs.length) faqs.at(-1).lines.push(raw); }
    else if (sub) sub.lines.push(raw);
    else if (current) current.lines.push(raw);
    else introLines.push(raw);
  }
  flushSection();
  return { intro: paragraphize(introLines).body, sections, faqs: faqs.map((faq) => ({ q: faq.q, a: paragraphize(faq.lines).body.join(" ") })) };
}

function parsePage(n) {
  const block = numberedSection(n);
  const route = field(block, ["ROUTE", "Preferred route"]);
  const seoTitle = field(block, ["SEO TITLE", "SEO title"]);
  const metaDescription = field(block, ["META DESCRIPTION", "Meta description"]);
  const h1 = field(block, ["H1"]);
  const title = h1.replace(/[?:].*$/, "");
  const cannabis101Children = new Set(["/resources/first-cannabis-dispensary-visit"]);
  const rootPages = new Set(["/resources/cannabis-dispensary-vs-weed-dispensary", "/resources/cannabis-101", "/resources/flower-guides", "/resources/native-cigarettes-ontario"]);
  const parent = rootPages.has(route) ? "/resources" : cannabis101Children.has(route) ? "/resources/cannabis-101" : "/resources/flower-guides";
  return applyPublicCopyCorrections({
    path: route, kind: [10, 11].includes(n) ? "category" : "article", parent,
    categoryLabel: n === 10 ? "Cannabis 101" : n === 11 ? "Flower Guides" : n === 9 ? "Ontario Tobacco Information" : "Cannabis Knowledge",
    title, seoTitle, metaDescription, h1, excerpt: metaDescription, primaryKeyword: h1, supportingKeywords: [],
    searchIntent: "Learn the approved After Dark cannabis terminology and education topic.", author: "team",
    datePublished: publicationDates.get(route) ?? "2026-09-05", dateModified: "2026-09-05",
    image: { src: n === 9 ? "/banners/06_Cigarettes.webp" : "/banners/after_dark_welcome_banner.webp", alt: `${title} guide from After Dark Cannabis` },
    ...parseBody(block),
    commercialLinks: (routeLinks[route] || []).map(([label, href]) => ({ label, href })),
    related: (routeLinks[route] || []).filter(([, href]) => href.startsWith("/resources/")).map(([, href]) => href),
  });
}

const pages = sectionNumbers.map(parsePage);
const output = `import type { ResourcePage } from "./resourceData";\n\n// Generated mechanically from the owner-approved corrected PINKY master.\n// Do not hand-edit supplied copy; regenerate from the approved source instead.\nexport const AUTHORITY_RESOURCE_PAGES: ResourcePage[] = ${JSON.stringify(pages, null, 2)};\n`;
const outputPath = path.resolve("app/resources/authorityResourceData.ts");
fs.writeFileSync(outputPath, output, "utf8");
console.log(`Generated ${pages.length} approved resource pages at ${outputPath}`);
