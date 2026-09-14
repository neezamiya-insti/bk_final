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
type LangCode = "EN" | "AR";

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
      "Let us amplify your success, turn your dreams into global victories! Join us, and let's make your growth unstoppable!",
    cards: [
      {
        title: "Dominate, Don't Dream!",
        desc: "Stop dreaming of global markets and start conquering them! We propel you onto the world stage.",
      },
      {
        title: "Export Effortlessly!",
        desc: "Don't let trade complexities hold you back! We simplify your export journey. We provide tailored solutions.",
      },
      {
        title: "Build Your Legacy!",
        desc: "We empower you to not just enter markets, but to thrive. Let's build your success, together, for generations to come!",
      },
    ],
  },
  AR: {
    badge: "أطلق إمكاناتك العالمية",
    heading: "أطلق إمكاناتك",
    headingAccent: "العالمية!",
    paragraph:
      "دعنا نضاعف نجاحك ونحوّل أحلامك إلى انتصارات عالمية! انضم إلينا، ولنجعل نموك لا يتوقف!",
    cards: [
      {
        title: "سيطر، لا تحلم فقط!",
        desc: "توقف عن الحلم بالأسواق العالمية وابدأ في غزوها! نحن ندفعك إلى المسرح العالمي.",
      },
      {
        title: "صدّر بسهولة!",
        desc: "لا تدع تعقيدات التجارة تعيقك! نبسّط رحلة التصدير الخاصة بك. نقدم حلولاً مخصصة.",
      },
      {
        title: "ابنِ إرثك!",
        desc: "نمكنك ليس فقط من دخول الأسواق، بل من الازدهار فيها. لنبنِ نجاحك معًا، للأجيال القادمة!",
      },
    ],
  },
} as const;

function readStoredLang(): LangCode {
  if (typeof window === "undefined") return "EN";
  return window.localStorage.getItem(LANG_KEY) === "AR" ? "AR" : "EN";
}

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const walkInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function GlobalPotentialSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [langCode, setLangCode] = useState<LangCode>(() => readStoredLang());

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

  return (
    <section
      ref={sectionRef}
      dir={isAr ? "rtl" : "ltr"}
      className={`${playfair.variable} ${poppins.variable} relative w-full overflow-hidden bg-white`}
    >
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          <clipPath id="pinShapeGlobal" clipPathUnits="objectBoundingBox">
            <path d="M0.5,1 C0.2308,0.8235 -0.0192,0.6176 0.0577,0.4412 C0.0962,0.3088 0.25,0.1912 0.5,0.1912 C0.75,0.1912 0.9038,0.3088 0.9423,0.4412 C1.0192,0.6176 0.7692,0.8235 0.5,1 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-16 lg:py-20">
        {/* Heading — Top Center */}
        <motion.div
          className="mb-5 text-center lg:mb-7"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          <motion.div
            variants={fadeInUp}
            className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#13233F]/10 px-4 py-1.5 font-[family-name:var(--font-poppins)] text-[12px] font-semibold text-[#13233F] shadow-sm"
          >
            <svg
              className="h-3.5 w-3.5"
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

          <motion.h1
            variants={fadeInUp}
            className="font-[family-name:var(--font-playfair)] text-3xl font-extrabold leading-[1.1] text-[#13233F] sm:text-3xl"
          >
            {t.heading}
            <br />
            <span className="text-[#F5B301]">{t.headingAccent}</span>
          </motion.h1>

          <motion.div
            variants={fadeInUp}
            className="mt-3 flex items-center justify-center gap-1.5"
          >
            <div className="h-1 w-[34px] rounded-full bg-[#F5B301]" />
            <div className="h-[4px] w-[4px] rounded-full bg-[#F5B301] opacity-55" />
            <div className="h-[4px] w-[4px] rounded-full bg-[#F5B301] opacity-30" />
          </motion.div>

          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-4 max-w-2xl font-[family-name:var(--font-poppins)] text-[13.5px] font-light leading-relaxed text-[#5C5C5C] sm:text-[14px] md:text-[15px]"
          >
            {t.paragraph}
          </motion.p>
        </motion.div>

        {/* Cards — Location Pin Shape */}
        <motion.div
          className="relative flex flex-wrap items-center justify-center gap-7 pt-2 lg:gap-10 lg:pt-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          {t.cards.map((card, index) => (
            <motion.div
              key={card.title}
              variants={walkInRight}
              whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
              className="global-card group/card relative flex h-[360px] w-[300px] cursor-pointer flex-col items-center justify-start bg-[#13233F] text-center shadow-[0_18px_40px_rgba(19,35,63,0.18)] transition-all duration-300"
              style={{
                clipPath: "url(#pinShapeGlobal)",
                WebkitClipPath: "url(#pinShapeGlobal)",
                boxShadow:
                  "0 18px 40px rgba(19,35,63,0.18), 0 8px 20px rgba(19,35,63,0.08)",
                padding: "75px 28px 40px",
              }}
            >
              {/* Number Watermark */}
              <div className="absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 font-[family-name:var(--font-playfair)] text-[80px] font-black leading-none text-white opacity-[0.05]">
                {String(index + 1).padStart(2, "0")}
              </div>

              {/* Image */}
              <div className="relative z-10 mb-4 h-14 w-14 shrink-0 overflow-hidden rounded-full bg-white/10 p-2 sm:h-16 sm:w-16">
                <div className="relative h-full w-full">
                  <Image
                    src={GLOBAL_IMAGES[index]}
                    alt={card.title}
                    fill
                    sizes="64px"
                    className="object-contain transition-transform duration-500 ease-out group-hover/card:scale-110"
                  />
                </div>
              </div>

              {/* Title */}
              <div className="relative z-10 mb-1.5 max-w-[220px] font-[family-name:var(--font-playfair)] text-[15px] font-extrabold leading-tight text-white sm:text-[16px]">
                {card.title}
              </div>

              {/* Gold divider */}
              <div className="relative z-10 mb-2 h-[3px] w-10 rounded-full bg-[#F5B301]" />

              {/* Description */}
              <div className="relative z-10 max-w-[230px] font-[family-name:var(--font-poppins)] text-[11.5px] font-light leading-[1.7] text-white/75 sm:text-[12px]">
                {card.desc}
              </div>

              {/* Pin tip at bottom */}
              <div
                className="absolute bottom-0 left-1/2 h-0 w-0 -translate-x-1/2 translate-y-[1px]"
                style={{
                  borderLeft: "10px solid transparent",
                  borderRight: "10px solid transparent",
                  borderTop: "18px solid #13233F",
                  filter: "drop-shadow(0 4px 8px rgba(19,35,63,0.15))",
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Mobile responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .global-card {
            width: 270px !important;
            height: 330px !important;
            padding: 65px 22px 35px !important;
          }
        }
        @media (max-width: 480px) {
          .global-card {
            width: 240px !important;
            height: 310px !important;
            padding: 60px 18px 30px !important;
          }
        }
      `}</style>
    </section>
  );
}