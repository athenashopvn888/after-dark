export type ResourceAuthorKey = "team" | "menu" | "local";

export interface ResourceAuthor {
  name: string;
  handle: string;
  role: string;
}

export interface ResourceLink {
  label: string;
  href: string;
  description?: string;
}

export interface ResourceSection {
  heading: string;
  body: string[];
  bullets?: string[];
  links?: ResourceLink[];
}

export interface ResourcePage {
  path: string;
  kind: "root" | "category" | "article";
  parent?: string;
  categoryLabel: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  excerpt: string;
  primaryKeyword: string;
  supportingKeywords: string[];
  searchIntent: string;
  author: ResourceAuthorKey;
  datePublished: string;
  dateModified: string;
  image: {
    src: string;
    alt: string;
  };
  intro: string[];
  sections: ResourceSection[];
  commercialLinks: ResourceLink[];
  related: string[];
}

export const SITE = {
  name: "After Dark Cannabis",
  domain: "afterdarkcannabis.com",
  baseUrl: "https://afterdarkcannabis.com",
  storePage: "/weed-dispensary-york",
  address: "1664 Jane St, York, ON M9N 2S1",
  phone: "(647) 350-0420",
  hours: "Open 24 hours",
};

export const AUTHORS: Record<ResourceAuthorKey, ResourceAuthor> = {
  team: {
    name: "After Dark Cannabis Team",
    handle: "@AfterDarkCannabis",
    role: "Store Team",
  },
  menu: {
    name: "After Dark Menu Desk",
    handle: "@AfterDarkMenu",
    role: "Menu Guide",
  },
  local: {
    name: "Jane Street Desk",
    handle: "@JaneStreetAfterDark",
    role: "Local Guide",
  },
};

export const updated = "2026-07-15";

export const RESOURCE_PAGES: ResourcePage[] = [
  {
    path: "/resources",
    kind: "root",
    categoryLabel: "Resource Centre",
    title: "After Dark Cannabis Resource Centre",
    seoTitle: "After Dark Cannabis Resources | Jane Street Cannabis Guides",
    metaDescription:
      "After Dark Cannabis resources for Jane Street and York shoppers, including Gas Gang, Drizzle, nicotine pouches, Backwoods, grabba, vapes, edibles, pre-rolls, flower, and local visit guides.",
    h1: "After Dark Cannabis Resource Centre",
    excerpt:
      "Jane Street guides for the full shelf: Gas Gang, Drizzle, nicotine pouches, Backwoods, grabba, vapes, edibles, pre-rolls, flower, value buys, and local store planning.",
    primaryKeyword: "After Dark Cannabis resources",
    supportingKeywords: [
      "Jane Street cannabis guide",
      "Gas Gang vapes York",
      "Drizzle Switch 3 in 1",
      "nicotine pouches York",
      "Backwoods and grabba York",
    ],
    searchIntent: "Find After Dark Cannabis shopping guides and product-brand pages.",
    author: "team",
    datePublished: updated,
    dateModified: updated,
    image: {
      src: "/banners/after_dark_edibles_prerolls_more_banner.webp",
      alt: "After Dark Cannabis resource guides for Jane Street shoppers",
    },
    intro: [
      "After Dark is not just a flower menu. The current shelf gives shoppers brand names and add-on categories worth searching by name: Gas Gang disposable vapes, Drizzle Switch 3-in-1, ZYN, Velo, Pablo, Killa, Backwoods, grabba, edibles, concentrates, accessories, cigarettes, pre-rolls, and flower tiers.",
      "This hub turns those real menu terms into cleaner shopping sections. Use it when the trip starts with a product type, a brand name, a smoke-shop add-on, or a Jane Street/York local search.",
    ],
    sections: [
      {
        heading: "Non-Flower Keywords Get Their Own Shelf",
        body: [
          "Gas Gang, Drizzle, nicotine pouches, Backwoods, and grabba deserve clear space in the shopping guide. They are current product names shoppers recognize, so this resource centre keeps those terms easy to find.",
        ],
      },
      {
        heading: "Monthly Menu Language Can Stay Fresh",
        body: [
          "This copy is written from the current product data. When a monthly menu pass removes or adds brands, the resource pages can move with it so the site keeps talking like the shelf shoppers actually see.",
        ],
      },
    ],
    commercialLinks: [
      { label: "View the Jane Street store page", href: SITE.storePage },
      { label: "Shop Gas Gang and Drizzle vapes", href: "/items/vape-disposables" },
      { label: "Shop nicotine pouches and smokes", href: "/items/cigarettes" },
      { label: "Browse edibles", href: "/items/edibles" },
    ],
    related: [
      "/resources/brand-guides/gas-gang-drizzle-vapes",
      "/resources/nicotine-pouches",
      "/resources/native-smokes/backwoods-grabba-guide",
    ],
  },
  {
    path: "/resources/cannabis-101",
    kind: "category",
    parent: "/resources",
    categoryLabel: "Cannabis 101",
    title: "Cannabis 101 Guides",
    seoTitle: "Cannabis 101 Guides | After Dark Cannabis",
    metaDescription:
      "Cannabis 101 guides from After Dark Cannabis for reading flower, pre-roll, edible, vape, concentrate, cigarette, and accessory menu sections.",
    h1: "Cannabis 101: Pick the Section Before the Product",
    excerpt:
      "Start with the shelf: flower, pre-rolls, edibles, vapes, concentrates, cigarettes, pouches, grabba, Backwoods, or accessories.",
    primaryKeyword: "cannabis menu guide York",
    supportingKeywords: ["cannabis 101 Jane Street", "After Dark Cannabis menu", "cannabis product categories"],
    searchIntent: "Understand how to browse the current menu by product type.",
    author: "menu",
    datePublished: updated,
    dateModified: updated,
    image: { src: "/banners/after_dark_welcome_banner.webp", alt: "After Dark Cannabis menu guide" },
    intro: [
      "A good menu read starts with format. A Gas Gang disposable vape, a Drizzle Switch, a Backwoods pack, a pouch tin, and a flower eighth do not belong in the same comparison.",
    ],
    sections: [
      {
        heading: "Use Format First",
        body: [
          "The fastest path is simple: choose flower, pre-rolls, edibles, vapes, concentrates, cigarettes, accessories, or magic/specialty items, then compare the product names inside that section.",
        ],
        links: [
          { label: "Read the menu guide", href: "/resources/menu-guide" },
          { label: "Open the store page", href: SITE.storePage },
        ],
      },
    ],
    commercialLinks: [
      { label: "Browse flower tiers", href: "/resources/flower-guides" },
      { label: "Browse non-flower guides", href: "/resources/brand-guides" },
    ],
    related: ["/resources/menu-guide", "/resources/value-guides", "/resources/vape-guides"],
  },
  {
    path: "/resources/menu-guide",
    kind: "article",
    parent: "/resources/cannabis-101",
    categoryLabel: "Menu Guide",
    title: "After Dark Cannabis Menu Guide",
    seoTitle: "After Dark Cannabis Menu Guide | Vapes, Edibles, Smokes, Flower",
    metaDescription:
      "A practical After Dark Cannabis menu guide covering Gas Gang, Drizzle, nicotine pouches, Backwoods, grabba, edibles, vapes, pre-rolls, concentrates, flower, and cigarettes.",
    h1: "After Dark Menu Guide: Flower Is Only One Section",
    excerpt:
      "Read the After Dark menu by shelf, then use brand names like Gas Gang, Drizzle, Velo, Pablo, Killa, Backwoods, and grabba to narrow the trip.",
    primaryKeyword: "After Dark Cannabis menu guide",
    supportingKeywords: ["Gas Gang menu", "Drizzle vape menu", "nicotine pouches menu", "Backwoods grabba menu"],
    searchIntent: "Navigate the current After Dark Cannabis menu by category and brand.",
    author: "menu",
    datePublished: updated,
    dateModified: updated,
    image: { src: "/banners/after_dark_edibles_prerolls_more_banner.webp", alt: "After Dark Cannabis menu shelves" },
    intro: [
      "The best menu move is to choose the shelf first. Flower has tier math. Pre-rolls are quick-trip products. Edibles and concentrates need package detail. Vapes carry recognizable product names like Gas Gang and Drizzle. Cigarettes and pouches have their own smoke-shop language.",
    ],
    sections: [
      {
        heading: "Current Non-Flower Names Worth Searching",
        body: [
          "The current menu data includes Gas Gang Dispo Vape 1G, 2g Gas Gang Vol.3 Hybrid, Drizzle Switch 3in1 / 2G, ZYN nicotine pouches, nicotine pouches with Velo, Pablo, and Killa, Backwoods assorted flavors, new Backwoods flavors, grabba, and grabba shaker.",
        ],
      },
      {
        heading: "Keep Each Shelf Clean",
        body: [
          "Do not compare a pouch price to an edible price or a disposable vape to a flower tier. The shopper wins when every category has a clean next click.",
        ],
      },
    ],
    commercialLinks: [
      { label: "Vape disposables", href: "/items/vape-disposables" },
      { label: "Cigarettes and pouches", href: "/items/cigarettes" },
      { label: "Edibles", href: "/items/edibles" },
      { label: "Pre-rolls", href: "/items/prerolls" },
    ],
    related: [
      "/resources/brand-guides/gas-gang-drizzle-vapes",
      "/resources/nicotine-pouches",
      "/resources/pre-roll-guides",
    ],
  },
  {
    path: "/resources/brand-guides",
    kind: "category",
    parent: "/resources",
    categoryLabel: "Brand Guides",
    title: "Brand and Product Guides",
    seoTitle: "Brand Guides | Gas Gang, Drizzle, Nicotine Pouches | After Dark Cannabis",
    metaDescription:
      "After Dark Cannabis brand guides for Gas Gang, Drizzle, nicotine pouches, Backwoods, grabba, and other non-flower products from the current menu.",
    h1: "Brand Guides for the Non-Flower Shelf",
    excerpt:
      "Gas Gang, Drizzle, nicotine pouches, Backwoods, and grabba get treated like real shopper keywords.",
    primaryKeyword: "After Dark Cannabis brand guides",
    supportingKeywords: ["Gas Gang York", "Drizzle vape York", "Backwoods York", "grabba York"],
    searchIntent: "Find current brand and product-name guides.",
    author: "menu",
    datePublished: updated,
    dateModified: updated,
    image: { src: "/banners/02_Vape_Disposable.webp", alt: "After Dark vape and product brand guide" },
    intro: [
      "Some shoppers do not start with a category. They start with a name. This section is for the terms currently showing in the menu data, especially Gas Gang, Drizzle, pouches, Backwoods, and grabba.",
    ],
    sections: [
      {
        heading: "Brand Terms Belong in the Site Vocabulary",
        body: [
          "These pages give shoppers a clear place to learn about each product category beyond flower.",
        ],
      },
    ],
    commercialLinks: [
      { label: "Gas Gang and Drizzle guide", href: "/resources/brand-guides/gas-gang-drizzle-vapes" },
      { label: "Backwoods and grabba guide", href: "/resources/native-smokes/backwoods-grabba-guide" },
      { label: "Nicotine pouches guide", href: "/resources/nicotine-pouches" },
    ],
    related: ["/resources/vape-guides", "/resources/native-smokes", "/resources/menu-guide"],
  },
  {
    path: "/resources/brand-guides/gas-gang-drizzle-vapes",
    kind: "article",
    parent: "/resources/brand-guides",
    categoryLabel: "Vape Brands",
    title: "Gas Gang and Drizzle Vape Guide",
    seoTitle: "Gas Gang and Drizzle Vapes | After Dark Cannabis Jane Street",
    metaDescription:
      "After Dark Cannabis guide for Gas Gang Dispo Vape 1G, 2g Gas Gang Vol.3 Hybrid, and Drizzle Switch 3in1 / 2G from the current vape disposable shelf.",
    h1: "Gas Gang and Drizzle Vapes at After Dark",
    excerpt:
      "Gas Gang Dispo Vape 1G, 2g Gas Gang Vol.3 Hybrid, and Drizzle Switch 3in1 / 2G are current vape-name keywords worth a clear page.",
    primaryKeyword: "Gas Gang vapes York",
    supportingKeywords: ["Drizzle Switch 3in1 2G", "Gas Gang disposable vape", "After Dark vape disposables"],
    searchIntent: "Compare named vape disposable products at After Dark Cannabis.",
    author: "menu",
    datePublished: updated,
    dateModified: updated,
    image: { src: "/banners/02_Vape_Disposable.webp", alt: "Gas Gang and Drizzle vape guide" },
    intro: [
      "The current vape disposable shelf includes Gas Gang Dispo Vape 1G, 2g Gas Gang Vol.3 Hybrid, and Drizzle Switch 3in1 / 2G. That gives the site a strong non-flower keyword section for vape shoppers on Jane Street.",
    ],
    sections: [
      {
        heading: "Current Listed Vape Names",
        body: [
          "Gas Gang Dispo Vape 1G is listed at $45. 2g Gas Gang Vol.3 Hybrid is listed at $50. Drizzle Switch 3in1 / 2G is listed at $50.",
        ],
        bullets: [
          "Gas Gang Dispo Vape 1G - $45",
          "2g Gas Gang Vol.3 Hybrid - $50",
          "Drizzle Switch 3in1 / 2G - $50",
        ],
      },
      {
        heading: "Why This Page Exists",
        body: [
          "These are product-name searches, not broad flower searches. A dedicated guide gives Gas Gang and Drizzle a stronger landing path while still pointing shoppers back to the current vape disposable category.",
        ],
      },
    ],
    commercialLinks: [{ label: "Shop vape disposables", href: "/items/vape-disposables" }],
    related: ["/resources/vape-guides", "/resources/menu-guide", "/resources/value-guides"],
  },
  {
    path: "/resources/vape-guides",
    kind: "category",
    parent: "/resources",
    categoryLabel: "Vape Guides",
    title: "THC Vape and Disposable Guides",
    seoTitle: "THC Vape Guides | Gas Gang and Drizzle | After Dark Cannabis",
    metaDescription:
      "After Dark Cannabis vape guides for THC vapes, disposable vapes, Gas Gang, Drizzle, vape pens, and current menu navigation.",
    h1: "Vape Guides: Disposable Names Need Their Own Section",
    excerpt:
      "Use this section for THC vapes, vape disposables, Gas Gang, Drizzle, and format-first menu browsing.",
    primaryKeyword: "THC vapes York",
    supportingKeywords: ["vape disposables York", "Gas Gang vape", "Drizzle vape", "After Dark vapes"],
    searchIntent: "Compare vape formats and named disposable products.",
    author: "menu",
    datePublished: updated,
    dateModified: updated,
    image: { src: "/banners/01_Vape_Pens.webp", alt: "After Dark THC vape guide" },
    intro: [
      "Vape shoppers usually search by format or brand name. After Dark's resource section covers both: THC vape browsing plus named disposable products like Gas Gang and Drizzle.",
    ],
    sections: [
      {
        heading: "Vape Pen vs Disposable Search",
        body: [
          "Vape pens and disposable vapes are easier to shop when they are separated. Gas Gang and Drizzle shoppers get a faster read when those names sit close to the vape disposable shelf.",
        ],
      },
    ],
    commercialLinks: [
      { label: "Vape pens", href: "/items/vapes" },
      { label: "Vape disposables", href: "/items/vape-disposables" },
    ],
    related: ["/resources/brand-guides/gas-gang-drizzle-vapes", "/resources/menu-guide"],
  },
  {
    path: "/resources/nicotine-pouches",
    kind: "article",
    parent: "/resources/native-smokes",
    categoryLabel: "Nicotine Pouches",
    title: "Nicotine Pouches Guide",
    seoTitle: "Nicotine Pouches, ZYN, Velo, Pablo, Killa | After Dark Cannabis",
    metaDescription:
      "After Dark Cannabis nicotine pouch guide for ZYN and nicotine pouches with Velo, Pablo, and Killa from the current cigarette category.",
    h1: "Nicotine Pouches: ZYN, Velo, Pablo, Killa",
    excerpt:
      "A current smoke-shelf guide for ZYN nicotine pouches and nicotine pouches listed with Velo, Pablo, and Killa.",
    primaryKeyword: "nicotine pouches York",
    supportingKeywords: ["ZYN nicotine pouches", "Velo Pablo Killa pouches", "After Dark nicotine pouches"],
    searchIntent: "Find current nicotine pouch product names and category links.",
    author: "menu",
    datePublished: updated,
    dateModified: updated,
    image: { src: "/banners/06_Cigarettes.webp", alt: "After Dark nicotine pouches guide" },
    intro: [
      "After Dark's current cigarette category includes ZYN nicotine pouches and a nicotine pouch listing naming Velo, Pablo, and Killa. Those names deserve their own guide because pouch shoppers search differently than flower shoppers.",
    ],
    sections: [
      {
        heading: "Current Listed Pouch Names",
        body: [
          "The product data lists ZYN nicotine pouches and nicotine pouches with Velo, Pablo, and Killa at $20.",
        ],
        bullets: ["ZYN nicotine pouches", "Nicotine pouches, Velo, Pablo, Killa - $20"],
      },
      {
        heading: "Keep Pouches Out of the Cannabis Comparison",
        body: [
          "Pouches live on the smoke-shop side of the visit. They should link to the cigarette category, not get blended into flower, pre-roll, edible, or vape copy.",
        ],
      },
    ],
    commercialLinks: [{ label: "Shop cigarettes and pouches", href: "/items/cigarettes" }],
    related: ["/resources/native-smokes", "/resources/native-smokes/backwoods-grabba-guide"],
  },
  {
    path: "/resources/native-smokes",
    kind: "category",
    parent: "/resources",
    categoryLabel: "Native Smokes",
    title: "Native Smokes, Cigarettes, Pouches, Backwoods",
    seoTitle: "Native Smokes, Cigarettes, Pouches, Backwoods | After Dark Cannabis",
    metaDescription:
      "After Dark Cannabis smoke-shelf guide for Native cigarettes, nicotine pouches, Backwoods, grabba, Canadian brands, Nexus, Time, Putters, and more.",
    h1: "Native Smokes and Smoke-Shelf Guides",
    excerpt:
      "Cigarettes, pouches, Backwoods, grabba, and carton-brand searches get a cleaner section beside the cannabis menu.",
    primaryKeyword: "native cigarettes York",
    supportingKeywords: ["Backwoods York", "grabba York", "ZYN nicotine pouches", "Canadian cigarettes York"],
    searchIntent: "Find smoke-shelf product names and category links.",
    author: "menu",
    datePublished: updated,
    dateModified: updated,
    image: { src: "/banners/06_Cigarettes.webp", alt: "After Dark Native smokes and cigarettes guide" },
    intro: [
      "The smoke shelf is its own visit reason. After Dark's current data includes Canadian, Canadian Classics, Canadian Goose, Nexus, Putters, Time, Backwoods, grabba, ZYN, Velo, Pablo, and Killa terms.",
    ],
    sections: [
      {
        heading: "Current Cigarette and Smoke Terms",
        body: [
          "Cigarette shoppers may be looking for Canadian Lights, Canadian Full, Canadian Menthol, Canadian Classics, Canadian Goose, Nexus, Putters, Time, Backwoods, grabba, or nicotine pouches. This page keeps those terms visible and organized.",
        ],
      },
    ],
    commercialLinks: [
      { label: "Nicotine pouches guide", href: "/resources/nicotine-pouches" },
      { label: "Backwoods and grabba guide", href: "/resources/native-smokes/backwoods-grabba-guide" },
      { label: "Shop cigarettes and pouches", href: "/items/cigarettes" },
    ],
    related: ["/resources/nicotine-pouches", "/resources/native-smokes/backwoods-grabba-guide", "/resources/menu-guide"],
  },
  {
    path: "/resources/native-smokes/backwoods-grabba-guide",
    kind: "article",
    parent: "/resources/native-smokes",
    categoryLabel: "Backwoods and Grabba",
    title: "Backwoods and Grabba Guide",
    seoTitle: "Backwoods and Grabba Guide | After Dark Cannabis Jane Street",
    metaDescription:
      "After Dark Cannabis guide for Backwoods assorted flavors, new Backwoods flavors, grabba, and grabba shaker from the current cigarette category.",
    h1: "Backwoods and Grabba at After Dark",
    excerpt:
      "Backwoods assorted flavors, new Backwoods flavors, grabba, and grabba shaker get a direct smoke-shelf guide.",
    primaryKeyword: "Backwoods and grabba York",
    supportingKeywords: ["Backwoods Jane Street", "grabba York", "grabba shaker", "After Dark smoke shop"],
    searchIntent: "Find current Backwoods and grabba names and prices.",
    author: "menu",
    datePublished: updated,
    dateModified: updated,
    image: { src: "/banners/06_Cigarettes.webp", alt: "After Dark Backwoods and grabba guide" },
    intro: [
      "The current smoke shelf lists grabba at $5, grabba shaker at $19, Backwoods assorted flavors at $20, and new Backwoods flavors at $25.",
    ],
    sections: [
      {
        heading: "Current Listed Smoke Add-Ons",
        body: [
          "Backwoods and grabba shoppers usually search by product name. The cigarette category currently supports those names directly.",
        ],
        bullets: [
          "Grabba - $5",
          "Grabba Shaker RedRose / Red Herring - $19",
          "Backwoods Assorted Flavors - $20",
          "New Backwoods Flavors - $25",
        ],
      },
    ],
    commercialLinks: [{ label: "Shop cigarettes and smoke add-ons", href: "/items/cigarettes" }],
    related: ["/resources/native-smokes", "/resources/nicotine-pouches"],
  },
  {
    path: "/resources/flower-guides",
    kind: "category",
    parent: "/resources",
    categoryLabel: "Flower Guides",
    title: "Flower Tier Guides",
    seoTitle: "After Dark Flower Guides | Exotic, Premium, AAA+, AA, Budget",
    metaDescription:
      "After Dark Cannabis flower guides for Exotic, Premium, AAA+, AA, Budget, value math, and Jane Street cannabis shoppers.",
    h1: "Flower Guides: Keep the Tier Math Clean",
    excerpt:
      "Flower still matters. It just does not need to swallow the whole resource centre.",
    primaryKeyword: "After Dark flower guide",
    supportingKeywords: ["cheap weed Jane Street", "Budget flower York", "Exotic flower York"],
    searchIntent: "Compare After Dark flower tiers and value sections.",
    author: "menu",
    datePublished: updated,
    dateModified: updated,
    image: { src: "/banners/after_dark_exotics_banner.webp", alt: "After Dark flower guide" },
    intro: [
      "Flower shoppers can still start with Exotic, Premium, AAA+, AA, and Budget. This section keeps flower strong without burying vapes, edibles, pouches, Backwoods, or grabba.",
    ],
    sections: [
      {
        heading: "Tier First, Product Second",
        body: [
          "Start with the tier page that matches the spend, then compare product names and posted details inside the current menu.",
        ],
      },
    ],
    commercialLinks: [
      { label: "Exotic flower", href: "/exotic" },
      { label: "Premium flower", href: "/premium" },
      { label: "AAA+ flower", href: "/aaa" },
      { label: "AA flower", href: "/aa" },
      { label: "Budget flower", href: "/budget" },
    ],
    related: ["/resources/value-guides", "/resources/menu-guide"],
  },
  {
    path: "/resources/pre-roll-guides",
    kind: "category",
    parent: "/resources",
    categoryLabel: "Pre-Roll Guides",
    title: "Pre-Roll Guides",
    seoTitle: "After Dark Pre-Roll Guides | Jane Street Cannabis",
    metaDescription:
      "After Dark Cannabis pre-roll guides for quick-trip shoppers comparing pre-rolls, flower, vapes, edibles, and add-ons.",
    h1: "Pre-Roll Guides for Quick Trips",
    excerpt:
      "Pre-rolls deserve their own quick-trip section beside flower, vapes, edibles, and smoke add-ons.",
    primaryKeyword: "pre-rolls York",
    supportingKeywords: ["After Dark pre-rolls", "Jane Street pre-rolls", "pre-roll menu guide"],
    searchIntent: "Browse pre-roll shopping guidance.",
    author: "menu",
    datePublished: updated,
    dateModified: updated,
    image: { src: "/banners/04_Pre_Rolls.webp", alt: "After Dark pre-roll guide" },
    intro: ["Pre-roll shoppers usually want a fast path. Keep the pre-roll section separate from loose flower and from disposable vape searches."],
    sections: [
      {
        heading: "Ready-To-Smoke Logic",
        body: ["Compare pre-rolls by product name, format, pack count, and current category details before adding edibles, vapes, pouches, or cigarettes to the same visit."],
      },
    ],
    commercialLinks: [{ label: "Shop pre-rolls", href: "/items/prerolls" }],
    related: ["/resources/menu-guide", "/resources/flower-guides"],
  },
  {
    path: "/resources/edibles-guides",
    kind: "category",
    parent: "/resources",
    categoryLabel: "Edibles Guides",
    title: "Edibles Guides",
    seoTitle: "After Dark Edibles Guides | Jane Street Cannabis",
    metaDescription:
      "After Dark Cannabis edibles guides for gummies, chocolates, drinks, package details, and current menu browsing.",
    h1: "Edibles Guides: Read the Package Section",
    excerpt:
      "Edibles are their own shelf, with different product names and package details than flower or vapes.",
    primaryKeyword: "edibles York",
    supportingKeywords: ["After Dark edibles", "Jane Street edibles", "cannabis gummies York"],
    searchIntent: "Browse edible product guidance.",
    author: "menu",
    datePublished: updated,
    dateModified: updated,
    image: { src: "/banners/Edibles.webp", alt: "After Dark edibles guide" },
    intro: ["The edibles section should talk about edible formats, package names, and current category browsing instead of borrowing flower language."],
    sections: [
      {
        heading: "Format Beats Hype",
        body: ["Gummies, chocolates, drinks, and other edibles ask shoppers to read package detail first. Keep that comparison separate from pre-rolls, vapes, concentrates, and cigarettes."],
      },
    ],
    commercialLinks: [{ label: "Shop edibles", href: "/items/edibles" }],
    related: ["/resources/menu-guide", "/resources/vape-guides"],
  },
  {
    path: "/resources/concentrates-guides",
    kind: "category",
    parent: "/resources",
    categoryLabel: "Concentrates",
    title: "Concentrates Guides",
    seoTitle: "After Dark Concentrates Guides | Jane Street Cannabis",
    metaDescription:
      "After Dark Cannabis concentrates guides for browsing extracts, concentrate formats, and current menu categories.",
    h1: "Concentrates Guides: Small Shelf, Sharp Details",
    excerpt:
      "Concentrates get their own read instead of being folded into flower or vape copy.",
    primaryKeyword: "concentrates York",
    supportingKeywords: ["After Dark concentrates", "Jane Street concentrates", "cannabis extracts York"],
    searchIntent: "Browse concentrate shopping guidance.",
    author: "menu",
    datePublished: updated,
    dateModified: updated,
    image: { src: "/banners/03_Concentrates.webp", alt: "After Dark concentrates guide" },
    intro: ["Concentrate shoppers are usually looking for a specific format or product type. A dedicated section makes those searches cleaner."],
    sections: [
      {
        heading: "Do Not Mix Concentrates With Flower Tiers",
        body: ["Flower tier terms do not explain concentrate products well. Keep concentrates in their own category path and use current product details for the final choice."],
      },
    ],
    commercialLinks: [{ label: "Shop concentrates", href: "/items/concentrates" }],
    related: ["/resources/vape-guides", "/resources/menu-guide"],
  },
  {
    path: "/resources/value-guides",
    kind: "category",
    parent: "/resources",
    categoryLabel: "Value Guides",
    title: "Value Guides",
    seoTitle: "After Dark Value Guides | Cheap Weed and Smart Menu Math",
    metaDescription:
      "After Dark Cannabis value guides for Budget flower, AA flower, vape disposables, pouches, cigarettes, Backwoods, grabba, and current menu comparisons.",
    h1: "Value Guides: Compare Inside the Right Shelf",
    excerpt:
      "Cheap weed, pouches, Backwoods, grabba, and vape disposables all have different value math.",
    primaryKeyword: "cheap weed York",
    supportingKeywords: ["budget flower Jane Street", "cheap native cigarettes York", "vape disposable prices York"],
    searchIntent: "Compare value categories at After Dark Cannabis.",
    author: "menu",
    datePublished: updated,
    dateModified: updated,
    image: { src: "/banners/after_dark_budget_banner.webp", alt: "After Dark value guide" },
    intro: [
      "Value should be compared inside the right shelf. Budget flower, Gas Gang disposables, Drizzle Switch, nicotine pouches, Backwoods, and grabba all need different price logic.",
    ],
    sections: [
      {
        heading: "Value Is Not One Category",
        body: [
          "A $3/g Budget flower section, a $45 Gas Gang disposable, a $50 Drizzle Switch, a $20 pouch listing, and a $5 grabba listing should all be visible, but not mashed into one comparison.",
        ],
      },
    ],
    commercialLinks: [
      { label: "Budget flower", href: "/budget" },
      { label: "Vape disposables", href: "/items/vape-disposables" },
      { label: "Cigarettes and pouches", href: "/items/cigarettes" },
    ],
    related: ["/resources/brand-guides/gas-gang-drizzle-vapes", "/resources/nicotine-pouches"],
  },
  {
    path: "/resources/local-guides",
    kind: "category",
    parent: "/resources",
    categoryLabel: "Local Guides",
    title: "Jane Street and York Local Guides",
    seoTitle: "Jane Street and York Cannabis Guides | After Dark Cannabis",
    metaDescription:
      "After Dark Cannabis local guides for Jane Street, York, Weston, Mount Dennis, Keelesdale, Eglinton West, Black Creek, and Trethewey Drive shoppers.",
    h1: "Jane Street and York Local Guides",
    excerpt:
      "Local search pages for shoppers who start with the area, then need the right product section.",
    primaryKeyword: "weed dispensary Jane Street",
    supportingKeywords: ["weed dispensary York", "cannabis store Weston", "cannabis near Mount Dennis"],
    searchIntent: "Find local After Dark Cannabis visit information.",
    author: "local",
    datePublished: updated,
    dateModified: updated,
    image: { src: "/banners/after_dark_welcome_banner.webp", alt: "After Dark Cannabis Jane Street local guide" },
    intro: [
      "Jane Street, York, Weston, Mount Dennis, Keelesdale, Eglinton West, Black Creek, and Trethewey Drive searches need local context first, then product sections.",
    ],
    sections: [
      {
        heading: "Local First, Menu Second",
        body: ["Use the store page for the local anchor, then jump into flower, pre-rolls, edibles, vapes, pouches, cigarettes, Backwoods, or grabba from the resource hub."],
      },
    ],
    commercialLinks: [
      { label: "Jane Street visit guide", href: "/resources/local-guides/jane-street-york-visit-guide" },
      { label: "Store page", href: SITE.storePage },
    ],
    related: ["/resources/menu-guide", "/resources/value-guides"],
  },
  {
    path: "/resources/local-guides/jane-street-york-visit-guide",
    kind: "article",
    parent: "/resources/local-guides",
    categoryLabel: "Visit Guide",
    title: "Jane Street and York Visit Guide",
    seoTitle: "Jane Street and York Visit Guide | After Dark Cannabis",
    metaDescription:
      "Visit guide for After Dark Cannabis at 1664 Jane St in York, with local menu links for flower, vapes, edibles, pouches, cigarettes, Backwoods, and grabba.",
    h1: "Jane Street and York Visit Guide",
    excerpt:
      "Use the local page for the address, then choose the product section that fits the trip.",
    primaryKeyword: "weed dispensary near Jane Street",
    supportingKeywords: ["After Dark Cannabis York", "Jane Street cannabis store", "1664 Jane St cannabis"],
    searchIntent: "Plan a local visit to After Dark Cannabis.",
    author: "local",
    datePublished: updated,
    dateModified: updated,
    image: { src: "/banners/after_dark_welcome_banner.webp", alt: "After Dark Cannabis local visit guide" },
    intro: [
      "After Dark Cannabis is listed at 1664 Jane St, York, ON M9N 2S1. Once the local stop is clear, the resource hub helps shoppers choose the product section: flower, pre-rolls, edibles, vapes, pouches, cigarettes, Backwoods, grabba, concentrates, or accessories.",
    ],
    sections: [
      {
        heading: "Nearby Area Terms",
        body: [
          "The local language around this store includes Jane Street, York, Weston, Mount Dennis, Keelesdale, Eglinton West, Black Creek, and Trethewey Drive.",
        ],
      },
    ],
    commercialLinks: [
      { label: "Store page", href: SITE.storePage },
      { label: "Menu guide", href: "/resources/menu-guide" },
    ],
    related: ["/resources/local-guides", "/resources/menu-guide"],
  },
];

export const RESOURCE_HOME = RESOURCE_PAGES[0];

export function normalizeResourcePath(path: string) {
  const clean = path.trim().replace(/^\/+|\/+$/g, "");
  return clean ? `/resources/${clean.replace(/^resources\/?/, "")}` : "/resources";
}

export function slugFromPath(path: string) {
  return path.replace(/^\/resources\/?/, "");
}

export function getResourcePageBySlug(slug?: string[] | string) {
  const slugPath = Array.isArray(slug) ? slug.join("/") : slug || "";
  const path = normalizeResourcePath(slugPath);
  return RESOURCE_PAGES.find((page) => page.path === path);
}

export function getStaticResourceParams() {
  return RESOURCE_PAGES.filter((page) => page.path !== "/resources").map((page) => ({
    slug: slugFromPath(page.path).split("/"),
  }));
}

export function getCategoryPages() {
  return RESOURCE_PAGES.filter((page) => page.parent === "/resources");
}

export function getChildPages(parentPath: string) {
  return RESOURCE_PAGES.filter((page) => page.parent === parentPath);
}

export function getFeaturedPages() {
  const featured = [
    "/resources/brand-guides/gas-gang-drizzle-vapes",
    "/resources/nicotine-pouches",
    "/resources/native-smokes/backwoods-grabba-guide",
    "/resources/menu-guide",
    "/resources/local-guides/jane-street-york-visit-guide",
    "/resources/value-guides",
  ];
  return featured.map((path) => RESOURCE_PAGES.find((page) => page.path === path)).filter(Boolean) as ResourcePage[];
}

export function getRelatedPages(page: ResourcePage) {
  return page.related.map((path) => RESOURCE_PAGES.find((item) => item.path === path)).filter(Boolean) as ResourcePage[];
}
