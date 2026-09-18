import Link from "next/link";
import type { ReactNode } from "react";
import { hubLinksForPage } from "../lib/sccParityHub";
import styles from "./SccParityHub.module.css";

export default function SccParityHub({
  currentPath,
  heading,
  intro,
  geoSet = "all",
  includeTiers = true,
  tone = "dark",
}: {
  currentPath: string;
  heading: string;
  intro?: ReactNode;
  geoSet?: "core" | "all";
  includeTiers?: boolean;
  tone?: "dark" | "light";
}) {
  const links = hubLinksForPage({ currentPath, geoSet, includeTiers });
  if (links.length === 0) return null;

  return (
    <nav className={`${styles.wrap} ${styles[tone]}`} aria-label={heading}>
      <h2 className={styles.heading}>{heading}</h2>
      {intro ? <p className={styles.intro}>{intro}</p> : null}
      <div className={styles.grid}>
        {links.map((hub) => (
          <Link key={hub.href} href={hub.href} className={styles.card}>
            <span className={styles.label}>{hub.label}</span>
            <span className={styles.blurb}>{hub.blurb}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
