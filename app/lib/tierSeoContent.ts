export interface TierSeoData {
  seoTitle: string;
  metaDescription: string;
  socialTitle: string;
  socialDescription: string;
  h1: string;
  imageAlt: string;
  strainHeading: string;
  seoIntro: string;
  sections: { heading: string; body: string; bodyHtml?: string }[];
  educationLinks: { label: string; href: string }[];
  faqs: { q: string; a: string; answerHtml?: string }[];
}

export const TIER_SEO: Record<string, TierSeoData> = {
  EXOTIC: {
    seoTitle: "Exotic Weed & Cannabis Flower in York | After Dark",
    metaDescription: "Explore Exotic weed at After Dark Cannabis in York. Compare flower using documented genetics, aroma, trichomes, structure and cure details.",
    socialTitle: "Exotic Weed & Cannabis Flower in York",
    socialDescription: "Explore After Dark Cannabis’s Exotic flower tier in York with helpful context on genetics, aroma, trichomes, flower structure and cure.",
    h1: "Exotic Weed & Cannabis Flower in York",
    imageAlt: "Exotic cannabis flower at After Dark Cannabis in York",
    strainHeading: "Explore Exotic Weed & Flower",
    seoIntro: "Exotic is a distinct flower tier at After Dark Cannabis in York. In cannabis culture, the term is often associated with flower described as rare, visually distinctive or premium. Adults 19+ can compare individual strains using documented details such as genetics, aroma descriptions, trichome coverage, flower structure and cure.",
    sections: [
      { heading: "What Exotic Means at After Dark Cannabis", body: "Exotic is its own flower tier alongside Premium, AAA+, AA and Budget. These retailer categories give buyers familiar starting points when comparing strains, while the documented details for each flower provide more useful context than the tier name alone." },
      { heading: "What to Compare in Exotic Flower", body: "Useful comparison points can include documented genetics, aroma descriptions, visible trichome coverage, bud structure, trim and cure. Buyers can consider these details together because no single characteristic defines every strain carrying the Exotic label." },
      {
        heading: "Learn More About Cannabis Flower",
        body: "For more information about flower tiers, genetics, growing methods, aroma, trichomes, structure, cure and evaluating freshness, read the Cannabis Flower Guides. For the store address and visit information, see After Dark Cannabis — Weed Dispensary in York.",
        bodyHtml: "For more information about flower tiers, genetics, growing methods, aroma, trichomes, structure, cure and evaluating freshness, read the <a href=\"/resources/flower-guides\">Cannabis Flower Guides</a>. For the store address and visit information, see <a href=\"/weed-dispensary-york\">After Dark Cannabis — Weed Dispensary in York</a>.",
      },
    ],
    educationLinks: [
      { label: "Learn what makes good weed", href: "/resources/what-is-good-weed" },
      { label: "Weed slang explained", href: "/resources/weed-quality-slang" },
      { label: "Cannabis flower quality guide", href: "/resources/cannabis-flower-quality-tiers" },
    ],
    faqs: [
      { q: "What does Exotic weed mean at After Dark Cannabis?", a: "Exotic is a distinct After Dark Cannabis flower tier. In cannabis culture, the term is often associated with flower described as rare, visually distinctive or premium, but it is not a universal cannabis grade." },
      { q: "Is Exotic different from Premium flower?", a: "Yes. Exotic and Premium are separate flower tiers at After Dark Cannabis. Buyers can compare the documented details for individual strains to understand the differences that matter to them." },
      { q: "What should I compare when choosing Exotic flower?", a: "Useful comparison points can include documented genetics, aroma descriptions, trichome coverage, flower structure, trim and cure. The information provided can differ between strains and batches." },
      { q: "Is Exotic an official cannabis grade?", a: "No. Exotic is a retailer flower category and a familiar term in cannabis culture, not a standardized government grade." },
      {
        q: "Where can I learn more about cannabis flower tiers?",
        a: "Read the Cannabis Flower Guides for educational information about flower tiers, genetics, aroma, trichomes, structure, cure and freshness.",
        answerHtml: "Read the <a href=\"/resources/flower-guides\">Cannabis Flower Guides</a> for educational information about flower tiers, genetics, aroma, trichomes, structure, cure and freshness.",
      },
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
      { heading: "Premium Is More Than a THC Number", body: "Premium is a tier label, not a promise that every product has the highest THC on the menu. A premium-quality discussion can include aroma, cure, trichome preservation, genetics, freshness and overall consistency." },
    ],
    educationLinks: [
      { label: "Does higher THC mean better weed?", href: "/resources/thc-vs-weed-quality" },
      { label: "Cannabis flower quality guide", href: "/resources/cannabis-flower-quality-tiers" },
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
      { heading: "Where AAA+ Fits", body: "AAA+ sits in After Dark's own flower ladder between AA and the upper Premium/Exotic tiers. Letter grades are common cannabis-market language, but they are not one universal Canadian government standard." },
    ],
    educationLinks: [
      { label: "Top shelf, mids and quads explained", href: "/resources/top-shelf-mids-quads-aaaa-aaa-aa" },
      { label: "Cannabis flower quality guide", href: "/resources/cannabis-flower-quality-tiers" },
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
      { heading: "Everyday Flower and the Meaning of AA", body: "AA is often used as a value/everyday quality designation in cannabis culture. That does not mean every AA batch everywhere is identical. After Dark should describe the current batch truth rather than treating “AA” as a national specification." },
    ],
    educationLinks: [
      { label: "Top shelf, mids and quads explained", href: "/resources/top-shelf-mids-quads-aaaa-aaa-aa" },
      { label: "Cannabis flower quality guide", href: "/resources/cannabis-flower-quality-tiers" },
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
      { heading: "Budget Describes Price Position — Not “Bad Weed”", body: "A Budget tier organizes lower-cost flower. It should not be described as automatically stale, weak or poor. Quality and value are different ideas. A fresh, properly handled Budget batch can still fit its role well." },
    ],
    educationLinks: [
      { label: "Learn what makes good weed", href: "/resources/what-is-good-weed" },
      { label: "Smalls vs big buds", href: "/resources/smalls-vs-big-buds" },
      { label: "Cannabis flower quality guide", href: "/resources/cannabis-flower-quality-tiers" },
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
  body: "Compare Exotic, Premium, AAA+, AA and Budget flower at After Dark Cannabis. Each tier offers a useful starting point for considering strains and the documented product details that matter to you.",
  ownerSentence: "For store details, directions and visit information, see",
  ownerAnchor: "After Dark Cannabis — Weed Dispensary in York",
  ownerHref: "/weed-dispensary-york/",
} as const;
