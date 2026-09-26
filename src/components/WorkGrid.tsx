import shared from "@/styles/shared.module.css";
import styles from "./WorkGrid.module.css";
import WorkCard, { type WorkCardProps } from "./WorkCard";

const PROJECTS: WorkCardProps[] = [
  {
    kicker: "01 · AI · health-tech · Feb – Aug 2026",
    title: "MedVault — a personal health vault",
    screenLabel: "MEDVAULT SCREEN →",
    description:
      "Upload a lab report PDF and get a plain-language explanation of what the numbers mean, then ask follow-up questions or keep private notes. Gemini runs behind a hard-coded JSON schema with explicit anti-diagnosis safety constraints; Django REST Framework backend with JWT auth and per-user row-level isolation.",
    tags: [
      { label: "Django", variant: "accent" },
      { label: "PostgreSQL", variant: "neutral" },
      { label: "Gemini API", variant: "neutral" },
      { label: "React · TypeScript", variant: "neutral" },
    ],
    href: "https://medvault-xor.vercel.app",
    image: "/work/medvault.webp",
    live: true,
  },
  {
    kicker: "02 · dev tooling · AI · Aug – Sep 2026",
    title: "Canopy — an interactive map of any codebase",
    screenLabel: "CANOPY SCREEN →",
    description:
      "Paste in a GitHub repo and get an explorable map of its architecture — modules, files, classes, down to individual functions as leaf nodes, each showing its source and its callers/callees. Parses 10 languages in one pass, with an optional AI chat grounded strictly in that repo's own parsed call graph.",
    tags: [
      { label: "Python", variant: "accent" },
      { label: "Django", variant: "neutral" },
      { label: "tree-sitter", variant: "neutral" },
      { label: "Gemini API", variant: "neutral" },
    ],
    href: "https://canopy-v7hb.onrender.com/analyze/",
    image: "/work/canopy.webp",
    live: true,
  },
  {
    kicker: "03 · full stack · Apr – May 2026",
    title: "NexDev — course-selling platform",
    screenLabel: "NEXDEV SCREEN →",
    description:
      "RESTful Node/Express backend with a React frontend: role-based JWT auth for admin and user roles, course creation and a purchase flow. Requests validated with Zod, passwords hashed with bcrypt; containerized with Docker and deployed on Vercel.",
    tags: [
      { label: "Node.js", variant: "accent" },
      { label: "MongoDB", variant: "neutral" },
      { label: "Docker", variant: "neutral" },
      { label: "JWT", variant: "neutral" },
    ],
    href: "https://nex-m7gjfpkrv-adityamittal-dots-projects.vercel.app",
    image: "/work/nexdev.webp",
    live: true,
  },
  {
    kicker: "04 · meta · Sep 2026",
    title: "Portfolio — the site you're on right now",
    screenLabel: "PORTFOLIO SCREEN →",
    description:
      "This very site — a Next.js 16 build with a floating glass nav that fades on scroll, a command palette, GitHub-synced project cards, and a hand-tuned design system that holds up in both light and dark. Built and iterated on in the open, one component at a time.",
    tags: [
      { label: "Next.js", variant: "accent" },
      { label: "TypeScript", variant: "neutral" },
      { label: "React", variant: "neutral" },
      { label: "CSS Modules", variant: "neutral" },
    ],
    href: "https://github.com/adityamittal-dot/Portfolio",
    image: "/work/portfolio.webp",
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
