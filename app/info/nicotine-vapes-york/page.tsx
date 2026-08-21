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
  const inventory = await getAdcInventory();
  const items = inventory.snapshot.items.filter((item) => item.category === "VAPE PENS");

  return (
    <>
      <Navbar />
      <SmokePilotLanding
        canonicalUrl="https://afterdarkcannabis.com/info/nicotine-vapes-york"
        storeName="After Dark Cannabis"
        locationLabel="York"
        eyebrow="Jane Street Nicotine Vape Guide"
        title="Nicotine Vapes in York"
        intro="Browse the nicotine vape lineup without mixing it into the THC vape menu. Compare the devices, formats, flavour notes and menu prices listed at After Dark Cannabis on Jane Street."
        items={items}
        menuHref="/items/vapes"
        menuLabel="Shop the nicotine vape menu"
        menuHeading="Nicotine Vape Menu Highlights"
        menuIntro="These highlights come from the nicotine vape category for After Dark Cannabis. Open the full menu to see every device currently listed."
        crossLink={{
          href: "/info/native-cigarettes-york",
          eyebrow: "Also at After Dark",
          title: "Shopping for Native cigarettes?",
          body: "Jump to the dedicated York cigarette guide for brands, pack styles and listed menu prices.",
          label: "Explore Native cigarettes",
        }}
        sections={[
          {
            heading: "Nicotine Vapes, Clearly Separated",
            body: "This guide points to the nicotine vape category at After Dark Cannabis. Shoppers looking for THC vapes can use the separate THC vape menu instead.",
          },
          {
            heading: "Compare Device Formats Faster",
            body: "Product names show the device or format details supplied on the menu. Use the cards to compare what is listed, then open an item for a closer look.",
          },
          {
            heading: "A 24-Hour Jane Street Stop",
            body: "After Dark Cannabis is at 1664 Jane St in York and lists open 24 hours, so the nicotine vape guide stays connected to the exact store shoppers will visit.",
          },
        ]}
        faqs={[
          {
            q: "Does After Dark Cannabis list nicotine vapes?",
            a: "Yes. The nicotine vape category lists devices and menu prices currently shown for the Jane Street store.",
          },
          {
            q: "Are nicotine vapes and THC vapes on the same page?",
            a: "No. This guide links to the nicotine vape category. THC vapes have a separate category on the site.",
          },
          {
            q: "Where is After Dark Cannabis?",
            a: "After Dark Cannabis is at 1664 Jane St, York, ON M9N 2S1 and lists open 24 hours.",
          },
        ]}
        address="1664 Jane St, York"
        hours="Open 24 Hours"
        theme="nicotine"
        inventoryVersion={inventory.snapshot.version}
        inventoryAsOf={inventory.snapshot.sourceTimestamp}
      />
      <Footer />
    </>
  );
}
