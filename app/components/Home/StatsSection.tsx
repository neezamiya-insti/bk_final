"use client";

import { useEffect, useRef, useState } from "react";
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

type Stat = {
  value?: number;
  suffix?: string;
  text?: { EN: string; AR: string; FR: string };
  label: { EN: string; AR: string; FR: string };
  icon: "years" | "markets" | "clients" | "seda";
};

const STATS: Stat[] = [
  {
    value: 7,
    suffix: "+",
    label: { EN: "Years Experience", AR: "سنوات الخبرة", FR: "Années d'expérience" },
    icon: "years",
  },
  {
    value: 55,
    suffix: "+",
    label: { EN: "Global Markets", AR: "أسواق عالمية", FR: "Marchés mondiaux" },
    icon: "markets",
  },
  {
    value: 20,
    suffix: "+",
    label: { EN: "Happy Clients", AR: "عملاء سعداء", FR: "Clients satisfaits" },
    icon: "clients",
  },
  {
    text: { EN: "SEDA", AR: "SEDA", FR: "SEDA" },
    label: {
      EN: "Certified Exporter",
      AR: "مصدّر معتمد",
      FR: "Exportateur certifié",
    },
    icon: "seda",
  },
];

function readStoredLang(): LangCode {
  if (typeof window === "undefined") return "EN";
  const saved = window.localStorage.getItem(LANG_KEY);
  return saved === "AR" || saved === "FR" ? saved : "EN";
}

/** Fires once when the element enters the viewport. */
function useInView<T extends HTMLElement>(threshold = 0.3) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView] as const;
}

/** Smoothly counts from 0 to `target` once `start` becomes true. */
function useCountUp(target: number, start: boolean, duration = 1800) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    let rafId: number;
    const startTime = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [start, target, duration]);

  return value;
}

/** 3D-style icon rendered with layered gradients + shadows. */
function Icon3D({ type }: { type: Stat["icon"] }) {
  const base =
    "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl sm:h-11 sm:w-11 " +
    "bg-gradient-to-br from-white/95 to-white/70 " +
    "shadow-[0_5px_10px_-3px_rgba(0,0,0,0.35),inset_0_1.5px_3px_rgba(255,255,255,0.9),inset_0_-2px_4px_rgba(0,0,0,0.08)] " +
    "ring-1 ring-white/60 transition-transform duration-500 hover:-translate-y-0.5 hover:scale-105";

  const gold = "#F5B301";
  const green = "#2C7046";

  if (type === "years") {
    return (
      <div className={base}>
        <svg viewBox="0 0 48 48" className="h-6 w-6 sm:h-7 sm:w-7">
          <defs>
            <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFDD66" />
              <stop offset="100%" stopColor={gold} />
            </linearGradient>
          </defs>
          <path
            d="M16 8h16v8a8 8 0 0 1-16 0V8z"
            fill="url(#goldGrad)"
            stroke={green}
            strokeWidth="1.5"
          />
          <path
            d="M16 10h-4a4 4 0 0 0 4 4M32 10h4a4 4 0 0 1-4 4"
            fill="none"
            stroke={green}
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <rect x="21" y="24" width="6" height="8" fill={green} />
          <rect x="16" y="32" width="16" height="4" rx="1" fill="url(#goldGrad)" stroke={green} strokeWidth="1.2" />
          <circle cx="24" cy="15" r="2.5" fill="#fff" opacity="0.8" />
        </svg>
      </div>
    );
  }

  if (type === "markets") {
    return (
      <div className={base}>
        <svg viewBox="0 0 48 48" className="h-6 w-6 sm:h-7 sm:w-7">
          <defs>
            <linearGradient id="globeGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#4FA96E" />
              <stop offset="100%" stopColor={green} />
            </linearGradient>
          </defs>
          <circle cx="24" cy="24" r="15" fill="url(#globeGrad)" stroke={green} strokeWidth="1.5" />
          <ellipse cx="24" cy="24" rx="7" ry="15" fill="none" stroke="#fff" strokeWidth="1.3" opacity="0.85" />
          <path d="M9 24h30M12 17h24M12 31h24" stroke="#fff" strokeWidth="1.2" opacity="0.8" />
          <circle cx="19" cy="18" r="2" fill={gold} opacity="0.9" />
        </svg>
      </div>
    );
  }

  if (type === "clients") {
    return (
      <div className={base}>
        <svg viewBox="0 0 48 48" className="h-6 w-6 sm:h-7 sm:w-7">
          <defs>
            <linearGradient id="peopleGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#4FA96E" />
              <stop offset="100%" stopColor={green} />
            </linearGradient>
          </defs>
          <circle cx="24" cy="15" r="6" fill="url(#peopleGrad)" stroke={green} strokeWidth="1.3" />
          <path
            d="M12 36c0-6 5.4-11 12-11s12 5 12 11v2H12v-2z"
            fill="url(#peopleGrad)"
            stroke={green}
            strokeWidth="1.3"
          />
          <circle cx="13" cy="21" r="4" fill={gold} opacity="0.9" />
          <circle cx="35" cy="21" r="4" fill={gold} opacity="0.9" />
        </svg>
      </div>
    );
  }

  // SEDA — certified badge
  return (
    <div className={base}>
      <svg viewBox="0 0 48 48" className="h-6 w-6 sm:h-7 sm:w-7">
        <defs>
          <linearGradient id="badgeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFDD66" />
            <stop offset="100%" stopColor={gold} />
          </linearGradient>
        </defs>
        <path
          d="M24 6l5 3 6-.5 2 5.6 5 3.3-2 5.6 2 5.6-5 3.3-2 5.6-6-.5-5 3-5-3-6 .5-2-5.6-5-3.3 2-5.6-2-5.6 5-3.3 2-5.6 6 .5z"
          fill="url(#badgeGrad)"
          stroke={green}
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
        <path
          d="M17 24l5 5 9-10"
          fill="none"
          stroke={green}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function StatItem({ stat, langCode, delay }: { stat: Stat; langCode: LangCode; delay: number }) {
  const [ref, inView] = useInView<HTMLDivElement>(0.4);
  const count = useCountUp(stat.value ?? 0, inView && stat.value !== undefined);
  const isSeda = stat.value === undefined;

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={[
        "flex items-center gap-3 text-left sm:gap-4",
        "transition-all duration-700 ease-out",
        inView ? "translate-x-0 opacity-100" : "-translate-x-6 opacity-0",
      ].join(" ")}
    >
      <Icon3D type={stat.icon} />

      <div className="flex flex-col justify-center">
        {isSeda ? (
          // Playfair's all-caps letters render visually taller than the
          // numerals at the same font-size, so SEDA is sized one step down
          // to *look* the same height as "7+", "65+", "20+".
          <span className="font-[family-name:var(--font-playfair)] text-xl font-extrabold leading-none text-[#F5B301] sm:text-2xl">
            {stat.text?.[langCode]}
          </span>
        ) : (
          <span className="font-[family-name:var(--font-playfair)] text-2xl font-extrabold leading-none text-white sm:text-3xl">
            {count}
            <span className="text-[#F5B301]">{stat.suffix}</span>
          </span>
        )}

        <span className="mt-1 max-w-[170px] whitespace-nowrap font-[family-name:var(--font-poppins)] text-[10.5px] font-medium uppercase tracking-[0.12em] text-white/90 sm:text-[11.5px]">
          {stat.label[langCode]}
        </span>
      </div>
    </div>
  );
}

export default function StatsSection() {
  const [langCode, setLangCode] = useState<LangCode>(() => readStoredLang());

  useEffect(() => {
    const handleLangChange = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      if (detail === "AR" || detail === "EN" || detail === "FR") setLangCode(detail);
    };
    const handleStorage = (e: StorageEvent) => {
      if (e.key === LANG_KEY && (e.newValue === "AR" || e.newValue === "EN" || e.newValue === "FR")) {
        setLangCode(e.newValue);
      }
    };
    window.addEventListener("bk-lang-change", handleLangChange);
    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("bk-lang-change", handleLangChange);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const isAr = langCode === "AR";

  return (
    // relative + z-10: sits above the sticky Hero (z-0), so as the page
    // scrolls this section's normal document flow physically slides up and
    // over the pinned hero — the "cover" effect. Solid own background,
    // no gradient/blend into the hero's colors.
    <section
      dir={isAr ? "rtl" : "ltr"}
      style={{
        backgroundColor: "rgb(57, 131, 85)",
      }}
      className={`${playfair.variable} ${poppins.variable} relative z-10 w-full py-6 sm:py-7`}
    >
      <div
        dir="ltr"
        className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-6 sm:px-10 lg:grid-cols-4"
      >
        {STATS.map((stat, i) => (
          <StatItem key={stat.label.EN} stat={stat} langCode={langCode} delay={i * 150} />
        ))}
      </div>
    </section>
  );
}