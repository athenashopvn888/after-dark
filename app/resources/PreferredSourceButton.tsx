import Script from "next/script";
import styles from "./resources.module.css";

const buttonAttributes = {
  "google-add-preferred-source-btn": "",
};

export default function PreferredSourceButton() {
  return (
    <section className={styles.preferredSource} aria-labelledby="preferred-source-heading">
      <p className={styles.railLabel}>Google Preferred Sources</p>
      <h2 id="preferred-source-heading">Choose After Dark as a preferred source</h2>
      <p>
        If you use Google&apos;s Preferred Sources feature, you can select After Dark so our
        relevant content is more likely to appear for you in Top Stories and can be highlighted
        in AI Mode and AI Overviews.
      </p>
      <Script
        src="https://news.google.com/swg/js/v1/publisher.js"
        strategy="afterInteractive"
      />
      <div className={styles.preferredSourceButton} {...buttonAttributes} />
      <a
        href="https://www.google.com/preferences/source?q=afterdarkcannabis.com"
        target="_blank"
        rel="noreferrer"
      >
        Open Google source preferences
      </a>
    </section>
  );
}
