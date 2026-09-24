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

// Same subtle background photo used behind the "Who We Are" section
// (Haris Illahi / Unsplash — free to use, no attribution required).
const BG_IMAGE =
  "https://images.unsplash.com/photo-1759272840712-c7e5ea852367?fm=jpg&q=80&w=2400&auto=format&fit=crop";

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

// Split into two rows for the top/bottom opposite-direction scroll effect
const TOP_ROW = PARTNER_IMAGES.filter((_, i) => i % 2 === 0);
const BOTTOM_ROW = PARTNER_IMAGES.filter((_, i) => i % 2 !== 0);

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
    heading: "Nos partenaires",
    paragraph:
      "Nous collaborons fièrement avec des partenaires de confiance qui soutiennent notre mission et nous aident à offrir des solutions de qualité.",
  },
} as const;

function readStoredLang(): LangCode {
  if (typeof window === "undefined") return "EN";
  const storedLang = window.localStorage.getItem(LANG_KEY);
  return storedLang === "AR" || storedLang === "FR" ? storedLang : "EN";
}

/** Same scroll-linked seamless-loop hook used by the News (ScrollParallaxGallery) section. */
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

  // Two scroll-linked rows, moving in opposite directions — same as the News section
  const topRowRef = useSeamlessScrollRow("left", 0.45);
  const bottomRowRef = useSeamlessScrollRow("right", 0.45);
  const topLogos = Array.from({ length: 8 }, () => TOP_ROW).flat();
  const bottomLogos = Array.from({ length: 8 }, () => BOTTOM_ROW).flat();

  return (
    <section
      ref={sectionRef}
      dir={isAr ? "rtl" : "ltr"}
      className={`${playfair.variable} ${poppins.variable} relative min-w-0 w-full overflow-x-clip bg-white py-10  -mt-12`}
    >
      {/* Subtle decorative background image — same as WhoWeAreSection */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        <Image src={BG_IMAGE} alt="" fill className="object-cover opacity-[0.07]" aria-hidden="true" />
      </div>

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
          className="font-[family-name:var(--font-playfair)] text-2xl font-extrabold text-[#2C7046] sm:text-4xl"
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

      {/* Scroll-linked partner rows — always LTR so direction never flips in Arabic */}
      <div dir="ltr" className="relative z-[1] mt-10 min-w-0 overflow-x-clip">
        <div ref={topRowRef} className="flex w-max gap-8 will-change-transform">
          {topLogos.map((src, idx) => (
            <div
              key={`top-${idx}`}
              aria-hidden={idx >= TOP_ROW.length}
              className="flex h-24 w-44 shrink-0 items-center justify-center rounded-[18px] border border-[#2C7046]/10 bg-white/80 px-5 py-4 shadow-sm shadow-[#2C7046]/5 transition-all duration-300 hover:border-[#F5B301]/60 hover:shadow-md hover:shadow-[#F5B301]/15"
            >
              <Image
                src={src}
                alt={idx < TOP_ROW.length ? `Partner ${idx + 1}` : ""}
                width={180}
                height={82}
                className="h-[72px] w-auto max-w-full cursor-pointer object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      <div dir="ltr" className="relative z-[1] mt-5 min-w-0 overflow-x-clip md:mt-6">
        <div ref={bottomRowRef} className="flex w-max gap-8 will-change-transform">
          {bottomLogos.map((src, idx) => (
            <div
              key={`bottom-${idx}`}
              aria-hidden={idx >= BOTTOM_ROW.length}
              className="flex h-24 w-44 shrink-0 items-center justify-center rounded-[18px] border border-[#2C7046]/10 bg-white/80 px-5 py-4 shadow-sm shadow-[#2C7046]/5 transition-all duration-300 hover:border-[#F5B301]/60 hover:shadow-md hover:shadow-[#F5B301]/15"
            >
              <Image
                src={src}
                alt={idx < BOTTOM_ROW.length ? `Partner ${idx + 1}` : ""}
                width={180}
                height={82}
                className="h-[72px] w-auto max-w-full cursor-pointer object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}