import shared from "@/styles/shared.module.css";
import styles from "./Contact.module.css";

export default function Contact() {
  return (
    <section id="contact" className={styles.section}>
      <div className={`${shared.container} ${styles.inner}`}>
        <div className={styles.left}>
          <span className={styles.prompt}>
            <span className={styles.promptSign}>$</span> contact --now
          </span>
          <a href="mailto:adityamittal529@gmail.com" className={styles.email}>
            adityamittal529@gmail.com
            <span className={styles.cursor} aria-hidden="true">
              ▌
            </span>
          </a>
          <span className={styles.meta}>
            +91 78368 50977 ·{" "}
            {/* TODO: replace with real GitHub profile URL */}
            <a href="#">github</a> ·{" "}
            {/* TODO: replace with real LinkedIn profile URL */}
            <a href="#">linkedin</a> · Noida, IN
          </span>
        </div>
        <span className={styles.signature}>built by hand · no template</span>
      </div>
    </section>
  );
}
