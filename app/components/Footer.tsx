"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
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
type LangCode = "EN" | "AR";

const LOGO_IMAGE = "/logo-Boyot-1.png";

const TEXT = {
  EN: {
    tagline:
      "Every journey begins with a single step. Take yours with BOYUT AL-KAWTHAR, your trusted partner in global expansion. Together, let\u2019s write a story of unbridled growth, where boundaries fade, and dreams take flight.",
    aboutUsTitle: "About Us",
    aboutLinks: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about-us" },
      { label: "Our Services", href: "/services" },
      { label: "Our News", href: "/news" },
      { label: "Our Blog", href: "/blog" },
      { label: "Contact Us", href: "/contact" },
    ],
    mainServicesTitle: "Main Services",
    mainServices: [
      { label: "Market Research", href: "/services" },
      { label: "Distributor Finder", href: "/services" },
      { label: "Lead Generation", href: "/services" },
      { label: "Trade Missions", href: "/services" },
      { label: "Pricing Strategy", href: "/services" },
      { label: "Banking Report", href: "/services" },
    ],
    contactAddress:
      "4329 Ibrahim Ibn Baz st., Al Sulay District, Riyadh 14276, Saudi Arabia.",
    emailLabel: "Email Us",
    emailValue: "Info@bk.com.sa",
    phoneLabel: "Call Us",
    phoneValue: "+966538597719",
    copyright: "© 2025 Boyut Al Kawthar. All rights reserved.",
  },
  AR: {
    tagline:
      "كل رحلة تبدأ بخطوة واحدة. ابدأ خطوتك مع بيوت الكوثر، شريكك الموثوق في التوسع العالمي. معًا، لنكتب قصة نمو لا حدود لها، حيث تتلاشى الحدود وتنطلق الأحلام.",
    aboutUsTitle: "من نحن",
    aboutLinks: [
      { label: "الرئيسية", href: "/" },
      { label: "من نحن", href: "/about-us" },
      { label: "خدماتنا", href: "/services" },
      { label: "أخبارنا", href: "/news" },
      { label: "مدونتنا", href: "/blog" },
      { label: "اتصل بنا", href: "/contact" },
    ],
    mainServicesTitle: "الخدمات الرئيسية",
    mainServices: [
      { label: "بحوث السوق", href: "/services" },
      { label: "البحث عن الموزعين", href: "/services" },
      { label: "توليد العملاء المحتملين", href: "/services" },
      { label: "البعثات التجارية", href: "/services" },
      { label: "استراتيجية التسعير", href: "/services" },
      { label: "التقرير المصرفي", href: "/services" },
    ],
    contactAddress:
      "4329 شارع إبراهيم بن باز، حي السلي، الرياض 14276، المملكة العربية السعودية.",
    emailLabel: "راسلنا",
    emailValue: "Info@bk.com.sa",
    phoneLabel: "اتصل بنا",
    phoneValue: "+966538597719",
    copyright: "© 2025 بيوت الكوثر. جميع الحقوق محفوظة.",
  },
} as const;

// ✅ Real social links
const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "https://web.facebook.com/boyutalkawthar?_rdc=1&_rdr#",
    icon: "facebook",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/boyutalkawthar/",
    icon: "instagram",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/boyutalkawthar/",
    icon: "linkedin",
  },
  {
    label: "X",
    href: "https://x.com/boyutalkawthar",
    icon: "x",
  },
  {
    label: "Snapchat",
    href: "https://www.snapchat.com/add/baoyutalkawthar",
    icon: "snapchat",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/966538597719",
    icon: "whatsapp",
  },
];

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

/** SVG social icons */
function SocialIcon({ type }: { type: string }) {
  const common = {
    className: "h-4 w-4",
    fill: "currentColor",
    viewBox: "0 0 24 24",
  };

  switch (type) {
    case "facebook":
      return (
        <svg {...common}>
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
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
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "snapchat":
      return (
        <svg {...common}>
          <path d="M12.001 2c-3.314 0-6 2.686-6 6v2.5c0 .5-.2.9-.6 1.3-.3.3-1 .7-1.9 1l-.1.1c-.5.2-.7.6-.6 1.1.1.4.5.7 1 .8.5.1 1.2.3 1.5.6.4.4.4 1 .5 1.6.1.6.3 1.2.7 1.6.4.4 1 .6 1.9.6.7 0 1.5-.2 2.3-.2.9 0 1.6.6 2.1 1.1.4.4.7.5 1.1.5s.7-.1 1.1-.5c.5-.5 1.2-1.1 2.1-1.1.8 0 1.6.2 2.3.2.9 0 1.5-.2 1.9-.6.4-.4.6-1 .7-1.6.1-.6.1-1.2.5-1.6.3-.3 1-.5 1.5-.6.5-.1.9-.4 1-.8.1-.5-.1-.9-.6-1.1l-.1-.1c-.9-.3-1.6-.7-1.9-1-.4-.4-.6-.8-.6-1.3V8c0-3.314-2.686-6-6-6z" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg {...common}>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Footer() {
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

  const [footerRef, footerInView] = useInView<HTMLElement>(0.1);

  return (
    <footer
      ref={footerRef}
      dir={isAr ? "rtl" : "ltr"}
      className={`${playfair.variable} ${poppins.variable} w-full bg-[#13233F] text-white`}
    >
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-7 md:px-8 lg:px-10 lg:py-8">
        {/* Top grid */}
        <div
          className={[
            "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7",
            "transition-all duration-700 ease-out",
            footerInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
          ].join(" ")}
        >
          {/* Column 1 — Logo + Tagline */}
          <div className="sm:col-span-2 lg:col-span-1">
            {/* Logo */}
            <Link href="/" className="inline-block">
              <div className="relative h-12 w-40 sm:h-14 sm:w-48">
                <Image
                  src={LOGO_IMAGE}
                  alt="Boyut Al Kawthar"
                  fill
                  sizes="192px"
                  className="object-contain object-left rtl:object-right"
                  priority
                />
              </div>
            </Link>

            <span className="mt-2 block h-1 w-16 rounded-full bg-[#F5B301]" />

            <p className="mt-3 font-[family-name:var(--font-poppins)] text-[13px] font-light leading-relaxed text-white/70 sm:text-[13.5px]">
              {t.tagline}
            </p>
          </div>

          {/* Column 2 — About Us */}
          <div>
            <h4 className="font-[family-name:var(--font-playfair)] text-base font-extrabold text-white sm:text-lg">
              {t.aboutUsTitle}
            </h4>
            <span className="mt-2 block h-[3px] w-10 rounded-full bg-[#F5B301]" />

            <ul className="mt-3 space-y-1.5">
              {t.aboutLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group/link inline-flex items-center gap-2 font-[family-name:var(--font-poppins)] text-[13px] font-light text-white/70 transition-colors duration-300 hover:text-[#F5B301] sm:text-[13.5px]"
                  >
                    <span
                      className={`text-[#F5B301] transition-transform duration-300 ${
                        isAr
                          ? "group-hover/link:-translate-x-1"
                          : "group-hover/link:translate-x-1"
                      }`}
                    >
                      {isAr ? "←" : "→"}
                    </span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Main Services */}
          <div>
            <h4 className="font-[family-name:var(--font-playfair)] text-base font-extrabold text-white sm:text-lg">
              {t.mainServicesTitle}
            </h4>
            <span className="mt-2 block h-[3px] w-10 rounded-full bg-[#F5B301]" />

            <ul className="mt-3 space-y-1.5">
              {t.mainServices.map((service) => (
                <li key={service.label}>
                  <Link
                    href={service.href}
                    className="group/link inline-flex items-center gap-2 font-[family-name:var(--font-poppins)] text-[13px] font-light text-white/70 transition-colors duration-300 hover:text-[#F5B301] sm:text-[13.5px]"
                  >
                    <span
                      className={`text-[#F5B301] transition-transform duration-300 ${
                        isAr
                          ? "group-hover/link:-translate-x-1"
                          : "group-hover/link:translate-x-1"
                      }`}
                    >
                      {isAr ? "←" : "→"}
                    </span>
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Contact */}
          <div>
            <h4 className="font-[family-name:var(--font-playfair)] text-base font-extrabold text-white sm:text-lg">
              {t.emailLabel} / {t.phoneLabel}
            </h4>
            <span className="mt-2 block h-[3px] w-10 rounded-full bg-[#F5B301]" />

            <p className="mt-3 font-[family-name:var(--font-poppins)] text-[13px] font-light leading-relaxed text-white/70 sm:text-[13.5px]">
              {t.contactAddress}
            </p>

            <div className="mt-3 space-y-2.5">
              <a
                href={`mailto:${t.emailValue}`}
                className="group/contact flex items-start gap-3 transition-colors duration-300 hover:text-[#F5B301]"
              >
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F5B301] text-[12px] font-bold text-[#13233F]">
                  ✉
                </span>
                <span>
                  <span className="block font-[family-name:var(--font-poppins)] text-[11.5px] font-semibold uppercase tracking-wide text-[#F5B301] sm:text-[12px]">
                    {t.emailLabel}
                  </span>
                  <span className="block font-[family-name:var(--font-poppins)] text-[13px] font-light text-white/80 sm:text-[13.5px]">
                    {t.emailValue}
                  </span>
                </span>
              </a>

              <a
                href={`tel:${t.phoneValue}`}
                className="group/contact flex items-start gap-3 transition-colors duration-300 hover:text-[#F5B301]"
              >
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F5B301] text-[12px] font-bold text-[#13233F]">
                  ☎
                </span>
                <span>
                  <span className="block font-[family-name:var(--font-poppins)] text-[11.5px] font-semibold uppercase tracking-wide text-[#F5B301] sm:text-[12px]">
                    {t.phoneLabel}
                  </span>
                  <span
                    className="block font-[family-name:var(--font-poppins)] text-[13px] font-light text-white/80 sm:text-[13.5px]"
                    dir="ltr"
                  >
                    {t.phoneValue}
                  </span>
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar — Social + Copyright */}
        <div className="mt-6 border-t border-white/15 pt-4 sm:mt-7 sm:pt-4">
          <div
            className={[
              "flex flex-col items-center gap-3 sm:flex-row sm:justify-between",
              isAr ? "sm:flex-row-reverse" : "",
            ].join(" ")}
          >
            {/* Social links — real URLs + SVG icons */}
            <ul className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    title={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#F5B301] hover:text-[#13233F] sm:h-10 sm:w-10"
                  >
                    <SocialIcon type={social.icon} />
                  </a>
                </li>
              ))}
            </ul>

            {/* Copyright */}
            <p className="text-center font-[family-name:var(--font-poppins)] text-[11.5px] font-light text-white/60 sm:text-[12.5px]">
              {t.copyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}