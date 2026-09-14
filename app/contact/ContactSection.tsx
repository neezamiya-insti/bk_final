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
type LangCode = "EN" | "AR";

// Same subtle background image as WhoWeAreSection
const BG_IMAGE =
  "https://images.unsplash.com/photo-1759272840712-c7e5ea852367?fm=jpg&q=80&w=2400&auto=format&fit=crop";

type ContactItem = {
  id: string;
  title: string;
  titleAr: string;
  value: string;
  valueAr: string;
  href: string;
  desc: string;
  descAr: string;
  icon: string;
};

const CONTACT_ITEMS: ContactItem[] = [
  {
    id: "location",
    title: "Location",
    titleAr: "الموقع",
    value: "4329 Ibrahim Ibn Baz st., Al Sulay District, Riyadh 14276, Saudi Arabia.",
    valueAr: "٤٣٢٩ شارع إبراهيم بن باز، حي السلي، الرياض ١٤٢٧٦، المملكة العربية السعودية.",
    href: "https://maps.google.com/?q=Riyadh+Al+Sulay",
    desc: "Visit our head office in Riyadh for in-person consultations and meetings with our export experts.",
    descAr: "قم بزيارة مكتبنا الرئيسي في الرياض للاستشارات الشخصية والاجتماعات مع خبراء التصدير لدينا.",
    icon: "location",
  },
  {
    id: "phone",
    title: "Call Us",
    titleAr: "اتصل بنا",
    value: "+966538597719",
    valueAr: "+966538597719",
    href: "tel:+966538597719",
    desc: "Our team is available Sunday to Thursday, 9 AM to 6 PM (KSA time) to answer your questions.",
    descAr: "فريقنا متاح من الأحد إلى الخميس، من ٩ صباحًا حتى ٦ مساءً (بتوقيت السعودية) للإجابة على أسئلتك.",
    icon: "phone",
  },
  {
    id: "email",
    title: "Email Us",
    titleAr: "راسلنا",
    value: "Info@bk.com.sa",
    valueAr: "Info@bk.com.sa",
    href: "mailto:Info@bk.com.sa",
    desc: "Send us your inquiries and we'll get back to you within 24 hours with the information you need.",
    descAr: "أرسل لنا استفساراتك وسنرد عليك خلال ٢٤ ساعة بالمعلومات التي تحتاجها.",
    icon: "email",
  },
  {
    id: "instagram",
    title: "Instagram",
    titleAr: "إنستغرام",
    value: "@boyutalkawthar",
    valueAr: "@boyutalkawthar",
    href: "https://www.instagram.com/boyutalkawthar/",
    desc: "Follow us for behind-the-scenes, event highlights, and daily updates from our global trade journey.",
    descAr: "تابعنا لمشاهدة الكواليس وأبرز الفعاليات والتحديثات اليومية من رحلتنا في التجارة العالمية.",
    icon: "instagram",
  },
  {
    id: "linkedin",
    title: "LinkedIn",
    titleAr: "لينكد إن",
    value: "@boyutalkawthar",
    valueAr: "@boyutalkawthar",
    href: "https://www.linkedin.com/company/boyutalkawthar/",
    desc: "Connect with us professionally to explore partnerships, opportunities, and industry insights.",
    descAr: "تواصل معنا بشكل احترافي لاستكشاف الشراكات والفرص ورؤى الصناعة.",
    icon: "linkedin",
  },
  {
    id: "x",
    title: "X (Twitter)",
    titleAr: "إكس (تويتر)",
    value: "@boyutalkawthar",
    valueAr: "@boyutalkawthar",
    href: "https://x.com/boyutalkawthar",
    desc: "Stay updated with our latest news, announcements, and quick insights on global trade.",
    descAr: "ابقَ على اطلاع بأحدث أخبارنا وإعلاناتنا ورؤى سريعة حول التجارة العالمية.",
    icon: "x",
  },
  {
    id: "facebook",
    title: "Facebook",
    titleAr: "فيسبوك",
    value: "@boyutalkawthar",
    valueAr: "@boyutalkawthar",
    href: "https://web.facebook.com/boyutalkawthar",
    desc: "Join our Facebook community to engage with other exporters and stay informed about events.",
    descAr: "انضم إلى مجتمعنا على فيسبوك للتفاعل مع مصدّرين آخرين والبقاء على اطلاع بالفعاليات.",
    icon: "facebook",
  },
  {
    id: "snapchat",
    title: "Snapchat",
    titleAr: "سناب شات",
    value: "@baoyutalkawthar",
    valueAr: "@baoyutalkawthar",
    href: "https://www.snapchat.com/add/baoyutalkawthar",
    desc: "Follow us on Snapchat for a more casual, real-time look at what we do.",
    descAr: "تابعنا على سناب شات للحصول على نظرة أكثر عفوية وفورية لما نقوم به.",
    icon: "snapchat",
  },
];

const TEXT = {
  EN: {
    heading: "Get in Touch With Us",
    subheading: "Reach out through any channel below, or send us a message.",
    formTitle: "Send Us a Message",
    formName: "Full Name",
    formEmail: "Email Address",
    formPhone: "Phone Number",
    formSubject: "Subject",
    formMessage: "Your Message",
    formSubmit: "Send Message",
    formSuccess: "Thank you! We'll get back to you within 24 hours.",
    openLink: "Open Link",
  },
  AR: {
    heading: "تواصل معنا",
    subheading: "تواصل معنا من خلال أي قناة أدناه، أو أرسل لنا رسالة.",
    formTitle: "أرسل لنا رسالة",
    formName: "الاسم الكامل",
    formEmail: "البريد الإلكتروني",
    formPhone: "رقم الهاتف",
    formSubject: "الموضوع",
    formMessage: "رسالتك",
    formSubmit: "إرسال الرسالة",
    formSuccess: "شكرًا لك! سنرد عليك خلال ٢٤ ساعة.",
    openLink: "فتح الرابط",
  },
} as const;

function readStoredLang(): LangCode {
  if (typeof window === "undefined") return "EN";
  return window.localStorage.getItem(LANG_KEY) === "AR" ? "AR" : "EN";
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

function ContactIcon({ type }: { type: string }) {
  const common = {
    className: "h-5 w-5",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    viewBox: "0 0 24 24",
  };

  switch (type) {
    case "location":
      return (
        <svg {...common}>
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      );
    case "phone":
      return (
        <svg {...common}>
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      );
    case "email":
      return (
        <svg {...common}>
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="M22 6l-10 7L2 6" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...common}>
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...common}>
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-13h4v2a6 6 0 0 1 2-2z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      );
    case "x":
      return (
        <svg {...common}>
          <path d="M4 4l16 16M20 4L4 20" />
        </svg>
      );
    case "facebook":
      return (
        <svg {...common}>
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      );
    case "snapchat":
      return (
        <svg {...common}>
          <path d="M12 3a6 6 0 0 0-6 6v3c0 1-1 2-2 3 2 1 3 1 4 3 1 1 2 1 4 1s3 0 4-1c1-2 2-2 4-3-1-1-2-2-2-3V9a6 6 0 0 0-6-6z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function ContactSection() {
  const [langCode, setLangCode] = useState<LangCode>(() => readStoredLang());
  const [activeId, setActiveId] = useState<string>("location");
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

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
  const active = CONTACT_ITEMS.find((item) => item.id === activeId) || CONTACT_ITEMS[0];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    console.log("Form submitted:", form);
  };

  const [headingRef, headingInView] = useInView<HTMLDivElement>(0.2);
  const [contentRef, contentInView] = useInView<HTMLDivElement>(0.1);

  const inputBase =
    "w-full cursor-pointer rounded-xl border border-[#13233F]/15 bg-white px-4 py-3 font-[family-name:var(--font-poppins)] text-[13px] font-light text-[#13233F] placeholder:text-[#5C5C5C]/50 outline-none transition-all duration-300 focus:border-[#F5B301] focus:ring-2 focus:ring-[#F5B301]/30 sm:text-[13.5px]";

  const labelBase =
    "mb-1.5 block font-[family-name:var(--font-poppins)] text-[12px] font-semibold text-[#13233F] sm:text-[12.5px]";

  return (
    <section
      dir={isAr ? "rtl" : "ltr"}
      className={`${playfair.variable} ${poppins.variable} relative w-full overflow-hidden bg-white py-12 md:py-16 lg:py-20`}
    >
      {/* Subtle decorative background image — same as WhoWeAreSection */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        <Image
          src={BG_IMAGE}
          alt=""
          fill
          className="object-cover opacity-[0.07]"
          aria-hidden="true"
        />
      </div>

      {/* Content wrapper */}
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 md:px-8 lg:px-10">
        {/* Heading */}
        <div
          ref={headingRef}
          className={[
            "mb-8 text-center transition-all duration-1000 ease-out md:mb-12",
            headingInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
          ].join(" ")}
        >
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-extrabold text-[#13233F] sm:text-3xl md:text-4xl">
            {t.heading}
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-[#F5B301] sm:w-20" />
          <p className="mx-auto mt-4 max-w-2xl font-[family-name:var(--font-poppins)] text-[13px] font-light leading-relaxed text-[#5C5C5C] sm:text-[14px] md:text-[15px]">
            {t.subheading}
          </p>
        </div>

        {/* Main grid — sidebar LEFT + content RIGHT */}
        <div
          ref={contentRef}
          className={[
            "grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr] lg:gap-8",
            "transition-all duration-1000 ease-out",
            contentInView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0",
          ].join(" ")}
        >
          {/* ─── LEFT SIDEBAR (icons) ─── */}
          <aside className="flex flex-col gap-3">
            {CONTACT_ITEMS.map((item) => {
              const isActive = activeId === item.id;
              const title = isAr ? item.titleAr : item.title;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveId(item.id)}
                  onMouseEnter={() => setActiveId(item.id)}
                  className={[
                    "group/icon flex w-full cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-all duration-300",
                    isActive
                      ? "border-[#F5B301] bg-[#13233F] text-white shadow-lg"
                      : "border-[#13233F]/10 bg-white text-[#13233F] hover:border-[#F5B301]/50 hover:bg-[#F5B301]/5",
                    isAr ? "flex-row-reverse text-right" : "",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors duration-300",
                      isActive
                        ? "bg-[#F5B301] text-[#13233F]"
                        : "bg-[#13233F]/5 text-[#13233F] group-hover/icon:bg-[#F5B301]/20",
                    ].join(" ")}
                  >
                    <ContactIcon type={item.icon} />
                  </span>
                  <span
                    className={[
                      "font-[family-name:var(--font-poppins)] text-[13px] font-semibold transition-colors duration-300 sm:text-[13.5px]",
                      isActive ? "text-white" : "text-[#13233F]",
                    ].join(" ")}
                  >
                    {title}
                  </span>
                </button>
              );
            })}
          </aside>

          {/* ─── RIGHT CONTENT ─── */}
          <div className="flex flex-col gap-5">
            {/* Active item detail card */}
            <div
              key={active.id}
              className="animate-[fadeIn_0.5s_ease-out] rounded-3xl bg-white p-5 shadow-sm sm:p-6 md:p-7"
            >
              <h3 className="font-[family-name:var(--font-playfair)] text-lg font-extrabold text-[#13233F] sm:text-xl">
                {isAr ? active.titleAr : active.title}
              </h3>
              <div className="my-3 h-[2px] w-12 rounded-full bg-[#F5B301]" />

              <p
                className="font-[family-name:var(--font-poppins)] text-[13.5px] font-medium leading-relaxed text-[#13233F] sm:text-[14.5px]"
                dir={active.id === "phone" ? "ltr" : isAr ? "rtl" : "ltr"}
              >
                {isAr ? active.valueAr : active.value}
              </p>

              <p className="mt-3 font-[family-name:var(--font-poppins)] text-[12.5px] font-light leading-relaxed text-[#5C5C5C] sm:text-[13px]">
                {isAr ? active.descAr : active.desc}
              </p>

              <a
                href={active.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link mt-5 inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#13233F] px-5 py-2.5 font-[family-name:var(--font-poppins)] text-[12.5px] font-semibold text-white transition-colors duration-300 hover:bg-[#C0272D] sm:text-[13px]"
              >
                {t.openLink}
                <span
                  className={`transition-transform duration-300 ${
                    isAr
                      ? "group-hover/link:-translate-x-1 rotate-180"
                      : "group-hover/link:translate-x-1"
                  }`}
                >
                  →
                </span>
              </a>
            </div>

            {/* Form card */}
            <div className="rounded-3xl bg-white p-5 shadow-sm sm:p-7 md:p-8">
              <h3 className="font-[family-name:var(--font-playfair)] text-lg font-extrabold text-[#13233F] sm:text-xl">
                {t.formTitle}
              </h3>
              <div className="my-3 h-1 w-14 rounded-full bg-[#F5B301]" />

              {submitted ? (
                <div className="mt-6 rounded-2xl border border-[#F5B301]/40 bg-[#F5B301]/10 p-8 text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#F5B301] text-[24px] font-bold text-[#13233F]">
                    ✓
                  </div>
                  <p className="font-[family-name:var(--font-playfair)] text-base font-extrabold text-[#13233F] sm:text-lg">
                    {t.formSuccess}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className={labelBase}>
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
                      <label htmlFor="email" className={labelBase}>
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
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="phone" className={labelBase}>
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
                    <div>
                      <label htmlFor="subject" className={labelBase}>
                        {t.formSubject} <span className="text-[#C0272D]">*</span>
                      </label>
                      <input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={form.subject}
                        onChange={handleChange}
                        className={inputBase}
                        placeholder={t.formSubject}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className={labelBase}>
                      {t.formMessage} <span className="text-[#C0272D]">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      className={`${inputBase} resize-none`}
                      placeholder={t.formMessage}
                    />
                  </div>

                  <button
                    type="submit"
                    className="group/btn inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#13233F] px-6 py-3.5 font-[family-name:var(--font-poppins)] text-[13px] font-bold text-white transition-colors duration-300 hover:bg-[#C0272D] sm:w-auto sm:text-[13.5px]"
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