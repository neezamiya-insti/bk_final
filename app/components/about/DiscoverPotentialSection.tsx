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
type LangCode = "EN" | "AR";

const CONTAINER_WIDTH = 1081;
const CONTAINER_HEIGHT = 721;
const BACKGROUND_IMAGE = "/about/back2.png";
// Same subtle background photo used across the "Who We Are" / "Our Philosophy" sections
// (Haris Illahi / Unsplash — free to use, no attribution required).
const WHY_CHOOSE_BG =
  "https://images.unsplash.com/photo-1759272840712-c7e5ea852367?fm=jpg&q=80&w=2400&auto=format&fit=crop";

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
    paragraph:
      "Imagine your brand, worldwide! We, at Boyout Al Kawthar, don't just offer expertise and connections; we open doors. Partner with us, and we'll build you a custom roadmap to conquer new markets.",
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
    paragraph:
      "تخيل علامتك التجارية حول العالم! نحن في بيوت الكوثر لا نقدم الخبرة والاتصالات فحسب، بل نفتح الأبواب. كن شريكًا لنا، وسنبني لك خارطة طريق مخصصة لفتح أسواق جديدة.",
  },
} as const;

function readStoredLang(): LangCode {
  if (typeof window === "undefined") return "EN";
  return window.localStorage.getItem(LANG_KEY) === "AR" ? "AR" : "EN";
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
      if (detail === "AR" || detail === "EN") setLangCode(detail);
    };
    const handleStorage = (e: StorageEvent) => {
      if (e.key === LANG_KEY && (e.newValue === "AR" || e.newValue === "EN")) {
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
  const isMobile = scale < 0.6;

  return (
    <section
      ref={sectionRef}
      dir={isAr ? "rtl" : "ltr"}
      className={`${playfair.variable} ${poppins.variable} relative w-full overflow-hidden bg-[#13233F]`}
    >
      {/* Background image — /about/back2.png (no overlay, image has its own) */}
      <Image
        src={BACKGROUND_IMAGE}
        alt=""
        fill
        sizes="100vw"
        quality={85}
        className="object-cover object-center"
        priority
      />

      {/* Same subtle background image used across the other sections, layered on top */}
      <Image
        src={WHY_CHOOSE_BG}
        alt=""
        fill
        sizes="100vw"
        quality={85}
        className="pointer-events-none object-cover object-center opacity-[0.08] mix-blend-luminosity"
        aria-hidden="true"
      />

      <div
        ref={wrapperRef}
        className="relative z-10 mx-auto w-full max-w-[1081px] overflow-hidden"
        style={{ height: `${(CONTAINER_HEIGHT + 30) * scale}px` }}
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
          {/* Badge — gold */}
          <div
            className={`absolute left-0 right-0 top-[34px] text-center transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[300px]"
            }`}
            style={{ transitionDelay: "0ms" }}
          >
            <p
              className="text-center font-[family-name:var(--font-poppins)] text-[13px] font-bold tracking-[7px] text-[#F5B301]"
              style={{
                transform: `scale(${textScale})`,
                transformOrigin: "top center",
                fontSize: isMobile ? "10px" : "13px",
              }}
            >
              {t.badge}
            </p>
          </div>

          {/* Heading — WHITE */}
          <div
            className={`absolute left-0 right-0 top-[100px] text-center transition-all duration-1000 ease-out md:top-[65px] ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-[400px]"
            }`}
            style={{ transitionDelay: "150ms" }}
          >
            <h1
              className="text-center font-[family-name:var(--font-playfair)] text-[28px] font-extrabold leading-[1.28] text-white md:text-[39px]"
              style={{
                transform: `scale(${textScale})`,
                transformOrigin: "top center",
                fontSize: isMobile ? "22px" : "28px",
              }}
            >
              {t.heading}
            </h1>
          </div>

          {/* Underline — gold */}
          <div
            className={`absolute left-1/2 top-[130px] h-[2px] w-[150px] -translate-x-1/2 bg-[#F5B301] transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
            } hidden md:block`}
            style={{ transitionDelay: "250ms" }}
          />

          {/* Description paragraph — WHITE */}
          <div
            className={`absolute left-1/2 top-[150px] -translate-x-1/2 text-center transition-all duration-1000 ease-out hidden md:block ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[100px]"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            <div style={{ transform: `scale(${textScale})`, transformOrigin: "top center" }}>
              <p className="mx-auto max-w-[600px] font-[family-name:var(--font-poppins)] text-[13px] font-light leading-relaxed text-white md:text-[14px]">
                {t.paragraph}
              </p>
            </div>
          </div>

          {/* Arc connectors — gold */}
          <svg
            className="absolute left-0 top-0"
            width="1081"
            height="721"
            viewBox="0 0 1081 721"
          >
            <path
              d="M342,330 C342,255 460,225 533,225 C606,225 724,255 724,330"
              stroke="#F5B301"
              strokeWidth={isMobile ? "8" : "6"}
              fill="none"
            />
            <path
              d="M320,352 C280,360 285,420 283,494"
              stroke="#F5B301"
              strokeWidth={isMobile ? "5" : "3.4"}
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M746,352 C786,360 790,420 786,494"
              stroke="#F5B301"
              strokeWidth={isMobile ? "5" : "3.4"}
              fill="none"
              strokeLinecap="round"
            />
          </svg>

          {/* Node 1 - Center Top */}
          <div
            className={`absolute left-[500px] top-[220px] flex items-center justify-center rounded-full border-[#F5B301] bg-[#0E1A30] shadow-lg transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[150px]"
            }`}
            style={{
              transitionDelay: "400ms",
              width: isMobile ? "80px" : "66px",
              height: isMobile ? "80px" : "66px",
              borderWidth: isMobile ? "2.5px" : "1.5px",
            }}
          >
            <svg viewBox="0 0 24 24" className={isMobile ? "h-9 w-9" : "h-7 w-7"} fill="none" stroke="#F5B301" strokeWidth={isMobile ? "2" : "1.6"} strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18" />
              <path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18z" />
            </svg>
          </div>

          {/* Node 2 - Left Top */}
          <div
            className={`absolute left-[309px] top-[320px] flex items-center justify-center rounded-full border-[#F5B301] bg-[#0E1A30] shadow-lg transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[150px]"
            }`}
            style={{
              transitionDelay: "500ms",
              width: isMobile ? "80px" : "66px",
              height: isMobile ? "80px" : "66px",
              borderWidth: isMobile ? "2.5px" : "1.5px",
            }}
          >
            <svg viewBox="0 0 24 24" className={isMobile ? "h-9 w-9" : "h-7 w-7"} fill="none" stroke="#F5B301" strokeWidth={isMobile ? "2" : "1.6"} strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 21h18" />
              <path d="M5 21V8l7-5 7 5v13" />
              <path d="M9 21v-6h6v6" />
            </svg>
          </div>

          {/* Node 3 - Right Top */}
          <div
            className={`absolute left-[693px] top-[320px] flex items-center justify-center rounded-full border-[#F5B301] bg-[#0E1A30] shadow-lg transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[150px]"
            }`}
            style={{
              transitionDelay: "500ms",
              width: isMobile ? "80px" : "66px",
              height: isMobile ? "80px" : "66px",
              borderWidth: isMobile ? "2.5px" : "1.5px",
            }}
          >
            <svg viewBox="0 0 24 24" className={isMobile ? "h-9 w-9" : "h-7 w-7"} fill="none" stroke="#F5B301" strokeWidth={isMobile ? "2" : "1.6"} strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 17l6-6 4 4 8-8" />
              <path d="M14 7h7v7" />
            </svg>
          </div>

          {/* Node 4 - Left Bottom */}
          <div
            className={`absolute left-[250px] top-[490px] flex items-center justify-center rounded-full border-[#F5B301] bg-[#0E1A30] shadow-lg transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[150px]"
            }`}
            style={{
              transitionDelay: "600ms",
              width: isMobile ? "80px" : "66px",
              height: isMobile ? "80px" : "66px",
              borderWidth: isMobile ? "2.5px" : "1.5px",
            }}
          >
            <svg viewBox="0 0 24 24" className={isMobile ? "h-9 w-9" : "h-7 w-7"} fill="none" stroke="#F5B301" strokeWidth={isMobile ? "2" : "1.7"} strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <path d="M3.3 7l8.7 5 8.7-5" />
              <path d="M12 22V12" />
            </svg>
          </div>

          {/* Node 5 - Right Bottom */}
          <div
            className={`absolute left-[753px] top-[490px] flex items-center justify-center rounded-full border-[#F5B301] bg-[#0E1A30] shadow-lg transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[150px]"
            }`}
            style={{
              transitionDelay: "600ms",
              width: isMobile ? "80px" : "66px",
              height: isMobile ? "80px" : "66px",
              borderWidth: isMobile ? "2.5px" : "1.5px",
            }}
          >
            <svg viewBox="0 0 24 24" className={isMobile ? "h-9 w-9" : "h-7 w-7"} fill="none" stroke="#F5B301" strokeWidth={isMobile ? "2" : "1.6"} strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2.5l2.9 6.3 6.9.7-5.2 4.6 1.6 6.7L12 17.6 5.8 20.8l1.6-6.7-5.2-4.6 6.9-.7L12 2.5z" />
            </svg>
          </div>

          {/* Stat 1: Saudi GDP */}
          <div
            className={`absolute left-[20px] top-[290px] w-[210px] text-right transition-all duration-1000 ease-out hidden md:block ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[200px]"
            }`}
            style={{ transitionDelay: "350ms" }}
          >
            <div style={{ transform: `scale(${textScale})`, transformOrigin: "top right" }}>
              <div className="font-[family-name:var(--font-playfair)] text-[22px] font-extrabold leading-none text-[#F5B301] md:text-[29px]">
                {t.stat1Value}
              </div>
              <div className="mt-1.5 font-[family-name:var(--font-poppins)] text-[13px] font-bold leading-tight tracking-wide text-white md:text-[14.5px]">
                {t.stat1Label}
                <br />
                <span className="text-[11px] font-medium text-[#F5B301] md:text-[12px]">
                  {t.stat1Year}
                </span>
              </div>
            </div>
            <div className="my-2.5 ml-auto h-[2px] w-[34px] bg-[#F5B301]" />
            <p className="hidden font-[family-name:var(--font-poppins)] text-[12.5px] font-light leading-relaxed text-white/70 md:block">
              {t.stat1Desc}
            </p>
          </div>

          {/* Stat 1 mobile */}
          <div
            className={`absolute left-[20px] top-[290px] w-[210px] text-right transition-all duration-1000 ease-out md:hidden ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[200px]"
            }`}
            style={{ transitionDelay: "350ms" }}
          >
            <div style={{ transform: `scale(${textScale})`, transformOrigin: "top right" }}>
              <div className="font-[family-name:var(--font-playfair)] text-[22px] font-extrabold leading-none text-[#F5B301]">
                {t.stat1Value}
              </div>
              <div className="mt-1.5 font-[family-name:var(--font-poppins)] text-[10px] font-bold leading-tight tracking-wide text-white">
                {t.stat1Label}
              </div>
            </div>
            <div className="my-2.5 ml-auto h-[2px] w-[34px] bg-[#F5B301]" />
          </div>

          {/* Stat 2: Saudi FDI */}
          <div
            className={`absolute left-[840px] top-[290px] w-[210px] text-left transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[200px]"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <div style={{ transform: `scale(${textScale})`, transformOrigin: "top left" }}>
              <div className="font-[family-name:var(--font-playfair)] text-[22px] font-extrabold leading-none text-[#F5B301] md:text-[29px]">
                {t.stat2Value}
              </div>
              <div className="mt-1.5 font-[family-name:var(--font-poppins)] text-[10px] font-bold leading-tight tracking-wide text-white md:text-[14.5px]">
                {t.stat2Label}
                <br />
                <span className="text-[9px] font-medium text-[#F5B301] md:text-[12px]">
                  {t.stat2Year}
                </span>
              </div>
            </div>
            <div className="my-2.5 h-[2px] w-[34px] bg-[#F5B301]" />
            <p className="hidden font-[family-name:var(--font-poppins)] text-[12.5px] font-light leading-relaxed text-white/70 md:block">
              {t.stat2Desc}
            </p>
          </div>

          {/* Stat 3: Saudi Export - desktop */}
          <div
            className={`absolute left-[880px] top-[470px] w-[210px] text-left transition-all duration-1000 ease-out hidden md:block ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[200px]"
            }`}
            style={{ transitionDelay: "550ms" }}
          >
            <div style={{ transform: `scale(${textScale})`, transformOrigin: "top left" }}>
              <div className="font-[family-name:var(--font-playfair)] text-[22px] font-extrabold leading-none text-[#F5B301] md:text-[29px]">
                {t.stat3Value}
              </div>
              <div className="mt-1.5 font-[family-name:var(--font-poppins)] text-[10px] font-bold leading-tight tracking-wide text-white md:text-[14.5px]">
                {t.stat3Label}
                <br />
                <span className="text-[9px] font-medium text-[#F5B301] md:text-[12px]">
                  {t.stat3Year}
                </span>
              </div>
            </div>
            <div className="my-2.5 h-[2px] w-[34px] bg-[#F5B301]" />
            <p className="hidden font-[family-name:var(--font-poppins)] text-[12.5px] font-light leading-relaxed text-white/70 md:block">
              {t.stat3Desc}
            </p>
          </div>

          {/* Stat 3: Saudi Export - mobile */}
          <div
            className={`absolute left-1/2 top-[650px] w-[210px] -translate-x-1/2 text-center transition-all duration-1000 ease-out md:hidden ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[200px]"
            }`}
            style={{ transitionDelay: "550ms" }}
          >
            <div
              className="flex items-center justify-center gap-2"
              style={{ transform: `scale(${textScale})`, transformOrigin: "top center" }}
            >
              <div className="font-[family-name:var(--font-playfair)] text-[22px] font-extrabold leading-none text-[#F5B301]">
                {t.stat3Value}
              </div>
              <div className="font-[family-name:var(--font-poppins)] text-[10px] font-bold leading-tight tracking-wide text-white">
                {t.stat3Label}
              </div>
            </div>
            <div className="mx-auto my-2.5 h-[2px] w-[34px] bg-[#F5B301]" />
          </div>

          {/* Stat 4: Trade Balance */}
          <div
            className={`absolute left-[20px] top-[490px] w-[210px] text-right transition-all duration-1000 ease-out hidden md:block ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[200px]"
            }`}
            style={{ transitionDelay: "500ms" }}
          >
            <div style={{ transform: `scale(${textScale})`, transformOrigin: "top right" }}>
              <div className="font-[family-name:var(--font-playfair)] text-[22px] font-extrabold leading-none text-[#F5B301] md:text-[29px]">
                {t.stat4Value}
              </div>
              <div className="mt-1.5 font-[family-name:var(--font-poppins)] text-[10px] font-bold leading-tight tracking-wide text-white md:text-[14.5px]">
                {t.stat4Label}
                <br />
                <span className="text-[9px] font-medium text-[#F5B301] md:text-[12px]">
                  {t.stat4Year}
                </span>
              </div>
            </div>
            <div className="my-2.5 ml-auto h-[2px] w-[34px] bg-[#F5B301]" />
            <p className="hidden font-[family-name:var(--font-poppins)] text-[12.5px] font-light leading-relaxed text-white/70 md:block">
              {t.stat4Desc}
            </p>
          </div>

          {/* Center dome with logo — HOVER: cursor-pointer + scale */}
          <div
            className={`group/logo absolute bottom-0 left-1/2 h-[310px] w-[310px] -translate-x-1/2 translate-y-[-95px] transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 translate-y-[-95px]" : "opacity-0 translate-y-[150px]"
            }`}
            style={{ transitionDelay: "450ms" }}
          >
            <div className="absolute bottom-0 left-0 h-full w-full cursor-pointer overflow-hidden rounded-full border-4 border-[#F5B301] bg-[#13233F] shadow-xl shadow-[#F5B301]/20 transition-all duration-500 ease-out group-hover/logo:scale-105 group-hover/logo:shadow-2xl group-hover/logo:shadow-[#F5B301]/40">
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
    </section>
  );
}