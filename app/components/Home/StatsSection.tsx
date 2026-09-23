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
  value: number;
  suffix: string;
  label: { EN: string; AR: string; FR: string };
};

const STATS: Stat[] = [
  {
    value: 20,
    suffix: "+",
    label: { EN: "Happy Clients", AR: "عملاء سعداء", FR: "Clients satisfaits" },
  },
  {
    value: 98,
    suffix: "%",
    label: { EN: "Client Satisfaction", AR: "رضا العملاء", FR: "Satisfaction client" },
  },
  {
    value: 55,
    suffix: "+",
    label: { EN: "Global Markets", AR: "أسواق عالمية", FR: "Marchés mondiaux" },
  },
];

const HEADING = {
  EN: "Results That Speak",
  AR: "نتائج تتحدث عن نفسها",
  FR: "Des résultats qui parlent",
} as const;

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
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [start, target, duration]);

  return value;
}

function StatItem({ stat, langCode, delay }: { stat: Stat; langCode: LangCode; delay: number }) {
  const [ref, inView] = useInView<HTMLDivElement>(0.4);
  const count = useCountUp(stat.value, inView);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={[
        "flex flex-col items-center text-center",
        "transition-all duration-700 ease-out",
        inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
      ].join(" ")}
    >
      <span className="font-[family-name:var(--font-playfair)] text-4xl font-extrabold text-[#1B4D3E] sm:text-5xl md:text-6xl">
        {count}
        <span className="text-[#3EA96E]">{stat.suffix}</span>
      </span>
      <span className="mt-2 font-[family-name:var(--font-poppins)] text-[12.5px] font-medium uppercase tracking-[0.15em] text-[#5C5C5C] sm:mt-3 sm:text-[13.5px]">
        {stat.label[langCode]}
      </span>
    </div>
  );
}

export default function StatsSection() {
  const [langCode, setLangCode] = useState<LangCode>(() => readStoredLang());
  const [headingRef, headingInView] = useInView<HTMLDivElement>(0.5);

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
    <section
      dir={isAr ? "rtl" : "ltr"}
      className={`${playfair.variable} ${poppins.variable} w-full bg-[#1B4D3E]/[0.03] py-12 sm:py-16`}
    >
      {/* Heading — same pattern as the other sections */}
      <div ref={headingRef} className="flex flex-col items-center text-center">
        <h2
          className={[
            "font-[family-name:var(--font-playfair)] text-2xl font-extrabold text-[#3EA96E] sm:text-4xl",
            "transition-all duration-700 ease-out",
            headingInView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
          ].join(" ")}
        >
          {HEADING[langCode]}
        </h2>
        <span
          className={[
            "mt-3 h-1 w-16 rounded-full bg-[#3EA96E] sm:mt-4 sm:w-20",
            "transition-all duration-700 ease-out delay-150",
            headingInView ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0",
          ].join(" ")}
        />
      </div>

      <div
        dir="ltr"
        className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-10 px-6 sm:mt-12 sm:grid-cols-3 sm:gap-6 sm:px-10"
      >
        {STATS.map((stat, i) => (
          <StatItem key={stat.label.EN} stat={stat} langCode={langCode} delay={i * 150} />
        ))}
      </div>
    </section>
  );
}