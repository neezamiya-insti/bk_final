"use client";

import { useEffect, useRef, useState } from "react";
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

const EXPLORE_URL = "https://bk.com.sa/boyut-al-kawthar-services/";
const ABOUT_IMAGE = "/about/about1.png";
const BACKGROUND_IMAGE = "/about/back.png";

const LANG_KEY = "bk-lang";
type LangCode = "EN" | "AR" | "FR";

const TEXT = {
  EN: {
    topHeading: "Who we are?",
    heading: "Your Strategic Partner in Global Trade.",
    paragraph1:
      "We are Bayout Al Kawthar. An export house under the Saudi Export Development Authority, we specialize in bridging the gap between local producers and international markets.",
    paragraph2:
      "Our mission is simple: to streamline your export journey and unlock access to the world\u2019s most promising markets.",
    cta: "Explore More",
    checklist: ["Market entry guidance", "Export documentation support", "International buyer connections"],
  },
  AR: {
    topHeading: "من نحن؟",
    heading: "شريكك الاستراتيجي في التجارة العالمية.",
    paragraph1:
      "نحن بيوت الكوثر، بيت تصدير تابع لهيئة تنمية الصادرات السعودية، متخصصون في سد الفجوة بين المنتجين المحليين والأسواق العالمية.",
    paragraph2:
      "مهمتنا بسيطة: تسهيل رحلتك التصديرية وفتح الأبواب أمام أكثر الأسواق العالمية الواعدة.",
    cta: "استكشف المزيد",
    checklist: ["إرشاد لدخول الأسواق", "دعم مستندات التصدير", "التواصل مع المشترين الدوليين"],
  },
  FR: {
    topHeading: "Qui sommes-nous ?",
    heading: "Votre partenaire stratégique dans le commerce mondial.",
    paragraph1:
      "Nous sommes Bayout Al Kawthar. Une maison d'exportation relevant de l'Autorité saoudienne de développement des exportations, nous sommes spécialisés dans le rapprochement entre les producteurs locaux et les marchés internationaux.",
    paragraph2:
      "Notre mission est simple : simplifier votre parcours d'exportation et vous ouvrir l'accès aux marchés les plus prometteurs au monde.",
    cta: "En savoir plus",
    checklist: [
      "Conseils pour l'entrée sur le marché",
      "Soutien documentaire à l'exportation",
      "Connexions avec des acheteurs internationaux",
    ],
  },
} as const;

function readStoredLang(): LangCode {
  if (typeof window === "undefined") return "EN";
  const saved = window.localStorage.getItem(LANG_KEY);
  if (saved === "AR" || saved === "EN" || saved === "FR") return saved;
  return "EN";
}

/** Reveals an element once it scrolls into view; fires only the first time. */
function useInView<T extends HTMLElement>(threshold = 0.25) {
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

export default function WhoWeAreSection() {
  const [langCode, setLangCode] = useState<LangCode>(() => readStoredLang());

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

  const [topHeadingRef, topHeadingInView] = useInView<HTMLHeadingElement>(0.5);
  const [leftBlockRef, leftBlockInView] = useInView<HTMLDivElement>(0.3);
  const [bottomBlockRef, bottomBlockInView] = useInView<HTMLDivElement>(0.3);
  const [imageBlockRef, imageBlockInView] = useInView<HTMLDivElement>(0.3);

  return (
    <section
      dir={isAr ? "rtl" : "ltr"}
      className={`${playfair.variable} ${poppins.variable} relative mx-auto w-full overflow-hidden bg-white`}
    >
      {/* Background image — full section, no overlay */}
      <Image
        src={BACKGROUND_IMAGE}
        alt=""
        fill
        sizes="100vw"
        quality={85}
        className="object-cover object-center"
        priority
      />

      {/* Content wrapper */}
      <div className="relative z-10 mx-auto max-w-none px-4 pb-10 pt-10 sm:px-4 sm:pb-14 sm:pt-14 md:px-4 md:pb-16 md:pt-16 lg:px-4 lg:pb-20 lg:pt-20">
        {/* Two-column content */}
        <div
          dir="ltr"
          className="mt-5 grid grid-cols-1 items-start gap-6 sm:mt-6 sm:gap-8 lg:mt-8 lg:grid-cols-[1.1fr_auto_0.9fr] lg:gap-10"
        >
          {/* Text column */}
          <div
            className={[
              "order-2 w-full",
              isAr ? "lg:order-3 lg:text-right" : "lg:order-1 lg:text-left",
              "text-left",
            ].join(" ")}
            dir={isAr ? "rtl" : "ltr"}
          >
            {/* Heading — GOLD (same as line color) */}
            <h3
              ref={leftBlockRef}
              className={[
                "font-[family-name:var(--font-playfair)] text-2xl font-extrabold leading-[1.25] text-[#F5B301] sm:text-3xl md:text-4xl",
                "transition-all duration-700 ease-out",
                leftBlockInView
                  ? "translate-x-0 opacity-100"
                  : isAr
                  ? "translate-x-16 opacity-0"
                  : "-translate-x-16 opacity-0",
              ].join(" ")}
            >
              {t.heading}
            </h3>

            <div
              ref={bottomBlockRef}
              className={[
                "transition-all duration-700 ease-out delay-150",
                bottomBlockInView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0",
              ].join(" ")}
            >
              {/* Paragraphs — WHITE */}
              <p className="mt-4 font-[family-name:var(--font-poppins)] text-[14px] font-light leading-relaxed text-white sm:mt-5 md:mt-6 sm:text-[15px] md:text-[16px]">
                {t.paragraph1}
              </p>
              <p className="mt-3 font-[family-name:var(--font-poppins)] text-[14px] font-light leading-relaxed text-white sm:mt-4 md:mt-5 sm:text-[15px] md:text-[16px]">
                {t.paragraph2}
              </p>

              {/* Checklist — WHITE text with gold icons */}
              <ul
                className="mt-5 grid grid-cols-1 gap-2.5 sm:mt-6 sm:grid-cols-2 sm:gap-3 md:mt-7 md:gap-4"
                aria-label={
                  isAr ? "خدماتنا" : langCode === "FR" ? "Nos capacités" : "Our capabilities"
                }
              >
                {t.checklist.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 font-[family-name:var(--font-poppins)] text-[12px] font-medium leading-snug text-white sm:text-[13px]"
                  >
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#F5B301] text-[10px] font-bold text-[#13233F] sm:h-5 sm:w-5 sm:text-xs">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* CTA — gold button with navy text */}
              <Link
                href={EXPLORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn mt-6 inline-flex items-center gap-2 rounded-full bg-[#F5B301] px-5 py-2.5 font-[family-name:var(--font-poppins)] text-[13px] font-semibold text-[#13233F] transition-colors duration-300 hover:bg-[#C0272D] hover:text-white cursor-pointer sm:mt-8 md:mt-10 sm:px-6 sm:text-[14px]"
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

          {/* Center divider and section label — WHITE text, gold line */}
          <div
            ref={topHeadingRef}
            className={[
              "order-2 flex w-full items-center justify-start gap-3 lg:h-full lg:min-h-[24rem] lg:w-auto lg:flex-col lg:items-center lg:gap-0",
              "transition-all duration-700 ease-out",
              topHeadingInView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
            ].join(" ")}
          >
            <h2 className="whitespace-nowrap font-[family-name:var(--font-playfair)] text-lg font-extrabold text-white sm:text-xl lg:text-2xl">
              {t.topHeading}
            </h2>
            <span className="h-[3px] flex-1 bg-[#F5B301] lg:h-full lg:w-[3px] lg:flex-1" />
          </div>

          {/* Image column */}
          <div
            ref={imageBlockRef}
            className={[
              "order-1 relative w-full cursor-pointer overflow-hidden rounded-[1.5rem] sm:rounded-[2rem]",
              "aspect-[4/3] sm:aspect-[16/10] md:aspect-[3/2] lg:aspect-[4/5]",
              isAr ? "lg:order-1" : "lg:order-2",
              "transition-all duration-700 ease-out",
              imageBlockInView
                ? "translate-x-0 opacity-100"
                : isAr
                ? "-translate-x-16 opacity-0"
                : "translate-x-16 opacity-0",
            ].join(" ")}
          >
            <Image
              src={ABOUT_IMAGE}
              alt="Boyut Al-Kawthar — who we are"
              fill
              sizes="(min-width: 1024px) 45vw, (min-width: 640px) 90vw, 100vw"
              quality={85}
              className="object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}