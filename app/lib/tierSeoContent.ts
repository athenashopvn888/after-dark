export interface TierSeoData {
  seoTitle: string;
  metaDescription: string;
  socialTitle: string;
  socialDescription: string;
  h1: string;
  imageAlt: string;
  strainHeading: string;
  seoIntro: string;
  sections: { heading: string; body: string }[];
  faqs: { q: string; a: string }[];
}

export const TIER_SEO: Record<string, TierSeoData> = {
  EXOTIC: {
    seoTitle: "Exotic Weed & Cannabis Flower in York",
    metaDescription: "Explore the Exotic weed and cannabis flower tier at After Dark Cannabis in York, with a focused flower category for adults 19+.",
    socialTitle: "Exotic Weed & Flower | After Dark Cannabis",
    socialDescription: "Explore the Exotic cannabis flower tier at After Dark Cannabis.",
    h1: "Exotic Weed & Cannabis Flower in York",
    imageAlt: "Exotic weed and cannabis flower at After Dark Cannabis",
    strainHeading: "Explore Exotic Weed & Flower",
    seoIntro: "Exotic has its own place in the After Dark Cannabis flower lineup. Adults 19+ can focus on this tier when Exotic weed and cannabis flower is the category they want to explore.",
    sections: [
      { heading: "Exotic as a Dedicated Flower Tier", body: "Keeping Exotic separate from Premium, AAA+, AA and Budget gives shoppers a clearer way to move through the After Dark flower categories." },
      { heading: "Compare the After Dark Flower Tiers", body: "If Exotic is not the category you want, the other flower tiers give you separate places to continue browsing without mixing every tier together." },
    ],
    faqs: [
      { q: "What is Exotic weed at After Dark Cannabis?", a: "Exotic is one of After Dark Cannabis's separate cannabis flower tiers." },
      { q: "Is Exotic separate from Premium flower?", a: "Yes. Exotic and Premium are separate flower categories." },
      { q: "Does the Exotic tier confirm current availability?", a: "No. The tier identifies a flower category and does not confirm current stock or availability." },
    ],
  },
  PREMIUM: {
    seoTitle: "Premium Weed & Cannabis Flower in York",
    metaDescription: "Explore the Premium weed and cannabis flower tier at After Dark Cannabis in York through its dedicated Premium flower category.",
    socialTitle: "Premium Weed & Flower | After Dark Cannabis",
    socialDescription: "Browse the Premium cannabis flower tier at After Dark Cannabis.",
    h1: "Premium Weed & Cannabis Flower in York",
    imageAlt: "Premium weed and cannabis flower at After Dark Cannabis",
    strainHeading: "Browse Premium Weed & Flower",
    seoIntro: "Premium gives After Dark Cannabis shoppers a dedicated flower category of its own. Adults 19+ can start here when Premium weed and cannabis flower is the tier they want to focus on.",
    sections: [
      { heading: "A Separate Premium Flower Category", body: "Premium is kept distinct from Exotic, AAA+, AA and Budget so shoppers can stay within one flower tier at a time." },
      { heading: "Move Through the Flower Lineup", body: "The other After Dark flower tiers remain separate options when you want to compare another category." },
    ],
    faqs: [
      { q: "What is Premium weed at After Dark Cannabis?", a: "Premium is one of After Dark Cannabis's dedicated cannabis flower tiers." },
      { q: "Is Premium the same as Exotic?", a: "No. Premium and Exotic are separate flower categories." },
      { q: "Does Premium mean a specific product is currently available?", a: "No. Premium is the tier name and does not confirm current product availability." },
    ],
  },
  "AAA+": {
    seoTitle: "AAA+ Weed & Cannabis Flower in York",
    metaDescription: "Explore AAA+ weed and cannabis flower at After Dark Cannabis in York through a distinct AAA+ flower tier for adults 19+.",
    socialTitle: "AAA+ Weed & Flower | After Dark Cannabis",
    socialDescription: "Explore the AAA+ cannabis flower tier at After Dark Cannabis.",
    h1: "AAA+ Weed & Cannabis Flower in York",
    imageAlt: "AAA+ weed and cannabis flower at After Dark Cannabis",
    strainHeading: "Explore AAA+ Weed & Flower",
    seoIntro: "AAA+ sits in its own section of the After Dark Cannabis flower lineup. Adults 19+ can use this tier when they want to focus specifically on AAA+ weed and cannabis flower.",
    sections: [
      { heading: "AAA+ in the After Dark Flower Lineup", body: "A dedicated AAA+ category keeps this tier distinct from Premium and AA without relying on product-level claims." },
      { heading: "Choose Another Tier When Needed", body: "Exotic, Premium, AA and Budget remain separate flower categories when you want to continue comparing the lineup." },
    ],
    faqs: [
      { q: "What is the AAA+ weed tier at After Dark Cannabis?", a: "AAA+ is one of After Dark Cannabis's separate cannabis flower tiers." },
      { q: "Is AAA+ different from AA?", a: "Yes. AAA+ and AA are separate flower categories." },
      { q: "Does AAA+ confirm current stock?", a: "No. The tier describes the category only." },
    ],
  },
  AA: {
    seoTitle: "AA Weed & Cannabis Flower in York",
    metaDescription: "Explore the AA weed and cannabis flower tier at After Dark Cannabis in York through its own dedicated flower category.",
    socialTitle: "AA Weed & Flower | After Dark Cannabis",
    socialDescription: "Browse the AA cannabis flower tier at After Dark Cannabis.",
    h1: "AA Weed & Cannabis Flower in York",
    imageAlt: "AA weed and cannabis flower at After Dark Cannabis",
    strainHeading: "Browse AA Weed & Flower",
    seoIntro: "AA is a separate After Dark Cannabis flower tier for adults 19+ who want to keep their browsing focused on that category. It remains distinct from AAA+, Premium, Exotic and Budget.",
    sections: [
      { heading: "AA as Its Own Flower Tier", body: "The dedicated AA section keeps the After Dark flower lineup organized around clear category choices." },
      { heading: "Compare AA With the Other Tiers", body: "Move to Budget, AAA+, Premium or Exotic when another flower category is the better place for you to continue browsing." },
    ],
    faqs: [
      { q: "What does AA weed mean at After Dark Cannabis?", a: "AA is one of After Dark Cannabis's separate cannabis flower tiers." },
      { q: "Is AA separate from Budget?", a: "Yes. AA and Budget are different flower categories." },
      { q: "Does AA imply a current price or promotion?", a: "No. AA is the tier label and does not establish current pricing or promotions." },
    ],
  },
  BUDGET: {
    seoTitle: "Budget Weed & Cannabis Flower in York",
    metaDescription: "Explore the Budget weed and cannabis flower tier at After Dark Cannabis in York without relying on current price, deal or availability claims.",
    socialTitle: "Budget Weed & Flower | After Dark Cannabis",
    socialDescription: "Explore the Budget cannabis flower tier at After Dark Cannabis.",
    h1: "Budget Weed & Cannabis Flower in York",
    imageAlt: "Budget weed and cannabis flower at After Dark Cannabis",
    strainHeading: "Explore Budget Weed & Flower",
    seoIntro: "Budget is After Dark Cannabis's value-oriented flower tier. Adults 19+ can use this section when Budget weed or cannabis flower is the category they want to explore, without treating the tier name as a current sale or promotion.",
    sections: [
      { heading: "A Value-Oriented Flower Category", body: "Budget is separated from AA, AAA+, Premium and Exotic to give shoppers a clear value-oriented flower starting point." },
      { heading: "Budget Is the Tier Name", body: "The Budget label describes the category only and does not establish a current discount, price, promotion or availability claim." },
    ],
    faqs: [
      { q: "What is Budget weed at After Dark Cannabis?", a: "Budget is After Dark Cannabis's value-oriented cannabis flower tier." },
      { q: "Does Budget mean there is a current sale?", a: "No. Budget is the tier name only and does not confirm a sale or promotion." },
      { q: "Can I compare Budget with the other flower tiers?", a: "Yes. Budget sits alongside AA, AAA+, Premium and Exotic as a separate flower category." },
    ],
  },
};

export const TIER_COMPARISON = {
  heading: "Compare After Dark Weed & Flower Tiers",
  body: "Explore Exotic, Premium, AAA+, AA and Budget as separate cannabis flower categories. Each tier has its own browsing space while the broader Weed and Cannabis store experience remains on the main After Dark Cannabis owner page.",
  ownerSentence: "For the broader After Dark Cannabis store and Weed overview, visit the",
  ownerAnchor: "Weed Dispensary in York",
  ownerHref: "/weed-dispensary-york/",
} as const;
