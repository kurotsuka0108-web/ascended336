"use client";

interface LogoMarkProps {
  variant?: "header" | "wall";
  className?: string;
}

export default function LogoMark({ variant = "header", className = "" }: LogoMarkProps) {
  const isWall = variant === "wall";
  const textColor = isWall ? "#0d0d0d" : "#f5f5f0";
  const accentColor = isWall ? "#1a0000" : "#cc0000";
  const oversprayColor = isWall ? "0 0 0 0 0.05  0 0 0 0 0.05  0 0 0 0 0.05  0 0 0 0.18 0"
    : "1 0 0 0 0.8  0.8 0 0 0 0.8  0.8 0 0 0 0.8  0 0 0 0.15 0";

  return (
    <svg
      viewBox="0 0 440 72"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="ASCENDED336"
      role="img"
    >
      <defs>
        {/* Concrete wall texture */}
        <filter id="logo-concrete" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.75 0.65" numOctaves="5" seed="12" result="noise" />
          <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
          <feComponentTransfer in="grayNoise" result="adjustedNoise">
            <feFuncR type="linear" slope="0.25" intercept="0.55" />
            <feFuncG type="linear" slope="0.25" intercept="0.55" />
            <feFuncB type="linear" slope="0.25" intercept="0.55" />
          </feComponentTransfer>
          <feBlend in="SourceGraphic" in2="adjustedNoise" mode="multiply" />
        </filter>

        {/* Spray paint stencil roughness */}
        <filter id="logo-spray" x="-6%" y="-30%" width="112%" height="160%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035 0.07" numOctaves="5" seed="5" result="turbulence" />
          <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="3.5" xChannelSelector="R" yChannelSelector="G" result="displaced" />
          <feComponentTransfer in="displaced" result="stencil">
            <feFuncA type="discrete" tableValues="0 0 0 0 0 0 0.5 1 1 1" />
          </feComponentTransfer>
          {/* Add micro noise for paint grain */}
          <feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="2" seed="9" result="microNoise" />
          <feDisplacementMap in="stencil" in2="microNoise" scale="0.8" result="grainy" />
        </filter>

        {/* Overspray halo */}
        <filter id="logo-overspray" x="-12%" y="-40%" width="124%" height="180%">
          <feMorphology operator="dilate" radius="4" result="expanded" />
          <feGaussianBlur stdDeviation="2.5" result="blurred" />
          <feColorMatrix type="matrix" values={oversprayColor} in="blurred" />
        </filter>

        {/* Slight blur for worn look */}
        <filter id="logo-worn" x="-2%" y="-10%" width="104%" height="120%">
          <feTurbulence type="turbulence" baseFrequency="0.02 0.08" numOctaves="3" seed="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.2" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>

      {/* ── Wall background ── */}
      {isWall && (
        <>
          <rect width="440" height="72" fill="#8c8c7e" filter="url(#logo-concrete)" rx="1" />
          {/* Grime patches */}
          <rect x="0" y="0" width="440" height="72" fill="url(#grime)" opacity="0.3" />
          <ellipse cx="80" cy="60" rx="60" ry="20" fill="#5a5a50" opacity="0.25" />
          <ellipse cx="240" cy="15" rx="50" ry="12" fill="#6a6a5e" opacity="0.2" />
        </>
      )}

      {/* ── Overspray (halo around letters) ── */}
      <text
        x="10" y="54"
        fontFamily="'Bebas Neue', 'Arial Narrow', Impact, sans-serif"
        fontSize="56"
        fontWeight="400"
        letterSpacing="8"
        fill={textColor}
        filter="url(#logo-overspray)"
        aria-hidden="true"
      >
        ASCENDED<tspan fill={accentColor}>336</tspan>
      </text>

      {/* ── Main stencil text ── */}
      <text
        x="10" y="54"
        fontFamily="'Bebas Neue', 'Arial Narrow', Impact, sans-serif"
        fontSize="56"
        fontWeight="400"
        letterSpacing="8"
        fill={textColor}
        filter="url(#logo-spray)"
      >
        ASCENDED<tspan fill={accentColor}>336</tspan>
      </text>

      {/* ── Paint drips ── */}
      <g fill={textColor} filter="url(#logo-worn)" opacity="0.88">
        {/* Drip 1 – under "A" */}
        <path d="M22 56 C21.5 60 21 65 21.2 69 C21.4 71 22 72 22.5 71 C23 69 22.8 64 22.5 58 Z" />
        {/* Drip 2 – thin drip under "S" */}
        <path d="M50 55 C49.8 59 49.6 63 49.7 66 C49.8 67.5 50.3 68 50.6 67 C50.9 65 50.7 60 50.3 55 Z" />
        {/* Drip 3 – longer drip under second "E" */}
        <path d="M122 56 C121.4 62 121 68 121.3 72 C121.5 73 122.2 72 122.5 70 C122.8 66 122.6 61 122 56 Z" />
        {/* Drip 4 – fat drip under "3" */}
        <path d="M227 55 C226.2 60 225.8 67 226 71 Q226.5 73.5 227.5 71 Q228 68 228 63 C227.8 59 227.5 56 227 55 Z" />
        {/* Drip 5 – tiny accent drip under last "6" */}
        <path d="M288 56 C287.8 59 287.7 62 287.9 64.5 C288.1 65.5 288.5 65 288.6 63.5 C288.8 61 288.5 58 288 56 Z" />
      </g>
    </svg>
  );
}
