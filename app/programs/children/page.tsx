import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChildrenDirectionsSection from "@/components/sections/ChildrenDirectionsSection";
import HelpBlockSection from "@/components/sections/HelpBlockSection";

export const metadata: Metadata = {
  title: "Лечение детей с тяжёлыми заболеваниями — БФ Стивена Сигала",
  description:
    "Онкологические заболевания, тяжёлые врожденные и генетические патологии, нарушения работы нервной системы и опорно-двигательного аппарата нередко требуют длительного лечения, сложных операций и последующей реабилитации. Расходы на медицинскую помощь могут оказаться непосильными для семьи. Благотворительный фонд Стивена Сигала помогает детям с такими диагнозами.",
  openGraph: {
    locale: "ru_RU",
    type: "website",
  },
};

const PROGRAMS_FOR_DONATION = [
  { id: "svo", label: "Поддержка участников СВО, ветеранов и их семей" },
  {
    id: "children",
    label: "Лечение детей с тяжёлыми заболеваниями",
  },
  { id: "elderly", label: "Помощь пенсионерам, которым нужна забота" },
  { id: "animals", label: "Помощь животным и приютам" },
  { id: "general", label: "Поддержка фонда в целом" },
];

export default function ChildrenPage() {
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
                Лечение детей
              </span>
            </nav>

            <h1 className="max-w-5xl break-words text-[clamp(2rem,5.5vw,4rem)] font-medium leading-[1.05] tracking-[-0.03em] text-brand-black">
              Лечение детей с тяжёлыми заболеваниями
            </h1>

            <div className="mt-6 max-w-4xl space-y-4 sm:mt-8">
              <p className="text-base leading-relaxed text-neutral-800 sm:text-lg lg:text-xl">
                Онкологические заболевания, тяжёлые врожденные и генетические
                патологии, нарушения работы нервной системы и
                опорно-двигательного аппарата нередко требуют длительного
                лечения, сложных операций и последующей реабилитации. Расходы на
                медицинскую помощь могут оказаться непосильными для семьи.
              </p>

              <p className="text-base leading-relaxed text-neutral-800 sm:text-lg lg:text-xl">
                Благотворительный фонд Стивена Сигала помогает детям с такими
                диагнозами, а также с другими тяжёлыми заболеваниями,
                требующими дорогостоящего лечения. Мы стремимся сделать
                необходимую медицинскую помощь доступнее для семей, которые не
                могут самостоятельно покрыть все расходы.
              </p>
            </div>
          </div>
        </section>

        {/* Направления программы */}
        <ChildrenDirectionsSection />

        {/* Форма доната с предзаполненным направлением и уникальным сообщением об успехе */}
        <HelpBlockSection
          introText="Для поддержки этого направления заполните форму обратной связи, указав в анкете название программы «Лечение детей с тяжёлыми заболеваниями»."
          programs={PROGRAMS_FOR_DONATION}
          defaultProgramId="children"
          successByProgramId={{
            children: {
              title: "Спасибо за вашу поддержку!",
              description:
                "Ваше пожертвование направлено на помощь детям с тяжёлыми заболеваниями.",
            },
          }}
        />
      </main>
      <Footer />
    </>
  );
}