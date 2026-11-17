import { useEffect, useRef, useState } from "react";
import { GithubMark, NoriMark } from "./Icons";
export const DISCORD = "https://discord.gg/m8qnWv9XX";
const navigation = [
  ["Workflows", "#work"],
  ["One Nori", "#team"],
  ["Nori at Rein", "#rein"],
  ["Build with Nori", "#open-source"],
];
export function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [condensed, setCondensed] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setCondensed(window.scrollY >= 64);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting)
            setActive(entry.target.id ? "#" + entry.target.id : "");
        }
      },
      { rootMargin: "-15% 0px -55% 0px" },
    );
    document
      .querySelectorAll("main > section")
      .forEach((section) => observer.observe(section));
    const desktop = matchMedia("(min-width: 1051px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      observer.disconnect();
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, []);
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
    <header className={`header${condensed ? " is-condensed" : ""}`}>
      <a className="wordmark" href="#main" aria-label="Nori home">
        <NoriMark />
        <span>
          nori<span className="wordmark-dot">.</span>
        </span>
      </a>
      <nav className="desktop-navigation" aria-label="Sections">
        {navigation.map(([label, href]) => (
          <a
            key={href}
            href={href}
            aria-current={active === href ? "location" : undefined}
          >
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
            <a
              key={href}
              href={href}
              onClick={() => {
                setOpen(false);
                const target = document.querySelector(href);
                if (target instanceof HTMLElement) {
                  target.tabIndex = -1;
                  target.focus({ preventScroll: true });
                }
              }}
            >
              {label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
