import SuiteHeader from "./SuiteHeader";
import { AI_PRACTICE, ENVIRONMENT, proofLabel } from "@/lib/content";
import styles from "./Environment.module.css";

/* The report's environment block, borrowed from a datasheet's spec table:
   what the work runs on, one layer per row. */
export default function Environment() {
  return (
    <section id="stack" className={styles.section} aria-labelledby="stack-title">
      <div className="container">
        <SuiteHeader id="stack" title="Stack" file="environment" result={`${ENVIRONMENT.length} layers`} />

        <div className={styles.grid}>
          <table className={styles.table}>
            <caption className="sr-only">Technologies by layer, and where each is used in the work above</caption>
            <thead>
              <tr>
                <th scope="col">Layer</th>
                <th scope="col">Tools</th>
                <th scope="col">Proven in</th>
              </tr>
            </thead>
            <tbody>
              {ENVIRONMENT.map((row) => (
                <tr key={row.key}>
                  <th scope="row" className="mono">
                    {row.key}
                  </th>
                  <td>
                    <ul className={styles.values}>
                      {row.values.map((v) => (
                        <li key={v}>{v}</li>
                      ))}
                    </ul>
                  </td>
                  <td className={styles.proof}>
                    {row.provenIn.length > 0 ? (
                      row.provenIn.map((id) => (
                        <a key={id} href={`#${id}`} className={styles.proofLink}>
                          {proofLabel(id)}
                        </a>
                      ))
                    ) : (
                      <span className={styles.proofNone}>no public project yet</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <aside className={styles.notes} aria-labelledby="ai-title">
            <div>
              <h3 id="ai-title" className={styles.notesTitle}>
                How I use AI at work
              </h3>
              <p className={styles.notesLead}>
                A working part of how I build and ship, used deliberately for the tasks it
                strengthens, next to standard engineering practice.
              </p>
            </div>
            <dl className={styles.practice}>
              {AI_PRACTICE.map((p) => (
                <div key={p.title}>
                  <dt>{p.title}</dt>
                  <dd>{p.body}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
}
