import shared from "@/styles/shared.module.css";
import styles from "./WorkGrid.module.css";
import WorkCard, { type WorkCardProps } from "./WorkCard";

// TODO: swap in real GitHub repo / live demo URLs for each project.
const PROJECTS: WorkCardProps[] = [
  {
    kicker: "01 · AI · Nov 2025",
    title: "MedVault — AI medical document platform",
    screenLabel: "MEDVAULT SCREEN →",
    description:
      "Secure upload, organization and analysis of lab reports. Google Gemini extracts biomarkers from medical PDFs and generates health summaries; Supabase handles auth, storage and real-time Postgres with row-level security for per-user isolation.",
    tags: [
      { label: "Next.js", variant: "accent" },
      { label: "TypeScript", variant: "neutral" },
      { label: "Supabase", variant: "neutral" },
      { label: "Gemini", variant: "neutral" },
    ],
    href: "#",
  },
  {
    kicker: "02 · full stack · Apr 2026",
    title: "NexDev — course-selling platform",
    screenLabel: "NEXDEV SCREEN →",
    description:
      "RESTful Node/Express backend with a React frontend: role-based JWT auth for admin and user roles, course creation and a purchase flow. Containerized with Docker Compose, deployed on Vercel with environment-based config.",
    tags: [
      { label: "Node.js", variant: "accent" },
      { label: "MongoDB", variant: "neutral" },
      { label: "Docker", variant: "neutral" },
      { label: "JWT", variant: "neutral" },
    ],
    href: "#",
  },
];

export default function WorkGrid() {
  return (
    <section id="work" className={styles.section}>
      <div className={`${shared.container} ${shared.sectionHeader} ${styles.header}`}>
        <h2 className={shared.sectionHeading}>Selected work</h2>
        <span className={shared.cornerTag}>02 / GLITCH ON HOVER</span>
      </div>
      <div className={`${shared.container} ${styles.grid}`}>
        {PROJECTS.map((project) => (
          <WorkCard key={project.title} {...project} />
        ))}
      </div>
    </section>
  );
}
