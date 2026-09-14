"use client";

import Link from "next/link";
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

const TEXT = {
  EN: {
    badge: "Partnership Program",
    heading: "Become a Partner",
    subheading:
      "Join hands with Boyut Al-Kawthar and grow your business globally. We connect Saudi manufacturers and exporters with international markets through trusted partnerships.",
    benefitsTitle: "Why Partner With Us?",
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
    processTitle: "How It Works",
    processSubheading: "Simple steps to start your global journey with us.",
    process: [
      {
        step: "01",
        title: "Get in Touch",
        desc: "Fill out the form and tell us about your business and export goals.",
      },
      {
        step: "02",
        title: "Free Consultation",
        desc: "Our experts schedule a free consultation to understand your needs.",
      },
      {
        step: "03",
        title: "Custom Strategy",
        desc: "We design a tailored export roadmap based on your products and markets.",
      },
      {
        step: "04",
        title: "Start Exporting",
        desc: "Launch your journey with our full support at every step.",
      },
    ],
    ctaTitle: "Ready to Partner With Us?",
    ctaText:
      "Let's build your export success story together. Our team is ready to guide you.",
    ctaButton: "Start Your Journey",
    contactTitle: "Contact Our Team",
    contactText:
      "Have questions? Reach out to us and we'll get back to you shortly.",
    contactButton: "Contact Us",
    formTitle: "Register Your Interest",
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
  },
  AR: {
    badge: "برنامج الشراكة",
    heading: "كن شريكًا",
    subheading:
      "انضم إلى بيوت الكوثر ووسّع أعمالك عالميًا. نربط المصنّعين والمصدّرين السعوديين بالأسواق الدولية من خلال شراكات موثوقة.",
    benefitsTitle: "لماذا الشراكة معنا؟",
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
    processTitle: "كيف تعمل العملية",
    processSubheading: "خطوات بسيطة لبدء رحلتك العالمية معنا.",
    process: [
      {
        step: "٠١",
        title: "تواصل معنا",
        desc: "املأ النموذج وأخبرنا عن أعمالك وأهدافك التصديرية.",
      },
      {
        step: "٠٢",
        title: "استشارة مجانية",
        desc: "يجدول خبراؤنا استشارة مجانية لفهم احتياجاتك.",
      },
      {
        step: "٠٣",
        title: "استراتيجية مخصصة",
        desc: "نصمم خارطة طريق تصدير مخصصة بناءً على منتجاتك وأسواقك.",
      },
      {
        step: "٠٤",
        title: "ابدأ التصدير",
        desc: "أطلق رحلتك بدعم كامل منا في كل خطوة.",
      },
    ],
    ctaTitle: "هل أنت مستعد للشراكة معنا؟",
    ctaText:
      "لنبنِ قصة نجاحك التصديرية معًا. فريقنا مستعد لإرشادك.",
    ctaButton: "ابدأ رحلتك",
    contactTitle: "تواصل مع فريقنا",
    contactText:
      "لديك أسئلة؟ تواصل معنا وسنرد عليك قريبًا.",
    contactButton: "اتصل بنا",
    formTitle: "سجّل اهتمامك",
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
  },
} as const;

function readStoredLang(): LangCode {
  if (typeof window === "undefined") return "EN";
  return window.localStorage.getItem(LANG_KEY) === "AR" ? "AR" : "EN";
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

/** SVG icon renderer for benefit cards */
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

export default function PartnerPage() {
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
  const [heroRef, heroInView] = useInView<HTMLDivElement>(0.2);
  const [benefitsRef, benefitsInView] = useInView<HTMLDivElement>(0.1);
  const [processRef, processInView] = useInView<HTMLDivElement>(0.15);
  const [formRef, formInView] = useInView<HTMLDivElement>(0.15);

  const inputBase =
    "w-full cursor-pointer rounded-xl border border-[#13233F]/15 bg-white px-4 py-3 font-[family-name:var(--font-poppins)] text-[13px] font-light text-[#13233F] placeholder:text-[#5C5C5C]/50 outline-none transition-all duration-300 focus:border-[#F5B301] focus:ring-2 focus:ring-[#F5B301]/30 sm:text-[13.5px]";

  const labelBase =
    "mb-1.5 block font-[family-name:var(--font-poppins)] text-[12px] font-semibold text-[#13233F] sm:text-[12.5px]";

  return (
    <main
      dir={isAr ? "rtl" : "ltr"}
      className={`${playfair.variable} ${poppins.variable} w-full bg-white`}
    >
      {/* ─── HERO ─── */}
      <section className="relative mx-auto max-w-6xl px-4 pt-28 pb-12 sm:px-6 sm:pt-32 sm:pb-16 md:px-8 lg:px-10 lg:pt-36 lg:pb-20">
        <div
          ref={heroRef}
          className="flex flex-col items-center text-center"
        >
          {/* Badge */}
          <span
            className={[
              "mb-4 inline-flex items-center gap-2 rounded-full bg-[#13233F]/5 px-4 py-1.5 font-[family-name:var(--font-poppins)] text-[11px] font-semibold uppercase tracking-[3px] text-[#13233F] sm:text-[11.5px]",
              "transition-all duration-1000 ease-out",
              heroInView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
            ].join(" ")}
            style={{ transitionDelay: "0ms" }}
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#F5B301]" />
            {t.badge}
          </span>

          {/* Heading */}
          <h1
            className={[
              "font-[family-name:var(--font-playfair)] text-2xl font-extrabold leading-[1.15] text-[#13233F] sm:text-3xl md:text-4xl lg:text-5xl",
              "transition-all duration-1000 ease-out",
              heroInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
            ].join(" ")}
            style={{ transitionDelay: "150ms" }}
          >
            {t.heading}
          </h1>

          {/* Gold bar */}
          <span
            className={[
              "mt-4 block h-1 w-16 rounded-full bg-[#F5B301] transition-all duration-1000 ease-out sm:mt-5 sm:w-20",
              heroInView ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0",
            ].join(" ")}
            style={{ transitionDelay: "350ms" }}
          />

          {/* Subheading */}
          <p
            className={[
              "mx-auto mt-5 max-w-2xl font-[family-name:var(--font-poppins)] text-[13.5px] font-light leading-relaxed text-[#5C5C5C] sm:mt-6 sm:text-[14.5px] md:text-[15px]",
              "transition-all duration-1000 ease-out",
              heroInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
            ].join(" ")}
            style={{ transitionDelay: "500ms" }}
          >
            {t.subheading}
          </p>
        </div>
      </section>

      {/* ─── BENEFITS ─── */}
      <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 sm:pb-16 md:px-8 lg:px-10 lg:pb-20">
        <div ref={benefitsRef}>
          {/* Section heading */}
          <div
            className={[
              "mb-8 text-center md:mb-10",
              "transition-all duration-1000 ease-out",
              benefitsInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
            ].join(" ")}
          >
            <h2 className="font-[family-name:var(--font-playfair)] text-xl font-extrabold text-[#13233F] sm:text-2xl md:text-3xl">
              {t.benefitsTitle}
            </h2>
            <div className="mx-auto mt-3 h-1 w-14 rounded-full bg-[#F5B301] sm:w-16" />
          </div>

          {/* Benefits grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7">
            {t.benefits.map((b, i) => (
              <article
                key={b.title}
                style={{ transitionDelay: `${i * 100}ms` }}
                className={[
                  "group/card relative cursor-pointer overflow-hidden rounded-3xl border border-[#13233F]/10 bg-white p-6 shadow-sm",
                  "transition-all duration-700 ease-out hover:-translate-y-2 hover:border-[#F5B301]/50 hover:shadow-xl",
                  benefitsInView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0",
                ].join(" ")}
              >
                {/* Top gold bar — hover */}
                <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-[#F5B301] transition-transform duration-500 ease-out group-hover/card:scale-x-100" />

                {/* Icon */}
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#13233F] transition-transform duration-500 group-hover/card:scale-110">
                  <BenefitIcon type={b.icon} />
                </div>

                {/* Title */}
                <h3 className="font-[family-name:var(--font-playfair)] text-[16px] font-extrabold leading-snug text-[#13233F] sm:text-[17px]">
                  {b.title}
                </h3>

                {/* Divider */}
                <div className="my-2.5 h-[2px] w-8 rounded-full bg-[#F5B301] transition-all duration-500 group-hover/card:w-12" />

                {/* Description */}
                <p className="font-[family-name:var(--font-poppins)] text-[12.5px] font-light leading-relaxed text-[#5C5C5C] sm:text-[13px]">
                  {b.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROCESS ─── */}
      <section className="relative bg-[#F5F7FA] px-4 py-12 sm:px-6 sm:py-16 md:px-8 lg:px-10 lg:py-20">
        <div ref={processRef} className="mx-auto max-w-6xl">
          {/* Heading */}
          <div
            className={[
              "mb-8 text-center md:mb-12",
              "transition-all duration-1000 ease-out",
              processInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
            ].join(" ")}
          >
            <h2 className="font-[family-name:var(--font-playfair)] text-xl font-extrabold text-[#13233F] sm:text-2xl md:text-3xl">
              {t.processTitle}
            </h2>
            <div className="mx-auto mt-3 h-1 w-14 rounded-full bg-[#F5B301] sm:w-16" />
            <p className="mx-auto mt-4 max-w-2xl font-[family-name:var(--font-poppins)] text-[13px] font-light leading-relaxed text-[#5C5C5C] sm:text-[14px]">
              {t.processSubheading}
            </p>
          </div>

          {/* Steps */}
          <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
            {/* Connector line (desktop only) */}
            <div className="pointer-events-none absolute left-0 right-0 top-16 hidden h-[2px] bg-gradient-to-r from-transparent via-[#F5B301]/40 to-transparent lg:block" />

            {t.process.map((step, i) => (
              <article
                key={step.step}
                style={{ transitionDelay: `${i * 120}ms` }}
                className={[
                  "group/step relative cursor-pointer rounded-3xl border border-[#13233F]/10 bg-white p-6 text-center shadow-sm",
                  "transition-all duration-700 ease-out hover:-translate-y-2 hover:border-[#F5B301]/50 hover:shadow-xl",
                  processInView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0",
                ].join(" ")}
              >
                {/* Step number */}
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#13233F] font-[family-name:var(--font-playfair)] text-[16px] font-extrabold text-[#F5B301] transition-transform duration-500 group-hover/step:scale-110 sm:h-16 sm:w-16 sm:text-[18px]">
                  {step.step}
                </div>

                {/* Title */}
                <h3 className="font-[family-name:var(--font-playfair)] text-[15px] font-extrabold leading-snug text-[#13233F] sm:text-[16px]">
                  {step.title}
                </h3>

                {/* Divider */}
                <div className="mx-auto my-2.5 h-[2px] w-8 rounded-full bg-[#F5B301] transition-all duration-500 group-hover/step:w-12" />

                {/* Description */}
                <p className="font-[family-name:var(--font-poppins)] text-[12.5px] font-light leading-relaxed text-[#5C5C5C] sm:text-[13px]">
                  {step.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FORM ─── */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 md:px-8 lg:px-10 lg:py-20">
        <div
          ref={formRef}
          className={[
            "overflow-hidden rounded-[2rem] bg-[#13233F] shadow-2xl shadow-[#13233F]/20 transition-all duration-1000 ease-out",
            formInView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0",
          ].join(" ")}
        >
          {/* Decorative blobs */}
          <div className="pointer-events-none absolute" />

          <div className="relative grid grid-cols-1 gap-8 p-6 sm:p-10 lg:grid-cols-[1fr_1.2fr] lg:gap-12 lg:p-12">
            {/* Left — Text */}
            <div className="flex flex-col justify-center">
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-extrabold leading-tight text-white sm:text-3xl">
                {t.formTitle}
              </h2>
              <span className="mt-3 block h-1 w-14 rounded-full bg-[#F5B301] sm:w-16" />
              <p className="mt-4 font-[family-name:var(--font-poppins)] text-[13px] font-light leading-relaxed text-white/80 sm:text-[14px]">
                {t.ctaText}
              </p>

              {/* Trust badges */}
              <div className="mt-6 space-y-2.5">
                {[
                  { icon: "✓", text: isAr ? "استشارة مجانية" : "Free consultation" },
                  { icon: "✓", text: isAr ? "رد خلال ٢٤ ساعة" : "Response within 24 hours" },
                  { icon: "✓", text: isAr ? "بدون أي التزام" : "No commitment required" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-2.5">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#F5B301] text-[10px] font-bold text-[#13233F]">
                      {item.icon}
                    </span>
                    <span className="font-[family-name:var(--font-poppins)] text-[12.5px] font-light text-white/80 sm:text-[13px]">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Form */}
            <div>
              {submitted ? (
                <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-[#F5B301]/40 bg-[#F5B301]/10 p-8 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#F5B301] text-[28px] text-[#13233F]">
                    ✓
                  </div>
                  <p className="font-[family-name:var(--font-playfair)] text-lg font-extrabold text-white sm:text-xl">
                    {t.formSuccess}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  {/* Name + Company */}
                  <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className={`${labelBase} text-white`}>
                        {t.formName} <span className="text-[#C0272D]">*</span>
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
                      <label htmlFor="company" className={`${labelBase} text-white`}>
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
                      <label htmlFor="email" className={`${labelBase} text-white`}>
                        {t.formEmail} <span className="text-[#C0272D]">*</span>
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
                      <label htmlFor="phone" className={`${labelBase} text-white`}>
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
                    <label htmlFor="service" className={`${labelBase} text-white`}>
                      {t.formService} <span className="text-[#C0272D]">*</span>
                    </label>
                    <select
                      id="service"
                      name="service"
                      required
                      value={form.service}
                      onChange={handleChange}
                      className={`${inputBase} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%2313233F%22 stroke-width=%222%22><path d=%22M6 9l6 6 6-6%22/></svg>')] bg-[length:18px] bg-[right_1rem_center] bg-no-repeat pr-10 rtl:bg-[left_1rem_center] rtl:pr-4 rtl:pl-10`}
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
                    <label htmlFor="message" className={`${labelBase} text-white`}>
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

                  {/* Submit */}
                  <button
                    type="submit"
                    className="group/btn inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#F5B301] px-6 py-3 font-[family-name:var(--font-poppins)] text-[13px] font-bold text-[#13233F] transition-all duration-300 hover:bg-white hover:shadow-lg sm:text-[13.5px]"
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
      </section>

      {/* ─── CTA ─── */}
      <section className="relative mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20 md:px-8 lg:px-10 lg:pb-24">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#F5B301] to-[#C0272D] p-8 text-center shadow-xl sm:p-12">
          {/* Decorative circles */}
          <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />

          <div className="relative">
            <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-extrabold leading-tight text-white sm:text-3xl md:text-4xl">
              {t.ctaTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-[family-name:var(--font-poppins)] text-[13px] font-light leading-relaxed text-white/90 sm:text-[14px]">
              {t.ctaText}
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Link
                href="/contact"
                className="group/btn inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-7 py-3 font-[family-name:var(--font-poppins)] text-[13px] font-bold text-[#13233F] shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#13233F] hover:text-white sm:text-[13.5px]"
              >
                {t.ctaButton}
                <span
                  className={`transition-transform duration-300 ${
                    isAr
                      ? "group-hover/btn:-translate-x-1 rotate-180"
                      : "group-hover/btn:translate-x-1"
                  }`}
                >
                  →
                </span>
              </Link>
              <Link
                href="/services"
                className="group/btn2 inline-flex cursor-pointer items-center gap-2 rounded-full border-2 border-white/40 bg-white/10 px-7 py-3 font-[family-name:var(--font-poppins)] text-[13px] font-bold text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/20 sm:text-[13.5px]"
              >
                {isAr ? "استكشف الخدمات" : "Explore Services"}
                <span
                  className={`transition-transform duration-300 ${
                    isAr
                      ? "group-hover/btn2:-translate-x-1 rotate-180"
                      : "group-hover/btn2:translate-x-1"
                  }`}
                >
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}