import type { Metadata } from "next";
import ResourceView from "./ResourceView";
import { AUTHORS, RESOURCE_HOME, SITE } from "./resourceData";

export const metadata: Metadata = buildResourceMetadata(RESOURCE_HOME);

export default function ResourcesPage() {
  return <ResourceView page={RESOURCE_HOME} />;
}

function buildResourceMetadata(page: typeof RESOURCE_HOME): Metadata {
  const canonical = `${SITE.baseUrl}${page.path}`;
  const author = AUTHORS[page.author];

  return {
    title: { absolute: page.seoTitle },
    description: page.metaDescription,
    keywords: [page.primaryKeyword, ...page.supportingKeywords],
    alternates: { canonical },
    openGraph: {
      type: "website",
      title: page.seoTitle,
      description: page.metaDescription,
      url: canonical,
      siteName: SITE.name,
      images: [{ url: `${SITE.baseUrl}${page.image.src}`, width: 1200, height: 630, alt: page.image.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.seoTitle,
      description: page.metaDescription,
      images: [`${SITE.baseUrl}${page.image.src}`],
    },
    authors: [{ name: author.name }],
  };
}
