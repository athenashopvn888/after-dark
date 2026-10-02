import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { getGuidesByLane } from "../lib/guideRegistry";
import styles from "./page.module.css";

const BASE = "https://afterdarkcannabis.com";
const CANONICAL = `${BASE}/guides`;
const TITLE = "Guides | After Dark Cannabis";
const DESCRIPTION = "Browse After Dark Cannabis name guides for strains, Native Cigarettes, Nicotine Vape, and THC Vape. Adults 19+ only; check today's menu for current listings.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
    "@id": `${CANONICAL}#webpage`,
    url: CANONICAL,
    name: TITLE,
    description: DESCRIPTION,
    isPartOf: { "@id": `${BASE}/#website` },
  },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE },
        { "@type": "ListItem", position: 2, name: "Guides", item: CANONICAL },
      ],
    },
  ],
};

export default function GuidesPage() {
  const guideGroups = getGuidesByLane();

  return (
    <main className={styles.main}>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Guides</span>
          </nav>
          <p className={styles.kicker}>Name Guide Directory</p>
          <h1>{TITLE}</h1>
          <p className={styles.lede}>
            Explore every After Dark Cannabis name guide in one place. Learn the basics, then use today&apos;s menu to confirm current listings.
          </p>
          <p className={styles.ageNote}>Adults 19+ only.</p>
        </div>
      </section>

      <section className={styles.directory} aria-label="Guide directory">
        {guideGroups.map((group) => (
          <section className={styles.group} key={group.lane}>
            <div className={styles.groupHeading}>
              <h2>{group.label}</h2>
              <span>{group.guides.length} guides</span>
            </div>
            <div className={styles.grid}>
              {group.guides.map((guide) => (
                <Link className={styles.card} href={`/guides/${guide.slug}`} key={guide.slug}>
                  <span>{group.label}</span>
                  <h3>{guide.name}</h3>
                  <p>Read the {guide.name} guide</p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </section>

      <section className={styles.nextSteps}>
        <div>
          <p className={styles.kicker}>Keep Exploring</p>
          <h2>More After Dark resources</h2>
          <p>Visit the Resource Centre for broader explainers or check the store page before your visit.</p>
        </div>
        <div className={styles.actions}>
          <Link href="/resources">Resource Centre</Link>
          <Link href="/visit">Plan a Visit</Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
