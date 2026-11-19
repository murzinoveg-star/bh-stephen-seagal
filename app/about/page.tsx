import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProgramsCardsSection from "@/components/sections/ProgramsCardsSection";
import DocumentsSection from "@/components/sections/DocumentsSection";
import ContactsSection from "@/components/sections/ContactsSection";

export const metadata: Metadata = {
  title: "О фонде — БФ Стивена Сигала",
  description:
    "Благотворительный фонд Стивена Сигала — организация, созданная актёром и общественным деятелем Стивеном Сигалом совместно с предпринимателем Михаилом Замариным и адвокатом Дмитрием Евстигнеевым. Помогаем участникам СВО, детям с тяжёлыми заболеваниями, пожилым людям и приютам для животных.",
  openGraph: {
    locale: "ru_RU",
    type: "website",
  },
};

type IconProps = { size?: number };

// ─── Иконки для карточек форм поддержки ─────────────────────────────────

function IconShieldCheck({ size = 20 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function IconMedical({ size = 20 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6V3z" />
    </svg>
  );
}

function IconPackage({ size = 20 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 8l-9-5-9 5 9 5 9-5z" />
      <path d="M3 8v8l9 5 9-5V8" />
      <path d="M12 13v8" />
      <path d="M7.5 5.5l9 5" />
    </svg>
  );
}

function IconPaw({ size = 20 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="6" cy="10" r="1.8" />
      <circle cx="18" cy="10" r="1.8" />
      <circle cx="9" cy="5.5" r="1.8" />
      <circle cx="15" cy="5.5" r="1.8" />
      <path d="M7 14.5a5 5 0 0 1 10 0c0 1.5-1.2 2.7-2.7 2.7h-4.6A2.7 2.7 0 0 1 7 14.5z" />
    </svg>
  );
}

const SUPPORT_FORMS = [
  {
    id: "svo",
    text: "Организация психологических и юридических консультаций для участников и ветеранов СВО и их семей",
    Icon: IconShieldCheck,
  },
  {
    id: "medical",
    text: "Финансирование операций, медицинских процедур и лекарств для детей и пенсионеров с тяжёлыми заболеваниями",
    Icon: IconMedical,
  },
  {
    id: "elderly",
    text: "Обеспечение пожилых людей продуктами и товарами первой необходимости",
    Icon: IconPackage,
  },
  {
    id: "animals",
    text: "Финансирование ветеринарного лечения, закупка кормов и поддержка приютов для животных",
    Icon: IconPaw,
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero + вводный текст */}
        <section className="relative bg-neutral-50 py-16">
          <div className="relative mx-auto max-w-7xl px-2 sm:px-6 lg:px-10">
            <nav
              aria-label="Хлебные крошки"
              className="mb-6 flex flex-wrap items-center gap-2 text-xs text-neutral-600"
            >
              <Link
                href="/"
                className="transition-colors hover:text-brand-black"
              >
                Главная
              </Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page" className="text-brand-black">
                О фонде
              </span>
            </nav>

            <h1 className="break-words text-[clamp(2rem,6vw,4.5rem)] font-medium leading-[1.05] tracking-[-0.03em] text-brand-black">
              О фонде
            </h1>

            <div className="mt-6 grid gap-6 sm:mt-8 lg:grid-cols-2 lg:gap-10">
              <p className="text-base leading-relaxed text-neutral-800 sm:text-lg lg:text-xl">
                Благотворительный фонд Стивена Сигала — организация, созданная
                актёром и общественным деятелем Стивеном Сигалом совместно с
                членом генсовета «Деловой России», предпринимателем Михаилом
                Замариным и адвокатом Дмитрием Евстигнеевым. Она призвана
                обеспечить доступ к помощи людям, которые столкнулись с
                серьёзными жизненными трудностями и не могут справиться с ними
                самостоятельно.
              </p>
              <p className="text-base leading-relaxed text-neutral-800 sm:text-lg lg:text-xl">
                Деятельность организации охватывает четыре направления. Такой
                подход позволяет объединять благотворителей, которым близки
                разные сферы помощи. Каждый может выбрать значимый для себя
                проект и направить пожертвование на конкретные нужды.
              </p>
            </div>
          </div>
        </section>

        {/* Работа фонда + Миссия */}
        <section className="bg-neutral-50 py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
              {/* Левая колонка: формы поддержки */}
              <div>
                <h2 className="text-2xl font-semibold leading-snug text-brand-black sm:text-3xl">
                  Работа фонда охватывает несколько форм поддержки:
                </h2>

                <div className="mt-6 grid gap-4 sm:grid-cols-2 sm:gap-5">
                  {SUPPORT_FORMS.map(({ id, text, Icon }) => (
                    <article
                      key={id}
                      className="group flex flex-col rounded-3xl border border-neutral-200 bg-white p-5 transition-all duration-300 hover:border-brand-blue/20 hover:shadow-xl hover:shadow-brand-blue/5 sm:p-6"
                    >
                      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-blue/5 text-brand-blue">
                        <Icon size={20} />
                      </div>
                      <p className="text-sm leading-relaxed text-neutral-600">
                        {text}
                      </p>
                    </article>
                  ))}
                </div>
              </div>

              {/* Правая колонка: миссия */}
              <div
                className="relative flex flex-col justify-start overflow-hidden rounded-3xl p-6 sm:p-8 lg:p-10"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #08338f 30%, #00b8e0 100%)",
                }}
              >
                {/* Фоновое изображение: правый нижний угол, крупно, за контентом */}
                      <div className="pointer-events-none absolute hidden lg:block bottom-0 right-0 z-0 translate-x-[30%] translate-y-[50%] -scale-y-100">
                        <Image
                          src="/heart_dark.png"
                          alt=""
                          width={800}
                          height={800}
                          className="h-auto w-full object-contain"
                        />
                      </div>

                <div className="mb-4 flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white">
                    <svg
                      viewBox="0 0 24 24"
                      width={16}
                      height={16}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <circle cx="9" cy="12" r="6" />
                      <circle cx="15" cy="12" r="6" />
                    </svg>
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-white/90">
                    Наша миссия
                  </span>
                </div>
                <p className="text-lg leading-relaxed text-white sm:text-xl lg:text-2xl">
                  «Мы улучшаем качество жизни, возвращая людям и тем, кто им
                  дорог, уверенность в завтрашнем дне, веру в доброту и
                  справедливость».
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Карточки направлений — без изменений */}
        <ProgramsCardsSection />

        {/* Документы */}
        <DocumentsSection />

        {/* Контакты */}
        <ContactsSection />
      </main>
      <Footer />
    </>
  );
}