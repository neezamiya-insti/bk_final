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

type NewsCard = {
  image: string;
  title: string;
  titleAr: string;
  desc: string;
  descAr: string;
  date: string;
  dateAr: string;
};

const TOP_ROW: NewsCard[] = [
  {
    image: "/news/new1.png",
    title:
      "Saudi Ambassador, Saudi Commercial Attaché, and President of the Saudi Exporters Association at BIF",
    titleAr:
      "سفير المملكة والملحق التجاري السعودي ورئيس اتحاد المصدرين السعوديين في معرض بغداد الدولي",
    desc: "We were honored to be visited at our pavilion at the exhibition by His Excellency Mr. Abdulaziz Al-Shammari, Ambassador of the Kingdom of Saudi Arabia to the Republic of Iraq, H.E. the Saudi Deputy Ambassador, and the President of the Saudi Exporters Association, during Baghdad International Fair.",
    descAr:
      "تشرفنا بزيارة معالي السيد عبدالعزيز الشمري، سفير المملكة العربية السعودية لدى جمهورية العراق، وسعادة نائب السفير السعودي، ورئيس اتحاد المصدرين السعوديين لجناحنا خلال معرض بغداد الدولي.",
    date: "Feb 2, 2026",
    dateAr: "2 فبراير 2026",
  },
  {
    image: "/news/new2.png",
    title: "High-Level Saudi Delegation Visits Boyut Al-Kawthar Booth at Baghdad International Fair",
    titleAr: "وفد سعودي رفيع المستوى يزور جناح بيوت الكوثر في معرض بغداد الدولي",
    desc: "Boyut Al-Kawthar was honored by the visit of the Saudi Deputy Ambassador to Iraq, the embassy delegation, and President of the Saudi Exporters Association to Boyut Al-Kawthar booth during their tour of Baghdad Fair.",
    descAr:
      "تشرفت بيوت الكوثر بزيارة نائب السفير السعودي لدى العراق ووفد السفارة ورئيس اتحاد المصدرين السعوديين لجناح بيوت الكوثر خلال جولتهم في معرض بغداد.",
    date: "Feb 1, 2026",
    dateAr: "1 فبراير 2026",
  },
  {
    image: "/news/new3.png",
    title: "Visit of H.E. the Minister of Industry and Mineral Resources and H.E. the CEO of the SEDA",
    titleAr: "زيارة معالي وزير الصناعة والثروة المعدنية والرئيس التنفيذي لهيئة تنمية الصادرات السعودية",
    desc: "We were honored by the visit of His Excellency Mr. Bandar Al-Khorayef, Minister of Industry and Mineral Resources, and His Excellency Eng. Abdulrahman Alzukair, CEO of the Saudi Export Development Authority, at our booth.",
    descAr:
      "تشرفنا بزيارة معالي الأستاذ بندر الخريف، وزير الصناعة والثروة المعدنية، وسعادة المهندس عبدالرحمن الذكير، الرئيس التنفيذي لهيئة تنمية الصادرات السعودية، لجناحنا.",
    date: "Dec 16, 2025",
    dateAr: "16 ديسمبر 2025",
  },
];

const BOTTOM_ROW: NewsCard[] = [
  {
    image: "/news/new4.png",
    title: "Boyut Al-Kawthar participates in The Made in Saudi Expo 2025, held in Riyadh",
    titleAr: "مشاركة بيوت الكوثر في معرض صنع في السعودية 2025 المقام في الرياض",
    desc: "Participation of Boyut Al-Kawthar considered an official and accredited export house recognized by SEDA. As a service provider for international trade and business development to exporters and manufacturers, it offers comprehensive solutions to help them access global markets.",
    descAr:
      "شاركت بيوت الكوثر بصفتها بيت تصدير رسمي ومعتمد من هيئة تنمية الصادرات السعودية. وباعتبارها مقدم خدمات للتجارة الدولية وتطوير الأعمال للمصدرين والمصنعين، فإنها تقدم حلولًا متكاملة لمساعدتهم على الوصول إلى الأسواق العالمية.",
    date: "Dec 15, 2025",
    dateAr: "15 ديسمبر 2025",
  },
  {
    image: "/news/new5.png",
    title: "The Third Business Matching Forum Between Small and Medium Factories and Licensed Export Houses",
    titleAr: "الملتقى الثالث لمطابقة الأعمال بين المصانع الصغيرة والمتوسطة وبيوت التصدير المرخصة",
    desc: "Participation of Boyut Al-Kawthar, in the third Business Matching Forum between small and medium factories one of the export houses licensed by the Saudi Export Development Authority.",
    descAr:
      "شاركت بيوت الكوثر في الملتقى الثالث لمطابقة الأعمال بين المصانع الصغيرة والمتوسطة، بصفتها أحد بيوت التصدير المرخصة من هيئة تنمية الصادرات السعودية.",
    date: "Jun 24, 2025",
    dateAr: "24 يونيو 2025",
  },
  {
    image: "/news/new6.png",
    title: "Strategic Cooperation Between BOYUT AL-KAWTHAR and GIT-ZONE International",
    titleAr: "تعاون استراتيجي بين بيوت الكوثر وشركة GIT-ZONE International",
    desc: "In a strategic step to support Saudi exporters and expand the scope of their products in global markets, Boyut Al-Kawthar signed on Sunday, April 6, 2025, a strategic cooperation agreement with GIT-ZONE International.",
    descAr:
      "في خطوة استراتيجية لدعم المصدرين السعوديين وتوسيع نطاق منتجاتهم في الأسواق العالمية، وقعت بيوت الكوثر يوم الأحد 6 أبريل 2025 اتفاقية تعاون استراتيجية مع شركة GIT-ZONE International.",
    date: "Apr 6, 2025",
    dateAr: "6 أبريل 2025",
  },
];

const TEXT = {
  EN: {
    heading: "Our News",
    readMore: "Read More",
    showLess: "Show Less",
  },
  AR: {
    heading: "أخبارنا",
    readMore: "اقرأ المزيد",
    showLess: "عرض أقل",
  },
} as const;

const CARD_WIDTH = 320;

function readStoredLang(): LangCode {
  if (typeof window === "undefined") return "EN";
  return window.localStorage.getItem(LANG_KEY) === "AR" ? "AR" : "EN";
}

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 shrink-0"
      fill="none"
      stroke="#F5B301"
      strokeWidth="1.8"
    >
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 3v4M16 3v4" />
    </svg>
  );
}

function useSeamlessScrollRow(direction: "left" | "right", speed: number) {
  const rowRef = useRef<HTMLDivElement>(null);
  const halfWidthRef = useRef(0);

  useEffect(() => {
    function measure() {
      if (rowRef.current) {
        halfWidthRef.current = rowRef.current.scrollWidth / 2;
      }
    }
    measure();

    const resizeObserver = new ResizeObserver(measure);
    if (rowRef.current) resizeObserver.observe(rowRef.current);
    window.addEventListener("resize", measure);

    let rafId: number;
    function tick() {
      const halfWidth = halfWidthRef.current;
      if (rowRef.current && halfWidth > 0) {
        const offset = (window.scrollY * speed) % halfWidth;
        const translate = direction === "left" ? -offset : offset - halfWidth;
        rowRef.current.style.transform = `translate3d(${translate}px,0,0)`;
      }
      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", measure);
      resizeObserver.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [direction, speed]);

  return rowRef;
}

export default function ScrollParallaxGallery() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [langCode, setLangCode] = useState<LangCode>(() => readStoredLang());

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

  const isAr = langCode === "AR";
  const t = TEXT[langCode];

  const toggleExpand = (key: string) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const topRowRef = useSeamlessScrollRow("left", 0.45);
  const bottomRowRef = useSeamlessScrollRow("right", 0.45);

  const topCards = [...TOP_ROW, ...TOP_ROW];
  const bottomCards = [...BOTTOM_ROW, ...BOTTOM_ROW];

  const renderCard = (card: NewsCard, i: number, rowKey: string) => {
    const key = `${rowKey}-${i % (rowKey === "top" ? TOP_ROW.length : BOTTOM_ROW.length)}`;
    const isOpen = !!expanded[key];
    const title = isAr ? card.titleAr : card.title;
    const description = isAr ? card.descAr : card.desc;
    const date = isAr ? card.dateAr : card.date;

    return (
      <article
        key={key}
        className="group/card shrink-0 cursor-pointer overflow-hidden rounded-3xl border border-[#13233F]/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        style={{ width: `${CARD_WIDTH}px` }}
      >
        {/* Image */}
        <div className="relative h-[170px] w-full overflow-hidden md:h-[200px]">
          <Image
            src={card.image}
            alt={card.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover/card:scale-105"
            sizes={`${CARD_WIDTH}px`}
            priority={i < 3}
          />
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Title */}
          <h3 className="line-clamp-2 font-[family-name:var(--font-playfair)] text-[14px] font-extrabold leading-snug text-[#13233F] sm:text-[15px]">
            {title}
          </h3>

          {/* Gold divider */}
          <div className="my-2 h-[2px] w-8 rounded-full bg-[#F5B301]" />

          {/* Description */}
          <p
            className={`font-[family-name:var(--font-poppins)] text-[12.5px] font-light leading-relaxed text-[#5C5C5C] sm:text-[13px] ${
              isOpen ? "" : "line-clamp-2"
            }`}
          >
            {description}
          </p>

          {/* Date + Read More */}
          <div className="mt-3 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 font-[family-name:var(--font-poppins)] text-[11.5px] font-light text-[#5C5C5C] sm:text-[12px]">
              <CalendarIcon />
              {date}
            </div>
            <button
              type="button"
              onClick={() => toggleExpand(key)}
              className="cursor-pointer font-[family-name:var(--font-poppins)] text-[11.5px] font-semibold text-[#F5B301] underline underline-offset-2 transition-colors duration-300 hover:text-[#C0272D] sm:text-[12px]"
            >
              {isOpen ? t.showLess : t.readMore}
            </button>
          </div>
        </div>
      </article>
    );
  };

  return (
    <section
      dir={isAr ? "rtl" : "ltr"}
      className={`${playfair.variable} ${poppins.variable} w-full overflow-hidden bg-white py-10 md:py-14`}
    >
      {/* Heading */}
      <div className="mb-8 text-center md:mb-10">
        <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-extrabold text-[#13233F] sm:text-4xl">
          {t.heading}
        </h2>
        <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-[#F5B301] sm:w-20" />
      </div>

      {/* Top row — always LTR for consistent scroll direction */}
      <div dir="ltr" className="overflow-hidden">
        <div ref={topRowRef} className="flex gap-5 will-change-transform md:gap-6">
          {topCards.map((card, i) => renderCard(card, i, "top"))}
        </div>
      </div>

      {/* Bottom row — always LTR for consistent scroll direction */}
      <div dir="ltr" className="mt-5 overflow-hidden md:mt-6">
        <div ref={bottomRowRef} className="flex gap-5 will-change-transform md:gap-6">
          {bottomCards.map((card, i) => renderCard(card, i, "bottom"))}
        </div>
      </div>
    </section>
  );
}