const SITE_ORIGIN = "https://afterdarkcannabis.com";

export function buildCategoryCollectionJsonLd({ canonicalPath, name, description, items }: { canonicalPath: string; name: string; description: string; items: Array<{ name: string; slug: string }> }) {
  const url = `${SITE_ORIGIN}${canonicalPath}`;
  return { "@context": "https://schema.org", "@graph": [
    { "@type": "CollectionPage", "@id": `${url}#webpage`, url, name, description, isPartOf: { "@id": `${SITE_ORIGIN}/#website` }, about: { "@id": `${SITE_ORIGIN}/#store` }, mainEntity: { "@id": `${url}#itemlist` } },
    { "@type": "ItemList", "@id": `${url}#itemlist`, numberOfItems: items.length, itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, url: `${SITE_ORIGIN}/item/${item.slug}` })) },
  ] };
}
