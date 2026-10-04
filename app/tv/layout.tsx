import type { Metadata } from "next";
import TvReviewQr from "../TvReviewQr";

export const metadata: Metadata = {
  title: "After Dark Cannabis In-Store Flower Display",
  description: "Operational in-store flower menu display for After Dark Cannabis.",
  robots: { index: false, follow: false },
};

export default function TvLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children}
      <TvReviewQr storeName="After Dark Cannabis" />
    </>
  );
}
