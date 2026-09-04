import styles from "./Nav.module.css";

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
        {/* TODO: replace with the real resume PDF URL. */}
        <a href="#" className={`btn btn-primary ${styles.resume}`}>
          resume.pdf ↓
        </a>
      </div>
    </header>
  );
}
