import Image from "next/image";
import shared from "@/styles/shared.module.css";
import styles from "./LabGrid.module.css";

const PROJECTS = [
  {
    name: "x-flow",
    description: "Turns real GitHub activity into build-in-public posts, drafted live and published via Buffer.",
    image: "/lab/x-flow.webp",
  },
  {
    name: "salvo-oss",
    description: "Zero-auth job discovery, fit-scoring, and resume tailoring — open-sourced and customizable.",
    href: "https://github.com/adityamittal-dot/salvo-oss",
    image: "/lab/salvo-oss.webp",
  },
  {
    name: "dsa-sheet-cpp",
    description: "A 291-problem, 12-week DSA tracker with curated resources and per-problem notes.",
    href: "https://github.com/adityamittal-dot/DSA-Sheet-Cpp",
    image: "/lab/dsa-sheet-cpp.webp",
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
        {PROJECTS.map((project) =>
          project.href ? (
            <a
              key={project.name}
              className={styles.tile}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={styles.swatch}>
                <Image
                  src={project.image}
                  alt={`${project.name} — cover art`}
                  fill
                  sizes="(max-width: 760px) 100vw, 33vw"
                  className={styles.swatchImage}
                />
              </div>
              <div className={styles.name}>{project.name}</div>
              <p className={styles.description}>{project.description}</p>
            </a>
          ) : (
            <div key={project.name} className={styles.tile}>
              <div className={styles.swatch}>
                <Image
                  src={project.image}
                  alt={`${project.name} — cover art`}
                  fill
                  sizes="(max-width: 760px) 100vw, 33vw"
                  className={styles.swatchImage}
                />
              </div>
              <div className={styles.name}>{project.name}</div>
              <p className={styles.description}>{project.description}</p>
            </div>
          ),
        )}
      </div>
    </section>
  );
}
