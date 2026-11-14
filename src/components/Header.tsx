import { useEffect, useRef, useState } from "react";
import { GithubMark, NoriMark } from "./Icons";
export const DISCORD = "https://discord.gg/m8qnWv9XX";
const navigation = [
  ["What Nori does", "#work"],
  ["Meet the team", "#team"],
  ["See Nori at work", "#rein"],
  ["Open source", "#open-source"],
];
export function Header() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [open]);
  return (
    <header className="header">
      <a className="wordmark" href="#main" aria-label="Nori home">
        <NoriMark />
        <span>
          nori<span className="wordmark-dot">.</span>
        </span>
      </a>
      <nav className="desktop-navigation" aria-label="Sections">
        {navigation.map(([label, href]) => (
          <a key={href} href={href}>
            {label}
          </a>
        ))}
      </nav>
      <div className="header-actions">
        <a
          className="github-link"
          aria-label="Nori on GitHub"
          href="https://github.com/rein-protocol-foundation/nori-agent"
        >
          <GithubMark />
        </a>
        <a className="header-cta" href={DISCORD}>
          Meet Nori<span className="header-cta-extra"> in Discord</span>
        </a>
        <button
          ref={menuButton}
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </div>
      {open && (
        <nav
          className="mobile-navigation"
          id="mobile-navigation"
          aria-label="Mobile sections"
        >
          {navigation.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
