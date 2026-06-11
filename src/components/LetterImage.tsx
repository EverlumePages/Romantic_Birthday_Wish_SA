/** Romantic rose bouquet illustration — fills the letter scene right panel. */
export default function LetterImage() {
  return (
    <svg
      viewBox="0 0 300 440"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ width: '100%', height: '100%' }}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <radialGradient id="li-bg" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#ff1493" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#ff1493" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="li-ra" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#ffb6c1" />
          <stop offset="100%" stopColor="#ff1493" />
        </radialGradient>
        <radialGradient id="li-rb" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#ff69b4" />
          <stop offset="100%" stopColor="#c71585" />
        </radialGradient>
        <symbol id="li-heart" viewBox="0 0 32 32">
          <path d="M16 28S4 20.5 4 12.5A6.5 6.5 0 0 1 16 9a6.5 6.5 0 0 1 12 3.5C28 20.5 16 28 16 28z" />
        </symbol>
      </defs>

      {/* ambient glow */}
      <ellipse cx="150" cy="222" rx="140" ry="200" fill="url(#li-bg)" />

      {/* ── HEADER ── */}
      <text x="150" y="36" textAnchor="middle"
        fontFamily="Dancing Script, cursive" fontSize={30}
        fill="#ffb6c1" fillOpacity={0.95}>
        Happy Birthday
      </text>
      <text x="150" y="63" textAnchor="middle"
        fontFamily="Dancing Script, cursive" fontSize={17}
        fill="#ff69b4" fillOpacity={0.82}>
        with all my love ♥
      </text>
      <path d="M55 76 Q150 68 245 76" stroke="#ff69b4" strokeWidth="1.2"
        fill="none" strokeOpacity="0.45" />

      {/* ── STEMS ── */}
      <path d="M150 420 C143 372 128 322 118 252"
        stroke="#ff69b4" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M150 420 C150 365 150 298 150 222"
        stroke="#ff1493" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M150 420 C157 372 172 322 182 254"
        stroke="#ff69b4" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M144 315 C132 286 112 260 96 228"
        stroke="#ff69b4" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M156 315 C168 286 188 260 204 230"
        stroke="#ff69b4" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* leaves */}
      <ellipse cx="133" cy="326" rx="26" ry="9" fill="#ff69b4" fillOpacity="0.36"
        transform="rotate(-40 133 326)" />
      <ellipse cx="170" cy="332" rx="26" ry="9" fill="#ff1493" fillOpacity="0.30"
        transform="rotate(36 170 332)" />
      <ellipse cx="108" cy="267" rx="19" ry="7" fill="#ff69b4" fillOpacity="0.34"
        transform="rotate(-30 108 267)" />
      <ellipse cx="193" cy="268" rx="19" ry="7" fill="#ff1493" fillOpacity="0.30"
        transform="rotate(28 193 268)" />

      {/* ── RIBBON ── */}
      <path d="M130 408 C114 391 116 376 135 394Z" fill="#ff1493" fillOpacity="0.65" />
      <path d="M170 408 C186 391 184 376 165 394Z" fill="#ff1493" fillOpacity="0.65" />
      <ellipse cx="150" cy="402" rx="13" ry="9" fill="#c71585" />
      <path d="M142 405 C126 420 115 426 120 432"
        stroke="#ff69b4" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M158 405 C174 420 185 426 180 432"
        stroke="#ff69b4" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* ── CENTER ROSE (large) ── */}
      <g transform="translate(150 220)">
        {[0,45,90,135,180,225,270,315].map(a => (
          <ellipse key={a} cx={0} cy={-37} rx={15} ry={29}
            fill="#ffb6c1" fillOpacity={0.52} transform={`rotate(${a})`} />
        ))}
        {[22.5,67.5,112.5,157.5,202.5,247.5,292.5,337.5].map(a => (
          <ellipse key={a} cx={0} cy={-25} rx={12} ry={20}
            fill="#ff69b4" fillOpacity={0.58} transform={`rotate(${a})`} />
        ))}
        <circle r={25} fill="url(#li-ra)" />
        <circle r={16} fill="#ff1493" />
        <circle r={8.5} fill="#c71585" />
        <circle r={3.8} fill="#8b0057" />
      </g>

      {/* ── UPPER LEFT ROSE ── */}
      <g transform="translate(96 224)">
        {[0,60,120,180,240,300].map(a => (
          <ellipse key={a} cx={0} cy={-25} rx={11} ry={19}
            fill="#ffb6c1" fillOpacity={0.50} transform={`rotate(${a})`} />
        ))}
        <circle r={17} fill="url(#li-rb)" />
        <circle r={10.5} fill="#c71585" />
        <circle r={4.5} fill="#8b0057" />
      </g>

      {/* ── UPPER RIGHT ROSE ── */}
      <g transform="translate(204 226)">
        {[0,60,120,180,240,300].map(a => (
          <ellipse key={a} cx={0} cy={-24} rx={10.5} ry={18}
            fill="#ffb6c1" fillOpacity={0.50} transform={`rotate(${a})`} />
        ))}
        <circle r={16} fill="url(#li-ra)" />
        <circle r={10} fill="#ff1493" />
        <circle r={4.2} fill="#c71585" />
      </g>

      {/* ── LOWER LEFT ROSE (small) ── */}
      <g transform="translate(112 282)">
        {[0,72,144,216,288].map(a => (
          <ellipse key={a} cx={0} cy={-19} rx={9} ry={14.5}
            fill="#ffb6c1" fillOpacity={0.48} transform={`rotate(${a})`} />
        ))}
        <circle r={13} fill="url(#li-rb)" />
        <circle r={7.5} fill="#c71585" />
        <circle r={3.2} fill="#8b0057" />
      </g>

      {/* ── LOWER RIGHT ROSE (small) ── */}
      <g transform="translate(190 284)">
        {[0,72,144,216,288].map(a => (
          <ellipse key={a} cx={0} cy={-18} rx={8.5} ry={14}
            fill="#ffb6c1" fillOpacity={0.48} transform={`rotate(${a})`} />
        ))}
        <circle r={12} fill="url(#li-ra)" />
        <circle r={7.5} fill="#ff1493" />
        <circle r={3} fill="#c71585" />
      </g>

      {/* ── FLOATING HEARTS (many, scattered) ── */}
      <use href="#li-heart" x={22}  y={92}  width={28} height={28} fill="#ff1493" fillOpacity={0.52} />
      <use href="#li-heart" x={244} y={82}  width={26} height={26} fill="#ff69b4" fillOpacity={0.50} />
      <use href="#li-heart" x={266} y={150} width={20} height={20} fill="#ffb6c1" fillOpacity={0.48} />
      <use href="#li-heart" x={10}  y={160} width={20} height={20} fill="#ff1493" fillOpacity={0.42} />
      <use href="#li-heart" x={270} y={240} width={17} height={17} fill="#ff69b4" fillOpacity={0.42} />
      <use href="#li-heart" x={8}   y={248} width={17} height={17} fill="#ff1493" fillOpacity={0.38} />
      <use href="#li-heart" x={264} y={328} width={15} height={15} fill="#ffb6c1" fillOpacity={0.38} />
      <use href="#li-heart" x={18}  y={340} width={15} height={15} fill="#ff69b4" fillOpacity={0.38} />
      <use href="#li-heart" x={126} y={110} width={13} height={13} fill="#ff1493" fillOpacity={0.35} />
      <use href="#li-heart" x={163} y={108} width={13} height={13} fill="#ff69b4" fillOpacity={0.35} />

      {/* ── SPARKLE DOTS ── */}
      <g fill="#ffb6c1" fillOpacity={0.82}>
        <circle cx={58}  cy={122} r={2.5} />
        <circle cx={242} cy={134} r={2}   />
        <circle cx={272} cy={190} r={3}   />
        <circle cx={26}  cy={200} r={2}   />
        <circle cx={274} cy={290} r={2.5} />
        <circle cx={24}  cy={295} r={2}   />
        <circle cx={202} cy={102} r={2}   />
        <circle cx={96}  cy={110} r={1.5} />
        <circle cx={252} cy={368} r={2}   />
        <circle cx={48}  cy={378} r={2}   />
        <circle cx={150} cy={158} r={1.5} />
        <circle cx={150} cy={380} r={1.5} />
      </g>

      {/* 4-point star sparkles */}
      <g fill="#ff69b4" fillOpacity={0.72}>
        <path d="M224 114 L226 109 L228 114 L233 116 L228 118 L226 123 L224 118 L219 116Z" />
        <path d="M70  164 L72  159 L74  164 L79  166 L74  168 L72  173 L70  168 L65  166Z" />
        <path d="M268 360 L270 355 L272 360 L277 362 L272 364 L270 369 L268 364 L263 362Z" />
        <path d="M30  362 L32  357 L34  362 L39  364 L34  366 L32  371 L30  366 L25  364Z" />
      </g>

      {/* ── FOOTER ── */}
      <text x="150" y="437" textAnchor="middle"
        fontFamily="Dancing Script, cursive" fontSize={15}
        fill="#ff69b4" fillOpacity={0.68}>
        forever yours ♥
      </text>
    </svg>
  )
}
