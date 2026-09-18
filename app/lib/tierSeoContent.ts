export interface TierSeoData {
  seoTitle: string;
  metaDescription: string;
  socialTitle: string;
  socialDescription: string;
  h1: string;
  imageAlt: string;
  strainHeading: string;
  seoIntro: string;
  hubHeading: string;
  hubIntro: string;
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
    hubHeading: "Jane Street visit hubs for Exotic flower",
    hubIntro: "This Exotic page owns one flower tier at 1664 Jane Street. It does not replace the York weed hub, the homepage NAP, or the how-to-reach notes.",
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
      {
        q: "Is the Exotic page After Dark's main York weed page?",
        a: "No. Exotic is the tier-only page. Broad York weed intent lives on the Weed Dispensary in York hub. Address, phone, hours, and map stay on the homepage.",
        answerHtml: "No. Exotic is the tier-only page. Broad York weed intent lives on the <a href=\"/weed-dispensary-york\">Weed Dispensary in York</a> hub. Address, phone, hours, and map stay on the <a href=\"/\">homepage</a>.",
      },
      {
        q: "How do I reach 1664 Jane Street for Exotic flower?",
        a: "Use the how-to-reach page for 35 Jane, parking, and Jane & Lawrence arrival. Late-night hours and ID are on the 24-hour open-now guide. Weston and Mount Dennis walk-in notes are on the Jane & Lawrence corridor guide.",
        answerHtml: "Use the <a href=\"/visit\">how-to-reach page</a> for 35 Jane, parking, and Jane & Lawrence arrival. Late-night hours and ID are on the <a href=\"/24-hour-dispensary-york\">24-hour open-now guide</a>. Weston and Mount Dennis walk-in notes are on the <a href=\"/jane-and-lawrence-dispensary\">Jane &amp; Lawrence corridor guide</a>.",
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
    hubHeading: "Jane Street visit hubs for Premium flower",
    hubIntro: "Premium is a middle-upper flower lane at 1664 Jane Street. Use this page when that tier is the job — not when you need the whole York weed menu or door-test NAP.",
    sections: [
      { heading: "A Separate Premium Flower Category", body: "Premium is kept distinct from Exotic, AAA+, AA and Budget so shoppers can stay within one flower tier at a time." },
      { heading: "Move Through the Flower Lineup", body: "The other After Dark flower tiers remain separate options when you want to compare another category." },
      { heading: "Premium Is More Than a THC Number", body: "Premium is a tier label, not a promise that every product has the highest THC on the menu. A premium-quality discussion can include aroma, cure, trichome preservation, genetics, freshness and overall consistency." },
      {
        heading: "Premium at the Jane Street York counter",
        body: "Walk in at 1664 Jane Street, York, ON M9N 2S1. The homepage holds address, phone, hours, and map. Bus and parking notes are on how to reach Jane Street. Broad York weed browsing stays on the York weed dispensary hub.",
        bodyHtml: "Walk in at 1664 Jane Street, York, ON M9N 2S1. The <a href=\"/\">homepage</a> holds address, phone, hours, and map. Bus and parking notes are on <a href=\"/visit\">how to reach Jane Street</a>. Broad York weed browsing stays on the <a href=\"/weed-dispensary-york\">York weed dispensary hub</a>.",
      },
    ],
    educationLinks: [
      { label: "Does higher THC mean better weed?", href: "/resources/thc-vs-weed-quality" },
      { label: "Cannabis flower quality guide", href: "/resources/cannabis-flower-quality-tiers" },
    ],
    faqs: [
      { q: "What is Premium weed at After Dark's Jane Street counter?", a: "Premium is a dedicated After Dark Cannabis flower tier at 1664 Jane Street in York. It sits below Exotic and above AAA+ on this store's own ladder." },
      { q: "How is Premium different from Exotic on Jane Street in York?", a: "They are separate categories. Exotic is often framed around rare or visually distinctive flower; Premium is its own lane for aroma, cure, and listed details without treating THC as the whole story." },
      {
        q: "Is Premium the York weed dispensary owner page?",
        a: "No. This page is Premium only. The York weed dispensary hub is the broad weed owner. NAP stays on the homepage.",
        answerHtml: "No. This page is Premium only. The <a href=\"/weed-dispensary-york\">York weed dispensary hub</a> is the broad weed owner. NAP stays on the <a href=\"/\">homepage</a>.",
      },
      { q: "Does a Premium listing mean that jar is on the shelf tonight?", a: "No. Premium is the tier name. Posted names and weights move. Call +1 (437) 524-9344 before travelling for one exact pack." },
      {
        q: "How do I visit After Dark for Premium flower?",
        a: "Ride 35 Jane or park on Jane Street, then walk in south of Lawrence. How-to-reach, 24-hour hours, and the Jane & Lawrence corridor guide cover the trip.",
        answerHtml: "Ride 35 Jane or park on Jane Street, then walk in south of Lawrence. See <a href=\"/visit\">how to reach Jane Street</a>, the <a href=\"/24-hour-dispensary-york\">24-hour open-now guide</a>, and the <a href=\"/jane-and-lawrence-dispensary\">Jane &amp; Lawrence corridor guide</a>.",
      },
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
    hubHeading: "Jane Street visit hubs for AAA+ flower",
    hubIntro: "AAA+ is the letter-grade flower page for the York walk-in, between AA and Premium. Corridor and hours pages stay separate so this route can stay narrow.",
    sections: [
      { heading: "AAA+ in the After Dark Flower Lineup", body: "A dedicated AAA+ category keeps this tier distinct from Premium and AA without relying on product-level claims." },
      { heading: "Choose Another Tier When Needed", body: "Exotic, Premium, AA and Budget remain separate flower categories when you want to continue comparing the lineup." },
      { heading: "Where AAA+ Fits", body: "AAA+ sits in After Dark's own flower ladder between AA and the upper Premium/Exotic tiers. Letter grades are common cannabis-market language, but they are not one universal Canadian government standard." },
      {
        heading: "AAA+ walk-in on Jane Street",
        body: "The pin is 1664 Jane Street, York, just south of Lawrence Avenue West. Use the York weed hub for general weed intent and the 24-hour open-now guide if you are coming after midnight.",
        bodyHtml: "The pin is 1664 Jane Street, York, just south of Lawrence Avenue West. Use the <a href=\"/weed-dispensary-york\">York weed hub</a> for general weed intent and the <a href=\"/24-hour-dispensary-york\">24-hour open-now guide</a> if you are coming after midnight.",
      },
    ],
    educationLinks: [
      { label: "Top shelf, mids and quads explained", href: "/resources/top-shelf-mids-quads-aaaa-aaa-aa" },
      { label: "Cannabis flower quality guide", href: "/resources/cannabis-flower-quality-tiers" },
    ],
    faqs: [
      { q: "What is AAA+ weed at After Dark Cannabis in York?", a: "AAA+ is a separate After Dark Cannabis flower tier at the Jane Street York counter. Letter grades are shop language, not a government spec." },
      { q: "Where does AAA+ sit between AA and Premium at 1664 Jane Street?", a: "On this menu, AAA+ sits above AA and below Premium. Compare listed names and details on each tier page instead of treating the letters as a national scale." },
      {
        q: "Is AAA+ After Dark's broad York weed page?",
        a: "No. AAA+ is one flower tier. The Weed Dispensary in York page is the geo weed owner. How-to-reach lives on /visit.",
        answerHtml: "No. AAA+ is one flower tier. The <a href=\"/weed-dispensary-york\">Weed Dispensary in York</a> page is the geo weed owner. How-to-reach lives on <a href=\"/visit\">/visit</a>.",
      },
      {
        q: "Can I walk in after midnight for AAA+ flower in York?",
        a: "Yes. After Dark lists open 24 hours at 1664 Jane Street. Confirm late-night ID and arrival on the 24-hour open-now guide. Adults 19+ only.",
        answerHtml: "Yes. After Dark lists open 24 hours at 1664 Jane Street. Confirm late-night ID and arrival on the <a href=\"/24-hour-dispensary-york\">24-hour open-now guide</a>. Adults 19+ only.",
      },
      {
        q: "How do I get to Jane Street from Weston for AAA+ flower?",
        a: "Weston shoppers come to this York walk-in — there is no second After Dark door on Weston Road. Use the Jane & Lawrence corridor guide, then /visit for 35 Jane and parking.",
        answerHtml: "Weston shoppers come to this York walk-in — there is no second After Dark door on Weston Road. Use the <a href=\"/jane-and-lawrence-dispensary\">Jane &amp; Lawrence corridor guide</a>, then <a href=\"/visit\">/visit</a> for 35 Jane and parking.",
      },
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
    hubHeading: "Jane Street visit hubs for AA flower",
    hubIntro: "AA is the everyday Jane Street flower page, separate from Budget and AAA+. Hours, parking, and the York weed hub stay on their own URLs.",
    sections: [
      { heading: "AA as Its Own Flower Tier", body: "The dedicated AA section keeps the After Dark flower lineup organized around clear category choices." },
      { heading: "Compare AA With the Other Tiers", body: "Move to Budget, AAA+, Premium or Exotic when another flower category is the better place for you to continue browsing." },
      { heading: "Everyday Flower and the Meaning of AA", body: "AA is often used as a value/everyday quality designation in cannabis culture. That does not mean every AA batch everywhere is identical. After Dark should describe the current batch truth rather than treating “AA” as a national specification." },
      {
        heading: "AA flower at 1664 Jane Street",
        body: "Same York door as the other tiers. Homepage NAP, /visit for the 35 Jane ride, and the York weed dispensary page if you are still choosing a format.",
        bodyHtml: "Same York door as the other tiers. <a href=\"/\">Homepage NAP</a>, <a href=\"/visit\">/visit</a> for the 35 Jane ride, and the <a href=\"/weed-dispensary-york\">York weed dispensary page</a> if you are still choosing a format.",
      },
    ],
    educationLinks: [
      { label: "Top shelf, mids and quads explained", href: "/resources/top-shelf-mids-quads-aaaa-aaa-aa" },
      { label: "Cannabis flower quality guide", href: "/resources/cannabis-flower-quality-tiers" },
    ],
    faqs: [
      { q: "What does AA weed mean at the York Jane Street counter?", a: "AA is After Dark Cannabis's everyday flower tier at 1664 Jane Street. It is a retailer category, not a national grade." },
      { q: "How is AA different from Budget flower at After Dark?", a: "They are different categories. Budget is the value-oriented tier; AA is the next step on this store's ladder. Compare listed names on each page." },
      { q: "Is AA a promotion or a flower tier in York?", a: "AA is the tier label only. It does not establish a current price, sale, or hold on a jar. Call +1 (437) 524-9344 if one listed name is the reason for the trip." },
      {
        q: "Where should I go if I want all York weed, not just AA?",
        a: "Open the Weed Dispensary in York hub for broad weed intent. This AA page stays narrow. Address and map remain on the homepage.",
        answerHtml: "Open the <a href=\"/weed-dispensary-york\">Weed Dispensary in York</a> hub for broad weed intent. This AA page stays narrow. Address and map remain on the <a href=\"/\">homepage</a>.",
      },
      {
        q: "What bus do I take for AA flower at After Dark?",
        a: "TTC 35 Jane serves the Jane Street spine. Get off near Jane and Lawrence and walk south to 1664. Parking and overnight notes are on /visit and the 24-hour open-now guide.",
        answerHtml: "TTC 35 Jane serves the Jane Street spine. Get off near Jane and Lawrence and walk south to 1664. Parking and overnight notes are on <a href=\"/visit\">/visit</a> and the <a href=\"/24-hour-dispensary-york\">24-hour open-now guide</a>.",
      },
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
    hubHeading: "Jane Street visit hubs for Budget flower",
    hubIntro: "Budget is the value flower page for the York counter. The name is a tier, not a live coupon. Door-test NAP and how-to-reach stay on the homepage and /visit.",
    sections: [
      { heading: "A Value-Oriented Flower Category", body: "Budget is separated from AA, AAA+, Premium and Exotic to give shoppers a clear value-oriented flower starting point." },
      { heading: "Budget Is the Tier Name", body: "The Budget label describes the category only and does not establish a current discount, price, promotion or availability claim." },
      { heading: "Budget Describes Price Position — Not “Bad Weed”", body: "A Budget tier organizes lower-cost flower. It should not be described as automatically stale, weak or poor. Quality and value are different ideas. A fresh, properly handled Budget batch can still fit its role well." },
      {
        heading: "Budget flower walk-in in York",
        body: "Come to 1664 Jane Street, York, ON M9N 2S1. Mount Dennis and Weston shoppers use this same door. Read the Jane & Lawrence corridor guide, then the homepage for the map.",
        bodyHtml: "Come to 1664 Jane Street, York, ON M9N 2S1. Mount Dennis and Weston shoppers use this same door. Read the <a href=\"/jane-and-lawrence-dispensary\">Jane &amp; Lawrence corridor guide</a>, then the <a href=\"/\">homepage</a> for the map.",
      },
    ],
    educationLinks: [
      { label: "Learn what makes good weed", href: "/resources/what-is-good-weed" },
      { label: "Smalls vs big buds", href: "/resources/smalls-vs-big-buds" },
      { label: "Cannabis flower quality guide", href: "/resources/cannabis-flower-quality-tiers" },
    ],
    faqs: [
      { q: "What is Budget weed at After Dark Cannabis on Jane Street?", a: "Budget is After Dark's value-oriented cannabis flower tier at 1664 Jane Street in York. It is a category name, not a promise that flower is poor or stale." },
      { q: "Does Budget mean After Dark has a sale in York today?", a: "No. Budget is the tier name only and does not confirm a sale, coupon, or posted discount. Check the live menu or call +1 (437) 524-9344." },
      { q: "Is Budget the cheapest posted flower tier at 1664 Jane Street?", a: "Budget is the value-oriented starting point on this store's five-tier ladder. Posted dollars can still move. AA, AAA+, Premium, and Exotic remain separate pages." },
      {
        q: "Is the Budget page the same as the York weed hub?",
        a: "No. Budget is one flower tier. The York weed dispensary page is the geo owner for broad weed searches. /visit covers the 35 Jane ride.",
        answerHtml: "No. Budget is one flower tier. The <a href=\"/weed-dispensary-york\">York weed dispensary page</a> is the geo owner for broad weed searches. <a href=\"/visit\">/visit</a> covers the 35 Jane ride.",
      },
      {
        q: "How do I reach the Jane Street door for Budget flower?",
        a: "Count south from Jane & Lawrence to 1664 Jane Street. Parking, 35 Jane, and overnight ID notes are on /visit and the 24-hour open-now guide.",
        answerHtml: "Count south from Jane &amp; Lawrence to 1664 Jane Street. Parking, 35 Jane, and overnight ID notes are on <a href=\"/visit\">/visit</a> and the <a href=\"/24-hour-dispensary-york\">24-hour open-now guide</a>.",
      },
    ],
  },
};

export const TIER_COMPARISON = {
  heading: "Compare After Dark Weed & Flower Tiers",
  body: "Compare Exotic, Premium, AAA+, AA and Budget flower at After Dark Cannabis. Each tier offers a useful starting point for considering strains and the documented product details that matter to you.",
  ownerSentence: "For store details, directions and visit information, see",
  ownerAnchor: "After Dark Cannabis — Weed Dispensary in York",
  ownerHref: "/weed-dispensary-york",
} as const;
