import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import VapeActionPanel from "../components/VapeActionPanel";
import styles from "../visit/visit.module.css";
import { getAdcInventory } from "../lib/adcInventoryService";
import { STORE } from "../lib/storeIdentity";

const PATH = "/vape-shop-york";
const FAQS = [
  { q: "Does After Dark Cannabis list nicotine vapes?", a: "Yes. Current nicotine devices appear in the live VAPE PENS feed. Adults 19+. Nicotine is addictive." },
  { q: "Are nicotine vapes separate from THC vapes?", a: "Yes. Nicotine devices are under /items/vapes. THC and cannabis vape products are under /items/vape-disposables." },
  { q: "Can staff hold a flavour for pickup?", a: "You can call or send a manual text. A hold is confirmed only when staff reply." },
] as const;

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: { absolute: "Vape Shop in York | After Dark Cannabis" },
  description: "Current nicotine vape listings and prices at After Dark Cannabis, 1664 Jane Street in York. Call, get directions, or text staff to request a hold. Adults 19+. Nicotine is addictive.",
  alternates: { canonical: `${STORE.baseUrl}${PATH}` },
};

function priceValue(value: string) { return value.match(/[0-9]+(?:\.[0-9]{1,2})?/)?.[0]; }
function puffCount(name: string) { const match = name.match(/(\d+(?:\.\d+)?)\s*K\b/i); return match ? Math.round(Number(match[1]) * 1000) : null; }

export default async function VapeShopYorkPage() {
  const inventory = await getAdcInventory();
  const vapes = inventory.snapshot.items.filter((item) => item.category.trim().toUpperCase() === "VAPE PENS");
  const puffVapes = vapes.map((item) => ({ item, count: puffCount(item.name) })).filter((entry) => entry.count !== null).sort((a,b) => a.count! - b.count!);
  const shelf = puffVapes.length >= 3 ? [puffVapes[0], puffVapes[Math.floor((puffVapes.length - 1) / 2)], puffVapes[puffVapes.length - 1]] : [];
  const graph = { "@context": "https://schema.org", "@graph": [
    { "@type": "WebPage", "@id": `${STORE.baseUrl}${PATH}#webpage`, url: `${STORE.baseUrl}${PATH}`, name: "Vape Shop in York", about: { "@id": `${STORE.baseUrl}/#store` } },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: STORE.baseUrl }, { "@type": "ListItem", position: 2, name: "Vape Shop in York", item: `${STORE.baseUrl}${PATH}` }] },
    { "@type": "ItemList", name: "Current nicotine vape listings", numberOfItems: vapes.length, itemListElement: vapes.map((item, index) => ({ "@type": "ListItem", position: index + 1, item: { "@type": "Product", name: item.name, sku: item.sku, url: `${STORE.baseUrl}/item/${item.slug}`, offers: priceValue(item.price) ? { "@type": "Offer", priceCurrency: "CAD", price: priceValue(item.price), availability: "https://schema.org/InStock", url: `${STORE.baseUrl}/item/${item.slug}` } : undefined } })) },
    { "@type": "FAQPage", mainEntity: FAQS.map((faq) => ({ "@type": "Question", name: faq.q, acceptedAnswer: { "@type": "Answer", text: faq.a } })) },
  ] };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }} /><Navbar /><main className={styles.main}>
    <section className={styles.hero}><p className={styles.eyebrow}>Adults 19+ · Nicotine is addictive</p><h1>Vape Shop in York on Jane Street</h1><p className={styles.lede}>{STORE.addressLine} · {STORE.intersection}</p><VapeActionPanel /></section>
    <section><h2>Current nicotine vape listings</h2><p>These names and prices come from the store&apos;s current live feed. A listed item can sell before staff confirm a hold.</p><ul>{vapes.map((item) => <li key={`${item.sku}-${item.name}`}><Link href={`/item/${item.slug}`}>{item.name}</Link> · {item.price || "Ask staff for the current price"}</li>)}</ul></section>
    {shelf.length === 3 && <section><h2>Good, better, best by stated puff count</h2><p>This row sorts only the puff counts stated in product names. It is not a quality, lifespan, or performance claim.</p>{shelf.map((entry, index) => <article key={`${entry.item.sku}-${index}`}><h3>{["Good", "Better", "Best"][index]} · {entry.count!.toLocaleString()} puffs</h3><p>{entry.item.name} · {entry.item.price}</p></article>)}</section>}
    <section><h2>Nicotine and THC are separate menus</h2><p>Nicotine vapes are listed on <Link href="/items/vapes">the nicotine vape menu</Link>. THC and cannabis vape products are listed separately on <Link href="/items/vape-disposables">the THC vape menu</Link>.</p></section>
    <section><h2>Visit the York counter</h2><p><strong>{STORE.name}</strong><br />{STORE.addressLine}<br />{STORE.hoursNote}<br />{STORE.phoneDisplay}</p><p>The 35 Jane bus serves the Jane Street corridor near Lawrence Avenue West. Read posted signs for street parking. Bring valid government photo ID. Adults 19+.</p></section>
    <section><h2>Vape shop FAQ</h2>{FAQS.map((faq) => <article key={faq.q}><h3>{faq.q}</h3><p>{faq.a}</p></article>)}</section>
  </main><Footer /></>;
}
