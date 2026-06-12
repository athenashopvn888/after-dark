import type { Metadata } from "next";
import GamesContent from "./GamesContent";

export const metadata: Metadata = {
  title: "Cannabis Arcade Games — After Dark Cannabis | York",
  description: "Play free online cannabis-themed games like Flappy Bud and Snake Munchies while you wait at After Dark Cannabis.",
  alternates: {
    canonical: "https://afterdarkcannabis.com/games",
  },
};

export default function GamesPage() {
  return <GamesContent />;
}
