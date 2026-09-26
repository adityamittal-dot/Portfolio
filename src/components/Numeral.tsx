import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

/** Livery-scale figure. An arrow in the figure ("96→2") is drawn, not typed,
    so it sits on the numerals' optical centre in any face. */
export default function Numeral({ value, label, className }: { value: string; label: string; className?: string }) {
  const parts = value.split("→");
  return (
    <span className={className} role="img" aria-label={label}>
      {parts.map((part, i) => (
        <span key={i} aria-hidden="true" style={{ display: "inline-flex", alignItems: "center" }}>
          {i > 0 && <ArrowRight weight="bold" style={{ width: "0.62em", height: "0.62em", margin: "0 0.06em", opacity: 0.55 }} />}
          {part}
        </span>
      ))}
    </span>
  );
}
