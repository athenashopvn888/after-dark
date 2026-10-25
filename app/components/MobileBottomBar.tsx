"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  MOBILE_BAR_DELIVERY_HREF,
  MOBILE_BAR_HOURS_HREF,
  MOBILE_BAR_MENU_HREF,
  isMobileBarHiddenPath,
  preferredStoreMapsUrl,
} from "../lib/mobileBottomBar";
import { storeHoursStatus } from "../lib/storeHoursStatus";
import styles from "./MobileBottomBar.module.css";

/**
 * Mobile-only sticky actions. Directions uses the store Google Maps link.
 * Hours copy is computed in America/Toronto from the store opening hours.
 * Hidden on the in-store TV boards.
 */
export default function MobileBottomBar() {
  const pathname = usePathname() || "/";
  const hidden = isMobileBarHiddenPath(pathname);
  const [status, setStatus] = useState(() => storeHoursStatus(new Date()));

  useEffect(() => {
    if (hidden) return;
    const update = () => setStatus(storeHoursStatus(new Date()));
    update();
    const id = window.setInterval(update, 30_000);
    return () => window.clearInterval(id);
  }, [hidden]);

  if (hidden) return null;

  return (
    <nav
      className={styles.bar}
      aria-label="Store actions"
      data-mobile-bottom-bar=""
      data-hours-kind={status.kind}
      suppressHydrationWarning
    >
      <a
        className={`${styles.action} ${styles.directions}`}
        href={preferredStoreMapsUrl()}
        target="_blank"
        rel="noopener noreferrer"
      >
        Directions
      </a>
      <Link className={`${styles.action} ${styles.hours}`} href={MOBILE_BAR_HOURS_HREF}>
        <span className={styles.srOnly}>Hours. </span>
        <span className={styles.hoursLabel} suppressHydrationWarning>
          {status.label}
        </span>
      </Link>
      <Link className={`${styles.action} ${styles.minor}`} href={MOBILE_BAR_MENU_HREF}>
        Menu
      </Link>
      <Link className={`${styles.action} ${styles.minor}`} href={MOBILE_BAR_DELIVERY_HREF}>
        Delivery
      </Link>
    </nav>
  );
}
