"use client";

import { useEffect, useRef, useState } from "react";
import shared from "@/styles/shared.module.css";
import styles from "./Contact.module.css";
import {
  EMAIL,
  GITHUB_URL,
  GITHUB_USERNAME,
  LINKEDIN_HANDLE,
  LINKEDIN_URL,
  LOCATION,
  PHONE_DISPLAY,
  PHONE_TEL,
} from "@/lib/profile";

function CopyIcon({ done }: { done: boolean }) {
  if (done) {
    return (
      <svg viewBox="0 0 16 16" width="13" height="13" fill="none" aria-hidden="true">
        <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 16 16" width="13" height="13" fill="none" aria-hidden="true">
      <rect x="5.5" y="5.5" width="8" height="8" rx="1.4" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3 10.5V3.9C3 3.4 3.4 3 3.9 3H10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function useLocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => {
      const formatted = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(new Date());
      setTime(`${formatted} IST`);
    };
    update();
    const id = setInterval(update, 15_000);
    return () => clearInterval(id);
  }, []);

  return time;
}

export default function Contact() {
  const localTime = useLocalTime();
  const [copied, setCopied] = useState(false);
  const copyTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (copyTimeout.current) clearTimeout(copyTimeout.current);
  }, []);

  async function handleCopyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
    } catch {
      setCopied(false);
    }
    if (copyTimeout.current) clearTimeout(copyTimeout.current);
    copyTimeout.current = setTimeout(() => setCopied(false), 2200);
  }

  return (
    <section id="contact" className={styles.section}>
      <div className={`${shared.container} ${shared.sectionHeader} ${styles.header}`}>
        <h2 className={shared.sectionHeading}>Contact</h2>
        <span className={shared.cornerTag}>08 / EOF</span>
      </div>
      <div className={`${shared.container} ${styles.inner}`}>
        <div className={styles.terminal}>
          <div className={styles.titlebar}>
            <span className={styles.dots} aria-hidden="true">
              <span className={styles.dotRed} />
              <span className={styles.dotYellow} />
              <span className={styles.dotGreen} />
            </span>
            <span className={styles.titlebarLabel}>contact.json — zsh</span>
          </div>
          <div className={styles.body}>
            <div className={styles.line}>
              <span className={styles.promptSign}>$</span> cat contact.json
            </div>

            <pre className={styles.json}>
              <span className={styles.brace}>{"{"}</span>
              {"\n"}
              <span className={styles.indent}>  </span>
              <span className={styles.key}>&quot;email&quot;</span>
              <span className={styles.punct}>: </span>
              <a href={`mailto:${EMAIL}`} className={styles.string}>
                &quot;{EMAIL}&quot;
              </a>
              <button
                type="button"
                className={styles.copyBtn}
                onClick={handleCopyEmail}
                aria-label="Copy email address"
              >
                <CopyIcon done={copied} />
              </button>
              <span className={styles.punct}>,</span>
              {"\n"}
              <span role="status" aria-live="polite" className={styles.srOnly}>
                {copied ? "Email copied to clipboard" : ""}
              </span>

              <span className={styles.indent}>  </span>
              <span className={styles.key}>&quot;phone&quot;</span>
              <span className={styles.punct}>: </span>
              <a href={`tel:${PHONE_TEL}`} className={styles.string}>
                &quot;{PHONE_DISPLAY}&quot;
              </a>
              <span className={styles.punct}>,</span>
              {"\n"}

              <span className={styles.indent}>  </span>
              <span className={styles.key}>&quot;github&quot;</span>
              <span className={styles.punct}>: </span>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className={styles.string}>
                &quot;{GITHUB_USERNAME}&quot;
              </a>
              <span className={styles.punct}>,</span>
              {"\n"}

              <span className={styles.indent}>  </span>
              <span className={styles.key}>&quot;linkedin&quot;</span>
              <span className={styles.punct}>: </span>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className={styles.string}>
                &quot;{LINKEDIN_HANDLE}&quot;
              </a>
              <span className={styles.punct}>,</span>
              {"\n"}

              <span className={styles.indent}>  </span>
              <span className={styles.key}>&quot;location&quot;</span>
              <span className={styles.punct}>: </span>
              <span className={styles.string}>&quot;{LOCATION}&quot;</span>
              <span className={styles.punct}>,</span>
              {"\n"}

              <span className={styles.indent}>  </span>
              <span className={styles.key}>&quot;local_time&quot;</span>
              <span className={styles.punct}>: </span>
              <span className={styles.string}>&quot;{localTime ?? "—"}&quot;</span>
              <span className={styles.punct}>,</span>
              {"\n"}

              <span className={styles.indent}>  </span>
              <span className={styles.key}>&quot;status&quot;</span>
              <span className={styles.punct}>: </span>
              <span className={styles.statusValue}>
                <span className={styles.statusDot} aria-hidden="true" />
                <span className={styles.string}>&quot;open_to_internships&quot;</span>
              </span>
              {"\n"}
              <span className={styles.brace}>{"}"}</span>
            </pre>

            <div className={styles.comment}># built by hand · no template</div>
            <div className={styles.line}>
              <span className={styles.promptSign}>$</span>{" "}
              <span className={styles.cursor} aria-hidden="true">
                ▌
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
