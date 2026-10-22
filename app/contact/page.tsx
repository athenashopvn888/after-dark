import type { Metadata } from "next";
import { FULL_NAME_NAP } from "../lib/fullNameNap";
import { sheetNap } from "../lib/fleet/coded";
import { getFleetContent } from "../lib/fleetContent";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  STORE,
  breadcrumbGraphNode,
  mapsEmbedUrl,
  mapsDirectionsUrl,
  serializeJsonLd,
  webpageGraphNode,
} from "../lib/storeIdentity";
import styles from "./contact.module.css";

export const dynamic = "force-dynamic";

const canonical = `${STORE.baseUrl}/contact`;

const metadata: Metadata = {
  title: { absolute: "Contact After Dark Cannabis | 1664 Jane Street York" },
  description:
    "Contact After Dark Cannabis at 1664 Jane Street, York, ON M9N 2S1. Open 24 hours. Call +1 (437) 524-9344. The homepage stays the visit hub.",
  alternates: {
    canonical,
  },
  openGraph: {
    title: "Contact After Dark Cannabis | 1664 Jane Street York",
    description:
      "1664 Jane Street, York, ON M9N 2S1. Open 24 hours. Call +1 (437) 524-9344.",
    url: canonical,
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const fleet = await getFleetContent();
  const page = fleet.pages.Contact;
  if (!fleet.active || !page || page.metaDescription === metadata.description) return metadata;
  const title = page.metaTitle || "Contact After Dark Cannabis | 1664 Jane Street York";
  const description = page.metaDescription;
  return {
    ...metadata,
    title: { absolute: title },
    description,
    openGraph: { ...metadata.openGraph, title, description },
  };
}

const pageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    webpageGraphNode({
      id: canonical,
      name: "Contact After Dark Cannabis",
      description: "Phone, address, and 24-hour hours for the Jane Street York walk-in. The homepage is the NAP hub.",
    }),
    breadcrumbGraphNode([
      { name: "Home", item: STORE.homepageUrl },
      { name: "Contact", item: canonical },
    ]),
  ],
};

export default async function ContactPage() {
  const nap = sheetNap(await getFleetContent());
  const name = nap?.name ?? STORE.name;
  const addressLine = nap ? `${nap.street}, ${nap.cityLine}` : STORE.addressLine;
  const street = nap?.street ?? STORE.streetAddress;
  const locality = nap?.city ?? STORE.addressLocality;
  const region = nap?.province ?? STORE.addressRegion;
  const postal = nap?.postalCode ?? STORE.postalCode;
  const intersection = nap?.intersection ?? STORE.intersection;
  const phoneDisplay = nap?.phoneDisplay ?? STORE.phoneDisplay;
  const phoneTel = nap?.phoneTel ?? STORE.phoneTel;
  const hoursNote = nap?.hours ?? STORE.hoursNote;
  const hoursLabel = nap?.hours ?? STORE.hoursLabel;
  const website = nap?.website ?? STORE.homepageUrl;
  const mapSrc = nap?.mapsEmbedUrl ?? mapsEmbedUrl;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(pageSchema) }}
      />
      <main className={styles.main}>
        <Navbar />

        <section className={styles.hero} style={{ paddingTop: 0 }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
            <img src="/banners/08_Contact_Us.webp" alt="Contact After Dark Cannabis on Jane Street in York" style={{ width: "100%", height: "auto", display: "block", borderRadius: "var(--radius-lg)" }} />
          <h1 className={styles.heroTitle} data-fullname-contact-h1="" style={{ marginTop: "16px", textAlign: "center", fontSize: "clamp(22px, 4vw, 34px)", lineHeight: 1.2, overflowWrap: "anywhere" }}>Contact {FULL_NAME_NAP.fullName}</h1>
          </div>
        </section>

        <section className={styles.infoSection}>
          <div className={styles.container}>
            <div className={`${styles.nap} nap`} aria-label="Store name, address, and phone">
              <p>
                <strong>{name}</strong>
                <br />
                {addressLine}
                <br />
                <a href={phoneTel}>{phoneDisplay}</a>
                <br />
                {hoursNote}
                <br />
                Website: <a href={website}>{website}</a>
              </p>
            </div>

            <div className={styles.infoGrid}>
              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>PIN</div>
                <h2 className={styles.infoTitle}>Location</h2>
                <p className={styles.infoText}>
                  {street}
                  <br />
                  {locality}, {region} {postal}
                  <br />
                  <span className={styles.infoMuted}>{intersection}</span>
                  <br />
                  <a href={phoneTel}>{phoneDisplay}</a>
                </p>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>24H</div>
                <h2 className={styles.infoTitle}>Hours</h2>
                <div className={styles.hoursTable}>
                  {STORE.hoursDays.map((day) => (
                    <div className={styles.hoursRow} key={day}>
                      <span>{day}</span>
                      <span className={styles.hoursTime}>24 Hours</span>
                    </div>
                  ))}
                </div>
                <div className={styles.openBadge}>
                  <span className={styles.openDot}></span>
                  {hoursLabel} — Never Closed
                </div>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>VISIT</div>
                <h2 className={styles.infoTitle}>Walk In</h2>
                <p className={styles.infoText}>
                  No appointment needed.
                  <br />
                  Walk in on Jane Street any hour.
                  <br />
                  Adults 19+ with government photo ID.
                </p>
                <div className={styles.featureList}>
                  <div className={styles.featureItem}>
                    <span className={styles.featureCheck}>{"\u2713"}</span>
                    Flower tiers and menu categories
                  </div>
                  <div className={styles.featureItem}>
                    <span className={styles.featureCheck}>{"\u2713"}</span>
                    Same counter after midnight
                  </div>
                  <div className={styles.featureItem}>
                    <span className={styles.featureCheck}>{"\u2713"}</span>
                    Knowledgeable budtenders
                  </div>
                  <div className={styles.featureItem}>
                    <span className={styles.featureCheck}>{"\u2713"}</span>
                    Debit &amp; cash accepted
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.mapSection}>
              <iframe
                title="Map of After Dark Cannabis at 1664 Jane Street, York"
                src={mapSrc}
                width="100%"
                height="360"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <p className={styles.mapNote}>
              The <Link href="/">homepage</Link> stays the NAP hub. Use <Link href="/visit">/visit</Link> for 35 Jane, parking, and corridor directions, the <Link href={STORE.hoursPath}>24-hour York page</Link> for late-night hours, or the <Link href={STORE.corridorPath}>Jane &amp; Lawrence corridor guide</Link> if you are coming from Weston or Mount Dennis.
              <span> </span>
              <a href={mapsDirectionsUrl} target="_blank" rel="noopener noreferrer">Google Maps directions</a>.
            </p>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
