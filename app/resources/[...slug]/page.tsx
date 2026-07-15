import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ResourceView from "../ResourceView";
import {
  AUTHORS,
  SITE,
  getResourcePageBySlug,
  getStaticResourceParams,
  type ResourcePage,
} from "../resourceData";

type PageParams = Promise<{ slug?: string[] }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return getStaticResourceParams();
}

export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const { slug } = await params;
  const page = getResourcePageBySlug(slug);
  if (!page) return {};
  return buildResourceMetadata(page);
}

export default async function ResourceRoute({ params }: { params: PageParams }) {
  const { slug } = await params;
  const page = getResourcePageBySlug(slug);
  if (!page) notFound();
  const schema = buildSchema(page);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ResourceView page={page} />
    </>
  );
}

function buildResourceMetadata(page: ResourcePage): Metadata {
  const canonical = `${SITE.baseUrl}${page.path}`;
  const author = AUTHORS[page.author];

  return {
    title: { absolute: page.seoTitle },
    description: page.metaDescription,
    keywords: [page.primaryKeyword, ...page.supportingKeywords],
    alternates: { canonical },
    openGraph: {
      type: page.kind === "article" ? "article" : "website",
      title: page.seoTitle,
      description: page.metaDescription,
      url: canonical,
      siteName: SITE.name,
      images: [{ url: `${SITE.baseUrl}${page.image.src}`, width: 1200, height: 630, alt: page.image.alt }],
      ...(page.kind === "article"
        ? {
            publishedTime: page.datePublished,
            modifiedTime: page.dateModified,
            authors: [author.name],
          }
        : {}),
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

function buildSchema(page: ResourcePage) {
  const canonical = `${SITE.baseUrl}${page.path}`;
  const author = AUTHORS[page.author];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE.baseUrl },
          { "@type": "ListItem", position: 2, name: "Resources", item: `${SITE.baseUrl}/resources` },
          { "@type": "ListItem", position: 3, name: page.title, item: canonical },
        ],
      },
      {
        "@type": page.kind === "article" ? "Article" : "CollectionPage",
        "@id": canonical,
        url: canonical,
        name: page.seoTitle,
        headline: page.h1,
        description: page.metaDescription,
        image: `${SITE.baseUrl}${page.image.src}`,
        author: { "@type": "Person", name: author.name, alternateName: author.handle },
        publisher: {
          "@type": "Organization",
          name: SITE.name,
          logo: { "@type": "ImageObject", url: `${SITE.baseUrl}/afterdarkFavicon.webp` },
        },
        datePublished: page.datePublished,
        dateModified: page.dateModified,
        mainEntityOfPage: canonical,
      },
    ],
  };
}
