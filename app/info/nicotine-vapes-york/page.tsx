import type { Metadata } from "next";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { SmokePilotLanding } from "../../components/SmokePilot";
import { getAdcInventory } from "../../lib/adcInventoryService";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: "Nicotine Vapes York | After Dark Cannabis" },
  description:
    "Browse nicotine vape devices, flavours, formats, and listed menu prices at After Dark Cannabis, 1664 Jane St in York. Open 24 hours.",
  alternates: { canonical: "https://afterdarkcannabis.com/info/nicotine-vapes-york" },
};

export default async function NicotineVapesYorkPage() {
  const inventory = await getAdcInventory().catch(() => {
    console.warn("[ADC smoke pilot] verified inventory unavailable; rendering without product listings");
    return null;
  });
  const items = inventory?.snapshot.items.filter((item) => item.category === "VAPE PENS") ?? [];

  return (
    <>
      <Navbar />
      <SmokePilotLanding
        canonicalUrl="https://afterdarkcannabis.com/info/nicotine-vapes-york"
        storeName="After Dark Cannabis"
        locationLabel="York"
        eyebrow="Nicotine Vapes · Jane Street"
        title="Nicotine Vapes in York"
        intro="Shop nicotine vape devices from names such as Geek, NEXA, OVNS, STLTH, Uwell and Vice at After Dark Cannabis on Jane Street. Compare formats, flavours, puff counts and listed prices."
        items={items}
        menuHref="/items/vapes"
        menuLabel="Shop the nicotine vape menu"
        menuHeading="Nicotine Vape Devices & Prices"
        menuIntro="Compare disposable and pod-style nicotine vape options listed by After Dark Cannabis in York."
        crossLink={{
          href: "/info/native-cigarettes-york",
          eyebrow: "Also at After Dark",
          title: "Need Native cigarettes instead?",
          body: "Shop full, light and menthol cigarette styles alongside Backwoods, grabba and other smoke-shop essentials at After Dark Cannabis.",
          label: "Shop Native cigarettes",
        }}
        sections={[
          {
            heading: "Nicotine Vapes on Jane Street",
            body: "After Dark Cannabis carries nicotine vape options at 1664 Jane St in York, with a changing mix of disposable devices, pods and listed flavour choices.",
          },
          {
            heading: "Disposable, Pod and Device Options",
            body: "Compare disposable puff counts, pod formats, device types and flavour details from brands listed in the current selection.",
          },
          {
            heading: "Open 24 Hours in York",
            body: "Visit After Dark Cannabis at 1664 Jane St any time of day or night for nicotine vapes, cigarettes and other smoke-shop essentials.",
          },
        ]}
        faqs={[
          {
            q: "Does After Dark Cannabis sell nicotine vapes?",
            a: "Yes. After Dark Cannabis carries nicotine vape devices with formats, flavours, puff counts and listed prices for the Jane Street store.",
          },
          {
            q: "Are nicotine vapes different from THC vapes?",
            a: "Yes. Nicotine devices and THC vapes are different product groups at After Dark Cannabis, with separate selections for each.",
          },
          {
            q: "Where is After Dark Cannabis?",
            a: "After Dark Cannabis is at 1664 Jane St, York, ON M9N 2S1 and lists open 24 hours.",
          },
        ]}
        address="1664 Jane St, York"
        hours="Open 24 Hours"
        theme="nicotine"
        inventoryVersion={inventory?.snapshot.version}
        inventoryAsOf={inventory?.snapshot.sourceTimestamp}
      />
      <Footer />
    </>
  );
}
