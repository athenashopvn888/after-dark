import Link from "next/link";
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
              Your Local Cannabis Dispensary At 1664 Jane St, York. Visit
              After Dark Cannabis For Premium Flower, Edibles, Vapes &amp; More.
              Open 24 Hours.
            </p>
            <div className={styles.buttons}>
              <a
                href="tel:+14375249344"
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
              <span>1664 Jane St</span>
              <span>York, ON M9N 2S1</span>
              <span>Canada</span>
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Phone:</span>
              <span><a href="tel:+14375249344" style={{color: "inherit"}}>+1 (437) 524-9344</a></span>
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Hours:</span>
              <span className={styles.highlight}>Open 24 Hours</span>
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
              <Link href="/delivery">DELIVERY MENU</Link>
              <Link href="/info/york-weed-dispensary">York Dispensary</Link>
              <Link href="/info/cheap-weed-york">Cheap Weed York</Link>
              <Link href="/info/native-cigarettes-york">Native Cigarettes York</Link>
              <Link href="/info/nicotine-vapes-york">Nicotine Vapes York</Link>
              <Link href="/info/weed-store-near-mississauga">Weed Store Near Mississauga</Link>
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
