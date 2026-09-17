"use client";

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

type ServiceCard = {
  title: string;
  desc: string;
  image: string;
};

type TabKey = "aspiration" | "whatWeDo";

const TEXT = {
  EN: {
    tabs: {
      aspiration: "Aspiration",
      whatWeDo: "What We Do",
    },
    tabTexts: {
      aspiration:
        "We envision a future where the quality of our Saudi\u2019s goods is recognized and celebrated worldwide. Our goal is to transform this vision into reality, opening doors for local producers to showcase their excellence on the global stage.",
      whatWeDo:
        "Our driving force is to empower our manufacturers and exporters to achieve unprecedented growth. We provide the tools and support necessary to navigate the complexities of international trade.",
    },
    learnMore: "Learn More",
    services: {
      aspiration: [
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
      ],
      whatWeDo: [
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
  },
  AR: {
    tabs: {
      aspiration: "تطلعاتنا",
      whatWeDo: "ما نقوم به",
    },
    tabTexts: {
      aspiration:
        "نتطلع إلى مستقبل تُعرف فيه جودة منتجاتنا السعودية وتُحتفى بها عالميًا. هدفنا هو تحويل هذه الرؤية إلى واقع، وفتح الأبواب للمنتجين المحليين لعرض تميزهم على المسرح العالمي.",
      whatWeDo:
        "قوتنا الدافعة هي تمكين مصنّعينا ومصدّرينا من تحقيق نمو غير مسبوق. نوفر الأدوات والدعم اللازم للتنقل في تعقيدات التجارة الدولية.",
    },
    learnMore: "اعرف المزيد",
    services: {
      aspiration: [
        {
          title: "بحوث السوق",
          desc: "من خلال أنشطة البحث والتطوير وشبكة مكاتبها، تفحص بيوت الكوثر جميع احتياجات السوق ورؤاه لمنتج معين وتوفر كل المعلومات السوقية اللازمة لعملية اتخاذ القرار.",
          image: "/services/s1.png",
        },
        {
          title: "البحث عن الموزعين",
          desc: "تربط بيوت الكوثر عملاءها بأفضل المرشحين من الوكلاء والموزعين القادرين على حمل اسم علامتهم التجارية إلى مناطقهم بشكل مناسب لإدارة أعمال تصدير مستدامة على مر السنين.",
          image: "/services/s2.png",
        },
        {
          title: "توليد العملاء المحتملين",
          desc: "تدير بيوت الكوثر حملات تسويق رقمي في مناطق مختلفة لمنتجاتك ضمن استراتيجية تسويقية فعالة مبنية على رؤى دقيقة من خبرتها في أسواق مختلفة.",
          image: "/services/s3.png",
        },
      ],
      whatWeDo: [
        {
          title: "جدول اجتماعات مع المشترين المحتملين",
          desc: "تقوم بيوت الكوثر بترتيب الاجتماعات والزيارات الرسمية للمشترين مباشرة إلى منشآتك التصنيعية لمناقشة جميع التفاصيل حول المعلومات الفنية وشروط التسليم والتسعير.",
          image: "/services/s4.png",
        },
        {
          title: "البعثات التجارية",
          desc: "تنظم بيوت الكوثر بعثات تجارية متخصصة ومجمّعة حسب الصناعة إلى الأسواق المحتملة للاجتماع مع الأسواق المحتملة لتسريع الاتصالات وإيجاد معيار لفتح أسواق جديدة بكفاءة.",
          image: "/services/s5.png",
        },
        {
          title: "تحليل المنافسة",
          desc: "قبل أن تدخل الساحة العالمية، تحتاج إلى معرفة اللاعبين. في بيوت الكوثر، نجري تحليلات شاملة للمنافسين، ونتعمق في أسواقك المستهدفة لتحديد منافسيك ونقاط قوتهم وضعفهم وأي فجوات سوقية يمكنك سدها.",
          image: "/services/s6.png",
        },
      ],
    },
  },
  FR: {
    tabs: {
      aspiration: "Aspiration",
      whatWeDo: "Ce que nous faisons",
    },
    tabTexts: {
      aspiration:
        "Nous envisageons un avenir où la qualité de nos produits saoudiens est reconnue et célébrée dans le monde entier. Notre objectif est de transformer cette vision en réalité, en ouvrant des portes aux producteurs locaux pour qu'ils présentent leur excellence sur la scène mondiale.",
      whatWeDo:
        "Notre force motrice est de permettre à nos fabricants et exportateurs d'atteindre une croissance sans précédent. Nous fournissons les outils et le soutien nécessaires pour naviguer dans les complexités du commerce international.",
    },
    learnMore: "En savoir plus",
    services: {
      aspiration: [
        {
          title: "Étude de marché",
          desc: "BOYUT AL-KAWTHAR, grâce à ses activités de R&D et à son réseau de bureaux, analyse tous les besoins et perspectives du marché pour un produit spécifique et fournit toutes les informations de marché nécessaires aux processus de prise de décision.",
          image: "/services/s1.png",
        },
        {
          title: "Recherche de distributeur",
          desc: "BOYUT AL-KAWTHAR met ses clients en relation avec les meilleurs prospects d'agents et de distributeurs capables de porter leur marque dans leurs régions de manière adéquate pour mener une activité d'exportation durable sur plusieurs années.",
          image: "/services/s2.png",
        },
        {
          title: "Génération de prospects",
          desc: "BOYUT AL-KAWTHAR mène des campagnes de marketing digital dans différentes régions pour vos produits dans le cadre d'une stratégie marketing efficace fondée sur des informations précises issues de son expertise sur différents marchés.",
          image: "/services/s3.png",
        },
      ],
      whatWeDo: [
        {
          title: "Ordre du jour des réunions avec les acheteurs potentiels",
          desc: "BOYUT AL-KAWTHAR organise des réunions et des visites officielles pour les acheteurs directement dans vos installations de fabrication afin de discuter avec vous de tous les détails techniques, des conditions de livraison et des prix.",
          image: "/services/s4.png",
        },
        {
          title: "Missions commerciales",
          desc: "BOYUT AL-KAWTHAR organise des missions commerciales spécialisées et regroupées par secteur vers des marchés potentiels afin d'accélérer les communications et de trouver une pierre de touche pour ouvrir efficacement de nouveaux marchés.",
          image: "/services/s5.png",
        },
        {
          title: "Analyse de la concurrence",
          desc: "Avant de vous lancer sur la scène mondiale, vous devez connaître les acteurs. Chez BOYUT AL-KAWTHAR, nous réalisons des analyses complètes de la concurrence, en examinant vos marchés cibles pour identifier vos rivaux, leurs forces et faiblesses, ainsi que les lacunes du marché que vous pouvez combler.",
          image: "/services/s6.png",
        },
      ],
    },
  },
} as const;

const ORDER: TabKey[] = ["aspiration", "whatWeDo"];

type Phase = "idle" | "exit" | "enterStart" | "enter";

function readStoredLang(): LangCode {
  if (typeof window === "undefined") return "EN";
  const saved = window.localStorage.getItem(LANG_KEY);
  if (saved === "AR" || saved === "EN" || saved === "FR") return saved;
  return "EN";
}

export default function AspirationServicesSection() {
  const [activeTab, setActiveTab] = useState<TabKey>("aspiration");
  const [phase, setPhase] = useState<Phase>("idle");
  const [langCode, setLangCode] = useState<LangCode>(() => readStoredLang());
  const pendingTab = useRef<TabKey | null>(null);
  const rafRef = useRef<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  const isAr = langCode === "AR";
  const t = TEXT[langCode];

  const TABS = [
    { key: "aspiration" as TabKey, label: t.tabs.aspiration, text: t.tabTexts.aspiration },
    { key: "whatWeDo" as TabKey, label: t.tabs.whatWeDo, text: t.tabTexts.whatWeDo },
  ];

  const goToTab = (tab: TabKey) => {
    if (tab === activeTab || phase !== "idle") return;
    pendingTab.current = tab;
    setPhase("exit");
  };

  useEffect(() => {
    if (phase === "exit") {
      timeoutRef.current = setTimeout(() => {
        if (pendingTab.current) {
          setActiveTab(pendingTab.current);
          pendingTab.current = null;
        }
        setPhase("enterStart");
      }, 300);
    } else if (phase === "enterStart") {
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = requestAnimationFrame(() => {
          setPhase("enter");
        });
      });
    } else if (phase === "enter") {
      timeoutRef.current = setTimeout(() => setPhase("idle"), 500);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [phase]);

  const activeText = TABS.find((tab) => tab.key === activeTab)!;
  const services = t.services[activeTab];

  const animClasses =
    phase === "exit"
      ? "translate-y-10 opacity-0 transition-all duration-300 ease-in"
      : phase === "enterStart"
      ? "translate-x-16 translate-y-0 opacity-0 transition-none"
      : "translate-x-0 translate-y-0 opacity-100 transition-all duration-500 ease-out";

  return (
    <section
      dir="ltr"
      className={`${playfair.variable} ${poppins.variable} w-full overflow-x-hidden bg-white px-4 py-14 md:px-8`}
    >
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[320px_1fr] md:gap-10">
        {/* Left card: tabs + text */}
        <div className="h-fit rounded-3xl bg-[#13233F] p-7">
          <div className="flex gap-6 border-b border-white/15 pb-3">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => goToTab(tab.key)}
                className={`relative cursor-pointer pb-2 font-[family-name:var(--font-playfair)] text-[15px] font-extrabold transition-colors ${
                  activeTab === tab.key ? "text-[#F5B301]" : "text-white/50 hover:text-white/80"
                }`}
              >
                {tab.label}
                {activeTab === tab.key && (
                  <span className="absolute -bottom-[13px] left-0 h-[2px] w-full bg-[#F5B301]" />
                )}
              </button>
            ))}
          </div>

          <div className="overflow-hidden">
            <p
              className={`mt-6 font-[family-name:var(--font-poppins)] text-[13.5px] font-light leading-relaxed text-white/80 sm:text-[14px] ${animClasses}`}
              dir={isAr ? "rtl" : "ltr"}
            >
              {activeText.text}
            </p>
          </div>
        </div>

        {/* Right side: services for the active tab */}
        <div className="overflow-hidden">
          <div className={`grid grid-cols-1 gap-5 sm:grid-cols-3 ${animClasses}`}>
            {services.map((service) => (
              <article
                key={service.title}
                className="group/card flex cursor-pointer flex-col overflow-hidden rounded-3xl border border-[#13233F]/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-36 w-full overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-105"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-[family-name:var(--font-playfair)] text-[15px] font-extrabold leading-snug text-[#13233F] sm:text-[16px]">
                    {service.title}
                  </h3>
                  <div className="mt-2 h-[3px] w-8 rounded-full bg-[#F5B301]" />
                  <p
                    className="mt-3 line-clamp-5 font-[family-name:var(--font-poppins)] text-[12.5px] font-light leading-relaxed text-[#5C5C5C] sm:text-[13px]"
                    dir={isAr ? "rtl" : "ltr"}
                  >
                    {service.desc}
                  </p>
                  <Link
                    href="/services"
                    className="mt-auto cursor-pointer pt-4 font-[family-name:var(--font-poppins)] text-[12.5px] font-semibold text-[#F5B301] underline underline-offset-2 transition-colors duration-300 hover:text-[#C0272D] sm:text-[13px]"
                  >
                    {t.learnMore}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="mt-8 flex items-center justify-center gap-2">
        {ORDER.map((tab) => (
          <button
            key={tab}
            type="button"
            aria-label={`Show ${tab}`}
            onClick={() => goToTab(tab)}
            className={`h-2.5 cursor-pointer rounded-full transition-all duration-300 ${
              activeTab === tab ? "w-6 bg-[#F5B301]" : "w-2.5 bg-[#D8D8D0] hover:bg-[#c3c1b8]"
            }`}
          />
        ))}
      </div>
    </section>
  );
}