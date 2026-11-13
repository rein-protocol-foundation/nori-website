/** Small, decorative source markers; labels carry the accessible meaning. */
export function AppMark({ app }: { app: string }) {
  if (app === "Slack")
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="app-icon">
        <rect x="3" y="8" width="9" height="4" rx="2" fill="#36c5f0" />
        <rect x="8" y="1" width="4" height="6" rx="2" fill="#36c5f0" />
        <rect x="12" y="3" width="4" height="9" rx="2" fill="#2eb67d" />
        <rect x="17" y="8" width="6" height="4" rx="2" fill="#2eb67d" />
        <rect x="12" y="12" width="9" height="4" rx="2" fill="#ecb22e" />
        <rect x="12" y="17" width="4" height="6" rx="2" fill="#ecb22e" />
        <rect x="8" y="12" width="4" height="9" rx="2" fill="#e01e5a" />
        <rect x="1" y="12" width="6" height="4" rx="2" fill="#e01e5a" />
      </svg>
    );
  if (app === "X")
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="app-icon">
        <path
          d="M4 3h4l12 18h-4L4 3zm16 0L4 21"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        />
      </svg>
    );
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="app-icon"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {app === "Mail" ? (
        <>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 6 9 7 9-7" />
        </>
      ) : app === "GitHub" ? (
        <>
          <circle cx="6" cy="5" r="2" />
          <circle cx="6" cy="19" r="2" />
          <circle cx="18" cy="6" r="2" />
          <path d="M6 7v10m0-3h5a7 7 0 0 0 7-6" />
        </>
      ) : app === "Discord" ? (
        <>
          <path d="M5 7c4-3 10-3 14 0l3 11-6 2-1-3H9l-1 3-6-2L5 7Z" />
          <circle cx="8" cy="12" r="1" />
          <circle cx="16" cy="12" r="1" />
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
