import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ElderlyDirectionsSection from "@/components/sections/ElderlyDirectionsSection";
import HelpBlockSection from "@/components/sections/HelpBlockSection";

export const metadata: Metadata = {
  title:
    "Помощь пенсионерам, которым особенно важна забота — БФ Стивена Сигала",
  description:
    "Небольшой пенсии не хватает даже на самое необходимое: полноценное питание, лекарства, средства личной гигиены и товары для дома. Фонд помогает пожилым людям с медицинскими расходами и материальной поддержкой.",
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

export default function ElderlyPage() {
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
                Помощь пенсионерам
              </span>
            </nav>

            <h1 className="max-w-5xl break-words text-[clamp(2rem,5.5vw,4rem)] font-medium leading-[1.05] tracking-[-0.03em] text-brand-black">
              Помощь пенсионерам, которым особенно важна забота
            </h1>

            <div className="mt-6 max-w-3xl space-y-4 sm:mt-8">
              <p className="text-base leading-relaxed text-neutral-800 sm:text-lg lg:text-xl">
                Небольшой пенсии не хватает даже на самое необходимое:
                полноценное питание, лекарства, средства личной гигиены и
                товары для дома. Особенно тяжело приходится тем, кто живёт один
                и не может рассчитывать на регулярную помощь детей и
                родственников.
              </p>

              <p className="text-base leading-relaxed text-neutral-800 sm:text-lg lg:text-xl">
                С возрастом потребность в медицинской помощи возрастает.
                Сердечно-сосудистые заболевания, сахарный диабет, болезни
                суставов и другие хронические состояния требуют постоянного
                наблюдения, приёма препаратов и использования медицинских
                изделий. Для пенсионеров с ограниченными доходами такие расходы
                могут стать серьёзной финансовой нагрузкой.
              </p>
            </div>
          </div>
        </section>

        {/* Направления программы */}
        <ElderlyDirectionsSection />

        {/* Форма доната с предзаполненным направлением и уникальным сообщением об успехе */}
        <HelpBlockSection
          introText="Для поддержки этого направления заполните форму обратной связи, указав в анкете название программы «Помощь пенсионерам, которым особенно важна забота»."
          programs={PROGRAMS_FOR_DONATION}
          defaultProgramId="elderly"
          successByProgramId={{
            elderly: {
              title: "Спасибо за вашу поддержку!",
              description:
                "Ваше пожертвование направлено на помощь пенсионерам, которым особенно важна забота.",
            },
          }}
        />
      </main>
      <Footer />
    </>
  );
}