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
type LangCode = "EN" | "AR" | "FR";

// Same subtle background photo used behind the "Who We Are" section
const BG_IMAGE =
  "https://images.unsplash.com/photo-1759272840712-c7e5ea852367?fm=jpg&q=80&w=2400&auto=format&fit=crop";

const TEXT = {
  EN: {
    heading: "Our Values",
    paragraph:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using is that it has a more-or-less normal.",
    values: [
      {
        title: "Integrity",
        desc: "We operate with absolute honesty and transparency. We build trust with our partners, ensuring every interaction is grounded in ethical principles.",
      },
      {
        title: "Innovation",
        desc: "We challenge the status quo and drive innovation. We leverage cutting-edge technology and creative strategies to enhance your export experience.",
      },
      {
        title: "Partnership",
        desc: "We don\u2019t just serve clients; we forge partnerships. We collaborate closely, providing personalized support and guidance.",
      },
      {
        title: "Excellence",
        desc: "We relentlessly pursue excellence in everything we do. We continuously improve and adapt, ensuring our services meet your evolving needs.",
      },
    ],
  },
  AR: {
    heading: "قيمنا",
    paragraph:
      "من الحقائق الراسخة أن القارئ يتشتت انتباهه بسبب المحتوى المقروء لصفحة ما عند النظر إلى تصميمها. الفكرة من استخدام هذا النص هي أنه يحمل توزيعًا طبيعيًا نوعًا ما.",
    values: [
      {
        title: "النزاهة",
        desc: "نعمل بصدق وشفافية مطلقة. نبني الثقة مع شركائنا، ونضمن أن كل تعامل يقوم على مبادئ أخلاقية راسخة.",
      },
      {
        title: "الابتكار",
        desc: "نتحدى الوضع الراهن ونقود الابتكار. نستفيد من أحدث التقنيات والاستراتيجيات الإبداعية لتعزيز تجربتك التصديرية.",
      },
      {
        title: "الشراكة",
        desc: "نحن لا نخدم العملاء فحسب، بل نبني شراكات حقيقية. نتعاون عن قرب، ونقدم دعمًا وإرشادًا مخصصًا.",
      },
      {
        title: "التميز",
        desc: "نسعى بلا كلل للتميز في كل ما نقوم به. نطور ونتكيف باستمرار لضمان أن خدماتنا تلبي احتياجاتكم المتغيرة.",
      },
    ],
  },
  FR: {
    heading: "Nos valeurs",
    paragraph:
      "C'est un fait bien établi qu'un lecteur sera distrait par le contenu lisible d'une page lorsqu'il regarde sa mise en page. L'intérêt d'utiliser ce texte est qu'il présente une répartition plus ou moins normale.",
    values: [
      {
        title: "Intégrité",
        desc: "Nous opérons avec une honnêteté et une transparence absolues. Nous bâtissons la confiance avec nos partenaires, en veillant à ce que chaque interaction repose sur des principes éthiques.",
      },
      {
        title: "Innovation",
        desc: "Nous remettons en question le statu quo et stimulons l'innovation. Nous exploitons les technologies de pointe et des stratégies créatives pour améliorer votre expérience d'exportation.",
      },
      {
        title: "Partenariat",
        desc: "Nous ne servons pas seulement des clients ; nous forgeons des partenariats. Nous collaborons étroitement en offrant un soutien et des conseils personnalisés.",
      },
      {
        title: "Excellence",
        desc: "Nous recherchons sans relâche l'excellence dans tout ce que nous faisons. Nous nous améliorons et nous nous adaptons continuellement pour répondre à vos besoins évolutifs.",
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

/** Reveals an element once it scrolls into view; fires only the first time. */
function useInView<T extends HTMLElement>(threshold = 0.2) {
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

// Real images from /public/about — v1 for card 1 & 3, v2 for card 2, v3 for card 4
const VALUE_IMAGES = ["/about/v1.png", "/about/v2.png", "/about/v1.png", "/about/v3.png"];

// Progressive vertical offsets to recreate the reference's staircase layout (desktop only)
const OFFSETS = ["lg:mt-0", "lg:mt-16", "lg:mt-24", "lg:mt-32"];

export default function OurValuesSection() {
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

  const [headingRef, headingInView] = useInView<HTMLDivElement>(0.4);
  const [cardsRef, cardsInView] = useInView<HTMLDivElement>(0.1);

  return (
    <section
      dir={isAr ? "rtl" : "ltr"}
      className={`${playfair.variable} ${poppins.variable} relative w-full overflow-hidden bg-white py-10`}
    >
      {/* Subtle decorative background image — same as WhoWeAreSection */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        <Image src={BG_IMAGE} alt="" fill className="object-cover opacity-[0.07]" aria-hidden="true" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 md:px-8 lg:px-10">
        {/* Heading + intro */}
        <div
          ref={headingRef}
          className={[
            "max-w-2xl",
            "transition-all duration-700 ease-out",
            headingInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
          ].join(" ")}
        >
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-extrabold text-[#3EA96E] sm:text-4xl">
            {t.heading}
          </h2>
          <div className="mt-3 h-1 w-16 rounded-full bg-[#3EA96E] sm:mt-4 sm:w-20" />
          <p className="mt-4 font-[family-name:var(--font-poppins)] text-[13.5px] font-light leading-relaxed text-[#5C5C5C] sm:mt-5 sm:text-[14px] md:text-[15px]">
            {t.paragraph}
          </p>
        </div>

        {/* Staircase cards */}
        <div
          ref={cardsRef}
          className="mt-12 grid grid-cols-1 items-start gap-6 sm:mt-14 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-5"
        >
          {t.values.map((value, i) => {
            return (
              <article
                key={value.title}
                style={{ transitionDelay: `${i * 120}ms` }}
                className={[
                  "group/card relative flex cursor-pointer flex-col overflow-hidden rounded-[1.75rem] bg-white p-5 shadow-lg shadow-[#0F3327]/10 ring-1 ring-[#0F3327]/5 sm:p-6",
                  OFFSETS[i],
                  "transition-all duration-700 ease-out hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#0F3327]/15",
                  cardsInView ? "translate-y-0 opacity-100" : "translate-y-14 opacity-0",
                ].join(" ")}
              >
                {/* Image on top */}
                <div className="relative h-32 w-full overflow-hidden rounded-2xl sm:h-36">
                  <Image
                    src={VALUE_IMAGES[i]}
                    alt={value.title}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover/card:scale-105"
                  />
                </div>

                <div className="relative mt-5 flex items-baseline gap-1.5">
                  <span className="font-[family-name:var(--font-playfair)] text-lg font-extrabold text-[#3EA96E]">
                    {String(i + 1).padStart(2, "0")}.
                  </span>
                  <h4 className="font-[family-name:var(--font-playfair)] text-lg font-extrabold leading-snug text-[#0F3327] sm:text-xl">
                    {value.title}
                  </h4>
                </div>

                <p className="relative mt-3 font-[family-name:var(--font-poppins)] text-[13px] font-light leading-relaxed text-[#5C5C5C] sm:text-[13.5px]">
                  {value.desc}
                </p>

                {/* Big faded number, bottom-right */}
                <span
                  aria-hidden="true"
                  className={[
                    "pointer-events-none absolute -bottom-3 select-none font-[family-name:var(--font-playfair)] text-[80px] font-extrabold leading-none text-[#0F3327]/[0.06] sm:text-[96px]",
                    isAr ? "-left-2" : "-right-2",
                  ].join(" ")}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}