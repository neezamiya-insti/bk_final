"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Playfair_Display, Poppins } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-playfair",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const LANG_KEY = "bk-lang";
type LangCode = "EN" | "AR" | "FR";

// Online background image (Unsplash — free to use)
const CTA_BACKGROUND =
  "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1920&q=80";

const TEXT = {
  EN: {
    heading: "Ready to Take Your Business Global?",
    paragraph:
      "Partner with Boyut Al-Kawthar and unlock the doors to international markets.",
    primaryCta: "Contact Us",
    secondaryCta: "Explore Services",
  },
  AR: {
    heading: "هل أنت مستعد لنقل أعمالك إلى العالمية؟",
    paragraph:
      "كن شريكًا لبيوت الكوثر وافتح أبواب الأسواق الدولية.",
    primaryCta: "اتصل بنا",
    secondaryCta: "استكشف الخدمات",
  },
  FR: {
    heading: "Prêt à faire passer votre entreprise à l'échelle mondiale ?",
    paragraph:
      "Associez-vous à Boyut Al-Kawthar et ouvrez les portes des marchés internationaux.",
    primaryCta: "Contactez-nous",
    secondaryCta: "Explorer les services",
  },
} as const;

function readStoredLang(): LangCode {
  if (typeof window === "undefined") return "EN";
  const saved = window.localStorage.getItem(LANG_KEY);
  if (saved === "AR" || saved === "EN" || saved === "FR") return saved;
  return "EN";
}

/** Reveals an element once it scrolls into view; fires only the first time. */
function useInView<T extends HTMLElement>(threshold = 0.2) {
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

export default function CtaSection() {
  const [langCode, setLangCode] = useState<LangCode>(() => readStoredLang());

  // Language change listener
  useEffect(() => {
    const handleLangChange = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      if (detail === "AR" || detail === "EN" || detail === "FR") setLangCode(detail);
    };
    const handleStorage = (e: StorageEvent) => {
      if (
        e.key === LANG_KEY &&
        (e.newValue === "AR" || e.newValue === "EN" || e.newValue === "FR")
      ) {
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
  const t = TEXT[langCode];

  const [cardRef, cardInView] = useInView<HTMLDivElement>(0.2);
  const [contentRef, contentInView] = useInView<HTMLDivElement>(0.3);

  return (
    <section
      dir={isAr ? "rtl" : "ltr"}
      className={`${playfair.variable} ${poppins.variable} relative w-full bg-white px-4 py-10 sm:px-6 sm:py-12 md:px-8 lg:px-10 lg:py-14`}
    >
      <div className="relative mx-auto max-w-6xl">
        {/* CTA Card */}
        <div
          ref={cardRef}
          className={[
            "group/cta relative overflow-hidden rounded-[1.75rem] sm:rounded-[2rem]",
            "shadow-xl shadow-[#2C7046]/15 transition-all duration-1000 ease-out",
            cardInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
          ].join(" ")}
        >
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover/cta:scale-105"
            style={{ backgroundImage: `url(${CTA_BACKGROUND})` }}
          />

          {/* Green overlay */}
          <div className="absolute inset-0 bg-[#2C7046]/85" />

          {/* Subtle gold glow */}
          <div className="pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full bg-[#F5B301]/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-[#F5B301]/15 blur-3xl" />

          {/* Content */}
          <div
            ref={contentRef}
            className="relative z-10 flex flex-col items-center gap-5 px-6 py-8 text-center sm:px-10 sm:py-10 md:flex-row md:justify-between md:gap-8 md:px-12 md:py-10 md:text-left lg:px-14"
          >
            {/* Text block */}
            <div className="max-w-xl">
              <h2
                className={[
                  "font-[family-name:var(--font-playfair)] text-xl font-extrabold leading-[1.2] text-white sm:text-2xl md:text-[26px] lg:text-[28px]",
                  "transition-all duration-1000 ease-out",
                  contentInView
                    ? "translate-x-0 opacity-100"
                    : isAr
                    ? "translate-x-16 opacity-0"
                    : "-translate-x-16 opacity-0",
                ].join(" ")}
                style={{ transitionDelay: "0ms" }}
              >
                {t.heading}
              </h2>

              {/* Gold bar */}
              <span
                className={[
                  "mt-3 block h-[3px] w-14 rounded-full bg-[#F5B301] transition-all duration-1000 ease-out",
                  contentInView ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0",
                ].join(" ")}
                style={{ transitionDelay: "200ms" }}
              />

              <p
                className={[
                  "mt-3 font-[family-name:var(--font-poppins)] text-[12.5px] font-light leading-relaxed text-white/80 sm:text-[13.5px] md:text-[14px]",
                  "transition-all duration-1000 ease-out",
                  contentInView
                    ? "translate-x-0 opacity-100"
                    : isAr
                    ? "translate-x-16 opacity-0"
                    : "-translate-x-16 opacity-0",
                ].join(" ")}
                style={{ transitionDelay: "300ms" }}
              >
                {t.paragraph}
              </p>
            </div>

            {/* Buttons */}
            <div
              className={[
                "flex shrink-0 flex-col items-stretch gap-2.5 sm:flex-row sm:items-center sm:gap-3",
                "transition-all duration-1000 ease-out",
                contentInView
                  ? "translate-x-0 opacity-100"
                  : isAr
                  ? "-translate-x-16 opacity-0"
                  : "translate-x-16 opacity-0",
              ].join(" ")}
              style={{ transitionDelay: "450ms" }}
            >
              {/* Primary CTA — Contact Us — GOLD with white text */}
              <Link
                href="/contact"
                className="group/btn inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-[#F5B301] px-6 py-2.5 font-[family-name:var(--font-poppins)] text-[12.5px] font-bold text-white shadow-md shadow-[#F5B301]/30 transition-all duration-300 hover:scale-105 hover:bg-white hover:text-[#2C7046] sm:text-[13px]"
              >
                {t.primaryCta}
                <span
                  className={`transition-transform duration-300 ${
                    isAr
                      ? "group-hover/btn:-translate-x-1 rotate-180"
                      : "group-hover/btn:translate-x-1"
                  }`}
                >
                  →
                </span>
              </Link>

              {/* Secondary CTA — outlined, gold accents on hover */}
              <Link
                href="/services"
                className="group/btn2 inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-white/25 bg-white/5 px-6 py-2.5 font-[family-name:var(--font-poppins)] text-[12.5px] font-bold text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-[#F5B301] hover:bg-[#F5B301]/10 hover:text-[#F5B301] sm:text-[13px]"
              >
                {t.secondaryCta}
                <span
                  className={`transition-transform duration-300 ${
                    isAr
                      ? "group-hover/btn2:-translate-x-1 rotate-180"
                      : "group-hover/btn2:translate-x-1"
                  }`}
                >
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}