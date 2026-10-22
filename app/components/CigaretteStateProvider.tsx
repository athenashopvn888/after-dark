"use client";

import { createContext, useContext } from "react";
import { CIG_WORDING_FALLBACK, type CigaretteWording } from "../lib/cigDecision";
import { SHOW_CIGARETTES } from "../lib/siteConfig";

export type PublicCigaretteState = {
  web: boolean;
  tv: boolean;
  wording: CigaretteWording;
};

const CODED: PublicCigaretteState = {
  web: SHOW_CIGARETTES,
  tv: SHOW_CIGARETTES,
  wording: CIG_WORDING_FALLBACK,
};

const CigaretteStateContext = createContext<PublicCigaretteState>(CODED);

export default function CigaretteStateProvider({
  value,
  children,
}: {
  value: PublicCigaretteState;
  children: React.ReactNode;
}) {
  return <CigaretteStateContext.Provider value={value}>{children}</CigaretteStateContext.Provider>;
}

export function useCigaretteState(): PublicCigaretteState {
  return useContext(CigaretteStateContext);
}
