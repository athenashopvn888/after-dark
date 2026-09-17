import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { SEO_PAGES, getSeoPageBySlug } from "../../lib/seoPages";
import { TIER_CONFIG } from "../../lib/products";
import {
  STORE,
  faqPageJsonLd,
  mapsDirectionsUrl,
  mapsEmbedUrl,
  serializeJsonLd,
} from "../../lib/storeIdentity";
import styles from "./seo.module.css";

/* ── Generate all SEO pages ── */
export function generateStaticParams() {
  const dedicatedPilotRoutes = new Set([
    "native-cigarettes-york",
    "nicotine-vapes-york",
  ]);
  return SEO_PAGES
    .filter((page) => !dedicatedPilotRoutes.has(page.slug))
    .map((page) => ({ seoPage: page.slug }));
}

/* ── Metadata ── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ seoPage: string }>;
}): Promise<Metadata> {
  const { seoPage: slug } = await params;
  const page = getSeoPageBySlug(slug);
  if (!page) return {};

  const demoted = slug === "weed-store-near-mississauga";
  return {
    title: { absolute: page.title },
    description: page.metaDescription,
    alternates: {
      canonical: demoted ? STORE.homepageUrl : `https://afterdarkcannabis.com/info/${slug}`,
    },
    robots: demoted ? { index: false, follow: true } : { index: true, follow: true },
  };
}

/* ── Page ── */
export default async function SeoLandingPage({
  params,
}: {
  params: Promise<{ seoPage: string }>;
}) {
  const { seoPage: slug } = await params;
  const page = getSeoPageBySlug(slug);
  if (!page) notFound();

  const tiers = Object.values(TIER_CONFIG);

  return (
    <main className={styles.main}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqPageJsonLd(page.faqs)) }}
      />
      <Navbar />

      {/* Banner Image */}
      {page.banner && (
        <section className={styles.bannerSection}>
          <img
            src={page.banner}
            alt={page.h1}
            className={styles.bannerImg}
          />
        </section>
      )}

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.heroIcon}>{page.icon}</span>
          <h1 className={styles.heroH1}>{page.h1}</h1>
          <p className={styles.heroTagline}>{page.heroTagline}</p>
        </div>
      </section>

      {/* Content Sections */}
      <section className={styles.content}>
        <div className={styles.container}>
          {page.sections.map((s, i) => (
            <div key={i} className={styles.section}>
              <h2 className={styles.sectionTitle}>{s.heading}</h2>
              <p className={styles.sectionBody}>{s.body}</p>
            </div>
          ))}

          {/* Tier Grid */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Our Cannabis Menu — Five Tiers of Quality</h2>
            <div className={styles.tierGrid}>
              {tiers.map((tier) => (
                <Link
                  key={tier.slug}
                  href={`/${tier.slug}`}
                  className={styles.tierCard}
                  style={{ "--tier-color": tier.color } as React.CSSProperties}
                >
                  <div className={styles.tierLabel} style={{ color: tier.color }}>
                    {tier.icon} {tier.name}
                  </div>
                  <div className={styles.tierPrice}>${tier.unitPrice}/g</div>
                  <p className={styles.tierDesc}>{tier.tagline}</p>
                  <span className={styles.tierLink}>Browse {tier.name} →</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Map */}
          <div className={`${styles.section} nap`}>
            <h2 className={styles.sectionTitle}>Find Us on Jane Street in York</h2>
            <p className={styles.napLine}>
              <strong>{STORE.name}</strong>
              <br />
              {STORE.addressLine}
              <br />
              <a href={STORE.phoneTel}>{STORE.phoneDisplay}</a>
              {" · "}
              {STORE.hoursLabel}
              <br />
              Website: <a href={STORE.homepageUrl}>{STORE.homepageUrl}</a>
            </p>
            <div className={styles.mapWrap}>
              <iframe
                title="Map of After Dark Cannabis at 1664 Jane Street, York"
                src={mapsEmbedUrl}
                width="100%"
                height="360"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className={styles.visitBtns}>
              <Link href="/" className={styles.visitBtn}>Homepage NAP hub</Link>
              <Link href="/visit" className={styles.visitBtn}>How to reach Jane Street</Link>
              <Link href={STORE.hoursPath} className={styles.visitBtn}>24-hour hours</Link>
              <a href={mapsDirectionsUrl} className={styles.visitBtn} target="_blank" rel="noopener noreferrer">Directions</a>
            </div>
          </div>

          {/* FAQ */}
          {page.faqs.length > 0 && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
              {page.faqs.map((faq, i) => (
                <details key={i} className={styles.faqItem}>
                  <summary className={styles.faqQ}>{faq.q}</summary>
                  <p className={styles.faqA}>{faq.a}</p>
                </details>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
