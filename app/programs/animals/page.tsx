import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimalsDirectionsSection from "@/components/sections/AnimalsDirectionsSection";
import HelpBlockSection from "@/components/sections/HelpBlockSection";

export const metadata: Metadata = {
  title: "Помощь животным и приютам — БФ Стивена Сигала",
  description:
    "Многие животные оказываются на улице после того, как их бросают хозяева, теряют или оставляют без присмотра. Фонд помогает приютам обеспечивать животных питанием, лечением и уходом, пока для них не найдётся новый дом.",
  openGraph: {
    locale: "ru_RU",
    type: "website",
  },
};

const PROGRAMS_FOR_DONATION = [
  { id: "svo", label: "Поддержка участников СВО, ветеранов и их семей" },
  { id: "children", label: "Лечение детей с тяжёлыми заболеваниями" },
  {
    id: "elderly",
    label: "Помощь пенсионерам, которым особенно важна забота",
  },
  { id: "animals", label: "Помощь животным и приютам" },
  { id: "general", label: "Поддержка фонда в целом" },
];

export default function AnimalsPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero + описание */}
        <section className="relative overflow-hidden bg-neutral-50 py-16">

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
              <Link
                href="/programs"
                className="transition-colors hover:text-brand-black"
              >
                Направления
              </Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page" className="text-brand-black">
                Помощь животным
              </span>
            </nav>

            <h1 className="max-w-4xl break-words text-[clamp(2rem,5.5vw,4rem)] font-medium leading-[1.05] tracking-[-0.03em] text-brand-black">
              Помощь животным и приютам
            </h1>

            <div className="mt-6 max-w-4xl space-y-4 sm:mt-8">
              <p className="text-base leading-relaxed text-neutral-800 sm:text-lg lg:text-xl">
                Многие животные оказываются на улице после того, как их бросают
                хозяева, теряют или оставляют без присмотра. Для одних приют
                становится временным домом, для других единственным местом, где
                они могут получить питание, уход и необходимую помощь. Но приюты
                нередко переполнены, а средств на содержание всех подопечных не
                хватает.
              </p>

              <p className="text-base leading-relaxed text-neutral-800 sm:text-lg lg:text-xl">
                Забота о животных требует ежедневных расходов. Необходимо
                регулярно закупать корм и средства гигиены, поддерживать
                помещения в чистоте и обеспечивать комфортные условия. Отдельная
                статья расходов связана с ветеринарной помощью. Многие животные
                поступают в приюты с травмами, истощением и заболеваниями,
                требующими обследований, лечения и длительного восстановления.
              </p>
            </div>
          </div>
        </section>

        {/* Направления программы */}
        <AnimalsDirectionsSection />

        {/* Форма доната с предзаполненным направлением и уникальным сообщением об успехе */}
        <HelpBlockSection
          introText="Для поддержки этого направления заполните форму обратной связи, указав в анкете название программы «Помощь животным и приютам»."
          programs={PROGRAMS_FOR_DONATION}
          defaultProgramId="animals"
          successByProgramId={{
            animals: {
              title: "Спасибо за вашу поддержку!",
              description:
                "Ваше пожертвование направлено на помощь животным и приютам.",
            },
          }}
        />
      </main>
      <Footer />
    </>
  );
}