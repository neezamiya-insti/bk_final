"use client";

import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";
import { Playfair_Display, Poppins } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-playfair",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-poppins",
});

const LANG_KEY = "bk-lang";
type LangCode = "EN" | "AR" | "FR";

const LABELS = {
  EN: {
    stages: ["LOCAL PRODUCER", "MARKET RESEARCH", "BUYER MATCH", "GLOBAL MARKET"],
    tagline: "Global Trade · Local Expertise",
    aria: "Loading Boyut Al-Kawthar",
  },
  AR: {
    stages: ["منتج محلي", "أبحاث السوق", "مطابقة المشترين", "السوق العالمي"],
    tagline: "تجارة عالمية . خبرة محلية",
    aria: "جاري تحميل بيوت الكوثر",
  },
  FR: {
    stages: ["PRODUCTEUR LOCAL", "ÉTUDE DE MARCHÉ", "MISE EN RELATION", "MARCHÉ MONDIAL"],
    tagline: "Commerce mondial · Expertise locale",
    aria: "Chargement de Boyut Al-Kawthar",
  },
} as const;

// Total life of the preloader:
// stages/route (~4s) → content fades (4.0s) → doors open (4.3s, 1.0s) → remove
const REMOVE_AFTER_MS = 5400;

const ROUTE_PATH = "M55,110 Q105,85 155,110 Q205,135 255,110 Q305,85 355,110";

// Read the saved language without setState-in-effect (hydration-safe:
// server + first client render use "EN", then it syncs to localStorage).
function subscribeLang(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("bk-lang-change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("bk-lang-change", callback);
  };
}

function getLangSnapshot(): LangCode {
  const saved = window.localStorage.getItem(LANG_KEY);
  return saved === "AR" || saved === "EN" || saved === "FR" ? saved : "EN";
}

function getLangServerSnapshot(): LangCode {
  return "EN";
}

export default function Preloader() {
  const [removed, setRemoved] = useState(false);
  const lang = useSyncExternalStore(subscribeLang, getLangSnapshot, getLangServerSnapshot);

  // Remove from DOM after the doors finish opening + lock page scroll meanwhile
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timer = window.setTimeout(() => {
      document.body.style.overflow = prevOverflow;
      setRemoved(true);
    }, REMOVE_AFTER_MS);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  if (removed) return null;

  const t = LABELS[lang];
  const isAr = lang === "AR";

  return (
    <div
      role="status"
      aria-label={t.aria}
      aria-live="polite"
      dir="ltr"
      className={`${playfair.variable} ${poppins.variable} pl-root fixed inset-0 z-[200] overflow-hidden`}
    >
      {/* Two doors — they slide apart at the end to reveal the site */}
      <div className="pl-door pl-door-left absolute inset-y-0 left-0 w-[calc(50%+1px)]" />
      <div className="pl-door pl-door-right absolute inset-y-0 right-0 w-[calc(50%+1px)]" />

      {/* Content (fades out right before the doors open) */}
      <div className="pl-content absolute inset-0 z-10 flex flex-col items-center justify-center">
        {/* Subtle gold dot pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:radial-gradient(#F5B301_1px,transparent_1px)] [background-size:28px_28px]" />

        <div className="relative flex w-full flex-col items-center px-4">
          {/* Export journey animation */}
          <svg
            viewBox="0 0 400 200"
            className={`pl-svg h-auto w-[min(560px,94vw)] ${isAr ? "pl-ar" : ""}`}
            aria-hidden="true"
          >
            <path className="pl-route" d={ROUTE_PATH} />

            {/* Stage 1 — Local producer */}
            <g className="pl-stage pl-s1 pl-lit" transform="translate(55,110)">
              <circle className="pl-pulse pl-p1" r="10" />
              <rect className="pl-icon-fill" x="-14" y="-4" width="28" height="16" />
              <path className="pl-icon-shape" d="M-14,-4 L-14,-14 L-7,-8 L0,-14 L7,-8 L14,-14 L14,-4" />
              <rect className="pl-icon-shape" x="8" y="-20" width="4" height="10" />
              <text className="pl-label" x="0" y="30" textAnchor="middle">{t.stages[0]}</text>
            </g>

            {/* Stage 2 — Market research */}
            <g className="pl-stage pl-s2 pl-lit" transform="translate(155,110)">
              <circle className="pl-pulse pl-p2" r="10" />
              <circle className="pl-icon-shape" cx="-2" cy="-3" r="8" />
              <line className="pl-icon-shape" x1="4" y1="3" x2="12" y2="11" />
              <text className="pl-label" x="0" y="30" textAnchor="middle">{t.stages[1]}</text>
            </g>

            {/* Stage 3 — Buyer match */}
            <g className="pl-stage pl-s3 pl-lit" transform="translate(255,110)">
              <circle className="pl-pulse pl-p3" r="10" />
              <circle className="pl-icon-shape" cx="-8" cy="-2" r="6" />
              <circle className="pl-icon-shape" cx="8" cy="-2" r="6" />
              <line className="pl-icon-shape" x1="-2" y1="-2" x2="2" y2="-2" />
              <text className="pl-label" x="0" y="30" textAnchor="middle">{t.stages[2]}</text>
            </g>

            {/* Stage 4 — Global market */}
            <g className="pl-stage pl-s4 pl-lit" transform="translate(355,110)">
              <circle className="pl-pulse pl-p4" r="10" />
              <circle className="pl-icon-shape" cx="0" cy="-2" r="12" />
              <ellipse className="pl-icon-shape" cx="0" cy="-2" rx="5" ry="12" />
              <line className="pl-icon-shape" x1="-12" y1="-2" x2="12" y2="-2" />
              <path className="pl-check" d="M-5,-2 L-1,3 L7,-8" />
              <text className="pl-label" x="0" y="34" textAnchor="middle">{t.stages[3]}</text>
            </g>

            {/* Moving arrow (animated with CSS, see .pl-package) */}
            <g className="pl-package">
              <polygon points="9,0 -9,-4.5 -4,0 -9,4.5" />
            </g>
          </svg>

          {/* Real logo + tagline */}
          <div className="pl-brand mt-2 flex flex-col items-center text-center sm:mt-4">
            <Image
              src="/logo-Boyot-1.png"
              alt="Boyut Al-Kawthar"
              width={240}
              height={110}
              priority
              className="h-14 w-52 object-contain sm:h-16 sm:w-60"
            />
            <p
              className={`mt-3 font-[family-name:var(--font-poppins)] text-[10px] font-light text-[#F8D36F] sm:text-[11px] ${
                isAr ? "tracking-normal" : "uppercase tracking-[0.26em]"
              }`}
            >
              {t.tagline}
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .pl-root {
          --pl-deep: #143623;
          --pl-green: #2C7046;
          --pl-gold: #F5B301;
          --pl-gold-soft: #F8D36F;
          --pl-dim: rgba(255,255,255,0.32);
        }

        /* ───────── Doors ───────── */
        .pl-door {
          background: linear-gradient(180deg, var(--pl-deep), var(--pl-green));
          will-change: transform;
        }
        .pl-door-left {
          animation: pl-door-left 1s cubic-bezier(.77,0,.18,1) 4.3s forwards;
        }
        .pl-door-right {
          animation: pl-door-right 1s cubic-bezier(.77,0,.18,1) 4.3s forwards;
        }
        @keyframes pl-door-left  { 0% { box-shadow: none; } 15% { box-shadow: 8px 0 24px rgba(0,0,0,0.3); } 100% { transform: translateX(-120%); box-shadow: 8px 0 24px rgba(0,0,0,0.3); } }
        @keyframes pl-door-right { 0% { box-shadow: none; } 15% { box-shadow: -8px 0 24px rgba(0,0,0,0.3); } 100% { transform: translateX(120%); box-shadow: -8px 0 24px rgba(0,0,0,0.3); } }

        /* Content fades out just before the doors open */
        .pl-content { animation: pl-content-out 0.4s ease-in 4.0s forwards; }
        @keyframes pl-content-out { to { opacity: 0; } }

        .pl-svg text { font-family: var(--font-poppins), Arial, sans-serif; }

        .pl-icon-shape { fill: none; stroke: var(--pl-dim); stroke-width: 1.6; stroke-linejoin: round; stroke-linecap: round; }
        .pl-icon-fill  { fill: var(--pl-dim); }
        .pl-label      { font-size: 7px; font-weight: 500; letter-spacing: 0.07em; fill: var(--pl-dim); }
        .pl-ar .pl-label { letter-spacing: 0; font-size: 8px; }

        .pl-stage { opacity: 0; animation: pl-stage-in 0.4s ease-out forwards; }
        @keyframes pl-stage-in { to { opacity: 1; } }
        .pl-s1 { animation-delay: 0.1s; }
        .pl-s2 { animation-delay: 0.2s; }
        .pl-s3 { animation-delay: 0.3s; }
        .pl-s4 { animation-delay: 0.4s; }

        /* Light up each stage to gold when the package reaches it */
        .pl-lit .pl-icon-shape { animation: pl-to-gold-stroke 0.35s ease-out forwards; }
        .pl-lit .pl-icon-fill  { animation: pl-to-gold-fill 0.35s ease-out forwards; }
        .pl-lit .pl-label      { animation: pl-to-gold-text 0.35s ease-out forwards; }
        @keyframes pl-to-gold-stroke { to { stroke: var(--pl-gold); } }
        @keyframes pl-to-gold-fill   { to { fill: var(--pl-gold); } }
        @keyframes pl-to-gold-text   { to { fill: var(--pl-gold-soft); } }

        .pl-s1 .pl-icon-shape, .pl-s1 .pl-icon-fill, .pl-s1 .pl-label { animation-delay: 0.55s; }
        .pl-s2 .pl-icon-shape, .pl-s2 .pl-icon-fill, .pl-s2 .pl-label { animation-delay: 1.25s; }
        .pl-s3 .pl-icon-shape, .pl-s3 .pl-icon-fill, .pl-s3 .pl-label { animation-delay: 1.95s; }
        .pl-s4 .pl-icon-shape, .pl-s4 .pl-icon-fill, .pl-s4 .pl-label { animation-delay: 2.65s; }

        /* Pulse rings (scale instead of animating r — works in all browsers) */
        .pl-pulse {
          fill: none; stroke: var(--pl-gold); stroke-width: 1; opacity: 0;
          transform-box: fill-box; transform-origin: center;
        }
        .pl-p1 { animation: pl-pulse 0.6s ease-out 0.55s forwards; }
        .pl-p2 { animation: pl-pulse 0.6s ease-out 1.25s forwards; }
        .pl-p3 { animation: pl-pulse 0.6s ease-out 1.95s forwards; }
        .pl-p4 { animation: pl-pulse 0.6s ease-out 2.65s forwards; }
        @keyframes pl-pulse {
          0%   { opacity: 0.8; transform: scale(1); }
          100% { opacity: 0;   transform: scale(2.6); }
        }

        .pl-route {
          fill: none; stroke: var(--pl-gold); stroke-width: 1;
          stroke-dasharray: 6 5; stroke-dashoffset: 400;
          animation: pl-draw-route 2.1s linear 0.5s forwards;
        }
        @keyframes pl-draw-route { to { stroke-dashoffset: 0; } }

        /* Arrow travelling along the route (pure CSS → always in sync with the stages) */
        .pl-package {
          fill: var(--pl-gold); stroke: var(--pl-gold-soft); stroke-width: 0.4; stroke-linejoin: round;
          transform-origin: 0 0;
          opacity: 0;
          animation: pl-arrow 2.5s linear 0.5s both, pl-arrow-vis 2.5s linear 0.5s both;
        }
        @keyframes pl-arrow {
          0.00% { transform: translate(55.0px,110.0px) rotate(-26.3deg); }
          1.75% { transform: translate(61.0px,107.2px) rotate(-23.7deg); }
          3.50% { transform: translate(67.0px,104.7px) rotate(-20.8deg); }
          5.25% { transform: translate(73.0px,102.6px) rotate(-17.7deg); }
          7.00% { transform: translate(79.5px,100.8px) rotate(-14.3deg); }
          8.75% { transform: translate(85.5px,99.4px) rotate(-11.0deg); }
          10.50% { transform: translate(92.0px,98.3px) rotate(-7.4deg); }
          12.25% { transform: translate(98.5px,97.7px) rotate(-3.7deg); }
          14.00% { transform: translate(105.0px,97.5px) rotate(0.0deg); }
          15.75% { transform: translate(111.5px,97.7px) rotate(3.7deg); }
          17.50% { transform: translate(118.0px,98.3px) rotate(7.4deg); }
          19.25% { transform: translate(124.5px,99.4px) rotate(11.0deg); }
          21.00% { transform: translate(130.5px,100.8px) rotate(14.3deg); }
          22.75% { transform: translate(137.0px,102.6px) rotate(17.7deg); }
          24.50% { transform: translate(143.0px,104.7px) rotate(20.8deg); }
          26.25% { transform: translate(149.0px,107.2px) rotate(23.7deg); }
          28.00% { transform: translate(155.0px,110.0px) rotate(26.3deg); }
          29.75% { transform: translate(161.0px,112.8px) rotate(23.7deg); }
          31.50% { transform: translate(167.0px,115.3px) rotate(20.8deg); }
          33.25% { transform: translate(173.0px,117.4px) rotate(17.7deg); }
          35.00% { transform: translate(179.5px,119.2px) rotate(14.3deg); }
          36.75% { transform: translate(185.5px,120.6px) rotate(11.0deg); }
          38.50% { transform: translate(192.0px,121.7px) rotate(7.4deg); }
          40.25% { transform: translate(198.5px,122.3px) rotate(3.7deg); }
          42.00% { transform: translate(205.0px,122.5px) rotate(0.0deg); }
          43.75% { transform: translate(211.5px,122.3px) rotate(-3.7deg); }
          45.50% { transform: translate(218.0px,121.7px) rotate(-7.4deg); }
          47.25% { transform: translate(224.5px,120.6px) rotate(-11.0deg); }
          49.00% { transform: translate(230.5px,119.2px) rotate(-14.3deg); }
          50.75% { transform: translate(237.0px,117.4px) rotate(-17.7deg); }
          52.50% { transform: translate(243.0px,115.3px) rotate(-20.8deg); }
          54.25% { transform: translate(249.0px,112.8px) rotate(-23.7deg); }
          56.00% { transform: translate(255.0px,110.0px) rotate(-26.3deg); }
          57.75% { transform: translate(261.0px,107.2px) rotate(-23.7deg); }
          59.50% { transform: translate(267.0px,104.7px) rotate(-20.8deg); }
          61.25% { transform: translate(273.0px,102.6px) rotate(-17.7deg); }
          63.00% { transform: translate(279.5px,100.8px) rotate(-14.3deg); }
          64.75% { transform: translate(285.5px,99.4px) rotate(-11.0deg); }
          66.50% { transform: translate(292.0px,98.3px) rotate(-7.4deg); }
          68.25% { transform: translate(298.5px,97.7px) rotate(-3.7deg); }
          70.00% { transform: translate(305.0px,97.5px) rotate(0.0deg); }
          71.75% { transform: translate(311.5px,97.7px) rotate(3.7deg); }
          73.50% { transform: translate(318.0px,98.3px) rotate(7.4deg); }
          75.25% { transform: translate(324.5px,99.4px) rotate(11.0deg); }
          77.00% { transform: translate(330.5px,100.8px) rotate(14.3deg); }
          78.75% { transform: translate(337.0px,102.6px) rotate(17.7deg); }
          80.50% { transform: translate(343.0px,104.7px) rotate(20.8deg); }
          82.25% { transform: translate(349.0px,107.2px) rotate(23.7deg); }
          84.00% { transform: translate(355.0px,110.0px) rotate(26.3deg); }
          100% { transform: translate(355.0px,110.0px) rotate(26.3deg); }
        }
        @keyframes pl-arrow-vis {
          0%   { opacity: 0; }
          2%   { opacity: 1; }
          88%  { opacity: 1; }
          100% { opacity: 0; }
        }

        .pl-check {
          opacity: 0; stroke: #fff; stroke-width: 1.8; fill: none;
          stroke-linecap: round; stroke-linejoin: round;
          stroke-dasharray: 16; stroke-dashoffset: 16;
          animation: pl-check-in 0.3s ease-out 3.0s forwards;
        }
        @keyframes pl-check-in { to { opacity: 1; stroke-dashoffset: 0; } }

        .pl-brand { opacity: 0; animation: pl-fade-in 0.7s ease-out 3.2s forwards; }
        @keyframes pl-fade-in { to { opacity: 1; } }

        @media (prefers-reduced-motion: reduce) {
          .pl-root * { animation-duration: 1ms !important; animation-delay: 0s !important; }
          .pl-content { animation-delay: 0.5s !important; animation-duration: 0.2s !important; }
          .pl-door { animation-delay: 0.6s !important; animation-duration: 0.4s !important; }
        }
      `}</style>
    </div>
  );
}