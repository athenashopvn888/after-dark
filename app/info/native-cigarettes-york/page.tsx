import type { Metadata } from "next";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { SmokePilotLanding } from "../../components/SmokePilot";
import { getAdcInventory } from "../../lib/adcInventoryService";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: "Native Cigarettes York | After Dark Cannabis" },
  description:
    "Explore Native cigarette brands, pack styles, and listed menu prices at After Dark Cannabis, 1664 Jane St in York. Open 24 hours.",
  alternates: { canonical: "https://afterdarkcannabis.com/info/native-cigarettes-york" },
};

export default async function NativeCigarettesYorkPage() {
  const inventory = await getAdcInventory().catch(() => {
    console.warn("[ADC smoke pilot] verified inventory unavailable; rendering without product cards");
    return null;
  });
  const items = inventory?.snapshot.items.filter((item) => item.category === "CIGARETTES") ?? [];

  return (
    <>
      <Navbar />
      <SmokePilotLanding
        canonicalUrl="https://afterdarkcannabis.com/info/native-cigarettes-york"
        storeName="After Dark Cannabis"
        locationLabel="York"
        eyebrow="Jane Street Cigarette Guide"
        title="Native Cigarettes in York"
        intro="Put the cigarette menu first. Browse Native cigarette brands, full, lights and menthol styles, plus the pack prices currently listed at After Dark Cannabis on Jane Street."
        items={items}
        menuHref="/items/cigarettes"
        menuLabel="Shop the cigarette menu"
        menuHeading="Cigarette Menu Highlights"
        menuIntro="See the cigarette-category products currently listed for After Dark Cannabis, then open the full menu for the complete lineup."
        crossLink={{
          href: "/info/nicotine-vapes-york",
          eyebrow: "Also at After Dark",
          title: "Looking for nicotine vapes?",
          body: "Nicotine vapes have their own York guide, with a direct path to devices, flavours and listed menu prices.",
          label: "Explore nicotine vapes",
        }}
        sections={[
          {
            heading: "A Dedicated Cigarette Stop on Jane Street",
            body: "After Dark Cannabis is at 1664 Jane St in York. This guide keeps cigarette shoppers out of the larger cannabis menu and puts the cigarette lineup one tap away.",
          },
          {
            heading: "Start With Brand and Style",
            body: "Use the product cards to compare the brand and style names shown on the menu. Full, lights, menthol and other options appear when they are part of the current listing.",
          },
          {
            heading: "See Packs, Prices and Smoke-Shop Extras",
            body: "The full cigarette category carries the clearest listed price for each item and may also include pouches, grabba or Backwoods products that sit in the same smoke-shop section.",
          },
        ]}
        faqs={[
          {
            q: "Does After Dark Cannabis sell Native cigarettes in York?",
            a: "After Dark Cannabis has a dedicated cigarette category. This page highlights the cigarette products currently listed for the Jane Street store.",
          },
          {
            q: "Can I see cigarette prices online?",
            a: "Yes. Product cards show a menu price when one is listed. Open the full cigarette menu for the complete current lineup.",
          },
          {
            q: "Where is After Dark Cannabis?",
            a: "After Dark Cannabis is at 1664 Jane St, York, ON M9N 2S1 and lists open 24 hours.",
          },
        ]}
        address="1664 Jane St, York"
        hours="Open 24 Hours"
        theme="cigarettes"
        inventoryVersion={inventory?.snapshot.version}
        inventoryAsOf={inventory?.snapshot.sourceTimestamp}
      />
      <Footer />
    </>
  );
}
