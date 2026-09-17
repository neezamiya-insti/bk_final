"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
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

export default function Preloader() {
  const [exiting, setExiting] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const exitTimer = window.setTimeout(() => setExiting(true), 2000);
    const removeTimer = window.setTimeout(() => setRemoved(true), 2600);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  if (removed) return null;

  return (
    <div
      aria-label="Loading Boyut Al-Kawthar"
      aria-live="polite"
      className={`${playfair.variable} ${poppins.variable} fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#13233F] transition-opacity duration-600 ease-out ${
        exiting ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:radial-gradient(#F5B301_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="relative flex flex-col items-center px-6 text-center">
        <div className="relative flex h-24 w-56 items-center justify-center sm:h-28 sm:w-64">
          <div className="absolute inset-0 rounded-full border border-[#F5B301]/20" />
          <Image
            src="/logo-Boyot-1.png"
            alt="Boyut Al-Kawthar"
            width={220}
            height={100}
            priority
            className="relative z-10 h-16 w-48 object-contain sm:h-20 sm:w-56"
          />
        </div>

        <div className="preloader-dots mt-8 flex items-center justify-center gap-3 sm:gap-4" aria-hidden="true">
          {["#F5B301", "#f7c43d", "#e6a500", "#f8d36f", "#F5B301"].map((color, index) => (
            <span
              key={index}
              className="preloader-dot h-7 w-7 rounded-full shadow-[0_8px_18px_rgba(245,179,1,0.25)] sm:h-8 sm:w-8"
              style={{ backgroundColor: color, animationDelay: `${index * 110}ms` }}
            />
          ))}
        </div>
        <p className="mt-6 font-[family-name:var(--font-poppins)] text-[10px] font-light uppercase tracking-[0.28em] text-white/60 sm:text-xs">
          Global trade · Local expertise
        </p>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-1 bg-white/10">
        <div className="preloader-progress h-full origin-left bg-[#F5B301] shadow-[0_0_18px_rgba(245,179,1,0.8)]" />
      </div>

      <style>{`
        @keyframes preloaderDot {
          0%, 100% { transform: translateY(0) scale(1); opacity: .72; }
          50% { transform: translateY(-12px) scale(1.08); opacity: 1; }
        }
        @keyframes preloaderProgress {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        .preloader-dot {
          animation: preloaderDot 900ms ease-in-out infinite;
        }
        .preloader-progress {
          animation: preloaderProgress 2000ms cubic-bezier(.65,0,.35,1) forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .preloader-dot,
          .preloader-progress {
            animation-duration: 1ms;
            animation-iteration-count: 1;
          }
        }
      `}</style>
    </div>
  );
}
