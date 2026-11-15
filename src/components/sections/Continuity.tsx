import { DocumentGlyph, ExampleLabel, SectionLabel } from "./Section";
const records = [
  {
    index: "01",
    type: "Decision record",
    title: "Last quarter’s decision.\nThis quarter’s follow-through.",
    fields: [
      ["Keep", "The decision, its rationale, and the people responsible."],
      ["Continue", "The next check-in and what remains unresolved."],
    ],
    audience: "For the relevant team & decision-makers",
  },
  {
    index: "02",
    type: "Member handoff",
    title: "A new person.\nA clear place to begin.",
    fields: [
      ["Keep", "Open tasks, relationship context, and access boundaries."],
      ["Continue", "Who to contact, what is due, and the next useful action."],
    ],
    audience: "For the incoming owner, with appropriate access",
  },
  {
    index: "03",
    type: "Supporter commitment",
    title: "A promise made.\nAn update that follows.",
    fields: [
      ["Keep", "The commitment, purpose, and communication context."],
      ["Continue", "Follow up on support and send the agreed project update."],
    ],
    audience: "For the people responsible for the relationship",
  },
];
export function Continuity() {
  return (
    <section
      className="section continuity-section"
      id="continuity"
      aria-labelledby="continuity-title"
    >
      <div className="section-inner">
        <div className="section-heading split-heading">
          <div>
            <SectionLabel number="07">Long-term continuity</SectionLabel>
            <h2 id="continuity-title">
              The work continues.
              <br />
              <strong>Even as the team changes.</strong>
            </h2>
          </div>
          <p className="heading-aside">
            Keep decisions, commitments, and relationships connected across
            weeks, quarters, and team changes. Give the next person the context
            to continue, not a pile of disconnected tasks.
          </p>
        </div>
        <ExampleLabel>Illustrative work records</ExampleLabel>
        <div className="continuity-records">
          {records.map((record) => (
            <article className="continuity-record" key={record.index}>
              <div className="record-topline">
                <span>{record.type}</span>
                <span>{record.index}</span>
              </div>
              <DocumentGlyph />
              <h3>
                {record.title.split("\n").map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </h3>
              <dl>
                {record.fields.map(([label, text]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{text}</dd>
                  </div>
                ))}
              </dl>
              <p className="record-audience">{record.audience}</p>
            </article>
          ))}
        </div>
        <div className="trust-line">
          <h3>
            Clear roles. Appropriate access.
            <br />
            <strong>A record of what happened.</strong>
          </h3>
          <p>
            Nori’s responsibilities should fit the organization’s policies, with
            people involved where decisions and authority require them. Context
            stays within the access boundaries of the work.
          </p>
        </div>
      </div>
    </section>
  );
}
