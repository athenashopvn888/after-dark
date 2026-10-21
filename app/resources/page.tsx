import type { Metadata } from "next";
import ResourceView from "./ResourceView";
import { AUTHORS, publicResourcePage, RESOURCE_HOME, SITE } from "./resourceData";

const homePage = publicResourcePage(RESOURCE_HOME);

export const metadata: Metadata = buildResourceMetadata(homePage);

export default function ResourcesPage() {
  return <ResourceView page={homePage} />;
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
