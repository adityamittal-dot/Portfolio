import shared from "@/styles/shared.module.css";
import styles from "./AIWorkflow.module.css";

const POINTS = [
  "Code review & debugging: reviewing diffs, tracing regressions, and validating edge cases before merge.",
  "Technical documentation: drafting and maintaining READMEs, API references, and onboarding docs.",
  "Workflow automation: scripting routine engineering tasks — test scaffolding, data validation, deploy checks.",
  "Prompt & context engineering: structuring prompts and tool integrations for reliable, repeatable output.",
];

const TOOLS = ["Claude API", "Claude Code", "Model Context Protocol", "Prompt Engineering"];

export default function AIWorkflow() {
  return (
    <section id="ai-workflow" className={styles.section}>
      <div className={`${shared.container} ${shared.sectionHeader} ${styles.header}`}>
        <h2 className={shared.sectionHeading}>AI-assisted engineering</h2>
        <span className={shared.cornerTag}>04 / AI-ASSISTED</span>
      </div>
      <div className={`${shared.container} ${styles.card}`}>
        <div className={styles.icon} aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2l1.8 5.6L19.4 9.4 13.8 11.2 12 17l-1.8-5.8L4.6 9.4l5.6-1.8L12 2z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div className={styles.body}>
          <div className={styles.titleRow}>
            <h3 className={styles.title}>AI Tooling & Services</h3>
            <span className={styles.tag}>Professional Workflow</span>
          </div>
          <p className={styles.description}>
            AI tooling is a working part of how I build and ship software — used deliberately
            for the tasks it strengthens, alongside standard engineering practice.
          </p>
          <ul className={styles.list}>
            {POINTS.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <div className={styles.chips}>
            {TOOLS.map((tool) => (
              <span key={tool} className={styles.chip}>
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
