"use client";

import Image from "next/image";
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

type BlogPost = {
  id: number;
  image: string;
  title: string;
  titleFr: string;
  titleAr: string;
  date: string;
  dateFr: string;
  dateAr: string;
  category: string;
  categoryFr: string;
  categoryAr: string;
  excerpt: string;
  excerptFr: string;
  excerptAr: string;
  fullDesc: string;
  fullDescFr: string;
  fullDescAr: string;
};

const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    image: "/blogs/blog1.png",
    title: "From Local to Global: How Culture Unlocks Success",
    titleFr: "Du local au mondial : comment la culture ouvre la voie au succès",
    titleAr: "من المحلي إلى العالمي: كيف تفتح الثقافة أبواب النجاح",
    date: "November 25, 2025",
    dateFr: "25 nov. 2025",
    dateAr: "٢٥ نوفمبر ٢٠٢٥",
    category: "Culture",
    categoryFr: "Culture",
    categoryAr: "الثقافة",
    excerpt:
      "Understanding cultural nuances is the key to building lasting international partnerships.",
    excerptFr: "Comprendre les nuances culturelles est essentiel pour bâtir des partenariats internationaux durables.",
    excerptAr:
      "فهم الفروق الثقافية هو المفتاح لبناء شراكات دولية دائمة.",
    fullDesc:
      "When Saudi businesses step onto the global stage, culture becomes more than just a courtesy — it becomes a strategic advantage. From understanding negotiation styles in East Asia to appreciating relationship-building in Africa, cultural intelligence allows exporters to connect authentically with international buyers. In this article, we explore real examples of Saudi companies that succeeded abroad by adapting their communication, packaging, and branding to local tastes while staying true to their roots.",
    fullDescFr: "Lorsque les entreprises saoudiennes se lancent sur la scène mondiale, la culture devient un véritable avantage stratégique. Cet article présente comment l'intelligence culturelle aide les exportateurs à créer des liens authentiques avec les acheteurs internationaux.",
    fullDescAr:
      "عندما تخطو الشركات السعودية إلى الساحة العالمية، تصبح الثقافة أكثر من مجرد مجاملة — إنها ميزة استراتيجية. من فهم أساليب التفاوض في شرق آسيا إلى تقدير بناء العلاقات في أفريقيا، تتيح الذكاء الثقافي للمصدّرين التواصل بصدق مع المشترين الدوليين. في هذا المقال، نستعرض أمثلة حقيقية لشركات سعودية نجحت في الخارج من خلال تكييف تواصلها وتغليفها وعلامتها التجارية مع الأذواق المحلية مع الحفاظ على جذورها.",
  },
  {
    id: 2,
    image: "/blogs/blog2.png",
    title: "Joint Ventures are Transforming the Future of Saudi Industry!",
    titleFr: "Les coentreprises transforment l'avenir de l'industrie saoudienne !",
    titleAr: "المشاريع المشتركة تحوّل مستقبل الصناعة السعودية!",
    date: "August 21, 2025",
    dateFr: "21 août 2025",
    dateAr: "٢١ أغسطس ٢٠٢٥",
    category: "Industry",
    categoryFr: "Industrie",
    categoryAr: "الصناعة",
    excerpt:
      "Strategic joint ventures are reshaping Saudi industry by combining local expertise with global innovation.",
    excerptFr: "Les coentreprises stratégiques transforment l'industrie saoudienne en associant expertise locale et innovation mondiale.",
    excerptAr:
      "المشاريع المشتركة الاستراتيجية تعيد تشكيل الصناعة السعودية بالجمع بين الخبرة المحلية والابتكار العالمي.",
    fullDesc:
      "Joint ventures between Saudi manufacturers and international companies are creating new opportunities for technology transfer, skill development, and market access. These partnerships allow Saudi businesses to leverage foreign expertise while offering global partners access to the Kingdom's rapidly growing market. We look at how these collaborations are driving Vision 2030 forward and what it means for exporters looking to scale.",
    fullDescFr: "Les coentreprises entre fabricants saoudiens et entreprises internationales créent de nouvelles opportunités de transfert de technologie, de développement des compétences et d'accès aux marchés.",
    fullDescAr:
      "المشاريع المشتركة بين المصنّعين السعوديين والشركات الدولية تخلق فرصًا جديدة لنقل التكنولوجيا وتطوير المهارات والوصول إلى الأسواق. تتيح هذه الشراكات للشركات السعودية الاستفادة من الخبرة الأجنبية مع تقديم وصول الشركاء العالميين إلى سوق المملكة المتنامي بسرعة.",
  },
  {
    id: 3,
    image: "/blogs/blog3.png",
    title: "A Golden Opportunity in Tanzania's Booming Construction Market",
    titleFr: "Une opportunité en or sur le marché de la construction en Tanzanie",
    titleAr: "فرصة ذهبية في سوق البناء المزدهر في تنزانيا",
    date: "August 14, 2025",
    dateFr: "14 août 2025",
    dateAr: "١٤ أغسطس ٢٠٢٥",
    category: "Markets",
    categoryFr: "Marchés",
    categoryAr: "الأسواق",
    excerpt:
      "Tanzania's rapid infrastructure growth opens new doors for Saudi construction exporters.",
    excerptFr: "La croissance rapide des infrastructures en Tanzanie ouvre de nouvelles portes aux exportateurs saoudiens de la construction.",
    excerptAr:
      "النمو السريع للبنية التحتية في تنزانيا يفتح أبوابًا جديدة لمصدّري مواد البناء السعوديين.",
    fullDesc:
      "Tanzania is investing heavily in roads, ports, housing, and energy projects. With demand for construction materials at an all-time high, Saudi exporters of cement, steel, tiles, and building solutions have a unique window of opportunity. This article breaks down the market size, key buyers, import regulations, and practical steps for entering Tanzania successfully.",
    fullDescFr: "La Tanzanie investit fortement dans les routes, les ports, le logement et l'énergie. Cette analyse présente les acheteurs clés, les règles d'importation et les étapes pratiques pour réussir son entrée sur ce marché.",
    fullDescAr:
      "تستثمر تنزانيا بكثافة في الطرق والموانئ والإسكان والطاقة. مع ارتفاع الطلب على مواد البناء إلى أعلى مستوياته، يمتلك مصدّرو الأسمنت والصلب والبلاط السعوديون نافذة فرصة فريدة.",
  },
  {
    id: 4,
    image: "/blogs/blog4.png",
    title: "Africa and Saudi Arabia: A Strategic Alliance in Food Trade Leads the Future of Food Security",
    titleFr: "Afrique et Arabie saoudite : une alliance stratégique pour la sécurité alimentaire",
    titleAr: "أفريقيا والسعودية: تحالف استراتيجي في تجارة الغذاء يقود مستقبل الأمن الغذائي",
    date: "August 10, 2025",
    dateFr: "10 août 2025",
    dateAr: "١٠ أغسطس ٢٠٢٥",
    category: "Trade",
    categoryFr: "Commerce",
    categoryAr: "التجارة",
    excerpt:
      "Saudi-Africa trade partnerships in agriculture are paving the way for long-term food security.",
    excerptFr: "Les partenariats agricoles entre l'Arabie saoudite et l'Afrique ouvrent la voie à une sécurité alimentaire durable.",
    excerptAr:
      "الشراكات التجارية السعودية الأفريقية في الزراعة تمهد الطريق للأمن الغذائي طويل الأمد.",
    fullDesc:
      "Food security is one of the most pressing global challenges, and Saudi Arabia is taking bold steps to address it through strategic partnerships with African nations. From investing in agricultural land to importing high-quality produce, these alliances are creating mutual benefits. We examine the key sectors, government initiatives, and export opportunities that are shaping this new era of food trade.",
    fullDescFr: "La sécurité alimentaire est un défi mondial majeur. Nous examinons les secteurs clés, les initiatives publiques et les opportunités d'exportation qui façonnent cette nouvelle ère du commerce alimentaire.",
    fullDescAr:
      "الأمن الغذائي أحد أكثر التحديات العالمية إلحاحًا، والمملكة العربية السعودية تخطو خطوات جريئة لمعالجته من خلال شراكات استراتيجية مع الدول الأفريقية.",
  },
  {
    id: 5,
    image: "/blogs/blog5.png",
    title: "Is Pricing Just A Number?",
    titleFr: "Le prix n'est-il qu'un chiffre ?",
    titleAr: "هل التسعير مجرد رقم؟",
    date: "July 8, 2025",
    dateFr: "8 juil. 2025",
    dateAr: "٨ يوليو ٢٠٢٥",
    category: "Strategy",
    categoryFr: "Stratégie",
    categoryAr: "الاستراتيجية",
    excerpt:
      "Pricing is a strategic decision — not just a number. Learn how to price for global markets.",
    excerptFr: "La tarification est une décision stratégique, pas seulement un chiffre. Découvrez comment fixer vos prix à l'international.",
    excerptAr:
      "التسعير قرار استراتيجي — وليس مجرد رقم. تعلّم كيف تسعّر لمنتجاتك عالميًا.",
    fullDesc:
      "Setting the right price for a new market is one of the most difficult decisions an exporter faces. Too high and you lose customers; too low and you erode margins and brand value. In this article, we explore the psychological, economic, and cultural factors that affect pricing, and share a practical framework Saudi exporters can use to find the sweet spot in any market.",
    fullDescFr: "Fixer le bon prix sur un nouveau marché est une décision complexe. Découvrez les facteurs psychologiques, économiques et culturels qui influencent la tarification internationale.",
    fullDescAr:
      "تحديد السعر المناسب لسوق جديد من أصعب القرارات التي يواجهها المصدّر. إذا كان مرتفعًا جدًا ستفقد العملاء، وإذا كان منخفضًا جدًا ستتآكل الهوامش وقيمة العلامة التجارية.",
  },
  {
    id: 6,
    image: "/blogs/blog6.png",
    title: "Saudi Exports 2025: A Roadmap to The World",
    titleFr: "Exportations saoudiennes 2025 : une feuille de route vers le monde",
    titleAr: "الصادرات السعودية ٢٠٢٥: خارطة طريق إلى العالم",
    date: "June 6, 2025",
    dateFr: "6 juin 2025",
    dateAr: "٦ يونيو ٢٠٢٥",
    category: "Exports",
    categoryFr: "Exportations",
    categoryAr: "الصادرات",
    excerpt:
      "A comprehensive look at Saudi Arabia's export strategy for 2025 and beyond.",
    excerptFr: "Un aperçu complet de la stratégie d'exportation de l'Arabie saoudite pour 2025 et au-delà.",
    excerptAr:
      "نظرة شاملة على استراتيجية التصدير السعودية لعام ٢٠٢٥ وما بعده.",
    fullDesc:
      "Saudi Arabia is on a mission to diversify its economy and increase non-oil exports. With ambitious targets set under Vision 2030, the Kingdom's export landscape is evolving rapidly. This roadmap covers the key sectors, government support programs, target markets, and emerging opportunities that will define Saudi exports in 2025 and beyond.",
    fullDescFr: "L'Arabie saoudite diversifie son économie et augmente ses exportations hors pétrole. Cette feuille de route présente les secteurs clés, les marchés cibles et les opportunités émergentes.",
    fullDescAr:
      "المملكة العربية السعودية في مهمة لتنويع اقتصادها وزيادة الصادرات غير النفطية. مع الأهداف الطموحة المحددة في رؤية 2030، يتطور مشهد التصدير في المملكة بسرعة.",
  },
];

const TEXT = {
  EN: {
    heading: "Latest Articles",
    subheading: "Explore insights, trends, and stories from the world of Saudi exports and global trade.",
    searchPlaceholder: "Search articles...",
    noResults: "No articles found matching your search.",
    readMore: "Read More",
    showLess: "Show Less",
    allCategories: "All",
  },
  AR: {
    heading: "أحدث المقالات",
    subheading: "استكشف الرؤى والاتجاهات والقصص من عالم الصادرات السعودية والتجارة العالمية.",
    searchPlaceholder: "ابحث في المقالات...",
    noResults: "لم يتم العثور على مقالات مطابقة لبحثك.",
    readMore: "اقرأ المزيد",
    showLess: "عرض أقل",
    allCategories: "الكل",
  },
  FR: {
    heading: "Derniers articles",
    subheading: "Découvrez les analyses, tendances et histoires du monde des exportations saoudiennes et du commerce mondial.",
    searchPlaceholder: "Rechercher un article...",
    noResults: "Aucun article ne correspond à votre recherche.",
    readMore: "Lire la suite",
    showLess: "Afficher moins",
    allCategories: "Toutes",
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
      stroke="#F5B301"
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

export default function BlogSection() {
  const [langCode, setLangCode] = useState<LangCode>(() => readStoredLang());
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<number | null>(null);

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

  // Animation refs
  const [headingRef, headingInView] = useInView<HTMLDivElement>(0.2);
  const [searchRef, searchInView] = useInView<HTMLDivElement>(0.2);
  const [cardsRef, cardsInView] = useInView<HTMLDivElement>(0.1);

  // Get unique categories for filter pills
  const categories = useMemo(() => {
    return Array.from(new Set(BLOG_POSTS.map((p) => p.category)));
  }, []);

  // Filter blog posts
  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const title = langCode === "AR" ? post.titleAr : langCode === "FR" ? post.titleFr : post.title;
      const category = langCode === "AR" ? post.categoryAr : langCode === "FR" ? post.categoryFr : post.category;

      if (activeCategory !== "all" && post.category !== activeCategory) {
        return false;
      }

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        return (
          title.toLowerCase().includes(query) ||
          category.toLowerCase().includes(query) ||
          (langCode === "AR" ? post.dateAr : langCode === "FR" ? post.dateFr : post.date).toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [searchQuery, activeCategory, langCode]);

  const toggleExpand = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      dir={isAr ? "rtl" : "ltr"}
      className={`${playfair.variable} ${poppins.variable} min-w-0 w-full overflow-x-clip bg-white py-12`}
    >
      <div className="mx-auto min-w-0 max-w-6xl px-4 sm:px-6 md:px-8 lg:px-10">
        {/* Heading — fade up */}
        <div
          ref={headingRef}
          className={[
            "mb-8 text-center transition-all duration-1000 ease-out md:mb-10",
            headingInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
          ].join(" ")}
        >
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-extrabold text-[#2C7046] sm:text-3xl md:text-4xl">
            {t.heading}
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-[#F5B301] sm:w-20" />
          <p className="mx-auto mt-4 max-w-2xl font-[family-name:var(--font-poppins)] text-[13px] font-light leading-relaxed text-[#6B6B6B] sm:text-[14px] md:text-[15px]">
            {t.subheading}
          </p>
        </div>

        {/* Search + Filter — slide animations */}
        <div ref={searchRef} className="mb-8 flex flex-col gap-4 md:mb-10">
          {/* Search input — slide from LEFT (EN) / RIGHT (AR) */}
          <div
            className={[
              "relative mx-auto w-full max-w-xl transition-all duration-1000 ease-out",
              searchInView
                ? "translate-x-0 opacity-100"
                : isAr
                ? "translate-x-24 opacity-0"
                : "-translate-x-24 opacity-0",
            ].join(" ")}
            style={{ transitionDelay: "150ms" }}
          >
            <span
              className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-[#6B6B6B] ${
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
              className={`w-full cursor-text rounded-full border border-[#2C7046]/15 bg-white py-3 font-[family-name:var(--font-poppins)] text-[13.5px] font-light text-[#1A1A1A] placeholder:text-[#6B6B6B]/60 outline-none transition-all duration-300 focus:border-[#F5B301] focus:ring-2 focus:ring-[#F5B301]/30 sm:text-[14px] ${
                isAr ? "pr-11 pl-4" : "pl-11 pr-4"
              }`}
            />
          </div>

          {/* Category pills — slide from RIGHT (EN) / LEFT (AR) */}
          <div
            className={[
              "flex flex-wrap items-center justify-center gap-2 transition-all duration-1000 ease-out",
              searchInView
                ? "translate-x-0 opacity-100"
                : isAr
                ? "-translate-x-24 opacity-0"
                : "translate-x-24 opacity-0",
            ].join(" ")}
            style={{ transitionDelay: "300ms" }}
          >
            <button
              type="button"
              onClick={() => setActiveCategory("all")}
              className={`cursor-pointer rounded-full px-4 py-1.5 font-[family-name:var(--font-poppins)] text-[11.5px] font-semibold transition-all duration-300 sm:text-[12px] ${
                activeCategory === "all"
                  ? "bg-[#2C7046] text-white"
                  : "bg-[#2C7046]/5 text-[#2C7046] hover:bg-[#F5B301]/15 hover:text-[#F5B301]"
              }`}
            >
              {t.allCategories}
            </button>
            {categories.map((cat) => {
              const categoryPost = BLOG_POSTS.find((p) => p.category === cat);
              const catLabel = isAr
                ? categoryPost?.categoryAr || cat
                : langCode === "FR"
                ? categoryPost?.categoryFr || cat
                : cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`cursor-pointer rounded-full px-4 py-1.5 font-[family-name:var(--font-poppins)] text-[11.5px] font-semibold transition-all duration-300 sm:text-[12px] ${
                    activeCategory === cat
                      ? "bg-[#2C7046] text-white"
                      : "bg-[#2C7046]/5 text-[#2C7046] hover:bg-[#F5B301]/15 hover:text-[#F5B301]"
                  }`}
                >
                  {catLabel}
                </button>
              );
            })}
          </div>
        </div>

        {/* Blog cards */}
        {filteredPosts.length > 0 ? (
          <div
            ref={cardsRef}
            className="grid grid-cols-1 items-start gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7"
          >
            {filteredPosts.map((post, index) => {
              const isExpanded = expandedId === post.id;
              const title = langCode === "AR" ? post.titleAr : langCode === "FR" ? post.titleFr : post.title;
              const category = langCode === "AR" ? post.categoryAr : langCode === "FR" ? post.categoryFr : post.category;
              const date = langCode === "AR" ? post.dateAr : langCode === "FR" ? post.dateFr : post.date;
              const excerpt = langCode === "AR" ? post.excerptAr : langCode === "FR" ? post.excerptFr : post.excerpt;
              const fullDesc = langCode === "AR" ? post.fullDescAr : langCode === "FR" ? post.fullDescFr : post.fullDesc;

              return (
                <article
                  key={post.id}
                  style={{ transitionDelay: `${index * 120}ms` }}
                  className={[
                    "group/card cursor-pointer overflow-hidden rounded-3xl border border-[#2C7046]/10 bg-white shadow-sm",
                    "transition-all duration-700 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:border-[#F5B301]/50 hover:shadow-xl hover:shadow-[#2C7046]/15",
                    cardsInView
                      ? "translate-y-0 opacity-100"
                      : "translate-y-16 opacity-0",
                  ].join(" ")}
                >
                  {/* Image — fixed height, NEVER grows */}
                  <div className="relative h-[200px] w-full shrink-0 overflow-hidden sm:h-[220px]">
                    <Image
                      src={post.image}
                      alt={title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover/card:scale-110"
                    />
                    <span className="absolute top-4 rounded-full bg-[#F5B301] px-3 py-1 font-[family-name:var(--font-poppins)] text-[10.5px] font-bold uppercase tracking-wide text-[#2C7046] shadow-md ltr:left-4 rtl:right-4">
                      {category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col p-5 sm:p-6">
                    {/* Date */}
                    <div className="mb-2.5 flex items-center gap-2 font-[family-name:var(--font-poppins)] text-[11.5px] font-light text-[#6B6B6B] sm:text-[12px]">
                      <CalendarIcon />
                      {date}
                    </div>

                    {/* Title */}
                    <h3
                      className={[
                        "font-[family-name:var(--font-playfair)] font-extrabold leading-snug text-[#2C7046] transition-colors duration-300 group-hover/card:text-[#F5B301]",
                        isExpanded
                          ? "text-[15px] sm:text-[16.5px]"
                          : "text-[15px] sm:text-[16.5px] line-clamp-2",
                      ].join(" ")}
                    >
                      {title}
                    </h3>

                    {/* Gold divider */}
                    <div
                      className={`my-3 h-[2px] w-10 rounded-full bg-[#F5B301] transition-all duration-500 ${
                        isExpanded ? "w-16" : "group-hover/card:w-14"
                      } ${isAr ? "ml-auto mr-0" : "ml-0 mr-auto"}`}
                    />

                    {/* Excerpt (collapsed) */}
                    {!isExpanded && (
                      <p className="line-clamp-2 font-[family-name:var(--font-poppins)] text-[12.5px] font-light leading-relaxed text-[#6B6B6B] sm:text-[13px]">
                        {excerpt}
                      </p>
                    )}

                    {/* Full description (expanded) — smooth fade-in */}
                    {isExpanded && (
                      <div className="animate-[fadeIn_0.5s_ease-out]">
                        <p className="font-[family-name:var(--font-poppins)] text-[12.5px] font-light leading-relaxed text-[#6B6B6B] sm:text-[13px]">
                          {fullDesc}
                        </p>
                      </div>
                    )}

                    {/* Read More / Show Less */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpand(post.id);
                      }}
                      className={[
                        "mt-4 inline-flex cursor-pointer items-center gap-1.5 font-[family-name:var(--font-poppins)] text-[12px] font-semibold text-[#2C7046] transition-colors duration-300 hover:text-[#F5B301] sm:text-[12.5px]",
                        isAr ? "self-end flex-row-reverse" : "self-start",
                      ].join(" ")}
                    >
                      {isExpanded ? t.showLess : t.readMore}
                      <span
                        className={`transition-transform duration-300 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      >
                        →
                      </span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-3xl border border-[#2C7046]/10 bg-[#F5F7FA] py-16 text-center">
            <p className="font-[family-name:var(--font-poppins)] text-[14px] font-light text-[#6B6B6B] sm:text-[15px]">
              {t.noResults}
            </p>
          </div>
        )}
      </div>

      {/* fadeIn keyframe */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}