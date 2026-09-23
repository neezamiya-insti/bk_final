"use client";

import Image from "next/image";
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

const BACKGROUND_IMAGE = "/about/hero.png";

const TEXT = {
  EN: {
    brand: "Boyut Al-Kawthar",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "About Us",
    heading: "About Boyut Al-Kawthar",
    paragraph:
      "Your trusted advisors in business success. We empower Saudi exporters to confidently navigate the global marketplace, bridging the gap between local producers and international opportunities.",
  },
  AR: {
    brand: "بيوت الكوثر",
    breadcrumbHome: "الرئيسية",
    breadcrumbCurrent: "من نحن",
    heading: "عن بيوت الكوثر",
    paragraph:
      "مستشاروك الموثوقون في نجاح الأعمال. نمكّن المصدرين السعوديين من التنقل بثقة في الأسواق العالمية، ونسد الفجوة بين المنتجين المحليين والفرص الدولية.",
  },
  FR: {
    brand: "Boyut Al-Kawthar",
    breadcrumbHome: "Accueil",
    breadcrumbCurrent: "À propos",
    heading: "À propos de Boyut Al-Kawthar",
    paragraph:
      "Vos conseillers de confiance pour la réussite de votre entreprise. Nous permettons aux exportateurs saoudiens de naviguer en toute confiance sur le marché mondial, en comblant le fossé entre les producteurs locaux et les opportunités internationales.",
  },
} as const;

function readStoredLang(): LangCode {
  if (typeof window === "undefined") return "EN";
  const saved = window.localStorage.getItem(LANG_KEY);
  if (saved === "AR" || saved === "EN" || saved === "FR") return saved;
  return "EN";
}

export default function AboutHero() {
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
      className={`${playfair.variable} ${poppins.variable} relative flex min-h-[500px] w-full items-center justify-center overflow-hidden bg-[#0F3327] sm:min-h-[560px] lg:min-h-[620px]`}
    >
      {/* Background image — about/hero.png (no overlay) */}
      <Image
        src={BACKGROUND_IMAGE}
        alt=""
        fill
        sizes="100vw"
        quality={85}
        className="object-cover object-center"
        priority
      />

      {/* Content — centered */}
      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-5 py-16 text-center sm:px-6 sm:py-20 lg:px-10 lg:py-24">
        {/* Brand — top small */}
        <div
          className={[
            "mb-4 transition-all duration-1000 ease-out",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
          ].join(" ")}
          style={{ transitionDelay: "0ms" }}
        >
          <p className="font-[family-name:var(--font-poppins)] text-[11.5px] font-semibold uppercase tracking-[6px] text-[#3EA96E] sm:text-[12.5px] sm:tracking-[8px]">
            {t.brand}
          </p>
        </div>

        {/* Heading — slides from LEFT */}
        <h1
          className={[
            "font-[family-name:var(--font-playfair)] text-3xl font-extrabold leading-[1.15] text-white sm:text-4xl md:text-5xl",
            "transition-all duration-1000 ease-out",
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
            "mt-4 block h-1 w-16 rounded-full bg-[#3EA96E] transition-all duration-1000 ease-out sm:mt-5 sm:w-20",
            isVisible ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0",
          ].join(" ")}
          style={{ transitionDelay: "350ms" }}
        />

        {/* Description — slides from RIGHT */}
        <p
          className={[
            "mx-auto mt-5 max-w-2xl font-[family-name:var(--font-poppins)] text-[13.5px] font-light leading-relaxed text-white/85 sm:mt-6 sm:text-[14.5px] md:text-[15px]",
            "transition-all duration-1000 ease-out",
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
            "mt-7 flex items-center gap-2 font-[family-name:var(--font-poppins)] text-[12px] font-medium sm:mt-8 sm:text-[13px]",
            "transition-all duration-1000 ease-out",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
          ].join(" ")}
          style={{ transitionDelay: "650ms" }}
        >
          <Link
            href="/"
            className="cursor-pointer text-white/70 transition-colors duration-300 hover:text-[#3EA96E]"
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