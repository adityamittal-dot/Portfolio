import styles from "./About.module.css";

export default function About() {
  return (
    <section id="about" className={styles.section} aria-labelledby="about-title">
      <div className={`container ${styles.grid}`}>
        <h2 id="about-title" className={styles.title}>
          About
        </h2>
        <div className={styles.body}>
          <p className={styles.lead}>
            I started in frontend work and drifted toward the parts that break under load.
          </p>
          <p className={styles.text}>
            Lately that means putting AI inside products that have to stay honest: MedVault keeps
            Gemini inside a strict JSON schema, and Canopy grounds its chat in a repository&apos;s real
            call graph. On the job, it meant chasing an OAuth race condition down to DB-level row
            locking. Outside work: the TMP club, where I ran coding contests and mentored peers, and
            Omega LEO Club community work.
          </p>
          <dl className={styles.facts}>
            <div>
              <dt>Studying</dt>
              <dd>B.Tech CSE, Jaypee University</dd>
            </div>
            <div>
              <dt>Graduating</dt>
              <dd className="tabular">2027</dd>
            </div>
            <div>
              <dt>Based in</dt>
              <dd>Noida, India</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
