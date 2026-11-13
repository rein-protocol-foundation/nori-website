import { links } from "../../content/site";
export function Actions({ pilot = false }: { pilot?: boolean }) {
  return (
    <div className="actions">
      <a className="button" href={links.discord}>
        {pilot ? "Become a pilot organization" : "Meet Nori in Discord"}
      </a>
      <a className="button outline" href={pilot ? links.github : links.discord}>
        {pilot ? "Explore GitHub" : "Become a pilot organization"}
      </a>
    </div>
  );
}
