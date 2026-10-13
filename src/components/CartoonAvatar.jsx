import React from "react";

// Lightweight, fully inline cartoon avatars (no external images).
// Each export is a self-contained SVG with its own clip-path id so
// multiple instances can render on the same page without collisions.

export function SidhantAvatar({ className = "" }) {
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label="Cartoon avatar of Sidhant">
      <defs>
        <radialGradient id="sidhant-bg" cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#123b38" />
          <stop offset="100%" stopColor="#0D0F10" />
        </radialGradient>
        <clipPath id="sidhant-clip">
          <circle cx="50" cy="50" r="48" />
        </clipPath>
      </defs>

      <g clipPath="url(#sidhant-clip)">
        <circle cx="50" cy="50" r="48" fill="url(#sidhant-bg)" />

        {/* shoulders / outfit — tailored blazer, collared shirt + tie */}
        <path d="M11 100 Q50 64 89 100 Z" fill="#1F2937" />
        <path d="M34 78 L49 93 L41 100 L30 100 Z" fill="#F5F5F5" />
        <path d="M66 78 L51 93 L59 100 L70 100 Z" fill="#F5F5F5" />
        <path d="M46.5 88 L53.5 88 L56 100 L44 100 Z" fill="#16E0C4" />

        {/* neck */}
        <rect x="42" y="58" width="16" height="14" rx="6" fill="#E8A978" />

        {/* head */}
        <circle cx="50" cy="42" r="21" fill="#F0B88A" />

        {/* ears */}
        <circle cx="29" cy="43" r="4" fill="#E8A978" />
        <circle cx="71" cy="43" r="4" fill="#E8A978" />

        {/* neat side-parted hair */}
        <path
          d="M27 36 Q26 15 50 14 Q74 15 73 36 Q70 20 52 19 L50 23 L48 19 Q31 21 27 36 Z"
          fill="#15100C"
        />
        <path d="M27 36 Q28 28 32 24 L32 34 Z" fill="#15100C" />
        <path d="M73 36 Q72 28 68 24 L68 34 Z" fill="#15100C" />
        {/* side part highlight */}
        <path d="M45 19 L47 23" stroke="#0D0F10" strokeWidth="0.8" strokeLinecap="round" />

        {/* eyebrows */}
        <rect x="38" y="36" width="9" height="2.2" rx="1.1" fill="#15100C" />
        <rect x="53" y="36" width="9" height="2.2" rx="1.1" fill="#15100C" />

        {/* eyes */}
        <circle cx="42.5" cy="42" r="2.6" fill="#1C1917" />
        <circle cx="57.5" cy="42" r="2.6" fill="#1C1917" />
        <circle cx="43.4" cy="41" r="0.8" fill="#fff" />
        <circle cx="58.4" cy="41" r="0.8" fill="#fff" />

        {/* nose */}
        <path d="M49 42 Q47.5 47 50 48" stroke="#C9895F" strokeWidth="1.4" fill="none" strokeLinecap="round" />

        {/* confident closed-lip smile, clean-shaven */}
        <path d="M43.5 51.5 Q50 54.5 56.5 51.5" stroke="#7A3B1E" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>

      <circle cx="50" cy="50" r="48" fill="none" stroke="#16E0C4" strokeOpacity="0.35" strokeWidth="1.5" />
    </svg>
  );
}

export function DiviyamAvatar({ className = "" }) {
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label="Cartoon avatar of Diviyam">
      <defs>
        <radialGradient id="diviyam-bg" cx="65%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#2c1f45" />
          <stop offset="100%" stopColor="#0D0F10" />
        </radialGradient>
        <clipPath id="diviyam-clip">
          <circle cx="50" cy="50" r="48" />
        </clipPath>
      </defs>

      <g clipPath="url(#diviyam-clip)">
        <circle cx="50" cy="50" r="48" fill="url(#diviyam-bg)" />

        {/* shoulders / outfit — violet hoodie */}
        <path d="M12 100 Q50 66 88 100 Z" fill="#8B5CF6" />
        <path d="M37 76 Q50 90 63 76 L67 100 L33 100 Z" fill="#6D3FD1" />
        <circle cx="42" cy="83" r="1.6" fill="#1C1917" opacity="0.5" />
        <circle cx="58" cy="83" r="1.6" fill="#1C1917" opacity="0.5" />

        {/* neck */}
        <rect x="42" y="58" width="16" height="14" rx="6" fill="#C98455" />

        {/* head */}
        <circle cx="50" cy="42" r="21" fill="#D9925F" />

        {/* ears */}
        <circle cx="29" cy="44" r="4" fill="#C98455" />
        <circle cx="71" cy="44" r="4" fill="#C98455" />

        {/* curly/afro hair made of overlapping bumps */}
        <g fill="#2B1709">
          <circle cx="32" cy="27" r="7" />
          <circle cx="42" cy="21" r="8" />
          <circle cx="50" cy="19" r="8.5" />
          <circle cx="58" cy="21" r="8" />
          <circle cx="68" cy="27" r="7" />
          <circle cx="27" cy="36" r="6" />
          <circle cx="73" cy="36" r="6" />
        </g>

        {/* glasses */}
        <g stroke="#1C1917" strokeWidth="1.6" fill="none">
          <circle cx="42.5" cy="42" r="6.2" fill="#0D0F10" fillOpacity="0.25" />
          <circle cx="57.5" cy="42" r="6.2" fill="#0D0F10" fillOpacity="0.25" />
          <path d="M48.7 42 L51.3 42" />
          <path d="M36.3 40 L33 39" />
          <path d="M63.7 40 L67 39" />
        </g>

        {/* eyes */}
        <circle cx="42.5" cy="42" r="2.3" fill="#1C1917" />
        <circle cx="57.5" cy="42" r="2.3" fill="#1C1917" />
        <circle cx="43.3" cy="41.1" r="0.7" fill="#fff" />
        <circle cx="58.3" cy="41.1" r="0.7" fill="#fff" />

        {/* nose */}
        <path d="M49 43 Q47.5 48 50 49" stroke="#A8673B" strokeWidth="1.4" fill="none" strokeLinecap="round" />

        {/* smile */}
        <path d="M43.5 52 Q50 57.5 56.5 52" stroke="#6E3414" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>

      <circle cx="50" cy="50" r="48" fill="none" stroke="#8B5CF6" strokeOpacity="0.4" strokeWidth="1.5" />
    </svg>
  );
}

export function RushirajAvatar({ className = "" }) {
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label="Cartoon avatar of Rushiraj">
      <defs>
        <linearGradient id="rushiraj-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#123b38" />
          <stop offset="100%" stopColor="#241a3b" />
        </linearGradient>
        <clipPath id="rushiraj-clip">
          <circle cx="50" cy="50" r="48" />
        </clipPath>
      </defs>

      <g clipPath="url(#rushiraj-clip)">
        <circle cx="50" cy="50" r="48" fill="url(#rushiraj-bg)" />

        {/* shoulders / outfit — zip-up builder jacket */}
        <path d="M13 100 Q50 67 87 100 Z" fill="#C084FC" />
        <path d="M37 76 L50 100 L63 76 L58 100 L42 100 Z" fill="#8B5CF6" />
        <path d="M49 82 L51 82 L52 100 L48 100 Z" fill="#F5F5F5" opacity="0.85" />
        <circle cx="50.5" cy="84" r="1.1" fill="#F5F5F5" opacity="0.85" />
        <circle cx="50.5" cy="90" r="1.1" fill="#F5F5F5" opacity="0.85" />

        {/* neck */}
        <rect x="42" y="58" width="16" height="14" rx="6" fill="#B9794C" />

        {/* head */}
        <circle cx="50" cy="42" r="21" fill="#C9804F" />

        {/* ears */}
        <circle cx="29" cy="44" r="4" fill="#B9794C" />
        <circle cx="71" cy="44" r="4" fill="#B9794C" />

        {/* undercut — shaved sides, textured spiky top */}
        <path
          d="M30 32 Q31 17 50 16 Q69 17 70 32 L65 32 Q63 20 50 19.5 Q37 20 35 32 Z"
          fill="#20120A"
        />
        <path
          d="M33 23 L36 16 L39 23 L42 15 L45 23 L48 14.5 L51 23 L54 15 L57 23 L60 16 L63 23 L65 27 L35 27 Z"
          fill="#20120A"
        />

        {/* short trimmed beard (jaw only, not full cheeks) */}
        <path
          d="M32 47 Q32 60 50 63 Q68 60 68 47 L64 47 Q63 57 50 59 Q37 57 36 47 Z"
          fill="#20120A"
          opacity="0.9"
        />

        {/* eyebrows */}
        <rect x="38" y="36" width="9" height="2.4" rx="1.2" fill="#20120A" />
        <rect x="53" y="36" width="9" height="2.4" rx="1.2" fill="#20120A" />

        {/* eyes */}
        <circle cx="42.5" cy="41.5" r="2.5" fill="#1C1917" />
        <circle cx="57.5" cy="41.5" r="2.5" fill="#1C1917" />
        <circle cx="43.4" cy="40.6" r="0.8" fill="#fff" />
        <circle cx="58.4" cy="40.6" r="0.8" fill="#fff" />

        {/* nose */}
        <path d="M49 42 Q47.5 47 50 48" stroke="#9C5F32" strokeWidth="1.4" fill="none" strokeLinecap="round" />

        {/* easy grin */}
        <path d="M43 52 Q50 57 57 52" stroke="#120B04" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      </g>

      <circle cx="50" cy="50" r="48" fill="none" stroke="#C084FC" strokeOpacity="0.4" strokeWidth="1.5" />
    </svg>
  );
}
