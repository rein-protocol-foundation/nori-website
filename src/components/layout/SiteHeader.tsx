import { Brand } from "../brand/Nori";
import { links, navigation } from "../../content/site";
export function SiteHeader() {
  return (
    <header className="site-header">
      <Brand />
      <nav aria-label="Main navigation">
        {navigation.map(([label, href]) => (
          <a key={href} href={href}>
            {label}
          </a>
        ))}
      </nav>
      <a className="header-cta" href={links.discord}>
        Become a pilot organization
      </a>
    </header>
  );
}
