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
type LangCode = "EN" | "AR" | "FR";

// Same subtle decorative background image as other sections
const BG_IMAGE =
  "https://images.unsplash.com/photo-1759272840712-c7e5ea852367?fm=jpg&q=80&w=2400&auto=format&fit=crop";

// 🌍 Google Maps embed — Riyadh, Saudi Arabia
const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.9959845682197!2d46.67529531500199!3d24.7135517841221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03890d489399%3A0xba974d1c98e79fd5!2sRiyadh%20Saudi%20Arabia!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s";

type ServiceItem = {
  title: string;
  desc: string;
  image: string;
  details: string[];
};

const TEXT: Record<
  LangCode,
  {
    heading: string;
    detailsLabel: string;
    mapLabel: string;
    mapHeading: string;
    mapParagraph: string;
    services: ServiceItem[];
  }
> = {
  EN: {
    heading: "Our Services",
    detailsLabel: "Service Details",
    mapLabel: "Find Us",
    mapHeading: "Visit Our Office",
    mapParagraph:
      "4329 Ibrahim Ibn Baz St., Al Sulay District, Riyadh 14276, Saudi Arabia.",
    services: [
      {
        title: "Market Research",
        desc: "BOYUT AL-KAWTHAR through its R&D activities and network of offices, scans all the market needs and insights for a specific product and provides all the necessary market information required for decision making processes.",
        image: "/services/s1.png",
        details: [
          "In-depth analysis of target market trends and consumer behavior",
          "Competitor benchmarking and pricing intelligence reports",
          "Regulatory and compliance requirements for each market",
          "Custom reports tailored to your product category",
        ],
      },
      {
        title: "Distributor Finder",
        desc: "BOYUT AL-KAWTHAR connects its clients with prime prospects of agents and distributors who can carry their brand name into their regions adequately to run sustainable export business over years.",
        image: "/services/s2.png",
        details: [
          "Verified network of trusted agents and distributors",
          "Background checks and reliability screening",
          "Negotiation support and contract guidance",
          "Long-term relationship management and follow-ups",
        ],
      },
      {
        title: "Lead Generation",
        desc: "BOYUT AL-KAWTHAR runs digital marketing campaigns in different regions for your products within an efficient marketing strategy built on accurate insights from its expertise in different markets.",
        image: "/services/s3.png",
        details: [
          "Targeted digital campaigns across multiple regions",
          "Qualified B2B leads delivered directly to your team",
          "Multi-channel outreach (email, LinkedIn, ads)",
          "Performance tracking and conversion analytics",
        ],
      },
      {
        title: "Meeting Agenda with Potential Buyers",
        desc: "BOYUT AL-KAWTHAR set up meetings and arrange official visits for buyers directly to your manufacturing facilities to discuss with you all the details about technical information, delivery terms and pricing.",
        image: "/services/s4.png",
        details: [
          "Scheduling meetings with pre-qualified buyers",
          "Organizing factory visits and facility tours",
          "Facilitating technical discussions and product demos",
          "Negotiation support for delivery terms and pricing",
        ],
      },
      {
        title: "Trade Missions",
        desc: "BOYUT AL-KAWTHAR arrange specialized industry-clustered trade missions to potential markets to meet up with potential markets to speed up the communications and to find a touchstone for opening new markets efficiently.",
        image: "/services/s5.png",
        details: [
          "Organized trade missions to strategic markets",
          "Industry-clustered delegations for maximum impact",
          "Pre-scheduled B2B meetings with local buyers",
          "Logistics, accommodation and translation support",
        ],
      },
      {
        title: "Competition Analysis",
        desc: "Before you take on the global stage, you need to know the players. At BOYUT AL-KAWTHAR, we conduct comprehensive competitor analyses, delving into your target markets to identify your rivals, their strengths and weaknesses, and any existing market gaps you can fill.",
        image: "/services/s6.png",
        details: [
          "Full competitor mapping and SWOT analysis",
          "Identification of market gaps and opportunities",
          "Pricing and positioning strategy insights",
          "Actionable recommendations for market entry",
        ],
      },
    ],
  },
  AR: {
    heading: "خدماتنا",
    detailsLabel: "تفاصيل الخدمة",
    mapLabel: "موقعنا",
    mapHeading: "زيارة مكتبنا",
    mapParagraph:
      "٤٣٢٩ شارع إبراهيم بن باز، حي السلي، الرياض ١٤٢٧٦، المملكة العربية السعودية.",
    services: [
      {
        title: "أبحاث السوق",
        desc: "تقوم بيوت الكوثر من خلال أنشطة البحث والتطوير وشبكة مكاتبها بمسح جميع احتياجات السوق ورؤاه لمنتج معين، وتوفر كل المعلومات اللازمة لعمليات اتخاذ القرار.",
        image: "/services/s1.png",
        details: [
          "تحليل معمّق لاتجاهات السوق المستهدف وسلوك المستهلك",
          "تقارير مقارنة المنافسين ومعلومات التسعير",
          "متطلبات الامتثال واللوائح التنظيمية لكل سوق",
          "تقارير مخصصة تلائم فئة منتجك",
        ],
      },
      {
        title: "إيجاد الموزعين",
        desc: "تربط بيوت الكوثر عملاءها بأفضل الوكلاء والموزعين القادرين على حمل علامتهم التجارية إلى مناطقهم لإدارة أعمال تصدير مستدامة على مر السنين.",
        image: "/services/s2.png",
        details: [
          "شبكة موثوقة من الوكلاء والموزعين المعتمدين",
          "فحص خلفيات الشركاء والتحقق من موثوقيتهم",
          "دعم التفاوض وإرشاد العقود",
          "إدارة العلاقات طويلة الأمد والمتابعة المستمرة",
        ],
      },
      {
        title: "توليد العملاء المحتملين",
        desc: "تدير بيوت الكوثر حملات تسويق رقمي في مناطق مختلفة لمنتجاتك ضمن استراتيجية تسويقية فعالة مبنية على رؤى دقيقة من خبرتها في أسواق متعددة.",
        image: "/services/s3.png",
        details: [
          "حملات رقمية موجّهة في مناطق متعددة",
          "عملاء محتملون مؤهلون يتم تسليمهم لفريقك مباشرة",
          "تواصل متعدد القنوات (بريد، لينكد إن، إعلانات)",
          "تتبع الأداء وتحليلات التحويل",
        ],
      },
      {
        title: "جدولة اجتماعات مع المشترين المحتملين",
        desc: "تنظم بيوت الكوثر اجتماعات وزيارات رسمية للمشترين مباشرة إلى منشآتك التصنيعية لمناقشة التفاصيل الفنية وشروط التسليم والتسعير.",
        image: "/services/s4.png",
        details: [
          "جدولة اجتماعات مع مشترين مؤهلين مسبقًا",
          "تنظيم زيارات المصانع وجولات المرافق",
          "تسهيل المناقشات الفنية وعروض المنتجات",
          "دعم التفاوض على شروط التسليم والتسعير",
        ],
      },
      {
        title: "البعثات التجارية",
        desc: "تنظم بيوت الكوثر بعثات تجارية متخصصة حسب القطاع إلى الأسواق المحتملة لتسريع التواصل وفتح أسواق جديدة بكفاءة.",
        image: "/services/s5.png",
        details: [
          "بعثات تجارية منظمة إلى أسواق استراتيجية",
          "وفود مجمّعة حسب القطاع لتحقيق أقصى تأثير",
          "اجتماعات B2B مجدولة مسبقًا مع المشترين المحليين",
          "دعم لوجستي وإقامة وترجمة",
        ],
      },
      {
        title: "تحليل المنافسين",
        desc: "قبل دخول المسرح العالمي، عليك معرفة اللاعبين. في بيوت الكوثر، نجري تحليلات شاملة للمنافسين لتحديد نقاط القوة والضعف والفجوات في السوق التي يمكنك سدها.",
        image: "/services/s6.png",
        details: [
          "رسم خرائط كامل للمنافسين وتحليل SWOT",
          "تحديد الفجوات والفرص في السوق",
          "رؤى استراتيجية للتسعير والتموضع",
          "توصيات قابلة للتنفيذ لدخول السوق",
        ],
      },
    ],
  },
  FR: {
    heading: "Nos services",
    detailsLabel: "Détails du service",
    mapLabel: "Nous trouver",
    mapHeading: "Visitez notre bureau",
    mapParagraph:
      "Rue Ibrahim Ibn Baz, District Al Sulay, Riyad 14276, Arabie Saoudite.",
    services: [
      {
        title: "Étude de marché",
        desc: "BOYUT AL-KAWTHAR, grâce à ses activités de R&D et à son réseau de bureaux, analyse tous les besoins et perspectives du marché pour un produit spécifique et fournit toutes les informations de marché nécessaires aux processus de prise de décision.",
        image: "/services/s1.png",
        details: [
          "Analyse approfondie des tendances du marché cible et du comportement des consommateurs",
          "Rapports de benchmarking concurrentiel et de veille tarifaire",
          "Exigences réglementaires et de conformité pour chaque marché",
          "Rapports personnalisés adaptés à votre catégorie de produits",
        ],
      },
      {
        title: "Recherche de distributeur",
        desc: "BOYUT AL-KAWTHAR met ses clients en relation avec les meilleurs prospects d'agents et de distributeurs capables de porter leur marque dans leurs régions de manière adéquate pour mener une activité d'exportation durable sur plusieurs années.",
        image: "/services/s2.png",
        details: [
          "Réseau vérifié d'agents et de distributeurs de confiance",
          "Vérification des antécédents et contrôle de fiabilité",
          "Soutien à la négociation et accompagnement contractuel",
          "Gestion des relations à long terme et suivi régulier",
        ],
      },
      {
        title: "Génération de prospects",
        desc: "BOYUT AL-KAWTHAR mène des campagnes de marketing digital dans différentes régions pour vos produits dans le cadre d'une stratégie marketing efficace fondée sur des informations précises issues de son expertise sur différents marchés.",
        image: "/services/s3.png",
        details: [
          "Campagnes digitales ciblées dans plusieurs régions",
          "Prospects B2B qualifiés livrés directement à votre équipe",
          "Approche multicanale (e-mail, LinkedIn, publicités)",
          "Suivi des performances et analyses de conversion",
        ],
      },
      {
        title: "Ordre du jour des réunions avec les acheteurs potentiels",
        desc: "BOYUT AL-KAWTHAR organise des réunions et des visites officielles pour les acheteurs directement dans vos installations de fabrication afin de discuter avec vous de tous les détails techniques, des conditions de livraison et des prix.",
        image: "/services/s4.png",
        details: [
          "Planification de réunions avec des acheteurs pré-qualifiés",
          "Organisation de visites d'usine et de circuits des installations",
          "Facilitation des discussions techniques et démonstrations produits",
          "Soutien à la négociation des conditions de livraison et des prix",
        ],
      },
      {
        title: "Missions commerciales",
        desc: "BOYUT AL-KAWTHAR organise des missions commerciales spécialisées et regroupées par secteur vers des marchés potentiels afin d'accélérer les communications et de trouver une pierre de touche pour ouvrir efficacement de nouveaux marchés.",
        image: "/services/s5.png",
        details: [
          "Missions commerciales organisées vers des marchés stratégiques",
          "Délégations sectorielles pour un impact maximal",
          "Réunions B2B pré-programmées avec des acheteurs locaux",
          "Soutien logistique, hébergement et traduction",
        ],
      },
      {
        title: "Analyse de la concurrence",
        desc: "Avant de vous lancer sur la scène mondiale, vous devez connaître les acteurs. Chez BOYUT AL-KAWTHAR, nous réalisons des analyses complètes de la concurrence, en examinant vos marchés cibles pour identifier vos rivaux, leurs forces et faiblesses, ainsi que les lacunes du marché que vous pouvez combler.",
        image: "/services/s6.png",
        details: [
          "Cartographie complète des concurrents et analyse SWOT",
          "Identification des lacunes et opportunités du marché",
          "Aperçus stratégiques sur les prix et le positionnement",
          "Recommandations exploitables pour l'entrée sur le marché",
        ],
      },
    ],
  },
};

function readStoredLang(): LangCode {
  if (typeof window === "undefined") return "EN";
  const saved = window.localStorage.getItem(LANG_KEY);
  if (saved === "AR" || saved === "EN" || saved === "FR") return saved;
  return "EN";
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
      stroke={active ? "#FFFFFF" : "currentColor"}
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
  const [mapRef, mapInView] = useInView<HTMLDivElement>(0.2);
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

      {/* Content wrapper */}
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-14">
        {/* Left: crossfading image + description overlay */}
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
          <div className="absolute inset-x-3 bottom-3 rounded-2xl bg-[#2C7046]/90 p-3.5 backdrop-blur-sm sm:inset-x-4 sm:bottom-4 sm:p-4 md:inset-x-5 md:bottom-5 md:p-5 lg:inset-x-6 lg:bottom-6 lg:p-6">
            <p
              key={activeIndex}
              className="animate-[fadeIn_0.5s_ease-out] font-[family-name:var(--font-poppins)] text-[11.5px] font-light leading-relaxed text-white sm:text-[12.5px] md:text-[13px] lg:text-[13.5px]"
            >
              {active.desc}
            </p>
          </div>
        </div>

        {/* Right: numbered services list — switches only on click */}
        <div
          className={[
            "border-t-2 border-[#2C7046]/40",
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
                onClick={() => setActiveIndex(i)}
                className={[
                  "group flex w-full cursor-pointer items-center justify-between gap-2 border-b border-[#2C7046]/10 py-3.5 text-left transition-colors duration-300 sm:gap-3 sm:py-4 md:gap-4 md:py-5 lg:py-6",
                  isAr ? "text-right" : "text-left",
                ].join(" ")}
              >
                <div className="flex items-start gap-2.5 sm:items-center sm:gap-3 md:gap-5 lg:gap-6">
                  <span
                    className={[
                      "shrink-0 pt-0.5 font-[family-name:var(--font-poppins)] text-[10.5px] font-semibold transition-colors duration-300 sm:pt-0 sm:text-[11.5px] md:text-xs lg:text-sm",
                      isActive ? "text-[#F5B301]" : "text-[#2C7046]/40",
                    ].join(" ")}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3
                    className={[
                      "font-[family-name:var(--font-playfair)] text-[14.5px] font-extrabold leading-snug transition-colors duration-300 sm:text-base md:text-lg lg:text-2xl",
                      isActive ? "text-[#2C7046]" : "text-[#2C7046]/70",
                    ].join(" ")}
                  >
                    {service.title}
                  </h3>
                </div>

                <span
                  className={[
                    "flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-full transition-all duration-300 sm:h-8 sm:w-8 md:h-9 md:w-9 lg:h-10 lg:w-10",
                    isActive
                      ? "bg-[#F5B301] text-white"
                      : "bg-transparent text-[#2C7046]/50 group-hover:text-[#F5B301]",
                  ].join(" ")}
                >
                  <ArrowIcon active={isActive} />
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Full width detail card (full-width, rounded, responsive) */}
      <div className="relative mx-auto mt-10 max-w-6xl sm:mt-12 lg:mt-14">
        <div
          key={activeIndex}
          className="animate-[fadeInUp_0.5s_ease-out] overflow-hidden rounded-[1.5rem] bg-[#2C7046] shadow-[0_20px_50px_rgba(44,112,70,0.25)] sm:rounded-[2rem]"
        >
          <div className="grid grid-cols-1 gap-0 lg:grid-cols-[1fr_1.4fr]">
            {/* Left: service image */}
            <div className="relative h-[220px] w-full overflow-hidden sm:h-[280px] lg:h-full lg:min-h-[340px]">
              <Image
                src={active.image}
                alt={active.title}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
              />
              {/* Green fade on the right */}
              <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-24 bg-gradient-to-l from-[#2C7046] to-transparent lg:block" />
            </div>

            {/* Right: details */}
            <div className="relative flex flex-col p-5 sm:p-7 lg:p-9">
              {/* Label */}
              <span className="font-[family-name:var(--font-poppins)] text-[10.5px] font-semibold uppercase tracking-[0.2em] text-[#F5B301] sm:text-[11.5px]">
                {t.detailsLabel}
              </span>

              {/* Title */}
              <h3 className="mt-2 font-[family-name:var(--font-playfair)] text-xl font-extrabold leading-tight text-white sm:text-2xl lg:text-[28px]">
                {active.title}
              </h3>

              {/* Gold bar */}
              <span className="mt-3 block h-1 w-14 rounded-full bg-[#F5B301]" />

              {/* Description */}
              <p className="mt-4 font-[family-name:var(--font-poppins)] text-[12.5px] font-light leading-relaxed text-white/80 sm:text-[13.5px] md:text-[14px]">
                {active.desc}
              </p>

              {/* Bullet list */}
              <ul className="mt-5 grid grid-cols-1 gap-2.5 sm:gap-3">
                {active.details.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 sm:gap-3">
                    {/* Gold check icon */}
                    <span className="mt-[2px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F5B301] text-[#2C7046] sm:h-[22px] sm:w-[22px]">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-3 w-3 sm:h-3.5 sm:w-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={3}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M4 12.5l5 5L20 6.5" />
                      </svg>
                    </span>

                    <span className="font-[family-name:var(--font-poppins)] text-[12px] font-light leading-relaxed text-white/85 sm:text-[12.5px] md:text-[13px]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════ FULL WIDTH GOOGLE MAP ═══════════════ */}
      <div
        ref={mapRef}
        className={[
          "relative mt-12 w-full sm:mt-16 lg:mt-20",
          "transition-all duration-1000 ease-out",
          mapInView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0",
        ].join(" ")}
      >
        {/* Heading above map */}
        <div className="mx-auto mb-6 max-w-6xl px-0 text-center sm:mb-8">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#2C7046]/10 px-4 py-1.5 font-[family-name:var(--font-poppins)] text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#2C7046] sm:text-[11.5px]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F5B301]" />
            {t.mapLabel}
          </span>
          <h2 className="mt-3 font-[family-name:var(--font-playfair)] text-2xl font-extrabold text-[#2C7046] sm:text-3xl md:text-4xl">
            {t.mapHeading}
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-[#F5B301] sm:w-20" />
          <p className="mx-auto mt-4 max-w-2xl font-[family-name:var(--font-poppins)] text-[12.5px] font-light leading-relaxed text-[#6B6B6B] sm:text-[13.5px] md:text-[14px]">
            {t.mapParagraph}
          </p>
        </div>

        {/* Full-width map iframe — breaks out of section padding */}
        <div className="relative h-[320px] w-full overflow-hidden sm:h-[400px] md:h-[450px] lg:h-[500px]">
          <iframe
            title="Boyut Al-Kawthar Office Location"
            src={MAP_EMBED_URL}
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>

      {/* fadeIn keyframe for description crossfade */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}