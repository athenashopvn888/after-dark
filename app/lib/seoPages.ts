export interface SeoPageData {
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  icon: string;
  heroTagline: string;
  banner?: string;
  sections: { heading: string; body: string }[];
  faqs: { q: string; a: string }[];
}

export const SEO_PAGES: SeoPageData[] = [
  {
    slug: "york-weed-dispensary",
    title: "York Weed Dispensary — After Dark Cannabis | 24 Hours | Jane St",
    metaDescription: "After Dark Cannabis is a 24-hour weed dispensary at 1664 Jane St in York with flower tiers and other menu categories.",
    h1: "York Weed Dispensary — After Dark Cannabis",
    icon: "✨",
    heroTagline: "Cannabis on Jane St · Open 24 Hours · Walk-In Welcome",
    banner: "/banners/after_dark_welcome_banner.webp",
    sections: [
      { heading: "A 24-Hour Cannabis Store on Jane Street", body: "After Dark Cannabis is located at 1664 Jane St in York and is open 24 hours a day. Use the store page for visit information and the menu for current item details." },
      { heading: "Browse Flower Tiers", body: "The flower menu is organized into Exotic, Premium, AAA+, AA, and Budget sections. Compare the names, listed weights, posted prices, and package details shown in each section." },
      { heading: "Browse More Menu Categories", body: "The menu also includes edibles, vapes, concentrates, pre-rolls, cigarettes, rolling papers, and accessories. Check the current category page for listed details." },
    ],
    faqs: [
      { q: "Where is After Dark Cannabis located?", a: "After Dark Cannabis is at 1664 Jane St, York, ON M9N 2S1." },
      { q: "What are the store hours?", a: "After Dark Cannabis is open 24 hours a day, seven days a week." },
      { q: "What can I check before visiting?", a: "Browse the flower tiers and product categories online for current menu details." },
    ],
  },
  {
    slug: "cheap-weed-york",
    title: "Cheap Weed York — Budget Cannabis Menu | After Dark Cannabis",
    metaDescription: "Browse the Budget and AA flower sections at After Dark Cannabis, 1664 Jane St in York. Open 24 hours.",
    h1: "Cheap Weed York — Budget Cannabis Menu",
    icon: "💰",
    heroTagline: "Compare Budget and AA Flower · Open 24 Hours",
    banner: "/banners/after_dark_budget_banner.webp",
    sections: [
      { heading: "Compare Budget and AA Flower", body: "Use the Budget and AA menu sections to compare the names, listed weights, posted prices, and package details currently shown online." },
      { heading: "Clear Menu Pricing", body: "Each flower page presents its listed price and weight options in one place. Review the current item page when a particular product matters to your visit." },
      { heading: "Visit on Jane Street", body: "After Dark Cannabis is open 24 hours at 1664 Jane St in York. Walk-in shopping is welcome." },
    ],
    faqs: [
      { q: "Where can I browse value-priced flower?", a: "Use the Budget and AA menu sections to compare current listings and posted prices." },
      { q: "Can I check item details before visiting?", a: "Yes. Current menu pages show the names, weights, prices, and package details listed online." },
      { q: "When is the store open?", a: "After Dark Cannabis is open 24 hours a day." },
    ],
  },
  {
    slug: "native-cigarettes-york",
    title: "Native Cigarettes York — Current Menu | After Dark Cannabis",
    metaDescription: "Browse the current native cigarette category at After Dark Cannabis, 1664 Jane St in York. Open 24/7.",
    h1: "Native Cigarettes York",
    icon: "🏷️",
    heroTagline: "Current Brands and Prices · Open 24 Hours",
    banner: "/banners/after_dark_edibles_prerolls_more_banner.webp",
    sections: [
      { heading: "Browse the Current Cigarette Category", body: "Use the cigarette menu page to review the brand names, varieties, and prices currently listed by After Dark Cannabis." },
      { heading: "One Menu for Visit Planning", body: "The website separates cigarettes, flower tiers, and other product categories so shoppers can compare listed details before travelling." },
      { heading: "Open 24 Hours on Jane Street", body: "After Dark Cannabis is open 24 hours a day at 1664 Jane St in York." },
    ],
    faqs: [
      { q: "Where can I browse cigarette brands?", a: "Check the current cigarette category page for the brands and prices listed online." },
      { q: "Where is After Dark Cannabis?", a: "The store is at 1664 Jane St, York, ON M9N 2S1." },
      { q: "Is the store open late?", a: "Yes. After Dark Cannabis is open 24 hours a day." },
    ],
  },
  {
    slug: "weed-store-near-mississauga",
    title: "Weed Store Near Mississauga — After Dark Cannabis",
    metaDescription: "Plan a visit from Mississauga to After Dark Cannabis at 1664 Jane St in York. Browse current menu categories online. Open 24 hours.",
    h1: "Weed Store Near Mississauga — After Dark Cannabis",
    icon: "🚗",
    heroTagline: "Browse Before Travelling · Open 24 Hours",
    banner: "/banners/after_dark_welcome_banner.webp",
    sections: [
      { heading: "Plan a Visit From Mississauga", body: "After Dark Cannabis is located at 1664 Jane St in York. Confirm your route and review the store page before travelling." },
      { heading: "Check the Menu Before You Leave", body: "Browse flower tiers, edibles, vapes, concentrates, pre-rolls, cigarettes, and accessories for current menu details." },
      { heading: "Open 24 Hours", body: "After Dark Cannabis is open 24 hours a day, seven days a week, so shoppers can plan a visit around their schedule." },
    ],
    faqs: [
      { q: "Where can I check the menu before travelling?", a: "Browse the current flower tiers and other product category pages online." },
      { q: "Is After Dark Cannabis open late?", a: "After Dark Cannabis is open 24 hours a day." },
      { q: "What is the store address?", a: "After Dark Cannabis is at 1664 Jane St, York, ON M9N 2S1." },
    ],
  },
  {
    slug: "dispensary-near-me-york",
    title: "Cannabis Dispensary Near Me York — After Dark Cannabis | Open 24 Hours",
    metaDescription: "Find After Dark Cannabis at 1664 Jane St in York. Browse flower tiers and product categories online. Open 24 hours.",
    h1: "Cannabis Dispensary Near Me — York",
    icon: "🗺️",
    heroTagline: "1664 Jane St · Open 24 Hours · Browse the Menu",
    banner: "/banners/after_dark_welcome_banner.webp",
    sections: [
      { heading: "Find After Dark Cannabis in York", body: "After Dark Cannabis is located at 1664 Jane St, York, ON M9N 2S1. Use the store page for current visit information." },
      { heading: "Browse Before You Visit", body: "The menu organizes flower into five tiers and provides separate pages for edibles, vapes, concentrates, pre-rolls, cigarettes, and accessories." },
      { heading: "Open Around the Clock", body: "The store is open 24 hours a day, seven days a week. Walk-in shopping is welcome." },
    ],
    faqs: [
      { q: "Where is the store?", a: "After Dark Cannabis is at 1664 Jane St in York." },
      { q: "What are the hours?", a: "The store is open 24 hours a day." },
      { q: "Can I browse online first?", a: "Yes. Use the current menu pages to compare categories and listed item details." },
    ],
  },
];

export function getSeoPageBySlug(slug: string): SeoPageData | undefined {
  return SEO_PAGES.find((page) => page.slug === slug);
}
