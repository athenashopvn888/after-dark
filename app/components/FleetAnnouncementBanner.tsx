"use client";

import { Fragment } from "react";
import Link from "next/link";
import { bannersMatchCoded } from "../lib/fleet/coded";
import CigaretteSeasonalNotice from "./CigaretteSeasonalNotice";
import { useCigaretteState } from "./CigaretteStateProvider";
import FleetSheetBanners from "./FleetSheetBanners";
import { useFleetContent } from "./FleetContentProvider";

const STORE_NAME = "After Dark Cannabis";
const THEME = { accent: "#a855f7", background: "#090512" };
const promos = [
  { key: "weed", href: "/exotic-weed", image: "/banners/core-top-weed.webp", alt: `${STORE_NAME} Exotic, Premium and AAA+ flower tiers`, caption: "Top 3 tiers only (Exotic, Premium, AAA+): Buy 2g Get 1g FREE · Buy 3g Get 3g FREE (6g)" },
  { key: "vapes", href: "/items/vapes", image: "/banners/core-vapes-nicotine-thc.webp", alt: `${STORE_NAME} nicotine and THC vape categories`, caption: "Nicotine + THC vapes" },
  { key: "cigarettes", href: "/items/cigarettes", image: "/banners/core-cigarette-mix-match.webp", alt: `${STORE_NAME} 2 packs for $5 mix and match and $25 carton cigarette offer`, caption: "2 PACKS $5 / $25 CARTON" },
  { key: "premium-cigarettes", href: "/items/cigarettes", image: "/banners/core-premium-cigarettes.webp", alt: `${STORE_NAME} BB Full Flavor and Lights, Marlboro and Belmont cigarettes`, caption: "BB Full Flavor + Lights 2 packs $5 · Marlboro & Belmont $10/pack" },
] as const;

const STORE_ORIGIN = "https://afterdarkcannabis.com";

const figureStyle = { margin: 0, width: "100%" } as const;
const imageStyle = { display: "block", width: "100%", maxWidth: "100%", height: "auto" } as const;
const captionStyle = { margin: 0, padding: "10px 14px", background: "#111827", color: "#ffffff", textAlign: "center" as const, fontWeight: 800, lineHeight: 1.35 };

export default function FleetAnnouncementBanner() {
  const fleet = useFleetContent();
  const showCigarettes = useCigaretteState().web;
  if (fleet.active && fleet.banners.length > 0 && !bannersMatchCoded(fleet.banners)) {
    return <FleetSheetBanners banners={fleet.banners} />;
  }
  const visiblePromos = showCigarettes ? promos : promos.filter((promo) => promo.key !== "cigarettes" && promo.key !== "premium-cigarettes");
  const bannerImageObjects = visiblePromos.map((promo) => ({ "@type": "ImageObject", name: promo.alt, contentUrl: `${STORE_ORIGIN}${promo.image}`, description: `${promo.alt} at ${STORE_NAME}.`, caption: promo.caption }));
  return (
    <aside data-fleet-homepage-announcement="" aria-label="Store promotions" style={{ display: "flex", flexDirection: "column", width: "100%", maxWidth: "100%", height: "auto", minHeight: 0, overflow: "visible", position: "relative", zIndex: 50 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": bannerImageObjects }).replace(/</g, "\\u003c") }} />
      {visiblePromos.map((promo) => (
        <Fragment key={promo.key}>
        {promo.key === "cigarettes" && <CigaretteSeasonalNotice />}
        <figure data-core-banner={promo.key} style={{ ...figureStyle, boxShadow: `inset 0 0 0 2px ${THEME.accent}` }}>
          <Link href={promo.href} aria-label={promo.alt} style={{ display: "block", width: "100%", background: THEME.background }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={promo.image}
              alt={promo.alt}
              title={promo.caption}
              width={promo.key === "cigarettes" ? 2048 : 1672}
              height={promo.key === "cigarettes" ? 768 : 941}
              style={imageStyle}
              loading="eager"
            />
          </Link>
          <figcaption style={{ ...captionStyle, borderBottom: `3px solid ${THEME.accent}` }}>{promo.caption}</figcaption>
        </figure>
        </Fragment>
      ))}
    </aside>
  );
}
