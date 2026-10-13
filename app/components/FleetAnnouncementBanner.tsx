import Link from "next/link";

const STORE_NAME = "After Dark Cannabis";
const THEME = { accent: "#a855f7", background: "#090512" };
const promos = [
  { key: "weed", href: "/exotic-weed", image: "/banners/core-top-weed.webp", alt: `${STORE_NAME} Exotic, Premium and AAA+ flower tiers`, caption: "Exotic, Premium and AAA+ flower" },
  { key: "vapes", href: "/items/vapes", image: "/banners/core-vapes-nicotine-thc.webp", alt: `${STORE_NAME} nicotine and THC vape categories`, caption: "Nicotine vapes + THC vapes" },
  { key: "cigarettes", href: "/items/cigarettes", image: "/banners/core-cigarette-mix-match.webp", alt: `${STORE_NAME} 2 packs for $5 mix and match and $25 carton cigarette offer`, caption: "2 packs $5 mix & match · $25 carton" },
  { key: "premium-cigarettes", href: "/items/cigarettes", image: "/banners/core-premium-cigarettes.webp", alt: `${STORE_NAME} BB Full Flavor and Lights, Marlboro and Belmont cigarettes`, caption: "BB Full Flavor + Lights · Marlboro & Belmont $10/pack" },
] as const;

const figureStyle = { margin: 0, width: "100%" } as const;
const imageStyle = { display: "block", width: "100%", maxWidth: "100%", height: "auto" } as const;

export default function FleetAnnouncementBanner() {
  return (
    <aside data-fleet-homepage-announcement="" aria-label="Store promotions" style={{ display: "flex", flexDirection: "column", width: "100%", maxWidth: "100%", height: "auto", minHeight: 0, overflow: "visible", position: "relative", zIndex: 50 }}>
      {promos.map((promo) => (
        <figure key={promo.key} data-core-banner={promo.key} style={{ ...figureStyle, boxShadow: `inset 0 0 0 2px ${THEME.accent}` }}>
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
        </figure>
      ))}
    </aside>
  );
}
