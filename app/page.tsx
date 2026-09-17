import HomePageClient from "./HomePageClient";
import { faqPageJsonLd, HOME_FAQS, serializeJsonLd } from "./lib/storeIdentity";

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqPageJsonLd(HOME_FAQS)) }}
      />
      <HomePageClient />
    </>
  );
}
