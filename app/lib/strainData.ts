interface StrainDetails {
  effects: { emoji: string; label: string }[];
  description: string;
  metaDescription: string;
}

export function getStrainData(
  name: string,
  type: "indica" | "sativa" | "hybrid",
  tier: string,
  _thc: string
): StrainDetails {
  void _thc;
  const typeLabel =
    type === "indica" ? "Indica" : type === "sativa" ? "Sativa" : "Hybrid";
  const tierLabel = tier || "Flower";

  return {
    effects: [
      { emoji: "TYPE", label: typeLabel },
      { emoji: "TIER", label: tierLabel },
    ],
    description: `${name} appears in the ${tierLabel} flower section at After Dark Cannabis. Use this page to review its listed type, weights, prices, and menu details before visiting 1664 Jane St in York.`,
    metaDescription: `Browse ${name} in the ${tierLabel} flower section at After Dark Cannabis in York. Check the current menu for listed details.`,
  };
}
