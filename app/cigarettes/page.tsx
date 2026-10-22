import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CigaretteUnavailable from "../components/CigaretteUnavailable";
import { getWebGate } from "../lib/cigaretteFeed";
import { STORE } from "../lib/storeIdentity";

export const metadata: Metadata = {
  title: { absolute: "Cigarettes | After Dark Cannabis" },
  robots: { index: false, follow: true },
  alternates: { canonical: `${STORE.baseUrl}/items/cigarettes` },
};

export const dynamic = "force-dynamic";

/** Stable /cigarettes URL. Coded mode still redirects in proxy. webOn false stays here. */
export default async function CigarettesPage() {
  const gate = await getWebGate();
  if (gate === "show") {
    const { redirect } = await import("next/navigation");
    redirect("/items/cigarettes");
  }
  return (
    <main>
      <Navbar />
      <CigaretteUnavailable />
      <Footer />
    </main>
  );
}
