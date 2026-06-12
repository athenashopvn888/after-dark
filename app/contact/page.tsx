import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact Us — After Dark Cannabis | 1664 Jane St, York",
  description:
    "Visit After Dark Cannabis at 1664 Jane St, York, ON M9N 2S1. Open 24 Hours a day, 7 days a week. Walk-ins welcome.",
  alternates: {
    canonical: "https://afterdarkcannabis.com/contact",
  },
  openGraph: {
    title: "Contact After Dark Cannabis — York Dispensary",
    description:
      "1664 Jane St, York. Open 24 Hours a day, 7 days a week. Premium cannabis, always fire.",
  },
};

export default function ContactPage() {
  return (
    <main className={styles.main}>
      <Navbar />

      {/* â”€â”€ Hero â”€â”€ */}
      <section className={styles.hero} style={{ paddingTop: "92px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          <img src="/banners/08_Contact_Us.webp" alt="Contact Us" style={{ width: "100%", height: "auto", display: "block", borderRadius: "var(--radius-lg)" }} />
        </div>
      </section>

      {/* â”€â”€ Info Cards â”€â”€ */}
      <section className={styles.infoSection}>
        <div className={styles.container}>
          <div className={styles.infoGrid}>
            {/* Location */}
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>ðŸ“</div>
              <h2 className={styles.infoTitle}>Location</h2>
              <p className={styles.infoText}>
                1664 Jane St
                <br />
                York, ON M9N 2S1
                <br />
                <span className={styles.infoMuted}>Jane St &amp; Lawrence Ave W</span>
              </p>
              <a
                href="https://maps.app.goo.gl/pX2JcDodriRwhVxF9"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.infoBtn}
              >
                Get Directions â†’
              </a>
            </div>

            {/* Hours */}
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>ðŸ•’</div>
              <h2 className={styles.infoTitle}>Hours</h2>
              <div className={styles.hoursTable}>
                <div className={styles.hoursRow}>
                  <span>Monday</span>
                  <span className={styles.hoursTime}>24 Hours</span>
                </div>
                <div className={styles.hoursRow}>
                  <span>Tuesday</span>
                  <span className={styles.hoursTime}>24 Hours</span>
                </div>
                <div className={styles.hoursRow}>
                  <span>Wednesday</span>
                  <span className={styles.hoursTime}>24 Hours</span>
                </div>
                <div className={styles.hoursRow}>
                  <span>Thursday</span>
                  <span className={styles.hoursTime}>24 Hours</span>
                </div>
                <div className={styles.hoursRow}>
                  <span>Friday</span>
                  <span className={styles.hoursTime}>24 Hours</span>
                </div>
                <div className={styles.hoursRow}>
                  <span>Saturday</span>
                  <span className={styles.hoursTime}>24 Hours</span>
                </div>
                <div className={styles.hoursRow}>
                  <span>Sunday</span>
                  <span className={styles.hoursTime}>24 Hours</span>
                </div>
              </div>
              <div className={styles.openBadge}>
                <span className={styles.openDot}></span>
                Open 24/7 â€” Never Closed
              </div>
            </div>

            {/* Walk-in */}
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>ðŸ”¥</div>
              <h2 className={styles.infoTitle}>Walk In</h2>
              <p className={styles.infoText}>
                No appointment needed.
                <br />
                Just walk in and our staff will
                <br />
                help you find the perfect strain.
              </p>
              <div className={styles.featureList}>
                <div className={styles.featureItem}>
                  <span className={styles.featureCheck}>âœ“</span>
                  200+ strains in stock
                </div>
                <div className={styles.featureItem}>
                  <span className={styles.featureCheck}>âœ“</span>
                  Lab-tested &amp; safe
                </div>
                <div className={styles.featureItem}>
                  <span className={styles.featureCheck}>âœ“</span>
                  Knowledgeable budtenders
                </div>
                <div className={styles.featureItem}>
                  <span className={styles.featureCheck}>âœ“</span>
                  Debit &amp; cash accepted
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className={styles.mapSection}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2884.225547632616!2d-79.50005702382025!3d43.698944971099616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b31494094ad85%3A0x5ae85accb8bd6200!2s1664%20Jane%20St%2C%20York%2C%20ON%20M9N%202S1!5e0!3m2!1sen!2sca!4v1"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="After Dark Cannabis â€” 1664 Jane St, York"
            ></iframe>
          </div>
        </div>
      </section>

      {/* â”€â”€ Footer â”€â”€ */}
      <Footer />
    </main>
  );
}

