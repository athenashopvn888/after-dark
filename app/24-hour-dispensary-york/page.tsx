import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import {
  HOURS_FAQS,
  STORE,
  breadcrumbGraphNode,
  faqPageGraphNode,
  mapsDirectionsUrl,
  mapsEmbedUrl,
  serializeJsonLd,
  webpageGraphNode,
} from "../lib/storeIdentity";
import styles from "../visit/visit.module.css";

const canonical = `${STORE.baseUrl}${STORE.hoursPath}`;

export const metadata: Metadata = {
  title: { absolute: "24-Hour Dispensary in York on Jane Street | After Dark Cannabis" },
  description:
    "After Dark Cannabis is open 24 hours at 1664 Jane Street, York. Walk in after midnight — same door, same menu. Call +1 (437) 524-9344. Adults 19+.",
  alternates: { canonical },
  robots: { index: true, follow: true },
  openGraph: {
    title: "24-Hour Dispensary in York on Jane Street | After Dark Cannabis",
    description:
      "Open 24 hours at 1664 Jane Street, York, ON M9N 2S1. Walk-in cannabis store. Call +1 (437) 524-9344.",
    url: canonical,
    images: [{ url: STORE.schemaImage, alt: "After Dark Cannabis — 24-hour Jane Street York dispensary" }],
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    webpageGraphNode({
      id: canonical,
      name: "24-Hour Dispensary in York on Jane Street",
      description:
        "Door-test page for the 24-hour After Dark Cannabis walk-in at 1664 Jane Street, York. The homepage is the NAP hub.",
    }),
    breadcrumbGraphNode([
      { name: "Home", item: STORE.homepageUrl },
      { name: "24-hour York dispensary", item: canonical },
    ]),
    faqPageGraphNode(HOURS_FAQS),
  ],
};

export default function TwentyFourHourYorkPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(pageSchema) }}
      />
      <Navbar />
      <main className={styles.main}>
        <section className={styles.hero}>
          <p className={styles.eyebrow}>Open 24 hours · Jane Street / York · Adults 19+</p>
          <h1>24-Hour Dispensary in York on Jane Street</h1>
          <p className={styles.lede}>
            After Dark Cannabis stays open when a typical York retail window is already locked.
            Walk in at {STORE.streetAddress} any hour. The <Link href="/">homepage</Link> stays the NAP hub
            for address, phone, map, and directions.
          </p>
        </section>

        <section className={`${styles.nap} nap`} aria-label="Store name, address, and phone">
          <h2>Store details</h2>
          <p>
            <strong>{STORE.name}</strong>
            <br />
            {STORE.addressLine}
            <br />
            <a href={STORE.phoneTel}>{STORE.phoneDisplay}</a>
            <br />
            {STORE.hoursNote}
          </p>
          <div className={styles.actions}>
            <a href={STORE.phoneTel}>Call the Jane Street counter</a>
            <a href={mapsDirectionsUrl} target="_blank" rel="noopener noreferrer">Google Maps directions</a>
            <Link href="/">Homepage NAP hub</Link>
            <Link href="/visit">How to reach Jane Street</Link>
          </div>
        </section>

        <section>
          <h2>Open now — including after midnight</h2>
          <p>
            If you are searching for a 24-hour dispensary in York, this is the Jane Street walk-in:
            {" "}{STORE.addressLine}. The counter does not close at 9, 10, or 11. Night-shift neighbours,
            late 35 Jane riders, and Mount Dennis walk-ups use the same door they would use at noon.
          </p>
        </section>

        <section>
          <h2>What to bring for a late-night walk-in</h2>
          <p>
            Bring valid government photo ID. Adults 19+ only — that rule does not loosen after midnight.
            If one exact pack is the reason for the trip, call {STORE.phoneDisplay} first so the counter
            can check the posted menu before you travel.
          </p>
        </section>

        <section>
          <h2>Same Jane Street menu at 3 a.m.</h2>
          <p>
            Overnight shoppers see the same five flower tiers — Budget from $3/g through Exotic at $10–$12/g —
            plus edibles, prerolls, vapes, and concentrates when those categories are on the current menu.
            Posted names and prices can still move; the 24-hour door does not freeze a SKU.
          </p>
        </section>

        <section>
          <h2>Jane Street, not a second address</h2>
          <p>
            The 24-hour counter is this York walk-in only, {STORE.intersection}. Weston and Mount Dennis
            shoppers come to Jane Street. There is no second After Dark storefront on Weston Road.
          </p>
        </section>

        <section>
          <h2>Map</h2>
          <div className={styles.map}>
            <iframe
              title="Map of After Dark Cannabis at 1664 Jane Street, York"
              src={mapsEmbedUrl}
              width="100%"
              height="360"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>

        <section>
          <h2>Plan the visit</h2>
          <p>
            Need the 35 Jane stop or street parking notes? Use the{" "}
            <Link href="/visit">how-to-reach page</Link>.
            The York store page is{" "}
            <Link href={STORE.storePagePath}>Weed Dispensary in York</Link>.
            Neither replaces the homepage as the website URL for this store.
          </p>
        </section>

        <section>
          <h2>24-hour questions</h2>
          <div className={styles.faqList}>
            {HOURS_FAQS.map((faq) => (
              <article key={faq.q} className={styles.faqItem}>
                <h3>{faq.q}</h3>
                <p>{faq.a}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
