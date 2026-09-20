import Link from "next/link";
import Footer from "./Footer";
import Navbar from "./Navbar";
import styles from "./GBPLandingPage.module.css";
import { afterDarkWeedOwner as store } from "../lib/weedDiscovery";
import SccParityHub from "./SccParityHub";
import {
  STORE,
  WEED_DISPENSARY_FAQS,
  breadcrumbGraphNode,
  faqPageGraphNode,
  localBusinessNapGraphNode,
  mapsDirectionsUrl,
  mapsEmbedUrl,
  serializeJsonLd,
  webpageGraphNode,
} from "../lib/storeIdentity";

const pageH1 = "Weed Dispensary in York on Jane Street";
const canonical = `${STORE.baseUrl}${STORE.storePagePath}`;

const pageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    webpageGraphNode({
      id: canonical,
      name: pageH1,
      description:
        "York / Jane Street neighbourhood owner for weed at After Dark Cannabis, 1664 Jane Street. The homepage is the website URL and NAP hub.",
    }),
    breadcrumbGraphNode([
      { name: "Home", item: STORE.homepageUrl },
      { name: "Weed Dispensary in York", item: canonical },
    ]),
    faqPageGraphNode(WEED_DISPENSARY_FAQS),
    localBusinessNapGraphNode(),
  ],
};

export function GBPLandingPage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(pageSchema) }} />
        <section className={styles.hero}>
          <p className={styles.eyebrow}>Jane Street / York walk-in · Weed neighbourhood owner · Adults 19+</p>
          <h1>{pageH1}</h1>
          <p className={styles.lede}>
            After Dark Cannabis is the walk-in weed dispensary at {STORE.streetAddress}, just south of
            Lawrence Avenue West. This page is the York / Jane Street neighbourhood owner for weed,
            flower, and cannabis formats. The <Link href="/">homepage</Link> stays the NAP hub for
            address, phone, map, and website.
          </p>
          <p className={styles.heroAddress}>{STORE.addressLine}</p>
          <div className={styles.actions}>
            <Link href="#find-your-weed" className={styles.primaryAction}>Find Your Weed</Link>
            <Link href="/" className={styles.secondaryAction}>Homepage NAP hub</Link>
            <Link href="/visit" className={styles.secondaryAction}>How to Reach Jane Street</Link>
            <Link href={STORE.hoursPath} className={styles.secondaryAction}>Open now on Jane Street</Link>
            <Link href={STORE.corridorPath} className={styles.secondaryAction}>Jane &amp; Lawrence corridor</Link>
          </div>
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
            <br />
            {STORE.hoursNote}
          </p>
          <div className={styles.actions}>
            <a href={STORE.phoneTel}>Call the Jane Street counter</a>
            <a href={mapsDirectionsUrl} target="_blank" rel="noopener noreferrer">Google Maps directions</a>
            <Link href="/">Homepage NAP hub</Link>
            <Link href="/visit">How to reach Jane Street</Link>
            <Link href={STORE.hoursPath}>24-hour open-now guide</Link>
            <Link href={STORE.cannabisDeliveryPath}>York cannabis delivery</Link>
          </div>
        </section>

        <section className={styles.section}>
          <h2>Walk-In Cannabis Store at 1664 Jane St, York</h2>
          <p>After Dark Cannabis is the walk-in York weed dispensary at <strong>{STORE.streetAddress}</strong>, just south of Lawrence Avenue West. The counter is open 24 hours a day, seven days a week, so Jane Street, Weston, Mount Dennis, Keelesdale, Trethewey, and Black Creek shoppers can visit around their own schedule.</p>
          <p>This page is for people who want the physical store. If you are arranging a drop-off instead, start on the <Link href={STORE.cannabisDeliveryPath}>York cannabis delivery</Link> guide, then order from the <Link href={STORE.yorkDeliveryPath}>York delivery catalog</Link>. The walk-in and delivery routes stay separate so each page gives the correct address and service expectation. The 24-hour claim is for this Jane Street door, not for drop-off.</p>
          <p>Bring government photo ID. You must be 19 or older. Staff can walk you through the five posted flower tiers — Budget from $3/g, AA at $4/g, AAA+ at $5–$6/g, Premium at $7–$10/g, and Exotic at $10–$12/g — plus pre-rolls, edibles, vapes, concentrates, <Link href={STORE.nativeCigarettesPath}>native cigarettes</Link>, <Link href={STORE.nicotineVapePath}>nicotine vapes</Link>, and accessories. Posted menu prices can change. Live cigarette and nic-vape lists stay on <Link href="/items/cigarettes">/items/cigarettes</Link> and <Link href="/items/vapes">/items/vapes</Link>.</p>
          <p>The 35 Jane TTC bus serves the Jane Street corridor. Check current transit, traffic, and parking conditions before travelling. Call <a href={`tel:${STORE.phoneIntl}`}><strong>{STORE.phoneDisplay}</strong></a> if one specific item is the reason for the trip.</p>
        </section>

        <section className={styles.section}>
          <h2>Open now on Jane Street</h2>
          <p>If you need a 24 hour dispensary near you in York, the Jane Street counter is open now around the clock. Use the <Link href={STORE.hoursPath}>24-hour open-now guide</Link> for late-night arrival, ID, and Jane &amp; Lawrence context. Bus, parking, and corridor notes are on the <Link href={STORE.visitGuidePath}>Jane Street York visit guide</Link> and the <Link href="/visit">how-to-reach page</Link>.</p>
        </section>

        <section className={styles.section}>
          <h2>Jane &amp; Lawrence / Weston / Mount Dennis</h2>
          <p>Jane &amp; Lawrence is the nearest named intersection. Weston and Mount Dennis shoppers walk in at 1664 Jane Street — there is no second After Dark storefront on Weston Road, and no Mississauga or Etobicoke counter. Use the <Link href={STORE.corridorPath}>Jane &amp; Lawrence corridor guide</Link> for the neighbourhood map and pin.</p>
        </section>

        <section className={styles.section} id="find-your-weed">
          <p className={styles.kicker}>Find Your Weed at After Dark</p>
          <h2>Start With Flower</h2>
          <div className={styles.cardGrid}>{store.flowerTiers.map((item) => <Link href={item.href} className={styles.card} key={item.href}><span>{item.label}</span><small>{item.description}</small></Link>)}</div>
          <p>
            Flower shopping stays on the five Jane Street tiers:{" "}
            <Link href="/exotic-weed">Exotic</Link>, <Link href="/premium-weed">Premium</Link>,{" "}
            <Link href="/aaa-weed">AAA+</Link>, <Link href="/aa-weed">AA</Link>, and{" "}
            <Link href="/budget-weed">Budget</Link>. This York weed page stays the broad owner.
          </p>
          <div className={styles.inlineGuide}><span>Want more context before choosing a tier?</span><Link href="/resources/flower-guides">Explore the Flower Guides</Link></div>
          <SccParityHub
            currentPath={STORE.storePagePath}
            heading="Visit hubs from the York weed page"
            intro="This York weed page is the geo owner for 1664 Jane Street. The homepage stays the NAP hub. /visit covers 35 Jane and parking. Flower tiers, delivery, 24-hour hours, Native cigarettes, and nicotine vapes sit in the cards."
            geoSet="all"
            includeTiers
            tone="dark"
          />
          <h3 className={styles.subheading}>Choose a Cannabis Format</h3>
          <div className={styles.cardGrid}>{store.categories.map((item) => <Link href={item.href} className={styles.card} key={item.href}><span>{item.label}</span><small>{item.description}</small></Link>)}</div>
          <p className={styles.note}>Individual products can change. Call <a href={`tel:${STORE.phoneIntl}`}><strong>{STORE.phoneDisplay}</strong></a> if a particular item is the reason for your visit.</p>
        </section>

        <section className={styles.section}>
          <h2>Weed, Cannabis, Bud and Flower — Different Words, Useful Choices</h2>
          <p>People often use several words when talking about cannabis, but the words do not always describe the same part of the Jane Street menu.</p>
          <div className={styles.termGrid}>
            <article><h3>Weed</h3><p>Weed is common everyday language for cannabis. Someone looking for weed in York may ultimately want flower, pre-rolls, edibles, vapes, concentrates or another cannabis format at this Jane Street counter.</p></article>
            <article><h3>Cannabis</h3><p>Cannabis is the broader term. It covers flower as well as other cannabis formats available to explore at After Dark Cannabis on Jane Street.</p></article>
            <article><h3>Flower</h3><p>Flower refers specifically to dried cannabis flower. Flower at After Dark Cannabis can be explored through Budget, AA, AAA+, Premium and Exotic tiers.</p></article>
            <article><h3>Bud</h3><p>Bud is a common informal word for cannabis flower on the Jane Street menu.</p></article>
          </div>
          <p>Some shoppers want bud or flower, while others are looking for pre-rolls, edibles, vapes or concentrates.</p>
        </section>

        <section className={styles.section}>
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

        <section className={styles.section}>
          <h2>More Jane Street context</h2>
          <p>
            NAP, hours, and map: <Link href="/">homepage</Link>.
            How to reach: <Link href="/visit">/visit</Link>.
            Late-night walk-in: <Link href={STORE.hoursPath}>24-hour open-now guide</Link>.
            Delivery is a different service: <Link href={STORE.cannabisDeliveryPath}>York cannabis delivery</Link>.
            Native cigarettes: <Link href={STORE.nativeCigarettesPath}>Native cigarettes on Jane Street</Link>.
            Nicotine vapes: <Link href={STORE.nicotineVapePath}>nicotine vapes on Jane Street</Link>.
            Flower tiers:{" "}
            <Link href="/exotic-weed">Exotic</Link>, <Link href="/premium-weed">Premium</Link>,{" "}
            <Link href="/aaa-weed">AAA+</Link>, <Link href="/aa-weed">AA</Link>,{" "}
            <Link href="/budget-weed">Budget</Link>.
            Weston and Mount Dennis walk-in notes:{" "}
            <Link href={STORE.corridorPath}>Jane &amp; Lawrence corridor guide</Link>.
            None of those replace this page as the York / Jane Street weed dispensary neighbourhood owner.
          </p>
        </section>

        <section className={styles.visitSection} id="visit">
          <div><p className={styles.kicker}>Open 24 Hours on Jane Street</p><h2>{store.storeName}</h2><address>{store.streetAddress}<br />{store.city}, {store.province} {store.postalCode}</address></div>
          <div className={styles.visitFacts}><strong>Open 24 Hours · 7 Days a Week</strong><a href={`tel:${store.phoneIntl}`}>Phone: {store.phoneDisplay}</a><span>Adults 19+</span></div>
          <p>Being open around the clock gives adults 19+ flexibility to visit After Dark Cannabis at the time that suits them. Confirm late-night hours and ID on the <Link href={STORE.hoursPath}>24-hour open-now guide</Link>. Neighbourhood walk-in notes live on the <Link href={STORE.corridorPath}>Jane &amp; Lawrence corridor guide</Link> and the <Link href={STORE.visitGuidePath}>Jane Street York visit guide</Link>. For a particular product, call ahead before travelling specifically for that item.</p>
        </section>

        <section className={styles.section}>
          <h2>Explore After Dark Cannabis Guides</h2>
          <div className={styles.guideGrid}>{store.guides.map((guide) => <article className={styles.guideCard} key={guide.href}><h3>{guide.label}</h3><p>{guide.description}</p><Link href={guide.href}>Explore {guide.label}</Link></article>)}</div>
          <div className={styles.inlineGuide}>
            <span>New to the terminology or planning your first visit?</span>
            <Link href="/resources/cannabis-dispensary-vs-weed-dispensary">Cannabis dispensary vs. weed dispensary</Link>
            <Link href="/resources/cannabis-101">Cannabis 101</Link>
            <Link href="/resources/first-cannabis-dispensary-visit">First dispensary visit guide</Link>
          </div>
        </section>

        <section className={styles.section} id="faq">
          <h2>FAQ: weed dispensary York / Jane Street</h2>
          <div className={styles.faqList}>
            {WEED_DISPENSARY_FAQS.map((faq) => (
              <article className={styles.faqItem} key={faq.q}>
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
