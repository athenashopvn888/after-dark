"use client";

import Link from "next/link";
import { sheetNap } from "../lib/fleet/coded";
import { useCigaretteState } from "./CigaretteStateProvider";
import { useFleetContent } from "./FleetContentProvider";
import { STORE } from "../lib/storeIdentity";
import styles from "./Footer.module.css";

export default function Footer() {
  const nap = sheetNap(useFleetContent());
  const showCigarettes = useCigaretteState().web;
  const street = nap?.street ?? STORE.streetAddress;
  const locality = nap?.city ?? STORE.addressLocality;
  const region = nap?.province ?? STORE.addressRegion;
  const postal = nap?.postalCode ?? STORE.postalCode;
  const phoneDisplay = nap?.phoneDisplay ?? STORE.phoneDisplay;
  const phoneTel = nap?.phoneTel ?? STORE.phoneTel;
  const hoursLabel = nap?.hours ?? STORE.hoursLabel;
  const name = nap?.name ?? STORE.name;
  const website = nap?.website ?? STORE.homepageUrl;
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
              Jane Street York walk-in at {street}. {name}
              for flower, edibles, vapes and more. {hoursLabel}. Call {phoneDisplay}.
            </p>
            <div className={styles.buttons}>
              <a
                href={phoneTel}
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
              <span>{street}</span>
              <span>{locality}, {region} {postal}</span>
              <span>Canada</span>
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Phone:</span>
              <span><a href={phoneTel} style={{color: "inherit"}}>{phoneDisplay}</a></span>
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Hours:</span>
              <span className={styles.highlight}>{hoursLabel}</span>
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Website:</span>
              <span><a href={website} style={{color: "inherit"}}>{website}</a></span>
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
              {showCigarettes && <Link href="/items/cigarettes">Cigarettes</Link>}
              <Link href="/items/vapes">Nicotine Vape Menu</Link>
              <Link href="/items/vape-disposables">THC Vape Menu</Link>
              <Link href="/faq">FAQ</Link>
              <Link href="/hours">Store Hours</Link>
              <Link href="/visit">How to Reach Jane Street</Link>
              <Link href={STORE.hoursPath}>24-Hour / Open-Now Guide</Link>
              <Link href={STORE.corridorPath}>Jane &amp; Lawrence Corridor</Link>
              <Link href="/weed-delivery-york">WEED DELIVERY</Link>
              <Link href="/cannabis-delivery-york">Cannabis Delivery York</Link>
              <Link href="/info/york-weed-dispensary">York Dispensary</Link>
              <Link href="/info/cheap-weed-york">Cheap Weed York</Link>
              {showCigarettes && <Link href="/native-cigarettes-york">Native Cigarettes York</Link>}
              <Link href="/nicotine-vape-york">Nicotine Vapes York</Link>
              {showCigarettes && <Link href="/info/native-cigarettes-york">Native Cigarettes product guide</Link>}
              <Link href="/info/nicotine-vapes-york">Nicotine Vapes product guide</Link>
              <Link href={STORE.storePagePath}>After Dark Cannabis Weed Dispensary in York</Link>
              <Link href="/contact">Contact Us</Link>
              <Link href="/resources">Resources</Link>
              <Link href="/guides">Guides</Link>
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
