import Link from "next/link";
import Footer from "./Footer";
import Navbar from "./Navbar";
import styles from "./GBPLandingPage.module.css";
import { afterDarkWeedOwner as store } from "../lib/weedDiscovery";
import SccParityHub from "./SccParityHub";
import {
  STORE,
  breadcrumbGraphNode,
  faqPageGraphNode,
  serializeJsonLd,
  webpageGraphNode,
} from "../lib/storeIdentity";

const faqItems = [
  { question: "Where is After Dark Cannabis?", text: `After Dark Cannabis is located at ${store.address}.`, answer: <>After Dark Cannabis is located at <strong>{store.address}</strong>.</> },
  { question: "Is After Dark Cannabis open 24 hours?", text: "Yes. After Dark Cannabis is open 24 hours a day, seven days a week.", answer: <>Yes. After Dark Cannabis is <strong>open 24 hours a day, seven days a week</strong>.</> },
  { question: "Is After Dark Cannabis open now on Jane Street?", text: `Yes. The York walk-in at ${store.address} is open 24 hours, including after midnight.`, answer: <>Yes. The York walk-in at <strong>{store.address}</strong> is open 24 hours, including after midnight.</> },
  { question: "What cannabis categories can I explore?", text: "Adults 19+ can explore Budget, AA, AAA+, Premium and Exotic flower tiers, plus pre-rolls, edibles, vapes, concentrates and accessories.", answer: <>Adults 19+ can explore Budget, AA, AAA+, Premium and Exotic flower tiers, plus pre-rolls, edibles, vapes, concentrates and accessories.</> },
  { question: "What is the difference between weed and cannabis?", text: "Weed is common everyday terminology for cannabis. Cannabis is the broader term and can include flower, pre-rolls, edibles, vapes, concentrates and other formats.", answer: <><strong>Weed</strong> is common everyday terminology for cannabis. <strong>Cannabis</strong> is the broader term and can include flower, pre-rolls, edibles, vapes, concentrates and other formats.</> },
  { question: "What is the difference between bud and flower?", text: "Flower is the category term for dried cannabis flower. Bud is a common informal word people use for flower.", answer: <><strong>Flower</strong> is the category term for dried cannabis flower. <strong>Bud</strong> is a common informal word people use for flower.</> },
  { question: "Can I explore different flower tiers?", text: "Yes. After Dark Cannabis has dedicated sections for Budget, AA, AAA+, Premium and Exotic flower browsing.", answer: <>Yes. After Dark Cannabis has dedicated sections for Budget, AA, AAA+, Premium and Exotic flower browsing.</> },
  { question: "Is ‘After Dark’ the name of a cannabis strain?", text: `After Dark Cannabis is the store name. If you are looking for a particular strain or product, call ${store.phoneDisplay} before making a special trip.`, answer: <>After Dark Cannabis is the store name. If you are looking for a particular strain or product, call <a href={`tel:${store.phoneIntl}`}><strong>{store.phoneDisplay}</strong></a> before making a special trip.</> },
  { question: "How can I check on a specific product before visiting?", text: `Call After Dark Cannabis at ${store.phoneDisplay} before making a special trip for one particular product.`, answer: <>Call After Dark Cannabis at <a href={`tel:${store.phoneIntl}`}><strong>{store.phoneDisplay}</strong></a> before making a special trip for one particular product.</> },
  { question: "Do I need to be 19+?", text: "Yes. After Dark Cannabis is for adults 19+.", answer: <>Yes. After Dark Cannabis is for <strong>adults 19+</strong>.</> },
];

const faqSchemaItems = faqItems.map((item) => ({ q: item.question, a: item.text }));

const pageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    webpageGraphNode({
      id: `${STORE.baseUrl}${STORE.storePagePath}`,
      name: "York Weed Dispensary on Jane Street — Open 24 Hours",
      description: "Walk-in York dispensary page for After Dark Cannabis at 1664 Jane Street. The homepage is the website URL.",
    }),
    breadcrumbGraphNode([
      { name: "Home", item: STORE.homepageUrl },
      { name: "York dispensary", item: `${STORE.baseUrl}${STORE.storePagePath}` },
    ]),
    faqPageGraphNode(faqSchemaItems),
  ],
};

export function GBPLandingPage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(pageSchema) }} />
        <section className={styles.hero}>
          <p className={styles.eyebrow}>Open 24 Hours · Adults 19+</p>
          <h1>York Weed Dispensary on Jane Street — Open 24 Hours</h1>
          <p className={styles.heroAddress}>{store.address}</p>
          <div className={styles.actions}><Link href="#find-your-weed" className={styles.primaryAction}>Find Your Weed</Link><Link href="/" className={styles.secondaryAction}>Homepage NAP hub</Link><Link href="/visit" className={styles.secondaryAction}>How to Reach Jane Street</Link><Link href={STORE.hoursPath} className={styles.secondaryAction}>Open now on Jane Street</Link><Link href={STORE.corridorPath} className={styles.secondaryAction}>Jane &amp; Lawrence corridor</Link></div>
        </section>

        <section className={styles.section}>
          <h2>Walk-In Cannabis Store at 1664 Jane St, York</h2>
          <p>After Dark Cannabis is the walk-in York weed dispensary at <strong>{store.streetAddress}</strong>, just south of Lawrence Avenue West. The counter is open 24 hours a day, seven days a week, so Jane Street, Weston, Mount Dennis, Keelesdale, Trethewey, and Black Creek shoppers can visit around their own schedule.</p>
          <p>This page is for people who want the physical store. If you are arranging a drop-off instead, start on the <Link href={STORE.cannabisDeliveryPath}>York cannabis delivery</Link> guide, then order from the <Link href={STORE.yorkDeliveryPath}>York delivery catalog</Link>. The walk-in and delivery routes stay separate so each page gives the correct address and service expectation. The 24-hour claim is for this Jane Street door, not for drop-off.</p>
          <p>Bring government photo ID. You must be 19 or older. Staff can walk you through the five posted flower tiers — Budget from $3/g, AA at $4/g, AAA+ at $5–$6/g, Premium at $7–$10/g, and Exotic at $10–$12/g — plus pre-rolls, edibles, vapes, concentrates, native cigarettes, and accessories. Posted menu prices can change.</p>
          <p>The 35 Jane TTC bus serves the Jane Street corridor. Check current transit, traffic, and parking conditions before travelling. Call <a href={`tel:${store.phoneIntl}`}><strong>{store.phoneDisplay}</strong></a> if one specific item is the reason for the trip.</p>
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
          <div className={styles.inlineGuide}><span>Want more context before choosing a tier?</span><Link href="/resources/flower-guides">Explore the Flower Guides</Link></div>
          <SccParityHub
            currentPath={STORE.storePagePath}
            heading="Visit hubs from the York weed page"
            intro="This York weed page is the geo owner for 1664 Jane Street. The homepage stays the NAP hub. /visit covers 35 Jane and parking. Flower tiers sit in the cards above."
            geoSet="all"
            includeTiers={false}
            tone="dark"
          />
          <h3 className={styles.subheading}>Choose a Cannabis Format</h3>
          <div className={styles.cardGrid}>{store.categories.map((item) => <Link href={item.href} className={styles.card} key={item.href}><span>{item.label}</span><small>{item.description}</small></Link>)}</div>
          <p className={styles.note}>Individual products can change. Call <a href={`tel:${store.phoneIntl}`}><strong>{store.phoneDisplay}</strong></a> if a particular item is the reason for your visit.</p>
        </section>

        <section className={styles.section}>
          <h2>Weed, Cannabis, Bud and Flower — Different Words, Useful Choices</h2>
          <p>People often use several words when talking about cannabis, but the words do not always describe the same part of the menu.</p>
          <div className={styles.termGrid}>
            <article><h3>Weed</h3><p>Weed is common everyday language for cannabis. Someone looking for weed may ultimately want flower, pre-rolls, edibles, vapes, concentrates or another cannabis format.</p></article>
            <article><h3>Cannabis</h3><p>Cannabis is the broader term. It covers flower as well as other cannabis formats available to explore at After Dark Cannabis.</p></article>
            <article><h3>Flower</h3><p>Flower refers specifically to dried cannabis flower. Flower at After Dark Cannabis can be explored through Budget, AA, AAA+, Premium and Exotic tiers.</p></article>
            <article><h3>Bud</h3><p>Bud is a common informal word for cannabis flower.</p></article>
          </div>
          <p>Some shoppers want bud or flower, while others are looking for pre-rolls, edibles, vapes or concentrates.</p>
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

        <section className={styles.section} id="faq"><h2>Frequently Asked Questions</h2><div className={styles.faqList}>{faqItems.map((item) => <article className={styles.faqItem} key={item.question}><h3>{item.question}</h3><p>{item.answer}</p></article>)}</div></section>
      </main>
      <Footer />
    </>
  );
}
