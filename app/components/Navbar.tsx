"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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

type LangCode = "EN" | "AR" | "FR";

interface DropdownLink {
  label: string;
  labelAr: string;
  labelFr: string;
  href: string;
  highlight?: boolean;
}

interface NavItem {
  label: string;
  labelAr: string;
  labelFr: string;
  href: string;
  dropdown?: DropdownLink[];
}

interface Language {
  code: LangCode;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", labelAr: "الرئيسية", labelFr: "Accueil", href: "/" },
  {
    label: "About Us",
    labelAr: "من نحن",
    labelFr: "À propos",
    href: "/about-us",
  },
  {
    label: "Services",
    labelAr: "الخدمات",
    labelFr: "Services",
    href: "/services",
    dropdown: [
      { label: "All Services", labelAr: "جميع الخدمات", labelFr: "Tous les services", href: "/services", highlight: true },
      { label: "Pricing Strategy", labelAr: "استراتيجية التسعير", labelFr: "Stratégie de prix", href: "/services" },
      { label: "Market Research", labelAr: "أبحاث السوق", labelFr: "Étude de marché", href: "/services" },
      { label: "Shipping & Logistics", labelAr: "الشحن والخدمات اللوجستية", labelFr: "Expédition et logistique", href: "/services" },
      { label: "Distributor Finder", labelAr: "البحث عن موزع", labelFr: "Recherche de distributeur", href: "/services" },
      { label: "Banking Support", labelAr: "الدعم المصرفي", labelFr: "Support bancaire", href: "/services" },
      { label: "Lead Generation", labelAr: "توليد العملاء المحتملين", labelFr: "Génération de prospects", href: "/services" },
      { label: "Certification Support", labelAr: "دعم الشهادات", labelFr: "Support de certification", href: "/services" },
      { label: "Trade Missions", labelAr: "البعثات التجارية", labelFr: "Missions commerciales", href: "/services" },
    ],
  },
  { label: "News", labelAr: "الأخبار", labelFr: "Actualités", href: "/news" },
  { label: "Blog", labelAr: "المدونة", labelFr: "Blog", href: "/blog" },
  { label: "Contact Us", labelAr: "اتصل بنا", labelFr: "Contactez-nous", href: "/contact" },
];

const LANGUAGES: Language[] = [
  { code: "EN", label: "English" },
  { code: "AR", label: "العربية" },
  { code: "FR", label: "Français" },
];

const UI_TEXT = {
  becomePartner: {
    EN: "Become a Partner",
    AR: "كن شريكًا",
    FR: "Devenir partenaire",
  },
  openMenu: { EN: "Open menu", AR: "فتح القائمة", FR: "Ouvrir le menu" },
  closeMenu: { EN: "Close menu", AR: "إغلاق القائمة", FR: "Fermer le menu" },
};

const LANG_STORAGE_KEY = "bk-lang";
const PARTNER_HREF = "/become-a-partner";

function GlobeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M3 12h18M12 3c2.5 2.5 3.8 5.6 3.8 9S14.5 18.5 12 21c-2.5-2.5-3.8-5.6-3.8-9S9.5 5.5 12 3z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Returns the correct label based on current language */
function getLabel(item: { label: string; labelAr: string; labelFr: string }, code: LangCode) {
  if (code === "AR") return item.labelAr;
  if (code === "FR") return item.labelFr;
  return item.label;
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window === "undefined") return LANGUAGES[0];
    const saved = window.localStorage.getItem(LANG_STORAGE_KEY) as LangCode | null;
    if (saved === "AR" || saved === "EN" || saved === "FR") {
      return LANGUAGES.find((l) => l.code === saved) || LANGUAGES[0];
    }
    return LANGUAGES[0];
  });
  const [langOpen, setLangOpen] = useState(false);
  const [activePath, setActivePath] = useState("/");

  const isAr = lang.code === "AR";
  const isFr = lang.code === "FR";

  // RTL only for Arabic
  const isRtl = isAr;

  useEffect(() => {
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
    document.documentElement.lang = lang.code.toLowerCase();
    window.localStorage.setItem(LANG_STORAGE_KEY, lang.code);
    window.dispatchEvent(new CustomEvent("bk-lang-change", { detail: lang.code }));
  }, [lang, isRtl]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  /** Cycle through languages: EN → AR → FR → EN */
  const cycleLanguage = () => {
    const currentIndex = LANGUAGES.findIndex((l) => l.code === lang.code);
    const nextIndex = (currentIndex + 1) % LANGUAGES.length;
    setLang(LANGUAGES[nextIndex]);
  };

  return (
    <div className={`${playfair.variable} ${poppins.variable} fixed inset-x-0 top-0 z-50`}>
      {/* Navbar wrapper — px-3 on mobile to give left/right gap */}
      <div className="px-3 pt-3 sm:px-4 sm:pt-4">
        <nav
          className={[
            "mx-auto flex max-w-6xl items-center justify-between",
            "rounded-full border border-black/5 bg-white/95 px-4 py-2.5 backdrop-blur-md sm:px-6 sm:py-3",
            "transition-shadow duration-300",
            scrolled ? "shadow-lg shadow-[#1B4D3E]/10" : "shadow-sm",
          ].join(" ")}
        >
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-2.5 cursor-pointer">
            <span className="flex flex-col leading-tight">
              <span className="font-[family-name:var(--font-playfair)] text-[14px] font-extrabold tracking-wide text-[#1B4D3E] sm:text-[16px]">
                BOYUT AL-KAWTHAR
              </span>
              <span className="font-[family-name:var(--font-poppins)] text-[8.5px] font-light tracking-wide text-neutral-500 sm:text-[9px]">
                {isAr
                  ? "تجارة عالمية . خبرة محلية"
                  : isFr
                  ? "Commerce mondial . Expertise locale."
                  : "Global Trade . Local Expertise."}
              </span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden items-center gap-8 lg:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = activePath === item.href;
              return (
                <li key={item.label} className="group relative">
                  <Link
                    href={item.href}
                    onClick={() => setActivePath(item.href)}
                    className={[
                      "font-[family-name:var(--font-playfair)] text-[14.5px] font-bold transition-colors cursor-pointer",
                      isActive ? "text-[#3EA96E]" : "text-[#1B4D3E] hover:text-[#C0272D]",
                    ].join(" ")}
                  >
                    {getLabel(item, lang.code)}
                  </Link>

                  {item.dropdown && (
                    <div
                      className={[
                        "invisible absolute left-1/2 top-full z-50 -translate-x-1/2 translate-y-3 opacity-0",
                        "transition-all duration-150 ease-out",
                        "group-hover:visible group-hover:translate-y-2 group-hover:opacity-100",
                      ].join(" ")}
                    >
                      <div
                        className={[
                          "rounded-3xl border border-black/5 bg-white p-5 shadow-xl shadow-[#1B4D3E]/10",
                          item.dropdown.length > 4
                            ? "grid w-[420px] grid-cols-2 gap-x-8 gap-y-1"
                            : "flex w-52 flex-col gap-1",
                        ].join(" ")}
                      >
                        {item.dropdown.map((link) => (
                          <Link
                            key={link.label}
                            href={link.href}
                            className={[
                              "whitespace-nowrap rounded-full px-3 py-2 font-[family-name:var(--font-poppins)] text-[13.5px] transition-colors cursor-pointer",
                              link.highlight
                                ? "font-bold text-[#C0272D] hover:bg-[#C0272D]/5"
                                : "text-[#1B4D3E] hover:bg-[#1B4D3E]/5 hover:text-[#C0272D]",
                            ].join(" ")}
                          >
                            {getLabel(link, lang.code)}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Right side: language + CTA (desktop) */}
          <div className="hidden items-center gap-4 lg:flex">
            <div
              className="group relative"
              onMouseEnter={() => setLangOpen(true)}
              onMouseLeave={() => setLangOpen(false)}
            >
              <button
                type="button"
                className="flex items-center gap-1.5 rounded-full px-3 py-2 font-[family-name:var(--font-poppins)] text-[14px] font-medium text-[#1B4D3E] transition-colors hover:bg-[#1B4D3E]/5 cursor-pointer"
              >
                <GlobeIcon />
                {lang.code}
                <ChevronIcon open={langOpen} />
              </button>
              <div
                className={[
                  "invisible absolute right-0 top-full z-50 translate-y-2 opacity-0",
                  "transition-all duration-150 ease-out",
                  "group-hover:visible group-hover:translate-y-1 group-hover:opacity-100",
                ].join(" ")}
              >
                <div className="w-40 rounded-2xl border border-black/5 bg-white p-2 shadow-xl shadow-[#1B4D3E]/10">
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      type="button"
                      onClick={() => setLang(l)}
                      className={[
                        "flex w-full items-center justify-between rounded-full px-3 py-2 text-left font-[family-name:var(--font-poppins)] text-[13.5px] transition-colors cursor-pointer",
                        l.code === lang.code
                          ? "bg-[#1B4D3E]/5 font-semibold text-[#1B4D3E]"
                          : "text-[#1B4D3E] hover:bg-[#1B4D3E]/5 hover:text-[#C0272D]",
                      ].join(" ")}
                    >
                      <span>{l.label}</span>
                      <span className="text-[11px] font-bold text-[#5C5C5C]">{l.code}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA — Become a Partner (redirects to /become-a-partner) */}
            <Link
              href={PARTNER_HREF}
              className="group inline-flex items-center gap-2 rounded-full bg-[#1B4D3E] px-6 py-2.5 font-[family-name:var(--font-poppins)] text-[14px] font-semibold text-white transition-colors hover:bg-[#C0272D] cursor-pointer"
            >
              {UI_TEXT.becomePartner[lang.code]}
              <span className="transition-transform group-hover:translate-x-1">
                {isRtl ? "←" : "→"}
              </span>
            </Link>
          </div>

          {/* Mobile right side — Language toggle + Hamburger */}
          <div className="flex items-center gap-1.5 lg:hidden">
            <button
              type="button"
              onClick={cycleLanguage}
              className="flex items-center gap-1 rounded-full border border-black/10 px-2.5 py-1.5 font-[family-name:var(--font-poppins)] text-[11.5px] font-medium text-[#1B4D3E] transition-colors hover:bg-[#1B4D3E]/5 cursor-pointer"
            >
              <GlobeIcon />
              {lang.code}
            </button>

            <button
              type="button"
              aria-label={UI_TEXT.openMenu[lang.code]}
              onClick={() => setMobileOpen(true)}
              className="flex flex-col gap-1.5 rounded-full p-2 cursor-pointer"
            >
              <span className="h-0.5 w-5 rounded-full bg-[#1B4D3E]" />
              <span className="h-0.5 w-5 rounded-full bg-[#1B4D3E]" />
              <span className="h-0.5 w-5 rounded-full bg-[#1B4D3E]" />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile overlay */}
      <div
        onClick={() => setMobileOpen(false)}
        className={[
          "fixed inset-0 z-[60] bg-[#1B4D3E]/40 transition-opacity duration-300 lg:hidden cursor-pointer",
          mobileOpen ? "visible opacity-100" : "invisible opacity-0",
        ].join(" ")}
      />

      {/* Mobile drawer */}
      <aside
        className={[
          "fixed top-0 z-[70] flex h-full w-[290px] flex-col rounded-l-[28px]",
          "bg-white p-6 shadow-2xl transition-transform duration-300 lg:hidden",
          isRtl ? "left-0 rounded-r-[28px] rounded-l-none" : "right-0",
          mobileOpen
            ? "translate-x-0"
            : isRtl
            ? "-translate-x-full"
            : "translate-x-full",
        ].join(" ")}
      >
        <div className="mb-6 flex items-center justify-between">
          <span className="font-[family-name:var(--font-playfair)] text-[14px] font-extrabold text-[#1B4D3E]">
            BOYUT AL-KAWTHAR
          </span>
          <button
            type="button"
            aria-label={UI_TEXT.closeMenu[lang.code]}
            onClick={() => setMobileOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#1B4D3E] hover:bg-[#1B4D3E]/5 cursor-pointer"
          >
            ✕
          </button>
        </div>

        <ul className="flex flex-col gap-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                onClick={() => {
                  setActivePath(item.href);
                  setMobileOpen(false);
                }}
                className={[
                  "flex items-center justify-between rounded-full px-4 py-3 font-[family-name:var(--font-playfair)] text-[14.5px] font-bold transition-colors cursor-pointer",
                  activePath === item.href
                    ? "bg-[#3EA96E]/10 text-[#3EA96E]"
                    : "text-[#1B4D3E] hover:bg-[#1B4D3E]/5",
                ].join(" ")}
              >
                {getLabel(item, lang.code)}
              </Link>

              {item.dropdown && (
                <ul className="ml-3 mt-1 flex flex-col gap-0.5 border-l border-[#1B4D3E]/10 pl-3 rtl:ml-0 rtl:mr-3 rtl:border-l-0 rtl:border-r rtl:pl-0 rtl:pr-3">
                  {item.dropdown.map((sub) => (
                    <li key={sub.label}>
                      <Link
                        href={sub.href}
                        onClick={() => {
                          setActivePath(sub.href);
                          setMobileOpen(false);
                        }}
                        className="block rounded-full px-3 py-2 font-[family-name:var(--font-poppins)] text-[12.5px] text-[#5C5C5C] transition-colors hover:bg-[#1B4D3E]/5 hover:text-[#C0272D] cursor-pointer"
                      >
                        {getLabel(sub, lang.code)}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-col gap-3">
          {/* Mobile language switcher — all 3 options */}
          <div className="flex gap-1.5">
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                type="button"
                onClick={() => setLang(l)}
                className={[
                  "flex flex-1 items-center justify-center gap-1 rounded-full border px-2 py-2.5 font-[family-name:var(--font-poppins)] text-[12px] font-medium transition-colors cursor-pointer",
                  l.code === lang.code
                    ? "border-[#1B4D3E] bg-[#1B4D3E] text-white"
                    : "border-black/10 text-[#1B4D3E] hover:bg-[#1B4D3E]/5",
                ].join(" ")}
              >
                {l.code}
              </button>
            ))}
          </div>

          {/* CTA — Become a Partner (mobile) */}
          <Link
            href={PARTNER_HREF}
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center gap-2 rounded-full bg-[#1B4D3E] px-6 py-3 font-[family-name:var(--font-poppins)] text-[14px] font-semibold text-white transition-colors hover:bg-[#C0272D] cursor-pointer"
          >
            {UI_TEXT.becomePartner[lang.code]}
            <span>{isRtl ? "←" : "→"}</span>
          </Link>
        </div>
      </aside>
    </div>
  );
}