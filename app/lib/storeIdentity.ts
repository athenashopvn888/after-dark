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
  hoursPath: "/24-hour-dispensary-york",
  corridorPath: "/jane-and-lawrence-dispensary",
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
  hoursDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const,
  openingHours: "Mo-Su 00:00-23:59",
  latitude: 43.7020642,
  longitude: -79.5038822,
  intersection: "Jane Street just south of Lawrence Avenue West",
  corridor: ["Jane Street", "York", "Weston", "Mount Dennis"] as const,
  schemaImage: "https://afterdarkcannabis.com/wp-content/uploads/2026/04/46Oi5.jpg",
  logoUrl: "https://afterdarkcannabis.com/wp-content/uploads/2026/04/46Oi5.jpg",
  mapsQuery: "1664 Jane Street, York, ON M9N 2S1",
  seoTitleDefault: "After Dark Cannabis | 24-Hour Jane Street York Dispensary",
  seoDescription:
    "Open 24 hours at 1664 Jane Street, York, ON M9N 2S1. Walk-in cannabis dispensary on Jane Street. Call +1 (437) 524-9344. Adults 19+.",
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
  {
    q: "Is After Dark Cannabis open now?",
    a: "Yes. After Dark Cannabis at 1664 Jane Street, York is open 24 hours a day, every day, including after midnight. Call +1 (437) 524-9344 if you need one listed item confirmed before you travel.",
  },
  {
    q: "Is there a 24-hour dispensary on Jane Street in York?",
    a: "After Dark Cannabis is the 24-hour walk-in at 1664 Jane Street, York, ON M9N 2S1, just south of Lawrence Avenue West. Bring government photo ID. Adults 19+ only.",
  },
];

/** Visible /24-hour-dispensary-york FAQs — keep in sync with that page's FAQPage JSON-LD. */
export const HOURS_FAQS: StoreFaq[] = [
  {
    q: "Is After Dark Cannabis open 24 hours?",
    a: "Yes. The Jane Street counter at 1664 Jane Street, York is open 24 hours a day, 7 days a week. There is no last-call close.",
  },
  {
    q: "Is there a 24 hour dispensary near me in York?",
    a: "If you are around Jane Street, Jane & Lawrence, Weston, or Mount Dennis, After Dark Cannabis at 1664 Jane Street, York, ON M9N 2S1 is the 24-hour walk-in. Call +1 (437) 524-9344.",
  },
  {
    q: "Is After Dark Cannabis open now?",
    a: "Yes. After Dark Cannabis is open now, 24 hours a day, including after midnight. Walk in at 1664 Jane Street with government photo ID. Adults 19+ only.",
  },
  {
    q: "Is there a 24hr dispensary near me on Jane Street?",
    a: "Yes. After Dark Cannabis at 1664 Jane Street, just south of Lawrence Avenue West, is a 24hr walk-in. Same door overnight as at noon.",
  },
  {
    q: "Can I walk in after midnight?",
    a: "Yes. Late-night and overnight walk-ins use the same door at 1664 Jane Street. Bring valid government photo ID. Adults 19+ only.",
  },
  {
    q: "Do I need ID for a late-night visit?",
    a: "Yes. Valid government photo ID is required every visit, including overnight. Adults 19+ only — that rule does not loosen after midnight.",
  },
  {
    q: "Is the York dispensary open on holidays?",
    a: "After Dark Cannabis lists open 24 hours, including typical holiday nights. Call +1 (437) 524-9344 if you are travelling for one exact item.",
  },
  {
    q: "Where is the 24-hour York dispensary?",
    a: "1664 Jane Street, York, ON M9N 2S1, just south of Lawrence Avenue West. The homepage is the NAP hub for address, phone, map, and directions.",
  },
  {
    q: "Do late-night visits use a different menu?",
    a: "No. Overnight shoppers see the same flower tiers and categories posted on the live menu. Availability of one exact pack can still change, so call ahead when that pack is the reason for the trip.",
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

/** Visible /jane-and-lawrence-dispensary FAQs — keep in sync with that page's FAQPage JSON-LD. */
export const CORRIDOR_FAQS: StoreFaq[] = [
  {
    q: "Is there a Jane and Lawrence dispensary?",
    a: "Yes. After Dark Cannabis is the walk-in at 1664 Jane Street, York, ON M9N 2S1, just south of the Jane & Lawrence lights. Call +1 (437) 524-9344. The homepage is the NAP hub.",
  },
  {
    q: "Is After Dark Cannabis in Weston?",
    a: "Weston shoppers walk in on Jane Street. There is no second After Dark storefront on Weston Road. The pin is 1664 Jane Street, York.",
  },
  {
    q: "Is there a Mount Dennis cannabis storefront?",
    a: "Mount Dennis is a neighbourhood we serve for walk-in, not a second address. Come to 1664 Jane Street in York. Adults 19+ with government photo ID.",
  },
  {
    q: "Is After Dark Toronto a different store?",
    a: "No. Searches for After Dark Toronto resolve to this York walk-in on Jane Street — 1664 Jane Street, York, ON M9N 2S1. There is no downtown second counter.",
  },
  {
    q: "Where is a cannabis store near me on Jane Street in York?",
    a: "After Dark Cannabis is at 1664 Jane Street, York, just south of Lawrence Avenue West. Open 24 hours. Call +1 (437) 524-9344.",
  },
  {
    q: "Do you have a Mississauga or Etobicoke dispensary?",
    a: "No. Mississauga and Etobicoke URLs are not locations. Weed near Jane Street York still means this one walk-in at 1664 Jane Street.",
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

export function websiteGraphNode() {
  return {
    "@type": "WebSite",
    "@id": `${STORE.baseUrl}/#website`,
    url: STORE.homepageUrl,
    name: STORE.name,
    publisher: { "@id": `${STORE.baseUrl}/#store` },
  };
}

export function cannabisStoreGraphNode() {
  return {
    "@type": "CannabisStore",
    "@id": `${STORE.baseUrl}/#store`,
    name: STORE.name,
    legalName: STORE.legalName,
    description:
      "24-hour walk-in cannabis dispensary at 1664 Jane Street in York, ON. Jane Street / Weston / Mount Dennis corridor. Flower tiers, edibles, prerolls, and vapes. Adults 19+.",
    url: STORE.homepageUrl,
    telephone: STORE.phoneIntl,
    image: STORE.schemaImage,
    logo: STORE.logoUrl,
    priceRange: "$3 - $12/g",
    openingHours: STORE.openingHours,
    hasMap: mapsSearchUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: STORE.streetAddress,
      addressLocality: STORE.addressLocality,
      addressRegion: STORE.addressRegion,
      postalCode: STORE.postalCode,
      addressCountry: STORE.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: STORE.latitude,
      longitude: STORE.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [...STORE.hoursDays],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: STORE.phoneIntl,
      contactType: "customer service",
      areaServed: `${STORE.addressLocality}, ${STORE.addressRegion}`,
      availableLanguage: ["en"],
    },
    areaServed: STORE.corridor.map((name) => ({
      "@type": name === "York" ? "City" : "Place",
      name,
    })),
    knowsAbout: [
      "24-hour dispensary York",
      "Jane Street cannabis store",
      "York walk-in dispensary",
    ],
  };
}

export function breadcrumbGraphNode(items: ReadonlyArray<{ name: string; item: string }>) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };
}

export function webpageGraphNode({
  id,
  name,
  description,
}: {
  id: string;
  name: string;
  description: string;
}) {
  return {
    "@type": "WebPage",
    "@id": id,
    url: id,
    name,
    description,
    isPartOf: { "@id": `${STORE.baseUrl}/#website` },
    about: { "@id": `${STORE.baseUrl}/#store` },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", ".nap"],
    },
  };
}

export function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
