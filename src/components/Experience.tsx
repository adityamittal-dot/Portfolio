import shared from "@/styles/shared.module.css";
import styles from "./Experience.module.css";

const ROLES = [
  {
    role: "Basepair — SDET Intern",
    dates: "Jun–Aug 2026",
    description:
      "Playwright E2E suites across 7 repos, a full-stack SonarQube remediation of 100+ BLOCKER/HIGH defects, and a Python validation gate for BAM/FASTQ genomic files.",
  },
  {
    role: "Spelll Production — Frontend Intern",
    dates: "Jun–Jul 2024",
    description:
      "Responsive client-facing marketing sites in HTML5, SCSS and modern JavaScript, owned prototype through production deploy.",
  },
];

export default function Experience() {
  return (
    <div className={styles.experience}>
      <h2 className={`${shared.sectionHeading} ${styles.heading}`}>Experience</h2>
      <div className={styles.list}>
        {ROLES.map((item) => (
          <div key={item.role} className={styles.entry}>
            <div className={styles.entryHead}>
              <span className={styles.role}>{item.role}</span>
              <span className={styles.dates}>{item.dates}</span>
            </div>
            <p className={styles.description}>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
