import Link from "next/link";
import styles from "./WeedDiscoveryModule.module.css";

export function WeedDiscoveryModule() {
  return (
    <section className={styles.section} aria-labelledby="weed-discovery-title">
      <div className={styles.inner}>
        <p className={styles.kicker}>Open 24 Hours · Adults 19+</p>
        <h2 id="weed-discovery-title">Weed in York at After Dark Cannabis</h2>
        <p>After Dark Cannabis is open 24 hours at <strong>1664 Jane Street</strong>. Adults 19+ looking specifically for Weed in York can explore flower tiers, cannabis formats and store information.</p>
        <div className={styles.actions}>
          <Link href="/weed-dispensary-york/" className={styles.primary}>Explore Weed in York</Link>
          <Link href="/resources/flower-guides" className={styles.secondary}>Explore the Flower Guides</Link>
        </div>
      </div>
    </section>
  );
}
