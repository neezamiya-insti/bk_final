"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
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

const EXPLORE_URL = "https://bk.com.sa/about-boyut-al-kawthar/";

// High-quality free-license background (Unsplash, no attribution required)
const HERO_IMAGE ='/hero.png'

const LANG_KEY = "bk-lang";
type LangCode = "EN" | "AR";

const TEXT = {
  EN: {
    eyebrow: "Boyut Al-Kawthar",
    heading: "Saudi Exporters\u2019 Gateway to",
    headingHighlight: "Global Markets",
    paragraph:
      "Take Your Products Global. We Handle the Details. Unlock 55+ World-Wide Markets. We\u2019ll Guide Your Expansion.",
    cta: "Explore More",
    ourLocation: "Our Location",
    address: "Ibrahim Ibn Baz St., Al Sulay District, Riyadh 14276, Saudi Arabia.",
    emailUs: "Email Us",
    callUs: "Call Us",
  },
  AR: {
    eyebrow: "بيوت الكوثر",
    heading: "بوابة المصدّرين السعوديين إلى",
    headingHighlight: "الأسواق العالمية",
    paragraph:
      "خذ منتجاتك إلى العالمية. نحن نتولى التفاصيل. افتح أكثر من 55 سوقاً حول العالم. سنرشدك خلال رحلة توسّعك.",
    cta: "استكشف المزيد",
    ourLocation: "موقعنا",
    address: "شارع إبراهيم بن باز، حي السلي، الرياض 14276، المملكة العربية السعودية.",
    emailUs: "راسلنا عبر البريد",
    callUs: "اتصل بنا",
  },
} as const;

function readStoredLang(): LangCode {
  if (typeof window === "undefined") return "EN";
  return window.localStorage.getItem(LANG_KEY) === "AR" ? "AR" : "EN";
}

export default function HeroSection() {
  // Drives the "slide in" entrance on first render
  const [mounted, setMounted] = useState(false);
  // Stays in sync with the language chosen in the Navbar (localStorage + a
  // custom "bk-lang-change" event the Navbar dispatches when it changes lang)
  const [langCode, setLangCode] = useState<LangCode>("EN");

  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  useEffect(() => {
    setLangCode(readStoredLang());

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

  const isAr = langCode === "AR";
  const t = TEXT[langCode];

  const slideClass = (delayClass: string) =>
    [
      "transition-all duration-700 ease-out",
      delayClass,
      mounted ? "translate-x-0 opacity-100" : isAr ? "translate-x-12 opacity-0" : "-translate-x-12 opacity-0",
    ].join(" ");

  return (
    <section
      dir={isAr ? "rtl" : "ltr"}
      className={`${playfair.variable} ${poppins.variable} group relative min-h-screen overflow-hidden`}
    >
      {/* Plain CSS (not Tailwind-generated) so the keyframes + hover-pause rule
          are always present in the stylesheet, regardless of JIT scanning. */}
      <style>{`
        @keyframes bkRingSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .bk-ring-el {
          animation: bkRingSpin 12s linear infinite;
        }
        .bk-ring-group:hover .bk-ring-el {
          animation-play-state: paused;
        }
      `}</style>

      {/* Background image — clickable, zooms smoothly on hover */}
      <Link
        href={EXPLORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Explore Boyut Al-Kawthar"
        className="absolute inset-0 z-0 block cursor-pointer"
      >
        <Image
          src={HERO_IMAGE}
          alt="Container port — global trade and logistics"
          fill
          priority
          sizes="100vw"
          quality={85}
          className="object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-110"
        />
        {/* Gradient overlay for text legibility — mirrors direction in Arabic */}
        <div
          className={
            isAr
              ? "absolute inset-0 bg-gradient-to-l from-[#13233F]/95 via-[#13233F]/70 to-[#13233F]/30"
              : "absolute inset-0 bg-gradient-to-r from-[#13233F]/95 via-[#13233F]/70 to-[#13233F]/30"
          }
        />
      </Link>

      {/* Content */}
      <div className="relative z-10 flex min-h-[560px] items-center px-6 py-24 sm:min-h-[620px] sm:px-12 lg:px-16">
        <div className={`max-w-2xl ${isAr ? "text-right" : "text-left"}`}>
          <span
            className={[
              "inline-block font-[family-name:var(--font-poppins)] text-[12px] font-semibold uppercase tracking-[0.2em] text-[#F5B301] sm:text-[13px]",
              slideClass(""),
            ].join(" ")}
          >
            {t.eyebrow}
          </span>

          <h1
            className={[
              "mt-4 font-[family-name:var(--font-playfair)] text-3xl font-extrabold leading-[1.2] text-white sm:text-4xl lg:text-[3.2rem]",
              slideClass("delay-150"),
            ].join(" ")}
          >
            {t.heading} <span className="text-[#F5B301]">{t.headingHighlight}</span>
          </h1>

          <p
            className={[
              "mt-5 font-[family-name:var(--font-poppins)] text-[14.5px] font-light leading-relaxed text-white/85 sm:mt-6 sm:text-[16px]",
              slideClass("delay-300"),
            ].join(" ")}
          >
            {t.paragraph}
          </p>

          <div className={["mt-8 sm:mt-9", slideClass("delay-500")].join(" ")}>
            <Link
              href={EXPLORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn relative z-20 inline-flex items-center gap-2 rounded-full bg-[#F5B301] px-6 py-3 font-[family-name:var(--font-poppins)] text-[14px] font-semibold text-[#13233F] shadow-lg shadow-black/10 transition-colors duration-300 hover:bg-[#C0272D] hover:text-white cursor-pointer sm:px-7 sm:py-3.5 sm:text-[14.5px]"
            >
              {t.cta}
              <span
                className={`transition-transform duration-300 ${
                  isAr ? "group-hover/btn:-translate-x-1 rotate-180" : "group-hover/btn:translate-x-1"
                }`}
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Badge cluster — back to the original position (fixed to the side on
          desktop, stacked below the text on mobile), slightly smaller, with a
          continuously rotating ring that pauses on hover. */}
      <aside
        className={[
          "bk-ring-group relative z-10 mx-auto mb-12 h-[min(78vw,320px)] w-[min(78vw,320px)] text-center text-white",
          "sm:h-[360px] sm:w-[360px]",
          "lg:absolute lg:top-[55%] lg:mx-0 lg:mb-0 lg:-translate-y-1/2",
          isAr ? "lg:left-[2%]" : "lg:right-[2%]",
        ].join(" ")}
      >
        <div className="bk-ring-el absolute inset-[14%] rounded-full border-2 border-dashed border-[#F5B301]" />

        <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-[#F5B301] bg-[#13233F] p-4 shadow-2xl sm:h-36 sm:w-36 sm:p-5">
          <Image
            src="/logo-Boyot-1.png"
            alt="Boyut Al-Kawthar logo"
            width={96}
            height={96}
            className="h-full w-full object-contain"
          />
        </div>

        <div className="absolute left-1/2 top-0 flex h-28 w-28 -translate-x-1/2 flex-col items-center justify-center rounded-full border-2 border-[#F5B301] bg-[#13233F]/90 px-3 shadow-xl sm:h-32 sm:w-32">
          <span className="font-[family-name:var(--font-poppins)] text-[10px] font-semibold sm:text-[11px]">
            {t.ourLocation}
          </span>
          <span className="mt-1.5 font-[family-name:var(--font-poppins)] text-[9px] leading-snug text-white/85 sm:mt-2 sm:text-[10px]">
            {t.address}
          </span>
        </div>

        <div className="absolute bottom-0 left-0 flex h-28 w-28 flex-col items-center justify-center rounded-full border-2 border-[#F5B301] bg-[#13233F]/90 px-2.5 shadow-xl sm:h-32 sm:w-32">
          <span className="font-[family-name:var(--font-poppins)] text-[10px] font-semibold sm:text-[11px]">
            {t.emailUs}
          </span>
          <a
            className="mt-1.5 font-[family-name:var(--font-poppins)] text-[9px] text-white/85 transition-colors hover:text-[#F5B301] sm:mt-2 sm:text-[10px]"
            href="mailto:Info@bk.com.sa"
            dir="ltr"
          >
            Info@bk.com.sa
          </a>
        </div>

        <div className="absolute bottom-0 right-0 flex h-28 w-28 flex-col items-center justify-center rounded-full border-2 border-[#F5B301] bg-[#13233F]/90 px-2.5 shadow-xl sm:h-32 sm:w-32">
          <span className="font-[family-name:var(--font-poppins)] text-[10px] font-semibold sm:text-[11px]">
            {t.callUs}
          </span>
          <a
            className="mt-1.5 font-[family-name:var(--font-poppins)] text-[9px] text-white/85 transition-colors hover:text-[#F5B301] sm:mt-2 sm:text-[10px]"
            href="tel:+966538597719"
            dir="ltr"
          >
            +966 53 859 7719
          </a>
        </div>
      </aside>
    </section>
  );
}