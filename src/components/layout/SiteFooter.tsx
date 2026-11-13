import { Brand } from "../brand/Nori";
import { links } from "../../content/site";
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Brand />
      <p>Rein Protocol Foundation</p>
      <a href={links.github}>GitHub</a>
      <a href={links.discord}>Discord</a>
    </footer>
  );
}
