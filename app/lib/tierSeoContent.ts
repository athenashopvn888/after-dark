export interface TierSeoData {
  seoTitle: string;
  seoIntro: string;
  sections: { heading: string; body: string }[];
  faqs: { q: string; a: string }[];
}

const TIER_LABELS = {
  EXOTIC: "Exotic",
  PREMIUM: "Premium",
  "AAA+": "AAA+",
  AA: "AA",
  BUDGET: "Budget",
} as const;

function createTierContent(label: string): TierSeoData {
  return {
    seoTitle: `${label} Cannabis Flower Menu | After Dark Cannabis York`,
    seoIntro: `Browse the ${label} flower section at After Dark Cannabis. Compare product names, listed weights, posted prices, and item details inside one focused menu category.`,
    sections: [
      {
        heading: `Browse the ${label} Flower Section`,
        body: `${label} is one of five flower sections on the After Dark Cannabis menu. Use the section to narrow the flower menu before opening individual item pages.`,
      },
      {
        heading: "Compare the Complete Listing",
        body: "Keep the product name, listed weight, posted price, and item details together when comparing flower menu entries.",
      },
    ],
    faqs: [
      {
        q: `Where can I browse ${label} flower?`,
        a: `Open the ${label} flower section to review the item details shown on the menu.`,
      },
      {
        q: "What should I compare?",
        a: "Compare product names, listed weights, posted prices, and item details inside the same flower section.",
      },
    ],
  };
}

export const TIER_SEO: Record<string, TierSeoData> = Object.fromEntries(
  Object.entries(TIER_LABELS).map(([key, label]) => [key, createTierContent(label)])
);
