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
}

export default function WorkCard({ kicker, title, screenLabel, description, tags, href }: WorkCardProps) {
  return (
    <div className={`card ${styles.card}`}>
      <div className={styles.shot}>
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
      </div>
    </div>
  );
}
