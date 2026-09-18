import Link from "next/link";
import { STORE } from "../lib/storeIdentity";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          {/* Column 1 — Store Description */}
          <div className={styles.col}>
            <div className={styles.brand}>
              AFTER DARK
            </div>
            <p className={styles.desc}>
              Jane Street York walk-in at {STORE.streetAddress}. {STORE.name}
              for flower, edibles, vapes and more. {STORE.hoursLabel}. Call {STORE.phoneDisplay}.
            </p>
            <div className={styles.buttons}>
              <a
                href={STORE.phoneTel}
                className={styles.btnPrimary}
              >
                Call Now
              </a>
            </div>
          </div>

          {/* Column 2 — Contact Info */}
          <div className={styles.col}>
            <h3 className={styles.colTitle}>Contact Info</h3>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Address:</span>
              <span>{STORE.streetAddress}</span>
              <span>{STORE.addressLocality}, {STORE.addressRegion} {STORE.postalCode}</span>
              <span>Canada</span>
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Phone:</span>
              <span><a href={STORE.phoneTel} style={{color: "inherit"}}>{STORE.phoneDisplay}</a></span>
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Hours:</span>
              <span className={styles.highlight}>{STORE.hoursLabel}</span>
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Website:</span>
              <span><a href={STORE.homepageUrl} style={{color: "inherit"}}>{STORE.homepageUrl}</a></span>
            </div>
          </div>

          {/* Column 3 — Quick Links */}
          <div className={styles.col}>
            <h3 className={styles.colTitle}>Quick Links</h3>
            <nav className={styles.links}>
              <Link href="/">Home</Link>
              <Link href="/exotic-weed">Exotic Weed</Link>
              <Link href="/premium-weed">Premium Weed</Link>
              <Link href="/aaa-weed">AAA+ Weed</Link>
              <Link href="/aa-weed">AA Weed</Link>
              <Link href="/budget-weed">Budget Weed</Link>
              <Link href="/items/edibles">Edibles</Link>
              <Link href="/items/cigarettes">Cigarettes</Link>
              <Link href="/items/vapes">Nicotine Vape Menu</Link>
              <Link href="/items/vape-disposables">THC Vape Menu</Link>
              <Link href="/faq">FAQ</Link>
              <Link href="/visit">How to Reach Jane Street</Link>
              <Link href={STORE.hoursPath}>24-Hour / Open-Now Guide</Link>
              <Link href={STORE.corridorPath}>Jane &amp; Lawrence Corridor</Link>
              <Link href="/weed-delivery-york">WEED DELIVERY</Link>
              <Link href="/info/york-weed-dispensary">York Dispensary</Link>
              <Link href="/info/cheap-weed-york">Cheap Weed York</Link>
              <Link href="/info/native-cigarettes-york">Native Cigarettes York</Link>
              <Link href="/info/nicotine-vapes-york">Nicotine Vapes York</Link>
              <Link href="/weed-dispensary-york/">After Dark Cannabis Weed Dispensary in York</Link>
              <Link href="/contact">Contact Us</Link>
                          <Link href="/resources">Resources</Link>
            </nav>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>
            © {new Date().getFullYear()} After Dark Cannabis. Must be 19+ to
            enter. Adults 19+ only.
          </p>
        </div>
      </div>
    </footer>
  );
}
