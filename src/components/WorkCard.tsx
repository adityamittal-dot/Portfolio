import Image from "next/image";
import styles from "./WorkCard.module.css";

export interface WorkCardTag {
  label: string;
  variant: "accent" | "neutral";
}

export interface WorkCardProps {
  kicker: string;
  title: string;
  screenLabel: string;
  description: string;
  tags: WorkCardTag[];
  href: string;
  /** Path under /public — a real screenshot of the live product. Omit to fall back to the striped placeholder. */
  image?: string;
  /** Shown when the deploy is publicly reachable right now (not just deployed). */
  live?: boolean;
  /** Defaults to "Visit live" when `live`, "View on GitHub" otherwise. */
  linkLabel?: string;
}

export default function WorkCard({
  kicker,
  title,
  screenLabel,
  description,
  tags,
  href,
  image,
  live = false,
  linkLabel,
}: WorkCardProps) {
  const resolvedLinkLabel = linkLabel ?? (live ? "Visit live" : "View on GitHub");

  return (
    <div className={`card ${styles.card}`}>
      <div className={styles.shot}>
        {image && (
          <Image
            src={image}
            alt={`${title} — screenshot`}
            fill
            sizes="(max-width: 760px) 100vw, 50vw"
            className={styles.shotImage}
          />
        )}
        {live && (
          <span className={styles.liveBadge}>
            <span className={styles.liveDot} aria-hidden="true" />
            live
          </span>
        )}
        <span className={styles.shotLabel}>{screenLabel}</span>
      </div>
      <div className={styles.body}>
        <div className={`card-kicker ${styles.kicker}`}>{kicker}</div>
        <h3 className="card-title">
          <a href={href} target="_blank" rel="noopener noreferrer" className={styles.title}>
            {title}
          </a>
        </h3>
        <p className={`card-body ${styles.description}`}>{description}</p>
        <div className={styles.tags}>
          {tags.map((tag) => (
            <span key={tag.label} className={`tag tag-${tag.variant}`}>
              {tag.label}
            </span>
          ))}
        </div>
        <a href={href} target="_blank" rel="noopener noreferrer" className={styles.visitLink}>
          {resolvedLinkLabel} ↗
        </a>
      </div>
    </div>
  );
}
