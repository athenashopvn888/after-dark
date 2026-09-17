/** FMD / Master Line identity for After Dark Cannabis (MJ01). Homepage is the NAP hub. */
export const STORE = {
  name: "After Dark Cannabis",
  legalName: "After Dark Cannabis",
  domain: "afterdarkcannabis.com",
  baseUrl: "https://afterdarkcannabis.com",
  homepageUrl: "https://afterdarkcannabis.com/",
  storePagePath: "/weed-dispensary-york/",
  visitPath: "/visit",
  visitGuidePath: "/resources/local-guides/jane-street-york-visit-guide",
  yorkDeliveryPath: "/weed-delivery-york",
  streetAddress: "1664 Jane Street",
  addressLocality: "York",
  addressRegion: "ON",
  postalCode: "M9N 2S1",
  addressCountry: "CA",
  addressLine: "1664 Jane Street, York, ON M9N 2S1",
  phoneDisplay: "+1 (437) 524-9344",
  phoneIntl: "+14375249344",
  phoneTel: "tel:+14375249344",
  hoursLabel: "Open 24 Hours",
  hoursNote: "Open 24 hours a day, 7 days a week",
  latitude: 43.7020642,
  longitude: -79.5038822,
  intersection: "Jane Street just south of Lawrence Avenue West",
  corridor: ["Jane Street", "York", "Weston", "Mount Dennis"] as const,
  schemaImage: "https://afterdarkcannabis.com/wp-content/uploads/2026/04/46Oi5.jpg",
  mapsQuery: "1664 Jane Street, York, ON M9N 2S1",
} as const;

export const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(STORE.mapsQuery)}`;
export const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(STORE.mapsQuery)}`;
export const mapsEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(STORE.mapsQuery)}&z=16&output=embed`;

export type StoreFaq = { q: string; a: string };

/** Visible homepage FAQs — keep in sync with FAQPage JSON-LD. */
export const HOME_FAQS: StoreFaq[] = [
  {
    q: "What are the hours for After Dark Cannabis?",
    a: "After Dark Cannabis at 1664 Jane Street, York is open 24 hours a day, 7 days a week. Walk in anytime — no appointment needed.",
  },
  {
    q: "Where is After Dark Cannabis located?",
    a: "The walk-in counter is at 1664 Jane Street, York, ON M9N 2S1, just south of Lawrence Avenue West. Call +1 (437) 524-9344. The homepage has the address, hours, map, and directions.",
  },
  {
    q: "How do I get to the Jane Street store by TTC?",
    a: "The 35 Jane bus runs the Jane Street corridor. Ride to the Jane and Lawrence area and walk south to 1664 Jane Street. Check current stop names and late-night frequency in your trip planner before you leave.",
  },
  {
    q: "Is there parking at After Dark Cannabis?",
    a: "Evening and overnight street parking is typically available on Jane Street and the side streets around the block. Read posted signs. This is a Jane Street walk-in, not a mall lot.",
  },
  {
    q: "Do I need ID to shop?",
    a: "Yes. After Dark Cannabis is for adults 19+ with valid government photo ID. Bring ID for every visit, including late-night walk-ins.",
  },
  {
    q: "What cannabis products do you carry?",
    a: "The Jane Street counter carries five flower tiers — Exotic ($10-$12/g), Premium ($7-$10/g), AAA+ ($5-$6/g), AA ($4/g), and Budget ($3/g) — plus edibles, prerolls, vapes, and concentrates when they are on the current menu.",
  },
  {
    q: "What is the cheapest weed at After Dark Cannabis?",
    a: "Budget flower starts at $3/g. AA daily drivers start at $4/g and AAA+ listings are posted from $5-$6/g. Check the live menu before travelling for one exact item.",
  },
];

/** Visible /visit FAQs — keep in sync with that page's FAQPage JSON-LD. */
export const VISIT_FAQS: StoreFaq[] = [
  {
    q: "What is the exact address and phone for After Dark Cannabis?",
    a: "1664 Jane Street, York, ON M9N 2S1. Call +1 (437) 524-9344. The homepage is the NAP hub; this page is the how-to-reach companion.",
  },
  {
    q: "What is the nearest intersection?",
    a: "Jane Street just south of Lawrence Avenue West in York. If a map pin shows a different Jane Street number, you are not at After Dark.",
  },
  {
    q: "Which bus stops near After Dark Cannabis?",
    a: "TTC 35 Jane serves the Jane Street spine. Get off near Jane and Lawrence and walk south to 1664. Confirm live service, because overnight headways change.",
  },
  {
    q: "Where do I park?",
    a: "Use Jane Street and nearby side-street parking after checking the signs. There is no dedicated mall garage attached to the store.",
  },
  {
    q: "Can I walk in from Weston or Mount Dennis?",
    a: "Yes. Weston and Mount Dennis shoppers use the same Jane Street York counter. There is no second After Dark storefront on Weston Road.",
  },
  {
    q: "Is After Dark Cannabis a Mississauga or Etobicoke store?",
    a: "No. The only walk-in counter is 1664 Jane Street in York. Those other city pages are not locations.",
  },
];

export function faqPageGraphNode(faqs: StoreFaq[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

export function faqPageJsonLd(faqs: StoreFaq[]) {
  return {
    "@context": "https://schema.org",
    ...faqPageGraphNode(faqs),
  };
}

export function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
