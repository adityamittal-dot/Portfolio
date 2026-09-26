import Image from "next/image";
import { ArrowUpRight, Check } from "@phosphor-icons/react/dist/ssr";
import SuiteHeader from "./SuiteHeader";
import StatusMark from "./StatusMark";
import { PROJECTS } from "@/lib/content";
import styles from "./WorkSuite.module.css";

export default function WorkSuite() {
  return (
    <section id="work" className={styles.section} aria-labelledby="work-title">
      <div className="container">
        <SuiteHeader
          id="work"
          title="Work"
          file="work.spec.ts"
          result={`${PROJECTS.length} passed`}
        />

        <ol className={styles.cases}>
          {PROJECTS.map((project, index) => (
            <li key={project.id} id={project.id} className={styles.case}>
              <div className={styles.body}>
                <div className={styles.titleRow}>
                  <StatusMark size="lg" />
                  <h3 className={styles.title}>
                    <a href={project.href} target="_blank" rel="noopener noreferrer">
                      {project.title}
                    </a>
                  </h3>
                </div>
                <p className={styles.meta}>
                  <span>{project.area}</span>
                  <span className="mono tabular">{project.dates}</span>
                </p>
                <p className={styles.summary}>{project.summary}</p>

                <ul className={styles.steps} aria-label={`What ${project.title} does`}>
                  {project.steps.map((step) => (
                    <li key={step}>
                      <Check size={14} weight="bold" className={styles.stepMark} aria-hidden="true" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>

                <div className={styles.footer}>
                  <div className={styles.tags}>
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    {project.live ? "Open live site" : "View source"}
                    <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
                  </a>
                </div>
              </div>

              <figure className={styles.attachment}>
                <figcaption className={styles.attachmentBar}>
                  <span className="mono">attachment: {project.image.split("/").pop()}</span>
                  {project.live && (
                    <span className={styles.live}>
                      <span className={styles.liveDot} aria-hidden="true" />
                      live
                    </span>
                  )}
                </figcaption>
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.shot} ${project.imageFit === "contain" ? styles.shotContain : ""}`}
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    sizes="(max-width: 860px) 100vw, 520px"
                    className={`${styles.image} ${project.imageFit === "contain" ? styles.imageContain : ""}`}
                    priority={index === 0}
                  />
                </a>
              </figure>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
