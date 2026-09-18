import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { STORE } from "../lib/storeIdentity";
import styles from "./faq.module.css";

export const metadata: Metadata = {
  title: { absolute: "FAQ | 24-Hour York Dispensary on Jane Street | After Dark Cannabis" },
  description:
    "FAQ for After Dark Cannabis at 1664 Jane Street, York. Open 24 hours, parking, 35 Jane, menu tiers, and ID. Call +1 (437) 524-9344.",
  alternates: {
    canonical: `${STORE.baseUrl}/faq`,
  },
};

const FAQ_CATEGORIES = [
  {
    title: "📍 Location & Hours",
    faqs: [
      { q: "Where is After Dark Cannabis located?", a: `We are located at ${STORE.addressLine}, just south of Lawrence Avenue West. The 35 Jane bus serves the corridor.` },
      { q: "What are your hours?", a: "We are open 24 hours a day, 7 days a week, 365 days a year. Walk in anytime — no appointment needed." },
      { q: "Is After Dark Cannabis open now?", a: `Yes. The Jane Street counter at ${STORE.streetAddress} stays open overnight. Call ${STORE.phoneDisplay} if one listed item is the reason for the trip.` },
      { q: "Is there parking nearby?", a: "Yes. Street parking is typically available on Jane Street and surrounding streets in the evenings. Read posted signs. The 35 Jane bus also serves the block." },
      { q: "What's the best way to get to After Dark Cannabis?", a: "By TTC, ride the 35 Jane bus to the Jane and Lawrence area and walk south to 1664 Jane Street. By car, use evening street parking on Jane Street and the side streets." },
    ],
  },
  {
    title: "🌿 Products & Menu",
    faqs: [
      { q: "What products do you carry?", a: "We carry over 200 strains of cannabis flower across 5 quality tiers (Exotic, Premium, AAA+, AA, Budget), plus edibles (gummies, chocolates, baked goods), vape pens, disposable vapes, concentrates (shatter, wax, hash, diamonds, live resin), pre-rolled joints, native cigarettes, and accessories." },
      { q: "Do you have an online menu?", a: "Yes. The online menu organizes flower tiers and other product categories with their listed item details. Check the current page before visiting for one specific item." },
      { q: "What are your flower tiers?", a: "The flower menu is organized into Exotic, Premium, AAA+, AA, and Budget sections. Open a tier to compare its listed product names, weights, prices, and item details." },
      { q: "Can I browse edibles online?", a: "Yes. Open the edibles category to review the product names, package formats, and item details shown on the menu." },
      { q: "Do you sell vapes?", a: "Yes — both disposable vapes and refillable vape pens. We carry both nicotine vapes and THC vapes from top brands." },
      { q: "Do you sell native cigarettes?", a: "Yes! We carry one of the widest selections of native cigarettes in downtown York, including premium and value brands in multiple varieties." },
    ],
  },
  {
    title: "💰 Pricing & Bundle Offers",
    faqs: [
      { q: "What is the cheapest weed you sell?", a: "Our Budget tier starts at $3/g with value ounces from $40. Our AA tier is $4/g. These are the most competitive prices you'll find in York." },
      { q: "What bundle pricing do you offer?", a: "Flower bundle pricing includes a 3g total option — the 3g total is shown clearly before purchase. Our Exotic, Premium, and AAA+ tiers also offer 6g bundle pricing, with 6g total pricing." },
      { q: "Do you have ounce deals?", a: "Yes! Budget ounces from $40, AA ounces from $90, AAA+ ounces from $100. All with freshness and quality guaranteed." },
      { q: "How does bundle pricing work?", a: "The 3g bundle pricing applies to every tier automatically. The 6g bundle pricing applies to Exotic, Premium, and AAA+ tiers. These are our standard everyday bundle offers." },
      { q: "How does the tier pricing work?", a: "Each flower strain is graded into one of five quality tiers. The tier determines the per-gram price. This transparent system means you always know exactly what you're paying — no confusing markups or inconsistent pricing." },
    ],
  },
  {
    title: "🛒 Shopping & Experience",
    faqs: [
      { q: "Do I need an appointment?", a: "No! After Dark Cannabis is walk-in only. Just show up anytime — we're open 24 hours." },
      { q: "Can I order online?", a: "After Dark Cannabis is an in-store shopping experience. You can browse the online menu before visiting, but the site does not provide online checkout." },
      { q: "Do you offer delivery?", a: "York-radius drop-off is coordinated from the Jane Street store when the dispatcher can take the address. Use the cannabis delivery York page, then the York delivery catalog. Delivery is not 24-hour; the walk-in at 1664 Jane Street, York is. There is no Mississauga or Etobicoke After Dark storefront." },
      { q: "What payment methods do you accept?", a: "We accept cash and debit. No credit cards at this time." },
      { q: "Can your staff help me compare menu items?", a: "Yes. Staff can help you compare the categories, formats, package details, and prices shown on the current menu." },
      { q: "Is there a minimum purchase?", a: "No minimum purchase required. You can buy as little as 1 gram." },
    ],
  },
];

export default function FAQPage() {
  // JSON-LD for FAQ page
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_CATEGORIES.flatMap((cat) =>
      cat.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.a,
        },
      }))
    ),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className={styles.main}>
        <Navbar />

        {/* FAQ Banner */}
        <section style={{ width: "100%", overflow: "hidden", marginTop: "92px" }}>
          <img
            src="/banners/07_FAQ.webp"
            alt="After Dark Cannabis FAQ — Your Questions Answered"
            style={{ width: "100%", height: "auto", display: "block", objectFit: "contain" }}
          />
        </section>

        <div className={styles.content}>
          <h1 className={styles.pageTitle}>Frequently Asked Questions</h1>
          <p className={styles.pageSubtitle}>
            Hours, Jane Street directions, and menu questions for After Dark Cannabis at {STORE.addressLine}.
          </p>

          {FAQ_CATEGORIES.map((cat) => (
            <div key={cat.title} className={styles.category}>
              <h2 className={styles.categoryTitle}>{cat.title}</h2>
              {cat.faqs.map((faq) => (
                <details key={faq.q} className={styles.faqItem}>
                  <summary className={styles.faqQuestion}>{faq.q}</summary>
                  <p className={styles.faqAnswer}>{faq.a}</p>
                </details>
              ))}
            </div>
          ))}

          <div className={styles.ctaSection}>
            <h2 className={styles.ctaTitle}>Still have questions?</h2>
            <p className={styles.ctaText}>
              Call us at <strong>{STORE.phoneDisplay}</strong> or visit us at {STORE.addressLine}. The homepage is the NAP hub.
            </p>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
