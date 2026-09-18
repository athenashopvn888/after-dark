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
import SccParityHub from "../components/SccParityHub";
import styles from "../visit/visit.module.css";

const canonical = `${STORE.baseUrl}${STORE.hoursPath}`;
const pageTitle = "24-Hour Dispensary Near Me in York — Open Now | After Dark Cannabis";
const pageH1 = "24-Hour York Dispensary on Jane Street — Open-Now Guide";
const pageDescription =
  "Open now 24 hours at 1664 Jane Street, York. 24 hour dispensary near Jane Street, Weston, and Mount Dennis. Call +1 (437) 524-9344. Adults 19+.";

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  keywords: [
    "24 hour dispensary near me",
    "24hr dispensary near me",
    "24 hour dispensary",
    "dispensary near me open now",
    "24 hour cannabis near me",
    "after dark dispensary",
  ],
  alternates: { canonical },
  robots: { index: true, follow: true },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: canonical,
    images: [{ url: STORE.schemaImage, alt: "After Dark Cannabis — 24-hour Jane Street York dispensary" }],
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
        "Open-now guide for the 24-hour After Dark Cannabis walk-in at 1664 Jane Street, York. The homepage is the NAP hub.",
    }),
    breadcrumbGraphNode([
      { name: "Home", item: STORE.homepageUrl },
      { name: "24-hour York open-now guide", item: canonical },
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
          <p className={styles.eyebrow}>Open now · 24 hours · Jane Street / York · Adults 19+</p>
          <h1>{pageH1}</h1>
          <p className={styles.lede}>
            After Dark Cannabis is open now, 24 hours a day, at {STORE.streetAddress} in York.
            This page answers late-night hours, arrival, and ID. The <Link href="/">homepage</Link> is
            the NAP hub for address, phone, map, and directions.
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
          <h2>Are we open 24 hours?</h2>
          <p>
            Yes. After Dark Cannabis lists open 24 hours a day, seven days a week, including after
            midnight. If you searched for a 24 hour dispensary near me in York, this is the Jane Street
            walk-in: {STORE.addressLine}. The counter does not close at 9, 10, or 11.
          </p>
          <p>
            Overnight shoppers use the same door and the same posted menu as daytime visits. Flower
            stays in five tiers — Budget from $3/g through Exotic at $10–$12/g — plus edibles, prerolls,
            vapes, and concentrates when those categories are on the current menu. Posted names and
            prices can still move; the 24-hour door does not freeze a SKU.
          </p>
        </section>

        <section>
          <h2>1664 Jane Street — how to arrive late night</h2>
          <p>
            Count south from the Jane &amp; Lawrence lights to {STORE.streetAddress}. Do not continue
            north toward a different Jane Street number. The storefront sits {STORE.intersection}.
            Night-shift neighbours, late 35 Jane riders, and Mount Dennis walk-ups use the same door
            they would use at noon.
          </p>
          <p>
            Overnight TTC headways stretch, so check live 35 Jane times before you leave. Street parking
            on Jane and the side streets is typical after evening rush; read the pole in front of you.
            If one exact pack is the reason for the trip, call {STORE.phoneDisplay} first so the counter
            can check the posted menu before you travel.
          </p>
        </section>

        <section>
          <h2>Jane &amp; Lawrence / Weston / Mount Dennis</h2>
          <p>
            Jane &amp; Lawrence is the nearest named intersection. Weston and Mount Dennis shoppers come
            to this York walk-in — there is no second After Dark storefront on Weston Road, and no
            Mississauga or Etobicoke counter. Corridor names (Jane Street, York, Weston, Mount Dennis)
            all resolve to {STORE.addressLine}. The neighbourhood map lives on the{" "}
            <Link href={STORE.corridorPath}>Jane &amp; Lawrence corridor guide</Link>.
          </p>
          <p>
            Drop-off requests stay on the separate <Link href={STORE.yorkDeliveryPath}>York delivery</Link>{" "}
            page. This open-now guide is for the physical 24-hour door on Jane Street.
          </p>
        </section>

        <section>
          <h2>Safety &amp; ID at night</h2>
          <p>
            Bring valid government photo ID. Adults 19+ only — that rule does not loosen after midnight.
            Treat a late-night visit like a noon visit: show ID, stay on the posted menu, and skip
            sending anyone under 19 to the door.
          </p>
          <p>
            The Jane Street walk-in is a staffed retail counter, not an unattended hatch. If the block
            looks busier than you want, call {STORE.phoneDisplay} before you leave. Do not treat a
            Weston Road pin or an old 416 listing as this store.
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
          <h2>Jane Street visit guide</h2>
          <p>
            Need 35 Jane, parking, and corridor notes in one article? Open the{" "}
            <Link href={STORE.visitGuidePath}>Jane Street York visit guide</Link>.
            The shorter how-to-reach page is <Link href="/visit">/visit</Link>.
            The York store page is{" "}
            <Link href={STORE.storePagePath}>Weed Dispensary in York</Link>.
            Neighbourhood walk-in notes are on the{" "}
            <Link href={STORE.corridorPath}>Jane &amp; Lawrence corridor guide</Link>.
            None of those replace the homepage as the website URL for this store.
          </p>
        </section>

        <section>
          <SccParityHub
            currentPath={STORE.hoursPath}
            heading="Jane Street visit, York weed, and flower tiers"
            intro="This open-now guide owns late-night hours. Flower tiers and the York weed hub stay on their own routes."
            geoSet="all"
            includeTiers
            tone="dark"
          />
        </section>

        <section>
          <h2>FAQ: 24 hour dispensary York / near me</h2>
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
