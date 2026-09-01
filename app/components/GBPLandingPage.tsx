import Link from "next/link";
import Footer from "./Footer";
import Navbar from "./Navbar";
import styles from "./GBPLandingPage.module.css";
import { afterDarkWeedOwner as store } from "../lib/weedDiscovery";

const faqItems = [
  { question: "Where is After Dark Cannabis?", answer: <>After Dark Cannabis is located at <strong>{store.address}</strong>.</> },
  { question: "Is After Dark Cannabis open 24 hours?", answer: <>Yes. After Dark Cannabis is <strong>open 24 hours a day, seven days a week</strong>.</> },
  { question: "What cannabis categories can I explore?", answer: <>Adults 19+ can explore Budget, AA, AAA+, Premium and Exotic flower tiers, plus pre-rolls, edibles, vapes, concentrates and accessories.</> },
  { question: "What is the difference between weed and cannabis?", answer: <><strong>Weed</strong> is common everyday terminology for cannabis. <strong>Cannabis</strong> is the broader term and can include flower, pre-rolls, edibles, vapes, concentrates and other formats.</> },
  { question: "What is the difference between bud and flower?", answer: <><strong>Flower</strong> is the category term for dried cannabis flower. <strong>Bud</strong> is a common informal word people use for flower.</> },
  { question: "Can I explore different flower tiers?", answer: <>Yes. After Dark Cannabis has dedicated sections for Budget, AA, AAA+, Premium and Exotic flower browsing.</> },
  { question: "Is ‘After Dark’ the name of a cannabis strain?", answer: <>After Dark Cannabis is the store name. If you are looking for a particular strain or product, call <a href={`tel:${store.phoneIntl}`}><strong>{store.phoneDisplay}</strong></a> before making a special trip.</> },
  { question: "How can I check on a specific product before visiting?", answer: <>Call After Dark Cannabis at <a href={`tel:${store.phoneIntl}`}><strong>{store.phoneDisplay}</strong></a> before making a special trip for one particular product.</> },
  { question: "Do I need to be 19+?", answer: <>Yes. After Dark Cannabis is for <strong>adults 19+</strong>.</> },
];

const storeSchema = {
  "@context": "https://schema.org",
  "@type": "Store",
  "@id": "https://afterdarkcannabis.com/weed-dispensary-york/",
  name: store.storeName,
  url: "https://afterdarkcannabis.com/weed-dispensary-york/",
  telephone: store.phoneIntl,
  address: { "@type": "PostalAddress", streetAddress: store.streetAddress, addressLocality: store.city, addressRegion: store.province, postalCode: store.postalCode, addressCountry: "CA" },
  openingHours: "Mo-Su 00:00-23:59",
};

export function GBPLandingPage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(storeSchema) }} />
        <section className={styles.hero}>
          <p className={styles.eyebrow}>Open 24 Hours · Adults 19+</p>
          <h1>After Dark Cannabis — Weed Dispensary in York</h1>
          <p className={styles.heroAddress}>{store.address}</p>
          <div className={styles.actions}><Link href="#find-your-weed" className={styles.primaryAction}>Find Your Weed</Link><Link href="#visit" className={styles.secondaryAction}>Plan Your Visit</Link></div>
        </section>

        <section className={styles.section}>
          <h2>Weed and Cannabis in York — Day or Night</h2>
          <p>After Dark Cannabis is located at <strong>{store.streetAddress}</strong> in York and is open <strong>24 hours a day, seven days a week</strong>.</p>
          <p>At After Dark Cannabis, adults 19+ can choose between flower tiers or focus on a cannabis format such as pre-rolls, edibles, vapes, concentrates or accessories. With the store open 24 hours on Jane Street, shoppers can decide what they want to explore before making the trip.</p>
          <p>Whether you usually call it weed, cannabis, bud or flower, the useful starting point is the type of cannabis you are interested in.</p>
          <p>If you are making a special trip for something specific, call <a href={`tel:${store.phoneIntl}`}><strong>{store.phoneDisplay}</strong></a> first.</p>
        </section>

        <section className={styles.section} id="find-your-weed">
          <p className={styles.kicker}>Find Your Weed at After Dark</p>
          <h2>Start With Flower</h2>
          <div className={styles.cardGrid}>{store.flowerTiers.map((item) => <Link href={item.href} className={styles.card} key={item.href}><span>{item.label}</span><small>{item.description}</small></Link>)}</div>
          <div className={styles.inlineGuide}><span>Want more context before choosing a tier?</span><Link href="/resources/flower-guides">Explore the Flower Guides</Link></div>
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
          <p>Being open around the clock gives adults 19+ flexibility to visit After Dark Cannabis at the time that suits them. For a particular product, call ahead before travelling specifically for that item.</p>
        </section>

        <section className={styles.section}>
          <h2>Explore After Dark Cannabis Guides</h2>
          <div className={styles.guideGrid}>{store.guides.map((guide) => <article className={styles.guideCard} key={guide.href}><h3>{guide.label}</h3><p>{guide.description}</p><Link href={guide.href}>Explore {guide.label}</Link></article>)}</div>
        </section>

        <section className={styles.section} id="faq"><h2>Frequently Asked Questions</h2><div className={styles.faqList}>{faqItems.map((item) => <article className={styles.faqItem} key={item.question}><h3>{item.question}</h3><p>{item.answer}</p></article>)}</div></section>
      </main>
      <Footer />
    </>
  );
}
