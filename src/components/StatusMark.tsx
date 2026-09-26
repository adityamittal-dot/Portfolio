import { Check, Minus } from "@phosphor-icons/react/dist/ssr";
import type { Status } from "@/lib/content";
import styles from "./StatusMark.module.css";

const LABEL: Record<Status, string> = { passed: "Passed", skipped: "Skipped" };

/** The report's one signal: a filled pass mark, or an amber skip mark. */
export default function StatusMark({
  status = "passed",
  size = "md",
  className = "",
}: {
  status?: Status;
  size?: "md" | "lg";
  className?: string;
}) {
  const Icon = status === "passed" ? Check : Minus;
  return (
    <span
      className={`${styles.mark} ${styles[status]} ${styles[size]} ${className}`}
      role="img"
      aria-label={LABEL[status]}
    >
      <Icon weight="bold" aria-hidden="true" />
    </span>
  );
}
