"use client";

import Image from "next/image";
import { Playfair_Display, Poppins } from "next/font/google";
import { useEffect, useState, useRef } from "react";

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

const CONTAINER_WIDTH = 1081;
// Reduced from 721 — pulls the arc/nodes/stats block up so the gap under
// the heading underline is much tighter.
const CONTAINER_HEIGHT = 631;
const BACKGROUND_IMAGE = "/about/backf.png";

// md breakpoint (768px) / 1081 => niche wala scale mobile mana jayega
const MOBILE_SCALE_BREAKPOINT = 768 / CONTAINER_WIDTH;

const TEXT = {
  EN: {
    badge: "Discover Your Potential With Us",
    heading: "YOUR GLOBAL EXPORT PARTNER",
    stat1Value: "$1,107 B",
    stat1Label: "SAUDI GDP",
    stat1Year: "2022",
    stat1Desc: "One of the largest economies in the Middle East, driving global trade.",
    stat2Value: "$3,516 B",
    stat2Label: "SAUDI FDI",
    stat2Year: "Dec 2023",
    stat2Desc: "Foreign direct investment reflecting global confidence in Saudi markets.",
    stat3Value: "$25,318 B",
    stat3Label: "SAUDI EXPORT",
    stat3Year: "2024",
    stat3Desc: "Saudi exports reaching every corner of the world with quality products.",
    stat4Value: "$111,203 B",
    stat4Label: "TRADE BALANCE",
    stat4Year: "2023",
    stat4Desc: "A strong trade surplus that powers the Kingdom's economic growth.",
  },
  AR: {
    badge: "اكتشف إمكاناتك معنا",
    heading: "شريكك العالمي في التصدير",
    stat1Value: "$1,107 B",
    stat1Label: "الناتج المحلي",
    stat1Year: "2022",
    stat1Desc: "أحد أكبر الاقتصادات في الشرق الأوسط، يقود التجارة العالمية.",
    stat2Value: "$3,516 B",
    stat2Label: "الاستثمار الأجنبي",
    stat2Year: "ديسمبر 2023",
    stat2Desc: "استثمار أجنبي مباشر يعكس ثقة العالم في الأسواق السعودية.",
    stat3Value: "$25,318 B",
    stat3Label: "الصادرات السعودية",
    stat3Year: "2024",
    stat3Desc: "الصادرات السعودية تصل إلى كل ركن من العالم بمنتجات عالية الجودة.",
    stat4Value: "$111,203 B",
    stat4Label: "الميزان التجاري",
    stat4Year: "2023",
    stat4Desc: "فائض تجاري قوي يعزز النمو الاقتصادي للمملكة.",
  },
  FR: {
    badge: "Découvrez votre potentiel avec nous",
    heading: "VOTRE PARTENAIRE MONDIAL D'EXPORTATION",
    stat1Value: "$1 107 B",
    stat1Label: "PIB SAOUDIEN",
    stat1Year: "2022",
    stat1Desc: "L'une des plus grandes économies du Moyen-Orient, moteur du commerce mondial.",
    stat2Value: "$3 516 B",
    stat2Label: "IDE SAOUDIEN",
    stat2Year: "Déc 2023",
    stat2Desc: "Investissement direct étranger reflétant la confiance mondiale dans les marchés saoudiens.",
    stat3Value: "$25 318 B",
    stat3Label: "EXPORTATION SAOUDIENNE",
    stat3Year: "2024",
    stat3Desc: "Les exportations saoudiennes atteignent chaque coin du monde avec des produits de qualité.",
    stat4Value: "$111 203 B",
    stat4Label: "BALANCE COMMERCIALE",
    stat4Year: "2023",
    stat4Desc: "Un excédent commercial solide qui alimente la croissance économique du Royaume.",
  },
} as const;

function readStoredLang(): LangCode {
  if (typeof window === "undefined") return "EN";
  const saved = window.localStorage.getItem(LANG_KEY);
  if (saved === "AR" || saved === "EN" || saved === "FR") return saved;
  return "EN";
}

export default function DiscoverPotentialSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [scale, setScale] = useState(1);
  const [langCode, setLangCode] = useState<LangCode>(() => readStoredLang());
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

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

  // Intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    const currentRef = sectionRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Scale calculation
  useEffect(() => {
    if (typeof window === "undefined") return;

    function updateScale() {
      const el = wrapperRef.current;
      if (!el) return;
      const availableWidth = el.offsetWidth;
      const nextScale = Math.min(availableWidth / CONTAINER_WIDTH, 1);
      setScale(nextScale);
    }

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  const isAr = langCode === "AR";
  const t = TEXT[langCode];

  const textScale = scale > 0 ? 1 / scale : 1;
  const isMobile = scale < MOBILE_SCALE_BREAKPOINT;

  // Mobile pe graphic ke niche se khali jagah cut kar dete hain
  const wrapperHeight = isMobile
    ? 645 * scale
    : (CONTAINER_HEIGHT + 30) * scale;

  const mobileStats = [
    { value: t.stat1Value, label: t.stat1Label, year: t.stat1Year, desc: t.stat1Desc },
    { value: t.stat2Value, label: t.stat2Label, year: t.stat2Year, desc: t.stat2Desc },
    { value: t.stat3Value, label: t.stat3Label, year: t.stat3Year, desc: t.stat3Desc },
    { value: t.stat4Value, label: t.stat4Label, year: t.stat4Year, desc: t.stat4Desc },
  ];

  // 3D-feel node style: gradient background + layered shadow + subtle ring,
  // instead of the old flat dark-green fill.
  const node3D =
    "flex items-center justify-center rounded-full shadow-[0_10px_22px_-6px_rgba(0,0,0,0.55),inset_0_2px_3px_rgba(255,255,255,0.12),inset_0_-4px_8px_rgba(0,0,0,0.45)] ring-1 ring-[#3EA96E]/30 transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_16px_30px_-6px_rgba(0,0,0,0.6),inset_0_2px_3px_rgba(255,255,255,0.15),inset_0_-4px_8px_rgba(0,0,0,0.45)]";
  const node3DBg = { backgroundImage: "linear-gradient(155deg, #164A34 0%, #0A2A1E 100%)" };

  return (
    <section
      ref={sectionRef}
      dir={isAr ? "rtl" : "ltr"}
      className={`${playfair.variable} ${poppins.variable} relative w-full overflow-hidden bg-[#0F3327] py-8`}
    >
      {/* Background image — /about/backf.png */}
      <Image
        src={BACKGROUND_IMAGE}
        alt=""
        fill
        sizes="100vw"
        quality={85}
        className="object-cover object-center"
        priority
      />

      {/* Light green overlay — subtle wash for legibility & theme consistency */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[#398355]/35"
        aria-hidden="true"
      />
      {/* Light vertical darkening (top + bottom) for text contrast */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/25 via-transparent to-black/35"
        aria-hidden="true"
      />

      <div
        ref={wrapperRef}
        className="relative z-10 mx-auto w-full max-w-[1081px] overflow-hidden"
        style={{ height: `${wrapperHeight}px` }}
      >
        <div
          className="absolute left-0 top-0"
          style={{
            width: `${CONTAINER_WIDTH}px`,
            height: `${CONTAINER_HEIGHT}px`,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          {/* Badge (mobile pe chhota) */}
          <div
            className={`absolute left-0 right-0 top-[34px] text-center transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[300px]"
            }`}
            style={{ transitionDelay: "0ms" }}
          >
            <p
              className="text-center font-[family-name:var(--font-poppins)] font-bold text-[#3EA96E]"
              style={{
                transform: `scale(${textScale})`,
                transformOrigin: "top center",
                fontSize: isMobile ? "8px" : "13px",
                letterSpacing: isMobile ? "2.5px" : "7px",
              }}
            >
              {t.badge}
            </p>
          </div>

          {/* Heading — WHITE — mobile pe font size kam */}
          <div
            className={`absolute left-0 right-0 text-center transition-all duration-1000 ease-out ${
              isMobile ? "top-[85px]" : "top-[65px]"
            } ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-[400px]"
            }`}
            style={{ transitionDelay: "150ms" }}
          >
            <h1
              className="mx-auto max-w-[95%] text-center font-[family-name:var(--font-playfair)] font-extrabold leading-[1.25] text-white"
              style={{
                transform: `scale(${textScale})`,
                transformOrigin: "top center",
                fontSize: isMobile ? "15px" : "28px",
              }}
            >
              {t.heading}
            </h1>
          </div>

          {/* Underline (desktop only) */}
          {!isMobile && (
            <div
              className={`absolute left-1/2 top-[130px] h-[2px] w-[150px] -translate-x-1/2 bg-[#3EA96E] transition-all duration-1000 ease-out ${
                isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
              }`}
              style={{ transitionDelay: "250ms" }}
            />
          )}

          {/* Arc connectors — endpoints now match each node's exact CENTER
              point (342,263) / (724,263) / (283,433) / (786,433) */}
          <svg
            className="absolute left-0 top-0"
            width="1081"
            height="631"
            viewBox="0 0 1081 631"
          >
            <path
              d="M342,263 C342,188 460,158 533,158 C606,158 724,188 724,263"
              stroke="#3EA96E"
              strokeWidth={isMobile ? "8" : "6"}
              fill="none"
            />
            <path
              d="M342,263 C300,271 286,353 283,433"
              stroke="#3EA96E"
              strokeWidth={isMobile ? "5" : "3.4"}
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M724,263 C766,271 780,353 786,433"
              stroke="#3EA96E"
              strokeWidth={isMobile ? "5" : "3.4"}
              fill="none"
              strokeLinecap="round"
            />
          </svg>

          {/* Node 2 - Left Top — center exactly at (342, 263) — pushed 1rem further LEFT */}
          <div
            className={`${node3D} absolute left-[293px] top-[230px] border-[#3EA96E] transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[150px]"
            }`}
            style={{
              ...node3DBg,
              transitionDelay: "500ms",
              width: isMobile ? "80px" : "66px",
              height: isMobile ? "80px" : "66px",
              borderWidth: isMobile ? "2.5px" : "1.5px",
            }}
          >
            <svg viewBox="0 0 24 24" className={isMobile ? "h-9 w-9" : "h-7 w-7"} fill="none" stroke="#3EA96E" strokeWidth={isMobile ? "2" : "1.6"} strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 21h18" />
              <path d="M5 21V8l7-5 7 5v13" />
              <path d="M9 21v-6h6v6" />
            </svg>
          </div>

          {/* Node 3 - Right Top — center exactly at (724, 263) — pushed 1rem further RIGHT */}
          <div
            className={`${node3D} absolute left-[707px] top-[230px] border-[#3EA96E] transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[150px]"
            }`}
            style={{
              ...node3DBg,
              transitionDelay: "500ms",
              width: isMobile ? "80px" : "66px",
              height: isMobile ? "80px" : "66px",
              borderWidth: isMobile ? "2.5px" : "1.5px",
            }}
          >
            <svg viewBox="0 0 24 24" className={isMobile ? "h-9 w-9" : "h-7 w-7"} fill="none" stroke="#3EA96E" strokeWidth={isMobile ? "2" : "1.6"} strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 17l6-6 4 4 8-8" />
              <path d="M14 7h7v7" />
            </svg>
          </div>

          {/* Node 4 - Left Bottom — center exactly at (283, 433) */}
          <div
            className={`${node3D} absolute left-[250px] top-[400px] border-[#3EA96E] transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[150px]"
            }`}
            style={{
              ...node3DBg,
              transitionDelay: "600ms",
              width: isMobile ? "80px" : "66px",
              height: isMobile ? "80px" : "66px",
              borderWidth: isMobile ? "2.5px" : "1.5px",
            }}
          >
            <svg viewBox="0 0 24 24" className={isMobile ? "h-9 w-9" : "h-7 w-7"} fill="none" stroke="#3EA96E" strokeWidth={isMobile ? "2" : "1.7"} strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <path d="M3.3 7l8.7 5 8.7-5" />
              <path d="M12 22V12" />
            </svg>
          </div>

          {/* Node 5 - Right Bottom — center exactly at (786, 433) */}
          <div
            className={`${node3D} absolute left-[753px] top-[400px] border-[#3EA96E] transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[150px]"
            }`}
            style={{
              ...node3DBg,
              transitionDelay: "600ms",
              width: isMobile ? "80px" : "66px",
              height: isMobile ? "80px" : "66px",
              borderWidth: isMobile ? "2.5px" : "1.5px",
            }}
          >
            <svg viewBox="0 0 24 24" className={isMobile ? "h-9 w-9" : "h-7 w-7"} fill="none" stroke="#3EA96E" strokeWidth={isMobile ? "2" : "1.6"} strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2.5l2.9 6.3 6.9.7-5.2 4.6 1.6 6.7L12 17.6 5.8 20.8l1.6-6.7-5.2-4.6 6.9-.7L12 2.5z" />
            </svg>
          </div>

          {/* ===== DESKTOP STATS (mobile pe render hi nahi hote) ===== */}
          {!isMobile && (
            <>
              {/* Stat 1: Saudi GDP */}
              <div
                className={`absolute left-[20px] top-[200px] w-[210px] text-right transition-all duration-1000 ease-out ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[200px]"
                }`}
                style={{ transitionDelay: "350ms" }}
              >
                <div style={{ transform: `scale(${textScale})`, transformOrigin: "top right" }}>
                  <div className="font-[family-name:var(--font-playfair)] text-[29px] font-extrabold leading-none text-[#3EA96E]">
                    {t.stat1Value}
                  </div>
                  <div className="mt-1.5 font-[family-name:var(--font-poppins)] text-[14.5px] font-bold leading-tight tracking-wide text-white">
                    {t.stat1Label}
                    <br />
                    <span className="text-[12px] font-medium text-[#3EA96E]">{t.stat1Year}</span>
                  </div>
                </div>
                <div className="my-2.5 ml-auto h-[2px] w-[34px] bg-[#3EA96E]" />
                <p className="font-[family-name:var(--font-poppins)] text-[12.5px] font-light leading-relaxed text-white/70">
                  {t.stat1Desc}
                </p>
              </div>

              {/* Stat 2: Saudi FDI */}
              <div
                className={`absolute left-[840px] top-[200px] w-[210px] text-left transition-all duration-1000 ease-out ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[200px]"
                }`}
                style={{ transitionDelay: "400ms" }}
              >
                <div style={{ transform: `scale(${textScale})`, transformOrigin: "top left" }}>
                  <div className="font-[family-name:var(--font-playfair)] text-[29px] font-extrabold leading-none text-[#3EA96E]">
                    {t.stat2Value}
                  </div>
                  <div className="mt-1.5 font-[family-name:var(--font-poppins)] text-[14.5px] font-bold leading-tight tracking-wide text-white">
                    {t.stat2Label}
                    <br />
                    <span className="text-[12px] font-medium text-[#3EA96E]">{t.stat2Year}</span>
                  </div>
                </div>
                <div className="my-2.5 h-[2px] w-[34px] bg-[#3EA96E]" />
                <p className="font-[family-name:var(--font-poppins)] text-[12.5px] font-light leading-relaxed text-white/70">
                  {t.stat2Desc}
                </p>
              </div>

              {/* Stat 3: Saudi Export */}
              <div
                className={`absolute left-[880px] top-[380px] w-[210px] text-left transition-all duration-1000 ease-out ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[200px]"
                }`}
                style={{ transitionDelay: "550ms" }}
              >
                <div style={{ transform: `scale(${textScale})`, transformOrigin: "top left" }}>
                  <div className="font-[family-name:var(--font-playfair)] text-[29px] font-extrabold leading-none text-[#3EA96E]">
                    {t.stat3Value}
                  </div>
                  <div className="mt-1.5 font-[family-name:var(--font-poppins)] text-[14.5px] font-bold leading-tight tracking-wide text-white">
                    {t.stat3Label}
                    <br />
                    <span className="text-[12px] font-medium text-[#3EA96E]">{t.stat3Year}</span>
                  </div>
                </div>
                <div className="my-2.5 h-[2px] w-[34px] bg-[#3EA96E]" />
                <p className="font-[family-name:var(--font-poppins)] text-[12.5px] font-light leading-relaxed text-white/70">
                  {t.stat3Desc}
                </p>
              </div>

              {/* Stat 4: Trade Balance */}
              <div
                className={`absolute left-[20px] top-[400px] w-[210px] text-right transition-all duration-1000 ease-out ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[200px]"
                }`}
                style={{ transitionDelay: "500ms" }}
              >
                <div style={{ transform: `scale(${textScale})`, transformOrigin: "top right" }}>
                  <div className="font-[family-name:var(--font-playfair)] text-[29px] font-extrabold leading-none text-[#3EA96E]">
                    {t.stat4Value}
                  </div>
                  <div className="mt-1.5 font-[family-name:var(--font-poppins)] text-[14.5px] font-bold leading-tight tracking-wide text-white">
                    {t.stat4Label}
                    <br />
                    <span className="text-[12px] font-medium text-[#3EA96E]">{t.stat4Year}</span>
                  </div>
                </div>
                <div className="my-2.5 ml-auto h-[2px] w-[34px] bg-[#3EA96E]" />
                <p className="font-[family-name:var(--font-poppins)] text-[12.5px] font-light leading-relaxed text-white/70">
                  {t.stat4Desc}
                </p>
              </div>
            </>
          )}

          {/* Center dome with logo — HOVER: cursor-pointer + scale */}
          <div
            className={`group/logo absolute bottom-0 left-1/2 h-[310px] w-[310px] -translate-x-1/2 translate-y-[-95px] transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 translate-y-[-95px]" : "opacity-0 translate-y-[150px]"
            }`}
            style={{ transitionDelay: "450ms" }}
          >
            <div
              className="absolute bottom-0 left-0 h-full w-full cursor-pointer overflow-hidden rounded-full border-4 border-[#3EA96E] shadow-[0_18px_40px_-8px_rgba(0,0,0,0.6),inset_0_3px_6px_rgba(255,255,255,0.1),inset_0_-6px_14px_rgba(0,0,0,0.45)] transition-all duration-500 ease-out group-hover/logo:scale-105 group-hover/logo:shadow-[0_24px_50px_-8px_rgba(62,169,110,0.4)]"
              style={{ backgroundImage: "radial-gradient(circle at 35% 30%, #1B5A3F 0%, #0A2A1E 75%)" }}
            >
              <Image
                src="/logo-Boyot-1.png"
                alt="Boyut Al Kawthar"
                fill
                className="object-contain p-8 transition-transform duration-500 ease-out group-hover/logo:scale-110"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* ===== MOBILE: stats normal flow me (no scaling, no overlap) ===== */}
      {isMobile && (
        <div className="relative z-10 mx-auto w-full max-w-[1081px] px-5 pb-12 pt-4">
          <div className="grid grid-cols-2 gap-x-5 gap-y-7">
            {mobileStats.map((s, i) => (
              <div
                key={s.label}
                className={`${isAr ? "text-right" : "text-left"} transition-all duration-1000 ease-out ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[40px]"
                }`}
                style={{ transitionDelay: `${350 + i * 100}ms` }}
              >
                <div className="font-[family-name:var(--font-playfair)] text-[19px] font-extrabold leading-none text-[#3EA96E]">
                  {s.value}
                </div>
                <div className="mt-1.5 font-[family-name:var(--font-poppins)] text-[10.5px] font-bold leading-tight tracking-wide text-white">
                  {s.label}
                </div>
                <div className="mt-0.5 font-[family-name:var(--font-poppins)] text-[9.5px] font-medium text-[#3EA96E]">
                  {s.year}
                </div>
                <div
                  className={`my-2 h-[2px] w-[28px] bg-[#3EA96E] ${isAr ? "ml-auto" : ""}`}
                />
                <p className="font-[family-name:var(--font-poppins)] text-[10.5px] font-light leading-relaxed text-white/70">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}