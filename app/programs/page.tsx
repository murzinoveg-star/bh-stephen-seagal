import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProgramsCardsSection from "@/components/sections/ProgramsCardsSection";
import HelpRequestSection from "@/components/sections/HelpRequestSection";

export const metadata: Metadata = {
  title: "Направления фонда — БФ Стивена Сигала",
  description:
    "Четыре ключевых направления работы фонда: поддержка участников СВО и их семей, лечение детей с тяжёлыми заболеваниями, помощь пожилым людям и приютам для животных.",
  openGraph: {
    locale: "ru_RU",
    type: "website",
  },
};

export default function ProgramsPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero секции страницы */}
        <section className="relative overflow-hidden bg-neutral-50 py-16">
          {/* Декоративная картинка — только на десктопе */}
          <div className="pointer-events-none absolute right-0 top-0 hidden w-[450px] translate-y-[40%] -translate-x-[25%] lg:block">
            <Image
              src="/infinity.png"
              alt=""
              width={900}
              height={900}
              className="h-auto w-full object-contain"
            />
          </div>

          {/* Контент */}
          <div className="relative mx-auto max-w-7xl px-2 sm:px-6 lg:px-10">
            <nav
              aria-label="Хлебные крошки"
              className="mb-6 flex items-center gap-2 text-xs text-neutral-600"
            >
              <Link
                href="/"
                className="transition-colors hover:text-brand-black"
              >
                Главная
              </Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page" className="text-brand-black">
                Направления
              </span>
            </nav>

            <h1 className="break-words text-[clamp(2rem,6vw,4.5rem)] font-medium leading-[1.05] tracking-[-0.03em] text-brand-black">
              Направления фонда
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-neutral-800 sm:mt-6 sm:text-lg lg:text-xl">
              Благотворительный фонд Стивена Сигала ведёт четыре программы, направленные на помощь людям и животным, оказавшимся в сложных жизненных обстоятельствах.
            </p>
          </div>
        </section>

        <ProgramsCardsSection showHeading={false} />
        <HelpRequestSection />
      </main>
      <Footer />
    </>
  );
}