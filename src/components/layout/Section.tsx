import type { ReactNode } from "react";
export function SectionHeading({
  label,
  title,
  children,
  center = false,
}: {
  label: string;
  title: ReactNode;
  children?: ReactNode;
  center?: boolean;
}) {
  return (
    <header className={`section-heading ${center ? "center" : ""}`}>
      <p className="eyebrow">{label}</p>
      <h2>{title}</h2>
      {children && <p className="intro">{children}</p>}
    </header>
  );
}
export function ScenarioNote() {
  return <p className="scenario-note">Illustrative product scenario</p>;
}
