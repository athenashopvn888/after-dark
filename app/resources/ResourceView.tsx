import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./resources.module.css";
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
            />
          )}

          {page.kind === "root" && featured.length > 0 && (
            <ResourceCards title="Featured Non-Flower Reads" pages={featured} compact />
          )}

          {page.sections.map((section) => (
            <section key={section.heading} className={styles.contentSection}>
              <h2>{section.heading}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.bullets && (
                <ul>
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
              {section.links && <LinkList links={section.links} />}
            </section>
          ))}

          {page.commercialLinks.length > 0 && (
            <section className={styles.linkPanel}>
              <h2>Current After Dark Links</h2>
              <LinkList links={page.commercialLinks} />
            </section>
          )}

          {related.length > 0 && <ResourceCards title="Related Resources" pages={related} compact />}
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

function ResourceCards({
  title,
  pages,
  compact = false,
}: {
  title: string;
  pages: ResourcePage[];
  compact?: boolean;
}) {
  return (
    <section className={styles.cardsSection}>
      <h2>{title}</h2>
      <div className={compact ? styles.cardGridCompact : styles.cardGrid}>
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
