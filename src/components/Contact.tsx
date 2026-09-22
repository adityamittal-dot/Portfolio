import shared from "@/styles/shared.module.css";
import styles from "./Contact.module.css";
import GithubIcon from "./GithubIcon";
import { GITHUB_URL } from "@/lib/profile";

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
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.iconLink}
            >
              <GithubIcon className={styles.icon} />
              github
            </a>{" "}
            ·{" "}
            <a
              href="https://www.linkedin.com/in/aditya-mittal-084b91291/"
              target="_blank"
              rel="noopener noreferrer"
            >
              linkedin
            </a>{" "}
            · Noida, IN
          </span>
        </div>
        <span className={styles.signature}>built by hand · no template</span>
      </div>
    </section>
  );
}
