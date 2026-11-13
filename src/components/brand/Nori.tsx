import heads from "../../../docs/design/concepts-v0.4/09-open-source.png";
import portraits from "../../../docs/design/concepts-v0.4/02-roles.png";
export function NoriHead({ variant = 0 }: { variant?: number }) {
  return (
    <span
      className="nori-head"
      aria-hidden="true"
      style={{
        backgroundImage: `url(${heads})`,
        backgroundPosition: `${[56.5, 70.5, 84.3, 98.2][variant]}% 54.5%`,
      }}
    />
  );
}
export function NoriPortrait({ index }: { index: number }) {
  return (
    <div
      className="nori-portrait"
      aria-hidden="true"
      style={{
        backgroundImage: `url(${portraits})`,
        backgroundPosition: `${[6.1, 23.9, 41.3, 58.5, 77.2, 95.2][index]}% 50%`,
      }}
    />
  );
}
export function Brand() {
  return (
    <a className="brand" href="#top" aria-label="Nori home">
      <NoriHead />
      <span>Nori</span>
    </a>
  );
}
