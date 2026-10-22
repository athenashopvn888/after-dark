import { ARTICLE_PATH, ARTICLE_TITLE } from "../../resources/how-cannabis-delivery-works-ontario/articleMeta.ts";
import { RESOURCE_PAGES, slugFromPath } from "../../resources/resourceData.ts";
import type { CodedArticleLink } from "./articles.ts";

/** Coded /resources URLs. A fleet slug that matches one of these is omitted. */
export function codedArticleLinks(): CodedArticleLink[] {
  const links: CodedArticleLink[] = [];
  const seen = new Set<string>();
  for (const page of RESOURCE_PAGES) {
    const slug = slugFromPath(page.path);
    if (!slug || seen.has(slug)) continue;
    seen.add(slug);
    links.push({ slug, title: page.title, href: page.path });
  }
  const deliverySlug = slugFromPath(ARTICLE_PATH);
  if (deliverySlug && !seen.has(deliverySlug)) {
    links.push({ slug: deliverySlug, title: ARTICLE_TITLE, href: ARTICLE_PATH });
  }
  return links;
}

export function codedArticleSlugs(): Set<string> {
  return new Set(codedArticleLinks().map((link) => link.slug));
}
