"use client";

import { useEffect, useRef, useState } from "react";
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

const CONTACT_IMAGE = "/contact/contact1.jpg";

const SERVICES = {
  EN: [
    "Market Research",
    "Distributor Finder",
    "Lead Generation",
    "Meeting Agenda with Potential Buyers",
    "Trade Missions",
    "Competition Analysis",
    "Pricing Strategy",
    "Shipping Report",
    "Banking Report",
    "Certification Report",
  ],
  AR: [
    "بحوث السوق",
    "إيجاد الموزعين",
    "توليد العملاء المحتملين",
    "جدولة اجتماعات مع المشترين المحتملين",
    "البعثات التجارية",
    "تحليل المنافسين",
    "استراتيجية التسعير",
    "تقرير الشحن",
    "التقرير المصرفي",
    "تقرير الشهادات",
  ],
  FR: [
    "Étude de marché",
    "Recherche de distributeur",
    "Génération de prospects",
    "Ordre du jour des réunions avec les acheteurs potentiels",
    "Missions commerciales",
    "Analyse de la concurrence",
    "Stratégie de prix",
    "Rapport d'expédition",
    "Rapport bancaire",
    "Rapport de certification",
  ],
} as const;

const TEXT = {
  EN: {
    overlayTitle: "Beyond Profit, Beyond Impact",
    overlaySubtitle: "Shaping a Responsible Future with Boyut Al-Kawthar",
    formTitle: "Please fill the form to schedule your FREE consultation today!",
    name: "Name",
    position: "Position",
    company: "Company",
    email: "E-Mail",
    services: "Services",
    subject: "Subject",
    message: "Message",
    selectService: "Select a service",
    submit: "Submit",
    required: "Required",
    thankYou: "Thank you!",
    thankYouMsg: "Your request has been received. We'll get back to you shortly.",
  },
  AR: {
    overlayTitle: "ما وراء الربح، ما وراء التأثير",
    overlaySubtitle: "نصنع مستقبلًا مسؤولًا مع بيوت الكوثر",
    formTitle: "يرجى ملء النموذج لتحديد موعد استشارتك المجانية اليوم!",
    name: "الاسم",
    position: "المنصب",
    company: "الشركة",
    email: "البريد الإلكتروني",
    services: "الخدمات",
    subject: "الموضوع",
    message: "الرسالة",
    selectService: "اختر خدمة",
    submit: "إرسال",
    required: "مطلوب",
    thankYou: "شكرًا لك!",
    thankYouMsg: "تم استلام طلبك، وسنتواصل معك قريبًا.",
  },
  FR: {
    overlayTitle: "Au-delà du profit, au-delà de l'impact",
    overlaySubtitle: "Façonner un avenir responsable avec Boyut Al-Kawthar",
    formTitle:
      "Veuillez remplir le formulaire pour planifier votre consultation GRATUITE dès aujourd'hui !",
    name: "Nom",
    position: "Poste",
    company: "Entreprise",
    email: "E-mail",
    services: "Services",
    subject: "Sujet",
    message: "Message",
    selectService: "Sélectionnez un service",
    submit: "Envoyer",
    required: "Requis",
    thankYou: "Merci !",
    thankYouMsg:
      "Votre demande a été reçue. Nous vous répondrons sous peu.",
  },
} as const;

function readStoredLang(): LangCode {
  if (typeof window === "undefined") return "EN";
  const saved = window.localStorage.getItem(LANG_KEY);
  if (saved === "AR" || saved === "EN" || saved === "FR") return saved;
  return "EN";
}

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

export default function ContactPage() {
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
  const servicesList = SERVICES[langCode];

  // Form state
  const [form, setForm] = useState({
    name: "",
    position: "",
    company: "",
    email: "",
    service: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    // TODO: yahan apna API / email logic laga do
    console.log("Form submitted:", form);
  };

  const [leftRef, leftInView] = useInView<HTMLDivElement>(0.15);
  const [rightRef, rightInView] = useInView<HTMLDivElement>(0.15);

  const inputBase =
    "w-full cursor-pointer rounded-xl border border-white/20 bg-white/95 px-4 py-3 font-[family-name:var(--font-poppins)] text-[13.5px] font-light text-[#0F3327] placeholder:text-[#5C5C5C]/60 outline-none transition-all duration-300 focus:border-[#3EA96E] focus:ring-2 focus:ring-[#3EA96E]/30 sm:text-[14px]";

  const labelBase =
    "mb-1.5 block font-[family-name:var(--font-poppins)] text-[12.5px] font-semibold text-white sm:text-[13px]";

  return (
    <section
      dir={isAr ? "rtl" : "ltr"}
      className={`${playfair.variable} ${poppins.variable} w-full bg-white px-4 py-8 sm:px-6 sm:py-12 md:px-8 lg:px-10`}
    >
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[1.75rem] bg-[#0F3327]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `url(${CONTACT_IMAGE})`,
          }}
        />
        <div className="absolute inset-0 bg-[#0F3327]/75" />
        <div
          ref={rightRef}
          className={[
            "relative w-full px-5 py-6 sm:px-8 sm:py-8 md:px-10",
            "transition-all duration-700 ease-out delay-150",
            rightInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
          ].join(" ")}
        >
          <h3 className="font-[family-name:var(--font-playfair)] text-xl font-extrabold leading-snug text-white sm:text-2xl">
            {t.formTitle}
          </h3>
          <span className="mt-3 block h-1 w-16 rounded-full bg-[#3EA96E]" />

          {submitted ? (
            <div className="mt-5 rounded-2xl border border-[#3EA96E]/40 bg-[#3EA96E]/10 p-5 text-center">
              <p className="font-[family-name:var(--font-playfair)] text-lg font-extrabold text-white">
                {t.thankYou}
              </p>
              <p className="mt-2 font-[family-name:var(--font-poppins)] text-[13.5px] font-light text-white/75">
                {t.thankYouMsg}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-5 space-y-3">
              {/* Name */}
              <div>
                <label htmlFor="name" className={labelBase}>
                  {t.name} <span className="text-[#3EA96E]">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className={inputBase}
                  placeholder={t.name}
                />
              </div>

              {/* Position + Company */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="position" className={labelBase}>
                    {t.position}
                  </label>
                  <input
                    id="position"
                    name="position"
                    type="text"
                    value={form.position}
                    onChange={handleChange}
                    className={inputBase}
                    placeholder={t.position}
                  />
                </div>
                <div>
                  <label htmlFor="company" className={labelBase}>
                    {t.company}
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    value={form.company}
                    onChange={handleChange}
                    className={inputBase}
                    placeholder={t.company}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className={labelBase}>
                  {t.email} <span className="text-[#3EA96E]">*</span>
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

              {/* Services dropdown */}
              <div>
                <label htmlFor="service" className={labelBase}>
                  {t.services} <span className="text-[#3EA96E]">*</span>
                </label>
                <select
                  id="service"
                  name="service"
                  required
                  value={form.service}
                  onChange={handleChange}
                  className={`${inputBase} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%230F3327%22 stroke-width=%222%22><path d=%22M6 9l6 6 6-6%22/></svg>')] bg-[length:18px] bg-[right_1rem_center] bg-no-repeat pr-10 rtl:bg-[left_1rem_center] rtl:pr-4 rtl:pl-10`}
                >
                  <option value="" disabled>
                    {t.selectService}
                  </option>
                  {servicesList.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className={labelBase}>
                  {t.subject} <span className="text-[#3EA96E]">*</span>
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  value={form.subject}
                  onChange={handleChange}
                  className={inputBase}
                  placeholder={t.subject}
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className={labelBase}>
                  {t.message} <span className="text-[#3EA96E]">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={3}
                  value={form.message}
                  onChange={handleChange}
                  className={`${inputBase} resize-none`}
                  placeholder={t.message}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="group/btn inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#3EA96E] px-6 py-3 font-[family-name:var(--font-poppins)] text-[13.5px] font-semibold text-[#0F3327] transition-colors duration-300 hover:bg-white hover:text-[#0F3327] sm:w-auto sm:text-[14px]"
              >
                {t.submit}
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
    </section>
  );
}