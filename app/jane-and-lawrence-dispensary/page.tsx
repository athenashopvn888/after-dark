import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import {
  CORRIDOR_FAQS,
  STORE,
  breadcrumbGraphNode,
  faqPageGraphNode,
  mapsDirectionsUrl,
  mapsEmbedUrl,
  serializeJsonLd,
  webpageGraphNode,
} from "../lib/storeIdentity";
import SccParityHub from "../components/SccParityHub";
import styles from "../visit/visit.module.css";

const canonical = `${STORE.baseUrl}${STORE.corridorPath}`;
const pageTitle = "Jane and Lawrence Dispensary — Weston / Mount Dennis Walk-In | After Dark Cannabis";
const pageH1 = "Jane & Lawrence / Weston / Mount Dennis Cannabis Walk-In";
const pageDescription =
  "Jane and Lawrence dispensary walk-in at 1664 Jane Street, York, ON M9N 2S1. After Dark Cannabis serves Weston and Mount Dennis from one Jane Street pin. Call +1 (437) 524-9344. Adults 19+.";

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  keywords: [
    "jane and lawrence dispensary",
    "after dark toronto",
    "dispensary near me",
    "cannabis store near me",
    "weed near jane street york",
  ],
  alternates: { canonical },
  robots: { index: true, follow: true },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: canonical,
    images: [{ url: STORE.schemaImage, alt: "After Dark Cannabis — Jane & Lawrence York walk-in" }],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [STORE.schemaImage],
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    webpageGraphNode({
      id: canonical,
      name: pageH1,
      description:
        "Corridor walk-in guide for After Dark Cannabis at 1664 Jane Street, York — Jane & Lawrence, Weston, and Mount Dennis. The homepage is the NAP hub.",
    }),
    breadcrumbGraphNode([
      { name: "Home", item: STORE.homepageUrl },
      { name: "Jane & Lawrence corridor", item: canonical },
    ]),
    faqPageGraphNode(CORRIDOR_FAQS),
  ],
};

export default function JaneLawrenceCorridorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(pageSchema) }}
      />
      <Navbar />
      <main className={styles.main}>
        <section className={styles.hero}>
          <p className={styles.eyebrow}>Jane &amp; Lawrence · Weston · Mount Dennis · York walk-in · Adults 19+</p>
          <h1>{pageH1}</h1>
          <p className={styles.lede}>
            After Dark Cannabis is the Jane and Lawrence dispensary walk-in at {STORE.streetAddress} in York.
            Weston and Mount Dennis shoppers use this same door. The <Link href="/">homepage</Link> is the
            NAP hub for address, phone, map, and directions.
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
            <Link href={STORE.hoursPath}>24-hour open-now guide</Link>
          </div>
        </section>

        <section>
          <h2>Corridor map</h2>
          <p>
            Picture Jane Street as the spine. Lawrence Avenue West crosses it. The After Dark pin sits
            just south of those lights in York. Weston sits west of Jane; Mount Dennis sits south and
            southwest toward Eglinton West. Neighbourhood names change along the corridor. The store
            does not.
          </p>
          <p>
            If a map result shows a different Jane Street number, a Weston Road retail strip, or a
            Mississauga / Etobicoke pin, that is not After Dark. Walk-in cannabis here is{" "}
            {STORE.addressLine} only.
          </p>
        </section>

        <section>
          <h2>1664 Jane St pin</h2>
          <p>
            The physical counter is {STORE.streetAddress}, York, ON {STORE.postalCode} — {STORE.intersection}.
            Count south from Jane &amp; Lawrence; do not keep going north toward another number. Phone
            is {STORE.phoneDisplay}. Do not use an old 416 listing.
          </p>
          <p>
            Open 24 hours. Adults 19+ with valid government photo ID. The <Link href="/">homepage</Link>{" "}
            stays the website URL for this store. For 35 Jane, parking, and turn-by-turn notes, use{" "}
            <Link href="/visit">/visit</Link>. For late-night hours and ID, use the{" "}
            <Link href={STORE.hoursPath}>24-hour open-now guide</Link>.
          </p>
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
          <h2>Sister-neighbourhoods we serve for walk-in</h2>
          <p>
            These names are catchment, not extra addresses. People searching a dispensary near me or a
            cannabis store near me around Jane Street still arrive at one York door.
          </p>
          <div className={styles.placeList}>
            <article className={styles.placeItem}>
              <h3>Jane &amp; Lawrence</h3>
              <p>
                Nearest named intersection. Ride 35 Jane to the Lawrence West area and walk south to
                1664. Weed near Jane Street York means this pin.
              </p>
            </article>
            <article className={styles.placeItem}>
              <h3>Weston</h3>
              <p>
                Weston shoppers come to Jane Street. There is no After Dark storefront on Weston Road.
                A leftover Weston URL is not a second shop.
              </p>
            </article>
            <article className={styles.placeItem}>
              <h3>Mount Dennis</h3>
              <p>
                Approach on Jane, Weston Road, or Eglinton West, then continue to 1664 Jane Street in
                York. Same 24-hour counter, same ID rule.
              </p>
            </article>
            <article className={styles.placeItem}>
              <h3>York, Keelesdale, Trethewey, Black Creek</h3>
              <p>
                Nearby York blocks use the same walk-in. After Dark Toronto searches also resolve here —
                York on Jane Street, not a downtown second counter.
              </p>
            </article>
          </div>
        </section>

        <section>
          <h2>Mississauga and Etobicoke are not After Dark locations</h2>
          <p>
            After Dark Cannabis does not run Mississauga or Etobicoke storefronts, and those city URLs
            are not delivery farms to expand. If a search result uses those names, treat them as old
            links, not as extra shops. Walk-in stays {STORE.addressLine}.
          </p>
          <p>
            Drop-off, when it is offered at all, is confirmed from the Jane Street counter and lives on
            the separate <Link href={STORE.cannabisDeliveryPath}>York cannabis delivery</Link> guide.
            Order from the <Link href={STORE.yorkDeliveryPath}>York delivery catalog</Link>. It does not
            create a Mississauga or Etobicoke location, and it is not the 24-hour walk-in.
          </p>
        </section>

        <section>
          <h2>Plan the Jane Street visit</h2>
          <p>
            Bus, parking, and how-to-reach notes: <Link href="/visit">/visit</Link>.
            Longer local article:{" "}
            <Link href={STORE.visitGuidePath}>Jane Street York visit guide</Link>.
            Late-night hours:{" "}
            <Link href={STORE.hoursPath}>24-hour open-now guide</Link>.
            York store page:{" "}
            <Link href={STORE.storePagePath}>Weed Dispensary in York</Link>.
            None of those replace the homepage as the website URL for this store.
          </p>
        </section>

        <section>
          <SccParityHub
            currentPath={STORE.corridorPath}
            heading="York weed, visit, and Jane Street flower tiers"
            intro="This corridor page maps Jane & Lawrence, Weston, and Mount Dennis to one York pin. Flower tiers and /visit stay separate."
            geoSet="all"
            includeTiers
            tone="dark"
          />
        </section>

        <section>
          <h2>FAQ: Jane and Lawrence dispensary / near me</h2>
          <div className={styles.faqList}>
            {CORRIDOR_FAQS.map((faq) => (
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
