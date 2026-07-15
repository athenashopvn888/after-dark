export interface ItemEffects {
  effects: { emoji: string; label: string }[];
  description: string;
  metaDescription: string;
  consume: string;
}
export function getItemData(category: string, name: string): ItemEffects {
  const categoryLabel = category
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

  return {
    effects: [
      { emoji: "ITEM", label: categoryLabel },
      { emoji: "INFO", label: "Package Details" },
    ],
    description: `${name} appears in the ${categoryLabel} section at After Dark Cannabis. Use the item page for its listed format, package information, and menu details.`,
    metaDescription: `Browse ${name} in the ${categoryLabel} section at After Dark Cannabis in York.`,
    consume: "Product format and package information are shown on the item label.",
  };
}
