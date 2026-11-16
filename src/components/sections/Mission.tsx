export function Mission() {
  return (
    <section
      className="mission-section section"
      aria-labelledby="mission-title"
    >
      <div className="section-inner mission-layout">
        <p className="eyebrow">Made for the long term</p>
        <div>
          <h2 id="mission-title">
            The ambition is yours.
            <br />
            <span className="muted-title">The follow-through is shared.</span>
          </h2>
          <p>
            Important work lives between meetings, messages, and people. Nori is
            designed to connect it—so a decision becomes a next step, and a next
            step keeps moving.
          </p>
        </div>
      </div>
      <div
        className="section-inner mission-index"
        aria-label="Explore Nori’s approach"
      >
        <a href="#work">
          <span>01</span>Carry the work
        </a>
        <a href="#resources">
          <span>02</span>Respect the responsibility
        </a>
        <a href="#continuity">
          <span>03</span>Keep the context
        </a>
      </div>
    </section>
  );
}
