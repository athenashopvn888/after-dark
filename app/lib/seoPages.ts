/* ── Geo-targeted SEO landing pages for York/Weston keywords ── */

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
    metaDescription: "After Dark Cannabis is a 24-hour weed dispensary at 1664 Jane St in York with flower tiers, edibles, vapes, concentrates, pre-rolls, and more.",
    h1: "York Weed Dispensary — After Dark Cannabis",
    icon: "✨",
    heroTagline: "Premium Cannabis on Jane St · Open 24 Hours · Walk-In Welcome",
    banner: "/banners/after_dark_welcome_banner.webp",
    sections: [
      {
        heading: "A 24-Hour Cannabis Store on Jane Street",
        body: "After Dark Cannabis is located at 1664 Jane St in York. The menu organizes flower into Exotic, Premium, AAA+, AA, and Budget sections alongside pre-rolls, edibles, vapes, concentrates, cigarettes, and accessories. Use the store page for visit information and the menu for current item details.",
      },
      {
        heading: "Five Tiers of Quality Cannabis — Transparent Pricing",
        body: "The flower menu is divided into Exotic, Premium, AAA+, AA, and Budget sections. Each section gives shoppers a focused place to compare product names, listed weights, posted prices, and item details without treating a tier label as a guarantee.",
      },
      {
        heading: "Beyond Flower — Edibles, Vapes, Concentrates & More",
        body: "The menu includes category pages for edibles, vape pens, disposable vapes, concentrates, pre-rolls, cigarettes, rolling papers, and accessories. Browse the current category page for the item details shown online.",
      },
      {
        heading: "Open 24 Hours on Jane Street",
        body: "Unlike most dispensaries that close at midnight, After Dark Cannabis is open around the clock — 24 hours a day, 7 days a week, 365 days a year. Whether you're finishing a late shift, heading out for the night, or need something at 3 AM, our doors are always open. We're centrally located at 1664 Jane St, steps from Weston Road, near major TTC bus routes, and minutes from the Weston GO Station and Highway 401. Free street parking is available in the evenings.",
      },
      {
        heading: "Clear Bundle Pricing on Flower",
        body: "Every purchase at After Dark Cannabis comes with our signature bundle offers. Our 3g bundle offer applies to every single tier — the 3g total is shown clearly before purchase. Our top three tiers (Exotic, Premium, and AAA+) also qualify for 6g bundle pricing for 6g total. Combined with our already competitive pricing, After Dark Cannabis offers some of the best cannabis value in York, Toronto, and the surrounding area.",
      },
      {
        heading: "Serving York, Toronto & Mississauga",
        body: "After Dark Cannabis proudly serves customers from across the Greater Toronto Area. Whether you're coming from Weston, Mount Dennis, North York, Etobicoke, Mississauga, Brampton, or downtown Toronto, we welcome you. Our 24-hour operation means you can visit on your own schedule. Call us at (416) 302-8127 or visit us at 1664 Jane St, York, ON M9N 2S1.",
      },
    ],
    faqs: [
      { q: "Where is After Dark Cannabis located?", a: "We are located at 1664 Jane St, York, ON M9N 2S1 — in the heart of Weston and Mount Dennis, one of York's most accessible neighbourhoods. We're near the Weston GO Station, Highway 401, and major bus routes." },
      { q: "What are the hours for After Dark Cannabis?", a: "We are open 24 hours a day, 7 days a week, 365 days a year. Walk in anytime — no appointment needed. Whether it's 2 PM or 2 AM, our staff is here to help." },
      { q: "What menu categories can I browse?", a: "The site includes flower tiers plus edibles, vapes, concentrates, pre-rolls, cigarettes, and accessories. Check the current menu for listed item details." },
      { q: "What is the cheapest weed at After Dark Cannabis?", a: "Our Budget tier starts at $3/g with value ounces from $40. Our AA tier is $4/g. Every tier includes our 3g bundle pricing, making our prices even more competitive." },
      { q: "Does After Dark Cannabis have an online menu?", a: "Yes. The site organizes flower tiers and other product categories with their listed item details." },
      { q: "What makes After Dark Cannabis different from other York dispensaries?", a: "Three things set us apart: (1) We're open 24 hours, (2) our transparent 5-tier pricing system means no confusing markups, and (3) every purchase includes our 3g bundle pricing. Plus we carry one of York's largest selections with over 200 strains." },
      { q: "What can I check before visiting?", a: "Visit afterdarkcannabis.com to browse the listed flower tiers, edibles, vapes, concentrates, pre-rolls, cigarettes, and accessories." },
      { q: "Is there parking near After Dark Cannabis?", a: "Yes. Free street parking is available in the evenings on Jane St and surrounding residential streets. We're also easily accessible via TTC." },
    ],
  },

  {
    slug: "cheap-weed-york",
    title: "Cheap Weed York — Budget Cannabis Deals From $3/g | After Dark Cannabis",
    metaDescription: "Looking for cheap weed in York? After Dark Cannabis has budget flower from $3/g, ounces from $40, and 3g bundle pricing. Open 24 hours at 1664 Jane St.",
    h1: "Cheap Weed York — Budget Cannabis Deals",
    icon: "💰",
    heroTagline: "Budget Flower From $3/g · Ounces From $40 · Always Open",
    banner: "/banners/after_dark_budget_banner.webp",
    sections: [
      {
        heading: "York's Best Prices on Quality Cannabis",
        body: "Looking for cheap weed in York without sacrificing quality? After Dark Cannabis offers some of the most competitive cannabis prices in the city. Our Budget tier starts at just $3/g with value ounces from $40. Our AA tier ($4/g) and AAA+ tier ($5-$6/g) also deliver incredible value with THC levels from 27% to 32%. We believe great cannabis shouldn't break the bank, and our transparent tier-based pricing ensures you always get exactly what you pay for — no hidden markups, no gimmicks.",
      },
      {
        heading: "Flower Bundle Pricing",
        body: "Every tier at After Dark Cannabis comes with clear 3g bundle pricing so the total grams and price are shown before purchase. Our top three tiers (Exotic, Premium, AAA+) also offer 6g bundle pricing for 6g total. When you combine our already low prices with these bundle offers, After Dark Cannabis delivers the best cannabis value in York. A $15 AAA+ 3g purchase actually gets you 3g of flower — that's just $5/g for THC 30%+ cannabis.",
      },
      {
        heading: "Budget Doesn't Mean Low Quality",
        body: "At After Dark Cannabis, cheap doesn't mean low quality. Every strain in our Budget and AA tiers delivers reliable potency (THC 24-29%) from trusted Canadian growers. We rotate our inventory frequently to ensure freshness and maintain our quality standards across all price points. Our Budget strains are perfect for rolling, sessions, or anyone who prefers value over premium aesthetics. Our AA tier is a step up — solid daily drivers with consistent effects.",
      },
      {
        heading: "Compare Our Prices",
        body: "Budget: $3/g — $40/oz. AA: $4/g — $90/oz. AAA+: $5-$6/g — $100/oz. Premium: $7-$10/g. Exotic: $10-$12/g. Every tier includes 3g bundle pricing. Top tiers include 6g bundle pricing. These are some of the lowest prices you'll find at any dispensary in York, Weston, Mount Dennis, Etobicoke, or North York.",
      },
    ],
    faqs: [
      { q: "What is the cheapest weed at After Dark Cannabis?", a: "Our Budget tier starts at $3/g with value ounces from $40. These are quality, properly-cured strains at York's most competitive prices." },
      { q: "Do you have ounce deals?", a: "Yes! Budget ounces from $40, AA ounces from $90, AAA+ ounces from $100. All with excellent quality, freshness guaranteed, and 3g bundle pricing on top." },
      { q: "Is cheap weed still good quality?", a: "Absolutely. Our Budget flower delivers THC 24-27% from trusted Canadian growers. We never sell old, dry, or improperly stored flower. Every product meets our quality standards regardless of price point." },
      { q: "Where can I buy cheap weed in York?", a: "After Dark Cannabis at 1664 Jane St, York. Open 24 hours a day, walk in anytime, no appointment needed. We're in the heart of Weston neighbourhood." },
      { q: "What bundle pricing do you offer?", a: "Every tier includes 3g bundle pricing (pay for 3g total). Our Exotic, Premium, and AAA+ tiers also offer 6g bundle pricing (pay for 6g total). These bundle offers apply on every visit." },
      { q: "Do you offer bulk discounts?", a: "Yes — our ounce pricing is deeply discounted compared to per-gram rates. Budget ounces are $40, AA ounces $90, and AAA+ ounces $100. The more you buy, the more you save." },
    ],
  },

  {
    slug: "native-cigarettes-york",
    title: "Native Cigarettes York — Discount Tobacco | After Dark Cannabis",
    metaDescription: "Buy native cigarettes in York at After Dark Cannabis. Wide selection of premium and value tobacco brands at the best prices. 1664 Jane St, Weston. Open 24/7.",
    h1: "Native Cigarettes York — Discount Tobacco",
    icon: "🏷️",
    heroTagline: "Premium & Value Brands · Best Prices in York · Open 24 Hours",
    banner: "/banners/after_dark_edibles_prerolls_more_banner.webp",
    sections: [
      {
        heading: "York's Best Selection of Native Cigarettes",
        body: "After Dark Cannabis carries one of the widest selections of native cigarettes in York. Located at 1664 Jane St near Weston Road, we stock a comprehensive range of both premium and value native cigarette brands at competitive prices. Whether you prefer full-flavour, light, menthol, or specialty blends, our tobacco selection has something for every smoker. We're proud to be one of the few stores in York that combines a full cannabis dispensary with a comprehensive tobacco counter — one stop for everything you need.",
      },
      {
        heading: "Why York Smokers Choose After Dark Cannabis",
        body: "There are three reasons York smokers keep coming back to After Dark Cannabis for their cigarettes. First, our prices are among the lowest in the Weston and Mount Dennis area — we buy in volume and pass the savings to our customers. Second, our selection is comprehensive — we carry brands and varieties that many other shops simply don't stock. Third, we're open 24 hours a day, 7 days a week. Need cigarettes at midnight? 3 AM? We're here. No other tobacco shop in York offers this level of convenience.",
      },
      {
        heading: "Convenient Jane Street Location",
        body: "Our shop at 1664 Jane St is centrally located in York — easily accessible from Weston Rd, Lawrence Ave W, Highway 401, and all major Peel/Toronto routes. Whether you're walking, driving, or taking the bus, After Dark Cannabis is easy to reach. Free evening street parking is available on Jane St and nearby streets. We serve customers from across York including Weston, Mount Dennis, Etobicoke, North York, and Mississauga.",
      },
      {
        heading: "More Than Just Cigarettes",
        body: "While you're picking up your cigarettes, browse our full cannabis menu — over 200 strains of flower, plus edibles, vapes, concentrates, pre-rolls, and accessories. Many of our customers appreciate the convenience of getting their cigarettes and cannabis in one trip. Our knowledgeable staff can help you with both sides of our inventory.",
      },
    ],
    faqs: [
      { q: "Does After Dark Cannabis sell native cigarettes?", a: "Yes! We carry one of the widest selections of native cigarettes in York, including premium brands, value brands, full-flavour, light, and menthol varieties." },
      { q: "What cigarette brands do you carry?", a: "We stock a comprehensive range of native cigarette brands in multiple varieties. Our selection rotates regularly. Visit us at 1664 Jane St to see our full current inventory and pricing." },
      { q: "Where can I buy cheap cigarettes in York?", a: "After Dark Cannabis at 1664 Jane St offers some of the best cigarette prices in York's Weston area. We're open 24 hours so you can shop on your own schedule." },
      { q: "Are you open late for cigarette purchases?", a: "We're open 24 hours a day, 7 days a week. Whether you need cigarettes at noon or 3 AM, our doors are always open." },
      { q: "Can I buy cigarettes and cannabis at After Dark Cannabis?", a: "Absolutely. After Dark Cannabis is both a fully-licensed cannabis dispensary and a tobacco retailer. Many customers appreciate the convenience of one stop for both products." },
      { q: "Where is After Dark Cannabis located?", a: "1664 Jane St, York, ON M9N 2S1 — in Weston/Mount Dennis area. Near Weston GO Station, close to TTC bus routes, with free evening street parking available." },
    ],
  },

  {
    slug: "weed-store-near-mississauga",
    title: "Weed Store Near Mississauga — After Dark Cannabis | 5 Min From Highway 410 / 401",
    metaDescription: "Looking for a weed store near Mississauga? After Dark Cannabis at 1664 Jane St in York has flower tiers and other menu categories and is open 24 hours.",
    h1: "Weed Store Near Mississauga — After Dark Cannabis",
    icon: "🚗",
    heroTagline: "Just Minutes From Mississauga via Highway 410 & 401 · Open 24 Hours",
    banner: "/banners/after_dark_welcome_banner.webp",
    sections: [
      {
        heading: "The Closest Quality Dispensary to Mississauga",
        body: "After Dark Cannabis is one of the closest premium cannabis dispensaries to Mississauga. Located at 1664 Jane St in York — just minutes up Highway 410 and East on 401 — we're the easiest dispensary to reach when you're coming from the south-west. Whether you're driving from Square One, Port Credit, Streetsville, or anywhere in the Peel Region, After Dark Cannabis is the fastest, most convenient option for top-tier cannabis.",
      },
      {
        heading: "Why Make the Drive to After Dark Cannabis?",
        body: "After Dark Cannabis organizes flower into Exotic, Premium, AAA+, AA, and Budget sections, with separate categories for edibles, vapes, concentrates, pre-rolls, cigarettes, and accessories. Browse the listed weights, prices, and item details before travelling from Mississauga.",
      },
      {
        heading: "Open 24 Hours — Perfect for Late Night Visits",
        body: "Unlike most dispensaries in Peel Region with limited hours, After Dark Cannabis is open 24 hours a day, 7 days a week. Whether you're heading home from a late shift in Mississauga, going out for the night, or just need a quick pickup after hours, you can stop by After Dark Cannabis anytime. Early morning, late night, weekends, holidays — we're always here.",
      },
      {
        heading: "Directions From Mississauga",
        body: "From central Mississauga (Square One area): Take Highway 403 East to Highway 410 North or Hwy 401 East. Exit at Jane St in York and head south to 1664 Jane St. Total drive time: approximately 15-20 minutes. Free evening street parking is available near the dispensary. We're also accessible via TTC routes connecting from Mississauga Transit (MiWay) at subway terminals.",
      },
      {
        heading: "Full Menu — Cannabis, Edibles, Vapes & More",
        body: "Before travelling to York, use the site to browse flower tiers, edibles, vape pens, concentrates, pre-rolls, cigarettes, and accessories. Check the current category page when one listed item matters to the visit.",
      },
    ],
    faqs: [
      { q: "How far is After Dark Cannabis from Mississauga?", a: "We're located at 1664 Jane St in York — just a 15-20 minute drive from central Mississauga via Highway 401 East." },
      { q: "Where can I check the menu before travelling?", a: "Browse the After Dark Cannabis flower tiers and product categories online, then use the store page for current visit information." },
      { q: "Is After Dark Cannabis open late?", a: "We're open 24 hours a day, 7 days a week. Whether you're driving up from Mississauga at noon or midnight, we're open and ready to serve you." },
      { q: "What's the cheapest weed near Mississauga?", a: "After Dark Cannabis has Budget flower from $3/g and value ounces from $40. With our 3g bundle pricing, these are some of the best prices in the Greater Toronto Area." },
      { q: "Is there parking at After Dark Cannabis?", a: "Yes. Free evening street parking is available near the store on Jane St and surrounding residential streets." },
      { q: "Can I take transit from Mississauga to After Dark Cannabis?", a: "Yes! MiWay connects directly to TTC subway and bus routes that will drop you off right near our location on Jane St." },
      { q: "Do you carry products besides cannabis?", a: "Yes — we also carry native cigarettes, rolling papers, grinders, and other accessories. Many Mississauga customers appreciate the one-stop convenience." },
    ],
  },

  {
    slug: "dispensary-near-me-york",
    title: "Cannabis Dispensary Near Me York — After Dark Cannabis | Open 24 Hours",
    metaDescription: "Find After Dark Cannabis at 1664 Jane St in York. Browse flower tiers and product categories online. Open 24 hours with walk-in shopping.",
    h1: "Cannabis Dispensary Near Me — York",
    icon: "🗺️",
    heroTagline: "Walk-In Welcome · Open 24 Hours · Menu Categories Online",
    banner: "/banners/after_dark_welcome_banner.webp",
    sections: [
      {
        heading: "Find Premium Cannabis Near You in York",
        body: "If you're searching for a cannabis dispensary near you in York, After Dark Cannabis is conveniently located at 1664 Jane St — in the heart of Weston and Mount Dennis neighbourhoods. We serve customers from across York, North York, Etobicoke, Mississauga, and Toronto.",
      },
      {
        heading: "Why Choose After Dark Cannabis Over Other Dispensaries?",
        body: "After Dark Cannabis organizes flower into five clear tier pages and keeps edibles, vapes, concentrates, pre-rolls, cigarettes, and accessories in separate categories. The store is open 24 hours a day, 7 days a week; use the menu for current listed details.",
      },
      {
        heading: "Areas We Serve in Greater Toronto Area",
        body: "After Dark Cannabis is centrally located and easily accessible from anywhere in York and West Toronto. We regularly serve customers from: Weston, Mount Dennis, Silverthorn, Humber Heights, Kingsview Village, Pelmo Park, North York, Etobicoke, Rexdale, Mississauga, Brampton, and downtown Toronto. We're near the Weston GO Station, TTC routes, and Highway 401/Hwy 400."
      },
    ],
    faqs: [
      { q: "Where is the closest dispensary in Weston/York?", a: "After Dark Cannabis at 1664 Jane St is conveniently located in the heart of York — easily accessible from Weston Rd and Lawrence Ave W." },
      { q: "Is After Dark Cannabis walk-in friendly?", a: "Absolutely! No appointment needed. Walk in anytime — we're open 24 hours a day, 7 days a week. Our friendly staff is always ready to help." },
      { q: "What neighbourhoods does After Dark Cannabis serve?", a: "We serve all of York and surrounding areas, including Weston, Mount Dennis, Etobicoke, North York, Mississauga, Brampton, and Toronto." },
      { q: "How do I browse the menu?", a: "Visit afterdarkcannabis.com and choose a flower tier or product category to review the item details shown online." },
      { q: "Where can I browse edibles and vapes?", a: "Use the edibles, THC vape, and disposable-vape category pages to review the listed products and package details." },
    ],
  },
];

export function getSeoPageBySlug(slug: string): SeoPageData | undefined {
  return SEO_PAGES.find((p) => p.slug === slug);
}
