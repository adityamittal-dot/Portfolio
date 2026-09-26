import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import SuiteHeader from "./SuiteHeader";
import StatusMark from "./StatusMark";
import { LAB } from "@/lib/content";
import styles from "./LabSuite.module.css";

export default function LabSuite() {
  const passed = LAB.filter((l) => !l.skipReason).length;
  const skipped = LAB.length - passed;

  return (
    <section id="lab" className={styles.section} aria-labelledby="lab-title">
      <div className="container">
        <SuiteHeader
          id="lab"
          title="Lab"
          file="lab.spec.ts"
          result={
            <>
              {passed} passed
              {skipped > 0 && (
                <>
                  , <span className={styles.skipCount}>{skipped} skipped</span>
                </>
              )}
            </>
          }
        />
        <p className={styles.intro}>Smaller tools and experiments, built to scratch a specific itch.</p>

        <ul className={styles.rows}>
          {LAB.map((item) => {
            const content = (
              <>
                <StatusMark status={item.skipReason ? "skipped" : "passed"} />
                <span className={styles.thumb}>
                  <Image src={item.image} alt="" fill sizes="160px" className={styles.thumbImage} />
                </span>
                <span className={styles.text}>
                  <span className={`mono ${styles.name}`}>{item.name}</span>
                  <span className={styles.description}>{item.description}</span>
                </span>
                {item.skipReason ? (
                  <span className={`mono ${styles.skip}`}>skipped: {item.skipReason}</span>
                ) : (
                  <span className={styles.open}>
                    Source
                    <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
                  </span>
                )}
              </>
            );
            return (
              <li key={item.name} id={item.name}>
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.row} ${styles.rowLink}`}
                  >
                    {content}
                  </a>
                ) : (
                  <div className={styles.row}>{content}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
