"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
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

type NewsCard = {
  id: number;
  image: string;
  title: string;
  titleFr: string;
  titleAr: string;
  desc: string;
  descFr: string;
  descAr: string;
  date: string;
  dateFr: string;
  dateAr: string;
};

const NEWS_ITEMS: NewsCard[] = [
  {
    id: 1,
    image: "/news/new1.png",
    title:
      "Saudi Ambassador, Saudi Commercial Attaché, and President of the Saudi Exporters Association at BIF",
    titleFr:
      "L'ambassadeur saoudien et la délégation commerciale au pavillon de la Foire internationale de Bagdad",
    titleAr:
      "السفير السعودي والملحق التجاري ورئيس جمعية المصدرين السعوديين في معرض بغداد الدولي",
    desc: "We were honored to be visited at our pavilion at the exhibition by His Excellency Mr. Abdulaziz Al-Shammari, Ambassador of the Kingdom of Saudi Arabia to the Republic of Iraq, H.E. the Saudi Deputy Ambassador, and the President of the Saudi Exporters Association, during Baghdad International Fair.",
    descFr:
      "Nous avons eu l'honneur d'accueillir Son Excellence M. Abdulaziz Al-Shammari, ambassadeur du Royaume d'Arabie saoudite en Irak, ainsi que la délégation commerciale saoudienne.",
    descAr:
      "تشرّفنا بزيارة معالي السيد عبدالعزيز الشمري، سفير المملكة العربية السعودية لدى جمهورية العراق، وسعادة نائب السفير السعودي، ورئيس جمعية المصدرين السعوديين، لجناحنا في معرض بغداد الدولي.",
    date: "Feb 2, 2026",
    dateFr: "2 févr. 2026",
    dateAr: "٢ فبراير ٢٠٢٦",
  },
  {
    id: 2,
    image: "/news/new2.png",
    title:
      "High-Level Saudi Delegation Visits Boyut Al-Kawthar Booth at Baghdad International Fair",
    titleFr: "Une délégation saoudienne de haut niveau visite le pavillon de Boyut Al-Kawthar",
    titleAr:
      "وفد سعودي رفيع المستوى يزور جناح بيوت الكوثر في معرض بغداد الدولي",
    desc: "Boyut Al-Kawthar was honored by the visit of the Saudi Deputy Ambassador to Iraq, the embassy delegation, and President of the Saudi Exporters Association to Boyut Al-Kawthar booth during their tour of Baghdad Fair.",
    descFr:
      "Boyut Al-Kawthar a eu l'honneur d'accueillir le vice-ambassadeur saoudien en Irak, la délégation de l'ambassade et le président de l'Association des exportateurs saoudiens.",
    descAr:
      "تشرّفت بيوت الكوثر بزيارة نائب السفير السعودي في العراق، ووفد السفارة، ورئيس جمعية المصدرين السعوديين لجناح بيوت الكوثر خلال جولتهم في معرض بغداد.",
    date: "Feb 1, 2026",
    dateFr: "1er févr. 2026",
    dateAr: "١ فبراير ٢٠٢٦",
  },
  {
    id: 3,
    image: "/news/new3.png",
    title:
      "Visit of H.E. the Minister of Industry and Mineral Resources and H.E. the CEO of the SEDA",
    titleFr: "Visite du ministre de l'Industrie et du PDG de l'Autorité saoudienne des exportations",
    titleAr:
      "زيارة معالي وزير الصناعة والثروة المعدنية وسعادة الرئيس التنفيذي لهيئة تنمية الصادرات السعودية",
    desc: "We were honored by the visit of His Excellency Mr. Bandar Al-Khorayef, Minister of Industry and Mineral Resources, and His Excellency Eng. Abdulrahman Alzukair, CEO of the Saudi Export Development Authority, at our booth.",
    descFr:
      "Nous avons eu l'honneur d'accueillir Son Excellence M. Bandar Al-Khorayef, ministre de l'Industrie et des Ressources minérales, ainsi que le PDG de l'Autorité saoudienne des exportations.",
    descAr:
      "تشرّفنا بزيارة معالي الأستاذ بندر الخريف، وزير الصناعة والثروة المعدنية، وسعادة المهندس عبدالرحمن الزكير، الرئيس التنفيذي لهيئة تنمية الصادرات السعودية، لجناحنا.",
    date: "Dec 16, 2025",
    dateFr: "16 déc. 2025",
    dateAr: "١٦ ديسمبر ٢٠٢٥",
  },
  {
    id: 4,
    image: "/news/new4.png",
    title:
      "Boyut Al-Kawthar participates in The Made in Saudi Expo 2025, held in Riyadh",
    titleFr: "Boyut Al-Kawthar participe au salon Made in Saudi Expo 2025 à Riyad",
    titleAr:
      "بيوت الكوثر تشارك في معرض صنع في السعودية ٢٠٢٥ بالرياض",
    desc: "Participation of Boyut Al-Kawthar considered an official and accredited export house recognized by SEDA. As a service provider for international trade and business development to exporters and manufacturers, it offers comprehensive solutions to help them access global markets.",
    descFr:
      "Boyut Al-Kawthar, maison d'exportation officielle et accréditée par la SEDA, propose des solutions complètes pour aider les exportateurs et les fabricants à accéder aux marchés mondiaux.",
    descAr:
      "تُعتبر مشاركة بيوت الكوثر كبيت تصدير رسمي ومعتمد من هيئة تنمية الصادرات السعودية. كمزود خدمة للتجارة الدولية وتطوير الأعمال للمصدّرين والمصنّعين، تقدم حلولاً شاملة لمساعدتهم على الوصول إلى الأسواق العالمية.",
    date: "Dec 15, 2025",
    dateFr: "15 déc. 2025",
    dateAr: "١٥ ديسمبر ٢٠٢٥",
  },
  {
    id: 5,
    image: "/news/new5.png",
    title:
      "The Third Business Matching Forum Between Small and Medium Factories and Licensed Export Houses",
    titleFr: "Le troisième forum de mise en relation entre PME industrielles et maisons d'exportation agréées",
    titleAr:
      "المنتدى الثالث للشراكات التجارية بين المصانع الصغيرة والمتوسطة وبيوت التصدير المرخّصة",
    desc: "Participation of Boyut Al-Kawthar, in the third Business Matching Forum between small and medium factories one of the export houses licensed by the Saudi Export Development Authority.",
    descFr:
      "Boyut Al-Kawthar a participé au troisième forum de mise en relation entre petites et moyennes usines, en tant que maison d'exportation agréée par l'Autorité saoudienne des exportations.",
    descAr:
      "مشاركة بيوت الكوثر في المنتدى الثالث للشراكات التجارية بين المصانع الصغيرة والمتوسطة، كأحد بيوت التصدير المرخّصة من هيئة تنمية الصادرات السعودية.",
    date: "Jun 24, 2025",
    dateFr: "24 juin 2025",
    dateAr: "٢٤ يونيو ٢٠٢٥",
  },
  {
    id: 6,
    image: "/news/new6.png",
    title:
      "Strategic Cooperation Between BOYUT AL-KAWTHAR and GIT-ZONE International",
    titleFr: "Coopération stratégique entre BOYUT AL-KAWTHAR et GIT-ZONE International",
    titleAr:
      "تعاون استراتيجي بين بيوت الكوثر وشركة جيت زون الدولية",
    desc: "In a strategic step to support Saudi exporters and expand the scope of their products in global markets, Boyut Al-Kawthar signed on Sunday, April 6, 2025, a strategic cooperation agreement with GIT-ZONE International.",
    descFr:
      "Pour soutenir les exportateurs saoudiens et élargir leurs marchés, Boyut Al-Kawthar a signé le 6 avril 2025 un accord de coopération stratégique avec GIT-ZONE International.",
    descAr:
      "في خطوة استراتيجية لدعم المصدرين السعوديين وتوسيع نطاق منتجاتهم في الأسواق العالمية، وقّعت بيوت الكوثر يوم الأحد ٦ أبريل ٢٠٢٥ اتفاقية تعاون استراتيجي مع شركة جيت زون الدولية.",
    date: "Apr 6, 2025",
    dateFr: "6 avr. 2025",
    dateAr: "٦ أبريل ٢٠٢٥",
  },
];

const TEXT = {
  EN: {
    heading: "Latest News",
    subheading:
      "Explore the latest news, events, and milestones from Boyut Al-Kawthar.",
    searchPlaceholder: "Search news...",
    noResults: "No news found matching your search.",
    readMore: "Read More",
    showLess: "Show Less",
  },
  AR: {
    heading: "آخر الأخبار",
    subheading:
      "استكشف آخر الأخبار والفعاليات والإنجازات من بيوت الكوثر.",
    searchPlaceholder: "ابحث في الأخبار...",
    noResults: "لم يتم العثور على أخبار مطابقة لبحثك.",
    readMore: "اقرأ المزيد",
    showLess: "عرض أقل",
  },
  FR: {
    heading: "Dernières actualités",
    subheading:
      "Découvrez les dernières actualités, événements et réussites de Boyut Al-Kawthar.",
    searchPlaceholder: "Rechercher une actualité...",
    noResults: "Aucune actualité ne correspond à votre recherche.",
    readMore: "Lire la suite",
    showLess: "Afficher moins",
  },
} as const;

function readStoredLang(): LangCode {
  if (typeof window === "undefined") return "EN";
  const storedLang = window.localStorage.getItem(LANG_KEY);
  return storedLang === "AR" || storedLang === "FR" ? storedLang : "EN";
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5 shrink-0"
      fill="none"
      stroke="#3EA96E"
      strokeWidth="1.8"
    >
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 3v4M16 3v4" />
    </svg>
  );
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

/** Single news card with alternating layout + scroll animation */
function NewsRow({
  item,
  index,
  langCode,
  readMoreLabel,
  showLessLabel,
}: {
  item: NewsCard;
  index: number;
  langCode: LangCode;
  readMoreLabel: string;
  showLessLabel: string;
}) {
  const [rowRef, rowInView] = useInView<HTMLDivElement>(0.15);
  const [expanded, setExpanded] = useState(false);

  // Alternate: even index → image left; odd index → image right
  const imageLeft = index % 2 === 0;

  const isAr = langCode === "AR";
  const title = langCode === "AR" ? item.titleAr : langCode === "FR" ? item.titleFr : item.title;
  const desc = langCode === "AR" ? item.descAr : langCode === "FR" ? item.descFr : item.desc;
  const date = langCode === "AR" ? item.dateAr : langCode === "FR" ? item.dateFr : item.date;

  return (
    <div
      ref={rowRef}
      className={[
        "group/row relative grid grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-10",
        "transition-all duration-1000 ease-out",
        rowInView
          ? "translate-x-0 opacity-100"
          : imageLeft
          ? isAr
            ? "translate-x-24 opacity-0"
            : "-translate-x-24 opacity-0"
          : isAr
          ? "-translate-x-24 opacity-0"
          : "translate-x-24 opacity-0",
      ].join(" ")}
    >
      {/* Image */}
      <div
        className={[
          "relative h-[220px] w-full overflow-hidden rounded-[1.5rem] sm:h-[280px] sm:rounded-[1.75rem] md:h-[320px] lg:h-[340px]",
          imageLeft ? "lg:order-1" : "lg:order-2",
        ].join(" ")}
      >
        <Image
          src={item.image}
          alt={title}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover/row:scale-105"
          priority={index < 2}
        />

        {/* Green corner accent */}
        <span className="absolute top-0 h-1 w-20 rounded-br-full bg-[#3EA96E] ltr:left-0 rtl:right-0" />
      </div>

      {/* Content */}
      <div
        className={[
          "flex flex-col",
          imageLeft ? "lg:order-2" : "lg:order-1",
          isAr ? "text-right" : "text-left",
        ].join(" ")}
        dir={isAr ? "rtl" : "ltr"}
      >
        {/* Date */}
        <div className="mb-2.5 flex items-center gap-2 font-[family-name:var(--font-poppins)] text-[11.5px] font-light text-[#5C5C5C] sm:text-[12px]">
          <CalendarIcon />
          {date}
        </div>

        {/* Title */}
        <h3 className="font-[family-name:var(--font-playfair)] text-lg font-extrabold leading-snug text-[#0F3327] transition-colors duration-300 group-hover/row:text-[#3EA96E] sm:text-xl md:text-2xl">
          {title}
        </h3>

        {/* Green divider */}
        <div
          className={`my-3 h-[2px] w-12 rounded-full bg-[#3EA96E] transition-all duration-500 group-hover/row:w-20 ${
            isAr ? "ml-auto mr-0" : "ml-0 mr-auto"
          }`}
        />

        {/* Description */}
        <p
          className={`font-[family-name:var(--font-poppins)] text-[12.5px] font-light leading-relaxed text-[#5C5C5C] sm:text-[13.5px] md:text-[14px] ${
            expanded ? "" : "line-clamp-3"
          }`}
        >
          {desc}
        </p>

        {/* Read More / Show Less */}
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className={[
            "mt-4 inline-flex cursor-pointer items-center gap-1.5 font-[family-name:var(--font-poppins)] text-[12px] font-semibold text-[#3EA96E] transition-colors duration-300 hover:text-[#0F3327] sm:text-[12.5px]",
            isAr ? "self-end flex-row-reverse" : "self-start",
          ].join(" ")}
        >
          {expanded ? showLessLabel : readMoreLabel}
          <span
            className={`transition-transform duration-300 ${
              expanded ? "rotate-180" : ""
            }`}
          >
            →
          </span>
        </button>
      </div>
    </div>
  );
}

export default function NewsSection() {
  const [langCode, setLangCode] = useState<LangCode>(() => readStoredLang());
  const [searchQuery, setSearchQuery] = useState("");

  // Language change listener
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

  const [headingRef, headingInView] = useInView<HTMLDivElement>(0.2);
  const [searchRef, searchInView] = useInView<HTMLDivElement>(0.2);

  // Filter news
  const filtered = useMemo(() => {
    return NEWS_ITEMS.filter((item) => {
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase();
      const title = langCode === "AR" ? item.titleAr : langCode === "FR" ? item.titleFr : item.title;
      const desc = langCode === "AR" ? item.descAr : langCode === "FR" ? item.descFr : item.desc;
      const date = langCode === "AR" ? item.dateAr : langCode === "FR" ? item.dateFr : item.date;

      return (
        title.toLowerCase().includes(query) ||
        desc.toLowerCase().includes(query) ||
        date.toLowerCase().includes(query)
      );
    });
  }, [searchQuery, langCode]);

  return (
    <section
      dir={isAr ? "rtl" : "ltr"}
      className={`${playfair.variable} ${poppins.variable} w-full overflow-x-hidden bg-white py-12 `}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 lg:px-10">
        {/* Heading — fade up */}
        <div
          ref={headingRef}
          className={[
            "mb-8 text-center transition-all duration-1000 ease-out md:mb-10",
            headingInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
          ].join(" ")}
        >
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-extrabold text-[#3EA96E] sm:text-3xl md:text-4xl">
            {t.heading}
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-[#3EA96E] sm:w-20" />
          <p className="mx-auto mt-4 max-w-2xl font-[family-name:var(--font-poppins)] text-[13px] font-light leading-relaxed text-[#5C5C5C] sm:text-[14px] md:text-[15px]">
            {t.subheading}
          </p>
        </div>

        {/* Search input — slide from LEFT (EN) / RIGHT (AR) */}
        <div
          ref={searchRef}
          className={[
            "relative mx-auto mb-10 w-full max-w-xl transition-all duration-1000 ease-out md:mb-14",
            searchInView
              ? "translate-x-0 opacity-100"
              : isAr
              ? "translate-x-24 opacity-0"
              : "-translate-x-24 opacity-0",
          ].join(" ")}
        >
          <span
            className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-[#5C5C5C] ${
              isAr ? "right-4" : "left-4"
            }`}
          >
            <SearchIcon />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className={`w-full cursor-text rounded-full border border-[#0F3327]/15 bg-white py-3.5 font-[family-name:var(--font-poppins)] text-[13.5px] font-light text-[#0F3327] placeholder:text-[#5C5C5C]/60 shadow-sm outline-none transition-all duration-300 focus:border-[#3EA96E] focus:ring-2 focus:ring-[#3EA96E]/30 focus:shadow-md sm:text-[14px] ${
              isAr ? "pr-11 pl-4" : "pl-11 pr-4"
            }`}
          />
        </div>

        {/* News rows */}
        {filtered.length > 0 ? (
          <div className="space-y-10 sm:space-y-12 md:space-y-14 lg:space-y-16">
            {filtered.map((item, index) => (
              <NewsRow
                key={item.id}
                item={item}
                index={index}
                langCode={langCode}
                readMoreLabel={t.readMore}
                showLessLabel={t.showLess}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-[#0F3327]/10 bg-[#F4FAF7] py-16 text-center">
            <p className="font-[family-name:var(--font-poppins)] text-[14px] font-light text-[#5C5C5C] sm:text-[15px]">
              {t.noResults}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}