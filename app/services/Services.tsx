"use client";

import Image from "next/image";
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
type LangCode = "EN" | "AR";

// Same subtle decorative background image as other sections
const BG_IMAGE =
  "https://images.unsplash.com/photo-1759272840712-c7e5ea852367?fm=jpg&q=80&w=2400&auto=format&fit=crop";

type ServiceItem = {
  title: string;
  desc: string;
  image: string;
};

const TEXT: Record<LangCode, { heading: string; services: ServiceItem[] }> = {
  EN: {
    heading: "Our Services",
    services: [
      {
        title: "Market Research",
        desc: "BOYUT AL-KAWTHAR through its R&D activities and network of offices, scans all the market needs and insights for a specific product and provides all the necessary market information required for decision making processes.",
        image: "/services/s1.png",
      },
      {
        title: "Distributor Finder",
        desc: "BOYUT AL-KAWTHAR connects its clients with prime prospects of agents and distributors who can carry their brand name into their regions adequately to run sustainable export business over years.",
        image: "/services/s2.png",
      },
      {
        title: "Lead Generation",
        desc: "BOYUT AL-KAWTHAR runs digital marketing campaigns in different regions for your products within an efficient marketing strategy built on accurate insights from its expertise in different markets.",
        image: "/services/s3.png",
      },
      {
        title: "Meeting Agenda with Potential Buyers",
        desc: "BOYUT AL-KAWTHAR set up meetings and arrange official visits for buyers directly to your manufacturing facilities to discuss with you all the details about technical information, delivery terms and pricing.",
        image: "/services/s4.png",
      },
      {
        title: "Trade Missions",
        desc: "BOYUT AL-KAWTHAR arrange specialized industry-clustered trade missions to potential markets to meet up with potential markets to speed up the communications and to find a touchstone for opening new markets efficiently.",
        image: "/services/s5.png",
      },
      {
        title: "Competition Analysis",
        desc: "Before you take on the global stage, you need to know the players. At BOYUT AL-KAWTHAR, we conduct comprehensive competitor analyses, delving into your target markets to identify your rivals, their strengths and weaknesses, and any existing market gaps you can fill.",
        image: "/services/s6.png",
      },
    ],
  },
  AR: {
    heading: "خدماتنا",
    services: [
      {
        title: "أبحاث السوق",
        desc: "تقوم بيوت الكوثر من خلال أنشطة البحث والتطوير وشبكة مكاتبها بمسح جميع احتياجات السوق ورؤاه لمنتج معين، وتوفر كل المعلومات اللازمة لعمليات اتخاذ القرار.",
        image: "/services/s1.png",
      },
      {
        title: "إيجاد الموزعين",
        desc: "تربط بيوت الكوثر عملاءها بأفضل الوكلاء والموزعين القادرين على حمل علامتهم التجارية إلى مناطقهم لإدارة أعمال تصدير مستدامة على مر السنين.",
        image: "/services/s2.png",
      },
      {
        title: "توليد العملاء المحتملين",
        desc: "تدير بيوت الكوثر حملات تسويق رقمي في مناطق مختلفة لمنتجاتك ضمن استراتيجية تسويقية فعالة مبنية على رؤى دقيقة من خبرتها في أسواق متعددة.",
        image: "/services/s3.png",
      },
      {
        title: "جدولة اجتماعات مع المشترين المحتملين",
        desc: "تنظم بيوت الكوثر اجتماعات وزيارات رسمية للمشترين مباشرة إلى منشآتك التصنيعية لمناقشة التفاصيل الفنية وشروط التسليم والتسعير.",
        image: "/services/s4.png",
      },
      {
        title: "البعثات التجارية",
        desc: "تنظم بيوت الكوثر بعثات تجارية متخصصة حسب القطاع إلى الأسواق المحتملة لتسريع التواصل وفتح أسواق جديدة بكفاءة.",
        image: "/services/s5.png",
      },
      {
        title: "تحليل المنافسين",
        desc: "قبل دخول المسرح العالمي، عليك معرفة اللاعبين. في بيوت الكوثر، نجري تحليلات شاملة للمنافسين لتحديد نقاط القوة والضعف والفجوات في السوق التي يمكنك سدها.",
        image: "/services/s6.png",
      },
    ],
  },
};

function readStoredLang(): LangCode {
  if (typeof window === "undefined") return "EN";
  return window.localStorage.getItem(LANG_KEY) === "AR" ? "AR" : "EN";
}

/** Reveals an element once it scrolls into view; fires only the first time. */
function useInView<T extends HTMLElement>(threshold = 0.15) {
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

function ArrowIcon({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke={active ? "#13233F" : "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17L17 7" />
      <path d="M9 7h8v8" />
    </svg>
  );
}

export default function ServicesShowcaseSection() {
  const [langCode, setLangCode] = useState<LangCode>(() => readStoredLang());
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  // First-load entrance animation trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const currentRef = sectionRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  const isAr = langCode === "AR";
  const t = TEXT[langCode];
  const active = t.services[activeIndex];

  return (
    <section
      ref={sectionRef}
      dir={isAr ? "rtl" : "ltr"}
      className={`${playfair.variable} ${poppins.variable} relative w-full overflow-hidden bg-white px-4 py-12 sm:px-6 sm:py-14 md:px-8 md:py-16 lg:px-10 lg:py-20`}
    >
      {/* Subtle decorative background image — same as WhoWeAre / Contact */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        <Image
          src={BG_IMAGE}
          alt=""
          fill
          className="object-cover opacity-[0.07]"
          aria-hidden="true"
        />
      </div>

      {/* Content wrapper */}
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-14">
        {/* Left: crossfading image + description overlay — slides from LEFT */}
        <div
          className={[
            "relative h-[260px] w-full overflow-hidden rounded-[1.5rem] sm:h-[340px] sm:rounded-[1.75rem] md:h-[420px] lg:h-full lg:min-h-[520px]",
            "transition-all duration-1000 ease-out",
            isVisible
              ? "translate-x-0 opacity-100"
              : isAr
              ? "translate-x-20 opacity-0"
              : "-translate-x-20 opacity-0",
          ].join(" ")}
        >
          {t.services.map((service, i) => (
            <Image
              key={service.image + i}
              src={service.image}
              alt={service.title}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className={`object-cover transition-opacity duration-700 ease-out ${
                i === activeIndex ? "opacity-100" : "opacity-0"
              }`}
              priority={i === 0}
            />
          ))}

          {/* Description overlay card */}
          <div className="absolute inset-x-3 bottom-3 rounded-2xl bg-[#13233F]/85 p-3.5 backdrop-blur-sm sm:inset-x-4 sm:bottom-4 sm:p-4 md:inset-x-5 md:bottom-5 md:p-5 lg:inset-x-6 lg:bottom-6 lg:p-6">
            <p
              key={activeIndex}
              className="animate-[fadeIn_0.5s_ease-out] font-[family-name:var(--font-poppins)] text-[11.5px] font-light leading-relaxed text-white sm:text-[12.5px] md:text-[13px] lg:text-[13.5px]"
            >
              {active.desc}
            </p>
          </div>
        </div>

        {/* Right: numbered services list — slides from RIGHT */}
        <div
          className={[
            "border-t-2 border-[#F5B301]/40",
            "transition-all duration-1000 ease-out",
            isVisible
              ? "translate-x-0 opacity-100"
              : isAr
              ? "-translate-x-20 opacity-0"
              : "translate-x-20 opacity-0",
          ].join(" ")}
          style={{ transitionDelay: "200ms" }}
        >
          {t.services.map((service, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={service.title}
                type="button"
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => setActiveIndex(i)}
                className={[
                  "group flex w-full cursor-pointer items-center justify-between gap-2 border-b border-[#13233F]/10 py-3.5 text-left transition-colors duration-300 sm:gap-3 sm:py-4 md:gap-4 md:py-5 lg:py-6",
                  isAr ? "text-right" : "text-left",
                ].join(" ")}
              >
                <div className="flex items-start gap-2.5 sm:items-center sm:gap-3 md:gap-5 lg:gap-6">
                  <span
                    className={[
                      "shrink-0 pt-0.5 font-[family-name:var(--font-poppins)] text-[10.5px] font-semibold transition-colors duration-300 sm:pt-0 sm:text-[11.5px] md:text-xs lg:text-sm",
                      isActive ? "text-[#F5B301]" : "text-[#13233F]/40",
                    ].join(" ")}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3
                    className={[
                      "font-[family-name:var(--font-playfair)] text-[14.5px] font-extrabold leading-snug transition-colors duration-300 sm:text-base md:text-lg lg:text-2xl",
                      isActive ? "text-[#F5B301]" : "text-[#13233F]",
                    ].join(" ")}
                  >
                    {service.title}
                  </h3>
                </div>

                <span
                  className={[
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300 sm:h-8 sm:w-8 md:h-9 md:w-9 lg:h-10 lg:w-10",
                    isActive
                      ? "bg-[#F5B301] text-[#13233F]"
                      : "bg-transparent text-[#13233F]/50 group-hover:text-[#F5B301]",
                  ].join(" ")}
                >
                  <ArrowIcon active={isActive} />
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* fadeIn keyframe for description crossfade */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}