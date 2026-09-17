"use client";

import { useRef, useEffect, useState } from "react";
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
  weight: ["300", "400", "500", "600"],
  variable: "--font-poppins",
});

const LANG_KEY = "bk-lang";
type LangCode = "EN" | "AR" | "FR";

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
    transition: { staggerChildren: 0.12 },
  },
};

const PARTNER_IMAGES = [
  "/partner/part1.png",
  "/partner/part2.png",
  "/partner/part3.png",
  "/partner/part4.png",
  "/partner/part5.png",
  "/partner/part6.png",
  "/partner/part7.png",
];

const TEXT = {
  EN: {
    heading: "Our Partners",
    paragraph:
      "Proudly working alongside trusted partners who support our mission and help us deliver quality education.",
  },
  AR: {
    heading: "شركاؤنا",
    paragraph:
      "نعمل بفخر جنبًا إلى جنب مع شركاء موثوقين يدعمون مهمتنا ويساعدوننا في تقديم تعليم عالي الجودة.",
  },
  FR: {
    heading: "Nos Partenaires",
    paragraph:
      "Nous travaillons fièrement aux côtés de partenaires de confiance qui soutiennent notre mission et nous aident à offrir une éducation de qualité.",
  },
} as const;

function readStoredLang(): LangCode {
  if (typeof window === "undefined") return "EN";
  const saved = window.localStorage.getItem(LANG_KEY);
  if (saved === "AR" || saved === "EN" || saved === "FR") return saved;
  return "EN";
}

export default function Partners() {
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

  // ✅ Inject marquee keyframes on client only (avoids hydration mismatch)
  useEffect(() => {
    const style = document.createElement("style");
    style.id = "partners-styles";
    style.textContent = `
      @keyframes marqueeScrollPartners {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      .marquee-track-partners {
        animation: marqueeScrollPartners 26s linear infinite;
        direction: ltr;
      }
      .marquee-track-partners:hover {
        animation-play-state: paused;
      }
      @media (prefers-reduced-motion: reduce) {
        .marquee-track-partners { animation: none; }
      }
    `;
    document.head.appendChild(style);
    return () => {
      const el = document.getElementById("partners-styles");
      if (el) el.remove();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      dir={isAr ? "rtl" : "ltr"}
      className={`${playfair.variable} ${poppins.variable} relative w-full overflow-hidden bg-white py-10`}
    >
      {/* Heading with Description */}
      <motion.div
        className="relative z-[1] mx-auto max-w-3xl px-5 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
      >
        <motion.h2
          variants={fadeInUp}
          className="font-[family-name:var(--font-playfair)] text-2xl font-extrabold text-[#13233F] sm:text-4xl"
        >
          {t.heading}
        </motion.h2>

        {/* Gold accent bar */}
        <motion.span
          variants={fadeInUp}
          className="mx-auto mt-3 block h-1 w-16 rounded-full bg-[#F5B301] sm:mt-4 sm:w-20"
        />

        <motion.p
          variants={fadeInUp}
          className="mt-4 font-[family-name:var(--font-poppins)] text-[13.5px] font-light leading-relaxed text-[#5C5C5C] sm:text-[14px] md:text-[15px]"
        >
          {t.paragraph}
        </motion.p>
      </motion.div>

      {/* Diagonal ribbon slider — always LTR so direction never flips in Arabic */}
      <div
        dir="ltr"
        className="relative -ml-[20vw] mt-10 w-[140vw] max-w-none -rotate-3"
      >
        <div className="overflow-hidden py-4">
          <div className="marquee-track-partners flex w-max whitespace-nowrap">
            {[0, 1].map((rep) => (
              <div
                key={rep}
                className="flex items-center gap-12 px-8"
                aria-hidden={rep === 1}
              >
                {PARTNER_IMAGES.map((src, idx) => (
                  <div
                    key={`${rep}-${idx}`}
                    className="flex h-24 w-44 shrink-0 items-center justify-center rounded-[18px] border border-[#13233F]/10 bg-white/70 px-5 py-4 shadow-sm shadow-[#13233F]/5"
                  >
                    <Image
                      src={src}
                      alt={`Partner ${idx + 1}`}
                      width={180}
                      height={82}
                      className="h-[72px] w-auto max-w-full cursor-pointer object-contain"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}