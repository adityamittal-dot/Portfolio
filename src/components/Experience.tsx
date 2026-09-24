import shared from "@/styles/shared.module.css";
import styles from "./Experience.module.css";

const ROLES = [
  {
    company: "Basepair",
    location: "Remote",
    industry: "Genomics / Bioinformatics SaaS",
    role: "SDET Intern",
    dates: "Jun – Aug 2026",
    stat: "89 PRs · 7 repos",
    description:
      "Worked across Basepair's genomic-analysis platform and its customer-facing lab-report products, moving from test authoring into backend ownership and a cross-cutting code-quality initiative.",
    bullets: [
      "Built and migrated the Playwright E2E suite across 7 repositories, covering core signup/billing/pipeline flows plus report generation for two customer-facing products (kMap, Partiseq).",
      "Led a SonarQube code-quality and security remediation initiative: resolved 100+ BLOCKER/HIGH-severity findings — hardcoded secrets, SQL injection risk, ReDoS-vulnerable regex, insecure randomness — across the Python/Django backend and React frontend, and authored the team's first internal engineering-standards documentation.",
      "Diagnosed and fixed customer-reported production bugs for Partiseq, a lab-report product used by an external customer, tracing missing reviewer signatures, patient data, and report branding to a shared root cause in the report pipeline.",
      "Root-caused and fixed a QuickBooks OAuth token-refresh race condition and a load-balancer file-storage bug that was breaking report pages in production.",
      "Shipped a cross-repo automated sample-validation gate (bioinfo → pipelines → webapp) that blocks genomic analysis until uploaded BAM/FASTQ files pass integrity checks, and cut a 96-sample analysis page from ~96 sequential API calls down to 2.",
    ],
  },
  {
    company: "Spelll Production",
    location: "Remote",
    industry: "Client Services",
    role: "Frontend Intern",
    dates: "Jun – Jul 2024",
    stat: null,
    description:
      "Owned client-facing marketing sites end-to-end — from first prototype to production deploy — working directly with clients on scope and revisions.",
    bullets: [
      "Owned the full build lifecycle for multiple client marketing sites, from prototyping through production deployment.",
      "Built responsive, cross-browser interfaces in HTML5, SCSS, and modern JavaScript against client-specific requirements.",
      "Acted as the direct point of contact with clients for scope, revisions, and delivery.",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className={styles.section}>
      <div className={`${shared.container} ${shared.sectionHeader} ${styles.header}`}>
        <h2 className={shared.sectionHeading}>Experience</h2>
        <span className={shared.cornerTag}>06 / TIMELINE</span>
      </div>
      <div className={`${shared.container} ${styles.list}`}>
        {ROLES.map((item) => (
          <article key={item.company} className={styles.entry}>
            <div className={styles.entryHead}>
              <div className={styles.identity}>
                <h3 className={styles.company}>{item.company}</h3>
                <span className={styles.location}>{item.location}</span>
              </div>
              <div className={styles.datesCol}>
                <span className={styles.dates}>{item.dates}</span>
                {item.stat && <span className={styles.stat}>{item.stat}</span>}
              </div>
            </div>
            <div className={styles.roleRow}>
              <span className={styles.role}>{item.role}</span>
              <span className={styles.industry}>{item.industry}</span>
            </div>
            <p className={styles.description}>{item.description}</p>
            <ul className={styles.bullets}>
              {item.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
