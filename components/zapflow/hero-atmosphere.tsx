const flowPaths = [
  "M -60 742 C 260 748 520 706 720 560 S 1010 318 1260 272",
  "M -60 796 C 340 790 660 770 880 640 S 1120 512 1260 528",
]

export function HeroAtmosphere() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="atmos-base absolute inset-0" />
      <div className="atmos-light atmos-amber absolute" />
      <div className="atmos-light atmos-green absolute" />
      <div className="dot-grid absolute inset-0" />
      <div className="atmos-fade absolute inset-x-0 bottom-0 h-40" />
    </div>
  )
}

export function FlowLines() {
  return (
    <svg
      aria-hidden="true"
      className="flow-lines pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
      viewBox="0 0 1200 800"
      preserveAspectRatio="none"
      fill="none"
    >
      <defs>
        <linearGradient id="flow-stroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="var(--primary)" stopOpacity="0" />
          <stop offset="0.35" stopColor="var(--primary)" stopOpacity="0.5" />
          <stop offset="0.8" stopColor="var(--accent)" stopOpacity="0.6" />
          <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {flowPaths.map((d, index) => (
        <g key={d}>
          <path d={d} stroke="url(#flow-stroke)" strokeWidth="1" vectorEffect="non-scaling-stroke" opacity="0.32" />
          <path
            d={d}
            pathLength={1000}
            className="flow-pulse"
            style={{ animationDelay: `${index * -5.5}s` }}
            stroke={index === 0 ? "var(--accent)" : "var(--primary)"}
            strokeWidth="2"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </g>
      ))}
    </svg>
  )
}
