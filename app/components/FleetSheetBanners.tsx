"use client";

import Link from "next/link";
import { useState } from "react";
import { codedBannerFor, nextBannerPhase, type BannerImagePhase } from "../lib/fleet/coded";
import type { ResolvedBanner } from "../lib/fleet/types";
import { useCigaretteState } from "./CigaretteStateProvider";
import CigaretteSeasonalNotice from "./CigaretteSeasonalNotice";

const THEME = { accent: "#a855f7", background: "#090512" };
const figureStyle = { margin: 0, width: "100%" } as const;
const imageStyle = { display: "block", width: "100%", maxWidth: "100%", height: "auto" } as const;
const captionStyle = { margin: 0, padding: "10px 14px", background: "#111827", color: "#ffffff", textAlign: "center" as const, fontWeight: 800, lineHeight: 1.35 };

function BannerFigure({ banner }: { banner: ResolvedBanner }) {
  const coded = codedBannerFor(banner.id);
  const width = banner.imageWidth || coded?.imageWidth;
  const height = banner.imageHeight || coded?.imageHeight;
  const [phase, setPhase] = useState<BannerImagePhase>(banner.render === "text" || !banner.image ? "category" : "sheet");
  const src = phase === "sheet" ? banner.image : phase === "coded" ? coded?.image || "" : "";
  const showText = phase === "category" || !src;
  const label = banner.categoryName || coded?.title || banner.title;
  const box = width && height ? { width, height, aspectRatio: `${width} / ${height}` } : { minHeight: height || 180 };
  return (
    <>
      {banner.id === "cigarettes" ? <CigaretteSeasonalNotice /> : null}
      <figure data-core-banner={banner.id} style={{ ...figureStyle, boxShadow: `inset 0 0 0 2px ${THEME.accent}` }}>
        <Link href={banner.href} aria-label={banner.alt} style={{ display: "block", width: "100%", background: THEME.background }}>
          {showText ? (
            <span
              data-fleet-text-banner=""
              role="img"
              aria-label={banner.alt}
              title={banner.title}
              style={{
                ...imageStyle,
                ...box,
                minHeight: height || 180,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxSizing: "border-box",
                padding: "24px",
                background: THEME.background,
                color: "#ffffff",
                fontWeight: 800,
                fontSize: "clamp(28px, 4vw, 48px)",
                lineHeight: 1.15,
                textAlign: "center",
              }}
            >
              {label}
            </span>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt={banner.alt}
              title={banner.title}
              width={width}
              height={height}
              style={imageStyle}
              onError={() => setPhase((current) => nextBannerPhase(current, banner.image, coded?.image))}
            />
          )}
        </Link>
        <figcaption style={{ ...captionStyle, borderBottom: `3px solid ${THEME.accent}` }}>{banner.textBar}</figcaption>
      </figure>
    </>
  );
}

/** Sheet banners. A broken image swaps to the coded image once, then the category name. */
export default function FleetSheetBanners({ banners }: { banners: ResolvedBanner[] }) {
  const cigarettes = useCigaretteState();
  const visible = banners.filter((banner) => !banner.hidden && (cigarettes.web || (banner.id !== "cigarettes" && banner.id !== "premium-cigarettes")));
  return (
    <aside data-fleet-homepage-announcement="" aria-label="Store promotions" style={{ display: "flex", flexDirection: "column", width: "100%", maxWidth: "100%", height: "auto", minHeight: 0, overflow: "visible", position: "relative", zIndex: 50 }}>
      {visible.map((banner) => <BannerFigure key={banner.id} banner={banner} />)}
    </aside>
  );
}
