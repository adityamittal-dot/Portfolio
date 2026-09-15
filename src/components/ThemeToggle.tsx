"use client";

import { useEffect, useRef } from "react";
import styles from "./ThemeToggle.module.css";

type Theme = "light" | "dark";

function getSystemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function getCurrentTheme(): Theme {
  const attr = document.documentElement.getAttribute("data-theme");
  return attr === "light" || attr === "dark" ? attr : getSystemTheme();
}

function syncButton(btn: HTMLButtonElement, theme: Theme) {
  btn.setAttribute("aria-label", theme === "light" ? "Switch to dark mode" : "Switch to light mode");
  btn.setAttribute("aria-pressed", String(theme === "light"));
}

export default function ThemeToggle() {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const btn = buttonRef.current;
    if (!btn) return;
    syncButton(btn, getCurrentTheme());

    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onSystemChange = () => syncButton(btn, getCurrentTheme());
    mq.addEventListener("change", onSystemChange);
    return () => mq.removeEventListener("change", onSystemChange);
  }, []);

  const toggle = () => {
    const next: Theme = getCurrentTheme() === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
    const btn = buttonRef.current;
    if (btn) syncButton(btn, next);
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={toggle}
      className={styles.toggle}
      aria-label="Toggle color theme"
    >
      <svg
        className={`${styles.icon} ${styles.sun}`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
      <svg
        className={`${styles.icon} ${styles.moon}`}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M20.5 14.5a8.5 8.5 0 01-11-11 8.5 8.5 0 1011 11z" />
      </svg>
    </button>
  );
}
