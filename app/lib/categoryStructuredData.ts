import {
  buildCollectionPageItemListJsonLd,
  itemCanonicalUrl,
} from "./collectionPageSchema";

export function buildCategoryCollectionJsonLd({
  canonicalPath,
  name,
  description,
  items,
}: {
  canonicalPath: string;
  name: string;
  description: string;
  items: Array<{ name: string; slug: string }>;
}) {
  return buildCollectionPageItemListJsonLd({
    canonicalPath,
    name,
    description,
    items,
    itemUrl: (item) => itemCanonicalUrl(item.slug),
  });
}
