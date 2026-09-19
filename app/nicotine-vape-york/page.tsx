import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import {
  NICOTINE_VAPE_FAQS,
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

const canonical = `${STORE.baseUrl}${STORE.nicotineVapePath}`;
const pageTitle = "Nicotine Vapes on Jane Street in York | After Dark Cannabis";
const pageH1 = "Nicotine Vapes on Jane Street in York";
const pageDescription =
  "Nicotine vapes at After Dark, 1664 Jane Street, York, ON M9N 2S1. Neighbourhood guide — live devices on /items/vapes, not THC. Call +1 (437) 524-9344. Adults 19+. Nicotine is addictive.";

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  keywords: [
    "nicotine vape York",
    "nicotine vapes Jane Street",
    "nic vape York ON",
    "Jane Street nicotine vape",
    "York nicotine vape shop",
  ],
  alternates: { canonical },
  robots: { index: true, follow: true },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: canonical,
    images: [{ url: STORE.schemaImage, alt: "After Dark Cannabis — nicotine vapes on Jane Street in York" }],
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
        "Jane Street / York neighbourhood guide for nicotine vapes at After Dark Cannabis. The live /items/vapes menu is the current device list. Nicotine is addictive.",
    }),
    breadcrumbGraphNode([
      { name: "Home", item: STORE.homepageUrl },
      { name: "Nicotine vapes York", item: canonical },
    ]),
    faqPageGraphNode(NICOTINE_VAPE_FAQS),
    localBusinessNapGraphNode(),
  ],
};

export default function NicotineVapeYorkPage() {
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
            Jane Street / York walk-in · Nicotine vape category · Adults 19+
          </p>
          <h1>{pageH1}</h1>
          <p className={styles.lede}>
            After Dark Cannabis lists nicotine vapes as their own Jane Street category at{" "}
            {STORE.streetAddress}, kept separate from THC vapes. This page is the York /
            neighbourhood guide. Current devices, flavours, and posted prices live on{" "}
            <Link href="/items/vapes">/items/vapes</Link>. Nicotine is addictive. The{" "}
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
            Walk-in hours: {STORE.hoursNote}. Nicotine vape shopping uses this Jane Street door.
            Delivery pages do not replace the physical nic-vape counter.
          </p>
          <div className={styles.actions}>
            <Link href="/items/vapes">Open the nicotine vape menu</Link>
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
          <h2>Nicotine vapes vs THC vapes on Jane Street</h2>
          <p>
            The live site already sells this class: navbar &quot;Nic Vape,&quot; homepage
            spotlight, and <Link href="/items/vapes">/items/vapes</Link>. THC and cannabis
            disposables stay on <Link href="/items/vape-disposables">/items/vape-disposables</Link>.
            This neighbourhood page does not mix those routes or invent a device that is not on
            the current sheet.
          </p>
          <p>
            A limited product-card audit still lives at{" "}
            <Link href="/info/nicotine-vapes-york">/info/nicotine-vapes-york</Link>. Use that
            guide for the four checked cards; use this URL for Jane Street / York intent; use
            the category menu for what is actually posted today.
          </p>
        </section>

        <section>
          <h2>How to shop nicotine vapes in York</h2>
          <p>
            Confirm the live list, then walk in with government photo ID. Adults 19+ only.
            Hardware styles change with the sheet. Do not assume a puff-count or flavour from an
            old photo will still be in the case.
          </p>
          <ol className={styles.steps}>
            <li>
              <strong>Open the nicotine category.</strong> Review listed devices on{" "}
              <Link href="/items/vapes">/items/vapes</Link>.
            </li>
            <li>
              <strong>Keep THC on a different list.</strong> Cannabis vapes are{" "}
              <Link href="/items/vape-disposables">the THC vape menu</Link>.
            </li>
            <li>
              <strong>Call if one name is the trip.</strong> Staff can check the posted nic-vape
              section: {STORE.phoneDisplay}.
            </li>
            <li>
              <strong>Arrive at 1664 Jane Street.</strong> Transit and parking are on{" "}
              <Link href="/visit">how to reach Jane Street</Link>. Overnight hours are on the{" "}
              <Link href={STORE.hoursPath}>24-hour open-now guide</Link>.
            </li>
          </ol>
          <p>Nicotine is addictive. This page does not claim performance, lifespan, or health outcomes.</p>
          <div className={styles.actions}>
            <Link href="/items/vapes">Check the current nic-vape list</Link>
            <a href={STORE.phoneTel}>Call {STORE.phoneDisplay}</a>
          </div>
        </section>

        <section>
          <h2>Pouches stay on the cigarette menu</h2>
          <p>
            Nicotine pouches, when listed, appear with cigarettes at{" "}
            <Link href="/items/cigarettes">/items/cigarettes</Link>. They are not this vape
            guide and they do not get a standalone pouch landing. Native cigarette
            neighbourhood intent lives on{" "}
            <Link href={STORE.nativeCigarettesPath}>Native cigarettes on Jane Street</Link>.
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
            None of those replace this page as the nicotine vape neighbourhood guide.
          </p>
        </section>

        <section>
          <SccParityHub
            currentPath={STORE.nicotineVapePath}
            heading="York weed, visit, and Jane Street flower tiers"
            intro="This page owns nicotine vape neighbourhood intent for Jane Street / York. The live /items/vapes menu stays the device list. THC vapes and flower tiers stay on their own routes."
            geoSet="all"
            includeTiers
            tone="dark"
          />
        </section>

        <section>
          <h2>FAQ: nicotine vape York / Jane Street</h2>
          <div className={styles.faqList}>
            {NICOTINE_VAPE_FAQS.map((faq) => (
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
