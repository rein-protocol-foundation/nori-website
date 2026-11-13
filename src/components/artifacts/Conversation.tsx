import "./conversation.css";
import { NoriHead } from "../brand/Nori";
import { AppMark } from "./AppMark";
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
    <article
      className={`work-surface conversation ${dark ? "discord-surface" : "slack-surface"} ${className}`}
      aria-label={`${dark ? "Discord" : "Slack"} conversation in ${channel}`}
    >
      {!dark && (
        <div className="slack-topbar" aria-hidden="true">
          <AppMark app="Slack" />
          <span>Rein workspace</span>
          <span className="slack-search">Search Rein</span>
        </div>
      )}
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
        <div className="conversation-main">
          <header className="channel-heading">
            <span className="channel-hash" aria-hidden="true">
              #
            </span>
            <b>{channel}</b>
            <span className="channel-tools" aria-hidden="true">
              ⌕ ···
            </span>
          </header>
          <div className="message-day">
            <span>Today</span>
          </div>
          <div className="messages">
            {messages.map(([name, text], i) => (
              <div className="message" key={i}>
                {name === "Nori" ? (
                  <NoriHead />
                ) : (
                  <span className={`person person-${i % 3}`} aria-hidden="true">
                    {name.charAt(0)}
                  </span>
                )}
                <div>
                  <div className="message-meta">
                    <strong>{name}</strong>
                    {name === "Nori" && <small>APP</small>}
                    <time>{`09:${String(41 + i * 2).padStart(2, "0")}`}</time>
                  </div>
                  <p>{text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="message-composer" aria-hidden="true">
            {!dark && (
              <div className="composer-format">
                <b>B</b>
                <i>I</i>
                <span>≡</span>
                <span>⌘</span>
              </div>
            )}
            <span>Message #{channel}</span>
            <div className="composer-tools">＋ &nbsp; ☺ &nbsp; @</div>
          </div>
        </div>
      </div>
    </article>
  );
}
