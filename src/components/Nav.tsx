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

export default function Nav() {
  return (
    <header className={styles.nav}>
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
          {/* TODO: replace with the real resume PDF URL. */}
          <a href="#" className={`btn btn-primary ${styles.resume}`}>
            resume.pdf ↓
          </a>
        </div>
      </div>
    </header>
  );
}
