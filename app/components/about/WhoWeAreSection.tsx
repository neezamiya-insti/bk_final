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
// Subtle decorative background image behind the whole section.
// High-quality aerial shipping-port photo (Haris Illahi / Unsplash — free to use, no attribution required).
const BG_IMAGE =
  "https://images.unsplash.com/photo-1759272840712-c7e5ea852367?fm=jpg&q=80&w=2400&auto=format&fit=crop";

const LANG_KEY = "bk-lang";
type LangCode = "EN" | "AR";

const TEXT = {
  EN: {
    topHeading: "Our Story",
    heading: "Your Strategic Partner in Global Trade.",
    paragraph1:
      "We are Bayout Al Kawthar. An export house under the Saudi Export Development Authority, we specialize in bridging the gap between local producers and international markets.",
    paragraph2:
      "Our mission is simple: to streamline your export journey and unlock access to the world\u2019s most promising markets.",
    cta: "Explore More",
    checklist: ["Market entry guidance", "Export documentation support", "International buyer connections"],
  },
  AR: {
    topHeading: "قصتنا",
    heading: "شريكك الاستراتيجي في التجارة العالمية.",
    paragraph1:
      "نحن بيوت الكوثر، بيت تصدير تابع لهيئة تنمية الصادرات السعودية، متخصصون في سد الفجوة بين المنتجين المحليين والأسواق العالمية.",
    paragraph2:
      "مهمتنا بسيطة: تسهيل رحلتك التصديرية وفتح الأبواب أمام أكثر الأسواق العالمية الواعدة.",
    cta: "استكشف المزيد",
    checklist: ["إرشاد لدخول الأسواق", "دعم مستندات التصدير", "التواصل مع المشترين الدوليين"],
  },
} as const;

function readStoredLang(): LangCode {
  if (typeof window === "undefined") return "EN";
  return window.localStorage.getItem(LANG_KEY) === "AR" ? "AR" : "EN";
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

  const [badgeRef, badgeInView] = useInView<HTMLDivElement>(0.5);
  const [leftBlockRef, leftBlockInView] = useInView<HTMLDivElement>(0.3);
  const [bottomBlockRef, bottomBlockInView] = useInView<HTMLDivElement>(0.3);
  const [imageBlockRef, imageBlockInView] = useInView<HTMLDivElement>(0.3);

  return (
    <section
      dir={isAr ? "rtl" : "ltr"}
      className={`${playfair.variable} ${poppins.variable} relative w-full overflow-hidden bg-white pt-0 pb-10 sm:pb-14 md:pb-16 lg:pb-20`}
    >
      {/* Subtle decorative background image */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        <Image
          src={BG_IMAGE}
          alt=""
          fill
          className="object-cover opacity-[0.07]"
          aria-hidden="true"
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 md:px-8 lg:px-10">
        {/* Two-column content */}
        <div
          dir="ltr"
          className="grid translate-y-4 grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-[1.18fr_0.82fr] lg:gap-12"
        >
          {/* Text column */}
          <div
            className={[
              "order-2 w-full",
              isAr ? "lg:order-2 lg:text-right" : "lg:order-1 lg:text-left",
              "text-left",
            ].join(" ")}
            dir={isAr ? "rtl" : "ltr"}
          >
            {/* Eyebrow badge */}
            <div
              ref={badgeRef}
              className={[
                "inline-flex items-center gap-2 rounded-full bg-[#13233F]/5 px-3.5 py-1.5",
                "transition-all duration-700 ease-out",
                badgeInView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
              ].join(" ")}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#F5B301]" />
              <span className="font-[family-name:var(--font-poppins)] text-[11px] font-semibold uppercase tracking-wide text-[#13233F] sm:text-[12px]">
                {t.topHeading}
              </span>
            </div>

            <h3
              ref={leftBlockRef}
              className={[
                "mt-4 font-[family-name:var(--font-playfair)] text-2xl font-extrabold leading-[1.2] text-[#13233F] sm:mt-5 sm:text-3xl md:text-4xl",
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
              <ul
                className="mt-6 grid grid-cols-1 gap-2.5 sm:mt-7 sm:grid-cols-2 sm:gap-3 md:gap-4"
                aria-label={isAr ? "خدماتنا" : "Our capabilities"}
              >
                {t.checklist.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 font-[family-name:var(--font-poppins)] text-[12px] font-medium leading-snug text-[#13233F] sm:text-[13px]"
                  >
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#F5B301] text-[10px] font-bold text-[#13233F] sm:h-5 sm:w-5 sm:text-xs">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-5 font-[family-name:var(--font-poppins)] text-[13.5px] font-light leading-relaxed text-[#5C5C5C] sm:mt-6 sm:text-[14px] md:text-[15px]">
                {t.paragraph1}
              </p>
              <p className="mt-3 font-[family-name:var(--font-poppins)] text-[13.5px] font-light leading-relaxed text-[#5C5C5C] sm:mt-4 sm:text-[14px] md:text-[15px]">
                {t.paragraph2}
              </p>

              <Link
                href={EXPLORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn mt-6 inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#13233F] px-5 py-2.5 font-[family-name:var(--font-poppins)] text-[12.5px] font-semibold text-white transition-colors duration-300 hover:bg-[#C0272D] sm:mt-8 sm:px-6 sm:text-[13.5px] md:mt-10"
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

          {/* Image column */}
          <div
            ref={imageBlockRef}
            className={[
              "order-1 relative w-full cursor-pointer overflow-hidden rounded-[1.5rem] mt-8 sm:rounded-[2rem]",
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