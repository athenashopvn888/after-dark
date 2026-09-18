import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import {
  DELIVERY_FAQS,
  STORE,
  breadcrumbGraphNode,
  faqPageGraphNode,
  localBusinessNapGraphNode,
  mapsDirectionsUrl,
  mapsEmbedUrl,
  serializeJsonLd,
  webpageGraphNode,
} from "../lib/storeIdentity";
import SccParityHub from "../components/SccParityHub";
import styles from "../visit/visit.module.css";

const canonical = `${STORE.baseUrl}${STORE.cannabisDeliveryPath}`;
const pageTitle = "Cannabis Delivery in York from Jane Street | After Dark Cannabis";
const pageH1 = "Cannabis Delivery in York from Jane Street";
const pageDescription =
  "York-radius cannabis delivery from After Dark at 1664 Jane Street, York, ON M9N 2S1. Dispatcher confirms address — not 24-hour delivery. Call +1 (437) 524-9344. Adults 19+.";

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  keywords: [
    "cannabis delivery York",
    "weed delivery Jane Street",
    "York cannabis delivery",
    "Jane Street weed delivery",
    "cannabis delivery near Jane and Lawrence",
  ],
  alternates: { canonical },
  robots: { index: true, follow: true },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: canonical,
    images: [{ url: STORE.schemaImage, alt: "After Dark Cannabis — Jane Street York cannabis delivery" }],
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
        "York-radius cannabis drop-off from After Dark Cannabis at 1664 Jane Street. The Jane Street walk-in is 24 hours; delivery is confirmed by the dispatcher.",
    }),
    breadcrumbGraphNode([
      { name: "Home", item: STORE.homepageUrl },
      { name: "York cannabis delivery", item: canonical },
    ]),
    faqPageGraphNode(DELIVERY_FAQS),
    localBusinessNapGraphNode(),
  ],
};

export default function CannabisDeliveryYorkPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(pageSchema) }}
      />
      <Navbar />
      <main className={styles.main}>
        <section className={styles.hero}>
          <p className={styles.eyebrow}>
            Jane Street / York drop-off · Dispatcher confirms address · Adults 19+
          </p>
          <h1>{pageH1}</h1>
          <p className={styles.lede}>
            After Dark Cannabis coordinates York-radius cannabis drop-off from{" "}
            {STORE.streetAddress}, just south of Lawrence Avenue West. This page is the
            neighbourhood delivery guide. The live catalog and LIVE ORDER chat live on{" "}
            <Link href={STORE.yorkDeliveryPath}>Weed Delivery in York</Link>. The{" "}
            <Link href="/">homepage</Link> stays the NAP hub for address, phone, map, and website.
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
            <a href={STORE.homepageUrl}>{STORE.homepageUrl}</a>
          </p>
          <p>
            Walk-in hours: {STORE.hoursNote}. Delivery is a separate dispatcher service — see hours
            below. Do not treat the 24-hour Jane Street door as a 24-hour drop-off window.
          </p>
          <div className={styles.actions}>
            <Link href={STORE.yorkDeliveryPath}>Open the York delivery catalog</Link>
            <a href={STORE.phoneTel}>Call the Jane Street counter</a>
            <a href={mapsDirectionsUrl} target="_blank" rel="noopener noreferrer">
              Google Maps directions
            </a>
            <Link href="/">Homepage NAP hub</Link>
            <Link href="/visit">How to reach Jane Street</Link>
            <Link href={STORE.storePagePath}>York weed dispensary</Link>
          </div>
        </section>

        <section>
          <h2>Delivery area from 1664 Jane Street</h2>
          <p>
            Drop-off leaves from the Jane Street York store at {STORE.addressLine}. Jane Street,
            Jane &amp; Lawrence, Weston, and Mount Dennis sit in the same basin as this counter.
            Coverage is York-radius and confirmed after you send the order — this page does not
            promise every pin, every side street, or a second After Dark shop on Weston Road.
          </p>
          <p>
            Count south from the Jane &amp; Lawrence lights to {STORE.streetAddress} if you are
            meeting the walk-in instead. There is no Mississauga or Etobicoke After Dark storefront,
            and leftover city-farm URLs are not extra delivery depots.
          </p>
        </section>

        <section>
          <h2>Delivery hours vs the 24-hour walk-in</h2>
          <p>
            The physical counter at 1664 Jane Street is open 24 hours a day, seven days a week.
            That claim belongs to the walk-in door and the{" "}
            <Link href={STORE.hoursPath}>24-hour open-now guide</Link>. Cannabis delivery is not
            advertised as 24/7 on this site.
          </p>
          <p>
            York-radius drop-off runs when the dispatcher can take the address. LIVE ORDER Web Chat
            can be paused. Availability, ETA, and whether your Jane Street / York / Weston / Mount
            Dennis pin is in range are confirmed in chat — not by copying the walk-in hours onto a
            delivery promise.
          </p>
        </section>

        <section>
          <h2>How to order York cannabis delivery</h2>
          <p>
            Use the catalog to pick names and weights, then talk to the After Dark dispatcher. The
            store confirms current availability and delivery details before an order is accepted.
            There is a <strong>$60 product minimum</strong>.
          </p>
          <ol className={styles.steps}>
            <li>
              <strong>Browse the York delivery catalog.</strong> Open{" "}
              <Link href={STORE.yorkDeliveryPath}>Weed Delivery in York</Link> and note the product
              names and weights you want.
            </li>
            <li>
              <strong>Select LIVE ORDER.</strong> Web Chat sits at the bottom-right of the catalog
              page. Send your choices to the dispatcher.
            </li>
            <li>
              <strong>Verify privately if you are new.</strong> New customers complete the private
              selfie-with-ID step in Web Chat. Adults 19+ only.
            </li>
            <li>
              <strong>Confirm the address.</strong> The dispatcher confirms availability, delivery
              details, and next steps for your York-radius pin.
            </li>
          </ol>
          <div className={styles.actions}>
            <Link href={STORE.yorkDeliveryPath}>Start a York delivery order</Link>
            <a href={STORE.phoneTel}>Call {STORE.phoneDisplay}</a>
          </div>
        </section>

        <section>
          <h2>Walk-in on Jane Street instead</h2>
          <p>
            Prefer the counter? After Dark is the York weed dispensary at {STORE.streetAddress}.
            Bus, parking, and Jane &amp; Lawrence arrival notes are on{" "}
            <Link href="/visit">how to reach Jane Street</Link>. Broad weed intent lives on{" "}
            <Link href={STORE.storePagePath}>Weed Dispensary in York</Link>. Flower shopping stays
            on the five tiers:{" "}
            <Link href="/exotic-weed">Exotic</Link>, <Link href="/premium-weed">Premium</Link>,{" "}
            <Link href="/aaa-weed">AAA+</Link>, <Link href="/aa-weed">AA</Link>, and{" "}
            <Link href="/budget-weed">Budget</Link>.
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
            NAP, hours, and map: <Link href="/">homepage</Link>.
            How to reach: <Link href="/visit">/visit</Link>.
            York weed hub: <Link href={STORE.storePagePath}>Weed Dispensary in York</Link>.
            Late-night walk-in: <Link href={STORE.hoursPath}>24-hour open-now guide</Link>.
            Weston and Mount Dennis walk-in notes:{" "}
            <Link href={STORE.corridorPath}>Jane &amp; Lawrence corridor guide</Link>.
            Order menu: <Link href={STORE.yorkDeliveryPath}>Weed Delivery in York</Link>.
            None of those replace this page as the York / Jane Street delivery neighbourhood guide.
          </p>
        </section>

        <section>
          <SccParityHub
            currentPath={STORE.cannabisDeliveryPath}
            heading="York weed, visit, and Jane Street flower tiers"
            intro="This page owns York / Jane Street drop-off intent. The 24-hour claim stays on the walk-in. Flower tiers stay narrow; the York weed hub owns broad weed intent."
            geoSet="all"
            includeTiers
            tone="dark"
          />
        </section>

        <section>
          <h2>FAQ: cannabis delivery York / Jane Street</h2>
          <div className={styles.faqList}>
            {DELIVERY_FAQS.map((faq) => (
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
