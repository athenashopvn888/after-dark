/**
 * Site-wide cigarette and tobacco visibility.
 * SHOW_CIGARETTES defaults to false. Set NEXT_PUBLIC_SHOW_CIGARETTES=true to restore every gated surface.
 */
const SHOW_CIGARETTES_DEFAULT = false;

function readShowCigarettes(value: string | undefined): boolean {
  if (value === undefined || value.trim() === "") return SHOW_CIGARETTES_DEFAULT;
  return value === "true" || value === "1";
}

export const SHOW_CIGARETTES = readShowCigarettes(process.env.NEXT_PUBLIC_SHOW_CIGARETTES);

/** Temporary redirect target while cigarette pages are hidden. */
export const VAPE_PAGE_PATH = "/vape-shop-york";

/** Native-cigarette guide slugs. Backwoods stays listed. */
export const HIDDEN_CIGARETTE_GUIDE_SLUGS = [
  "canadian-classics",
  "nexus-cigarettes",
  "canadian-goose",
  "putters",
  "time-cigarettes",
  "rolled-gold",
  "canadian-cigarettes",
  "grabba",
  "playfares",
  "bb-cigarettes",
  "dks-cigarettes",
  "belmont-king-size",
] as const;

const HIDDEN_GUIDE_SLUGS = new Set<string>(HIDDEN_CIGARETTE_GUIDE_SLUGS);

const HIDDEN_EXACT_PATHS = new Set<string>([
  "/cigarettes",
  "/items/cigarettes",
  "/native-cigarettes-york",
  "/info/native-cigarettes-york",
  "/resources/native-cigarettes-ontario",
  "/resources/native-smokes",
  "/resources/nicotine-pouches",
]);

export function isKeptSmokeAccessoryName(name: string, slug: string): boolean {
  const blob = `${name} ${slug}`.toLowerCase();
  if (blob.includes("backwood")) return true;
  if (blob.includes("cigarillo")) return true;
  if (blob.includes("rolling paper") || blob.includes("raw paper")) return true;
  return false;
}

export function isKeptSmokePath(pathname: string): boolean {
  const path = pathname.toLowerCase();
  return path.includes("backwood") || path.includes("cigarillo") || path.includes("rolling-paper") || path.includes("raw-paper");
}

function normalizePath(href: string): string {
  const path = href.split("?")[0].split("#")[0].replace(/\/+$/, "");
  return path || "/";
}

export function isHiddenCigaretteGuideSlug(slug: string): boolean {
  if (SHOW_CIGARETTES) return false;
  return HIDDEN_GUIDE_SLUGS.has(slug);
}

export function isHiddenCigaretteHref(href: string): boolean {
  if (SHOW_CIGARETTES) return false;
  const path = normalizePath(href);
  if (isKeptSmokePath(path)) return false;
  if (HIDDEN_EXACT_PATHS.has(path)) return true;
  if (path.startsWith("/guides/")) return HIDDEN_GUIDE_SLUGS.has(path.slice("/guides/".length));
  return false;
}

export function isCigaretteTopic(text: string): boolean {
  return /\bcigarettes?\b|\btobacco\b/i.test(text);
}

export function stripCigaretteMentions(input: string): string {
  let text = input;
  const replacements: Array<[RegExp, string]> = [
    [/Native cigarettes and nicotine vapes/gi, "Nicotine vapes"],
    [/native cigarettes and nicotine vapes/gi, "nicotine vapes"],
    [/Native cigarettes or nicotine vapes/gi, "nicotine vapes"],
    [/Overnight Native cigarettes and nicotine vapes/gi, "Overnight nicotine vapes"],
    [/, Native cigarettes,/g, ","],
    [/, native cigarettes,/g, ","],
    [/Native cigarettes, /g, ""],
    [/native cigarettes, /g, ""],
    [/edibles, vapes, concentrates, pre-rolls, cigarettes, rolling papers, and accessories/gi, "edibles, vapes, concentrates, pre-rolls, rolling papers, and accessories"],
    [/concentrates, pre-rolls, cigarettes, and accessories/gi, "concentrates, pre-rolls, and accessories"],
    [/pre-rolls, cigarettes, and accessories/gi, "pre-rolls, and accessories"],
    [/cigarettes, rolling papers, and accessories/gi, "rolling papers, and accessories"],
    [/pouches, cigarettes, Backwoods/gi, "pouches, Backwoods"],
    [/flower, pre-roll, edible, vape, concentrate, cigarette, and accessory/gi, "flower, pre-roll, edible, vape, concentrate, and accessory"],
    [/cigarettes, accessories, or magic\/specialty items/gi, "accessories, or magic/specialty items"],
    [/pre-rolled joints, native cigarettes, and accessories/gi, "pre-rolled joints, and accessories"],
    [/, Ontario tobacco information/gi, ""],
    [/ and cigarettes/gi, ""],
    [/cigarettes and /gi, ""],
    [/\bcigarettes?\b/gi, ""],
    [/\btobacco\b/gi, ""],
  ];
  for (const [pattern, replacement] of replacements) text = text.replace(pattern, replacement);
  return text
    .replace(/\/items\/cigarettes/g, "")
    .replace(/\/native-cigarettes-york/g, "")
    .replace(/\/info\/native-cigarettes-york/g, "")
    .replace(/\/resources\/native-cigarettes-ontario/g, "")
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([,.;:])/g, "$1")
    .replace(/,\s*,/g, ",")
    .replace(/\(\s*\)/g, "")
    .trim();
}

export function presentFaq<T extends { q: string; a: string }>(faq: T): T | null {
  if (SHOW_CIGARETTES) return faq;
  if (isCigaretteTopic(faq.q)) return null;
  if (/\/items\/cigarettes|\/native-cigarettes-york|\/info\/native-cigarettes-york|\/resources\/native-cigarettes/.test(faq.a)) return null;
  if (!isCigaretteTopic(faq.a)) return faq;
  const answer = stripCigaretteMentions(faq.a);
  if (!answer || isCigaretteTopic(answer) || answer.length < 24) return null;
  return { ...faq, a: answer };
}

export function presentFaqs<T extends { q: string; a: string }>(faqs: readonly T[]): T[] {
  return faqs.map((faq) => presentFaq(faq)).filter((faq): faq is T => faq !== null);
}
