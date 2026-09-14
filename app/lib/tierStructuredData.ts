import type { FlowerProduct } from "./products";

const SITE_ORIGIN = "https://afterdarkcannabis.com";

export function buildTierCollectionJsonLd({
  canonicalPath,
  name,
  description,
  flowers,
}: {
  canonicalPath: string;
  name: string;
  description: string;
  flowers: FlowerProduct[];
}) {
  const url = `${SITE_ORIGIN}${canonicalPath}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#webpage`,
        url,
        name,
        description,
        isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
        about: { "@id": `${SITE_ORIGIN}/#store` },
        mainEntity: { "@id": `${url}#itemlist` },
      },
      {
        "@type": "ItemList",
        "@id": `${url}#itemlist`,
        numberOfItems: flowers.length,
        itemListElement: flowers.map((flower, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: flower.name,
          url: `${SITE_ORIGIN}/flower/${flower.slug}`,
        })),
      },
    ],
  };
}
