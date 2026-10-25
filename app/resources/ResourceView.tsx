import Link from "next/link";
import type { ReactNode } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PreferredSourceButton from "./PreferredSourceButton";
import styles from "./resources.module.css";
import {
  ARTICLE_CARD_EXCERPT,
  ARTICLE_DATE,
  ARTICLE_PATH,
  ARTICLE_TITLE,
} from "./how-cannabis-delivery-works-ontario/articleMeta";
import {
  AUTHORS,
  SITE,
  getCategoryPages,
  getChildPages,
  getFeaturedPages,
  getRelatedPages,
  type ResourcePage,
} from "./resourceData";

type ResourceViewProps = {
  page: ResourcePage;
};

const SAME_SITE_LINK = /\[([^\]]+)\]\((\/(?!\/)[^)\s]*)\)/g;

/** Turn same-site markdown links into anchors. Paragraphs without that pattern stay plain text. */
function renderSameSiteCopy(text: string): ReactNode {
  const nodes: ReactNode[] = [];
  let last = 0;
  let index = 0;
  for (const match of text.matchAll(SAME_SITE_LINK)) {
    const start = match.index ?? 0;
    if (start > last) nodes.push(text.slice(last, start));
    nodes.push(
      <Link key={`${match[2]}-${index}`} href={match[2]}>
        {match[1]}
      </Link>,
    );
    last = start + match[0].length;
    index += 1;
  }
  if (nodes.length === 0) return text;
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export default function ResourceView({ page }: ResourceViewProps) {
  const author = AUTHORS[page.author];
  const children = page.kind === "root" ? getCategoryPages() : getChildPages(page.path);
  const featured = page.kind === "root" ? getFeaturedPages() : children;
  const related = getRelatedPages(page);

  return (
    <main className={styles.main}>
      <Navbar />
      <section className={styles.hero}>
        <div className={styles.heroMedia}>
          <img src={page.image.src} alt={page.image.alt} className={styles.heroImage} />
          <div className={styles.heroShade} />
        </div>
        <div className={styles.heroContent}>
          <Breadcrumbs page={page} />
          <p className={styles.kicker}>{page.categoryLabel}</p>
          <h1>{page.h1}</h1>
          <p className={styles.heroText}>{page.excerpt}</p>
          <div className={styles.metaRow}>
            <span>{author.name}</span>
            <span>{author.role}</span>
            <span>Updated {formatDate(page.dateModified)}</span>
          </div>
        </div>
      </section>

      <section className={styles.bodyWrap}>
        <article className={styles.article}>
          <div className={styles.introBlock}>
            {page.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {children.length > 0 && (
            <ResourceCards
              title={page.kind === "root" ? "Choose a Resource Section" : "Guides in This Section"}
              pages={children}
              leadLink={page.kind === "root" ? page.guidesCard : undefined}
              extraCards={page.kind === "root" ? [deliveryArticleCard] : undefined}
            />
          )}

          {page.kind === "root" && featured.length > 0 && (
            <ResourceCards title="Featured Non-Flower Reads" pages={featured} compact />
          )}

          {page.sections.map((section) => (
            <section key={section.heading} className={styles.contentSection}>
              <h2>{section.heading}</h2>
              {section.body.map((paragraph, paragraphIndex) => (
                <p key={`${section.heading}-${paragraphIndex}`}>{renderSameSiteCopy(paragraph)}</p>
              ))}
              {section.bullets && (
                <ul>
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
              {section.subsections?.map((subsection) => (
                <div key={subsection.heading} className={styles.subsection}>
                  <h3>{subsection.heading}</h3>
                  {subsection.body.map((paragraph, paragraphIndex) => (
                    <p key={`${subsection.heading}-${paragraphIndex}`}>{renderSameSiteCopy(paragraph)}</p>
                  ))}
                  {subsection.bullets && (
                    <ul>
                      {subsection.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
              {section.links && <LinkList links={section.links} />}
            </section>
          ))}

          {page.faqs && page.faqs.length > 0 && (
            <section className={styles.faqSection}>
              <h2>Frequently Asked Questions</h2>
              {page.faqs.map((faq) => (
                <details key={faq.q} className={styles.faqItem}>
                  <summary>{faq.q}</summary>
                  <p>{faq.a}</p>
                </details>
              ))}
            </section>
          )}

          {page.commercialLinks.length > 0 && (
            <section className={styles.linkPanel}>
              <h2>Current After Dark Links</h2>
              <LinkList links={page.commercialLinks} />
            </section>
          )}

          {related.length > 0 && <ResourceCards title="Related Resources" pages={related} compact />}

          {page.kind === "article" && <PreferredSourceButton />}
        </article>

        <aside className={styles.sideRail}>
          <div className={styles.authorCard}>
            <p className={styles.railLabel}>Guide</p>
            <strong>{author.name}</strong>
            <span>{author.handle}</span>
            <span>{author.role}</span>
          </div>
          <div className={styles.storeCard}>
            <p className={styles.railLabel}>After Dark Cannabis</p>
            <span>{SITE.address}</span>
            <span>{SITE.hours}</span>
            <Link href={SITE.storePage}>View store page</Link>
          </div>
          <div className={styles.keywordCard}>
            <p className={styles.railLabel}>Shopping Sections</p>
            <span>Gas Gang</span>
            <span>Drizzle Switch</span>
            <span>ZYN, Velo, Pablo, Killa</span>
            <span>Backwoods and grabba</span>
          </div>
        </aside>
      </section>

      <Footer />
    </main>
  );
}

function Breadcrumbs({ page }: { page: ResourcePage }) {
  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
      <Link href="/">Home</Link>
      <span>/</span>
      <Link href="/resources">Resources</Link>
      {page.path !== "/resources" && (
        <>
          <span>/</span>
          <span>{page.title}</span>
        </>
      )}
    </nav>
  );
}

const deliveryArticleCard = {
  href: ARTICLE_PATH,
  kicker: "How it works",
  title: ARTICLE_TITLE,
  excerpt: ARTICLE_CARD_EXCERPT,
  updated: ARTICLE_DATE,
};

function ResourceCards({
  title,
  pages,
  compact = false,
  leadLink,
  extraCards = [],
}: {
  title: string;
  pages: ResourcePage[];
  compact?: boolean;
  leadLink?: { label: string; href: string; description?: string };
  extraCards?: { href: string; kicker: string; title: string; excerpt: string; updated: string }[];
}) {
  return (
    <section className={styles.cardsSection}>
      <h2>{title}</h2>
      <div className={compact ? styles.cardGridCompact : styles.cardGrid}>
        {leadLink && (
          <Link href={leadLink.href} className={styles.resourceCard}>
            <span className={styles.cardKicker}>Name Guides</span>
            <h3>{leadLink.label}</h3>
            {leadLink.description && <p>{leadLink.description}</p>}
          </Link>
        )}
        {pages.map((page) => {
          const author = AUTHORS[page.author];
          return (
            <Link href={page.path} key={page.path} className={styles.resourceCard}>
              <span className={styles.cardKicker}>{page.categoryLabel}</span>
              <h3>{page.title}</h3>
              <p>{page.excerpt}</p>
              <div className={styles.cardMeta}>
                <span>{author.name}</span>
                <span>Updated {formatDate(page.dateModified)}</span>
              </div>
            </Link>
          );
        })}
        {extraCards.map((card) => (
          <Link href={card.href} key={card.href} className={styles.resourceCard}>
            <span className={styles.cardKicker}>{card.kicker}</span>
            <h3>{card.title}</h3>
            <p>{card.excerpt}</p>
            <div className={styles.cardMeta}>
              <span>After Dark Cannabis</span>
              <span>Updated {formatDate(card.updated)}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function LinkList({ links }: { links: { label: string; href: string; description?: string }[] }) {
  return (
    <div className={styles.linkList}>
      {links.map((link) => (
        <Link href={link.href} key={`${link.href}-${link.label}`}>
          <span>{link.label}</span>
          {link.description && <small>{link.description}</small>}
        </Link>
      ))}
    </div>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-CA", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}
