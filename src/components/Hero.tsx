import shared from "@/styles/shared.module.css";
import styles from "./Hero.module.css";
import AsciiArt from "./AsciiArt";

const SKILLS = ["Python", "TypeScript", "React · Next.js", "Django", "AWS", "Playwright"];

const STATS = [
  "100+ BLOCKER/HIGH defects resolved",
  "23+ E2E specs across 7 repos",
  "96 REST calls → 2 batched queries",
  "open to internships",
  "100+ BLOCKER/HIGH defects resolved",
];

export default function Hero() {
  return (
    <>
      <section className={styles.wrap}>
        <div className={`${shared.container} ${styles.grid}`}>
          <div className={styles.copy}>
            <div className={styles.whoami}>
              <span className={styles.whoamiPrompt}>$</span> whoami
            </div>
            <h1 className={styles.headline}>
              Aditya Mittal —<br />
              full stack engineer
              <br />
              who makes AI
              <br />
              features <span className={styles.headlineAccent}>hold up</span>.
            </h1>
            <p className={styles.body}>
              B.Tech CSE at Jaypee University, based in Noida. I work across React and Django,
              integrate models into real products, and spend a lot of time on the parts that
              break under load: race conditions, batched queries, test coverage.
            </p>
            <div className={styles.actions}>
              <a href="#work" className="btn btn-primary">
                See the work
              </a>
              <a href="#lab" className="btn btn-ghost">
                Play in the lab
              </a>
            </div>
            <div className={styles.tags}>
              {SKILLS.map((skill) => (
                <span key={skill} className="tag tag-outline">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className={styles.artPanel}>
            <AsciiArt />
            <span className={`${styles.artLabel} ${shared.cornerTag}`}>01 / ASCII · GENERATIVE</span>
          </div>
        </div>
      </section>

      <div className={styles.tickerWrap}>
        <div className={`${shared.container} ${styles.ticker}`}>
          {STATS.map((stat, i) => (
            <span key={i}>
              {stat}
              {i < STATS.length - 1 && <span aria-hidden="true"> · </span>}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
