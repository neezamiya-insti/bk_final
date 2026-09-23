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
const HERO_IMAGE = '/hero1.png';

const LANG_KEY = "bk-lang";
type LangCode = "EN" | "AR" | "FR";

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
  FR: {
    eyebrow: "Boyut Al-Kawthar",
    heading: "La passerelle des exportateurs saoudiens vers",
    headingHighlight: "les marchés mondiaux",
    paragraph:
      "Faites passer vos produits à l'échelle mondiale. Nous nous occupons des détails. Accédez à plus de 55 marchés dans le monde. Nous vous guidons dans votre expansion.",
    cta: "En savoir plus",
    ourLocation: "Notre emplacement",
    address: "Rue Ibrahim Ibn Baz, District Al Sulay, Riyad 14276, Arabie Saoudite.",
    emailUs: "Écrivez-nous",
    callUs: "Appelez-nous",
  },
} as const;

function readStoredLang(): LangCode {
  if (typeof window === "undefined") return "EN";
  const saved = window.localStorage.getItem(LANG_KEY);
  if (saved === "AR" || saved === "EN" || saved === "FR") return saved;
  return "EN";
}

export default function HeroSection() {
  // Drives the "slide in" entrance on first render
  const [mounted, setMounted] = useState(false);
  // Stays in sync with the language chosen in the Navbar (localStorage + a
  // custom "bk-lang-change" event the Navbar dispatches when it changes lang)
  const [langCode, setLangCode] = useState<LangCode>(() => readStoredLang());

  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);

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
          className="scale-110 object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-125"
        />
      </Link>

      {/* Content row — text + badge cluster share ONE flex container so they are
          always vertically centered against each other, on every screen size.
          Mobile: stacked (flex-col). Desktop (lg+): side-by-side (flex-row),
          reversed for Arabic so the badge sits on the left like before. */}
      <div
        className={[
          "relative z-10 flex min-h-screen flex-col items-center gap-12 px-8 pb-24 pt-28",
          "sm:px-12 sm:pb-28 sm:pt-32 md:px-20",
          "lg:flex-row lg:items-start lg:justify-between lg:gap-10 lg:px-24 lg:pb-0 lg:pt-36",
          "xl:px-32 xl:pt-40",
          isAr ? "lg:flex-row-reverse" : "",
        ].join(" ")}
      >
        <div className={`max-w-xl shrink-0 lg:max-w-lg xl:max-w-xl ${isAr ? "text-right" : "text-left"}`}>
          <span
            className={[
              "inline-block translate-y-4 font-[family-name:var(--font-poppins)] text-[12px] font-semibold uppercase tracking-[0.2em] text-[#3EA96E] sm:text-[13px]",
              slideClass(""),
            ].join(" ")}
          >
            {t.eyebrow}
          </span>

          <h1
            className={[
              "mt-4 font-[family-name:var(--font-playfair)] text-3xl font-extrabold leading-[1.2] text-white sm:text-4xl lg:text-[3rem] xl:text-[3.2rem]",
              slideClass("delay-150"),
            ].join(" ")}
          >
            {t.heading} <span className="text-[#3EA96E]">{t.headingHighlight}</span>
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
              href="/about-us"
              className="group/btn relative z-20 inline-flex items-center gap-2 rounded-full bg-[#3EA96E] px-6 py-3 font-[family-name:var(--font-poppins)] text-[14px] font-semibold text-white shadow-lg shadow-black/10 transition-colors duration-300 hover:bg-[#C0272D] hover:text-white cursor-pointer sm:px-7 sm:py-3.5 sm:text-[14.5px]"
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

        {/* Badge cluster — now a normal flex child, so it's always centered
            against the text block regardless of screen height/ratio. The
            dashed ring is slightly larger, and the top "Our Location" badge
            is pulled further out so it no longer touches the center circle
            (matching the gap the bottom two badges already had). */}
        <aside
          className={[
            "bk-ring-group relative z-10 h-[min(78vw,320px)] w-[min(78vw,320px)] shrink-0 text-center text-white",
            "sm:h-[360px] sm:w-[360px]",
          ].join(" ")}
        >
          <div className="bk-ring-el absolute inset-[9%] rounded-full border-2 border-dashed border-[#3EA96E]" />

          <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-[#3EA96E] bg-[#1B4D3E] p-4 shadow-2xl sm:h-36 sm:w-36 sm:p-5">
            <Image
              src="/logo-Boyot-1.png"
              alt="Boyut Al-Kawthar logo"
              width={96}
              height={96}
              className="h-full w-full object-contain"
            />
          </div>

          <div className="absolute left-1/2 -top-6 flex h-28 w-28 -translate-x-1/2 flex-col items-center justify-center rounded-full border-2 border-[#3EA96E] bg-[#1B4D3E]/90 px-3 shadow-xl sm:-top-8 sm:h-32 sm:w-32">
            <span className="font-[family-name:var(--font-poppins)] text-[10px] font-semibold sm:text-[11px]">
              {t.ourLocation}
            </span>
            <span className="mt-1.5 font-[family-name:var(--font-poppins)] text-[9px] leading-snug text-white/85 sm:mt-2 sm:text-[10px]">
              {t.address}
            </span>
          </div>

          <div className="absolute bottom-0 left-0 flex h-28 w-28 flex-col items-center justify-center rounded-full border-2 border-[#3EA96E] bg-[#1B4D3E]/90 px-2.5 shadow-xl sm:h-32 sm:w-32">
            <span className="font-[family-name:var(--font-poppins)] text-[10px] font-semibold sm:text-[11px]">
              {t.emailUs}
            </span>
            <a
              className="mt-1.5 font-[family-name:var(--font-poppins)] text-[9px] text-white/85 transition-colors hover:text-[#3EA96E] sm:mt-2 sm:text-[10px]"
              href="mailto:Info@bk.com.sa"
              dir="ltr"
            >
              Info@bk.com.sa
            </a>
          </div>

          <div className="absolute bottom-0 right-0 flex h-28 w-28 flex-col items-center justify-center rounded-full border-2 border-[#3EA96E] bg-[#1B4D3E]/90 px-2.5 shadow-xl sm:h-32 sm:w-32">
            <span className="font-[family-name:var(--font-poppins)] text-[10px] font-semibold sm:text-[11px]">
              {t.callUs}
            </span>
            <a
              className="mt-1.5 font-[family-name:var(--font-poppins)] text-[9px] text-white/85 transition-colors hover:text-[#3EA96E] sm:mt-2 sm:text-[10px]"
              href="tel:+966538597719"
              dir="ltr"
            >
              +966 53 859 7719
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}