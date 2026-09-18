import { STORE, mapsDirectionsUrl, mapsEmbedUrl } from "./storeIdentity";

// Google Business Profile Local SEO Location Configuration — NAP locked to STORE.
export const gbpLocation = {
  storeName: STORE.name,
  domain: STORE.domain,
  city: STORE.addressLocality,
  province: STORE.addressRegion,
  country: STORE.addressCountry,
  slug: "weed-dispensary-york",
  address: STORE.addressLine,
  streetAddress: STORE.streetAddress,
  postalCode: STORE.postalCode,
  phone: STORE.phoneDisplay,
  phoneIntl: STORE.phoneIntl,
  neighborhood: "Jane Street / York",
  nearbyAreas: ["Jane Street", "Weston", "Mount Dennis", "Keelesdale", "Eglinton West", "York", "Black Creek", "Trethewey Drive"],
  products: [
    "Flower",
    "Pre-rolls",
    "Edibles",
    "THC vapes",
    "Concentrates",
    "Shatter",
    "CBD oils",
    "Accessories"
  ],
  menuUrl: "/",
  websiteUrl: STORE.homepageUrl,
  directionsUrl: mapsDirectionsUrl,
  mapEmbedUrl: mapsEmbedUrl,
  latitude: String(STORE.latitude),
  longitude: String(STORE.longitude),
  hours: [STORE.hoursLabel],
  seoTitle: "24-Hour Jane Street York Weed Dispensary | After Dark Cannabis",
  metaDescription: "24-hour York dispensary at 1664 Jane Street. Walk in anytime — flower from $3/g, vapes, edibles. Call +1 (437) 524-9344. Adults 19+.",
  localLandmarks: ["Jane Street", "Weston", "Mount Dennis"],
  introVariant: "After Dark Cannabis is open 24 hours at 1664 Jane Street in York. Adults 19+ can browse flower tiers, pre-rolls, edibles, THC vapes, concentrates, CBD products, and other menu categories. Use the homepage for visit information and the menu for current item details.",
  neighborhoodDescription: "Located in the Jane Street / York district, this walk-in cannabis store sits on the Jane corridor with local retail and TTC links.",
  parkingNote: "Convenient street parking is available along Jane Street and surrounding side streets",
  transitNote: "Accessible by local TTC routes around Jane Street and nearby York neighborhoods.",
  sectionTitle: "Serving Customers Near Jane Street and York"
};
