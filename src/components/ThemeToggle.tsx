"use client";

import { useEffect, useRef } from "react";
import { Moon, Sun } from "@phosphor-icons/react/dist/ssr";
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
      <Sun size={18} weight="bold" className={`${styles.icon} ${styles.sun}`} aria-hidden="true" />
      <Moon size={18} weight="bold" className={`${styles.icon} ${styles.moon}`} aria-hidden="true" />
    </button>
  );
}
