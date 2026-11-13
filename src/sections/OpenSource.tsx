import { SectionHeading } from "../components/layout/Section";
import { Actions } from "../components/layout/Actions";
import { NoriHead } from "../components/brand/Nori";
import { links } from "../content/site";
import "./open-source.css";
export function OpenSource() {
  return (
    <section id="open-source" className="section open-source">
      <SectionHeading
        label="Build with us"
        title={
          <>
            Open source.
            <br />
            Built with the community.
          </>
        }
      />
      <div className="open-middle">
        <p>
          Nori brings open-source collaboration to the work of running an
          organization. Follow the work, contribute your perspective, or help
          shape Nori in your organization.
        </p>
        <div className="head-family">
          {[0, 1, 2, 3].map((i) => (
            <NoriHead key={i} variant={i} />
          ))}
        </div>
      </div>
      <Actions pilot />
      <a className="community-link" href={links.discord}>
        Join our Discord server
      </a>
    </section>
  );
}
