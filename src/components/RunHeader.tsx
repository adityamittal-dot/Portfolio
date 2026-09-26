import { ArrowDown, DownloadSimple } from "@phosphor-icons/react/dist/ssr";
import StatusMark from "./StatusMark";
import Numeral from "./Numeral";
import Mascot from "./Mascot";
import { LOCATION } from "@/lib/profile";
import { HEADLINE_ASSERTIONS } from "@/lib/content";
import styles from "./RunHeader.module.css";

export default function RunHeader() {

  return (
    <section
      id="top"
      className={styles.section}
      aria-labelledby="run-title"
    >
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <h1 id="run-title" className={styles.name}>
            Aditya Mittal
          </h1>
          <p className={styles.thesis}>Full-stack engineer who makes AI features hold up.</p>
          <p className={styles.sub}>
            React and Django, models inside real products, and the parts that break under load: race
            conditions, batched queries, test coverage.
          </p>
          <p className={styles.status}>
            <span className={styles.open}>
              <span className={styles.openDot} aria-hidden="true" />
              Open to internships
            </span>
            <span className={styles.statusMeta}>{LOCATION.replace("IN", "India")}</span>
          </p>
          <div className={styles.ctas}>
            <a
              href="/aditya-mittal-resume.pdf"
              download="Aditya Mittal - Resume.pdf"
              className="button button-primary"
            >
              <DownloadSimple size={18} weight="bold" aria-hidden="true" />
              Download resume
            </a>
            <a href="#work" className="button button-secondary">
              See the work
            </a>
          </div>
        </div>

        <Mascot />
      </div>

      <div className="container">
        <h2 className="sr-only">Headline results</h2>
        <ol className={styles.assertions}>
          {HEADLINE_ASSERTIONS.map((a, i) => (
            <li key={a.numeral}>
              <a href={a.evidence} className={styles.assertion} style={{ "--i": i } as React.CSSProperties}>
                <StatusMark size="lg" className={styles.assertionMark} />
                <Numeral value={a.numeral} label={a.numeralLabel} className={styles.numeral} />
                <span className={styles.claim}>
                  {a.claim}
                  <span className={styles.source}>
                    {a.source}
                    <span className={styles.evidence}>
                      evidence
                      <ArrowDown size={12} weight="bold" aria-hidden="true" />
                    </span>
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
