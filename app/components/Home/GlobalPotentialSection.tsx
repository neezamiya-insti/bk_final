"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, Variants } from "framer-motion";
import Image from "next/image";
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

const GLOBAL_IMAGES = [
  "/global/glob1.png",
  "/global/glob2.png",
  "/global/glob3.png",
];

const TEXT = {
  EN: {
    badge: "Unlock Your Global Potential",
    heading: "Unlock Your Global",
    headingAccent: "Potential!",
    paragraph:
      "Turn your dreams into global victories. Join us and make your growth unstoppable.",
    bullets: [
      "End-to-end export documentation & compliance",
      "Verified buyer matching across 3 continents",
      "Logistics & shipping arranged on your behalf",
      "Dedicated account manager for every order",
    ],
    edgeTag: "EDGE",
    edgeTitle: "Proprietary trade network",
    edgeDescStrong: "Direct buyer access",
    edgeDesc: " in 40+ markets — closing deals at unmatched speed.",
    panelLabel: "THE GLOBAL GROWTH LADDER",
    panelSub: "From first export to global brand.",
    cards: [
      {
        stat: "01",
        title: "Dominate, Don't Dream!",
        desc: "Stop dreaming of global markets — start conquering them.",
      },
      {
        stat: "02",
        title: "Export Effortlessly!",
        desc: "We simplify your export journey with tailored solutions.",
      },
      {
        stat: "03",
        title: "Build Your Legacy!",
        desc: "Not just enter markets — thrive for generations.",
      },
    ],
  },
  AR: {
    badge: "أطلق إمكاناتك العالمية",
    heading: "أطلق إمكاناتك",
    headingAccent: "العالمية!",
    paragraph:
      "حوّل أحلامك إلى انتصارات عالمية. انضم إلينا واجعل نموك لا يتوقف.",
    bullets: [
      "إدارة كاملة لمستندات التصدير والامتثال",
      "ربطك بمشترين موثوقين في ٣ قارات",
      "ترتيب اللوجستيات والشحن نيابةً عنك",
      "مدير حساب مخصص لكل طلب",
    ],
    edgeTag: "تميّز",
    edgeTitle: "شبكة تجارية خاصة بنا",
    edgeDescStrong: "وصول مباشر للمشترين",
    edgeDesc: " في أكثر من 40 سوقًا — بسرعة لا تُضاهى.",
    panelLabel: "سلّم النمو العالمي",
    panelSub: "من أول تصدير إلى علامة عالمية.",
    cards: [
      {
        stat: "٠١",
        title: "سيطر، لا تحلم فقط!",
        desc: "توقف عن الحلم — ابدأ بغزو الأسواق العالمية.",
      },
      {
        stat: "٠٢",
        title: "صدّر بسهولة!",
        desc: "نبسّط رحلة التصدير بحلول مخصصة.",
      },
      {
        stat: "٠٣",
        title: "ابنِ إرثك!",
        desc: "لا تدخل الأسواق فقط — بل ازدهر فيها.",
      },
    ],
  },
  FR: {
    badge: "Libérez votre potentiel mondial",
    heading: "Libérez votre potentiel",
    headingAccent: "mondial !",
    paragraph:
      "Transformez vos rêves en victoires mondiales. Rejoignez-nous et rendez votre croissance imparable.",
    bullets: [
      "Gestion complète des documents d'exportation",
      "Acheteurs vérifiés sur 3 continents",
      "Logistique et expédition organisées pour vous",
      "Gestionnaire de compte dédié",
    ],
    edgeTag: "ATOUT",
    edgeTitle: "Réseau commercial exclusif",
    edgeDescStrong: "Accès direct aux acheteurs",
    edgeDesc: " dans plus de 40 marchés — à une vitesse inégalée.",
    panelLabel: "L'ÉCHELLE DE CROISSANCE MONDIALE",
    panelSub: "Du premier export à une marque mondiale.",
    cards: [
      {
        stat: "01",
        title: "Dominez, ne rêvez pas !",
        desc: "Arrêtez de rêver — commencez à conquérir.",
      },
      {
        stat: "02",
        title: "Exportez sans effort !",
        desc: "Nous simplifions votre parcours avec des solutions sur mesure.",
      },
      {
        stat: "03",
        title: "Bâtissez votre héritage !",
        desc: "Pas seulement entrer — prospérer pour les générations.",
      },
    ],
  },
} as const;

function readStoredLang(): LangCode {
  if (typeof window === "undefined") return "EN";
  const saved = window.localStorage.getItem(LANG_KEY);
  if (saved === "AR" || saved === "EN" || saved === "FR") return saved;
  return "EN";
}

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 90, damping: 16 },
  },
};

/* pyramid widths — narrow on top, widest at bottom */
const PYRAMID_WIDTH = ["58%", "70%", "82%"];

export default function GlobalPotentialSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
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

  return (
    <section
      ref={sectionRef}
      dir={isAr ? "rtl" : "ltr"}
      className={`${playfair.variable} ${poppins.variable} relative w-full overflow-hidden bg-white`}
    >
      <div className="mx-auto w-full max-w-7xl px-4 pt-16 pb-12 sm:px-5 sm:pb-14 lg:pb-20">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* ================= LEFT COLUMN ================= */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className={isAr ? "text-right" : "text-left"}
          >
            <motion.div
              variants={fadeInUp}
              className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#13233F]/10 px-3 py-1.5 font-[family-name:var(--font-poppins)] text-[10px] font-semibold text-[#13233F] shadow-sm sm:px-4 sm:text-[11.5px]"
            >
              <svg
                className="h-3 w-3 sm:h-3.5 sm:w-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18" />
                <path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18z" />
              </svg>
              {t.badge}
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              className="font-[family-name:var(--font-playfair)] text-[20px] font-extrabold leading-[1.2] text-[#13233F] sm:text-[24px] md:text-[28px] lg:text-4xl"
            >
              {t.heading}{" "}
              <span className="text-[#F5B301]">{t.headingAccent}</span>
            </motion.h2>

            <motion.div
              variants={fadeInUp}
              className={`mt-3.5 flex items-center gap-1.5 ${
                isAr ? "justify-end" : "justify-start"
              }`}
            >
              <div className="h-1 w-[34px] rounded-full bg-[#F5B301]" />
              <div className="h-[4px] w-[4px] rounded-full bg-[#F5B301] opacity-55" />
              <div className="h-[4px] w-[4px] rounded-full bg-[#F5B301] opacity-30" />
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="mt-4 max-w-xl font-[family-name:var(--font-poppins)] text-[12px] font-light leading-[1.8] text-[#5C5C5C] sm:text-[13px] md:text-[13.5px] lg:text-[14px]"
            >
              {t.paragraph}
            </motion.p>

            {/* Checklist */}
            <motion.ul
              variants={staggerContainer}
              className="mt-6 space-y-2.5 sm:mt-7 sm:space-y-3"
            >
              {t.bullets.map((b) => (
                <motion.li
                  key={b}
                  variants={fadeInUp}
                  className="flex items-start gap-2.5 sm:gap-3"
                >
                  <span className="mt-[2px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F5B301]/15 text-[#F5B301] sm:h-[22px] sm:w-[22px]">
                    <svg
                      className="h-2.5 w-2.5 sm:h-3 sm:w-3"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={3.2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 12.5l5 5L20 6.5" />
                    </svg>
                  </span>
                  <span className="font-[family-name:var(--font-poppins)] text-[11.5px] font-light leading-[1.7] text-[#3F4A5C] sm:text-[12.5px] md:text-[13px] lg:text-[13.5px]">
                    {b}
                  </span>
                </motion.li>
              ))}
            </motion.ul>

            {/* EDGE CARD */}
            <motion.div
              variants={fadeInUp}
              className="mt-5 flex max-w-md items-start gap-2.5 rounded-xl bg-[#13233F] px-3.5 py-3 shadow-[0_14px_30px_rgba(19,35,63,0.22)] sm:mt-6 sm:max-w-lg sm:gap-3 sm:rounded-2xl sm:px-4 sm:py-3.5"
            >
              <span className="mt-[2px] inline-flex shrink-0 items-center gap-1 rounded-md bg-[#F5B301] px-1.5 py-0.5 font-[family-name:var(--font-poppins)] text-[8.5px] font-bold tracking-wide text-[#13233F] sm:px-2 sm:py-0.5 sm:text-[9.5px]">
                ★ {t.edgeTag}
              </span>
              <div>
                <div className="font-[family-name:var(--font-playfair)] text-[12px] font-extrabold text-white sm:text-[13px] md:text-[13.5px]">
                  {t.edgeTitle}
                </div>
                <p className="mt-0.5 font-[family-name:var(--font-poppins)] text-[9.5px] font-light leading-[1.6] text-white/75 sm:mt-1 sm:text-[10px] md:text-[10.5px]">
                  <span className="font-semibold text-[#F5B301]">
                    {t.edgeDescStrong}
                  </span>
                  {t.edgeDesc}
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* ================= RIGHT COLUMN — PYRAMID ================= */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="relative rounded-[22px] border border-[#13233F]/8 bg-gradient-to-b from-[#F7F9FC] to-white p-4 shadow-[0_24px_60px_rgba(19,35,63,0.10)] sm:rounded-[24px] sm:p-5 md:p-6"
          >
            <motion.div variants={fadeInUp} className="text-center">
              <div className="font-[family-name:var(--font-poppins)] text-[10px] font-semibold tracking-[0.18em] text-[#13233F]/45 sm:text-[10.5px]">
                {t.panelLabel}
              </div>
              <p className="mx-auto mt-1.5 max-w-sm font-[family-name:var(--font-poppins)] text-[11px] font-light leading-relaxed text-[#5C5C5C] sm:text-[11.5px]">
                {t.panelSub}
              </p>
            </motion.div>

            {/* Pyramid cards — width % works on ALL screens now */}
            <div className="mt-5 flex flex-col items-center gap-2.5 sm:mt-6 sm:gap-3">
              {t.cards.map((card, index) => (
                <motion.div
                  key={card.title}
                  variants={slideInRight}
                  whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                  style={{ width: PYRAMID_WIDTH[index] }}
                  className="global-pyramid-card group/card relative overflow-hidden rounded-xl bg-gradient-to-br from-[#13233F] to-[#1E3763] px-3.5 py-3 text-center shadow-[0_10px_26px_rgba(19,35,63,0.18)] sm:rounded-2xl sm:px-4 sm:py-3.5"
                >
                  {/* watermark number */}
                  <div className="pointer-events-none absolute inset-y-0 left-2.5 flex items-center font-[family-name:var(--font-playfair)] text-[38px] font-black leading-none text-white opacity-[0.05] sm:left-3 sm:text-[46px]">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="relative z-10 flex items-center justify-center gap-2 sm:gap-2.5">
                    <div className="relative h-6 w-6 shrink-0 overflow-hidden rounded-full bg-white/10 p-1 sm:h-7 sm:w-7">
                      <div className="relative h-full w-full">
                        <Image
                          src={GLOBAL_IMAGES[index]}
                          alt={card.title}
                          fill
                          sizes="28px"
                          className="object-contain transition-transform duration-500 ease-out group-hover/card:scale-110"
                        />
                      </div>
                    </div>
                    <div className="font-[family-name:var(--font-playfair)] text-[12.5px] font-extrabold leading-tight text-[#F5B301] sm:text-[13.5px] md:text-[14.5px] lg:text-[15.5px]">
                      {card.title}
                    </div>
                  </div>

                  <div className="relative z-10 mx-auto mt-1.5 h-[2px] w-7 rounded-full bg-[#F5B301]/70 sm:mt-2 sm:w-8" />

                  <p className="relative z-10 mx-auto mt-1.5 max-w-[280px] font-[family-name:var(--font-poppins)] text-[9.5px] font-light leading-[1.6] text-white/75 sm:mt-2 sm:text-[10px] md:text-[10.5px]">
                    {card.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Removed the mobile-only override — pyramid % widths now apply on all screens */}
    </section>
  );
}