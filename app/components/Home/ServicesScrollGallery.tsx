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

// Online high-quality free images (Unsplash / Pexels)
const EXPORT_DOC_IMG =
  "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1200&auto=format&fit=crop";
const LOGISTICS_IMG =
  "https://images.pexels.com/photos/906494/pexels-photo-906494.jpeg?auto=compress&cs=tinysrgb&w=1200";

const TEXT = {
  EN: {
    badge: "What We Offer",
    heading: "OUR SERVICES",
    learnMore: "Learn More",
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
      {
        title: "Export Documentation",
        desc: "BOYUT AL-KAWTHAR handles all export documentation, certificates of origin, customs paperwork, and regulatory compliance so your shipments move smoothly across borders without delays.",
        image: EXPORT_DOC_IMG,
      },
      {
        title: "Logistics & Shipping",
        desc: "BOYUT AL-KAWTHAR coordinates end-to-end logistics including freight, warehousing, and last-mile delivery, ensuring your products reach international buyers safely and on time.",
        image: LOGISTICS_IMG,
      },
    ] as ServiceCard[],
  },
  AR: {
    badge: "ماذا نقدم",
    heading: "خدماتنا",
    learnMore: "اعرف المزيد",
    services: [
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
      {
        title: "مستندات التصدير",
        desc: "تتولى بيوت الكوثر جميع مستندات التصدير وشهادات المنشأ والأوراق الجمركية والامتثال التنظيمي لضمان عبور شحناتك الحدود بسلاسة دون تأخير.",
        image: EXPORT_DOC_IMG,
      },
      {
        title: "الخدمات اللوجستية والشحن",
        desc: "تنسّق بيوت الكوثر الخدمات اللوجستية من البداية إلى النهاية بما في ذلك الشحن والتخزين والتوصيل، لضمان وصول منتجاتك إلى المشترين الدوليين بأمان وفي الوقت المحدد.",
        image: LOGISTICS_IMG,
      },
    ] as ServiceCard[],
  },
  FR: {
    badge: "Ce que nous offrons",
    heading: "NOS SERVICES",
    learnMore: "En savoir plus",
    services: [
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
      {
        title: "Documentation d'exportation",
        desc: "BOYUT AL-KAWTHAR gère toute la documentation d'exportation, les certificats d'origine, les formalités douanières et la conformité réglementaire afin que vos expéditions traversent les frontières sans retard.",
        image: EXPORT_DOC_IMG,
      },
      {
        title: "Logistique et expédition",
        desc: "BOYUT AL-KAWTHAR coordonne la logistique de bout en bout, y compris le fret, l'entreposage et la livraison finale, pour que vos produits atteignent les acheteurs internationaux en toute sécurité et à temps.",
        image: LOGISTICS_IMG,
      },
    ] as ServiceCard[],
  },
} as const;

function readStoredLang(): LangCode {
  if (typeof window === "undefined") return "EN";
  const saved = window.localStorage.getItem(LANG_KEY);
  if (saved === "AR" || saved === "EN" || saved === "FR") return saved;
  return "EN";
}

export default function ServicesSection() {
  const [langCode, setLangCode] = useState<LangCode>(() => readStoredLang());
  const [isVisible, setIsVisible] = useState(false);
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

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -80px 0px",
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  const isAr = langCode === "AR";
  const t = TEXT[langCode];

  return (
    <section
      ref={sectionRef}
      dir={isAr ? "rtl" : "ltr"}
      className={`${playfair.variable} ${poppins.variable} w-full overflow-x-hidden bg-white px-6 py-16 sm:px-10 md:px-16 lg:px-24 xl:px-32`}
    >
      {/* Heading */}
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <p
          className={`font-[family-name:var(--font-poppins)] text-[11px] font-bold tracking-[6px] text-[#2C7046] transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {t.badge}
        </p>
        <h2
          className={`mt-3 font-[family-name:var(--font-playfair)] text-[28px] font-extrabold leading-tight text-[#2C7046] transition-all duration-700 ease-out sm:text-[36px] ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "100ms" }}
        >
          {t.heading}
        </h2>
        <div
          className={`mx-auto mt-4 h-[3px] w-[70px] rounded-full bg-[#F5B301] transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
          }`}
          style={{ transitionDelay: "200ms" }}
        />
      </div>

      {/* All services grid — 4 per row on desktop */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
        {t.services.map((service, i) => (
          <article
            key={service.title}
            className={`group/card flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-[#2C7046]/10 bg-white transition-all duration-700 ease-out hover:-translate-y-1 hover:border-[#F5B301]/40 hover:shadow-lg hover:shadow-[#2C7046]/10 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
            }`}
            style={{ transitionDelay: `${150 + i * 80}ms` }}
          >
            <div className="relative h-32 w-full overflow-hidden sm:h-36">
              <img
                src={service.image}
                alt={service.title}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-[#2C7046]/0 transition-colors duration-500 group-hover/card:bg-[#2C7046]/10" />
            </div>

            <div className="flex flex-1 flex-col p-4 sm:p-5">
              <h3 className="font-[family-name:var(--font-playfair)] text-[14px] font-extrabold leading-snug text-[#2C7046] sm:text-[15px]">
                {service.title}
              </h3>
              <div className="mt-2 h-[2px] w-7 rounded-full bg-[#F5B301] transition-all duration-500 group-hover/card:w-12" />
              <p
                className="mt-2.5 line-clamp-4 font-[family-name:var(--font-poppins)] text-[11.5px] font-light leading-relaxed text-[#5C5C5C] sm:text-[12px]"
                dir={isAr ? "rtl" : "ltr"}
              >
                {service.desc}
              </p>
              <Link
                href="/services"
                className="mt-auto cursor-pointer pt-3 font-[family-name:var(--font-poppins)] text-[11.5px] font-semibold text-[#2C7046] transition-colors duration-300 hover:text-[#F5B301] sm:text-[12px]"
              >
                {t.learnMore} →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}