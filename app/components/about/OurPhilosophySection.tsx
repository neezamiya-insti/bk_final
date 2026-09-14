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
type LangCode = "EN" | "AR";

const PHILOSOPHY_BACKGROUNDS = [
  "/philosophy/p1.png",
  "/philosophy/p2.png",
  "/philosophy/p3.png",
  "/philosophy/p1.png",
];

const TEXT = {
  EN: {
    topHeading: "Our Philosophy",
    paragraph:
      "We believe in fostering sustainable growth through strategic partnerships and unwavering dedication. Our philosophy is rooted in empowering Saudi exporters to confidently navigate the global marketplace.",
    cards: [
      {
        title: "Strategic Partnerships",
        desc: "We build strong, collaborative relationships. We act as your trusted partner, guiding you through every step of your global expansion journey.",
      },
      {
        title: "Tailored Solutions",
        desc: "We customize export strategies and services. We understand your unique business needs and provide solutions that precisely match your market demands.",
      },
      {
        title: "Sustainable Growth",
        desc: "We drive long-term success. We champion responsible and ethical practices, ensuring the enduring growth of your business and Saudi exports on the global stage.",
      },
      {
        title: "Global Connections",
        desc: "We connect your business with trusted buyers and strategic partners. We create reliable paths to new markets, helping build relationships and expand globally with confidence.",
      },
    ],
  },
  AR: {
    topHeading: "فلسفتنا",
    paragraph:
      "نؤمن بتعزيز النمو المستدام من خلال الشراكات الاستراتيجية والتفاني الراسخ. تتجذر فلسفتنا في تمكين المصدرين السعوديين من التنقل بثقة في الأسواق العالمية.",
    cards: [
      {
        title: "الشراكات الاستراتيجية",
        desc: "نبني علاقات قوية وتعاونية. نعمل كشريكك الموثوق، ونرشدك في كل خطوة من رحلة توسعك العالمي.",
      },
      {
        title: "حلول مخصصة",
        desc: "نصمم استراتيجيات وخدمات تصدير مخصصة. نفهم احتياجات عملك الفريدة ونقدم حلولاً تلبي متطلبات سوقك بدقة.",
      },
      {
        title: "النمو المستدام",
        desc: "نقود النجاح على المدى الطويل. ندعم الممارسات المسؤولة والأخلاقية، لضمان النمو المستدام لأعمالك والصادرات السعودية على المسرح العالمي.",
      },
      {
        title: "اتصالات عالمية",
        desc: "نربط أعمالك بالمشترين والشركاء الموثوقين. ونفتح طرقًا موثوقة إلى أسواق جديدة، ونساعدك على بناء علاقات وتوسيع حضورك عالميًا بثقة.",
      },
    ],
  },
} as const;

function readStoredLang(): LangCode {
  if (typeof window === "undefined") return "EN";
  return window.localStorage.getItem(LANG_KEY) === "AR" ? "AR" : "EN";
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

export default function OurPhilosophySection() {
  const [langCode, setLangCode] = useState<LangCode>(() => readStoredLang());
  const [activeCard, setActiveCard] = useState<number | null>(null);

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

  const [topHeadingRef, topHeadingInView] = useInView<HTMLHeadingElement>(0.5);
  const [introRef, introBlockInView] = useInView<HTMLDivElement>(0.3);
  const [cardsRef, cardsInView] = useInView<HTMLDivElement>(0.15);

  return (
    <section
      dir={isAr ? "rtl" : "ltr"}
      className={`${playfair.variable} ${poppins.variable} w-full bg-white py-10 sm:py-12`}
    >
      {/* Top heading — centered */}
      <div className="flex flex-col items-center text-center">
        <h2
          ref={topHeadingRef}
          className={[
            "font-[family-name:var(--font-playfair)] text-2xl font-extrabold text-[#13233F] sm:text-4xl ",
            "transition-all duration-700 ease-out",
            topHeadingInView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
          ].join(" ")}
        >
          {t.topHeading}
        </h2>

        {/* Gold accent bar */}
        <span
          className={[
            "mt-3 h-1 w-16 rounded-full bg-[#F5B301] sm:mt-4 sm:w-20",
            "transition-all duration-700 ease-out delay-150",
            topHeadingInView ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0",
          ].join(" ")}
        />
      </div>

      {/* Description — centered */}
      <div
        ref={introRef}
        className={[
          "mx-auto mt-5 max-w-3xl text-center sm:mt-6",
          "transition-all duration-700 ease-out",
          introBlockInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
        ].join(" ")}
      >
        <p className="font-[family-name:var(--font-poppins)] text-[13.5px] font-light leading-relaxed text-[#5C5C5C] sm:text-[14px] md:text-[15px]">
          {t.paragraph}
        </p>
      </div>

      {/* Cards grid */}
      <div
        ref={cardsRef}
        className="mx-auto mt-8 grid max-w-6xl grid-cols-1 gap-5 px-4 pb-28 sm:mt-10 sm:gap-6 sm:px-6 sm:pb-32 md:grid-cols-2 md:px-8 lg:grid-cols-4 lg:gap-5 lg:px-10 lg:pb-36"
      >
        {t.cards.map((card, i) => (
          <article
            key={card.title}
            role="button"
            tabIndex={0}
            aria-expanded={activeCard === i}
            onClick={() => setActiveCard(activeCard === i ? null : i)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setActiveCard(activeCard === i ? null : i);
              }
            }}
            style={{ transitionDelay: `${i * 120}ms` }}
            className={[
              "group/card relative flex h-[300px] cursor-pointer flex-col overflow-visible rounded-[1.25rem] border border-[#13233F]/10 bg-white p-5 shadow-sm sm:h-[320px] sm:rounded-[1.5rem] sm:p-6",
              "w-full justify-self-center sm:w-[96%] lg:w-[92%]",
              "transition-all duration-700 ease-out",
              "hover:-translate-y-1 hover:border-[#F5B301]/60 hover:shadow-lg",
              activeCard === i ? "border-[#F5B301]/60 shadow-lg" : "",
              cardsInView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0",
            ].join(" ")}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-0 rounded-[1.25rem] bg-cover bg-center opacity-100 sm:rounded-[1.5rem]"
              style={{
                backgroundImage: `linear-gradient(rgba(19, 35, 63, 0.16), rgba(19, 35, 63, 0.16)), url(${PHILOSOPHY_BACKGROUNDS[i]})`,
              }}
            />
            <div
              className={[
                "relative z-10 min-h-[190px] text-center transition-transform duration-700 ease-out sm:min-h-[205px]",
                activeCard === i
                  ? "translate-y-0"
                  : "translate-y-1/2 group-hover/card:translate-y-0",
              ].join(" ")}
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#13233F] font-[family-name:var(--font-playfair)] text-sm font-extrabold text-[#F5B301] sm:h-11 sm:w-11 sm:text-base">
                {String(i + 1).padStart(2, "0")}
              </div>

              <h4 className="font-[family-name:var(--font-playfair)] text-lg font-extrabold leading-snug text-[#F5B301] opacity-100 sm:text-xl">
                {card.title}
              </h4>
              <p className="mt-3 font-[family-name:var(--font-poppins)] text-[13px] font-medium leading-relaxed text-white drop-shadow-[0_1px_3px_rgba(19,35,63,0.95)] sm:text-[13.5px] md:text-[14px]">
                {card.desc}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}