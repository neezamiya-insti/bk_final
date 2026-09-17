"use client";

import Image from "next/image";
import { Fragment, useEffect, useRef, useState } from "react";
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

// Local background image (public/about/ab.png)
const BG_IMAGE = "/about/ab.png";
// Center logo
const CENTER_LOGO = "/logo-Boyot-1.png";

const TEXT = {
  EN: {
    mission: {
      label: "Our Mission",
      text: "To empower Saudi companies of all sizes to overcome the difficulties of international trade by providing comprehensive export solutions and ensuring the smooth movement of goods across borders.",
    },
    vision: {
      label: "Our Vision",
      text: "To be a leading company in facilitating Saudi trade, connecting diverse markets and enhancing economic growth through efficient export solutions for all locally manufactured goods in the Kingdom. Shaping the future of international trade.",
    },
  },
  AR: {
    mission: {
      label: "مهمتنا",
      text: "تمكين الشركات السعودية بمختلف أحجامها من تجاوز صعوبات التجارة الدولية من خلال تقديم حلول تصديرية شاملة وضمان الحركة السلسة للبضائع عبر الحدود.",
    },
    vision: {
      label: "رؤيتنا",
      text: "أن نكون الشركة الرائدة في تسهيل التجارة السعودية، وربط الأسواق المتنوعة، وتعزيز النمو الاقتصادي من خلال حلول تصديرية فعالة لجميع المنتجات المصنعة محليًا في المملكة، وصياغة مستقبل التجارة الدولية.",
    },
  },
  FR: {
    mission: {
      label: "Notre mission",
      text: "Permettre aux entreprises saoudiennes de toutes tailles de surmonter les difficultés du commerce international en fournissant des solutions d'exportation complètes et en assurant la circulation fluide des marchandises à travers les frontières.",
    },
    vision: {
      label: "Notre vision",
      text: "Être une entreprise leader dans la facilitation du commerce saoudien, en connectant divers marchés et en renforçant la croissance économique grâce à des solutions d'exportation efficaces pour tous les produits fabriqués localement dans le Royaume. Façonner l'avenir du commerce international.",
    },
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

function MissionIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function VisionIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M2.5 12s3.6-6.5 9.5-6.5S21.5 12 21.5 12s-3.6 6.5-9.5 6.5S2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export default function MissionVisionSection() {
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

  const [missionRef, missionInView] = useInView<HTMLDivElement>(0.3);
  const [visionRef, visionInView] = useInView<HTMLDivElement>(0.3);

  const cards = [
    {
      ref: missionRef,
      inView: missionInView,
      ...t.mission,
      Icon: MissionIcon,
      dir: -1,
    },
    {
      ref: visionRef,
      inView: visionInView,
      ...t.vision,
      Icon: VisionIcon,
      dir: 1,
    },
  ];

  return (
    <section
      dir={isAr ? "rtl" : "ltr"}
      className={`${playfair.variable} ${poppins.variable} min-w-0 w-full overflow-x-clip bg-white px-4 py-14 sm:px-6 md:px-8 md:py-16`}
    >
      <div className="relative mx-auto grid min-w-0 w-full grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 md:gap-28">
        {/* Center logo — static, rounded, no dynamic images */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 hidden h-48 w-48 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-4 border-white bg-[#13233F] shadow-xl md:block">
          <div className="relative h-full w-full p-6">
            <Image
              src={CENTER_LOGO}
              alt="Boyut Al-Kawthar"
              fill
              sizes="192px"
              className="object-contain"
              aria-hidden="true"
            />
          </div>
        </div>

        {cards.map((card, index) => (
          <Fragment key={card.label}>
            <div
              ref={card.ref}
              className={[
                "group relative cursor-pointer overflow-hidden rounded-[2.5rem] bg-white p-8 shadow-lg shadow-[#13233F]/10 ring-1 ring-[#13233F]/5 md:w-[78%] md:justify-self-center",
                "transition-all duration-500 ease-out hover:scale-[1.03] hover:shadow-2xl hover:shadow-[#13233F]/20 sm:p-10",
                "transition-[transform,opacity,box-shadow] duration-700",
                card.inView
                  ? "translate-y-0 opacity-100"
                  : card.dir < 0
                  ? "-translate-x-10 opacity-0"
                  : "translate-x-10 opacity-0",
              ].join(" ")}
            >
            {/* Background photo layer */}
            <div className="pointer-events-none absolute inset-0">
              <Image
                src={BG_IMAGE}
                alt=""
                fill
                className="object-cover object-center opacity-[0.08] transition-transform duration-700 ease-out group-hover:scale-110"
                aria-hidden="true"
              />
              <div className="absolute inset-0 bg-white/70" />
            </div>

            {/* Decorative glow blob */}
            <span className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#F5B301]/15 blur-2xl transition-transform duration-700 ease-out group-hover:scale-125" />

            {/* Icon badge */}
            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F5B301] text-[#13233F] transition-transform duration-500 ease-out group-hover:rotate-6 group-hover:scale-110 sm:h-16 sm:w-16">
              <card.Icon />
            </div>

            <h3 className="relative mt-6 font-[family-name:var(--font-playfair)] text-xl font-extrabold text-[#13233F] sm:text-2xl">
              {card.label}
            </h3>

            <div className="relative mt-3 h-[3px] w-10 rounded-full bg-[#F5B301]" />

            <p className="relative mt-4 font-[family-name:var(--font-poppins)] text-[13.5px] font-light leading-relaxed text-[#5C5C5C] sm:text-[14.5px]">
              {card.text}
            </p>
            </div>
            {index === 0 && (
              <div className="relative z-20 flex items-center justify-center md:hidden">
                <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-white bg-[#13233F] p-3 shadow-xl">
                  <Image
                    src={CENTER_LOGO}
                    alt="Boyut Al-Kawthar logo"
                    fill
                    sizes="96px"
                    className="object-contain"
                    aria-hidden="true"
                  />
                </div>
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </section>
  );
}