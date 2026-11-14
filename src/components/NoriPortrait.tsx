type Props = { hair?: string; accent?: string; accessory?: string };
/** Small vector role portraits retain Nori's ears, fringe, capsule eyes and antenna. */
export function NoriPortrait({
  hair = "#9dcfba",
  accent = "#e7b4bd",
  accessory = "jacket",
}: Props) {
  return (
    <svg
      viewBox="0 0 160 170"
      fill="none"
      aria-hidden="true"
      className="nori-portrait"
    >
      <ellipse cx="81" cy="157" rx="49" ry="7" fill="#314236" opacity=".1" />
      <path d="M39 149c3-25 17-39 41-39s39 14 42 39v12H39Z" fill="#35443f" />
      <path d="m65 115 15 22 16-22-7 39H72Z" fill="#f3eee1" />
      <path
        d="M36 68 30 17c1-5 4-5 7-2l33 28m26-1 26-26c4-4 7-2 7 3l-2 50"
        fill={hair}
        stroke="#31443c"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="m38 28 4 31 18-14m48 0 13-16-1 31" fill={accent} />
      <path
        d="M29 78c-3-35 18-48 50-48 35 0 54 19 52 52l-4 49-21-3-26 8-30-9-21 5Z"
        fill={hair}
        stroke="#31443c"
        strokeWidth="2"
      />
      <path
        d="M42 75c0-25 18-35 38-35 25 0 39 18 39 40v14c0 25-17 37-38 37S42 117 42 94Z"
        fill="#f7ead6"
      />
      <path
        d="M34 78c6-37 24-43 48-42 26 0 42 13 45 42L110 64l2 22-20-30-5 29-16-26-12 20-3-14-13 23Z"
        fill={hair}
      />
      <path d="M47 71c9-22 22-31 37-32L68 66l-9 13 1-21Z" fill={accent} />
      <path
        d="M63 87v12m35-12v12"
        stroke="#28342c"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <ellipse cx="54" cy="107" rx="8" ry="4" fill={accent} opacity=".7" />
      <ellipse cx="106" cy="107" rx="8" ry="4" fill={accent} opacity=".7" />
      <path
        d="m76 110 4 3 4-3"
        stroke="#967f6d"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path d="m107 37 7-14" stroke="#31443c" strokeWidth="3" />
      <circle
        cx="116"
        cy="19"
        r="5"
        fill={accent}
        stroke="#31443c"
        strokeWidth="2"
      />
      {accessory === "glasses" && (
        <g stroke="#39483f" strokeWidth="2">
          <rect x="50" y="79" width="25" height="25" rx="9" />
          <rect x="86" y="79" width="25" height="25" rx="9" />
          <path d="M75 89h11m-43-5 7 3m61 0 9-3" />
        </g>
      )}
      {accessory === "headset" && (
        <g>
          <path
            d="M34 86c-2-29 17-49 46-49s49 19 47 49"
            stroke="#34483f"
            strokeWidth="5"
          />
          <rect
            x="29"
            y="79"
            width="12"
            height="25"
            rx="5"
            fill="#f3eee1"
            stroke="#34483f"
            strokeWidth="2"
          />
          <rect
            x="119"
            y="79"
            width="12"
            height="25"
            rx="5"
            fill="#f3eee1"
            stroke="#34483f"
            strokeWidth="2"
          />
          <path d="M125 102v7l-21 8" stroke="#34483f" strokeWidth="2" />
          <rect x="96" y="113" width="12" height="5" rx="2" fill="#34483f" />
        </g>
      )}
      {accessory === "cap" && (
        <g>
          <path d="M42 57c3-20 18-29 40-29 22 0 39 13 40 29Z" fill="#35443f" />
          <path
            d="M36 57c22-8 59-6 92 1l7 7c-32-8-64-10-99-4Z"
            fill="#263a31"
          />
          <rect x="76" y="39" width="8" height="8" rx="1" fill="#d7e3bb" />
        </g>
      )}
      <path d="m57 134 11 25m36-25-11 25" stroke="#647367" strokeWidth="1.5" />
    </svg>
  );
}
