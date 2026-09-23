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
type LangCode = "EN" | "AR" | "FR";

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
    tapHint: "Tap to read",
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
    tapHint: "اضغط للقراءة",
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
  FR: {
    topHeading: "Notre philosophie",
    paragraph:
      "Nous croyons en une croissance durable fondée sur des partenariats stratégiques et un engagement constant. Notre philosophie vise à permettre aux exportateurs saoudiens d'évoluer avec confiance sur les marchés mondiaux.",
    tapHint: "Appuyez pour lire",
    cards: [
      {
        title: "Partenariats stratégiques",
        desc: "Nous construisons des relations solides et collaboratives. Nous sommes votre partenaire de confiance et vous accompagnons à chaque étape de votre expansion internationale.",
      },
      {
        title: "Solutions sur mesure",
        desc: "Nous adaptons les stratégies et les services d'exportation à vos besoins. Nous comprenons votre activité et proposons des solutions qui répondent précisément à vos marchés.",
      },
      {
        title: "Croissance durable",
        desc: "Nous favorisons une réussite durable. Nous défendons des pratiques responsables et éthiques pour assurer la croissance de votre entreprise et des exportations saoudiennes.",
      },
      {
        title: "Connexions mondiales",
        desc: "Nous mettons votre entreprise en relation avec des acheteurs et des partenaires fiables. Nous ouvrons des voies vers de nouveaux marchés pour développer vos relations avec confiance.",
      },
    ],
  },
} as const;

function readStoredLang(): LangCode {
  if (typeof window === "undefined") return "EN";
  const storedLang = window.localStorage.getItem(LANG_KEY);
  return storedLang === "AR" || storedLang === "FR" ? storedLang : "EN";
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
      if (detail === "AR" || detail === "EN" || detail === "FR") setLangCode(detail);
    };
    const handleStorage = (e: StorageEvent) => {
      if (e.key === LANG_KEY && (e.newValue === "AR" || e.newValue === "EN" || e.newValue === "FR")) {
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
      className={`${playfair.variable} ${poppins.variable} w-full bg-white pb-4 pt-10 sm:pb-16 sm:pt-18`}
    >
      {/* Top heading — centered */}
      <div className="flex flex-col items-center text-center">
        <h2
          ref={topHeadingRef}
          className={[
            "font-[family-name:var(--font-playfair)] text-2xl font-extrabold text-[#3EA96E] sm:text-4xl ",
            "transition-all duration-700 ease-out",
            topHeadingInView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
          ].join(" ")}
        >
          {t.topHeading}
        </h2>

        {/* Accent bar */}
        <span
          className={[
            "mt-3 h-1 w-16 rounded-full bg-[#3EA96E] sm:mt-4 sm:w-20",
            "transition-all duration-700 ease-out delay-150",
            topHeadingInView ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0",
          ].join(" ")}
        />
      </div>

      {/* Description — centered */}
      <div
        ref={introRef}
        className={[
          "mx-auto mt-5 max-w-3xl px-4 text-center sm:mt-6",
          "transition-all duration-700 ease-out",
          introBlockInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
        ].join(" ")}
      >
        <p className="font-[family-name:var(--font-poppins)] text-[13.5px] font-light leading-relaxed text-[#5C5C5C] sm:text-[14px] md:text-[15px]">
          {t.paragraph}
        </p>
      </div>

      {/* Cards grid — content ab har screen par card ke andar rehta hai,
          isliye pehle wali bari bottom padding ki zaroorat nahi */}
      <div
        ref={cardsRef}
        className="mx-auto mt-8 grid max-w-6xl grid-cols-1 gap-5 px-4 pb-10 sm:mt-10 sm:gap-6 sm:px-6 sm:pb-14 md:grid-cols-2 md:px-8 lg:grid-cols-4 lg:gap-5 lg:px-10 lg:pb-16"
      >
        {t.cards.map((card, i) => {
          const isOpen = activeCard === i;

          return (
            <article
              key={card.title}
              role="button"
              tabIndex={0}
              aria-expanded={isOpen}
              onClick={() => setActiveCard(isOpen ? null : i)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setActiveCard(isOpen ? null : i);
                }
              }}
              style={{ transitionDelay: `${i * 120}ms` }}
              className={[
                "group/card relative h-[300px] cursor-pointer sm:h-[340px] lg:h-[380px]",
                "w-full justify-self-center sm:w-[96%] lg:w-[92%]",
                "transition-all duration-700 ease-out",
                cardsInView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0",
              ].join(" ")}
            >
              {/* Image block */}
              <div
                className={[
                  "absolute inset-0 overflow-hidden rounded-[1.25rem] border shadow-sm transition-all duration-700 ease-out sm:rounded-[1.5rem]",
                  isOpen ? "border-[#3EA96E]/60 shadow-lg" : "border-[#1B4D3E]/10",
                  "md:group-hover/card:-translate-y-1 md:group-hover/card:border-[#3EA96E]/60 md:group-hover/card:shadow-lg",
                ].join(" ")}
              >
                {/* Background image + base overlay */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `linear-gradient(rgba(27, 77, 62, 0.35), rgba(27, 77, 62, 0.55)), url(${PHILOSOPHY_BACKGROUNDS[i]})`,
                  }}
                />

                {/* Extra dark layer — open / hover par fade in, taake paragraph readable rahe */}
                <div
                  aria-hidden="true"
                  className={[
                    "pointer-events-none absolute inset-0 z-[1] bg-[#1B4D3E]/45 transition-opacity duration-500 ease-out",
                    isOpen ? "opacity-100" : "opacity-0 md:group-hover/card:opacity-100",
                  ].join(" ")}
                />
              </div>

              {/* Content — har breakpoint par card ke BEECH me */}
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center sm:px-7 lg:px-8">
                {/* Title */}
                <h4 className="font-[family-name:var(--font-playfair)] text-xl font-extrabold leading-snug text-[#3EA96E] drop-shadow-[0_2px_4px_rgba(27,77,62,0.9)] lg:text-[22px]">
                  {card.title}
                </h4>

                {/* Divider */}
                <div
                  className={[
                    "mt-3 h-[2px] rounded-full bg-[#3EA96E] transition-all duration-500 ease-out",
                    isOpen ? "w-14" : "w-10 md:group-hover/card:w-14",
                  ].join(" ")}
                />

                {/* Description — ek paragraph, center me expand hota hua */}
                <div
                  className={[
                    "grid w-full transition-all duration-500 ease-out",
                    isOpen
                      ? "mt-4 grid-rows-[1fr] opacity-100"
                      : "mt-0 grid-rows-[0fr] opacity-0 md:group-hover/card:mt-4 md:group-hover/card:grid-rows-[1fr] md:group-hover/card:opacity-100",
                  ].join(" ")}
                >
                  <div className={`w-full overflow-hidden ${isAr ? "text-right" : "text-left"}`}>
                    <p className="font-[family-name:var(--font-poppins)] text-[13px] font-medium leading-relaxed text-white drop-shadow-[0_2px_4px_rgba(27,77,62,0.95)] sm:text-[13.5px] lg:text-[14px]">
                      {card.desc}
                    </p>
                  </div>
                </div>

                {/* Hint — sirf mobile par, band halat me */}
                <span
                  className={[
                    "mt-4 font-[family-name:var(--font-poppins)] text-[10px] font-medium uppercase tracking-[2px] text-white/75",
                    "transition-opacity duration-300 md:hidden",
                    isOpen ? "opacity-0" : "opacity-100",
                  ].join(" ")}
                >
                  {t.tapHint}
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}