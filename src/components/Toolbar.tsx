"use client";

import { useEffect, useRef, useState } from "react";
import { DownloadSimple, GithubLogo } from "@phosphor-icons/react/dist/ssr";
import ThemeToggle from "./ThemeToggle";
import { GITHUB_URL } from "@/lib/profile";
import { OPEN_CONSOLE_EVENT } from "./CommandPalette";
import styles from "./Toolbar.module.css";

const TABS = [
  { id: "work", label: "Work" },
  { id: "stack", label: "Stack" },
  { id: "lab", label: "Lab" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export default function Toolbar() {
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // The active tab is the last section whose top has passed the band just
    // under the toolbar, the way a report highlights the suite you're
    // reading. At the very bottom, the last section wins even if it's short.
    const sections = TABS.map((t) => document.getElementById(t.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 8);
      const line = window.innerHeight * 0.3;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      let current: string | null = null;
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= line) current = section.id;
      }
      if (atBottom && sections.length) current = sections[sections.length - 1].id;
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Keep the active tab in view when the tab row scrolls sideways on
  // phones; back at the top, the row returns to its start. Adjusts only the
  // row's own scrollLeft so the page itself never jumps.
  useEffect(() => {
    const row = tabsRef.current;
    if (!row || row.scrollWidth <= row.clientWidth) return;
    const el = active ? row.querySelector<HTMLElement>(`[data-tab="${active}"]`) : null;
    if (!el) {
      row.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }
    const left = el.offsetLeft - row.offsetLeft;
    const right = left + el.offsetWidth;
    if (left < row.scrollLeft + 16) row.scrollTo({ left: Math.max(0, left - 16), behavior: "smooth" });
    else if (right > row.scrollLeft + row.clientWidth - 24)
      row.scrollTo({ left: right - row.clientWidth + 24, behavior: "smooth" });
  }, [active]);

  return (
    <header className={`${styles.toolbar} ${scrolled ? styles.scrolled : ""}`}>
      <div className={`container ${styles.inner}`}>
        <a href="#top" className={styles.brand}>
          Aditya Mittal
        </a>

        <nav aria-label="Sections" className={styles.tabs} ref={tabsRef}>
          {TABS.map((tab) => (
            <a
              key={tab.id}
              href={`#${tab.id}`}
              data-tab={tab.id}
              className={styles.tab}
              aria-current={active === tab.id ? "location" : undefined}
            >
              {tab.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.console}
            onClick={() => window.dispatchEvent(new Event(OPEN_CONSOLE_EVENT))}
            aria-label="Open command console"
            title="Command console"
          >
            <span className={styles.consoleLabel}>Console</span>
            <kbd className={styles.kbd}>/</kbd>
          </button>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.icon}
            aria-label="GitHub profile"
          >
            <GithubLogo size={20} weight="fill" />
          </a>
          <ThemeToggle />
          <a
            href="/aditya-mittal-resume.pdf"
            download="Aditya Mittal - Resume.pdf"
            className={`button button-secondary ${styles.resume}`}
            aria-label="Download resume (PDF)"
          >
            <DownloadSimple size={16} weight="bold" aria-hidden="true" />
            Resume
          </a>
        </div>
      </div>
    </header>
  );
}
