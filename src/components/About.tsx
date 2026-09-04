import shared from "@/styles/shared.module.css";
import styles from "./About.module.css";

export default function About() {
  return (
    <div className={styles.about}>
      <h2 className={`${shared.sectionHeading} ${styles.heading}`}>About</h2>
      <p className={styles.bio}>
        I started in frontend work and drifted toward the parts that break under load. At
        Basepair I diagnosed an OAuth race condition with DB-level row locking, fixed
        multi-instance file access with S3 fallbacks, and wrote the standards doc the team now
        follows. Outside work: the TMP club, where I ran coding contests and mentored peers, and
        Omega LEO Club community work.
      </p>
      <p className={styles.marker}>
        currently: B.Tech CSE at Jaypee University, 2023–2027 · Noida, India
      </p>
      <div className={`${shared.cornerTag} ${styles.tag}`}>05 / MARKER ANNOTATION</div>
    </div>
  );
}
