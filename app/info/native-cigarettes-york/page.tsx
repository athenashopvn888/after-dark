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
    console.warn("[ADC smoke pilot] verified inventory unavailable; rendering without product listings");
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
        eyebrow="Native Cigarettes · Jane Street"
        title="Native Cigarettes in York"
        intro="Shop Native cigarette brands, full, light and menthol styles, plus Backwoods, grabba and other smoke-shop essentials at After Dark Cannabis on Jane Street."
        items={items}
        menuHref="/items/cigarettes"
        menuLabel="Shop the cigarette menu"
        menuHeading="Native Cigarette Brands & Prices"
        menuIntro="Compare the cigarette brands, styles and listed prices available from After Dark Cannabis in York."
        crossLink={{
          href: "/info/nicotine-vapes-york",
          eyebrow: "Also at After Dark",
          title: "Prefer a nicotine vape?",
          body: "Shop disposable and pod-style nicotine vapes with device, flavour, puff-count and listed price details from After Dark Cannabis.",
          label: "Shop nicotine vapes",
        }}
        sections={[
          {
            heading: "Native Cigarettes on Jane Street",
            body: "After Dark Cannabis brings Native cigarettes and smoke-shop essentials together at 1664 Jane St in York, with 24-hour shopping every day of the week.",
          },
          {
            heading: "Full, Light and Menthol Styles",
            body: "Look for familiar names across Canadian, Canadian Goose, Canadian Classics, Nexus, Time and Putters, with full, light and menthol choices represented when available.",
          },
          {
            heading: "Backwoods, Grabba and Smoke-Shop Extras",
            body: "Round out the stop with Backwoods, grabba, grabba shakers and nicotine pouch options when they are part of the current selection."
          },
        ]}
        faqs={[
          {
            q: "Does After Dark Cannabis sell Native cigarettes in York?",
            a: "Yes. After Dark Cannabis carries Native cigarette brands and related smoke-shop products at 1664 Jane St in York.",
          },
          {
            q: "Can I see cigarette prices online?",
            a: "Yes. Current listed prices appear with the cigarette selection, and staff can confirm the latest shelf details when you visit.",
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
