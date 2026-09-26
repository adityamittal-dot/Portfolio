"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Check,
  Copy,
  DownloadSimple,
  GithubLogo,
  LinkedinLogo,
  MapPin,
  Phone,
} from "@phosphor-icons/react/dist/ssr";
import {
  EMAIL,
  GITHUB_URL,
  GITHUB_USERNAME,
  LINKEDIN_HANDLE,
  LINKEDIN_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
} from "@/lib/profile";
import styles from "./Contact.module.css";

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

  useEffect(
    () => () => {
      if (copyTimeout.current) clearTimeout(copyTimeout.current);
    },
    [],
  );

  async function handleCopyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
    } catch {
      setCopied(false);
    }
    if (copyTimeout.current) clearTimeout(copyTimeout.current);
    copyTimeout.current = setTimeout(() => setCopied(false), 2000);
  }

  const channels = [
    { label: "Phone", value: PHONE_DISPLAY, href: `tel:${PHONE_TEL}`, Icon: Phone, external: false },
    { label: "GitHub", value: GITHUB_USERNAME, href: GITHUB_URL, Icon: GithubLogo, external: true },
    { label: "LinkedIn", value: LINKEDIN_HANDLE, href: LINKEDIN_URL, Icon: LinkedinLogo, external: true },
  ];

  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-title">
      <div className="container">
        <h2 id="contact-title" className={styles.title}>
          Open to internships. Email is the fastest way to reach me.
        </h2>

        <div className={styles.emailRow}>
          <a href={`mailto:${EMAIL}`} className={styles.email}>
            {EMAIL}
          </a>
          <button
            type="button"
            className={styles.copy}
            onClick={handleCopyEmail}
            aria-label="Copy email address"
            data-copied={copied || undefined}
          >
            <span className={styles.copyIcon} aria-hidden="true">
              <Copy size={18} weight="bold" className={styles.copyIdle} />
              <Check size={18} weight="bold" className={styles.copyDone} />
            </span>
            <span className={styles.copyLabel}>{copied ? "Copied" : "Copy"}</span>
          </button>
          <span role="status" aria-live="polite" className="sr-only">
            {copied ? "Email copied to clipboard" : ""}
          </span>
        </div>

        <div className={styles.grid}>
          <ul className={styles.channels}>
            {channels.map(({ label, value, href, Icon, external }) => (
              <li key={label}>
                <a
                  href={href}
                  className={styles.channel}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <Icon size={18} className={styles.channelIcon} aria-hidden="true" />
                  <span className={styles.channelLabel}>{label}</span>
                  <span className={`mono ${styles.channelValue}`}>{value}</span>
                  {external && <ArrowUpRight size={14} weight="bold" className={styles.channelArrow} aria-hidden="true" />}
                </a>
              </li>
            ))}
            <li>
              <div className={styles.channel}>
                <MapPin size={18} className={styles.channelIcon} aria-hidden="true" />
                <span className={styles.channelLabel}>Noida, India</span>
                <span className={`mono tabular ${styles.channelValue}`}>{localTime ?? "IST, UTC+5:30"}</span>
              </div>
            </li>
          </ul>

          <div className={styles.resume}>
            <a
              href="/aditya-mittal-resume.pdf"
              download="Aditya Mittal - Resume.pdf"
              className="button button-primary"
            >
              <DownloadSimple size={18} weight="bold" aria-hidden="true" />
              Download resume
            </a>
          </div>
        </div>
      </div>

      <footer className={styles.footer}>
        <div className={`container ${styles.footerInner}`}>
          <p>
            Built by hand with Next.js and exported as static files.{" "}
            <a href="https://github.com/adityamittal-dot/Portfolio" target="_blank" rel="noopener noreferrer">
              Read the source
            </a>
            .
          </p>
          <p className={styles.footerHint}>
            Press <kbd>/</kbd> for the console.
          </p>
        </div>
      </footer>
    </section>
  );
}
