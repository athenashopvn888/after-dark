import type { Metadata } from "next";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { SmokePilotLanding } from "../../components/SmokePilot";
import { NICOTINE_VAPES_YORK_CARDS } from "../../lib/nicotineVapesYork";

export const metadata: Metadata = {
  title: { absolute: "Nicotine Vapes York | After Dark Cannabis" },
  description:
    "Adults 19+: review four live-checked nicotine vape product pages from After Dark Cannabis in York, then use /items/vapes for current category information. Nicotine is addictive.",
  alternates: { canonical: "https://afterdarkcannabis.com/info/nicotine-vapes-york" },
};

export default async function NicotineVapesYorkPage() {
  return (
    <>
      <Navbar />
      <SmokePilotLanding
        canonicalUrl="https://afterdarkcannabis.com/info/nicotine-vapes-york"
        storeName="After Dark Cannabis"
        locationLabel="York"
        eyebrow="AFTER DARK CANNABIS • JANE STREET • YORK • ADULTS 19+"
        title="Nicotine Vapes in York"
        intro="This After Dark Cannabis guide highlights four live-checked product pages from the VAPE PENS category. The cards are a limited evidence set, not a complete selection. Use /items/vapes for current category information. Nicotine is addictive."
        items={[]}
        menuHref="/items/vapes"
        menuLabel="Browse Nicotine Vapes"
        menuHeading="Four Live-Checked Product Pages"
        menuIntro="Use the four cards for their supported names and images, then use /items/vapes for current category information."
        secondaryHref="/items/vapes"
        secondaryLabel="Review the Nicotine Category"
        heroItems={NICOTINE_VAPES_YORK_CARDS}
        heroDisclosure="Four live-checked product pages are shown. They are not a complete statement of the current nicotine category."
        warning="Adults 19+. Nicotine is addictive."
        showMenuSection={false}
        crossLink={{
          href: "/info/native-cigarettes-york",
          eyebrow: "Related After Dark Guide",
          title: "Looking for the Native cigarette guide?",
          body: "Open the dedicated After Dark Cannabis cigarette page for its separate adult-only category guide.",
          label: "Read the Native cigarette guide",
        }}
        sections={[
          {
            heading: "Four Live-Checked Product Pages",
            body: "Each featured card uses the supported name and image from its own live VAPE PENS product page. This four-card set is deliberately limited and does not claim to show every nicotine listing.",
          },
          {
            heading: "Keep Each Format Attached to Its Product",
            body: "The Uwell page identifies a pod, while one OVNS page identifies a disposable. Puff counts and format words distinguish the named pages; they are not promises of lifespan, performance or superiority.",
          },
          {
            heading: "Keep Nicotine and THC Vape Routes Separate",
            body: "This guide uses the nicotine VAPE PENS route at /items/vapes. THC and cannabis vape products under /items/vape-disposables are excluded from this page.",
          },
        ]}
        faqs={[
          {
            q: "Where should I check After Dark Cannabis’s current nicotine category?",
            a: "Use /items/vapes. The four featured cards are live-checked product pages, not a complete category listing.",
          },
          {
            q: "Does this page include every nicotine vape listing?",
            a: "No. It shows four product pages that passed the page-and-image audit. Use /items/vapes for current category information.",
          },
          {
            q: "Does this page include THC or cannabis vapes?",
            a: "No. Products under /items/vape-disposables are excluded from this nicotine guide.",
          },
        ]}
        address="1664 Jane St, York"
        hours="Open 24 Hours"
        theme="nicotine"
      />
      <Footer />
    </>
  );
}
