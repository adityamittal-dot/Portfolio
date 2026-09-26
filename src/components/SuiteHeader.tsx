import styles from "./SuiteHeader.module.css";

/** Section heading in the report's grammar: the suite name, and on the
    right the spec file it came from with its result. */
export default function SuiteHeader({
  id,
  title,
  file,
  result,
}: {
  id: string;
  title: string;
  file?: string;
  result?: React.ReactNode;
}) {
  return (
    <header className={styles.header}>
      <h2 id={`${id}-title`} className={styles.title}>
        {title}
      </h2>
      {(file || result) && (
        <p className={styles.meta}>
          {file && <span className="mono">{file}</span>}
          {result && <span className={styles.result}>{result}</span>}
        </p>
      )}
    </header>
  );
}
