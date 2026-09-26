import SuiteHeader from "./SuiteHeader";
import { AI_PRACTICE, COVERAGE, COVERAGE_COLUMNS, TOOLBOX } from "@/lib/content";
import styles from "./Environment.module.css";

/* The stack as a coverage report: skills down the side, the work across the
   top, a mark wherever that work actually uses the skill. Hovering a row or a
   column lights its crosshair, so "where did he use Django?" and "what is
   MedVault built on?" are both one glance. */
export default function Environment() {
  const skillCount = COVERAGE.reduce((n, group) => n + group.rows.length, 0);
  const cols = COVERAGE_COLUMNS.length;

  return (
    <section id="stack" className={styles.section} aria-labelledby="stack-title">
      <div className="container">
        <SuiteHeader
          id="stack"
          title="Stack"
          file="coverage"
          result={`${skillCount} skills, each proven in the work`}
        />

        <div className={styles.grid}>
          <div className={styles.scroller}>
            <table className={styles.matrix}>
              <caption className="sr-only">
                Skills, and which projects or roles on this page use each one
              </caption>
              <thead>
                <tr>
                  <th scope="col" className={styles.corner}>
                    Skill
                  </th>
                  {COVERAGE_COLUMNS.map((col, i) => (
                    <th key={col.id} scope="col" data-col={i} className={styles.colHead}>
                      <a href={`#${col.id}`}>{col.label}</a>
                    </th>
                  ))}
                  <th scope="col" className={styles.countHead}>
                    Used in
                  </th>
                </tr>
              </thead>
              {COVERAGE.map((group) => (
                <tbody key={group.layer} className={styles.group}>
                  <tr className={styles.layerRow}>
                    <th scope="rowgroup" colSpan={cols + 3} className="mono">
                      {group.layer}
                    </th>
                  </tr>
                  {group.rows.map((row) => (
                    <tr key={row.skill} className={styles.row}>
                      <th scope="row" className={styles.skill}>
                        {row.skill}
                      </th>
                      {COVERAGE_COLUMNS.map((col, i) => {
                        const used = row.in.includes(col.id);
                        return (
                          <td key={col.id} data-col={i} className={styles.cell}>
                            <span
                              className={used ? styles.hit : styles.miss}
                              aria-hidden="true"
                            />
                            <span className="sr-only">
                              {used ? `used in ${col.label}` : `not in ${col.label}`}
                            </span>
                          </td>
                        );
                      })}
                      <td className={styles.uses} aria-hidden="true">
                        {COVERAGE_COLUMNS.filter((col) => row.in.includes(col.id)).map((col) => (
                          <span key={col.id}>{col.label}</span>
                        ))}
                      </td>
                      <td className={styles.count}>
                        <span className={styles.meter} aria-hidden="true">
                          <span style={{ width: `${(row.in.length / cols) * 100}%` }} />
                        </span>
                        <span className="mono tabular">{row.in.length}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>
          </div>

          <div className={styles.toolbox}>
            <div>
              <h3 className={styles.toolboxTitle}>Also in the toolbox</h3>
              <p className={styles.toolboxNote}>
                Used and studied, with no public project here to point at yet.
              </p>
            </div>
            <ul className={styles.toolboxList}>
              {TOOLBOX.map((tool) => (
                <li key={tool} className="tag">
                  {tool}
                </li>
              ))}
            </ul>
          </div>

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
