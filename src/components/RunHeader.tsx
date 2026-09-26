import { ArrowDown, DownloadSimple } from "@phosphor-icons/react/dist/ssr";
import StatusMark from "./StatusMark";
import Numeral from "./Numeral";
import GithubRepoCount from "./GithubRepoCount";
import { GITHUB_URL, LOCATION } from "@/lib/profile";
import { HEADLINE_ASSERTIONS, RUN_TAGS, runResults } from "@/lib/content";
import styles from "./RunHeader.module.css";

const SUITE_ANCHOR: Record<string, string> = {
  "work.spec": "#work",
  "experience.spec": "#experience",
  "lab.spec": "#lab",
};

export default function RunHeader() {
  const run = runResults();
  const cases = run.suites.flatMap((s) => s.cases);

  return (
    <section
      id="top"
      className={styles.section}
      aria-labelledby="run-title"
      style={{ "--total": run.total } as React.CSSProperties}
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

        {/* The run summary: counted from the same data the suites render,
            so the totals can't drift from the page. */}
        <aside className={styles.panel} aria-labelledby="run-summary-title">
          <div className={styles.panelHead}>
            <h2 id="run-summary-title" className={styles.panelTitle}>
              Run summary
            </h2>
            <span className={`mono ${styles.panelMeta}`}>
              {run.total} tests, {run.suites.length} suites
            </span>
          </div>

          <p className={styles.totals}>
            <span className={styles.total}>
              <span
                className={`${styles.count} ${styles.countPassed}`}
                style={{ "--run-passed": run.passed } as React.CSSProperties}
                aria-hidden="true"
              />
              <span className="sr-only">{run.passed}</span>
              <span className={styles.totalLabel}>passed</span>
            </span>
            <span className={`${styles.total} ${styles.totalSkipped}`}>
              <span
                className={`${styles.count} ${styles.countSkipped}`}
                style={{ "--run-skipped": run.skipped } as React.CSSProperties}
                aria-hidden="true"
              />
              <span className="sr-only">{run.skipped}</span>
              <span className={styles.totalLabel}>skipped</span>
            </span>
          </p>

          <div className={styles.bar} aria-hidden="true">
            {cases.map((c, i) => (
              <span
                key={`${c.name}-${i}`}
                className={`${styles.segment} ${c.status === "skipped" ? styles.segmentSkipped : ""}`}
                style={{ "--i": i } as React.CSSProperties}
              />
            ))}
          </div>

          <ul className={styles.suites}>
            {run.suites.map((suite, index) => {
              const passed = suite.cases.filter((c) => c.status === "passed").length;
              const skipped = suite.cases.length - passed;
              // Where this suite's segments start in the progress bar, so its
              // count ticks up on the same beat as its part of the bar.
              const start = run.suites.slice(0, index).reduce((n, s) => n + s.cases.length, 0);
              return (
                <li key={suite.name}>
                  <a href={SUITE_ANCHOR[suite.name]} className={styles.suite}>
                    <span className="mono">{suite.name}</span>
                    <span className={`mono tabular ${styles.suiteResult}`}>
                      <span
                        className={styles.suiteCount}
                        style={
                          { "--suite-n": passed, "--start": start, "--len": suite.cases.length } as React.CSSProperties
                        }
                        aria-hidden="true"
                      />
                      <span className="sr-only">{passed}</span>/{suite.cases.length}
                      {skipped > 0 && <span className={styles.suiteSkip}> ({skipped} skipped)</span>}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>

          <div className={styles.tags}>
            {RUN_TAGS.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>

          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className={`mono ${styles.github}`}>
            github.com/adityamittal-dot
            <GithubRepoCount prefix=", " />
          </a>
        </aside>
      </div>

      <div className="container">
        <h2 className="sr-only">Headline results</h2>
        <ol className={styles.assertions}>
          {HEADLINE_ASSERTIONS.map((a, i) => (
            <li key={a.numeral}>
              <a href={a.evidence} className={styles.assertion} style={{ "--i": cases.length + i } as React.CSSProperties}>
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
