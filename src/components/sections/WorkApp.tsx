import type { ReactNode } from "react";
export function Head() {
  return <img className="nori-head" src="/nori-reference.png" alt="Nori" />;
}
export function Message({
  name,
  children,
}: {
  name: string;
  children: ReactNode;
}) {
  return (
    <div className="app-message">
      {name === "Nori" ? (
        <Head />
      ) : (
        <span className="human-avatar">{name[0]}</span>
      )}
      <div>
        <b>{name}</b>
        <small> Today at 9:41 AM</small>
        <div>{children}</div>
      </div>
    </div>
  );
}
export function WorkApp({
  app = "Slack",
  channel,
  children,
}: {
  app?: string;
  channel: string;
  children: ReactNode;
}) {
  return (
    <div className={"work-app " + app.toLowerCase()}>
      <div className="app-title">
        {app === "Discord" && (
          <img className="app-brand" src="/brands/discord.svg" alt="" />
        )}
        {app}
        <span>Search your workspace</span>
        <span>•••</span>
      </div>
      <div className="app-layout">
        <aside>
          <b>Your organization</b>
          <p>⌂ Home</p>
          <p>Direct messages</p>
          <p>Activity</p>
          <hr />
          <small>CHANNELS</small>
          <p># general</p>
          <p># operations</p>
          <p className="selected"># {channel}</p>
          <p># engineering</p>
          <p># community</p>
          <hr />
          <small>DIRECT MESSAGES</small>
          <p>● Nori</p>
          <p>○ Alex</p>
          <p>○ Maya</p>
        </aside>
        <div className="app-conversation">
          <header>
            # {channel}
            <span>Members · Search</span>
          </header>
          <div className="app-messages">{children}</div>
          <div className="app-compose">
            + &nbsp; Message #{channel}
            <span>Aa &nbsp; ☺</span>
          </div>
        </div>
      </div>
    </div>
  );
}
