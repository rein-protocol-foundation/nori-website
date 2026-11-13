/** Brand shapes come from the sources recorded in docs/design/ui-design-v0.4.md. */
const brands: Record<string, string> = {
  Slack: "slack.png",
  GitHub: "github.svg",
  Discord: "discord.svg",
  X: "x.svg",
  Stripe: "stripe.svg",
  PayPal: "paypal.svg",
  Ethereum: "ethereum.svg",
  "BNB Chain": "bnbchain.svg",
  Solana: "solana.svg",
};
export function AppMark({ app }: { app: string }) {
  if (brands[app])
    return (
      <img
        className={`app-icon brand-${app.toLowerCase().replaceAll(" ", "-")}`}
        src={`/brands/${brands[app]}`}
        width="20"
        height="20"
        alt=""
        aria-hidden="true"
      />
    );
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="app-icon"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {app === "Mail" ? (
        <>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 6 9 7 9-7" />
        </>
      ) : app === "Calendar" ? (
        <>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M7 3v4m10-4v4M3 10h18M7 14h3m4 0h3M7 17h3" />
        </>
      ) : (
        <>
          <path d="M5 3h9l5 5v13H5V3Z" />
          <path d="M14 3v6h5M8 13h8M8 17h6" />
        </>
      )}
    </svg>
  );
}
