import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { serializeJsonLd } from "../../lib/storeIdentity";
import styles from "../resources.module.css";
import { ARTICLE_MARKDOWN } from "./articleCopy";
import {
  ARTICLE_CANONICAL,
  ARTICLE_DATE,
  ARTICLE_DESCRIPTION,
  ARTICLE_TITLE,
} from "./articleMeta";
import { parseArticle, type Inline } from "./parseArticle";

const article = parseArticle(ARTICLE_MARKDOWN);

if (article.title !== ARTICLE_TITLE) {
  throw new Error("Article H1 does not match the page title");
}

const HERO_IMAGE = "/banners/after_dark_edibles_prerolls_more_banner.webp";

export const metadata: Metadata = {
  title: { absolute: ARTICLE_TITLE },
  description: ARTICLE_DESCRIPTION,
  alternates: { canonical: ARTICLE_CANONICAL },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "article",
    title: ARTICLE_TITLE,
    description: ARTICLE_DESCRIPTION,
    url: ARTICLE_CANONICAL,
    siteName: "After Dark Cannabis",
    publishedTime: ARTICLE_DATE,
    modifiedTime: ARTICLE_DATE,
    images: [
      {
        url: HERO_IMAGE,
        width: 1200,
        height: 630,
        alt: "After Dark Cannabis",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: ARTICLE_TITLE,
    description: ARTICLE_DESCRIPTION,
    images: [HERO_IMAGE],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://afterdarkcannabis.com" },
        { "@type": "ListItem", position: 2, name: "Resources", item: "https://afterdarkcannabis.com/resources" },
        { "@type": "ListItem", position: 3, name: ARTICLE_TITLE, item: ARTICLE_CANONICAL },
      ],
    },
    {
      "@type": "Article",
      "@id": ARTICLE_CANONICAL,
      headline: ARTICLE_TITLE,
      description: ARTICLE_DESCRIPTION,
      datePublished: ARTICLE_DATE,
      dateModified: ARTICLE_DATE,
      mainEntityOfPage: ARTICLE_CANONICAL,
      url: ARTICLE_CANONICAL,
      author: { "@type": "Organization", name: "After Dark Cannabis" },
      publisher: {
        "@type": "Organization",
        name: "After Dark Cannabis",
        logo: {
          "@type": "ImageObject",
          url: "https://afterdarkcannabis.com/afterdarkFavicon.webp",
        },
      },
    },
  ],
};

export default function HowCannabisDeliveryWorksOntarioPage() {
  return (
    <main className={styles.main}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(articleSchema) }} />
      <Navbar />
      <section className={styles.hero}>
        <div className={styles.heroMedia}>
          <img src={HERO_IMAGE} alt="" className={styles.heroImage} />
          <div className={styles.heroShade} />
        </div>
        <div className={styles.heroContent}>
          <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/resources">Resources</Link>
            <span>/</span>
            <span>{ARTICLE_TITLE}</span>
          </nav>
          <p className={styles.kicker}>How it works</p>
          <h1>{ARTICLE_TITLE}</h1>
        </div>
      </section>

      <section className={styles.articleLayout}>
        <article className={`${styles.contentSection} ${styles.prose}`}>
          {article.blocks.map((block, index) => {
            if (block.type === "hr") return <hr key={index} />;
            if (block.type === "h2") return <h2 key={index}><InlineText nodes={block.inlines} /></h2>;
            if (block.type === "h3") return <h3 key={index}><InlineText nodes={block.inlines} /></h3>;
            if (block.type === "ul") {
              return (
                <ul key={index}>
                  {block.items.map((item, itemIndex) => (
                    <li key={itemIndex}><InlineText nodes={item} /></li>
                  ))}
                </ul>
              );
            }
            if (block.type === "ol") {
              return (
                <ol key={index}>
                  {block.items.map((item, itemIndex) => (
                    <li key={itemIndex}><InlineText nodes={item} /></li>
                  ))}
                </ol>
              );
            }
            return (
              <p key={index}>
                {block.lines.map((line, lineIndex) => (
                  <Fragment key={lineIndex}>
                    {lineIndex > 0 ? <br /> : null}
                    <InlineText nodes={line} />
                  </Fragment>
                ))}
              </p>
            );
          })}
        </article>
      </section>
      <Footer />
    </main>
  );
}

function InlineText({ nodes }: { nodes: Inline[] }) {
  return nodes.map((node, index) => {
    if (node.type === "strong") return <strong key={index}>{node.text}</strong>;
    if (node.type === "em") return <em key={index}>{node.text}</em>;
    if (node.type === "link") {
      return node.href.startsWith("/")
        ? <Link key={index} href={node.href}>{node.text}</Link>
        : <a key={index} href={node.href}>{node.text}</a>;
    }
    return <Fragment key={index}>{node.text}</Fragment>;
  });
}
