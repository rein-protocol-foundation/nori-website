import { AppMark } from "./AppMark";
import type { ReactNode } from "react";
export function WorkSurface({
  title,
  children,
  className = "",
  app = "Document",
}: {
  title: string;
  children: ReactNode;
  className?: string;
  app?: string;
}) {
  return (
    <article className={`work-surface ${className}`}>
      <header className="surface-bar">
        <AppMark app={app} />
        <span>{title}</span>
        <span className="surface-app">{app}</span>
      </header>
      <div className="surface-body">{children}</div>
    </article>
  );
}
export function Status({ children }: { children: ReactNode }) {
  return <span className="status">{children}</span>;
}
export function Checklist({ items }: { items: readonly string[] }) {
  return (
    <ul className="checklist">
      {items.map((item) => (
        <li key={item}>
          <span aria-hidden="true">✓</span>
          {item}
        </li>
      ))}
    </ul>
  );
}
