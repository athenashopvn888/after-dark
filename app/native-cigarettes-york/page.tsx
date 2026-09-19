import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import {
  NATIVE_CIGARETTE_FAQS,
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

const canonical = `${STORE.baseUrl}${STORE.nativeCigarettesPath}`;
const pageTitle = "Native Cigarettes on Jane Street in York | After Dark Cannabis";
const pageH1 = "Native Cigarettes on Jane Street in York";
const pageDescription =
  "Native cigarettes at After Dark, 1664 Jane Street, York, ON M9N 2S1. Walk-in neighbourhood guide — live brands on /items/cigarettes. Call +1 (437) 524-9344. Adults 19+.";

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  keywords: [
    "native cigarettes York",
    "native cigarettes Jane Street",
    "cigarettes York ON",
    "Jane Street native cigarettes",
    "York smoke shop cigarettes",
  ],
  alternates: { canonical },
  robots: { index: true, follow: true },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: canonical,
    images: [{ url: STORE.schemaImage, alt: "After Dark Cannabis — Native cigarettes on Jane Street in York" }],
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
        "Jane Street / York neighbourhood guide for Native cigarettes at After Dark Cannabis. The live cigarette menu is the current brand list.",
    }),
    breadcrumbGraphNode([
      { name: "Home", item: STORE.homepageUrl },
      { name: "Native cigarettes York", item: canonical },
    ]),
    faqPageGraphNode(NATIVE_CIGARETTE_FAQS),
    localBusinessNapGraphNode(),
  ],
};

export default function NativeCigarettesYorkPage() {
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
            Jane Street / York walk-in · Cigarette category · Adults 19+
          </p>
          <h1>{pageH1}</h1>
          <p className={styles.lede}>
            After Dark Cannabis carries Native cigarettes as a listed walk-in category at{" "}
            {STORE.streetAddress}, just south of Lawrence Avenue West. This page is the York /
            Jane Street neighbourhood guide. Current brand names, pack styles, and posted prices
            live on the <Link href="/items/cigarettes">cigarette menu</Link>. The{" "}
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
            Walk-in hours: {STORE.hoursNote}. Cigarette shopping uses this Jane Street door. Do
            not treat a leftover city-farm URL or a Weston Road pin as a second smoke counter.
          </p>
          <div className={styles.actions}>
            <Link href="/items/cigarettes">Open the cigarette menu</Link>
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
          <h2>Native cigarettes at 1664 Jane Street</h2>
          <p>
            Shoppers searching Native cigarettes in York, Jane Street cigarettes, or a smoke
            counter near Jane &amp; Lawrence use this walk-in. The category is already on the
            live site — navbar, homepage spotlight, and <Link href="/items/cigarettes">/items/cigarettes</Link>{" "}
            — so this page does not invent a shelf. It tells Jane Street, Weston, and Mount
            Dennis adults where that category sits and how to confirm it before travelling.
          </p>
          <p>
            A separate product-card guide still lives at{" "}
            <Link href="/info/native-cigarettes-york">/info/native-cigarettes-york</Link>. This
            neighbourhood URL is the York / Jane owner for the search. Educational Ontario
            context stays on the{" "}
            <Link href="/resources/native-cigarettes-ontario">Native cigarettes in Ontario</Link>{" "}
            resource. Neither page is a medical, cultural, or Nation-affiliation claim — retail
            counter only.
          </p>
        </section>

        <section>
          <h2>How to shop the Jane Street cigarette category</h2>
          <p>
            Use the live menu, then walk in with government photo ID. Adults 19+ only. Posted
            names move, so treat last week&apos;s screenshot as a starting point, not a hold.
          </p>
          <ol className={styles.steps}>
            <li>
              <strong>Open the cigarette menu.</strong> Compare brands and listed prices on{" "}
              <Link href="/items/cigarettes">/items/cigarettes</Link>.
            </li>
            <li>
              <strong>Call if one pack is the trip.</strong> The counter can confirm whether that
              name is still posted: {STORE.phoneDisplay}.
            </li>
            <li>
              <strong>Arrive at 1664 Jane Street.</strong> Count south from the Jane &amp; Lawrence
              lights. Bus and parking notes are on <Link href="/visit">how to reach Jane Street</Link>.
            </li>
            <li>
              <strong>Bring ID.</strong> Same 19+ rule overnight as at noon. Late-night hours live
              on the <Link href={STORE.hoursPath}>24-hour open-now guide</Link>.
            </li>
          </ol>
          <div className={styles.actions}>
            <Link href="/items/cigarettes">Check the current cigarette list</Link>
            <a href={STORE.phoneTel}>Call {STORE.phoneDisplay}</a>
          </div>
        </section>

        <section>
          <h2>Pouches, grabba, and related smoke-shop listings</h2>
          <p>
            When nicotine pouches, Backwoods, or grabba appear on the current sheet, they sit
            with the Jane Street cigarette category — not on invented extra landing pages. If a
            pouch or wrap is the reason for the visit, confirm it on{" "}
            <Link href="/items/cigarettes">the cigarette menu</Link> first.
          </p>
        </section>

        <section>
          <h2>Prefer a nicotine vape instead?</h2>
          <p>
            Nicotine vapes are a separate listed category at this same York door. Keep them
            off the cigarette page and off the THC vape page. Start on{" "}
            <Link href={STORE.nicotineVapePath}>nicotine vapes on Jane Street</Link>, then use{" "}
            <Link href="/items/vapes">/items/vapes</Link>. Nicotine is addictive.
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
            Delivery is a different service:{" "}
            <Link href={STORE.cannabisDeliveryPath}>York cannabis delivery</Link>.
            None of those replace this page as the Native cigarette neighbourhood guide.
          </p>
        </section>

        <section>
          <SccParityHub
            currentPath={STORE.nativeCigarettesPath}
            heading="York weed, visit, and Jane Street flower tiers"
            intro="This page owns Native cigarette neighbourhood intent for Jane Street / York. The live cigarette menu stays the brand list. Flower tiers stay narrow; the York weed hub owns broad weed intent."
            geoSet="all"
            includeTiers
            tone="dark"
          />
        </section>

        <section>
          <h2>FAQ: Native cigarettes York / Jane Street</h2>
          <div className={styles.faqList}>
            {NATIVE_CIGARETTE_FAQS.map((faq) => (
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
