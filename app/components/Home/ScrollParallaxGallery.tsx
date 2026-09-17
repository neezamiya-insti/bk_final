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

type NewsCard = {
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

const TOP_ROW: NewsCard[] = [
  {
    image: "/news/new1.png",
    title:
      "Saudi Ambassador, Saudi Commercial Attaché, and President of the Saudi Exporters Association at BIF",
    titleFr:
      "L'ambassadeur saoudien et la délégation commerciale au pavillon de la Foire internationale de Bagdad",
    titleAr:
      "سفير المملكة والملحق التجاري السعودي ورئيس اتحاد المصدرين السعوديين في معرض بغداد الدولي",
    desc: "We were honored to be visited at our pavilion at the exhibition by His Excellency Mr. Abdulaziz Al-Shammari, Ambassador of the Kingdom of Saudi Arabia to the Republic of Iraq, H.E. the Saudi Deputy Ambassador, and the President of the Saudi Exporters Association, during Baghdad International Fair.",
    descFr:
      "Nous avons eu l'honneur d'accueillir à notre pavillon Son Excellence M. Abdulaziz Al-Shammari, ambassadeur du Royaume d'Arabie saoudite en Irak, ainsi que la délégation commerciale saoudienne.",
    descAr:
      "تشرفنا بزيارة معالي السيد عبدالعزيز الشمري، سفير المملكة العربية السعودية لدى جمهورية العراق، وسعادة نائب السفير السعودي، ورئيس اتحاد المصدرين السعوديين لجناحنا خلال معرض بغداد الدولي.",
    date: "Feb 2, 2026",
    dateFr: "2 févr. 2026",
    dateAr: "2 فبراير 2026",
  },
  {
    image: "/news/new2.png",
    title: "High-Level Saudi Delegation Visits Boyut Al-Kawthar Booth at Baghdad International Fair",
    titleFr: "Une délégation saoudienne de haut niveau visite le pavillon de Boyut Al-Kawthar",
    titleAr: "وفد سعودي رفيع المستوى يزور جناح بيوت الكوثر في معرض بغداد الدولي",
    desc: "Boyut Al-Kawthar was honored by the visit of the Saudi Deputy Ambassador to Iraq, the embassy delegation, and President of the Saudi Exporters Association to Boyut Al-Kawthar booth during their tour of Baghdad Fair.",
    descFr:
      "Boyut Al-Kawthar a eu l'honneur d'accueillir le vice-ambassadeur saoudien en Irak, la délégation de l'ambassade et le président de l'Association des exportateurs saoudiens.",
    descAr:
      "تشرفت بيوت الكوثر بزيارة نائب السفير السعودي لدى العراق ووفد السفارة ورئيس اتحاد المصدرين السعوديين لجناح بيوت الكوثر خلال جولتهم في معرض بغداد.",
    date: "Feb 1, 2026",
    dateFr: "1er févr. 2026",
    dateAr: "1 فبراير 2026",
  },
  {
    image: "/news/new3.png",
    title: "Visit of H.E. the Minister of Industry and Mineral Resources and H.E. the CEO of the SEDA",
    titleFr: "Visite du ministre de l'Industrie et du PDG de l'Autorité saoudienne des exportations",
    titleAr: "زيارة معالي وزير الصناعة والثروة المعدنية والرئيس التنفيذي لهيئة تنمية الصادرات السعودية",
    desc: "We were honored by the visit of His Excellency Mr. Bandar Al-Khorayef, Minister of Industry and Mineral Resources, and His Excellency Eng. Abdulrahman Alzukair, CEO of the Saudi Export Development Authority, at our booth.",
    descFr:
      "Nous avons eu l'honneur d'accueillir Son Excellence M. Bandar Al-Khorayef, ministre de l'Industrie et des Ressources minérales, ainsi que le PDG de l'Autorité saoudienne des exportations.",
    descAr:
      "تشرفنا بزيارة معالي الأستاذ بندر الخريف، وزير الصناعة والثروة المعدنية، وسعادة المهندس عبدالرحمن الذكير، الرئيس التنفيذي لهيئة تنمية الصادرات السعودية، لجناحنا.",
    date: "Dec 16, 2025",
    dateFr: "16 déc. 2025",
    dateAr: "16 ديسمبر 2025",
  },
];

const BLOG_ROW: NewsCard[] = [
  {
    image: "/blogs/blog1.png",
    title: "From Local to Global: How Culture Unlocks Success",
    titleFr: "Du local au mondial : comment la culture ouvre la voie au succès",
    titleAr: "من المحلي إلى العالمي: كيف تفتح الثقافة أبواب النجاح",
    desc: "Understanding cultural nuances is the key to building lasting international partnerships.",
    descFr: "Comprendre les nuances culturelles est essentiel pour bâtir des partenariats internationaux durables.",
    descAr: "فهم الفروق الثقافية هو المفتاح لبناء شراكات دولية دائمة.",
    date: "Nov 25, 2025",
    dateFr: "25 nov. 2025",
    dateAr: "25 نوفمبر 2025",
  },
  {
    image: "/blogs/blog2.png",
    title: "Joint Ventures are Transforming the Future of Saudi Industry!",
    titleFr: "Les coentreprises transforment l'avenir de l'industrie saoudienne !",
    titleAr: "المشاريع المشتركة تحوّل مستقبل الصناعة السعودية!",
    desc: "Strategic joint ventures are reshaping Saudi industry by combining local expertise with global innovation.",
    descFr: "Les coentreprises stratégiques transforment l'industrie saoudienne en associant expertise locale et innovation mondiale.",
    descAr: "المشاريع المشتركة الاستراتيجية تعيد تشكيل الصناعة السعودية بالجمع بين الخبرة المحلية والابتكار العالمي.",
    date: "Aug 21, 2025",
    dateFr: "21 août 2025",
    dateAr: "21 أغسطس 2025",
  },
  {
    image: "/blogs/blog3.png",
    title: "A Golden Opportunity in Tanzania's Booming Construction Market",
    titleFr: "Une opportunité en or sur le marché de la construction en plein essor en Tanzanie",
    titleAr: "فرصة ذهبية في سوق البناء المزدهر في تنزانيا",
    desc: "Tanzania's rapid infrastructure growth opens new doors for Saudi construction exporters.",
    descFr: "La croissance rapide des infrastructures en Tanzanie ouvre de nouvelles portes aux exportateurs saoudiens du secteur de la construction.",
    descAr: "النمو السريع للبنية التحتية في تنزانيا يفتح أبوابًا جديدة لمصدّري مواد البناء السعوديين.",
    date: "Aug 14, 2025",
    dateFr: "14 août 2025",
    dateAr: "14 أغسطس 2025",
  },
  {
    image: "/blogs/blog4.png",
    title: "Africa and Saudi Arabia: A Strategic Alliance in Food Trade",
    titleFr: "Afrique et Arabie saoudite : une alliance stratégique dans le commerce alimentaire",
    titleAr: "أفريقيا والسعودية: تحالف استراتيجي في تجارة الغذاء",
    desc: "Saudi-Africa trade partnerships in agriculture are paving the way for long-term food security.",
    descFr: "Les partenariats agricoles entre l'Arabie saoudite et l'Afrique ouvrent la voie à une sécurité alimentaire durable.",
    descAr: "الشراكات التجارية السعودية الأفريقية في الزراعة تمهد الطريق للأمن الغذائي طويل الأمد.",
    date: "Aug 10, 2025",
    dateFr: "10 août 2025",
    dateAr: "10 أغسطس 2025",
  },
  {
    image: "/blogs/blog5.png",
    title: "Is Pricing Just A Number?",
    titleFr: "Le prix n'est-il qu'un chiffre ?",
    titleAr: "هل التسعير مجرد رقم؟",
    desc: "Pricing is a strategic decision, not just a number. Learn how to price for global markets.",
    descFr: "La tarification est une décision stratégique, pas seulement un chiffre. Découvrez comment fixer vos prix pour les marchés mondiaux.",
    descAr: "التسعير قرار استراتيجي، وليس مجرد رقم. تعلّم كيف تسعّر لمنتجاتك عالميًا.",
    date: "Jul 8, 2025",
    dateFr: "8 juil. 2025",
    dateAr: "8 يوليو 2025",
  },
  {
    image: "/blogs/blog6.png",
    title: "Saudi Exports 2025: A Roadmap to The World",
    titleFr: "Exportations saoudiennes 2025 : une feuille de route vers le monde",
    titleAr: "الصادرات السعودية ٢٠٢٥: خارطة طريق إلى العالم",
    desc: "A comprehensive look at Saudi Arabia's export strategy for 2025 and beyond.",
    descFr: "Un aperçu complet de la stratégie d'exportation de l'Arabie saoudite pour 2025 et au-delà.",
    descAr: "نظرة شاملة على استراتيجية التصدير السعودية لعام ٢٠٢٥ وما بعده.",
    date: "Jun 6, 2025",
    dateFr: "6 juin 2025",
    dateAr: "6 يونيو 2025",
  },
];

const TEXT = {
  EN: {
    heading: "Our News & Blogs",
    readMore: "Read More",
    showLess: "Show Less",
  },
  AR: {
    heading: "أخبارنا",
    readMore: "اقرأ المزيد",
    showLess: "عرض أقل",
  },
  FR: {
    heading: "Nos actualités et blogs",
    readMore: "Lire la suite",
    showLess: "Afficher moins",
  },
} as const;

const CARD_WIDTH = 320;

function readStoredLang(): LangCode {
  if (typeof window === "undefined") return "EN";
  const storedLang = window.localStorage.getItem(LANG_KEY);
  return storedLang === "AR" || storedLang === "FR" ? storedLang : "EN";
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

function useSeamlessScrollRow(direction: "left" | "right", speed: number, itemCount: number) {
  const rowRef = useRef<HTMLDivElement>(null);
  const loopWidthRef = useRef(0);

  useEffect(() => {
    function measure() {
      const row = rowRef.current;
      if (!row) return;

      const gap = parseFloat(getComputedStyle(row).columnGap) || 0;
      const cards = Array.from(row.children).slice(0, itemCount);
      loopWidthRef.current = cards.reduce(
        (width, card) => width + (card as HTMLElement).offsetWidth,
        gap * Math.max(cards.length - 1, 0)
      );
    }
    measure();

    const resizeObserver = new ResizeObserver(measure);
    if (rowRef.current) resizeObserver.observe(rowRef.current);
    window.addEventListener("resize", measure);

    let rafId: number;
    function tick() {
      const loopWidth = loopWidthRef.current;
      if (rowRef.current && loopWidth > 0) {
        const offset = (window.scrollY * speed) % loopWidth;
        const translate = direction === "left" ? -offset : offset - loopWidth;
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
  }, [direction, itemCount, speed]);

  return rowRef;
}

export default function ScrollParallaxGallery() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [langCode, setLangCode] = useState<LangCode>(() => readStoredLang());

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

  const toggleExpand = (key: string) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const topRowRef = useSeamlessScrollRow("left", 0.45, TOP_ROW.length);
  const bottomRowRef = useSeamlessScrollRow("right", 0.45, BLOG_ROW.length);

  // Three copies keep the top row wide enough to cover the viewport at every
  // point in its loop, including wide desktop screens.
  const topCards = [...TOP_ROW, ...TOP_ROW, ...TOP_ROW];
  const bottomCards = [...BLOG_ROW, ...BLOG_ROW];

  const renderCard = (card: NewsCard, i: number, rowKey: string) => {
    const contentKey = `${rowKey}-${i % (rowKey === "top" ? TOP_ROW.length : BLOG_ROW.length)}`;
    const isOpen = !!expanded[contentKey];
    const title = langCode === "AR" ? card.titleAr : langCode === "FR" ? card.titleFr : card.title;
    const description = langCode === "AR" ? card.descAr : langCode === "FR" ? card.descFr : card.desc;
    const date = langCode === "AR" ? card.dateAr : langCode === "FR" ? card.dateFr : card.date;

    return (
      <article
        key={`${rowKey}-${i}`}
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
              onClick={() => toggleExpand(contentKey)}
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
      className={`${playfair.variable} ${poppins.variable} w-full overflow-hidden bg-white `}
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