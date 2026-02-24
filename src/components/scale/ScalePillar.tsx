export function ScalePillar() {
  return (
    <svg viewBox="0 0 100 200" width={90} height={180} className="pointer-events-none select-none" aria-hidden="true">
      <defs>
        {/* Horizontal metallic gradient for column */}
        <linearGradient id="pillar-col" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3A5474" />
          <stop offset="18%" stopColor="#6889AE" />
          <stop offset="40%" stopColor="#C8D6E8" />
          <stop offset="60%" stopColor="#8AA4C4" />
          <stop offset="85%" stopColor="#4E6E94" />
          <stop offset="100%" stopColor="#3A5474" />
        </linearGradient>
        {/* Angled metallic for caps/base */}
        <linearGradient id="pillar-cap" x1="0" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="#C8D6E8" />
          <stop offset="35%" stopColor="#8AA4C4" />
          <stop offset="70%" stopColor="#6889AE" />
          <stop offset="100%" stopColor="#3A5474" />
        </linearGradient>
        {/* Base gradient */}
        <linearGradient id="pillar-base" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6889AE" />
          <stop offset="40%" stopColor="#4E6E94" />
          <stop offset="100%" stopColor="#263B54" />
        </linearGradient>
      </defs>

      {/* === Capital (ornamental top) === */}
      {/* Upper volute */}
      <path
        d="M30 4 L70 4 Q74 4 74 8 L74 12 L26 12 L26 8 Q26 4 30 4Z"
        fill="url(#pillar-cap)"
        stroke="#3A5474"
        strokeWidth="0.5"
      />
      {/* Capital flare */}
      <path d="M24 12 L76 12 L72 22 L28 22 Z" fill="url(#pillar-cap)" stroke="#3A5474" strokeWidth="0.5" />
      {/* Decorative ring */}
      <rect x="34" y="22" width="32" height="4" rx="1" fill="url(#pillar-cap)" stroke="#3A5474" strokeWidth="0.3" />
      {/* Thin neck */}
      <rect x="36" y="26" width="28" height="3" rx="0.5" fill="url(#pillar-col)" />

      {/* === Column (fluted shaft) === */}
      <rect x="37" y="29" width="26" height="125" rx="2" fill="url(#pillar-col)" />
      {/* Fluting — vertical grooves */}
      <line x1="41" y1="32" x2="41" y2="151" stroke="rgba(58,84,116,0.2)" strokeWidth="0.6" />
      <line x1="45" y1="32" x2="45" y2="151" stroke="rgba(200,214,232,0.2)" strokeWidth="0.4" />
      <line x1="50" y1="32" x2="50" y2="151" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
      <line x1="55" y1="32" x2="55" y2="151" stroke="rgba(200,214,232,0.2)" strokeWidth="0.4" />
      <line x1="59" y1="32" x2="59" y2="151" stroke="rgba(58,84,116,0.2)" strokeWidth="0.6" />
      {/* Center highlight stripe */}
      <rect x="48" y="30" width="4" height="123" rx="1" fill="rgba(200,214,232,0.08)" />

      {/* === Base collar === */}
      <rect x="34" y="154" width="32" height="4" rx="1" fill="url(#pillar-cap)" stroke="#3A5474" strokeWidth="0.3" />
      <path d="M30 158 L70 158 L74 164 L26 164 Z" fill="url(#pillar-cap)" stroke="#3A5474" strokeWidth="0.4" />

      {/* === Base (wide pedestal) === */}
      <path
        d="M20 164 L80 164 L84 180 Q84 192 74 192 L26 192 Q16 192 16 180 Z"
        fill="url(#pillar-base)"
        stroke="#3A5474"
        strokeWidth="0.5"
      />
      {/* Base highlight */}
      <path d="M30 167 L70 167 L72 175 L28 175 Z" fill="rgba(200,214,232,0.08)" />
      {/* Ground shadow */}
      <ellipse cx="50" cy="194" rx="36" ry="4" fill="rgba(30,42,56,0.08)" />
    </svg>
  )
}
