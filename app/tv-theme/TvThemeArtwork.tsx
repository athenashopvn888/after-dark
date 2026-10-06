import Image from "next/image";
import type { TvTheme } from "./theme";
import styles from "./TvThemeArtwork.module.css";

export default function TvThemeArtwork({ theme }: { theme?: TvTheme }) {
  if (!theme) return null;
  return (
    <>
      <div className={styles.artwork} aria-hidden="true">
        {theme.cornerLeft ? <Image className={`${styles.corner} ${styles.cornerLeft}`} src={theme.cornerLeft} alt="" width={1000} height={1000} unoptimized /> : null}
        {theme.cornerRight ? <Image className={`${styles.corner} ${styles.cornerRight}`} src={theme.cornerRight} alt="" width={1000} height={1000} unoptimized /> : null}
      </div>
      <div className={styles.slogans} aria-hidden="true"><span>{theme.sloganLeft}</span><span>{theme.sloganRight}</span></div>
      <footer className={styles.footer} aria-label="Store theme footer"><span>{theme.footerLeft}</span><span>{theme.footerRight}</span></footer>
    </>
  );
}

