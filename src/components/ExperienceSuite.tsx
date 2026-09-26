import { Check } from "@phosphor-icons/react/dist/ssr";
import SuiteHeader from "./SuiteHeader";
import StatusMark from "./StatusMark";
import TraceWaterfall from "./TraceWaterfall";
import { ROLES } from "@/lib/content";
import styles from "./ExperienceSuite.module.css";

export default function ExperienceSuite() {
  return (
    <section id="experience" className={styles.section} aria-labelledby="experience-title">
      <div className="container">
        <SuiteHeader
          id="experience"
          title="Experience"
          file="experience.spec.ts"
          result={`${ROLES.length} passed`}
        />

        <ol className={styles.roles}>
          {ROLES.map((role) => (
            <li key={role.id} id={role.id} className={styles.role}>
              <div className={styles.side}>
                <div className={styles.company}>
                  <StatusMark />
                  <h3 className={styles.companyName}>{role.company}</h3>
                </div>
                <dl className={styles.facts}>
                  <div>
                    <dt>Role</dt>
                    <dd>{role.role}</dd>
                  </div>
                  <div>
                    <dt>When</dt>
                    <dd className="tabular">{role.dates}</dd>
                  </div>
                  <div>
                    <dt>Where</dt>
                    <dd>{role.location}</dd>
                  </div>
                  <div>
                    <dt>Field</dt>
                    <dd>{role.industry}</dd>
                  </div>
                  {role.stat && (
                    <div>
                      <dt>Output</dt>
                      <dd className={styles.stat}>{role.stat}</dd>
                    </div>
                  )}
                </dl>
              </div>

              <div className={styles.main}>
                <p className={styles.description}>{role.description}</p>
                <ul className={styles.steps}>
                  {role.steps.map((step) => (
                    <li key={step}>
                      <Check size={14} weight="bold" className={styles.stepMark} aria-hidden="true" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
                {role.id === "basepair" && <TraceWaterfall />}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
