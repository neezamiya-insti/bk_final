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

const IMG = {
  chairman: "/management/Chairman.png",
  ceo: "/management/CEO.png",
  cco: "/management/CCO.png",
};

const TEXT = {
  EN: {
    badge: "Management Board",
    heading: "The Minds Behind",
    headingAccent: "Our Success!",
    paragraph:
      "A leadership team driven by vision, experience and an unwavering commitment to taking our partners global.",
    levelTop: "Board Level",
    levelExec: "Executive Level",
    chairman: { name: "Maher Al-Buwaidi", role: "Chairman", img: IMG.chairman },
    execs: [
      {
        name: "Abdullah Al-Buwaidi",
        role: "Chief Executive Officer (CEO)",
        img: IMG.ceo,
      },
      {
        name: "Bassam Al-Zubaidi",
        role: "Chief Commercial Officer",
        img: IMG.cco,
      },
    ],
  },
  AR: {
    badge: "مجلس الإدارة",
    heading: "العقول وراء",
    headingAccent: "نجاحنا!",
    paragraph:
      "فريق قيادي تقوده الرؤية والخبرة والالتزام الراسخ بأخذ شركائنا إلى العالمية.",
    levelTop: "مستوى المجلس",
    levelExec: "المستوى التنفيذي",
    chairman: {
      name: "ماهر البويضي",
      role: "رئيس مجلس الإدارة",
      img: IMG.chairman,
    },
    execs: [
      { name: "عبدالله البويضي", role: "الرئيس التنفيذي", img: IMG.ceo },
      { name: "بسام الزبيدي", role: "الرئيس التجاري", img: IMG.cco },
    ],
  },
  FR: {
    badge: "Conseil de direction",
    heading: "Les esprits derrière",
    headingAccent: "notre succès !",
    paragraph:
      "Une équipe de direction animée par la vision, l'expérience et un engagement indéfectible à faire rayonner nos partenaires à l'international.",
    levelTop: "Niveau du conseil",
    levelExec: "Niveau exécutif",
    chairman: { name: "Maher Al-Buwaidi", role: "Président", img: IMG.chairman },
    execs: [
      {
        name: "Abdullah Al-Buwaidi",
        role: "Directeur Général (PDG)",
        img: IMG.ceo,
      },
      {
        name: "Bassam Al-Zubaidi",
        role: "Directeur Commercial",
        img: IMG.cco,
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
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const cardIn: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 95, damping: 16 },
  },
};

const lineGrow: Variants = {
  hidden: { scaleY: 0 },
  visible: { scaleY: 1, transition: { duration: 0.45, ease: "easeOut" } },
};

const lineGrowX: Variants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.55, ease: "easeOut" } },
};

type Member = { name: string; role: string; img: string };

function MemberCard({
  member,
  featured = false,
  isAr,
}: {
  member: Member;
  featured?: boolean;
  isAr: boolean;
}) {
  return (
    <motion.div
      variants={cardIn}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      className={`group/card relative w-full cursor-pointer overflow-hidden rounded-[24px] bg-white shadow-[0_18px_40px_rgba(44,112,70,0.14)] transition-all duration-300 hover:shadow-[0_24px_50px_rgba(44,112,70,0.22)] ${
        featured
          ? "max-w-[300px] ring-2 ring-[#F5B301]/70"
          : "max-w-[280px] ring-1 ring-[#2C7046]/8"
      }`}
    >
      {/* Photo */}
      <div
        className={`relative w-full overflow-hidden bg-[#F2F7F4] ${
          featured ? "h-[280px]" : "h-[250px]"
        }`}
      >
        <Image
          src={member.img}
          alt={member.name}
          fill
          sizes="(max-width: 640px) 100vw, 320px"
          className="cursor-pointer object-cover object-top transition-transform duration-700 ease-out group-hover/card:scale-110"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#2C7046]/30 to-transparent" />
      </div>

      {/* Name bar */}
      <div
        className={`relative bg-[#2C7046] px-5 py-4 ${
          isAr ? "text-right" : "text-left"
        }`}
      >
        <div
          className={`absolute top-0 h-[3px] w-12 bg-[#F5B301] transition-all duration-500 group-hover/card:w-24 ${
            isAr ? "right-5" : "left-5"
          }`}
        />
        <div
          className={`font-[family-name:var(--font-playfair)] font-extrabold leading-tight text-white ${
            featured ? "text-[16px] sm:text-[17px]" : "text-[15px] sm:text-[16px]"
          }`}
        >
          {member.name}
        </div>
        <div className="mt-1 font-[family-name:var(--font-poppins)] text-[11.5px] font-light leading-relaxed text-[#F5B301] sm:text-[12px]">
          {member.role}
        </div>
      </div>
    </motion.div>
  );
}

function LevelTag({ label }: { label: string }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="inline-flex items-center gap-2 rounded-full border border-[#2C7046]/10 bg-[#F4FAF7] px-3 py-1 font-[family-name:var(--font-poppins)] text-[10px] font-semibold tracking-[0.16em] text-[#2C7046]/70 sm:px-3.5 sm:text-[10.5px]"
    >
      <span className="h-[5px] w-[5px] rounded-full bg-[#F5B301]" />
      {label}
    </motion.div>
  );
}

export default function ManagementHierarchySection() {
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
      className={`${playfair.variable} ${poppins.variable} relative w-full overflow-hidden bg-white `}
    >
      {/* soft background grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(44,112,70,0.08) 1px, transparent 0)",
          backgroundSize: "26px 26px",
          maskImage:
            "radial-gradient(ellipse at 50% 40%, black 40%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 40%, black 40%, transparent 78%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-12 sm:px-5 sm:py-16">
        {/* Heading */}
        <motion.div
          className="mb-10 text-center"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.div
            variants={fadeInUp}
            className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#2C7046]/10 px-3 py-1.5 font-[family-name:var(--font-poppins)] text-[10.5px] font-semibold text-[#2C7046] shadow-sm sm:px-4 sm:text-[12px]"
          >
            <svg
              className="h-3 w-3 sm:h-3.5 sm:w-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="9" y="2" width="6" height="5" rx="1" />
              <rect x="2" y="17" width="6" height="5" rx="1" />
              <rect x="16" y="17" width="6" height="5" rx="1" />
              <path d="M12 7v5M5 17v-3h14v3" />
            </svg>
            {t.badge}
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="font-[family-name:var(--font-playfair)] text-[22px] font-extrabold leading-[1.15] text-[#2C7046] sm:text-[28px] md:text-[32px] lg:text-4xl"
          >
            {t.heading}{" "}
            <span className="text-[#F5B301]">{t.headingAccent}</span>
          </motion.h2>

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
            className="mx-auto mt-4 max-w-2xl font-[family-name:var(--font-poppins)] text-[12.5px] font-light leading-relaxed text-[#5C5C5C] sm:text-[13.5px] md:text-[14px] lg:text-[14.5px]"
          >
            {t.paragraph}
          </motion.p>
        </motion.div>

        {/* ================= HIERARCHY ================= */}
        <motion.div
          className="flex flex-col items-center"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {/* Level 1 — Chairman */}
          <div className="mb-3 flex justify-center">
            <LevelTag label={t.levelTop} />
          </div>

          <div className="flex w-full justify-center">
            <MemberCard member={t.chairman} featured isAr={isAr} />
          </div>

          {/* Connector: vertical stem */}
          <motion.div
            variants={lineGrow}
            style={{ transformOrigin: "top" }}
            className="h-10 w-[2px] bg-gradient-to-b from-[#F5B301] to-[#2C7046]/25"
          />

          {/* Connector: horizontal bus (SM and up) */}
          <div className="relative hidden w-full max-w-[680px] sm:block">
            <motion.div
              variants={lineGrowX}
              className="mx-auto h-[2px] w-1/2 bg-[#2C7046]/25"
            />
            {/* node dot in the middle */}
            <div className="absolute left-1/2 top-1/2 h-[9px] w-[9px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[#F5B301] shadow-[0_0_0_2px_rgba(245,179,1,0.3)]" />
            {/* drops down to each child */}
            <motion.div
              variants={lineGrow}
              style={{ transformOrigin: "top" }}
              className="absolute left-1/4 top-0 h-10 w-[2px] bg-[#2C7046]/25"
            />
            <motion.div
              variants={lineGrow}
              style={{ transformOrigin: "top" }}
              className="absolute left-3/4 top-0 h-10 w-[2px] bg-[#2C7046]/25"
            />
          </div>

          {/* spacer for the drop lines on SM+ */}
          <div className="hidden h-10 sm:block" />

          {/* mobile stem — smaller */}
          <motion.div
            variants={lineGrow}
            style={{ transformOrigin: "top" }}
            className="h-6 w-[2px] bg-[#2C7046]/25 sm:hidden"
          />

          {/* Level 2 — Executives */}
          <div className="mb-3 flex justify-center">
            <LevelTag label={t.levelExec} />
          </div>

          <div className="grid w-full grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 sm:gap-8 lg:gap-14">
            {t.execs.map((m) => (
              <MemberCard key={m.name} member={m} isAr={isAr} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}