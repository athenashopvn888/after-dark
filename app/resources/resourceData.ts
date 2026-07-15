export interface ResourceCard {
  title: string;
  href: string;
  text: string;
}

export interface ResourceSection {
  heading: string;
  body: string;
  bullets?: string[];
}

export interface ResourcePage {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  eyebrow: string;
  intro: string;
  cards: ResourceCard[];
  sections: ResourceSection[];
}

export const RESOURCE_PAGES: ResourcePage[] = [
  {
    slug: "",
    title: "After Dark Cannabis Resources",
    seoTitle: "After Dark Cannabis Resources | Jane Street / York Menu And Visit Guides",
    description: "After Dark Cannabis resource pages for Jane Street / York shoppers, with local visit planning, menu shortcuts, flower tier pricing, value shopping, pre-roll tips, and Native smokes prices.",
    eyebrow: "Jane Street Resource Hub",
    intro: "A practical resource hub for late-night Jane Street and York shoppers. Use it to move from local search intent to the right menu shelf: flower, pre-rolls, edibles, THC vapes, concentrates, accessories, cigarettes, Native smokes, Backwoods, and grabba.",
    cards: [
      { title: "Local Visit Guide", href: "/resources/jane-street-york-visit-guide", text: "Plan the stop around Jane Street, Weston, Mount Dennis, Keelesdale, Eglinton West, York, Black Creek, and Trethewey Drive." },
      { title: "Menu Guide", href: "/resources/menu-guide", text: "Choose the best category before jumping into product pages." },
      { title: "Flower Tier Guide", href: "/resources/flower-guide", text: "Compare Exotic, Premium, AAA+, AA, and Budget with 3g and 6g deal math." },
      { title: "Value Guide", href: "/resources/value-guide", text: "A cleaner path for cheap weed, budget weed, and affordable flower searches." },
      { title: "Native Smokes Prices", href: "/resources/native-smokes", text: "Brand and price notes for cigarettes, Backwoods, grabba, and pouch listings." }
    ],
    sections: [
      {
        heading: "Local Search, Useful Next Step",
        body: "After Dark Cannabis is listed at 1664 Jane St, York, ON M9N 2S1. These resources support the protected store visit page, not replace it. Start with the local page for address and visit context, then use the resource guides for menu decisions.",
        bullets: ["store visit page: /weed-dispensary-york", "Local areas: Jane Street, Weston, Mount Dennis, Keelesdale, Eglinton West, York, Black Creek, and Trethewey Drive", "Store hours shown in the site data: Open 24 Hours"]
      },
      {
        heading: "Built Around Real Menu Sections",
        body: "The pages are organized around common shopper questions shoppers actually use: weed dispensary near Jane Street / York, cannabis store York, cheap weed, budget weed, pre-rolls, edibles, THC vapes, concentrates, Native cigarettes, Backwoods, and grabba."
      }
    ],
  },
  {
    slug: "jane-street-york-visit-guide",
    title: "Jane Street And York Weed Dispensary Visit Guide",
    seoTitle: "Jane Street And York Weed Dispensary Visit Guide | After Dark Cannabis",
    description: "Local visit planning for After Dark Cannabis at 1664 Jane St, with Jane Street, Weston, Mount Dennis, Keelesdale, Eglinton West, York, Black Creek, and Trethewey Drive context, menu shortcuts, hours, and category paths.",
    eyebrow: "Visit Guide",
    intro: "Use this page when the search starts local: weed dispensary near Jane Street / York, cannabis store near 1664 Jane St, or a quick menu check before visiting from Jane Street, Weston, Mount Dennis, Keelesdale, Eglinton West, York, Black Creek, and Trethewey Drive.",
    cards: [
      { title: "Store Visit Page", href: "/weed-dispensary-york", text: "Use the main store visit page for address, directions, hours, and store details." },
      { title: "Menu Guide", href: "/resources/menu-guide", text: "Choose the product section before opening deep menu pages." },
      { title: "Value Guide", href: "/resources/value-guide", text: "Fast help for affordable flower and budget weed searches." }
    ],
    sections: [
      {
        heading: "Address Anchor",
        body: "After Dark Cannabis is listed at 1664 Jane St, York, ON M9N 2S1. Keep that address as the local anchor, then use the resource pages to decide whether the trip is about flower, pre-rolls, edibles, THC vapes, concentrates, accessories, or cigarettes."
      },
      {
        heading: "Neighborhood Shopping Notes",
        body: "Jane Street moves a mix of Weston, Mount Dennis, Keelesdale, Eglinton West, and Black Creek shoppers, so the resource pages keep the path simple for quick stops and value searches.",
        bullets: ["Jane Street cannabis store shopping note", "Weston cannabis store shopping note", "Mount Dennis cannabis store shopping note", "Keelesdale cannabis store shopping note", "Eglinton West cannabis store shopping note", "York cannabis store shopping note", "Black Creek cannabis store shopping note", "Trethewey Drive cannabis store shopping note"]
      },
      {
        heading: "Best First Click",
        body: "If you need store details, start with /weed-dispensary-york. If you are comparing product types, start with the menu guide. If the trip is about Native smokes or cigarettes, start with the Native smokes page and then confirm the current category page."
      }
    ],
  },
  {
    slug: "menu-guide",
    title: "After Dark Cannabis Menu Guide",
    seoTitle: "After Dark Cannabis Menu Guide | Flower, Pre-Rolls, Edibles, Vapes And Cigarettes",
    description: "A category-guided menu guide for After Dark Cannabis, covering flower tiers, pre-rolls, edibles, THC vapes, concentrates, accessories, cigarettes, and Native smokes.",
    eyebrow: "Menu Guide",
    intro: "The menu gets easier when you choose the section first. Flower has tier math. Pre-rolls have format details. Edibles, THC vapes, concentrates, and accessories need category notes. Cigarettes need brand and price checks.",
    cards: [
      { title: "Flower Tiers", href: "/resources/flower-guide", text: "Start here for Exotic, Premium, AAA+, AA, and Budget flower." },
      { title: "Pre-Rolls", href: "/resources/pre-roll-guide", text: "Use this for ready-to-smoke singles, packs, and quick-trip browsing." },
      { title: "Cigarettes", href: "/items/cigarettes", text: "Open the cigarette category for current Native smokes listings." },
      { title: "Store Visit Page", href: "/weed-dispensary-york", text: "Return to the store visit page." }
    ],
    sections: [
      {
        heading: "Pick The Shelf First",
        body: "For late-night Jane Street and York shoppers, the best menu section is simple: flower shoppers compare tiers, pre-roll shoppers compare format, edible and vape shoppers read listing details, and cigarette shoppers compare brand, full/light/menthol style, and price.",
        bullets: ["Flower, pre-rolls, edibles, THC vapes, concentrates, accessories, and cigarettes are easiest to compare separately.", "Use current category pages for live product details.", "Use resources for shopping details and local planning."]
      },
      {
        heading: "Local Shopping Notes Without The Mess",
        body: "This page helps shoppers like weed dispensary near Jane Street / York, cannabis store York, cheap weed near me, Native cigarettes, and THC vape menu while keeping the actual shopping trip clear."
      }
    ],
  },
  {
    slug: "flower-guide",
    title: "After Dark Cannabis Flower Tier And 6g Price Guide",
    seoTitle: "After Dark Cannabis Flower Tier Guide | Exotic, Premium, AAA+, AA And Budget",
    description: "Compare After Dark Cannabis flower tiers with posted per-gram prices, 3g specials, 6g deal math, Budget flower, AA flower, AAA+, Premium, and Exotic.",
    eyebrow: "Flower Tiers",
    intro: "Here is the clean flower read: Exotic is posted at $20/g, Premium at $15/g, AAA+ at $10/g, AA at $4/g, and Budget at $3/g. Where the 6g tier deal applies, shoppers can compare Exotic around $60 for 6g, Premium around $45 for 6g, and AAA+ around $30 for 6g.",
    cards: [
      { title: "Exotic Flower", href: "/exotic", text: "$20/g, with 3g and 6g deal logic where listed." },
      { title: "Premium Flower", href: "/premium", text: "$15/g, with 3g and 6g deal logic where listed." },
      { title: "AAA+ Flower", href: "/aaa", text: "$10/g, with 3g and 6g deal logic where listed." },
      { title: "AA Flower", href: "/aa", text: "$4/g for a direct value lane." },
      { title: "Budget Flower", href: "/budget", text: "$3/g, with a $10 / 3g special where listed." }
    ],
    sections: [
      {
        heading: "Why The 6g Line Matters",
        body: "A straight per-gram price does not always tell the whole shelf story. The top flower lanes can show 3g and 6g deal logic, so a shopper comparing Exotic, Premium, and AAA+ should read the bundle line before judging value.",
        bullets: ["Exotic: $20/g, 3g for $40 or 6g around $60 where listed.", "Premium: $15/g, 3g for $30 or 6g around $45 where listed.", "AAA+: $10/g, 3g for $20 or 6g around $30 where listed."]
      },
      {
        heading: "Budget And AA Keep It Simple",
        body: "For cheap weed and budget weed searches, Budget at $3/g and AA at $4/g are the simplest lanes to compare. The final product name, strain note, and availability should still be checked on the current tier page."
      }
    ],
  },
  {
    slug: "value-guide",
    title: "After Dark Cannabis Value Weed Guide",
    seoTitle: "After Dark Cannabis Value Weed Guide | Cheap Weed Near Jane Street / York",
    description: "A value shopping guide for After Dark Cannabis, covering cheap weed, budget weed, AA flower, AAA+ deals, 6g tier math, and affordable menu sections.",
    eyebrow: "Value Guide",
    intro: "For Jane Street value shopping, value shopping works best when the shelf is clear. Start with Budget, AA, and AAA+ before jumping into higher tiers or mixed categories.",
    cards: [
      { title: "Budget Flower", href: "/budget", text: "$3/g for the lowest posted flower lane." },
      { title: "AA Flower", href: "/aa", text: "$4/g for a simple low-spend lane." },
      { title: "AAA+ Flower", href: "/aaa", text: "$10/g, 3g for $20, or 6g around $30 where listed." },
      { title: "Native Smokes Prices", href: "/resources/native-smokes", text: "Use this if cigarettes or Backwoods are part of the same stop." }
    ],
    sections: [
      {
        heading: "Start With Budget, Then Move Up",
        body: "If the search is cheap weed, budget weed, or affordable cannabis near Jane Street / York, start with Budget and AA. If the trip can stretch a little, AAA+ gives shoppers another value lane with 3g and 6g deal logic."
      },
      {
        heading: "Compare Inside The Category",
        body: "Value means something different for flower, pre-rolls, edibles, THC vapes, concentrates, accessories, and cigarettes. Keep each comparison inside the best category so the decision does not get muddy."
      }
    ],
  },
  {
    slug: "pre-roll-guide",
    title: "After Dark Cannabis Pre-Roll And Quick Trip Guide",
    seoTitle: "After Dark Cannabis Pre-Roll Guide | Ready-To-Smoke Menu Tips",
    description: "A pre-roll guide for After Dark Cannabis, with quick-trip tips for ready-to-smoke options, flower cross-shopping, edibles, vapes, concentrates, and accessories.",
    eyebrow: "Pre-Roll Guide",
    intro: "Pre-roll shoppers usually want a faster path than loose flower shoppers. Use this page when the goal is ready-to-smoke options, a quick stop, or a small add-on beside another category.",
    cards: [
      { title: "Pre-Rolls", href: "/items/prerolls", text: "Open the current pre-roll category." },
      { title: "Flower Tiers", href: "/resources/flower-guide", text: "Switch here if the visit turns into loose flower." },
      { title: "Menu Guide", href: "/resources/menu-guide", text: "Use this if the stop includes edibles, vapes, concentrates, or accessories." }
    ],
    sections: [
      {
        heading: "Keep Pre-Rolls In Their Own Lane",
        body: "Pre-rolls should be compared by format, pack size, posted notes, and current price. Do not force loose-flower tier logic onto pre-roll shopping unless the visit actually changes categories."
      },
      {
        heading: "Useful For Local Quick Stops",
        body: "For late-night Jane Street and York shoppers, pre-rolls can be the fastest shelf to check before heading through Jane Street, Weston, Mount Dennis, Keelesdale, Eglinton West, York, Black Creek, and Trethewey Drive. Use the current category page for live details."
      }
    ],
  },
  {
    slug: "native-smokes",
    title: "After Dark Cannabis Native Smokes Price Guide",
    seoTitle: "After Dark Cannabis Native Smokes Prices | Cigarettes, Backwoods And Grabba",
    description: "After Dark Cannabis Native smokes resource with cigarette brands and listed prices for Canadian, Putters, Canadian Goose, Nexus, Time, Backwoods, grabba, pouches, and mixed smoke items where shown.",
    eyebrow: "Native Smokes",
    intro: "This page gives cigarette shoppers a real starting point instead of a vague category page. Use it for Native cigarettes, Canadian brands, Backwoods, grabba, nicotine pouches, and mixed smoke item price checks at After Dark Cannabis.",
    cards: [
      { title: "$25 Cigarette Brands", href: "/items/cigarettes", text: "The cigarette category lists CANADIAN LIGHTS, CANADIAN FULL, PUTTERS, CANADIAN GOOSE FULL, CANADIAN GOOSE LIGHTS, CANADIAN MENTHOL, CANADIAN CLASSICS ORIGINAL, CANADIAN CLASSICS SILVER, ROLLED GOLD LIGHTS, NEXUS FULL, NEXUS LIGHTS, TIME FULL at $25 where shown." },
      { title: "Backwoods And Grabba", href: "/items/cigarettes", text: "NICOTINE POUCHES , VELO, PABLO, KILLA at $20; GRABBA at $5; GRABBA SHAKER *RedRose / Red Herring* at $19; BACKWOODS ASSORTED FLAVORS $20-$25 at $20; NEW BACKWOODS FLAVORS at $25" },
      { title: "Native Cigarettes Guide", href: "/resources/native-smokes/native-cigarettes-guide", text: "A fuller brand and price breakdown for cigarette shoppers." }
    ],
    sections: [
      {
        heading: "$25 Cigarette Brand List",
        body: "The cigarette category lists CANADIAN LIGHTS, CANADIAN FULL, PUTTERS, CANADIAN GOOSE FULL, CANADIAN GOOSE LIGHTS, CANADIAN MENTHOL, CANADIAN CLASSICS ORIGINAL, CANADIAN CLASSICS SILVER, ROLLED GOLD LIGHTS, NEXUS FULL, NEXUS LIGHTS, TIME FULL at $25 where shown.",
        bullets: ["CANADIAN LIGHTS - $25", "CANADIAN FULL - $25", "PUTTERS - $25", "CANADIAN GOOSE FULL - $25", "CANADIAN GOOSE LIGHTS - $25", "CANADIAN MENTHOL - $25", "CANADIAN CLASSICS ORIGINAL - $25", "CANADIAN CLASSICS SILVER - $25", "ROLLED GOLD LIGHTS - $25", "NEXUS FULL - $25", "NEXUS LIGHTS - $25", "TIME FULL - $25"]
      },
      {
        heading: "Backwoods, Grabba, Pouches, And Mix Items",
        body: "NICOTINE POUCHES , VELO, PABLO, KILLA at $20; GRABBA at $5; GRABBA SHAKER *RedRose / Red Herring* at $19; BACKWOODS ASSORTED FLAVORS $20-$25 at $20; NEW BACKWOODS FLAVORS at $25"
      },
      {
        heading: "Confirm The Current Shelf",
        body: "Cigarette inventory, flavors, and brand mix can change. Use the cigarette category for the current public list, then confirm in store when one exact brand, full/light/menthol style, pouch, grabba, or Backwoods flavor matters."
      }
    ],
  },
  {
    slug: "native-smokes/native-cigarettes-guide",
    title: "After Dark Cannabis Native Cigarettes Brand Guide",
    seoTitle: "After Dark Cannabis Native Cigarettes Guide | Brand And Price List",
    description: "A detailed Native cigarettes brand guide for After Dark Cannabis, including $25 cigarette listings and smoke add-on prices where shown.",
    eyebrow: "Native Cigarettes",
    intro: "If the trip includes cigarettes, start with brand and price first. This guide keeps Native cigarettes, Backwoods, grabba, pouches, and mixed smoke items separate from flower, pre-rolls, edibles, THC vapes, and concentrates.",
    cards: [
      { title: "Cigarette Category", href: "/items/cigarettes", text: "Open the current cigarette category." },
      { title: "Native Smokes Overview", href: "/resources/native-smokes", text: "Return to the shorter price guide." },
      { title: "Local Visit Guide", href: "/resources/jane-street-york-visit-guide", text: "Plan the store stop around the local area." }
    ],
    sections: [
      {
        heading: "Brand Names To Check",
        body: "The cigarette category lists CANADIAN LIGHTS, CANADIAN FULL, PUTTERS, CANADIAN GOOSE FULL, CANADIAN GOOSE LIGHTS, CANADIAN MENTHOL, CANADIAN CLASSICS ORIGINAL, CANADIAN CLASSICS SILVER, ROLLED GOLD LIGHTS, NEXUS FULL, NEXUS LIGHTS, TIME FULL at $25 where shown.",
        bullets: ["CANADIAN LIGHTS - $25", "CANADIAN FULL - $25", "PUTTERS - $25", "CANADIAN GOOSE FULL - $25", "CANADIAN GOOSE LIGHTS - $25", "CANADIAN MENTHOL - $25", "CANADIAN CLASSICS ORIGINAL - $25", "CANADIAN CLASSICS SILVER - $25", "ROLLED GOLD LIGHTS - $25", "NEXUS FULL - $25", "NEXUS LIGHTS - $25", "TIME FULL - $25"]
      },
      {
        heading: "Smoke Category Add-Ons",
        body: "NICOTINE POUCHES , VELO, PABLO, KILLA at $20; GRABBA at $5; GRABBA SHAKER *RedRose / Red Herring* at $19; BACKWOODS ASSORTED FLAVORS $20-$25 at $20; NEW BACKWOODS FLAVORS at $25"
      },
      {
        heading: "Separate The Smoke Shelf From Cannabis Shopping",
        body: "When the same visit includes flower, pre-rolls, edibles, THC vapes, concentrates, or accessories, keep cigarettes as their own lane. It makes the category easier for both cannabis shoppers and Native smokes shoppers."
      }
    ],
  },
  {
    slug: "resource-centre-launch",
    title: "After Dark Cannabis Resource Guide Refresh",
    seoTitle: "After Dark Cannabis Resource Guide Refresh | Local Menu Guides",
    description: "After Dark Cannabis resource guide refresh with local visit planning, menu guide pages, flower tier pricing, value shopping, pre-roll tips, and Native smokes prices.",
    eyebrow: "Resource Update",
    intro: "The resource centre has been rebuilt around real shopping trips: local visit planning, category-guided browsing, flower tier math, value shopping, pre-roll shortcuts, and cigarette price notes.",
    cards: [
      { title: "Resource Home", href: "/resources", text: "Start at the main resource hub." },
      { title: "Local Visit Guide", href: "/resources/jane-street-york-visit-guide", text: "Plan around Jane Street, Weston, Mount Dennis, Keelesdale, Eglinton West, York, Black Creek, and Trethewey Drive." },
      { title: "Flower Tier Guide", href: "/resources/flower-guide", text: "Review the 3g and 6g pricing logic." },
      { title: "Native Smokes Prices", href: "/resources/native-smokes", text: "Check brand and price notes." }
    ],
    sections: [
      {
        heading: "What Changed",
        body: "The resources now sound like After Dark Cannabis and Jane Street / York, not a copied store template. Each page supports a specific shopper task and points back to the best category or store visit page."
      },
      {
        heading: "What Stayed Protected",
        body: "The important SEO paths stay intact: /weed-dispensary-york, /resources, /resources/menu-guide, /resources/flower-guide, /resources/value-guide, /resources/pre-roll-guide, /resources/native-smokes, and /resources/native-smokes/native-cigarettes-guide."
      }
    ],
  }
];

export const RESOURCE_HOME = RESOURCE_PAGES[0];

export function getResourcePage(slug: string) {
  const cleanSlug = slug.replace(/^\/+|\/+$/g, "");
  return RESOURCE_PAGES.find((page) => page.slug === cleanSlug);
}
