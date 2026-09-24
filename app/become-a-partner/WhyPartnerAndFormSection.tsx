"use client";

import { useEffect, useRef, useState } from "react";
import { motion, Variants } from "framer-motion";
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

// 🌐 Online background image for the form card (free — Unsplash)
const FORM_BG_IMAGE =
  "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1600&q=80";

// ─── TEXT ─────────────────────────────────────────────────────
const TEXT = {
  EN: {
    benefitsBadge: "Why Partner With Us?",
    benefitsHeading: "Benefits of",
    benefitsHeadingAccent: "Partnering With Us",
    benefitsParagraph:
      "Discover the advantages of working with Boyut Al-Kawthar — your gateway to global markets.",

    benefits: [
      {
        title: "Global Market Access",
        desc: "Reach international buyers and distributors across the Middle East, Africa, and Asia through our established network.",
        icon: "globe",
      },
      {
        title: "Export Expertise",
        desc: "Leverage 25+ years of combined experience in Saudi exports, trade regulations, and international logistics.",
        icon: "chart",
      },
      {
        title: "Custom Roadmap",
        desc: "Get a tailored export strategy designed specifically for your products and target markets.",
        icon: "map",
      },
      {
        title: "End-to-End Support",
        desc: "From market research to shipping and banking, we handle the complexities so you can focus on your business.",
        icon: "support",
      },
      {
        title: "Trusted Network",
        desc: "Access verified distributors, agents, and buyers who are vetted for reliability and quality.",
        icon: "handshake",
      },
      {
        title: "Sustainable Growth",
        desc: "Build long-term partnerships that foster responsible and ethical business practices.",
        icon: "growth",
      },
    ],

    formBadge: "Register Your Interest",
    formHeading: "Start Your",
    formHeadingAccent: "Partnership Today!",
    formParagraph:
      "Fill out the form below and our team will get back to you within 24 hours to schedule your free consultation.",

    formName: "Full Name",
    formCompany: "Company Name",
    formEmail: "Email Address",
    formPhone: "Phone Number",
    formService: "Service of Interest",
    formMessage: "Tell us about your business",
    formSubmit: "Submit Application",
    formSuccess: "Thank you! We'll get back to you within 24 hours.",
    selectService: "Select a service",

    services: [
      "Market Research",
      "Distributor Finder",
      "Lead Generation",
      "Trade Missions",
      "Pricing Strategy",
      "Banking Support",
      "Certification Support",
      "Full Export Package",
    ],

    trustItems: [
      "Free consultation",
      "Response within 24 hours",
      "No commitment required",
    ],
  },
  AR: {
    benefitsBadge: "لماذا الشراكة معنا؟",
    benefitsHeading: "فوائد",
    benefitsHeadingAccent: "الشراكة معنا",
    benefitsParagraph:
      "اكتشف مزايا العمل مع بيوت الكوثر — بوابتك إلى الأسواق العالمية.",

    benefits: [
      {
        title: "الوصول للأسواق العالمية",
        desc: "اوصل إلى المشترين والموزعين الدوليين في الشرق الأوسط وأفريقيا وآسيا من خلال شبكتنا الواسعة.",
        icon: "globe",
      },
      {
        title: "خبرة في التصدير",
        desc: "استفد من خبرة تزيد عن ٢٥ عامًا في الصادرات السعودية ولوائح التجارة واللوجستيات الدولية.",
        icon: "chart",
      },
      {
        title: "خارطة طريق مخصصة",
        desc: "احصل على استراتيجية تصدير مصممة خصيصًا لمنتجاتك وأسواقك المستهدفة.",
        icon: "map",
      },
      {
        title: "دعم متكامل",
        desc: "من أبحاث السوق إلى الشحن والخدمات المصرفية، نتعامل مع التعقيدات لتتفرغ لأعمالك.",
        icon: "support",
      },
      {
        title: "شبكة موثوقة",
        desc: "اوصل إلى موزعين ووكلاء ومشترين موثوقين تم التحقق من جودتهم وموثوقيتهم.",
        icon: "handshake",
      },
      {
        title: "نمو مستدام",
        desc: "ابنِ شراكات طويلة الأمد تعزز الممارسات المسؤولة والأخلاقية.",
        icon: "growth",
      },
    ],

    formBadge: "سجّل اهتمامك",
    formHeading: "ابدأ",
    formHeadingAccent: "شراكتك اليوم!",
    formParagraph:
      "املأ النموذج أدناه وسيتواصل معك فريقنا خلال ٢٤ ساعة لتحديد موعد استشارتك المجانية.",

    formName: "الاسم الكامل",
    formCompany: "اسم الشركة",
    formEmail: "البريد الإلكتروني",
    formPhone: "رقم الهاتف",
    formService: "الخدمة المهتم بها",
    formMessage: "أخبرنا عن أعمالك",
    formSubmit: "إرسال الطلب",
    formSuccess: "شكرًا لك! سنرد عليك خلال ٢٤ ساعة.",
    selectService: "اختر خدمة",

    services: [
      "بحوث السوق",
      "البحث عن الموزعين",
      "توليد العملاء المحتملين",
      "البعثات التجارية",
      "استراتيجية التسعير",
      "الدعم المصرفي",
      "دعم الشهادات",
      "حزمة التصدير الكاملة",
    ],

    trustItems: [
      "استشارة مجانية",
      "رد خلال ٢٤ ساعة",
      "بدون أي التزام",
    ],
  },
  FR: {
    benefitsBadge: "Pourquoi nous choisir ?",
    benefitsHeading: "Avantages de",
    benefitsHeadingAccent: "notre partenariat",
    benefitsParagraph:
      "Découvrez les avantages de travailler avec Boyut Al-Kawthar — votre passerelle vers les marchés mondiaux.",

    benefits: [
      {
        title: "Accès aux marchés mondiaux",
        desc: "Atteignez des acheteurs et distributeurs internationaux au Moyen-Orient, en Afrique et en Asie grâce à notre réseau établi.",
        icon: "globe",
      },
      {
        title: "Expertise en exportation",
        desc: "Profitez de plus de 25 ans d'expérience combinée dans les exportations saoudiennes, les réglementations commerciales et la logistique internationale.",
        icon: "chart",
      },
      {
        title: "Feuille de route personnalisée",
        desc: "Obtenez une stratégie d'exportation sur mesure conçue spécifiquement pour vos produits et marchés cibles.",
        icon: "map",
      },
      {
        title: "Soutien de bout en bout",
        desc: "De l'étude de marché à l'expédition et aux services bancaires, nous gérons les complexités pour que vous puissiez vous concentrer sur votre activité.",
        icon: "support",
      },
      {
        title: "Réseau de confiance",
        desc: "Accédez à des distributeurs, agents et acheteurs vérifiés pour leur fiabilité et leur qualité.",
        icon: "handshake",
      },
      {
        title: "Croissance durable",
        desc: "Bâtissez des partenariats à long terme qui favorisent des pratiques commerciales responsables et éthiques.",
        icon: "growth",
      },
    ],

    formBadge: "Enregistrez votre intérêt",
    formHeading: "Commencez votre",
    formHeadingAccent: "partenariat dès aujourd'hui !",
    formParagraph:
      "Remplissez le formulaire ci-dessous et notre équipe vous répondra dans les 24 heures pour planifier votre consultation gratuite.",

    formName: "Nom complet",
    formCompany: "Nom de l'entreprise",
    formEmail: "Adresse e-mail",
    formPhone: "Numéro de téléphone",
    formService: "Service d'intérêt",
    formMessage: "Parlez-nous de votre entreprise",
    formSubmit: "Envoyer la demande",
    formSuccess: "Merci ! Nous vous répondrons dans les 24 heures.",
    selectService: "Sélectionnez un service",

    services: [
      "Étude de marché",
      "Recherche de distributeur",
      "Génération de prospects",
      "Missions commerciales",
      "Stratégie de prix",
      "Support bancaire",
      "Support de certification",
      "Forfait export complet",
    ],

    trustItems: [
      "Consultation gratuite",
      "Réponse sous 24 heures",
      "Aucun engagement requis",
    ],
  },
} as const;

// ─── HELPERS ──────────────────────────────────────────────────
function readStoredLang(): LangCode {
  if (typeof window === "undefined") return "EN";
  const saved = window.localStorage.getItem(LANG_KEY);
  if (saved === "AR" || saved === "EN" || saved === "FR") return saved;
  return "EN";
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

// ─── ICONS ────────────────────────────────────────────────────
function BenefitIcon({ type }: { type: string }) {
  const common = {
    className: "h-6 w-6",
    fill: "none",
    stroke: "#F5B301",
    strokeWidth: "1.6",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    viewBox: "0 0 24 24",
  };

  switch (type) {
    case "globe":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18z" />
        </svg>
      );
    case "chart":
      return (
        <svg {...common}>
          <path d="M3 17l6-6 4 4 8-8" />
          <path d="M14 7h7v7" />
        </svg>
      );
    case "map":
      return (
        <svg {...common}>
          <path d="M9 3L3 5v16l6-2 6 2 6-2V3l-6 2-6-2z" />
          <path d="M9 3v16M15 5v16" />
        </svg>
      );
    case "support":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8v4M12 16h.01" />
        </svg>
      );
    case "handshake":
      return (
        <svg {...common}>
          <path d="M11 17l2 2 4-4 2 2" />
          <path d="M3 11l4-4 4 4 4-4 4 4" />
          <path d="M7 15l-4 4M17 15l4 4" />
        </svg>
      );
    case "growth":
      return (
        <svg {...common}>
          <path d="M12 2.5l2.9 6.3 6.9.7-5.2 4.6 1.6 6.7L12 17.6 5.8 20.8l1.6-6.7-5.2-4.6 6.9-.7L12 2.5z" />
        </svg>
      );
    default:
      return null;
  }
}

// ─── ANIMATION VARIANTS ───────────────────────────────────────
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

// ─── MAIN COMPONENT ───────────────────────────────────────────
export default function WhyPartnerAndFormSection() {
  const [langCode, setLangCode] = useState<LangCode>(() => readStoredLang());
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

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

  const isAr = langCode === "AR";
  const t = TEXT[langCode];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    console.log("Form submitted:", form);
  };

  // Animation refs
  const [benefitsRef, benefitsInView] = useInView<HTMLDivElement>(0.1);
  const [formRef, formInView] = useInView<HTMLDivElement>(0.15);

  const inputBase =
    "w-full cursor-pointer rounded-xl border border-[#2C7046]/15 bg-white px-4 py-3 font-[family-name:var(--font-poppins)] text-[13px] font-light text-[#1A1A1A] placeholder:text-[#6B6B6B]/50 outline-none transition-all duration-300 focus:border-[#F5B301] focus:ring-2 focus:ring-[#F5B301]/30 sm:text-[13.5px]";

  const labelBase =
    "mb-1.5 block font-[family-name:var(--font-poppins)] text-[12px] font-semibold text-[#2C7046] sm:text-[12.5px]";

  return (
    <section
      dir={isAr ? "rtl" : "ltr"}
      className={`${playfair.variable} ${poppins.variable} relative w-full overflow-hidden bg-white`}
    >
      {/* ═══════════════ BENEFITS SECTION ═══════════════ */}
      <div className="mx-auto max-w-6xl px-4 pt-14 pb-10 sm:px-6 sm:pt-16 md:px-8 lg:px-10 lg:pt-20">
        {/* Heading */}
        <motion.div
          className="mb-10 text-center lg:mb-12"
          initial="hidden"
          animate={benefitsInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.div
            variants={fadeInUp}
            className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#2C7046]/10 px-4 py-1.5 font-[family-name:var(--font-poppins)] text-[11px] font-semibold text-[#2C7046] shadow-sm sm:text-[12px]"
          >
            <svg
              className="h-3.5 w-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2.5l2.9 6.3 6.9.7-5.2 4.6 1.6 6.7L12 17.6 5.8 20.8l1.6-6.7-5.2-4.6 6.9-.7L12 2.5z" />
            </svg>
            {t.benefitsBadge}
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="font-[family-name:var(--font-playfair)] text-2xl font-extrabold leading-[1.15] text-[#2C7046] sm:text-3xl md:text-4xl"
          >
            {t.benefitsHeading}{" "}
            <span className="text-[#F5B301]">{t.benefitsHeadingAccent}</span>
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
            className="mx-auto mt-4 max-w-2xl font-[family-name:var(--font-poppins)] text-[12.5px] font-light leading-relaxed text-[#6B6B6B] sm:text-[13.5px] md:text-[14px]"
          >
            {t.benefitsParagraph}
          </motion.p>
        </motion.div>

        {/* Benefits grid */}
        <motion.div
          ref={benefitsRef}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7"
          initial="hidden"
          animate={benefitsInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {t.benefits.map((benefit, i) => (
            <motion.article
              key={benefit.title}
              variants={fadeInUp}
              style={{ transitionDelay: `${i * 100}ms` }}
              className="group/card relative cursor-pointer overflow-hidden rounded-3xl border border-[#2C7046]/10 bg-white p-6 shadow-sm transition-all duration-700 ease-out hover:-translate-y-2 hover:border-[#F5B301]/50 hover:shadow-xl hover:shadow-[#2C7046]/10"
            >
              {/* Top gold bar — hover */}
              <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-[#F5B301] transition-transform duration-500 ease-out group-hover/card:scale-x-100" />

              {/* Icon */}
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2C7046] transition-transform duration-500 group-hover/card:scale-110">
                <BenefitIcon type={benefit.icon} />
              </div>

              {/* Title */}
              <h3 className="font-[family-name:var(--font-playfair)] text-[16px] font-extrabold leading-snug text-[#2C7046] sm:text-[17px]">
                {benefit.title}
              </h3>

              {/* Gold divider */}
              <div className="my-2.5 h-[2px] w-8 rounded-full bg-[#F5B301] transition-all duration-500 group-hover/card:w-12" />

              {/* Description */}
              <p className="font-[family-name:var(--font-poppins)] text-[12.5px] font-light leading-relaxed text-[#6B6B6B] sm:text-[13px]">
                {benefit.desc}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>

      {/* ═══════════════ PARTNER FORM SECTION ═══════════════ */}
      <div
        ref={formRef}
        className={[
          "mx-auto max-w-6xl px-4 pb-14 sm:px-6 sm:pb-16 md:px-8 lg:px-10 lg:pb-20",
          "transition-all duration-1000 ease-out",
          formInView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0",
        ].join(" ")}
      >
        <div className="relative overflow-hidden rounded-[2rem] bg-[#2C7046] shadow-2xl shadow-[#2C7046]/20 sm:rounded-[2.5rem]">
          {/* 🌐 Background image for the form card */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${FORM_BG_IMAGE})` }}
            aria-hidden="true"
          />

          {/* Green overlay for readability */}
          <div className="absolute inset-0 bg-[#2C7046]/75" aria-hidden="true" />

          <div className="relative grid grid-cols-1 gap-8 p-6 sm:p-10 lg:grid-cols-[1fr_1.2fr] lg:gap-12 lg:p-12">
            {/* Left — Text */}
            <div className="flex flex-col justify-center">
              {/* Badge */}
              <div className="mb-4 inline-flex items-center gap-2 self-start rounded-full border border-[#F5B301]/30 bg-[#F5B301]/10 px-3 py-1 font-[family-name:var(--font-poppins)] text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#F5B301]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#F5B301]" />
                {t.formBadge}
              </div>

              <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-extrabold leading-[1.15] text-white sm:text-3xl md:text-[34px]">
                {t.formHeading}{" "}
                <span className="text-[#F5B301]">{t.formHeadingAccent}</span>
              </h2>

              <span className="mt-3 block h-1 w-14 rounded-full bg-[#F5B301] sm:w-16" />

              <p className="mt-4 font-[family-name:var(--font-poppins)] text-[12.5px] font-light leading-relaxed text-white/80 sm:text-[13.5px]">
                {t.formParagraph}
              </p>

              {/* Trust badges */}
              <div className="mt-6 space-y-2.5">
                {t.trustItems.map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#F5B301] text-[10px] font-bold text-[#2C7046]">
                      ✓
                    </span>
                    <span className="font-[family-name:var(--font-poppins)] text-[12px] font-light text-white/80 sm:text-[12.5px]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Form */}
            <div>
              {submitted ? (
                <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-[#F5B301]/40 bg-[#F5B301]/10 p-8 text-center backdrop-blur-sm">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#F5B301] text-[28px] text-[#2C7046]">
                    ✓
                  </div>
                  <p className="font-[family-name:var(--font-playfair)] text-base font-extrabold text-white sm:text-lg">
                    {t.formSuccess}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  {/* Name + Company */}
                  <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className={`${labelBase} !text-white`}>
                        {t.formName} <span className="text-[#F5B301]">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        className={inputBase}
                        placeholder={t.formName}
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className={`${labelBase} !text-white`}>
                        {t.formCompany}
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        value={form.company}
                        onChange={handleChange}
                        className={inputBase}
                        placeholder={t.formCompany}
                      />
                    </div>
                  </div>

                  {/* Email + Phone */}
                  <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="email" className={`${labelBase} !text-white`}>
                        {t.formEmail} <span className="text-[#F5B301]">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        className={inputBase}
                        placeholder="you@example.com"
                        dir="ltr"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className={`${labelBase} !text-white`}>
                        {t.formPhone}
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        className={inputBase}
                        placeholder="+966..."
                        dir="ltr"
                      />
                    </div>
                  </div>

                  {/* Service dropdown */}
                  <div>
                    <label htmlFor="service" className={`${labelBase} !text-white`}>
                      {t.formService} <span className="text-[#F5B301]">*</span>
                    </label>
                    <select
                      id="service"
                      name="service"
                      required
                      value={form.service}
                      onChange={handleChange}
                      className={`${inputBase} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%232C7046%22 stroke-width=%222%22><path d=%22M6 9l6 6 6-6%22/></svg>')] bg-[length:18px] bg-[right_1rem_center] bg-no-repeat pr-10 rtl:bg-[left_1rem_center] rtl:pr-4 rtl:pl-10`}
                    >
                      <option value="" disabled>
                        {t.selectService}
                      </option>
                      {t.services.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className={`${labelBase} !text-white`}>
                      {t.formMessage}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      value={form.message}
                      onChange={handleChange}
                      className={`${inputBase} resize-none`}
                      placeholder={t.formMessage}
                    />
                  </div>

                  {/* Submit — GOLD with white text, hover flips to white with green */}
                  <button
                    type="submit"
                    className="group/btn inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#F5B301] px-6 py-3 font-[family-name:var(--font-poppins)] text-[13px] font-bold text-white transition-all duration-300 hover:bg-white hover:text-[#2C7046] hover:shadow-lg hover:shadow-[#F5B301]/25 sm:text-[13.5px]"
                  >
                    {t.formSubmit}
                    <span
                      className={`transition-transform duration-300 ${
                        isAr
                          ? "group-hover/btn:-translate-x-1 rotate-180"
                          : "group-hover/btn:translate-x-1"
                      }`}
                    >
                      →
                    </span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}