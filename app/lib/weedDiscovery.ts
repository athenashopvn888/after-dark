export type WeedDiscoveryLink = { label: string; description: string; href: string };

export const afterDarkWeedOwner = {
  storeName: "After Dark Cannabis",
  city: "York",
  address: "1664 Jane Street, York, ON M9N 2S1",
  streetAddress: "1664 Jane Street",
  province: "ON",
  postalCode: "M9N 2S1",
  phoneDisplay: "+1 (437) 524-9344",
  phoneIntl: "+14375249344",
  ownerPath: "/weed-dispensary-york/",
  flowerTiers: [
    { label: "Budget Weed", description: "Explore the Budget weed and flower tier.", href: "/budget-weed" },
    { label: "AA Weed", description: "Explore the AA weed and flower tier.", href: "/aa-weed" },
    { label: "AAA+ Weed", description: "Explore the AAA+ weed and flower tier.", href: "/aaa-weed" },
    { label: "Premium Weed", description: "Explore the Premium weed and flower tier.", href: "/premium-weed" },
    { label: "Exotic Weed", description: "Explore the Exotic weed and flower tier.", href: "/exotic-weed" },
  ] satisfies WeedDiscoveryLink[],
  categories: [
    { label: "Pre-Rolls", description: "Explore cannabis in pre-roll format.", href: "/items/prerolls" },
    { label: "Edibles", description: "Explore cannabis edibles.", href: "/items/edibles" },
    { label: "Vapes", description: "Explore the vape category.", href: "/items/vapes" },
    { label: "Concentrates", description: "Explore cannabis concentrates.", href: "/items/concentrates" },
    { label: "Accessories", description: "Explore cannabis accessories.", href: "/items/add-ons" },
  ] satisfies WeedDiscoveryLink[],
  guides: [
    { label: "Cannabis 101", description: "Start with broader cannabis information before choosing a format.", href: "/resources/cannabis-101" },
    { label: "Menu Guide", description: "Compare the main cannabis formats.", href: "/resources/menu-guide" },
    { label: "Flower Guides", description: "Learn more about flower before choosing a tier.", href: "/resources/flower-guides" },
    { label: "Pre-Roll Guides", description: "Focus specifically on pre-rolls.", href: "/resources/pre-roll-guides" },
    { label: "Edibles Guides", description: "Explore format-specific edibles information.", href: "/resources/edibles-guides" },
    { label: "Concentrates Guides", description: "Explore format-specific concentrates information.", href: "/resources/concentrates-guides" },
    { label: "Value Guides", description: "Read value-oriented context without relying on a current promotion.", href: "/resources/value-guides" },
    { label: "Jane Street York Visit Guide", description: "Find additional store-specific visit information.", href: "/resources/local-guides/jane-street-york-visit-guide" },
  ] satisfies WeedDiscoveryLink[],
};
