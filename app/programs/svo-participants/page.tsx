import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SvoDirectionsSection from "@/components/sections/SvoDirectionsSection";
import HelpBlockSection from "@/components/sections/HelpBlockSection";

export const metadata: Metadata = {
  title:
    "Поддержка участников СВО, ветеранов и их семей — БФ Стивена Сигала",
  description:
    "Тысячи участников СВО возвращаются к своим семьям и мирной жизни, хотя для многих становится нелегко привыкнуть к спокойному укладу. В этот момент важно поблагодарить их за подвиги, помочь адаптироваться и справиться с тяжёлыми воспоминаниями. Для этого благотворительный фонд Стивена Сигала создал программу поддержки ветеранов и участников, вернувшихся с боевых действий. Она включает в себя 2 направления.",
  openGraph: {
    locale: "ru_RU",
    type: "website",
  },
};

const PROGRAMS_FOR_DONATION = [
  {
    id: "svo",
    label: "Поддержка участников СВО, ветеранов и их семей",
  },
  { id: "children", label: "Лечение детей с тяжёлыми заболеваниями" },
  { id: "elderly", label: "Помощь пенсионерам, которым нужна забота" },
  { id: "animals", label: "Помощь животным и приютам" },
  { id: "general", label: "Поддержка фонда в целом" },
];

export default function SvoParticipantsPage() {
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
                Поддержка участников СВО
              </span>
            </nav>

            <h1 className="max-w-4xl break-words text-[clamp(2rem,5.5vw,4rem)] font-medium leading-[1.05] tracking-[-0.03em] text-brand-black">
              Поддержка участников СВО, ветеранов и их семей
            </h1>

            <div className="mt-6 max-w-3xl space-y-4 sm:mt-8">
              <p className="text-base leading-relaxed text-neutral-800 sm:text-lg lg:text-xl">
                Тысячи участников СВО возвращаются к своим семьям и мирной
                жизни, хотя для многих становится нелегко привыкнуть к
                спокойному укладу. В этот момент важно поблагодарить их за
                подвиги, помочь адаптироваться и справиться с тяжёлыми
                воспоминаниями.
              </p>

              <p className="text-base leading-relaxed text-neutral-800 sm:text-lg lg:text-xl">
                Для этого благотворительный фонд Стивена Сигала создал программу
                поддержки ветеранов и участников, вернувшихся с боевых действий.
                Она включает в себя 2 направления.
              </p>
            </div>
          </div>
        </section>

        {/* Направления программы */}
        <SvoDirectionsSection />

        {/* Форма доната с предзаполненным направлением и уникальным сообщением об успехе */}
        <HelpBlockSection
          introText="Для поддержки этого направления заполните форму обратной связи, указав в анкете название программы «Поддержка участников СВО, ветеранов и их семей»."
          programs={PROGRAMS_FOR_DONATION}
          defaultProgramId="svo"
          successByProgramId={{
            svo: {
              title: "Спасибо за вашу поддержку!",
              description:
                "Ваше пожертвование направлено на финансирование психологической и юридической помощи участникам СВО, ветеранам и их семьям.",
            },
          }}
        />
      </main>
      <Footer />
    </>
  );
}