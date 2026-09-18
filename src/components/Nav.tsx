"use client";

import { useEffect, useRef } from "react";
import styles from "./Nav.module.css";
import GithubIcon from "./GithubIcon";
import ThemeToggle from "./ThemeToggle";
import { GITHUB_URL } from "@/lib/profile";

const LINKS = [
  { label: "work", href: "#work" },
  { label: "stack", href: "#stack" },
  // TODO: point at a real writing/blog route once one exists.
  { label: "writing", href: "#" },
  { label: "lab", href: "#lab" },
  { label: "about", href: "#about" },
];

const FADE_AT = 72;

export default function Nav() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const header = headerRef.current;
    if (!wrapper || !header) return;

    // The hairline-hover reveal only makes sense on devices with real hover
    // (mouse/trackpad). Touch screens have no hover, so a hidden nav with
    // no way to bring it back is a dead end — those devices just keep the
    // compact pill visible instead of fading it away.
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    let scrolled = false;
    let peeking = false;
    const applyVisibility = () => {
      header.classList.toggle(styles.compact, scrolled);
      wrapper.classList.toggle(styles.hidden, canHover && scrolled && !peeking);
    };

    const onScroll = () => {
      const next = window.scrollY > FADE_AT;
      if (next !== scrolled) {
        scrolled = next;
        applyVisibility();
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    if (!canHover) {
      return () => window.removeEventListener("scroll", onScroll);
    }

    const onEnter = () => {
      peeking = true;
      applyVisibility();
    };
    const onLeave = () => {
      peeking = false;
      applyVisibility();
    };
    wrapper.addEventListener("mouseenter", onEnter);
    wrapper.addEventListener("mouseleave", onLeave);
    wrapper.addEventListener("focusin", onEnter);
    wrapper.addEventListener("focusout", onLeave);

    return () => {
      window.removeEventListener("scroll", onScroll);
      wrapper.removeEventListener("mouseenter", onEnter);
      wrapper.removeEventListener("mouseleave", onLeave);
      wrapper.removeEventListener("focusin", onEnter);
      wrapper.removeEventListener("focusout", onLeave);
    };
  }, []);

  return (
    <div ref={wrapperRef} className={styles.navWrapper}>
      <span className={styles.hairline} aria-hidden="true" />
      <header ref={headerRef} className={styles.nav}>
        <div className={styles.inner}>
          <span className={styles.prompt}>
            aditya<span className={styles.at}>@</span>mittal:~$
          </span>
          <nav className={styles.links}>
            {LINKS.map((link) => (
              <a key={link.label} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
          <div className={styles.actions}>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.iconLink}
              aria-label="GitHub profile"
            >
              <GithubIcon />
            </a>
            <ThemeToggle />
            <a
              href="/aditya-mittal-resume.pdf"
              download="Aditya Mittal - Resume.pdf"
              className={`btn btn-primary ${styles.resume}`}
            >
              resume.pdf ↓
            </a>
          </div>
        </div>
      </header>
    </div>
  );
}
