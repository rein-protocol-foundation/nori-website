import type { ReactNode } from "react";
export function SectionLabel({
  number,
  children,
}: {
  number: string;
  children: ReactNode;
}) {
  return (
    <p className="section-label">
      <span>{number}</span>
      {children}
    </p>
  );
}
export function ExampleLabel({
  children = "Illustrative workflow",
}: {
  children?: ReactNode;
}) {
  return (
    <p className="example-label">
      <span aria-hidden="true" />
      {children}
    </p>
  );
}
export function Check() {
  return (
    <span className="check-mark" aria-hidden="true">
      ✓
    </span>
  );
}
export function DocumentGlyph() {
  return (
    <svg viewBox="0 0 32 40" fill="none" aria-hidden="true">
      <path d="M4 1h16l8 8v30H4Z" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M20 1v9h8M10 19h12m-12 6h12m-12 6h7"
        stroke="currentColor"
        strokeWidth="1.3"
      />
    </svg>
  );
}
