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

type LangCode = "EN" | "AR";

interface DropdownLink {
  label: string;
  labelAr: string;
  href: string;
  highlight?: boolean;
}

interface NavItem {
  label: string;
  labelAr: string;
  href: string;
  dropdown?: DropdownLink[];
}

interface Language {
  code: LangCode;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", labelAr: "الرئيسية", href: "/" },
  {
    label: "About Us",
    labelAr: "من نحن",
    href: "/about-us",
  },
  {
    label: "Services",
    labelAr: "الخدمات",
    href: "/services",
    dropdown: [
      { label: "All Services", labelAr: "جميع الخدمات", href: "/services", highlight: true },
      { label: "Pricing Strategy", labelAr: "استراتيجية التسعير", href: "/services" },
      { label: "Market Research", labelAr: "أبحاث السوق", href: "/services" },
      { label: "Shipping & Logistics", labelAr: "الشحن والخدمات اللوجستية", href: "/services" },
      { label: "Distributor Finder", labelAr: "البحث عن موزع", href: "/services" },
      { label: "Banking Support", labelAr: "الدعم المصرفي", href: "/services" },
      { label: "Lead Generation", labelAr: "توليد العملاء المحتملين", href: "/services" },
      { label: "Certification Support", labelAr: "دعم الشهادات", href: "/services" },
      { label: "Trade Missions", labelAr: "البعثات التجارية", href: "/services" },
    ],
  },
  { label: "News", labelAr: "الأخبار", href: "/news" },
  { label: "Blog", labelAr: "المدونة", href: "/blog" },
  { label: "Contact Us", labelAr: "اتصل بنا", href: "/contact" },
];

const LANGUAGES: Language[] = [
  { code: "EN", label: "English" },
  { code: "AR", label: "العربية" },
];

const UI_TEXT = {
  contactUs: { EN: "Contact Us", AR: "اتصل بنا" },
  openMenu: { EN: "Open menu", AR: "فتح القائمة" },
  closeMenu: { EN: "Close menu", AR: "إغلاق القائمة" },
};

const LANG_STORAGE_KEY = "bk-lang";

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

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lang, setLang] = useState<Language>(() => {
    // ✅ Read from localStorage in initializer (avoids setState-in-effect warning)
    if (typeof window === "undefined") return LANGUAGES[0];
    const saved = window.localStorage.getItem(LANG_STORAGE_KEY) as LangCode | null;
    if (saved === "AR" || saved === "EN") {
      return LANGUAGES.find((l) => l.code === saved) || LANGUAGES[0];
    }
    return LANGUAGES[0];
  });
  const [langOpen, setLangOpen] = useState(false);
  const [activePath, setActivePath] = useState("/");

  const isAr = lang.code === "AR";

  useEffect(() => {
    document.documentElement.dir = lang.code === "AR" ? "rtl" : "ltr";
    document.documentElement.lang = lang.code === "AR" ? "ar" : "en";
    window.localStorage.setItem(LANG_STORAGE_KEY, lang.code);
    window.dispatchEvent(new CustomEvent("bk-lang-change", { detail: lang.code }));
  }, [lang]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  return (
    <div className={`${playfair.variable} ${poppins.variable} fixed inset-x-0 top-0 z-50`}>
      {/* Navbar wrapper — px-3 on mobile to give left/right gap */}
      <div className="px-3 pt-3 sm:px-4 sm:pt-4">
        <nav
          className={[
            "mx-auto flex max-w-6xl items-center justify-between",
            "rounded-full border border-black/5 bg-white/95 px-4 py-2.5 backdrop-blur-md sm:px-6 sm:py-3",
            "transition-shadow duration-300",
            scrolled ? "shadow-lg shadow-[#13233F]/10" : "shadow-sm",
          ].join(" ")}
        >
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-2.5 cursor-pointer">
            <span className="flex flex-col leading-tight">
              <span className="font-[family-name:var(--font-playfair)] text-[14px] font-extrabold tracking-wide text-[#13233F] sm:text-[16px]">
                BOYUT AL-KAWTHAR
              </span>
              <span className="font-[family-name:var(--font-poppins)] text-[8.5px] font-light tracking-wide text-neutral-500 sm:text-[9px]">
                {isAr ? "تجارة عالمية . خبرة محلية" : "Global Trade . Local Expertise."}
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
                      isActive ? "text-[#F5B301]" : "text-[#13233F] hover:text-[#C0272D]",
                    ].join(" ")}
                  >
                    {isAr ? item.labelAr : item.label}
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
                          "rounded-3xl border border-black/5 bg-white p-5 shadow-xl shadow-[#13233F]/10",
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
                                : "text-[#13233F] hover:bg-[#13233F]/5 hover:text-[#C0272D]",
                            ].join(" ")}
                          >
                            {isAr ? link.labelAr : link.label}
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
                className="flex items-center gap-1.5 rounded-full px-3 py-2 font-[family-name:var(--font-poppins)] text-[14px] font-medium text-[#13233F] transition-colors hover:bg-[#13233F]/5 cursor-pointer"
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
                <div className="w-36 rounded-2xl border border-black/5 bg-white p-2 shadow-xl shadow-[#13233F]/10">
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      type="button"
                      onClick={() => setLang(l)}
                      className={[
                        "block w-full rounded-full px-3 py-2 text-left font-[family-name:var(--font-poppins)] text-[13.5px] transition-colors cursor-pointer",
                        l.code === lang.code
                          ? "bg-[#13233F]/5 font-semibold text-[#13233F]"
                          : "text-[#13233F] hover:bg-[#13233F]/5 hover:text-[#C0272D]",
                      ].join(" ")}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA — Contact Us */}
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-[#13233F] px-6 py-2.5 font-[family-name:var(--font-poppins)] text-[14px] font-semibold text-white transition-colors hover:bg-[#C0272D] cursor-pointer"
            >
              {isAr ? UI_TEXT.contactUs.AR : UI_TEXT.contactUs.EN}
              <span className="transition-transform group-hover:translate-x-1">
                {isAr ? "←" : "→"}
              </span>
            </Link>
          </div>

          {/* Mobile right side — Language toggle + Hamburger */}
          <div className="flex items-center gap-1.5 lg:hidden">
            <button
              type="button"
              onClick={() => setLang(lang.code === "EN" ? LANGUAGES[1] : LANGUAGES[0])}
              className="flex items-center gap-1 rounded-full border border-black/10 px-2.5 py-1.5 font-[family-name:var(--font-poppins)] text-[11.5px] font-medium text-[#13233F] transition-colors hover:bg-[#13233F]/5 cursor-pointer"
            >
              <GlobeIcon />
              {lang.code}
            </button>

            <button
              type="button"
              aria-label={isAr ? UI_TEXT.openMenu.AR : UI_TEXT.openMenu.EN}
              onClick={() => setMobileOpen(true)}
              className="flex flex-col gap-1.5 rounded-full p-2 cursor-pointer"
            >
              <span className="h-0.5 w-5 rounded-full bg-[#13233F]" />
              <span className="h-0.5 w-5 rounded-full bg-[#13233F]" />
              <span className="h-0.5 w-5 rounded-full bg-[#13233F]" />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile overlay */}
      <div
        onClick={() => setMobileOpen(false)}
        className={[
          "fixed inset-0 z-[60] bg-[#13233F]/40 transition-opacity duration-300 lg:hidden cursor-pointer",
          mobileOpen ? "visible opacity-100" : "invisible opacity-0",
        ].join(" ")}
      />

      {/* Mobile drawer */}
      <aside
        className={[
          "fixed top-0 z-[70] flex h-full w-[290px] flex-col rounded-l-[28px]",
          "bg-white p-6 shadow-2xl transition-transform duration-300 lg:hidden",
          isAr ? "left-0 rounded-r-[28px] rounded-l-none" : "right-0",
          mobileOpen
            ? "translate-x-0"
            : isAr
            ? "-translate-x-full"
            : "translate-x-full",
        ].join(" ")}
      >
        <div className="mb-6 flex items-center justify-between">
          <span className="font-[family-name:var(--font-playfair)] text-[14px] font-extrabold text-[#13233F]">
            BOYUT AL-KAWTHAR
          </span>
          <button
            type="button"
            aria-label={isAr ? UI_TEXT.closeMenu.AR : UI_TEXT.closeMenu.EN}
            onClick={() => setMobileOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#13233F] hover:bg-[#13233F]/5 cursor-pointer"
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
                    ? "bg-[#F5B301]/10 text-[#F5B301]"
                    : "text-[#13233F] hover:bg-[#13233F]/5",
                ].join(" ")}
              >
                {isAr ? item.labelAr : item.label}
              </Link>

              {item.dropdown && (
                <ul className="ml-3 mt-1 flex flex-col gap-0.5 border-l border-[#13233F]/10 pl-3 rtl:ml-0 rtl:mr-3 rtl:border-l-0 rtl:border-r rtl:pl-0 rtl:pr-3">
                  {item.dropdown.map((sub) => (
                    <li key={sub.label}>
                      <Link
                        href={sub.href}
                        onClick={() => {
                          setActivePath(sub.href);
                          setMobileOpen(false);
                        }}
                        className="block rounded-full px-3 py-2 font-[family-name:var(--font-poppins)] text-[12.5px] text-[#5C5C5C] transition-colors hover:bg-[#13233F]/5 hover:text-[#C0272D] cursor-pointer"
                      >
                        {isAr ? sub.labelAr : sub.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-col gap-3">
          <Link
            href="/contact"
            className="flex items-center justify-center gap-2 rounded-full bg-[#13233F] px-6 py-3 font-[family-name:var(--font-poppins)] text-[14px] font-semibold text-white transition-colors hover:bg-[#C0272D] cursor-pointer"
          >
            {isAr ? UI_TEXT.contactUs.AR : UI_TEXT.contactUs.EN}
            <span>{isAr ? "←" : "→"}</span>
          </Link>
        </div>
      </aside>
    </div>
  );
}