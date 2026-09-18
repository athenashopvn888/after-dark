import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import {
  STORE,
  VISIT_FAQS,
  faqPageGraphNode,
  mapsDirectionsUrl,
  mapsEmbedUrl,
  serializeJsonLd,
} from "../lib/storeIdentity";
import SccParityHub from "../components/SccParityHub";
import styles from "./visit.module.css";

const canonical = `${STORE.baseUrl}${STORE.visitPath}`;

export const metadata: Metadata = {
  title: { absolute: "How to Reach the 24-Hour Jane Street York Dispensary | After Dark Cannabis" },
  description:
    "How to reach After Dark Cannabis at 1664 Jane Street, York: 35 Jane bus, street parking, Jane & Lawrence. Open 24 hours. Call +1 (437) 524-9344. Adults 19+.",
  alternates: { canonical },
  robots: { index: true, follow: true },
  openGraph: {
    title: "How to Reach the 24-Hour Jane Street York Dispensary",
    description: "35 Jane, street parking, and Jane & Lawrence directions to 1664 Jane Street, York. Open 24 hours.",
    url: canonical,
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": canonical,
      url: canonical,
      name: "How to Reach After Dark Cannabis on Jane Street in York",
      description:
        "Transit, parking, and corridor directions to the 24-hour After Dark Cannabis walk-in at 1664 Jane Street, York.",
      isPartOf: { "@id": `${STORE.baseUrl}/#website` },
      about: { "@id": `${STORE.baseUrl}/#store` },
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["h1", ".nap"],
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: STORE.homepageUrl },
        { "@type": "ListItem", position: 2, name: "How to reach Jane Street", item: canonical },
      ],
    },
    faqPageGraphNode(VISIT_FAQS),
  ],
};

export default function VisitPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(pageSchema) }}
      />
      <Navbar />
      <main className={styles.main}>
        <section className={styles.hero}>
          <p className={styles.eyebrow}>How to reach · Jane Street / York / Weston / Mount Dennis · Adults 19+</p>
          <h1>How to Reach After Dark Cannabis on Jane Street in York</h1>
          <p className={styles.lede}>
            This is the supporting reach page. The <Link href="/">homepage</Link> stays the visit hub for NAP, hours, map, and directions.
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
          </div>
        </section>

        <section>
          <h2>Nearest intersection</h2>
          <p>
            1664 Jane Street sits {STORE.intersection}. Count south from the Lawrence lights; do not continue north toward a different Jane Street number. After Dark is this York walk-in only — not a chain, not a second counter on Weston Road.
          </p>
        </section>

        <section>
          <h2>TTC: 35 Jane</h2>
          <p>
            The 35 Jane bus is the corridor ride. Stay on Jane until the Lawrence West area, then walk south to 1664. Overnight headways stretch, so check live TTC times if you are coming after midnight. The store is open 24 hours, so a late bus still lands at an open counter.
          </p>
        </section>

        <section>
          <h2>Parking on Jane Street</h2>
          <p>
            Use evening and overnight street parking on Jane Street and the side streets around the block. Read the signs on the pole in front of you; this is not a plaza garage. If you are only stopping for a listed item, call {STORE.phoneDisplay} first so the trip stays short.
          </p>
        </section>

        <section>
          <h2>From Weston</h2>
          <p>
            Weston shoppers should treat Jane Street as the destination, not Weston Road itself. Drive or bus toward Jane, then south of Lawrence to 1664. A Weston drop-off URL is not a Weston storefront. Neighbourhood context is on the{" "}
            <Link href={STORE.corridorPath}>Jane &amp; Lawrence corridor guide</Link>.
          </p>
        </section>

        <section>
          <h2>From Mount Dennis</h2>
          <p>
            From Mount Dennis, approach on Jane, Weston Road, or Eglinton West and continue to 1664 Jane Street in York. Same 24-hour counter, same ID rule, same menu. See the{" "}
            <Link href={STORE.corridorPath}>corridor walk-in guide</Link> for the neighbourhood map.
          </p>
        </section>

        <section>
          <h2>Late-night walk-in</h2>
          <p>
            The Jane Street counter does not race a 9-to-9 lockup. Bring valid government photo ID. Adults 19+ only. Posted menu names and prices move, so use the live menu when one exact pack is the reason for the trip.
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
          <h2>More Jane Street context</h2>
          <p>
            The longer local article is the{" "}
            <Link href={STORE.visitGuidePath}>Jane Street York visit guide</Link>.
            The York store page is{" "}
            <Link href={STORE.storePagePath}>Weed Dispensary in York</Link>.
            Confirm late-night hours on the{" "}
            <Link href={STORE.hoursPath}>24-hour open-now guide</Link>.
            Weston and Mount Dennis walk-in notes are on the{" "}
            <Link href={STORE.corridorPath}>Jane &amp; Lawrence corridor guide</Link>.
            None of those replace the homepage as the NAP hub.
          </p>
        </section>

        <section>
          <SccParityHub
            currentPath={STORE.visitPath}
            heading="York weed, flower tiers, and 24-hour hubs"
            intro="This page is the how-to-reach companion. Flower tiers stay narrow; the York weed hub owns broad weed intent."
            geoSet="all"
            includeTiers
            tone="dark"
          />
        </section>

        <section>
          <h2>Visit questions</h2>
          <div className={styles.faqList}>
            {VISIT_FAQS.map((faq) => (
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
