


interface ScaleBeamProps {
  rotationDeg: number
  leftSlot: React.ReactNode
  rightSlot: React.ReactNode
}

function ChainLinks() {
  return (
    <svg width={14} height={60} viewBox="0 0 14 60" className="pointer-events-none" aria-hidden="true">
      <defs>
        <linearGradient id="chain-g" x1="0" y1="0" x2="1" y2="0.5">
          <stop offset="0%" stopColor="#8AA4C4" />
          <stop offset="50%" stopColor="#C8D6E8" />
          <stop offset="100%" stopColor="#4E6E94" />
        </linearGradient>
      </defs>
      {/* 5 interlocking oval links */}
      {[0, 12, 24, 36, 48].map((cy, i) => (
        <ellipse
          key={i}
          cx={7}
          cy={cy + 6}
          rx={4}
          ry={6.5}
          fill="none"
          stroke="url(#chain-g)"
          strokeWidth={1.8}
          opacity={0.85 + i * 0.03}
        />
      ))}
    </svg>
  )
}

function BeamBar() {
  return (
    <svg
      viewBox="0 0 640 18"
      className="w-full h-full pointer-events-none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="beam-top" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C8D6E8" />
          <stop offset="40%" stopColor="#8AA4C4" />
          <stop offset="75%" stopColor="#6889AE" />
          <stop offset="100%" stopColor="#3A5474" />
        </linearGradient>
        <linearGradient id="beam-knob" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#C8D6E8" />
          <stop offset="50%" stopColor="#6889AE" />
          <stop offset="100%" stopColor="#3A5474" />
        </linearGradient>
      </defs>

      {/* Main beam bar */}
      <rect x="12" y="3" width="616" height="12" rx="6" fill="url(#beam-top)" />
      {/* Top highlight line */}
      <rect x="40" y="4" width="560" height="1.5" rx="0.75" fill="rgba(200,214,232,0.3)" />

      {/* Left end knob */}
      <circle cx="12" cy="9" r="9" fill="url(#beam-knob)" stroke="#3A5474" strokeWidth="0.8" />
      <circle cx="11" cy="8" r="3" fill="rgba(200,214,232,0.2)" />

      {/* Right end knob */}
      <circle cx="628" cy="9" r="9" fill="url(#beam-knob)" stroke="#3A5474" strokeWidth="0.8" />
      <circle cx="627" cy="8" r="3" fill="rgba(200,214,232,0.2)" />

      {/* Center pivot */}
      <circle cx="320" cy="9" r="13" fill="url(#beam-knob)" stroke="#3A5474" strokeWidth="1" />
      <circle cx="320" cy="9" r="8" fill="none" stroke="#8AA4C4" strokeWidth="0.6" />
      <circle cx="320" cy="9" r="4" fill="#C8D6E8" stroke="#6889AE" strokeWidth="0.8" />
      {/* Highlight dot */}
      <circle cx="318" cy="7" r="1.5" fill="rgba(255,255,255,0.3)" />
    </svg>
  )
}

export function ScaleBeam({ rotationDeg, leftSlot, rightSlot }: ScaleBeamProps) {
  return (
    <div className="relative flex items-start justify-center" style={{ height: 240 }}>
      <div
        style={{
          transform: `rotate(${rotationDeg}deg)`,
          transformOrigin: '50% 9px',
          width: 640,
          height: 18,
          position: 'relative',
          marginTop: 4,
          transition: 'transform 0.5s ease-out',
        }}
      >
        {/* SVG beam bar */}
        <BeamBar />

        {/* Left arm: chain + pan */}
        <div
          className="absolute top-full flex flex-col items-center"
          style={{ left: 12, transform: 'translateX(-50%)' }}
        >
          <ChainLinks />
          <div className="mt-[-2px]">{leftSlot}</div>
        </div>

        {/* Right arm: chain + pan */}
        <div
          className="absolute top-full flex flex-col items-center"
          style={{ right: 12, transform: 'translateX(50%)' }}
        >
          <ChainLinks />
          <div className="mt-[-2px]">{rightSlot}</div>
        </div>
      </div>
    </div>
  )
}
