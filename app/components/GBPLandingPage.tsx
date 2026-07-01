// Auto-generated Google Business Profile Local SEO Landing Page Component
import Link from "next/link";
import styles from "./GBPLandingPage.module.css";
import { gbpLocation } from "../lib/gbp-location";

// Dictionary mapping category names to their respective paths
const categoryLinks: { [key: string]: string } = {
  "Flower": "/",
  "Pre-rolls": "/items/prerolls",
  "Edibles": "/items/edibles",
  "THC vapes": "/items/vape-disposables",
  "Concentrates": "/items/concentrates",
  "Shatter": "/items/concentrates",
  "CBD oils": "/items/concentrates",
  "Accessories": "/items/add-ons"
};
type StoreSchemaMarkup = {
  "@context": "https://schema.org";
  "@type": "Store";
  name: string;
  url: string;
  telephone: string;
  address: {
    "@type": "PostalAddress";
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  priceRange: string;
  openingHours?: string[];
  geo?: {
    "@type": "GeoCoordinates";
    latitude: number;
    longitude: number;
  };
};
export function GBPLandingPage() {
  const landmarkList = gbpLocation.localLandmarks.join(", ");
  const nearbyAreaList = gbpLocation.nearbyAreas.slice(0, 4).join(", ");
  const categoryGuideLinks = gbpLocation.products.slice(0, 6).map((product) => ({
    label: product,
    href: categoryLinks[product] || gbpLocation.menuUrl || "/"
  }));
  // Generate schema.org markup dynamically
  const schemaMarkup: StoreSchemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Store",
    "name": gbpLocation.storeName,
    "url": `https://${gbpLocation.domain}/${gbpLocation.slug}/`,
    "telephone": gbpLocation.phone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": gbpLocation.streetAddress,
      "addressLocality": gbpLocation.city,
      "addressRegion": gbpLocation.province,
      "postalCode": gbpLocation.postalCode,
      "addressCountry": gbpLocation.country
    },
    "priceRange": "$$"
  };

  // Inject real opening hours and coordinates if they exist
  if (gbpLocation.hours && gbpLocation.hours.length > 0) {
    schemaMarkup.openingHours = gbpLocation.hours;
  }

  if (gbpLocation.latitude && gbpLocation.longitude) {
    schemaMarkup.geo = {
      "@type": "GeoCoordinates",
      "latitude": Number(gbpLocation.latitude),
      "longitude": Number(gbpLocation.longitude)
    };
  }

  return (
    <div className={styles.container}>
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      {/* Hero Header */}
      <header className={styles.hero}>
        <h1 className={styles.h1}>{gbpLocation.storeName} — Weed Dispensary in {gbpLocation.city}</h1>
        <p className={styles.heroTagline}>Serving {gbpLocation.city} & Nearby Neighborhoods</p>
      </header>

      {/* Call to Actions */}
      <div className={styles.btnRow}>
        <a href={gbpLocation.menuUrl} className={`${styles.btn} ${styles.btnPrimary}`}>
          View Menu
        </a>
        <a href={`tel:${gbpLocation.phoneIntl}`} className={`${styles.btn} ${styles.btnSecondary}`}>
          Call Store
        </a>
      </div>

      {/* Intro Section */}
      <section className={styles.section}>
        <h2 className={styles.h2}>Your Trusted Local Weed Dispensary</h2>
        <p className={styles.introText}>{gbpLocation.introVariant}</p>
      </section>

      {/* Local Visit Planning Section */}
      <section className={styles.section}>
        <h2 className={styles.h2}>Plan a Visit Near {gbpLocation.neighborhood}</h2>
        <p className={styles.infoText}>
          Use this local page to connect {gbpLocation.storeName} with the area around {landmarkList}. Adult 19+ shoppers can confirm the store location, review general menu categories, and plan a straightforward in-store visit before choosing a category page to browse.
        </p>
        <p className={styles.infoText}>
          If you are coming from {nearbyAreaList}, review the address and store hours shown below, then use the category links to understand the main types of pages available on this site before you visit.
        </p>
        <div className={styles.btnRow}>
          <Link href={gbpLocation.menuUrl} className={`${styles.btn} ${styles.btnPrimary}`}>
            Start With Menu Categories
          </Link>
          <Link href="#faq" className={`${styles.btn} ${styles.btnSecondary}`}>
            Read Visit FAQs
          </Link>
        </div>
      </section>
      {/* Product Section */}
      <section className={styles.section}>
        <h2 className={styles.h2}>Weed and Cannabis Products Available</h2>
        <p className={styles.infoText}>
          At {gbpLocation.storeName}, we offer a curated selection of weed and cannabis products for adults 19+ in {gbpLocation.city}. Enjoy some of Ontario&apos;s finest quality and value in the following categories:
        </p>
        <div className={styles.productGrid}>
          {gbpLocation.products.map((p) => {
            const href = categoryLinks[p] || "/";
            return (
              <Link key={p} href={href} className={styles.productCard}>
                {p}
              </Link>
            );
          })}
        </div>
      </section>


      {/* Category Guide Links Section */}
      <section className={styles.section}>
        <h2 className={styles.h2}>Helpful Category Links Before You Visit</h2>
        <p className={styles.infoText}>
          These links help shoppers move from the local store page to useful category pages. They are for general browsing context only and should be used alongside the store details on this page.
        </p>
        <div className={styles.productGrid}>
          {categoryGuideLinks.map((item) => (
            <Link key={`${item.label}-${item.href}`} href={item.href} className={styles.productCard} aria-label={`Review ${item.label} category information at ${gbpLocation.storeName}`}>
              {item.label}
            </Link>
          ))}
        </div>
      </section>
      {/* Location & NAP Section */}
      <section className={styles.section}>
        <h2 className={styles.h2}>Visit {gbpLocation.storeName} in {gbpLocation.city}</h2>
        <div className={styles.napGrid}>
          <div className={styles.napDetails}>
            <div className={styles.napItem}>
              <span className={styles.napLabel}>Store Name</span>
              <strong>{gbpLocation.storeName}</strong>
            </div>
            <div className={styles.napItem}>
              <span className={styles.napLabel}>Address</span>
              <span>{gbpLocation.address}</span>
            </div>
            <div className={styles.napItem}>
              <span className={styles.napLabel}>Phone</span>
              <span><a href={`tel:${gbpLocation.phoneIntl}`} style={{ color: "inherit" }}>{gbpLocation.phone}</a></span>
            </div>
            <div className={styles.napItem}>
              <span className={styles.napLabel}>Website</span>
              <span><a href={`https://${gbpLocation.domain}/`} style={{ color: "inherit" }}>https://{gbpLocation.domain}/</a></span>
            </div>
            {gbpLocation.hours && gbpLocation.hours.length > 0 && (
              <div className={styles.napItem}>
                <span className={styles.napLabel}>Store Hours</span>
                {gbpLocation.hours.map((line) => (
                  <span key={line} style={{ fontSize: "0.95rem" }}>{line}</span>
                ))}
              </div>
            )}
            <div className={styles.napItem} style={{ marginTop: "10px" }}>
              <p className={styles.infoBlock} style={{ fontSize: "0.9rem", fontStyle: "italic", margin: 0 }}>
                * {gbpLocation.parkingNote}.
              </p>
            </div>
          </div>
          <div className={styles.mapWrapper}>
            {gbpLocation.mapEmbedUrl ? (
              <iframe
                title={`Map of ${gbpLocation.storeName}`}
                src={gbpLocation.mapEmbedUrl}
                className={styles.mapIframe}
                allowFullScreen={true}
                loading="lazy"
              />
            ) : (
              <div style={{ padding: "40px", textAlign: "center", color: "var(--text-muted)" }}>
                Map preview not available.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Nearby Areas Section */}
      <section className={styles.section}>
        <h2 className={styles.h2}>{gbpLocation.sectionTitle}</h2>
        <p className={styles.infoText}>
          {gbpLocation.neighborhoodDescription} {gbpLocation.transitNote}. We proudly welcome customers from:
        </p>
        <div className={styles.areaList}>
          {gbpLocation.nearbyAreas.map((area) => (
            <span key={area} className={styles.areaTag}>
              {area}
            </span>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className={styles.section}>
        <h2 className={styles.h2}>Frequently Asked Questions</h2>
        <div className={styles.faqList}>
          <div className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>Where is {gbpLocation.storeName} located?</h3>
            <p className={styles.faqAnswer}>{gbpLocation.storeName} is located at {gbpLocation.address}.</p>
          </div>
          <div className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>Is {gbpLocation.storeName} a weed dispensary in {gbpLocation.city}?</h3>
            <p className={styles.faqAnswer}>
              Yes, {gbpLocation.storeName} is a fully licensed local weed dispensary in {gbpLocation.city} serving cannabis customers aged 19 and older with valid identification.
            </p>
          </div>
          <div className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>What products does {gbpLocation.storeName} carry?</h3>
            <p className={styles.faqAnswer}>
              We carry a complete line of weed products including premium flower, pre-rolls, THC edibles, concentrates, shatter, THC vape cartridges, CBD oils, and accessories.
            </p>
          </div>
          <div className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>Do I need to be 19+ to shop at {gbpLocation.storeName}?</h3>
            <p className={styles.faqAnswer}>
              Yes, to visit our cannabis store or order from our menu, you must be at least 19 years of age. Valid government-issued photo ID is required for verification.
            </p>
          </div>
          <div className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>How should I plan a visit to {gbpLocation.storeName}?</h3>
            <p className={styles.faqAnswer}>
              Start by confirming the address, store hours, and nearby area details on this page. Then use the category links for general browsing context before visiting the store in person.
            </p>
          </div>
          <div className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>Can I use this page to compare menu categories?</h3>
            <p className={styles.faqAnswer}>
              Yes. The category links point to existing pages for flower, pre-rolls, edibles, THC vapes, concentrates, shatter, CBD oils, and accessories. They are informational links for planning a visit and browsing the main site sections.
            </p>
          </div>
          {gbpLocation.neighborhood && (
            <div className={styles.faqItem}>
              <h3 className={styles.faqQuestion}>Is {gbpLocation.storeName} near {gbpLocation.neighborhood}?</h3>
              <p className={styles.faqAnswer}>
                Yes, {gbpLocation.storeName} is located near {gbpLocation.neighborhood} and serves customers from nearby landmarks like {gbpLocation.localLandmarks.join(", ")}.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
