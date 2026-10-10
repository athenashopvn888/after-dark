import Link from "next/link";
import styles from "./VapeActionPanel.module.css";
import { STORE, mapsDirectionsUrl } from "../lib/storeIdentity";

export default function VapeActionPanel({ compact = false }: { compact?: boolean }) {
  const message = encodeURIComponent("Hi After Dark Cannabis, please hold this nicotine vape/flavour if available: ");
  return (
    <aside className={styles.panel} aria-label="Nicotine vape contact options">
      <div>
        <strong>{compact ? "Confirm a nicotine vape before travelling" : "Need a nicotine vape held for pickup?"}</strong>
        <p>Adults 19+ with valid government photo ID. Nicotine is addictive. A hold is confirmed only when staff reply.</p>
      </div>
      <div className={styles.actions}>
        <a href={STORE.phoneTel}>Call {STORE.phoneDisplay}</a>
        <a href={mapsDirectionsUrl} target="_blank" rel="noopener noreferrer">Directions</a>
        <a href={`sms:${STORE.phoneIntl}?&body=${message}`}>Text to hold</a>
        <Link href="/vape-shop-york">Vape shop page</Link>
      </div>
    </aside>
  );
}
