"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import FleetAnnouncementBanner from "./components/FleetAnnouncementBanner";
import Navbar from "./components/Navbar";
import HiringCallout from "./components/HiringCallout";
import Footer from "./components/Footer";
import FlowerCard from "./components/FlowerCard";
import SmokePilotSpotlight from "./components/SmokePilotSpotlight";
import { WeedDiscoveryModule } from "./components/WeedDiscoveryModule";
import type { FlowerProduct } from "./lib/products";
import Papa from "papaparse";
import { HOME_FAQS, STORE, mapsDirectionsUrl, mapsEmbedUrl } from "./lib/storeIdentity";

/* ── Bento Mosaic Config ── */
const BENTO_TIERS = [
  {
    name: "Exotic Weed",
    slug: "exotic-weed",
    price: "$10-$12/g",
    banner: "/banners/after_dark_exotics_banner.webp",
    className: styles.bentoExotic,
  },
  {
    name: "Premium Weed",
    slug: "premium-weed",
    price: "$7-$10/g",
    banner: "/banners/after_dark_premium_banner.webp",
    className: styles.bentoPremium,
  },
  {
    name: "AAA+ Weed",
    slug: "aaa-weed",
    price: "$5-$6/g",
    banner: "/banners/after_dark_aaa_plus_banner.webp",
    className: styles.bentoTile,
  },
  {
    name: "AA Weed",
    slug: "aa-weed",
    price: "$4/g",
    banner: "/banners/after_dark_aa_banner.webp",
    className: styles.bentoTile,
  },
  {
    name: "Budget Weed",
    slug: "budget-weed",
    price: "$3/g",
    banner: "/banners/after_dark_budget_banner.webp",
    className: styles.bentoTile,
  },
  {
    name: "EDIBLES • PREROLLS • MORE",
    slug: "items/edibles",
    price: "Shop Tiers",
    banner: "/banners/after_dark_edibles_prerolls_more_banner.webp",
    className: styles.bentoEdibles,
  },
];

/* ── Explore Categories Config (New Banners) ── */
const EXPLORE_CATEGORIES = [
  { name: "Nic Vape", slug: "items/vapes", banner: "/banners/01_Vape_Pens.webp", icon: "💨" },
  { name: "THC Vape", slug: "items/vape-disposables", banner: "/banners/02_Vape_Disposable.webp", icon: "💨" },
  { name: "Concentrates", slug: "items/concentrates", banner: "/banners/03_Concentrates.webp", icon: "💎" },
  { name: "Pre-Rolls", slug: "items/prerolls", banner: "/banners/04_Pre_Rolls.webp", icon: "🚬" },
  { name: "Accessories", slug: "items/add-ons", banner: "/banners/05_Accessories.webp", icon: "➕" },
  { name: "Magic Stuff", slug: "items/magic", banner: "/banners/09_Magic_Stuff.webp", icon: "🍄" },
];

interface Review {
  name: string;
  comment: string;
  date: string;
}

interface ReviewStats {
  total: number;
  avg: number;
}

export default function HomePageClient() {
  const [featuredStrains, setFeaturedStrains] = useState<FlowerProduct[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsStats, setReviewsStats] = useState<ReviewStats | null>(null);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  /* ── 1. Fetch Client-Side Review Comments ── */
  useEffect(() => {
    const STORE_KEY = "MJ01";
    const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSu6iy9W3YKRzBYo_r96rXcbJsAOzlkzn5Rw9QMFnE0NbYSBgPxKX8kPRZNC9QcffZYj57155esmnqH/pub?gid=1555782756&single=true&output=csv";

    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error(`Review feed returned ${r.status}`);
        return r.text();
      })
      .then((raw) => {
        const rows = Papa.parse<Record<string, string>>(raw, {
          header: true,
          skipEmptyLines: true,
        }).data;

        const reviewsPool: Review[] = [];
        let totalVal: number | null = null;
        let avgVal: number | null = null;
        let hasStats = false;

        rows.forEach((row) => {
          if (row.StoreKey !== STORE_KEY) return;

          const rn = row.ReviewerName || "";
          if (rn === "__STATS__") {
            const parsedTotal = parseInt(row.Comment || "", 10);
            const parsedAvg = parseFloat(row.CreateTime || "");
            if (Number.isFinite(parsedTotal) && Number.isFinite(parsedAvg)) {
              totalVal = parsedTotal;
              avgVal = parsedAvg;
              hasStats = true;
            }
            return;
          }

          const comment = row.Comment || "";
          if (!comment || comment.length < 10) return;
          const name = rn || "Customer";
          const dateStr = row.CreateTime || "";
          reviewsPool.push({ name, comment, date: dateStr });
        });

        setReviews(reviewsPool.slice(0, 6));
        if (hasStats && totalVal !== null && avgVal !== null) {
          setReviewsStats({ total: totalVal, avg: avgVal });
        }
        setReviewsLoading(false);
      })
      .catch((err) => {
        console.warn("Reviews fetch failed:", err);
        setReviewsLoading(false);
      });
  }, []);

  /* ── 2. Build Featured Strains ── */
  useEffect(() => {
    fetch("/api/tv-data?type=flowers")
      .then((response) => response.ok ? response.json() as Promise<FlowerProduct[]> : Promise.reject(new Error(`Inventory returned ${response.status}`)))
      .then((flowers) => {
        const pool = flowers.filter((flower) => flower.image);
        for (let i = pool.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [pool[i], pool[j]] = [pool[j], pool[i]];
        }
        const picked: FlowerProduct[] = [];
        const tierCounts: Record<string, number> = {};
        for (const flower of pool) {
          if (picked.length >= 8) break;
          const tierCount = tierCounts[flower.tier] || 0;
          if (tierCount >= 2 || picked.some((pickedFlower) => pickedFlower.name === flower.name)) continue;
          picked.push(flower);
          tierCounts[flower.tier] = tierCount + 1;
        }
        setFeaturedStrains(picked);
      })
      .catch((error) => console.warn("Featured inventory fetch failed:", error));
  }, []);

  return (
    <main className={styles.main}>
      <FleetAnnouncementBanner />
      {/* ── NAVBAR ── */}
      <Navbar />
      <HiringCallout />

      {/* ── WELCOME BANNER ── */}
      <section className={styles.welcomeBannerSection}>
        <div className={styles.welcomeBannerContainer}>
          <img
            src="/banners/after_dark_welcome_banner.webp"
            alt="Welcome to After Dark Cannabis — Jane Street York dispensary"
            className={styles.welcomeBannerImg}
          />
        </div>
      </section>

      {/* ── BENTO MOSAIC HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroStars} />

        <div className={styles.heroContent}>
          {/* Brand branding */}
          <div className={styles.brandBlock}>
            <span className={styles.brandIcon}>🌙</span>
            <h1 className={styles.brandTitle}>AFTER DARK CANNABIS</h1>
            <p className={styles.brandSub}>24-Hour Jane Street York Dispensary</p>
            <div className={styles.brandBadge}>Open 24 Hours · 1664 Jane Street</div>
          </div>

          {/* Bento Grid */}
          <div className={styles.bentoGrid}>
            {BENTO_TIERS.map((tier) => (
              <Link
                key={tier.slug}
                href={`/${tier.slug}`}
                className={`${styles.bentoTile} ${tier.className}`}
              >
                <div
                  className={styles.bentoTileBg}
                  style={{ backgroundImage: `url('${tier.banner}')` }}
                />
                <div className={styles.bentoTileOverlay} />
                <div className={styles.bentoTileContent}>
                  <span className={styles.bentoLabel}>{tier.name}</span>
                  <span className={styles.bentoPrice}>{tier.price}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPLORE CATEGORIES ── */}
      <section className={styles.categoriesSection} id="menu">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Explore Categories</h2>
            <p className={styles.sectionSubtitle}>
              From custom disposable vapes and concentrates to accessories and cigarettes.
            </p>
          </div>

          <div className={styles.categoriesGrid}>
            {EXPLORE_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className={styles.categoryCard}
              >
                <div
                  className={styles.categoryCardBg}
                  style={{ backgroundImage: `url('${cat.banner}')` }}
                />
                <div className={styles.categoryCardOverlay} />
                <div className={styles.categoryCardContent}>
                  <h3 className={styles.categoryCardName}>
                    {cat.icon} {cat.name} <span className={styles.categoryCardArrow}>→</span>
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SmokePilotSpotlight
        storeName="After Dark Cannabis"
        locationLabel="York"
        cigaretteHref="/info/native-cigarettes-york"
        nicotineHref="/info/nicotine-vapes-york"
      />

      <WeedDiscoveryModule />

      {/* ── FEATURED PRODUCTS ── */}
      <section className={styles.featuredSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Featured Strains</h2>
            <p className={styles.sectionSubtitle}>
              Featured menu listings organized for quick browsing.
            </p>
          </div>

          <div className={styles.featuredScroll}>
            {featuredStrains.map((strain, i) => (
              <div key={`${strain.sku}-${i}`} className={styles.scrollItem}>
                <FlowerCard flower={strain} tierKey={strain.tier} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEO PANEL WRITE-UP ── */}
      <section className={styles.seoSection}>
        <div className={styles.container}>
          <div className={styles.seoPanel}>
            <h2 className={styles.seoPanelTitle}>24-Hour Walk-In on Jane Street in York</h2>
            <p className={styles.seoPanelText}>
              <strong>After Dark Cannabis</strong> is the after-hours walk-in counter at <strong>1664 Jane Street, York, ON M9N 2S1</strong>, just south of Lawrence Avenue West. This homepage is the visit hub: address, phone <a href={STORE.phoneTel}>{STORE.phoneDisplay}</a>, 24-hour hours, map, and directions live here. Use <Link href="/visit">/visit</Link> only if you need bus, parking, or corridor directions from Weston or Mount Dennis.
            </p>
            <p className={styles.seoPanelText}>
              Jane Street stays open when a conventional retail window would already be locked. Night-shift neighbours, late 35 Jane riders, and Mount Dennis walk-ups use the same York counter — there is no second After Dark address on Weston Road and no Mississauga or Etobicoke storefront. Compare flower tiers, pre-rolls, edibles, vapes, and concentrates on the live menu, then come in with government photo ID. Adults 19+ only.
            </p>
            <p className={styles.seoPanelText}>
              Checking whether the counter is still open? Use the <Link href={STORE.hoursPath}>24-hour York dispensary page</Link>. If you want a drop-off instead of the physical counter, stay on the <Link href="/weed-delivery-york">York delivery</Link> route. City-farm URLs outside this Jane / York / Weston / Mount Dennis basin are not locations.
            </p>
          </div>
        </div>
      </section>

      {/* ── CLIENT-SIDE CUSTOMER FEEDBACK SHOWCASE ── */}
      <section className={styles.reviewsSection}>
        <div className={styles.container}>
          <div className={styles.reviewsHeader}>
            <h2 className={styles.sectionTitle}>Customer Feedback</h2>
            {reviewsStats && (
              <div className={styles.reviewsStarsSummary}>
                <span className={styles.reviewsStars}>★★★★★</span>
                <span className={styles.reviewsAvg}>
                  {reviewsStats.avg.toFixed(1)}
                </span>
                <span className={styles.reviewsCount}>
                  ({reviewsStats.total} reviews)
                </span>
              </div>
            )}
          </div>

          <div className={styles.reviewsGrid}>
            {reviewsLoading ? (
              <div className={styles.reviewsLoading}>Loading customer feedback...</div>
            ) : reviews.length === 0 ? (
              <div className={styles.reviewsLoading}>
                Customer feedback is unavailable right now.
              </div>
            ) : (
              reviews.map((rv, idx) => (
                <div key={idx} className={styles.rvCard}>
                  <div className={styles.rvTop}>
                    <div className={styles.rvAvatar}>
                      {rv.name.charAt(0).toUpperCase()}
                    </div>
                    <div className={styles.rvMeta}>
                      <span className={styles.rvName}>{rv.name}</span>
                      {rv.date && (
                        <span className={styles.rvDate}>
                          {new Date(rv.date).toLocaleDateString("en-CA", {
                            year: "numeric",
                            month: "short",
                          })}
                        </span>
                      )}
                    </div>
                    <span className={styles.rvStars}>★★★★★</span>
                  </div>
                  <p className={styles.rvText}>
                    {rv.comment.length > 180 ? `${rv.comment.substring(0, 177)}...` : rv.comment}
                  </p>
                </div>
              ))
            )}
          </div>

          <div className={styles.reviewCtaRow}>
          </div>
        </div>
      </section>

      {/* ── FAQS SECTION ── */}
      <section className={styles.faqSection}>
        <div className={styles.faqContainer}>
          <h2 className={styles.sectionTitle} style={{ textAlign: "center", marginBottom: "32px" }}>
            Frequently Asked Questions
          </h2>
          {HOME_FAQS.map((faq, i) => (
            <details key={i} className={styles.faqItem}>
              <summary className={styles.faqQuestion}>{faq.q}</summary>
              <p className={styles.faqAnswer}>{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ── STORE LOCATION GRID ── */}
      <section className={styles.storeSection} id="contact">
        <div className={styles.container}>
          <div className={styles.storeGrid}>
            <div className={styles.storeCard}>
              <span className={styles.storeIcon}>📍</span>
              <h3 className={styles.storeCardTitle}>Location</h3>
              <p className={styles.storeCardText}>
                {STORE.streetAddress}
                <br />
                {STORE.addressLocality}, {STORE.addressRegion} {STORE.postalCode}
                <br />
                <a href={STORE.phoneTel} className={styles.storeLink}>{STORE.phoneDisplay}</a>
              </p>
            </div>
            <div className={styles.storeCard}>
              <span className={styles.storeIcon}>🕒</span>
              <h3 className={styles.storeCardTitle}>Hours</h3>
              <p className={styles.storeCardText}>
                Open 7 Days a Week
                <br />
                <span className={styles.storeHighlight}>{STORE.hoursLabel}</span>
              </p>
            </div>
            <div className={styles.storeCard}>
              <span className={styles.storeIcon}>🔥</span>
              <h3 className={styles.storeCardTitle}>Walk In</h3>
              <p className={styles.storeCardText}>
                No appointment needed
                <br />
                <span className={styles.storeHighlight}>Jane Street, York</span>
              </p>
            </div>
          </div>

          <div className={styles.napActions}>
            <a href={STORE.phoneTel} className={styles.napAction}>Call {STORE.phoneDisplay}</a>
            <a href={mapsDirectionsUrl} className={styles.napAction} target="_blank" rel="noopener noreferrer">Directions</a>
            <Link href="/visit" className={styles.napAction}>How to reach Jane Street</Link>
            <Link href={STORE.hoursPath} className={styles.napAction}>24-hour hours</Link>
          </div>

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
        </div>
      </section>

      {/* ── FOOTER ── */}
      <Footer />
    </main>
  );
}
