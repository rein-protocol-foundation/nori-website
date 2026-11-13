import { NoriHead } from "../brand/Nori";
import { WorkSurface } from "./WorkSurface";
export type Message = readonly [name: string, text: string];
export function Conversation({
  channel,
  messages,
  dark = false,
  className = "",
}: {
  channel: string;
  messages: readonly Message[];
  dark?: boolean;
  className?: string;
}) {
  return (
    <WorkSurface
      title={`# ${channel}`}
      app={dark ? "Discord" : "Slack"}
      className={`conversation ${dark ? "discord-surface" : ""} ${className}`}
    >
      <div className="conversation-layout">
        {dark && (
          <aside aria-hidden="true">
            <strong>Nori Community</strong>
            <span>Welcome</span>
            <span># introductions</span>
            <span># questions</span>
            <span>Contribute</span>
            <b># {channel}</b>
            <span># development</span>
            <span># office-hours</span>
          </aside>
        )}
        <div className="messages">
          {messages.map(([name, text], i) => (
            <div className="message" key={i}>
              {name === "Nori" ? (
                <NoriHead />
              ) : (
                <span className="person" aria-hidden="true">
                  {name.charAt(0)}
                </span>
              )}
              <div>
                <strong>
                  {name}
                  {name === "Nori" && <small>APP</small>}
                </strong>
                <p>{text}</p>
              </div>
            </div>
          ))}
          <div className="thread-end">
            <span aria-hidden="true">✓</span> Context and follow-up kept with
            the work
          </div>
        </div>
      </div>
    </WorkSurface>
  );
}
