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
const BACKGROUND_IMAGE =
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1920&q=80";

const TEXT = {
  EN: {
    brand: "Boyut Al-Kawthar",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "News",
    heading: "News & Updates",
    paragraph:
      "Stay informed with the latest news, events, and milestones from Boyut Al-Kawthar. From international exhibitions to strategic partnerships — explore our journey in global trade.",
  },
  AR: {
    brand: "بيوت الكوثر",
    breadcrumbHome: "الرئيسية",
    breadcrumbCurrent: "الأخبار",
    heading: "الأخبار والتحديثات",
    paragraph:
      "ابقَ على اطلاع بآخر الأخبار والفعاليات والإنجازات من بيوت الكوثر. من المعارض الدولية إلى الشراكات الاستراتيجية — استكشف رحلتنا في التجارة العالمية.",
  },
  FR: {
    brand: "Boyut Al-Kawthar",
    breadcrumbHome: "Accueil",
    breadcrumbCurrent: "Actualités",
    heading: "Actualités et mises à jour",
    paragraph:
      "Restez informé des dernières nouvelles, événements et jalons de Boyut Al-Kawthar. Des expositions internationales aux partenariats stratégiques — explorez notre parcours dans le commerce mondial.",
  },
} as const;

function readStoredLang(): LangCode {
  if (typeof window === "undefined") return "EN";
  const saved = window.localStorage.getItem(LANG_KEY);
  if (saved === "AR" || saved === "EN" || saved === "FR") return saved;
  return "EN";
}

export default function NewsHero() {
  const [langCode, setLangCode] = useState<LangCode>(() => readStoredLang());
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  // Trigger entrance animation on first load / scroll into view
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
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  const isAr = langCode === "AR";
  const t = TEXT[langCode];

  return (
    <section
      ref={sectionRef}
      dir={isAr ? "rtl" : "ltr"}
      className={`${playfair.variable} ${poppins.variable} relative flex min-h-[460px] w-full items-center justify-center overflow-hidden bg-[#0F3327] sm:min-h-[520px] lg:min-h-[580px]`}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${BACKGROUND_IMAGE})` }}
      />

      {/* Slight green tint overlay so the background matches the site theme */}
      <div className="absolute inset-0 bg-[#0F3327]/40" aria-hidden="true" />

      {/* Content — centered */}
      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-5 py-14 text-center sm:px-6 sm:py-16 lg:px-10 lg:py-20">
        {/* Brand — top small */}
        <div
          className={[
            "mb-3.5 transition-all duration-1000 ease-out",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
          ].join(" ")}
          style={{ transitionDelay: "0ms" }}
        >
          <p className="font-[family-name:var(--font-poppins)] text-[10.5px] font-semibold uppercase tracking-[5px] text-[#3EA96E] drop-shadow-md sm:text-[11.5px] sm:tracking-[7px]">
            {t.brand}
          </p>
        </div>

        {/* Heading — slides from LEFT */}
        <h1
          className={[
            "font-[family-name:var(--font-playfair)] text-2xl font-extrabold leading-[1.18] text-white sm:text-3xl md:text-4xl",
            "transition-all duration-1000 ease-out drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]",
            isVisible
              ? "translate-x-0 opacity-100"
              : isAr
              ? "translate-x-20 opacity-0"
              : "-translate-x-20 opacity-0",
          ].join(" ")}
          style={{ transitionDelay: "150ms" }}
        >
          {t.heading}
        </h1>

        {/* Green accent bar */}
        <span
          className={[
            "mt-3.5 block h-1 w-14 rounded-full bg-[#3EA96E] shadow-lg shadow-black/40 transition-all duration-1000 ease-out sm:mt-4 sm:w-16",
            isVisible ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0",
          ].join(" ")}
          style={{ transitionDelay: "350ms" }}
        />

        {/* Description — slides from RIGHT */}
        <p
          className={[
            "mx-auto mt-4 max-w-xl font-[family-name:var(--font-poppins)] text-[12.5px] font-light leading-relaxed text-white sm:mt-5 sm:text-[13.5px] md:text-[14px]",
            "transition-all duration-1000 ease-out drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]",
            isVisible
              ? "translate-x-0 opacity-100"
              : isAr
              ? "-translate-x-20 opacity-0"
              : "translate-x-20 opacity-0",
          ].join(" ")}
          style={{ transitionDelay: "500ms" }}
        >
          {t.paragraph}
        </p>

        {/* Breadcrumb — bottom */}
        <nav
          aria-label="Breadcrumb"
          className={[
            "mt-6 flex items-center gap-2 font-[family-name:var(--font-poppins)] text-[11.5px] font-medium sm:mt-7 sm:text-[12.5px]",
            "transition-all duration-1000 ease-out drop-shadow-md",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
          ].join(" ")}
          style={{ transitionDelay: "650ms" }}
        >
          <Link
            href="/"
            className="cursor-pointer text-white/80 transition-colors duration-300 hover:text-[#3EA96E]"
          >
            {t.breadcrumbHome}
          </Link>
          <span className="text-[#3EA96E]">{isAr ? "←" : "→"}</span>
          <span className="text-[#3EA96E]">{t.breadcrumbCurrent}</span>
        </nav>
      </div>
    </section>
  );
}