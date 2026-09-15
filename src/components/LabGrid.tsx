import shared from "@/styles/shared.module.css";
import styles from "./LabGrid.module.css";

const PROJECTS = [
  {
    name: "pdf-diff",
    description: "Shared PDF-comparison utilities as a reusable npm workspace package.",
  },
  {
    name: "bam-gate",
    description: "Pre-analysis validation for genomic sequencing files.",
  },
  {
    name: "batch-calls",
    description: "96 sequential REST calls collapsed into 2 queries.",
  },
];

export default function LabGrid() {
  return (
    <section id="lab" className={styles.section}>
      <div className={`${shared.container} ${shared.sectionHeader} ${styles.header}`}>
        <h2 className={shared.sectionHeading}>The lab</h2>
        <span className={shared.cornerTag}>07 / PIXEL · 8-BIT</span>
      </div>
      <div className={`${shared.container} ${styles.grid}`}>
        {PROJECTS.map((project) => (
          <div key={project.name} className={styles.tile}>
            <div className={styles.swatch} />
            <div className={styles.name}>{project.name}</div>
            <p className={styles.description}>{project.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
